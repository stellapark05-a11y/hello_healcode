import { NextResponse } from "next/server";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase";
import { isValidUsername, normalizeUsername, usernameToAuthEmail } from "@/lib/usernames";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ApplicationRecord = {
  id: string;
  name: string;
  email: string;
};

type CreatedUser = {
  id?: string;
  user?: {
    id: string;
  };
};

export async function POST(request: Request, context: RouteContext) {
  const manager = await getCurrentUser();

  if (!isManager(manager)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const username = normalizeUsername(String(formData.get("username") ?? ""));
  const password = String(formData.get("password") ?? "");
  const canUploadPublic = formData.get("can_upload_public") === "true";
  const config = getSupabaseConfig();

  if (!isValidUsername(username) || !password) {
    return NextResponse.redirect(new URL("/manager?error=approve", request.url));
  }

  const applicationResponse = await fetch(
    `${config.url}/rest/v1/membership_applications?id=eq.${id}&select=id,name,email&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
  );

  const applications = applicationResponse.ok
    ? ((await applicationResponse.json()) as ApplicationRecord[])
    : [];
  const application = applications[0];

  if (!application) {
    return NextResponse.redirect(new URL("/manager?error=missing", request.url));
  }

  const userResponse = await fetch(`${config.url}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameToAuthEmail(username),
      password,
      email_confirm: true,
      user_metadata: {
        username,
        display_name: application.name,
        contact_email: application.email,
      },
    }),
  });

  if (!userResponse.ok) {
    return NextResponse.redirect(new URL("/manager?error=create-user", request.url));
  }

  const created = (await userResponse.json()) as CreatedUser;
  const userId = created.id ?? created.user?.id;

  if (!userId) {
    return NextResponse.redirect(new URL("/manager?error=create-user", request.url));
  }

  await fetch(`${config.url}/rest/v1/profiles?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      id: userId,
      username,
      display_name: application.name,
      status: "active",
      role: "member",
      points: 0,
      can_upload_public: canUploadPublic,
    }),
  });

  await fetch(`${config.url}/rest/v1/membership_applications?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status: "approved",
      reviewed_by: manager?.id,
    }),
  });

  return NextResponse.redirect(new URL("/manager", request.url));
}
