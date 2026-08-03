import type { Metadata } from "next";
import Link from "next/link";
import { InteriorPage } from "../components/interior-page";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact & Join | HealCode",
  description: "HealCode에 문의하거나 멤버십 참여를 신청할 수 있습니다.",
};

export default function ContactPage() {
  return (
    <InteriorPage
      eyebrow="04 / CONTACT & JOIN"
      intro="HealCode와 함께 배우고 만들고 싶다면 가입 신청서를 남겨주세요. 운영자가 내용을 확인한 뒤 멤버 계정과 참여 방법을 안내합니다."
      title="Contact & Join HealCode"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border hairline bg-white p-7">
          <p className="eyebrow">운영 문의</p>
          <h2 className="mt-4 text-2xl font-medium">임예제</h2>
          <a
            className="mt-6 inline-block underline underline-offset-4"
            href={`mailto:${site.contactEmail}`}
          >
            {site.contactEmail}
          </a>
        </article>

        <article className="rounded-2xl border hairline bg-[#e6edf5] p-7">
          <p className="eyebrow">가입 신청</p>
          <h2 className="mt-4 text-2xl font-medium">Website Application</h2>
          <p className="mt-4 leading-7 text-[#64748b]">
            가입 신청 후 운영진의 확인을 거쳐 멤버 계정이 활성화됩니다.
          </p>
          <Link
            className="mt-6 inline-flex rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#020617]"
            href="/login#apply"
          >
            가입 신청서 작성
          </Link>
        </article>
      </div>
    </InteriorPage>
  );
}
