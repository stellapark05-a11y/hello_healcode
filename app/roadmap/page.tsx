import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { roadmap } from "@/lib/site-data";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#17211c]">
      <SiteHeader />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b0443f]">
              Roadmap
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#10231d] sm:text-6xl">
              작은 공개에서 실제 제품으로
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#394941]">
              지금은 소개 페이지에서 시작하지만, 이후에는 아카이브, API, 제품
              데모까지 순서대로 연결합니다.
            </p>
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
