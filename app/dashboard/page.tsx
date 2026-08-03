import { redirect } from "next/navigation";
import { MemberPageActions } from "../components/member-page-actions";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getMyPointTransactions, getPointTier } from "@/lib/points";
import { getMyProjects } from "@/lib/projects";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.status !== "active") {
    redirect("/login");
  }

  const [projects, pointTransactions] = await Promise.all([
    getMyProjects(user.id),
    getMyPointTransactions(user.id),
  ]);
  const tier = getPointTier(user.points);

  return (
    <main className="min-h-screen bg-[#f3f6fa] text-[#111827]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="mt-6 text-5xl font-medium tracking-tight">멤버 대시보드</h1>
            <p className="mt-5 text-[#64748b]">
              {user.displayName ?? user.username ?? user.email}
            </p>
          </div>
          <MemberPageActions
            canUploadPublic={user.canUploadPublic}
            currentPage="dashboard"
            isManager={user.role === "manager" || user.role === "admin"}
          />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#64748b]">내 포인트</p>
            <p className="mt-3 text-4xl font-medium tracking-tight">{user.points}</p>
          </div>
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#64748b]">현재 티어</p>
            <p className="mt-3 text-2xl font-medium tracking-tight">{tier}</p>
          </div>
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#64748b]">권한</p>
            <p className="mt-3 text-2xl font-medium tracking-tight">
              {user.canUploadPublic ? "공개 업로드 가능" : "공개 업로드 미승인"}
            </p>
          </div>
        </div>

        <section className="mt-12 rounded-3xl border hairline bg-white p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Point history</p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight">
                최근 포인트 내역
              </h2>
            </div>
            <p className="text-sm text-[#64748b]">최근 20건</p>
          </div>

          <div className="mt-6 divide-y hairline">
            {pointTransactions.length === 0 ? (
              <p className="py-5 text-sm text-[#64748b]">
                아직 포인트 이력이 없습니다.
              </p>
            ) : (
              pointTransactions.map((transaction) => (
                <article
                  className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                  key={transaction.id}
                >
                  <div>
                    <p className="font-medium">{transaction.reason}</p>
                    <p className="mt-1 text-xs text-[#64748b]">
                      {new Intl.DateTimeFormat("ko-KR", {
                        dateStyle: "medium",
                      }).format(new Date(transaction.created_at))}
                    </p>
                  </div>
                  <strong
                    className={
                      transaction.delta > 0 ? "text-[#008f5a]" : "text-[#c34b53]"
                    }
                  >
                    {transaction.delta > 0 ? "+" : ""}
                    {transaction.delta} P
                  </strong>
                  <span className="text-sm text-[#64748b]">
                    잔액 {transaction.balance_after} P
                  </span>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="mt-12 border-t hairline">
          {projects.length === 0 ? (
            <p className="py-10 text-[#64748b]">아직 등록한 프로젝트가 없습니다.</p>
          ) : (
            projects.map((project) => (
              <article className="border-b hairline py-6" key={project.id}>
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h2 className="text-2xl font-medium tracking-tight">{project.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748b]">
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
