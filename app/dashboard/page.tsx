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
            <h1 className="mt-6 text-5xl font-medium tracking-tight">멤버 대시보드</h1>
            <p className="mt-5 text-[#6d6a65]">
              {user.displayName ?? user.username ?? user.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                user.canUploadPublic
                  ? "bg-[#181817] text-white"
                  : "pointer-events-none border hairline text-[#8b877f]"
              }`}
              href="/projects/new"
            >
              공개 프로젝트 올리기
            </Link>
            {user.role === "manager" || user.role === "admin" ? (
              <Link
                className="rounded-full border hairline px-5 py-3 text-sm font-semibold"
                href="/manager"
              >
                매니저 콘솔
              </Link>
            ) : null}
            <form action="/api/auth/logout" method="post">
              <button className="rounded-full border hairline px-5 py-3 text-sm font-semibold">
                로그아웃
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#6d6a65]">내 포인트</p>
            <p className="mt-3 text-4xl font-medium tracking-tight">{user.points}</p>
          </div>
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#6d6a65]">멤버 상태</p>
            <p className="mt-3 text-2xl font-medium tracking-tight">{user.status}</p>
          </div>
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#6d6a65]">권한</p>
            <p className="mt-3 text-2xl font-medium tracking-tight">
              {user.canUploadPublic ? "공개 업로드 가능" : "공개 업로드 미승인"}
            </p>
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
