// TEST123456789
export const site = {
  name: "healcode",
  tagline: "Discord 소개문구를 그대로 반영할 예정입니다",
  eyebrow: "Healthcare x Code",
  description:
    "Discord에 있는 공식 소개문구를 보내주면 이 영역에 그대로 교체합니다. 지금은 임의 소개문구를 제거하고 운영 기능 중심으로만 남겨두었습니다.",
  primaryAction: "운영 구조 보기",
  secondaryAction: "가입 신청",
  contactEmail: "yj7832@korea.ac.kr",
  discordUrl: "https://discord.com/",
  notionTierUrl:
    "https://ambiguous-skateboard-371.notion.site/HealCode-Points-and-Tier-Cuts-31757a295354807c93a5cfa6c6580633",
};

export const navItems = [
  { label: "home", href: "/" },
  { label: "about", href: "/#about" },
  { label: "project", href: "/#project" },
  { label: "activities", href: "/#activities" },
  { label: "contact&join us", href: "/#contact" },
  { label: "login", href: "/login" },
];

export const metrics = [
  { label: "가입", value: "Manager approval" },
  { label: "포인트", value: "Member dashboard" },
  { label: "업로드", value: "Permission based" },
];

export const confirmedOperations = [
  {
    title: "매니저 승인형 회원가입",
    body: "신규 신청자는 폼을 제출하고, 매니저가 승인한 계정만 로그인할 수 있습니다.",
  },
  {
    title: "멤버 포인트 확인",
    body: "로그인한 멤버는 대시보드에서 본인의 포인트와 계정 상태를 확인합니다.",
  },
  {
    title: "공개 프로젝트 업로드 권한",
    body: "홍보용으로 공개할 프로젝트 업로드는 별도 권한을 받은 멤버에게만 열립니다.",
  },
];

export const members = [
  {
    name: "대표",
    role: "Manager",
    body: "가입 신청 검토, 멤버 권한 관리, 포인트 운영 기준을 담당합니다. 실제 이름은 확정 후 교체합니다.",
  },
  {
    name: "멤버",
    role: "HealCoder",
    body: "승인된 멤버는 개인 포인트를 확인하고, 권한을 받은 경우 공개 프로젝트를 업로드할 수 있습니다.",
  },
];

export const representative = {
  name: "대표 멤버",
  role: "Founder / Manager",
  description:
    "healcode의 운영 방향을 잡고 신규 멤버 신청을 검토합니다. 실제 이름과 소개 문구는 최종 확인 후 교체할 수 있습니다.",
};

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
  "의료 현장의 문제를 발견하고 서비스 아이디어로 구체화",
  "웹 서비스와 프로토타입 제작",
  "AI와 데이터 분석을 활용한 헬스케어 실험",
  "디스코드 기반 기록과 기여 포인트 운영",
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
    title: "healcode 소개 페이지 운영",
    body: "단체 소개, 활동 기록, 가입 신청, 멤버 전용 기능을 한곳에서 관리하는 웹사이트를 구축하고 있습니다.",
    tag: "Website",
  },
  {
    date: "준비 중",
    title: "승인형 멤버십 운영",
    body: "가입 신청을 먼저 받고 매니저가 검토한 뒤 프로젝트 업로드 권한을 부여하는 흐름을 준비합니다.",
    tag: "Membership",
  },
  {
    date: "준비 중",
    title: "포인트 대시보드",
    body: "로그인한 멤버가 자신의 누적 포인트와 활동 상태를 직접 확인할 수 있도록 멤버 페이지를 확장합니다.",
    tag: "Dashboard",
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
      {
        name: "팀 프로젝트 월간 참여",
        points: "15",
        note: "해당 월 활동 인정시",
      },
      { name: "산출물 기여", points: "+10", note: "PR, 문서, 이슈 해결 등" },
      {
        name: "개인 프로젝트 데모 및 최종 산출 공유",
        points: "20",
        note: "#build-lab 공유",
      },
    ],
  },
  {
    category: "교육과 커뮤니티",
    items: [
      {
        name: "CrossXDomain session 진행",
        points: "40",
        note: "발표자/진행자",
      },
      { name: "CrossXDomain session 참여", points: "10", note: "참여자" },
      {
        name: "디코 챗 참여",
        points: "5",
        note: "build-lab, looking-for-party 등",
      },
    ],
  },
  {
    category: "운영",
    items: [
      {
        name: "운영 회의 참여",
        points: "10",
        note: "모든 HealCoder 참여 가능",
      },
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
  "소개, 활동, 연락처 중심의 공개 페이지 정리",
  "가입 신청 폼과 매니저 승인 흐름 도입",
  "멤버 로그인과 포인트 대시보드 연결",
  "Supabase 기반 인증과 데이터 권한 정리",
  "Vercel 프론트엔드와 Cloud Run 백엔드 확장",
];

export const architecture = [
  {
    name: "Vercel",
    role: "프론트엔드 배포",
    body: "Next.js 페이지를 빠르게 배포하고 미리보기 환경을 운영합니다.",
  },
  {
    name: "Supabase",
    role: "인증 / 데이터 / 파일",
    body: "멤버 로그인, 프로필, 포인트, 프로젝트 파일을 관리합니다.",
  },
  {
    name: "Cloud Run",
    role: "커스텀 백엔드",
    body: "추후 별도 API, 배치 작업, 관리자용 로직이 필요해질 때 확장합니다.",
  },
];

export const studyItems = [
  {
    name: "Supabase",
    body: "Auth, RLS, profiles, applications, projects, storage 권한을 먼저 정리합니다.",
  },
  {
    name: "Cloud Run",
    body: "관리자 자동화, 포인트 정산, 외부 API가 필요해질 때 백엔드 후보로 검토합니다.",
  },
  {
    name: "Vercel",
    body: "Next.js 공개 사이트와 미리보기 배포를 담당하는 프론트엔드 배포 후보입니다.",
  },
];
