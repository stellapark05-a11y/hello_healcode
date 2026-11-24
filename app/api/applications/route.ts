import { NextResponse } from "next/server";
import { allowAuth, database } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const discord = String(formData.get("discord") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const experience = String(formData.get("experience") ?? "").trim();

  const fail = () => NextResponse.redirect(new URL("/login?error=application#apply", request.url), 303);
  if (!await allowAuth(request) || !name || !email.includes("@") || !discord || !interest ||
      name.length > 100 || email.length > 254 || discord.length > 100 || interest.length > 4000 || experience.length > 4000) return fail();
  await (await database()).prepare(`INSERT INTO membership_applications
    (id,name,email,discord,interest,experience) VALUES (?,?,?,?,?,?)`)
    .bind(crypto.randomUUID(),name,email.toLowerCase(),discord,interest,experience || null).run();
  return NextResponse.redirect(new URL("/login?applied=1#apply", request.url),303);
}
