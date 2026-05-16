import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { discordGuide, methods, site } from "@/lib/site-data";

export default function MethodPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#181817]">
      <SiteHeader />
      <section className="section-shell py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Method</p>
            <h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
              디스코드에 기록하고, 제품으로 검증합니다.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6d6a65]">
              healcode는 아이디어와 회의 내용을 흩어지게 두지 않고 디스코드에
              아카이빙합니다. 논의, 참고자료, 결정사항을 같은 흐름 안에 남겨 다음
              실험으로 바로 이어지게 합니다.
            </p>
            <a
              className="mt-10 inline-flex rounded-full bg-[#181817] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#303030]"
              href={site.discordUrl}
              rel="noreferrer"
              target="_blank"
            >
              디스코드로 이동
            </a>
          </div>

          <ol className="border-t hairline">
            {methods.map((item, index) => (
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

      <section className="border-t hairline bg-[#fbfaf7] py-24">
        <div className="section-shell">
          <p className="eyebrow">Discord guide</p>
          <h2 className="mt-5 text-4xl font-medium tracking-tight">디스코드 사용 방법</h2>
          <div className="mt-12 grid gap-0 border-t hairline md:grid-cols-3">
            {discordGuide.map((item) => (
              <article
                className="border-b hairline py-6 md:border-b-0 md:border-l md:px-6"
                key={item.title}
              >
                <h3 className="text-2xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#6d6a65]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
