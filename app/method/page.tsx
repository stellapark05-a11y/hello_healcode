import { InteriorPage } from "../components/interior-page";
import { discordGuide, site } from "@/lib/site-data";

export default function MethodPage() {
  return (
    <InteriorPage eyebrow="Method" title="디스코드 아카이브" intro="아이디어부터 회고까지, 프로젝트의 진행 과정을 디스코드에 기록합니다.">
      <ol className="list-decimal space-y-6 pl-6">{discordGuide.map((step) => <li key={step.title}><h2 className="text-xl font-semibold">{step.title}</h2><p className="mt-2 leading-7">{step.body}</p></li>)}</ol>
      <p className="mt-8">이미 가입한 멤버는 <a className="underline" href={site.discordUrl}>디스코드 열기</a>에서 HealCode 서버를 선택하세요. 초대가 필요하면 <a className="underline" href={`mailto:${site.contactEmail}`}>운영진에게 문의</a>하세요.</p>
    </InteriorPage>
  );
}
