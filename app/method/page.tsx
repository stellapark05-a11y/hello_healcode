import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { discordGuide, methods, site } from "@/lib/site-data";

export default function MethodPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ee] text-[#17211c]">
      <SiteHeader />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#b0443f]">
              Method
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#10231d] sm:text-6xl">
              디스코드에 기록하고, 제품으로 검증합니다.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#394941]">
              healcode는 아이디어와 회의 내용을 흩어지게 두지 않고 디스코드에
              아카이빙합니다. 논의, 참고자료, 결정사항을 같은 흐름 안에 남겨
              다음 실험으로 바로 이어지게 합니다.
            </p>
            <a
              className="mt-8 inline-flex rounded-md bg-[#173b31] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#245a4b]"
              href={site.discordUrl}
              rel="noreferrer"
              target="_blank"
            >
              디스코드로 이동
            </a>
          </div>
          <div className="rounded-md border border-[#d3cdbc] bg-white p-6">
            <h2 className="text-2xl font-black text-[#173b31]">작업 흐름</h2>
            <ul className="mt-6 grid gap-3">
              {methods.map((item, index) => (
                <li
                  className="flex items-center gap-4 rounded-md bg-[#eef3ef] p-4"
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
        </div>
      </section>
      <section className="border-y border-[#ded8c8] bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#245a4b]">
            Discord guide
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10231d]">
            디스코드 사용 방법
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {discordGuide.map((item) => (
              <article
                className="rounded-md border border-[#e1ded2] bg-[#fbfaf5] p-6"
                key={item.title}
              >
                <h3 className="text-xl font-black text-[#173b31]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#526058]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
