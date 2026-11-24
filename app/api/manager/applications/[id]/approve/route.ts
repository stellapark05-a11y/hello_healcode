import { NextResponse } from "next/server";
import { database } from "@/lib/db";
import { getCurrentUser, isManager } from "@/lib/auth";
import { digest, token } from "@/lib/credentials";
import { normalizeUsername, isValidUsername } from "@/lib/usernames";

export async function POST(request: Request, context: { params: Promise<{id:string}> }) {
  const manager = await getCurrentUser();
  const go = (url:string) => NextResponse.redirect(new URL(url,request.url),303);
  if (!isManager(manager)) return go("/dashboard");
  const { id } = await context.params;
  const db = await database();
  const form = await request.formData();
  const secret = token();
  const username = normalizeUsername(String(form.get("username") ?? ""));
  try {
    const app = await db.prepare("SELECT status FROM membership_applications WHERE id=?").bind(id).first<{status:string}>();
    if (app?.status === "pending" && isValidUsername(username)) {
      const member = crypto.randomUUID();
      await db.batch([
        db.prepare(`INSERT INTO profiles (id,username,display_name,status,can_upload_public)
          SELECT ?,?,name,'invited',? FROM membership_applications WHERE id=? AND status='pending'`)
          .bind(member,username,Number(form.get("can_upload_public")==="true"),id),
        db.prepare(`INSERT INTO accounts (member_id,email,invite_hash,invite_until,application_id)
          SELECT ?,email,?,unixepoch()+86400,id FROM membership_applications WHERE id=?`).bind(member,digest(secret),id),
        db.prepare("UPDATE membership_applications SET status='invited', reviewed_by=? WHERE id=?").bind(manager.id,id),
      ]);
    } else if (app?.status === "invited") {
      const updated = await db.prepare("UPDATE accounts SET invite_hash=?,invite_until=unixepoch()+86400 WHERE application_id=? AND password_hash IS NULL")
        .bind(digest(secret),id).run();
      if (!updated.meta.changes) return go("/manager?error=invite");
    } else return go("/manager?error=invite");
  } catch { return go("/manager?error=invite"); }
  const response = go("/manager?updated=invite");
  response.cookies.set("hc_invite",secret,{httpOnly:true,secure:true,sameSite:"strict",path:"/manager",maxAge:120});
  return response;
}
