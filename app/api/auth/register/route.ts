import { NextResponse } from "next/server";
import { isValidUsername, normalizeUsername, usernameToAuthEmail } from "@/lib/usernames";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = normalizeUsername(String(formData.get("username") ?? ""));
  const password = String(formData.get("password") ?? "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }

  if (!isValidUsername(username)) {
    return NextResponse.redirect(new URL("/login?error=username", request.url));
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameToAuthEmail(username),
      password,
      data: { username },
    }),
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login?error=signup", request.url));
  }

  return NextResponse.redirect(new URL("/login?created=1", request.url));
}
