import { redirect } from "next/navigation";
import { MemberPageActions } from "../components/member-page-actions";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getManagedProfiles, getMembershipApplications } from "@/lib/manager";

type ManagerPageProps = {
  searchParams?: Promise<{
    error?: string;
    updated?: string;
  }>;
};

export default async function ManagerPage({ searchParams }: ManagerPageProps) {
  const user = await getCurrentUser();
  const params = await searchParams;

  if (!isManager(user)) {
    redirect("/dashboard");
  }

  const [applications, profiles] = await Promise.all([
    getMembershipApplications(),
    getManagedProfiles(),
  ]);
  const pendingApplications = applications.filter(
    (application) => application.status === "pending",
  ).length;
  const activeMembers = profiles.filter(
    (profile) => profile.status === "active",
  ).length;

  return (
    <main className="min-h-screen bg-[#f3f6fa] text-[#111827]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Manager</p>
            <h1 className="mt-6 text-5xl font-medium tracking-tight">매니저 콘솔</h1>
            <p className="mt-5 max-w-2xl leading-7 text-[#64748b]">
              가입 승인, 계정 상태, 공개 권한과 포인트 이력을 한곳에서 관리합니다.
            </p>
          </div>
          <MemberPageActions
            canUploadPublic={user.canUploadPublic}
            currentPage="manager"
            isManager
          />
        </div>

        {params?.error ? (
          <p className="mt-6 rounded-2xl bg-[#ffe7e8] px-4 py-3 text-sm">
            {params.error === "points"
              ? "포인트와 사유를 확인해 주세요. 한 번에 ±5,000P까지 반영할 수 있습니다."
              : "요청을 처리하지 못했습니다. 입력값을 다시 확인하세요."}
          </p>
        ) : null}
        {params?.updated ? (
          <p className="mt-6 rounded-2xl border border-[#cbd5e1] bg-[#e6edf5] px-4 py-3 text-sm">
            변경 사항을 저장했습니다.
          </p>
        ) : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#64748b]">승인 대기</p>
            <strong className="mt-3 block text-4xl font-medium">
              {pendingApplications}
            </strong>
          </div>
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#64748b]">활성 멤버</p>
            <strong className="mt-3 block text-4xl font-medium">
              {activeMembers}
            </strong>
          </div>
          <div className="rounded-3xl border hairline bg-white p-6">
            <p className="text-sm text-[#64748b]">전체 계정</p>
            <strong className="mt-3 block text-4xl font-medium">
              {profiles.length}
            </strong>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-medium tracking-tight">가입 신청</h2>
          <div className="mt-6 grid gap-4">
            {applications.length === 0 ? (
              <p className="text-[#64748b]">가입 신청이 없습니다.</p>
            ) : (
              applications.map((application) => (
                <article className="rounded-3xl border hairline bg-white p-6" key={application.id}>
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <p className="text-sm text-[#64748b]">{application.status}</p>
                      <h3 className="mt-2 text-2xl font-medium tracking-tight">
                        {application.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#64748b]">
                        {application.email} / {application.discord}
                      </p>
                      <p className="mt-4 max-w-2xl leading-7">{application.interest}</p>
                      {application.experience ? (
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748b]">
                          {application.experience}
                        </p>
                      ) : null}
                    </div>
                    {application.status === "pending" ? (
                      <div className="grid min-w-72 gap-3">
                        <form
                          action={`/api/manager/applications/${application.id}/approve`}
                          className="grid gap-3"
                          method="post"
                        >
                          <input
                            className="rounded-2xl border hairline bg-white px-4 py-3"
                            name="username"
                            placeholder="발급할 아이디"
                            required
                          />
                          <input
                            className="rounded-2xl border hairline bg-white px-4 py-3"
                            minLength={8}
                            name="password"
                            placeholder="임시 비밀번호 (8자 이상)"
                            required
                            type="password"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input name="can_upload_public" type="checkbox" value="true" />
                            공개 프로젝트 업로드 허용
                          </label>
                          <button className="rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white">
                            승인
                          </button>
                        </form>
                        <form action={`/api/manager/applications/${application.id}/reject`} method="post">
                          <button className="w-full rounded-full border hairline px-5 py-3 text-sm font-semibold">
                            거절
                          </button>
                        </form>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-medium tracking-tight">멤버 권한</h2>
          <div className="mt-6 grid gap-4">
            {profiles.map((profile) => (
              <article
                className="rounded-3xl border hairline bg-white p-6"
                key={profile.id}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xl font-medium">
                      {profile.display_name ?? profile.username}
                    </p>
                    <p className="mt-1 text-sm text-[#64748b]">
                      @{profile.username} · {profile.role}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#cbd5e1] bg-[#f2f5f9] px-5 py-3 text-right">
                    <p className="text-xs text-[#64748b]">현재 포인트</p>
                    <strong className="mt-1 block text-2xl">
                      {profile.points} P
                    </strong>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <form
                    action={`/api/manager/profiles/${profile.id}`}
                    className="grid gap-3 rounded-2xl border hairline p-4 sm:grid-cols-[1fr_auto_auto]"
                    method="post"
                  >
                    <select
                      className="rounded-2xl border hairline px-4 py-3"
                      defaultValue={profile.status}
                      name="status"
                    >
                      <option value="pending">승인 대기</option>
                      <option value="active">활성</option>
                      <option value="suspended">이용 중지</option>
                    </select>
                    <label className="flex items-center gap-2 px-2 text-sm">
                      <input
                        defaultChecked={profile.can_upload_public}
                        name="can_upload_public"
                        type="checkbox"
                        value="true"
                      />
                      공개 업로드
                    </label>
                    <button className="rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white">
                      권한 저장
                    </button>
                  </form>

                  <form
                    action={`/api/manager/profiles/${profile.id}/points`}
                    className="grid gap-3 rounded-2xl border hairline p-4 sm:grid-cols-[110px_1fr_auto]"
                    method="post"
                  >
                    <input
                      className="rounded-2xl border hairline px-4 py-3"
                      max="5000"
                      min="-5000"
                      name="delta"
                      placeholder="+10"
                      required
                      type="number"
                    />
                    <input
                      className="rounded-2xl border hairline px-4 py-3"
                      maxLength={120}
                      minLength={3}
                      name="reason"
                      placeholder="예: Monthly Scrum 참여"
                      required
                    />
                    <button className="rounded-full border border-[#111827] px-5 py-3 text-sm font-semibold">
                      포인트 반영
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
