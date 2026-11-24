import { NextResponse } from "next/server";
import { allowAuth, database } from "@/lib/db";
import { digest, matches, token } from "@/lib/credentials";

export async function POST(request: Request) {
  const fail = () => NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
  if (!await allowAuth(request)) return fail();
  const form = await request.formData();
  const identifier = String(form.get("identifier") ?? form.get("username") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!identifier || identifier.length > 254 || !password || password.length > 256) return fail();
  const db = await database();
  const account = await db.prepare(`SELECT a.member_id, a.password_hash, a.salt, p.status
    FROM accounts a JOIN profiles p ON p.id=a.member_id WHERE p.username=? OR a.email=? LIMIT 1`)
    .bind(identifier, identifier).first<{member_id:string; password_hash:string|null; salt:string|null; status:string}>();
  const valid = await matches(password, account?.salt ?? "00".repeat(32), account?.password_hash ?? "");
  if (!valid || !account) return fail();
  if (account.status !== "active") return NextResponse.redirect(new URL("/login?error=inactive",request.url),303);
  const session = token();
  const maxAge = 60 * 60 * 24 * 7;
  await db.batch([
    db.prepare("DELETE FROM sessions WHERE expires_at<=unixepoch()"),
    db.prepare("INSERT INTO sessions VALUES (?,?,unixepoch()+?)").bind(digest(session),account.member_id,maxAge),
  ]);
  const response = NextResponse.redirect(new URL("/dashboard",request.url),303);
  response.cookies.set("hc_session", session, { httpOnly:true, secure:true, sameSite:"lax", path:"/", maxAge });
  return response;
}
