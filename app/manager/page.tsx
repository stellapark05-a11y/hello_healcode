import { redirect } from "next/navigation";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getManagedProfiles, getMembershipApplications } from "@/lib/manager";

export default async function ManagerPage() {
  const user = await getCurrentUser();

  if (!isManager(user)) {
    redirect("/dashboard");
  }

  const [applications, profiles] = await Promise.all([
    getMembershipApplications(),
    getManagedProfiles(),
  ]);

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <p className="eyebrow">Manager</p>
        <h1 className="mt-6 text-5xl font-medium tracking-tight">매니저 콘솔</h1>

        <section className="mt-12">
          <h2 className="text-3xl font-medium tracking-tight">가입 신청</h2>
          <div className="mt-6 grid gap-4">
            {applications.length === 0 ? (
              <p className="text-[#6d6a65]">가입 신청이 없습니다.</p>
            ) : (
              applications.map((application) => (
                <article className="rounded-3xl border hairline bg-white p-6" key={application.id}>
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <p className="text-sm text-[#6d6a65]">{application.status}</p>
                      <h3 className="mt-2 text-2xl font-medium tracking-tight">
                        {application.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#6d6a65]">
                        {application.email} / {application.discord}
                      </p>
                      <p className="mt-4 max-w-2xl leading-7">{application.interest}</p>
                      {application.experience ? (
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6d6a65]">
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
                            name="password"
                            placeholder="임시 비밀번호"
                            required
                            type="password"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input name="can_upload_public" type="checkbox" value="true" />
                            공개 프로젝트 업로드 허용
                          </label>
                          <button className="rounded-full bg-[#181817] px-5 py-3 text-sm font-semibold text-white">
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
              <form
                action={`/api/manager/profiles/${profile.id}`}
                className="grid gap-3 rounded-3xl border hairline bg-white p-6 md:grid-cols-[1fr_120px_160px_180px_auto]"
                key={profile.id}
                method="post"
              >
                <div>
                  <p className="font-medium">{profile.display_name ?? profile.username}</p>
                  <p className="text-sm text-[#6d6a65]">{profile.role}</p>
                </div>
                <input
                  className="rounded-2xl border hairline px-4 py-3"
                  min="0"
                  name="points"
                  type="number"
                  defaultValue={profile.points}
                />
                <select className="rounded-2xl border hairline px-4 py-3" name="status" defaultValue={profile.status}>
                  <option value="pending">pending</option>
                  <option value="active">active</option>
                  <option value="suspended">suspended</option>
                </select>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    defaultChecked={profile.can_upload_public}
                    name="can_upload_public"
                    type="checkbox"
                    value="true"
                  />
                  공개 업로드
                </label>
                <button className="rounded-full bg-[#181817] px-5 py-3 text-sm font-semibold text-white">
                  저장
                </button>
              </form>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
