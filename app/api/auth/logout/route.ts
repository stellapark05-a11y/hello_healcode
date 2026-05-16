import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("hc_access_token");
  cookieStore.delete("hc_refresh_token");
  return NextResponse.redirect(new URL("/", request.url));
}
