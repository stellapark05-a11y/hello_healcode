import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SpaceHero } from "./components/space-hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080d] text-[#111827]">
      <div className="absolute inset-x-0 top-0 z-20">
        <SiteHeader tone="dark" />
      </div>
      <SpaceHero />

      <div className="home-journal">
        <section id="about" className="journal-band">
          <h2>팀 소개</h2>
          <div>
            <h3>진료실에서 나온 질문을<br />작은 프로젝트로 옮깁니다.</h3>
            <p>힐코드에는 의료인과 공학도가 함께 있습니다. 의료인은 현장에서 겪은 일을 들려주고, 개발자는 그 이야기를 바탕으로 첫 버전을 만듭니다. 같이 써 보면서 다음에 고칠 곳을 찾습니다.</p>
            <a href="/about">힐코드 소개 읽기</a>
          </div>
        </section>

        <section id="project" className="journal-band project-band">
          <h2>멤버 프로젝트</h2>
          <div>
            <h3 lang="en">POMR Coach</h3>
            <p>임상 기록을 쓰면서 생각의 순서를 짚어 보는 도구입니다. 힐코드 멤버들이 문제 중심 의무기록(POMR)을 주제로 만들고 있습니다.</p>
            <a href="https://pomr-coach-516460607949.asia-northeast3.run.app/" target="_blank" rel="noreferrer">POMR Coach 열기</a>
          </div>
        </section>

        <section id="activities" className="journal-band">
          <h2>정기 활동</h2>
          <div className="journal-agenda">
            <article><span>집중 세션</span><h3>모각코</h3><p>같은 시간에 접속해 각자의 코드를 쓰고 공부합니다. 지금 하고 있는 작업을 가져오면 됩니다.</p></article>
            <article><span>매월</span><h3>Monthly Scrum</h3><p>한 달 동안 만든 것과 막힌 지점을 꺼내 놓습니다. 동료의 피드백을 듣고 다음에 해 볼 일을 정합니다.</p></article>
            <a href="/activities">활동과 포인트 기준 보기</a>
          </div>
        </section>

        <section id="contact" className="journal-band">
          <h2>문의 · 가입</h2>
          <div>
            <h3>힐코드에 함께하려면</h3>
            <p>신청서를 남겨 주시면 운영진이 검토한 뒤 참여 방법을 안내합니다.</p>
            <div className="journal-links"><a href="/login#apply">가입 신청서 작성</a><a href="mailto:yj7832@korea.ac.kr">운영진 임예제에게 메일</a></div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
