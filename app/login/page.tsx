import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

type LoginPageProps = {
  searchParams?: Promise<{
    created?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow">Member access</p>
          <h1 className="mt-6 text-5xl font-medium tracking-tight">로그인</h1>
          <p className="mt-5 text-[#6d6a65]">
            프로젝트를 올리고 관리하려면 멤버 계정으로 로그인하세요.
          </p>
          {params?.created ? (
            <p className="mt-5 rounded-2xl bg-[#e5eee8] px-4 py-3 text-sm">
              계정이 생성되었습니다. 이메일 인증이 켜져 있다면 확인 후 로그인하세요.
            </p>
          ) : null}
          {params?.error ? (
            <p className="mt-5 rounded-2xl bg-[#ffe7e8] px-4 py-3 text-sm">
              요청을 처리하지 못했습니다. 입력값과 Supabase 설정을 확인하세요.
            </p>
          ) : null}

          <form action="/api/auth/login" className="mt-10 grid gap-5" method="post">
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">이메일</span>
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">비밀번호</span>
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="password"
                required
                type="password"
              />
            </label>
            <button className="mt-2 rounded-full bg-[#181817] px-6 py-3 font-semibold text-white">
              로그인
            </button>
          </form>

          <form action="/api/auth/register" className="mt-8 border-t hairline pt-8" method="post">
            <p className="text-sm text-[#6d6a65]">처음이라면 계정을 만들 수 있습니다.</p>
            <div className="mt-4 grid gap-4">
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="email"
                placeholder="이메일"
                required
                type="email"
              />
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="password"
                placeholder="비밀번호"
                required
                type="password"
              />
              <button className="rounded-full border hairline px-6 py-3 font-semibold">
                계정 만들기
              </button>
            </div>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
