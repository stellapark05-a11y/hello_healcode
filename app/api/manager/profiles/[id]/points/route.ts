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

  const db = await database();
  const result = await db.batch([
    db.prepare(`INSERT INTO point_transactions (id,member_id,delta,balance_after,reason,created_by)
      SELECT ?,id,max(-points,?),max(0,points+?),?,? FROM profiles WHERE id=? AND max(-points,?)<>0`)
      .bind(crypto.randomUUID(),delta,delta,reason,manager.id,id,delta),
    db.prepare("UPDATE profiles SET points=max(0,points+?) WHERE id=?").bind(delta,id),
  ]);
  return NextResponse.redirect(new URL(result[0].meta.changes ? "/manager?updated=points" : "/manager?error=points",request.url),303);
}
