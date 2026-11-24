import { NextResponse } from "next/server";
import { getCurrentUser, isManager } from "@/lib/auth";
import { database } from "@/lib/db";

type RouteContext = {
  params: Promise<unknown>;
};

export async function POST(request: Request, context: RouteContext) {
  const manager = await getCurrentUser();

  if (!isManager(manager)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const { id } = (await context.params) as { id: string };
  await (await database()).prepare("UPDATE membership_applications SET status='rejected',reviewed_by=? WHERE id=? AND status='pending'").bind(manager.id,id).run();
  return NextResponse.redirect(new URL("/manager", request.url),303);
}
