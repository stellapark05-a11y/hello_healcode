import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SpaceHero } from "./components/space-hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080d] text-[#111827]">
      <div className="absolute inset-x-0 top-0 z-20">
        <SiteHeader tone="dark" />
      </div>
      <SpaceHero />

      <section className="bg-[#f2f5f9] py-20 text-[#111827]" id="about">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">01 / ABOUT</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              의료와 기술 사이의 언어를 연결합니다.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#64748b]">
              좋은 의료 기술은 구현 능력만으로 완성되지 않습니다. HealCode는 의료
              현장의 맥락을 나누는 Healer와 기술을 설계하고 구현하는 Crafter가
              서로에게 배우고, 작은 실험과 프로젝트를 통해 문제를 함께 풀어가는
              커뮤니티입니다.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-t hairline bg-white py-20 text-[#111827]"
        id="project"
      >
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">02 / PROJECT SPOTLIGHT</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              POMR Coach
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#64748b]">
              임상 기록과 사고 과정을 구조화하는 방법을 탐색하는 멤버 주도
              프로젝트입니다.
            </p>

            <a
              className="mt-8 inline-flex rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#020617]"
              href="https://pomr-coach-516460607949.asia-northeast3.run.app/"
              rel="noreferrer"
              target="_blank"
            >
              POMR Coach 살펴보기
            </a>
          </div>
        </div>
      </section>

      <section
        className="border-t hairline bg-[#f2f5f9] py-20 text-[#111827]"
        id="activities"
      >
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">03 / ACTIVITIES</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              How We Learn &amp; Build
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border hairline bg-white p-6 shadow-sm shadow-black/[0.02]">
                <h3 className="text-2xl font-medium tracking-tight">모각코</h3>
                <p className="mt-2 text-sm font-semibold text-[#64748b]">
                  함께 접속해 각자의 작업을 이어가는 집중 세션
                </p>
                <p className="mt-4 text-sm leading-7 text-[#64748b]">
                  각자 진행 중인 학습이나 프로젝트를 가져와 정해진 시간 동안 함께
                  작업합니다. 완벽한 결과보다 꾸준히 시작하고 이어가는 것을 돕는
                  시간입니다.
                </p>
              </article>

              <article className="rounded-2xl border hairline bg-white p-6 shadow-sm shadow-black/[0.02]">
                <h3 className="text-2xl font-medium tracking-tight">
                  Monthly Scrum
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#64748b]">
                  진행 과정과 의료 현장의 인사이트를 나누는 월간 세션
                </p>
                <p className="mt-4 text-sm leading-7 text-[#64748b]">
                  프로젝트 진행 상황, 의료 현장에서 발견한 질문, 새롭게 배운 점과
                  막힌 점을 공유합니다. 서로 피드백하고 다음에 시도할 작은 행동을
                  정리합니다.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t hairline bg-white py-20 text-[#111827]"
        id="contact"
      >
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">04 / CONTACT &amp; JOIN</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              Contact &amp; Join HealCode
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#64748b]">
              HealCode와 함께 배우고 만들고 싶다면 가입 신청서를 남겨주세요.
              운영자가 내용을 확인한 뒤 멤버 계정과 참여 방법을 안내합니다.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border hairline bg-[#f8fafc] p-6">
                <p className="text-sm font-semibold text-[#64748b]">운영 문의</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">임예제</h3>
                <a
                  className="mt-4 inline-block text-sm leading-7 text-[#64748b] underline underline-offset-4"
                  href="mailto:yj7832@korea.ac.kr"
                >
                  yj7832@korea.ac.kr
                </a>
              </article>

              <article className="rounded-2xl border hairline bg-[#e6edf5] p-6">
                <p className="text-sm font-semibold text-[#64748b]">가입 신청</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                  Website Application
                </h3>
                <a
                  className="mt-5 inline-flex rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#020617]"
                  href="/login#apply"
                >
                  가입 신청서 작성
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
