import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  email: string;
  username: string | null;
};

type SupabaseUserResponse = {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
  };
};

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get("hc_access_token")?.value;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = await getSessionToken();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const user = (await response.json()) as SupabaseUserResponse;
  return {
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username ?? null,
  };
}
