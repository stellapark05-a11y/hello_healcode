import type { Metadata } from "next";
import { InteriorPage } from "../components/interior-page";
import { methods, principles } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | HealCode",
  description: "의료와 기술 사이의 언어를 연결하며 서로 배우는 HealCode를 소개합니다.",
};

export default function AboutPage() {
  return (
    <InteriorPage
      eyebrow="01 / ABOUT"
      intro="좋은 의료 기술은 구현 능력만으로 완성되지 않습니다. 의료 현장의 맥락과 기술의 언어를 연결하며 서로에게 배웁니다."
      title="의료와 기술 사이의 언어를 연결합니다."
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">what we do</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight">
            Healer와 Crafter가 함께 배우고 만듭니다.
          </h2>
        </div>
        <div className="grid gap-4">
          {principles.map((principle) => (
            <article
              className="rounded-2xl border hairline bg-white p-6"
              key={principle.title}
            >
              <h3 className="text-xl font-medium">{principle.title}</h3>
              <p className="mt-3 leading-7 text-[#64748b]">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t hairline pt-12">
        <p className="eyebrow">how we build</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {methods.map((method) => (
            <li className="rounded-xl border border-[#cbd5e1] bg-[#e6edf5] p-5 leading-7" key={method}>
              {method}
            </li>
          ))}
        </ul>
      </div>
    </InteriorPage>
  );
}
