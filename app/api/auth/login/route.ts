import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isValidUsername, usernameToAuthEmail } from "@/lib/usernames";
import { supabaseFetch } from "@/lib/supabase";

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
    return NextResponse.redirect(new URL("/login?error=config", request.url), 303);
  }

  const isEmail = identifier.includes("@");

  if ((!isEmail && !isValidUsername(identifier)) || (isEmail && identifier.length > 254)) {
    return NextResponse.redirect(new URL("/login?error=username", request.url), 303);
  }

  let email = identifier;
  let expectedUserId: string | undefined;
  if (!isEmail) {
    try {
      const profiles = await supabaseFetch<{ id: string }[]>(
        `/rest/v1/profiles?username=eq.${encodeURIComponent(identifier)}&select=id&limit=1`,
        { cache: "no-store" },
        true,
      );
      expectedUserId = profiles[0]?.id;
      email = usernameToAuthEmail(identifier);
      if (expectedUserId) {
        const account = await supabaseFetch<{ email?: string }>(
          `/auth/v1/admin/users/${expectedUserId}`,
          { cache: "no-store" },
          true,
        );
        email = account.email ?? email;
      }
    } catch {
      return NextResponse.redirect(new URL("/login?error=service", request.url), 303);
    }
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = response.status === 429 || response.status >= 500 ? "service" : "invalid";
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url), 303);
  }

  const data = (await response.json()) as LoginResponse;
  if (expectedUserId && data.user.id !== expectedUserId) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
  }
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
  if (!profileResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=service", request.url), 303);
  }
  const profiles = (await profileResponse.json()) as LoginProfile[];

  if (profiles[0]?.status !== "active") {
    return NextResponse.redirect(new URL("/login?error=inactive", request.url), 303);
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

  return NextResponse.redirect(new URL("/dashboard", request.url), 303);
}
