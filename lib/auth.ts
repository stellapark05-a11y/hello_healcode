import { cookies } from "next/headers";
import { database } from "./db";
import { digest } from "./credentials";

export type SessionUser = {
  id: string;
  email: string;
  username: string | null;
  displayName: string | null;
  role: string;
  status: string;
  points: number;
  canUploadPublic: boolean;
};


export async function getCurrentUser(): Promise<SessionUser | null> {
  const value = (await cookies()).get("hc_session")?.value;
  if (!value || !/^[a-f0-9]{64}$/.test(value)) return null;
  const db = await database();
  const row = await db.prepare(`SELECT p.id, a.email, p.username, p.display_name AS displayName,
    p.role, p.status, p.points, p.can_upload_public AS canUploadPublic
    FROM sessions s JOIN profiles p ON p.id=s.member_id JOIN accounts a ON a.member_id=p.id
    WHERE s.token_hash=? AND s.expires_at>unixepoch() AND p.status='active'`)
    .bind(digest(value)).first<SessionUser>();
  return row && { ...row, canUploadPublic: Boolean(row.canUploadPublic) };
}

export function isManager(user: SessionUser | null): user is SessionUser {
  return (
    user?.status === "active" &&
    (user.role === "manager" || user.role === "admin")
  );
}
