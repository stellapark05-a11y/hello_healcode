import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getMyProjects } from "@/lib/projects";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await getMyProjects(user.id);

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="mt-6 text-5xl font-medium tracking-tight">내 프로젝트</h1>
            <p className="mt-5 text-[#6d6a65]">{user.username ?? user.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-[#181817] px-5 py-3 text-sm font-semibold text-white"
              href="/projects/new"
            >
              프로젝트 올리기
            </Link>
            <form action="/api/auth/logout" method="post">
              <button className="rounded-full border hairline px-5 py-3 text-sm font-semibold">
                로그아웃
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t hairline">
          {projects.length === 0 ? (
            <p className="py-10 text-[#6d6a65]">아직 등록한 프로젝트가 없습니다.</p>
          ) : (
            projects.map((project) => (
              <article className="border-b hairline py-6" key={project.id}>
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight">{project.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6d6a65]">
                      {project.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    {project.project_url ? (
                      <a className="underline" href={project.project_url}>
                        프로젝트 링크
                      </a>
                    ) : null}
                    {project.artifact_url ? (
                      <a className="underline" href={project.artifact_url}>
                        결과물 보기
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
