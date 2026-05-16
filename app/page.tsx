import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import {
  activities,
  methods,
  metrics,
  principles,
  roadmap,
  site,
} from "@/lib/site-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <section className="relative isolate min-h-screen overflow-hidden">
        <Image
          alt="healcode visual"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fill
          priority
          src="/healcode-visual.svg"
        />
        <div className="absolute inset-0 -z-10 bg-[#f6f3ed]/62" />
        <SiteHeader />

        <div className="section-shell flex min-h-[calc(100vh-6rem)] flex-col justify-between pb-10 pt-8">
          <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center text-center">
            <p className="eyebrow">{site.eyebrow}</p>
            <h1 className="mt-8 text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              {site.name}
            </h1>
            <p className="mt-6 max-w-3xl text-2xl font-medium leading-tight text-[#2d2b28] sm:text-4xl">
              {site.tagline}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#5f5a54] sm:text-lg">
              {site.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full bg-[#181817] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#303030]"
                href="#activities"
              >
                {site.primaryAction}
              </a>
              <a
                className="rounded-full border hairline bg-white/70 px-6 py-3 text-sm font-semibold text-[#181817] transition hover:bg-white"
                href="#method"
              >
                {site.secondaryAction}
              </a>
            </div>
          </div>

          <div className="grid gap-3 border-t hairline pt-6 md:grid-cols-3">
            {metrics.map((item) => (
              <div className="flex items-end justify-between gap-6" key={item.label}>
                <p className="text-sm text-[#6d6a65]">{item.label}</p>
                <p className="text-lg font-semibold tracking-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-[#fbfaf7] py-24" id="method">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow">01 / How we work</p>
              <h2 className="mt-5 max-w-md text-4xl font-medium leading-tight tracking-tight">
                건강한 생활에 닿는 소프트웨어를 만듭니다.
              </h2>
            </div>
            <div className="grid gap-0 border-t hairline md:grid-cols-3">
              {principles.map((card) => (
                <article
                  className="border-b hairline py-6 md:border-b-0 md:border-l md:px-6"
                  key={card.title}
                >
                  <h3 className="text-xl font-medium tracking-tight">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6d6a65]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t hairline py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">02 / Focus</p>
            <h2 className="mt-5 max-w-md text-4xl font-medium leading-tight tracking-tight">
              리서치에서 배포까지 한 번에 연결합니다.
            </h2>
          </div>
          <ol className="border-t hairline">
            {methods.map((item, index) => (
              <li
                className="flex items-center justify-between gap-6 border-b hairline py-5"
                key={item}
              >
                <span className="text-sm text-[#6d6a65]">0{index + 1}</span>
                <span className="flex-1 text-lg font-medium">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t hairline bg-[#181817] py-24 text-white" id="activities">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow !text-white/55">03 / Activities</p>
              <h2 className="mt-5 text-4xl font-medium tracking-tight">
                지금 진행 중인 일
              </h2>
            </div>
            <a
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#181817]"
              href="/activities"
            >
              포인트와 티어 제도 보기
            </a>
          </div>

          <div className="mt-12 grid gap-0 border-t border-white/15 md:grid-cols-3">
            {activities.map((activity) => (
              <article
                className="border-b border-white/15 py-6 md:border-b-0 md:border-l md:px-6"
                key={activity.title}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-white/55">{activity.date}</p>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold">
                    {activity.tag}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-medium tracking-tight">{activity.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{activity.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline py-24" id="roadmap">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">04 / Roadmap</p>
            <h2 className="mt-5 max-w-md text-4xl font-medium leading-tight tracking-tight">
              작은 공개에서 실제 제품으로
            </h2>
          </div>
          <ol className="border-t hairline">
            {roadmap.map((item, index) => (
              <li
                className="flex items-center justify-between gap-6 border-b hairline py-5"
                key={item}
              >
                <span className="text-sm text-[#6d6a65]">0{index + 1}</span>
                <span className="flex-1 text-lg font-medium">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
