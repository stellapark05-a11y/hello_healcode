import { getSupabaseConfig } from "./supabase";

export type MembershipApplication = {
  id: string;
  name: string;
  email: string;
  discord: string;
  interest: string;
  experience: string | null;
  status: string;
  created_at: string;
};

export type ManagedProfile = {
  id: string;
  username: string;
  display_name: string | null;
  role: string;
  status: string;
  points: number;
  can_upload_public: boolean;
};

async function serviceFetch<T>(path: string, init: RequestInit = {}) {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return [] as T;
  }

  return (await response.json()) as T;
}

export async function getMembershipApplications() {
  return serviceFetch<MembershipApplication[]>(
    "/rest/v1/membership_applications?select=*&order=created_at.desc",
  );
}

export async function getManagedProfiles() {
  return serviceFetch<ManagedProfile[]>(
    "/rest/v1/profiles?select=id,username,display_name,role,status,points,can_upload_public&order=created_at.desc",
  );
}
