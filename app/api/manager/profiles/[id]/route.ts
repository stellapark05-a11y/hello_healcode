import { NextResponse } from "next/server";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const manager = await getCurrentUser();

  if (!isManager(manager)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const points = Number(formData.get("points") ?? 0);
  const status = String(formData.get("status") ?? "pending");
  const canUploadPublic = formData.get("can_upload_public") === "true";
  const config = getSupabaseConfig();

  await fetch(`${config.url}/rest/v1/profiles?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      points: Number.isFinite(points) ? points : 0,
      status,
      can_upload_public: canUploadPublic,
    }),
  });

  return NextResponse.redirect(new URL("/manager", request.url));
}
