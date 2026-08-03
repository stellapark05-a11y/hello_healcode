import { NextResponse } from "next/server";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase";

type RouteContext = {
  params: Promise<unknown>;
};

export async function POST(request: Request, context: RouteContext) {
  const manager = await getCurrentUser();

  if (!isManager(manager)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const { id } = (await context.params) as { id: string };
  const formData = await request.formData();
  const delta = Number(formData.get("delta"));
  const reason = String(formData.get("reason") ?? "").trim();

  if (
    !Number.isInteger(delta) ||
    delta === 0 ||
    Math.abs(delta) > 5000 ||
    reason.length < 3 ||
    reason.length > 120
  ) {
    return NextResponse.redirect(new URL("/manager?error=points", request.url));
  }

  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/rpc/adjust_member_points`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_member_id: id,
      point_delta: delta,
      point_reason: reason,
      actor_id: manager.id,
    }),
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/manager?error=points", request.url));
  }

  return NextResponse.redirect(new URL("/manager?updated=points", request.url));
}
