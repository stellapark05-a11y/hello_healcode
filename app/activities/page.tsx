import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { activities, pointActivities, site, tierCuts } from "@/lib/site-data";

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Activities</p>
            <h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
              지금 진행 중인 일
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6d6a65]">
              healcode가 공개하고 준비 중인 실험을 모아둔 페이지입니다. 앞으로는
              디스코드 기록과 제품 데모가 이곳에 함께 연결됩니다.
            </p>
          </div>

          <div className="grid gap-0 border-t hairline md:grid-cols-3">
            {activities.map((activity) => (
              <article
                className="border-b hairline py-6 md:border-b-0 md:border-l md:px-6"
                key={activity.title}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-[#6d6a65]">{activity.date}</p>
                  <span className="rounded-full border hairline px-3 py-1 text-xs font-semibold">
                    {activity.tag}
                  </span>
                </div>
                <h2 className="mt-8 text-2xl font-medium tracking-tight">{activity.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#6d6a65]">{activity.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-[#181817] py-24 text-white">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow !text-white/55">Points and tiers</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight">
                활동은 포인트로 기록하고 티어로 이어집니다.
              </h2>
            </div>
            <a
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#181817]"
              href={site.notionTierUrl}
              rel="noreferrer"
              target="_blank"
            >
              노션 원문 보기
            </a>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_.75fr]">
            <div className="grid gap-0 border-t border-white/15 md:grid-cols-2">
              {pointActivities.map((group) => (
                <article
                  className="border-b border-white/15 py-6 md:border-l md:px-6"
                  key={group.category}
                >
                  <h3 className="text-2xl font-medium tracking-tight">{group.category}</h3>
                  <div className="mt-6 grid gap-4">
                    {group.items.map((item) => (
                      <div className="grid grid-cols-[56px_1fr] gap-4" key={item.name}>
                        <span className="text-sm text-white/55">{item.points}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="mt-1 text-sm text-white/55">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="border-t border-white/15 pt-6">
              <Image
                alt="healcode sign"
                className="h-auto w-40"
                height={79}
                src="/healcode-sign.svg"
                width={160}
              />
              <h3 className="mt-10 text-3xl font-medium tracking-tight">티어 컷</h3>
              <div className="mt-6 border-t border-white/15">
                {tierCuts.map((tier) => (
                  <div
                    className="flex items-center justify-between border-b border-white/15 py-4"
                    key={tier.tier}
                  >
                    <span className="font-medium">{tier.tier}</span>
                    <span className="text-white/55">{tier.points}</span>
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
