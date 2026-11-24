import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { database } from "@/lib/db";
export async function POST(request: Request) {
  const user = await getCurrentUser();
  const go = (path:string) => NextResponse.redirect(new URL(path,request.url),303);
  if (!user) return go("/login");
  if (!user.canUploadPublic) return go("/dashboard");
  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim();
  const summary = String(form.get("summary") ?? "").trim();
  const url = String(form.get("project_url") ?? "").trim();
  if (!title || title.length>200 || !summary || summary.length>5000 || url.length>2048 ||
      !URL.canParse(url) || !["https:","http:"].includes(new URL(url).protocol)) return go("/projects/new?error=input");
  await (await database()).prepare("INSERT INTO projects (id,owner_id,title,summary,project_url,is_public) VALUES (?,?,?,?,?,1)")
    .bind(crypto.randomUUID(),user.id,title,summary,url).run();
  return go("/dashboard");
}
