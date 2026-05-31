import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SpaceHero } from "./components/space-hero";
import {
  confirmedOperations,
  members,
  studyItems,
} from "@/lib/site-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080d] text-[#181817]">
      <div className="absolute inset-x-0 top-0 z-20">
        <SiteHeader tone="dark" />
      </div>
      <SpaceHero />

      <section className="bg-[#f7f7f4] py-20 text-[#181817]" id="operations">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <div>
              <p className="eyebrow">01 / 운영 구조</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
                가입, 권한, 포인트만 명확하게 운영합니다.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#6d6a65]">
                공개 페이지는 소개와 가입 안내에 집중하고, 멤버 기능은 로그인 이후에만
                확인할 수 있게 분리합니다.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {confirmedOperations.map((card) => (
                <article
                  className="rounded-2xl border hairline bg-white p-6 shadow-sm shadow-black/[0.02]"
                  key={card.title}
                >
                  <h3 className="text-xl font-medium tracking-tight">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6d6a65]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-white py-20 text-[#181817]" id="members">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <div>
              <p className="eyebrow">02 / 구성원</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
                현재는 대표와 멤버 구조만 공개합니다.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#6d6a65]">
                구성원 실명과 상세 프로필은 공개 범위가 확정되면 이 섹션에서 교체합니다.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {members.map((member) => (
                <article
                  className="rounded-2xl border hairline bg-[#fbfaf7] p-6"
                  key={member.name}
                >
                  <p className="text-sm font-semibold text-[#6d6a65]">{member.role}</p>
                  <h3 className="mt-3 text-3xl font-medium tracking-tight">{member.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6d6a65]">{member.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-[#f7f7f4] py-20 text-[#181817]">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">03 / 배포와 백엔드</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight">
              Vercel, Supabase, Cloud Run을 역할별로 나눠 검토합니다.
            </h2>
            <div className="mt-10 overflow-hidden rounded-2xl border hairline bg-white">
              {studyItems.map((item) => (
                <article
                  className="grid gap-3 border-b hairline p-6 last:border-b-0 md:grid-cols-[180px_1fr]"
                  key={item.name}
                >
                  <h3 className="text-xl font-medium tracking-tight">{item.name}</h3>
                  <p className="text-sm leading-7 text-[#6d6a65]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
