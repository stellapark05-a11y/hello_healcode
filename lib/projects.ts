import { database } from "./db";
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
  const db = await database();
  return (await db.prepare("SELECT * FROM projects WHERE owner_id=? ORDER BY created_at DESC")
    .bind(userId).all<Project>()).results;
}
