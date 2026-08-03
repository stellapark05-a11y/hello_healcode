import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase";

type InviteUser = {
  id: string;
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  } | null;
  const accessToken = body?.accessToken?.trim();
  const refreshToken = body?.refreshToken?.trim();

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "invalid_session" }, { status: 400 });
  }

  const config = getSupabaseConfig();
  const userResponse = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!userResponse.ok) {
    return NextResponse.json({ error: "expired_invite" }, { status: 401 });
  }

  const user = (await userResponse.json()) as InviteUser;
  const profileResponse = await fetch(
    `${config.url}/rest/v1/profiles?id=eq.${user.id}`,
    {
      method: "PATCH",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ status: "active" }),
    },
  );

  if (!profileResponse.ok) {
    return NextResponse.json({ error: "profile_update" }, { status: 500 });
  }

  if (user.email) {
    const applicationUrl = new URL(
      `${config.url}/rest/v1/membership_applications`,
    );
    applicationUrl.searchParams.set("email", `eq.${user.email}`);
    applicationUrl.searchParams.set("status", "eq.invited");
    await fetch(applicationUrl, {
      method: "PATCH",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ status: "approved" }),
    });
  }

  const expiresIn = Math.max(60, Math.min(Number(body?.expiresIn) || 3600, 86400));
  const cookieStore = await cookies();
  cookieStore.set("hc_access_token", accessToken, {
    httpOnly: true,
    maxAge: expiresIn,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookieStore.set("hc_refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
