import { InteriorPage } from "../components/interior-page";
import { roadmap } from "@/lib/site-data";

export default function RoadmapPage() {
  return (
    <InteriorPage eyebrow="Roadmap" title="로드맵" intro="힐코드 웹사이트와 멤버 공간의 개발 계획입니다.">
      <ol className="list-decimal divide-y pl-6">{roadmap.map((step) => <li className="py-5 text-lg" key={step}>{step}</li>)}</ol>
    </InteriorPage>
  );
}
