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
    <main className="min-h-screen bg-[#f7f5ee] text-[#17211c]">
      <SiteHeader />

      <section
        className="relative isolate overflow-hidden border-b border-[#ded8c8]"
        id="about"
      >
        <Image
          alt="healcode visual"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fill
          priority
          src="/healcode-visual.svg"
        />
        <div className="absolute inset-0 -z-10 bg-[#f7f5ee]/76" />
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl content-center gap-10 px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <Image
              alt="healcode sign"
              className="mb-7 h-24 w-24 rounded-lg bg-[#101010] object-contain p-2 shadow-xl shadow-black/10"
              height={96}
              src="/healcode-sign.svg"
              width={96}
            />
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#245a4b]">
              {site.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[1.06] tracking-tight text-[#10231d] sm:text-7xl lg:text-8xl">
              {site.name}
            </h1>
            <p className="mt-5 max-w-3xl text-3xl font-black leading-tight text-[#173b31] sm:text-5xl">
              {site.tagline}
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#394941] sm:text-lg">
              {site.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-md bg-[#173b31] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#245a4b]"
                href="#activities"
              >
                {site.primaryAction}
              </a>
              <a
                className="rounded-md border border-[#aeb8b0] bg-[#f7f5ee]/80 px-5 py-3 text-center text-sm font-bold text-[#173b31] transition hover:border-[#173b31] hover:bg-white"
                href="#method"
              >
                {site.secondaryAction}
              </a>
            </div>
          </div>
          <div className="grid max-w-4xl gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                className="rounded-md border border-[#d3cdbc] bg-[#fffdf8]/82 p-4"
                key={item.label}
              >
                <p className="text-xl font-black text-[#173b31]">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-[#607068]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10" id="method">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b0443f]">
              How we work
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10231d]">
              건강한 생활에 닿는 소프트웨어를 만듭니다.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((card) => (
              <article
                className="rounded-md border border-[#e1ded2] bg-[#fbfaf5] p-6"
                key={card.title}
              >
                <h3 className="text-xl font-black text-[#173b31]">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#526058]">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#ded8c8] bg-[#eef3ef] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#245a4b]">
              Focus
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10231d]">
              리서치에서 배포까지 한 번에 연결합니다.
            </h2>
          </div>
          <ul className="grid gap-3">
            {methods.map((item, index) => (
              <li
                className="flex items-center gap-4 rounded-md bg-white p-4 ring-1 ring-[#d6ddd7]"
                key={item}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#e1b955] text-sm font-black text-[#10231d]">
                  {index + 1}
                </span>
                <span className="font-bold text-[#283830]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#10231d] px-5 py-16 text-white sm:px-8 lg:px-10" id="activities">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#79c7bd]">
                Activities
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">
                지금 진행 중인 일
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#d7e5dc]">
              소개 페이지는 시작점입니다. 앞으로 활동 기록, 실험 결과, 제품 데모를
              차례로 연결해 실제 서비스 형태로 확장합니다.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {activities.map((activity) => (
              <article
                className="rounded-md border border-white/12 bg-white/7 p-5"
                key={activity.title}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-[#79c7bd]">{activity.date}</p>
                  <span className="rounded bg-white px-2 py-1 text-xs font-black text-[#10231d]">
                    {activity.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black">{activity.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#dce9e1]">
                  {activity.body}
                </p>
              </article>
            ))}
          </div>
          <a
            className="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-black text-[#10231d] transition hover:bg-[#e1b955]"
            href="/activities"
          >
            포인트와 티어 제도 보기
          </a>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10" id="roadmap">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b0443f]">
              Roadmap
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10231d]">
              작은 공개에서 실제 제품으로
            </h2>
          </div>
          <ol className="grid gap-3">
            {roadmap.map((item, index) => (
              <li
                className="flex items-center gap-4 rounded-md bg-white p-4 ring-1 ring-[#e1ded2]"
                key={item}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#173b31] text-sm font-black text-white">
                  {index + 1}
                </span>
                <span className="font-bold text-[#283830]">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
