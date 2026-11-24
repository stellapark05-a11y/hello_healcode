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
  const formData = await request.formData();
  const status = String(formData.get("status") ?? "pending");
  const canUploadPublic = formData.get("can_upload_public") === "true";


  if (!["pending", "active", "suspended"].includes(status)) {
    return NextResponse.redirect(new URL("/manager?error=profile", request.url));
  }

  await (await database()).prepare("UPDATE profiles SET status=?,can_upload_public=? WHERE id=?").bind(status,Number(canUploadPublic),id).run();
  return NextResponse.redirect(new URL("/manager?updated=profile",request.url),303);
}
