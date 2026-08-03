import type { Metadata } from "next";
import { InteriorPage } from "../components/interior-page";
import { activities } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Activities | HealCode",
  description: "HealCode의 현재 활동과 함께 배우고 만드는 방식을 소개합니다.",
};

export default function ActivitiesPage() {
  return (
    <InteriorPage
      eyebrow="03 / ACTIVITIES"
      intro="각자의 작업을 꾸준히 이어가고, 의료와 기술 사이에서 발견한 질문과 배움을 나눕니다."
      title="How We Learn & Build"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border hairline bg-white p-7">
          <p className="eyebrow">Focus session</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight">모각코</h2>
          <p className="mt-4 leading-7 text-[#64748b]">
            각자 진행 중인 학습이나 프로젝트를 가져와 정해진 시간 동안 함께
            작업합니다. 완벽한 결과보다 꾸준히 시작하고 이어가는 것을 돕습니다.
          </p>
        </article>
        <article className="rounded-2xl border hairline bg-white p-7">
          <p className="eyebrow">Monthly sharing</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight">
            Monthly Scrum
          </h2>
          <p className="mt-4 leading-7 text-[#64748b]">
            프로젝트 진행 상황, 의료 현장에서 발견한 질문, 새롭게 배운 점과 막힌
            점을 공유하고 다음에 시도할 작은 행동을 정리합니다.
          </p>
        </article>
      </div>

      <div className="mt-14">
        <p className="eyebrow">Current activities</p>
        <div className="mt-6 divide-y hairline border-y hairline">
          {activities.map((activity) => (
            <article
              className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-start"
              key={activity.title}
            >
              <p className="text-sm font-semibold text-[#64748b]">
                {activity.date}
              </p>
              <div>
                <h3 className="text-xl font-medium">{activity.title}</h3>
                <p className="mt-2 leading-7 text-[#64748b]">{activity.body}</p>
              </div>
              <span className="w-fit rounded-full border border-[#cbd5e1] bg-[#e6edf5] px-3 py-1 text-xs font-semibold">
                {activity.tag}
              </span>
            </article>
          ))}
        </div>
      </div>
    </InteriorPage>
  );
}
