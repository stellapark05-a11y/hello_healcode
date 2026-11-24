import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { database } from "@/lib/db";
import { digest } from "@/lib/credentials";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("hc_session")?.value;
  if (session) await (await database()).prepare("DELETE FROM sessions WHERE token_hash=?").bind(digest(session)).run();
  cookieStore.delete("hc_session");
  cookieStore.delete("hc_access_token");
  cookieStore.delete("hc_refresh_token");
  return NextResponse.redirect(new URL("/login", request.url), 303);
}

