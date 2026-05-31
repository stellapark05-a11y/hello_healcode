import { getSessionToken } from "./auth";

export type Project = {
  id: string;
  owner_id: string;
  title: string;
  summary: string;
  project_url: string | null;
  artifact_url: string | null;
  is_public: boolean;
  created_at: string;
};

export async function getMyProjects(userId: string): Promise<Project[]> {
  const token = await getSessionToken();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/projects?owner_id=eq.${userId}&select=*&order=created_at.desc`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as Project[];
}
