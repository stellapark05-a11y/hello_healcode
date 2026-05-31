import { redirect } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { getCurrentUser } from "@/lib/auth";

type NewProjectPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const user = await getCurrentUser();
  const params = await searchParams;

  if (!user) {
    redirect("/login");
  }

  if (user.status !== "active" || !user.canUploadPublic) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Public upload</p>
          <h1 className="mt-6 text-5xl font-medium tracking-tight">
            홍보용 프로젝트 올리기
          </h1>
          {params?.error ? (
            <p className="mt-5 rounded-2xl bg-[#ffe7e8] px-4 py-3 text-sm">
              업로드에 실패했습니다. 권한, 입력값, 저장소 설정을 확인하세요.
            </p>
          ) : null}
          <form
            action="/api/projects"
            className="mt-10 grid gap-5"
            encType="multipart/form-data"
            method="post"
          >
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">프로젝트 이름</span>
              <input className="rounded-2xl border hairline bg-white px-4 py-3" name="title" required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">설명</span>
              <textarea
                className="min-h-36 rounded-2xl border hairline bg-white px-4 py-3"
                name="summary"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">프로젝트 링크</span>
              <input className="rounded-2xl border hairline bg-white px-4 py-3" name="project_url" type="url" />
            </label>
            <input name="is_public" type="hidden" value="true" />
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">결과물 파일</span>
              <input className="rounded-2xl border hairline bg-white px-4 py-3" name="artifact" type="file" />
            </label>
            <button className="mt-2 rounded-full bg-[#181817] px-6 py-3 font-semibold text-white">
              공개 프로젝트 업로드
            </button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
