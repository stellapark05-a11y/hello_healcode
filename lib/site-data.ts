export const site = {
  name: "healcode",
  tagline: "건강의 문제를 코드로 풀어내는 실험 그룹",
  eyebrow: "Health data, practical care, useful software",
  description:
    "healcode는 일상 속 건강 문제를 관찰하고, 데이터와 소프트웨어로 작게 검증하는 팀입니다. 기록, 상담 준비, 루틴 관리처럼 반복되는 불편을 빠르게 제품화하며 실제로 도움이 되는 도구를 만듭니다.",
  primaryAction: "활동 보기",
  secondaryAction: "팀 소개",
  contactEmail: "hello@healcode.kr",
  discordUrl: "https://discord.com/",
  notionTierUrl:
    "https://ambiguous-skateboard-371.notion.site/HealCode-Points-and-Tier-Cuts-31757a295354807c93a5cfa6c6580633",
};

export const navItems = [
  { label: "소개", href: "/about" },
  { label: "방식", href: "/method" },
  { label: "활동", href: "/activities" },
  { label: "로드맵", href: "/roadmap" },
  { label: "프로젝트", href: "/dashboard" },
];

export const metrics = [
  { label: "운영 형태", value: "Research group" },
  { label: "핵심 분야", value: "Health x Code" },
  { label: "현재 단계", value: "MVP planning" },
];

export const principles = [
  {
    title: "문제를 선명하게 정의합니다",
    body: "건강 기록, 병원 방문 준비, 생활 습관 추적처럼 실제 사용자가 반복해서 겪는 불편을 관찰하고 작은 질문으로 나눕니다.",
  },
  {
    title: "작게 만들고 빠르게 검증합니다",
    body: "프로토타입, 자동화 스크립트, API, 대시보드 등 검증 가능한 형태로 구현하고 사용 흐름을 빠르게 확인합니다.",
  },
  {
    title: "배운 것을 공유합니다",
    body: "실험 로그와 회고를 남겨 팀 안팎의 사람들이 더 쉽게 따라오고 다음 제품으로 이어갈 수 있게 합니다.",
  },
];

export const methods = [
  "사용자 문제와 상황 맥락 리서치",
  "건강 기록 데이터 구조화",
  "Next.js 기반 프론트엔드 프로토타입",
  "Cloud Run API와 운영 자동화",
];

export const discordGuide = [
  {
    title: "채널을 주제별로 나눕니다",
    body: "아이디어, 리서치, 개발 기록, 회의록, 참고 링크를 각각 다른 채널에 남겨 나중에 빠르게 찾을 수 있게 합니다.",
  },
  {
    title: "하나의 작업은 하나의 스레드로 정리합니다",
    body: "작업을 시작할 때 목표, 진행 내용, 결정 사항을 같은 스레드에 이어서 남기면 아카이브가 흐트러지지 않습니다.",
  },
  {
    title: "결정된 내용은 마지막에 요약합니다",
    body: "논의가 끝나면 실행할 일, 담당자, 다음 확인 날짜를 짧게 정리해 다음 작업자가 바로 이어받을 수 있게 합니다.",
  },
];

export const activities = [
  {
    date: "2026.05",
    title: "healcode 소개 페이지 공개",
    body: "팀의 문제의식, 작업 방식, 진행 중인 실험을 한곳에서 볼 수 있는 첫 웹페이지를 준비했습니다.",
    tag: "Website",
  },
  {
    date: "준비 중",
    title: "건강 기록 MVP 기획",
    body: "일상 기록을 정리하고 상담 전에 핵심 정보를 빠르게 확인할 수 있는 MVP 범위를 정의하고 있습니다.",
    tag: "Product",
  },
  {
    date: "준비 중",
    title: "Cloud Run API 설계",
    body: "활동 기록과 구성원 데이터를 API로 제공할 수 있도록 백엔드 구조와 배포 흐름을 설계합니다.",
    tag: "Backend",
  },
];

export const pointActivities = [
  {
    category: "정기활동",
    items: [
      { name: "모각코 참여", points: "10", note: "출석 인증" },
      { name: "Monthly Scrum 참여", points: "10", note: "프로젝트 공유 세션" },
    ],
  },
  {
    category: "프로젝트",
    items: [
      { name: "팀 프로젝트 월간 참여", points: "15", note: "해당 월 활동 인정시" },
      { name: "산출물 기여", points: "+10", note: "PR, 문서, 이슈 해결 등" },
      { name: "개인 프로젝트 데모 및 최종 산출 공유", points: "20", note: "#build-lab 공유" },
    ],
  },
  {
    category: "교육과 커뮤니티",
    items: [
      { name: "CrossXDomain session 진행", points: "40", note: "발표자/진행자" },
      { name: "CrossXDomain session 참여", points: "10", note: "참여자" },
      { name: "디코 챗 참여", points: "5", note: "build-lab, looking-for-party 등" },
    ],
  },
  {
    category: "운영",
    items: [
      { name: "운영 회의 참여", points: "10", note: "모든 HealCoder 참여 가능" },
      { name: "운영진 의뢰 프로젝트 참여", points: "30", note: "운영 기여" },
      { name: "ops 운영진 활동 참여", points: "30", note: "운영진 활동" },
    ],
  },
];

export const tierCuts = [
  { tier: "Bronze", points: "20+" },
  { tier: "Silver", points: "60+" },
  { tier: "Gold", points: "120+" },
  { tier: "Platinum", points: "200+" },
  { tier: "Diamond", points: "320+" },
  { tier: "freezed_member", points: "<20" },
];

export const roadmap = [
  "정적 소개 페이지 공개",
  "구성원 프로필과 활동 로그 업데이트",
  "Cloud Run 기반 API 연결",
  "Vercel 프로덕션 배포",
  "첫 번째 MVP 데모 공개",
];
