import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { activities, pointActivities, site, tierCuts } from "@/lib/site-data";

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-[#10231d] text-white">
      <SiteHeader />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#79c7bd]">
            Activities
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            지금 진행 중인 일
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#d7e5dc]">
            healcode가 공개하고 준비 중인 실험을 모아둔 페이지입니다. 앞으로는
            디스코드 기록과 제품 데모가 이곳에 함께 연결됩니다.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
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
                <h2 className="mt-5 text-xl font-black">{activity.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#dce9e1]">
                  {activity.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-[#f7f5ee] px-5 py-16 text-[#17211c] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#245a4b]">
                Points and tiers
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10231d]">
                활동은 포인트로 기록하고 티어로 이어집니다.
              </h2>
            </div>
            <a
              className="rounded-md bg-[#173b31] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#245a4b]"
              href={site.notionTierUrl}
              rel="noreferrer"
              target="_blank"
            >
              노션 원문 보기
            </a>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {pointActivities.map((group) => (
                <article
                  className="rounded-md border border-[#ded8c8] bg-white p-5"
                  key={group.category}
                >
                  <h3 className="text-xl font-black text-[#173b31]">
                    {group.category}
                  </h3>
                  <div className="mt-5 grid gap-3">
                    {group.items.map((item) => (
                      <div
                        className="grid grid-cols-[64px_1fr] gap-3 rounded-md bg-[#eef3ef] p-3"
                        key={item.name}
                      >
                        <span className="rounded bg-[#10231d] px-2 py-1 text-center text-sm font-black text-white">
                          {item.points}
                        </span>
                        <div>
                          <p className="font-bold text-[#283830]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#526058]">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-md border border-[#ded8c8] bg-[#10231d] p-5 text-white">
              <Image
                alt="healcode sign"
                className="h-20 w-20 rounded-md bg-black object-contain p-2"
                height={80}
                src="/healcode-sign.svg"
                width={80}
              />
              <h3 className="mt-6 text-2xl font-black">티어 컷</h3>
              <div className="mt-5 grid gap-3">
                {tierCuts.map((tier) => (
                  <div
                    className="flex items-center justify-between rounded-md bg-white/8 px-4 py-3 ring-1 ring-white/10"
                    key={tier.tier}
                  >
                    <span className="font-bold">{tier.tier}</span>
                    <span className="rounded bg-[#e1b955] px-3 py-1 text-sm font-black text-[#10231d]">
                      {tier.points}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
