import { database } from "./db";
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

export async function getMembershipApplications() {
  return (await (await database()).prepare("SELECT * FROM membership_applications ORDER BY created_at DESC").all<MembershipApplication>()).results;
}
export async function getManagedProfiles() {
  return (await (await database()).prepare("SELECT * FROM profiles ORDER BY created_at DESC").all<ManagedProfile>()).results.map(p => ({ ...p, can_upload_public: Boolean(p.can_upload_public) }));
}
