import { NextResponse } from "next/server";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase";
import { isValidUsername, normalizeUsername } from "@/lib/usernames";

type RouteContext = {
  params: Promise<unknown>;
};

type ApplicationRecord = {
  id: string;
  name: string;
  email: string;
  status: string;
};

type InvitedUser = {
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

  const { id } = (await context.params) as { id: string };
  const formData = await request.formData();
  const username = normalizeUsername(String(formData.get("username") ?? ""));
  const canUploadPublic = formData.get("can_upload_public") === "true";
  const config = getSupabaseConfig();

  if (!isValidUsername(username)) {
    return NextResponse.redirect(new URL("/manager?error=approve", request.url));
  }

  const applicationResponse = await fetch(
    `${config.url}/rest/v1/membership_applications?id=eq.${id}&select=id,name,email,status&limit=1`,
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

  if (!application || application.status !== "pending") {
    return NextResponse.redirect(new URL("/manager?error=missing", request.url));
  }

  const inviteUrl = new URL(`${config.url}/auth/v1/invite`);
  inviteUrl.searchParams.set(
    "redirect_to",
    new URL("/auth/setup-password", request.url).toString(),
  );
  const userResponse = await fetch(inviteUrl, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: application.email.trim().toLowerCase(),
      data: {
        username,
        display_name: application.name,
        contact_email: application.email,
      },
    }),
  });

  if (!userResponse.ok) {
    return NextResponse.redirect(new URL("/manager?error=invite", request.url));
  }

  const created = (await userResponse.json()) as InvitedUser;
  const userId = created.id ?? created.user?.id;

  if (!userId) {
    return NextResponse.redirect(new URL("/manager?error=invite", request.url));
  }

  const profileResponse = await fetch(`${config.url}/rest/v1/profiles?on_conflict=id`, {
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
      status: "invited",
      role: "member",
      points: 0,
      can_upload_public: canUploadPublic,
    }),
  });

  if (!profileResponse.ok) {
    await fetch(`${config.url}/auth/v1/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    });

    return NextResponse.redirect(new URL("/manager?error=profile", request.url));
  }

  const applicationUpdateResponse = await fetch(
    `${config.url}/rest/v1/membership_applications?id=eq.${id}`,
    {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status: "invited",
      reviewed_by: manager?.id,
    }),
    },
  );

  if (!applicationUpdateResponse.ok) {
    return NextResponse.redirect(new URL("/manager?error=application", request.url));
  }

  return NextResponse.redirect(new URL("/manager?updated=invite", request.url));
}
