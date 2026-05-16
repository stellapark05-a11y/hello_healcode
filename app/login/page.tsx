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
              계정이 생성되었습니다. 바로 로그인할 수 있습니다.
            </p>
          ) : null}
          {params?.error ? (
            <p className="mt-5 rounded-2xl bg-[#ffe7e8] px-4 py-3 text-sm">
              {params.error === "invalid"
                ? "아이디 또는 비밀번호를 다시 확인하세요."
                : params.error === "username"
                  ? "아이디는 영문, 숫자, 밑줄만 사용해 3자 이상 24자 이하로 입력하세요."
                  : params.error === "signup"
                    ? "이미 사용 중인 아이디이거나 계정을 만들 수 없습니다."
                    : "요청을 처리하지 못했습니다. 잠시 후 다시 시도하세요."}
            </p>
          ) : null}

          <form action="/api/auth/login" className="mt-10 grid gap-5" method="post">
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">아이디</span>
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="username"
                autoComplete="username"
                pattern="[A-Za-z0-9_]{3,24}"
                required
                type="text"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-[#6d6a65]">비밀번호</span>
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="password"
                autoComplete="current-password"
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
                name="username"
                placeholder="아이디"
                autoComplete="username"
                pattern="[A-Za-z0-9_]{3,24}"
                required
                type="text"
              />
              <input
                className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#181817]"
                name="password"
                placeholder="비밀번호"
                autoComplete="new-password"
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
