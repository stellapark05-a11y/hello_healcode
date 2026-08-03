import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

type LoginPageProps = {
  searchParams?: Promise<{
    applied?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#f3f6fa] text-[#111827]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">MEMBER ACCESS</p>
          <h1 className="mt-6 text-5xl font-medium tracking-tight">
            멤버 로그인
          </h1>
          <p className="mt-5 max-w-2xl text-[#64748b]">
            승인된 멤버는 로그인 후 프로젝트 자료와 멤버 기능을 사용할 수
            있습니다.
          </p>
          {params?.applied ? (
            <p className="mt-5 rounded-2xl border border-[#cbd5e1] bg-[#e6edf5] px-4 py-3 text-sm">
              가입 신청이 접수되었습니다. 매니저 검토 후 계정이 발급됩니다.
            </p>
          ) : null}
          {params?.error ? (
            <p className="mt-5 rounded-2xl bg-[#ffe7e8] px-4 py-3 text-sm">
              {params.error === "invalid"
                ? "아이디 또는 비밀번호를 다시 확인하세요."
                : params.error === "inactive"
                  ? "아직 승인되지 않았거나 이용이 중지된 계정입니다. 매니저에게 문의하세요."
                : params.error === "username"
                  ? "아이디는 영문, 숫자, 밑줄만 사용해 3자 이상 24자 이하로 입력하세요."
                : params.error === "application"
                    ? "가입 신청을 저장하지 못했습니다. 입력값을 다시 확인하세요."
                    : "요청을 처리하지 못했습니다. 잠시 후 다시 시도하세요."}
            </p>
          ) : null}

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-3xl border hairline bg-white p-7 shadow-sm shadow-slate-950/5">
              <p className="eyebrow">Existing member</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight">멤버 로그인</h2>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">
                내 포인트와 활동 기록을 확인합니다.
              </p>
              <form action="/api/auth/login" className="mt-7 grid gap-5" method="post">
                <label className="grid gap-2">
                  <span className="text-sm text-[#64748b]">아이디</span>
                  <input
                    className="rounded-2xl border hairline bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#111827]"
                    name="username"
                    autoComplete="username"
                    pattern="[A-Za-z0-9_]{3,24}"
                    required
                    type="text"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-[#64748b]">비밀번호</span>
                  <input
                    className="rounded-2xl border hairline bg-[#f8fafc] px-4 py-3 outline-none transition focus:border-[#111827]"
                    name="password"
                    autoComplete="current-password"
                    required
                    type="password"
                  />
                </label>
                <button className="mt-2 rounded-full bg-[#111827] px-6 py-3 font-semibold text-white transition hover:bg-[#020617]">
                  로그인
                </button>
              </form>
            </section>

            <section className="scroll-mt-8 rounded-3xl border hairline bg-[#e6edf5] p-7" id="apply">
              <p className="eyebrow">New member</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight">
                HealCode 가입 신청
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">
                서로의 분야를 배우고, 진행 과정과 경험을 나누며, 작은 기여부터
                함께하고 싶은 분의 신청을 기다립니다. 신청 내용을 확인한 뒤
                운영자가 참여 방법을 안내합니다.
              </p>
              <form action="/api/applications" className="mt-7 grid gap-4" method="post">
                <input
                  className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#111827]"
                  name="name"
                  placeholder="이름"
                  required
                  type="text"
                />
                <input
                  className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#111827]"
                  name="email"
                  placeholder="이메일"
                  autoComplete="email"
                  required
                  type="email"
                />
                <input
                  className="rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#111827]"
                  name="discord"
                  placeholder="디스코드 아이디"
                  required
                  type="text"
                />
                <textarea
                  className="min-h-28 rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#111827]"
                  name="interest"
                  placeholder="HealCode에 참여하고 싶은 이유"
                  required
                />
                <textarea
                  className="min-h-24 rounded-2xl border hairline bg-white px-4 py-3 outline-none transition focus:border-[#111827]"
                  name="experience"
                  placeholder="관련 경험 또는 해보고 싶은 프로젝트"
                />
                <button className="rounded-full border border-[#111827] bg-white px-6 py-3 font-semibold transition hover:bg-[#111827] hover:text-white">
                  가입 신청 보내기
                </button>
              </form>
            </section>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
