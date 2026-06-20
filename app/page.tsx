import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SpaceHero } from "./components/space-hero";
import { confirmedOperations, members, studyItems } from "@/lib/site-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080d] text-[#181817]">
      <div className="absolute inset-x-0 top-0 z-20">
        <SiteHeader tone="dark" />
      </div>
      <SpaceHero />

      <section className="bg-[#f7f7f4] py-20 text-[#181817]" id="about">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">01 / about</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              Healthcare x Code
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#6d6a65]">
              healcode는 의료 현장의 문제를 코드와 프로덕트로 풀어내는
              커뮤니티입니다. 의료, 개발, 데이터, AI를 연결하여 실제로 사용할 수
              있는 서비스를 만들고 공유합니다.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-t hairline bg-white py-20 text-[#181817]"
        id="project"
      >
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">02 / project</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              POMR Coach
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#6d6a65]">
              POMR Coach는 의료 기록과 임상 사고 과정을 구조화하는 데 도움을
              주는 프로젝트입니다.
            </p>

            <a
              className="mt-8 inline-flex rounded-full bg-[#181817] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              href="https://pomr-coach-516460607949.asia-northeast3.run.app/"
              rel="noreferrer"
              target="_blank"
            >
              POMR Coach 사이트 보기
            </a>
          </div>
        </div>
      </section>

      <section
        className="border-t hairline bg-[#f7f7f4] py-20 text-[#181817]"
        id="activities"
      >
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">03 / activities</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              Regular Activities
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border hairline bg-white p-6 shadow-sm shadow-black/[0.02]">
                <h3 className="text-2xl font-medium tracking-tight">모각코</h3>
                <p className="mt-2 text-sm font-semibold text-[#6d6a65]">
                  모여서 각자 코딩
                </p>
                <p className="mt-4 text-sm leading-7 text-[#6d6a65]">
                  바쁜 일상생활 중 잠깐이라도 코딩에 집중하고자 만들어진
                  세션입니다. 각자 진행 중인 프로젝트나 학습 내용을 가지고 모여
                  집중적으로 작업합니다.
                </p>
              </article>

              <article className="rounded-2xl border hairline bg-white p-6 shadow-sm shadow-black/[0.02]">
                <h3 className="text-2xl font-medium tracking-tight">
                  Monthly Scrum
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6d6a65]">
                  프로젝트 아이디어 및 성과, 의료현장에서의 인사이트를 공유하는
                  자리입니다. 각자의 진행 상황을 나누고 다음 단계의 방향을 함께
                  정리합니다.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t hairline bg-white py-20 text-[#181817]"
        id="contact"
      >
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">04 / contact & join us</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              Contact & Join Us
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border hairline bg-[#fbfaf7] p-6">
                <p className="text-sm font-semibold text-[#6d6a65]">
                  대표 이메일
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                  임예제
                </h3>
                <a
                  className="mt-4 inline-block text-sm leading-7 text-[#6d6a65] underline underline-offset-4"
                  href="mailto:yj7832@korea.ac.kr"
                >
                  yj7832@korea.ac.kr
                </a>
              </article>

              <article className="rounded-2xl border hairline bg-[#fbfaf7] p-6">
                <p className="text-sm font-semibold text-[#6d6a65]">
                  가입 신청
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                  Google Form
                </h3>
                <a
                  className="mt-4 inline-block rounded-full bg-[#181817] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                  href="여기에_구글폼_링크_넣기"
                  rel="noreferrer"
                  target="_blank"
                >
                  가입용 구글폼 열기
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
