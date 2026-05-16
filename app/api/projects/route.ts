import { NextResponse } from "next/server";
import { getCurrentUser, getSessionToken } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const token = await getSessionToken();

  if (!user || !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "");
  const summary = String(formData.get("summary") ?? "");
  const projectUrl = String(formData.get("project_url") ?? "") || null;
  const artifact = formData.get("artifact");
  const config = getSupabaseConfig();
  let artifactUrl: string | null = null;

  if (artifact instanceof File && artifact.size > 0) {
    const safeName = artifact.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${user.id}/${Date.now()}-${safeName}`;
    const uploadResponse = await fetch(
      `${config.url}/storage/v1/object/project-artifacts/${path}`,
      {
        method: "POST",
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
          "Content-Type": artifact.type || "application/octet-stream",
        },
        body: artifact,
      },
    );

    if (!uploadResponse.ok) {
      return NextResponse.redirect(new URL("/projects/new?error=upload", request.url));
    }

    artifactUrl = `${config.url}/storage/v1/object/public/project-artifacts/${path}`;
  }

  const insertResponse = await fetch(`${config.url}/rest/v1/projects`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      owner_id: user.id,
      title,
      summary,
      project_url: projectUrl,
      artifact_url: artifactUrl,
    }),
  });

  if (!insertResponse.ok) {
    return NextResponse.redirect(new URL("/projects/new?error=create", request.url));
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
