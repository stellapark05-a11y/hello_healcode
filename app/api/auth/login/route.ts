import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidUsername, normalizeUsername, usernameToAuthEmail } from "@/lib/usernames";

type LoginResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user: {
    id: string;
  };
};

type LoginProfile = {
  status: string;
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const identifier = String(formData.get("identifier") ?? formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }

  const isEmail = identifier.includes("@");

  if ((!isEmail && !isValidUsername(identifier)) || (isEmail && identifier.length > 254)) {
    return NextResponse.redirect(new URL("/login?error=username", request.url));
  }

  const email = isEmail
    ? identifier
    : usernameToAuthEmail(normalizeUsername(identifier));

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url));
  }

  const data = (await response.json()) as LoginResponse;
  const profileResponse = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${data.user.id}&select=status&limit=1`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${data.access_token}`,
      },
      cache: "no-store",
    },
  );
  const profiles = profileResponse.ok
    ? ((await profileResponse.json()) as LoginProfile[])
    : [];

  if (profiles[0]?.status !== "active") {
    return NextResponse.redirect(new URL("/login?error=inactive", request.url));
  }

  const cookieStore = await cookies();
  cookieStore.set("hc_access_token", data.access_token, {
    httpOnly: true,
    maxAge: data.expires_in,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookieStore.set("hc_refresh_token", data.refresh_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
