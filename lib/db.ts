import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    AUTH_LIMIT: { limit(input: { key: string }): Promise<{ success: boolean }> };
  }
}

export async function database() {
  return (await getCloudflareContext({ async: true })).env.DB;
}

export async function allowAuth(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  return (await env.AUTH_LIMIT.limit({ key: request.headers.get("CF-Connecting-IP") || "local" })).success;
}
