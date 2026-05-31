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
  const config = getSupabaseConfig();

  await fetch(`${config.url}/rest/v1/membership_applications?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status: "rejected",
      reviewed_by: manager?.id,
    }),
  });

  return NextResponse.redirect(new URL("/manager", request.url));
}
