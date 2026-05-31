import { NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const discord = String(formData.get("discord") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const experience = String(formData.get("experience") ?? "").trim();

  if (!name || !email || !discord || !interest) {
    return NextResponse.redirect(new URL("/login?error=application", request.url));
  }

  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/membership_applications`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      email,
      discord,
      interest,
      experience: experience || null,
    }),
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login?error=application", request.url));
  }

  return NextResponse.redirect(new URL("/login?applied=1", request.url));
}
