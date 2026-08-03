import type { Metadata } from "next";
import { InteriorPage } from "../components/interior-page";

export const metadata: Metadata = {
  title: "Projects | HealCode",
  description: "HealCode 멤버가 탐색하고 구현하는 프로젝트 사례를 소개합니다.",
};

const projectPoints = [
  {
    label: "Problem",
    text: "임상 기록과 사고 과정을 더 명확한 구조로 정리하는 방법을 탐색합니다.",
  },
  {
    label: "Approach",
    text: "POMR 방식에 맞춘 기록 흐름을 웹 기반 프로토타입으로 실험합니다.",
  },
  {
    label: "Status",
    text: "의료적 효과를 주장하는 서비스가 아닌, 기록 구조를 탐색하는 멤버 주도 프로젝트입니다.",
  },
];

export default function ProjectPage() {
  return (
    <InteriorPage
      eyebrow="02 / PROJECT SPOTLIGHT"
      intro="임상 기록과 사고 과정을 구조화하는 방법을 탐색하는 멤버 주도 프로젝트입니다."
      title="POMR Coach"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {projectPoints.map((point) => (
          <article
            className="rounded-2xl border hairline bg-white p-6"
            key={point.label}
          >
            <p className="eyebrow">{point.label}</p>
            <p className="mt-5 leading-7 text-[#64748b]">{point.text}</p>
          </article>
        ))}
      </div>

      <a
        className="mt-10 inline-flex rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#020617]"
        href="https://pomr-coach-516460607949.asia-northeast3.run.app/"
        rel="noreferrer"
        target="_blank"
      >
        POMR Coach 살펴보기
      </a>
    </InteriorPage>
  );
}
