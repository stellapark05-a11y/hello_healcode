import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { roadmap } from "@/lib/site-data";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Roadmap</p>
            <h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
              작은 공개에서 실제 제품으로
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6d6a65]">
              지금은 소개 페이지에서 시작하지만, 이후에는 아카이브, API, 제품 데모까지
              순서대로 연결합니다.
            </p>
          </div>
          <ol className="border-t hairline">
            {roadmap.map((item, index) => (
              <li
                className="flex items-center justify-between gap-6 border-b hairline py-6"
                key={item}
              >
                <span className="text-sm text-[#6d6a65]">0{index + 1}</span>
                <span className="flex-1 text-xl font-medium tracking-tight">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
