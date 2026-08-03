export const site = {
  name: "HealCode",
  tagline: "Heal First. Build Together.",
  eyebrow: "HEALTHCARE × TECHNOLOGY COMMUNITY",
  description:
    "의료인과 공학도가 서로의 언어를 배우고, 환자와 의료 현장을 먼저 이해하며, 필요한 해결책을 함께 만들어가는 커뮤니티입니다.",
  primaryAction: "HealCode 소개",
  secondaryAction: "가입 신청 · 멤버 로그인",
  contactEmail: "yj7832@korea.ac.kr",
  discordUrl: "https://discord.com/",
  notionTierUrl:
    "https://ambiguous-skateboard-371.notion.site/HealCode-Points-and-Tier-Cuts-31757a295354807c93a5cfa6c6580633",
};

export const navItems = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/project" },
  { label: "activities", href: "/activities" },
  { label: "contact & join", href: "/contact" },
];

export const metrics = [
  { label: "구성원", value: "Healer × Crafter" },
  { label: "함께하는 방식", value: "Learn × Build × Share" },
  { label: "우리가 먼저 보는 것", value: "Heal First" },
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
    title: "Heal First",
    body: "기술보다 사람, 환자와 의료 현장의 필요를 먼저 봅니다.",
  },
  {
    title: "Learn Across Domains",
    body: "Healer와 Crafter가 서로를 단순한 의뢰인이나 작업자로 대하지 않고 서로의 언어를 배웁니다.",
  },
  {
    title: "Build Responsibly",
    body: "빠른 구현만큼 맥락, 안전, 데이터와 결과에 대한 책임을 중요하게 생각합니다.",
  },
  {
    title: "Share the Process",
    body: "완성된 성과뿐 아니라 질문, 시행착오와 배운 점을 함께 나눕니다.",
  },
  {
    title: "Small but Meaningful",
    body: "규모와 홍보 수치보다 실제로 배우고 기여하는 관계와 경험을 우선합니다.",
  },
];

export const methods = [
  "의료 현장의 맥락과 문제를 함께 이해하기",
  "서로의 전문 언어와 관점을 배우기",
  "작은 실험과 프로토타입으로 가정을 검토하기",
  "질문, 시행착오, 결과와 회고를 함께 남기기",
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
    date: "정기 활동",
    title: "모각코",
    body: "각자가 진행 중인 학습·개발 작업을 가져와 함께 집중하는 온라인 세션입니다.",
    tag: "Focus Session",
  },
  {
    date: "월간 활동",
    title: "Monthly Scrum",
    body: "프로젝트 진행 상황, 임상 현장의 관찰, 배운 점과 막힌 점을 공유하고 피드백합니다.",
    tag: "Share & Review",
  },
  {
    date: "2026.08.06",
    title: "2026 Summer Demo Day",
    body: "멤버의 프로젝트와 배움을 오프라인에서 공유하는 데모데이입니다.",
    tag: "Demo Day",
  },
];

export const contributors = ["수영", "정은", "재은"];

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
export const site = {
  name: "HealCode",
  tagline: "Heal First. Build Together.",
  eyebrow: "HEALTHCARE × TECHNOLOGY COMMUNITY",
  description:
    "의료인과 공학도가 서로의 언어를 배우고, 환자와 의료 현장을 먼저 이해하며, 필요한 해결책을 함께 만들어가는 커뮤니티입니다.",
  primaryAction: "HealCode 소개",
  secondaryAction: "가입 신청 · 멤버 로그인",
  contactEmail: "yj7832@korea.ac.kr",
  discordUrl: "https://discord.com/",
  notionTierUrl:
    "https://ambiguous-skateboard-371.notion.site/HealCode-Points-and-Tier-Cuts-31757a295354807c93a5cfa6c6580633",
};

export const navItems = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/project" },
  { label: "activities", href: "/activities" },
];

export const metrics = [
  { label: "구성원", value: "Healer × Crafter" },
  { label: "함께하는 방식", value: "Learn × Build × Share" },
  { label: "우리가 먼저 보는 것", value: "Heal First" },
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
    title: "Heal First",
    body: "기술보다 사람, 환자와 의료 현장의 필요를 먼저 봅니다.",
  },
  {
    title: "Learn Across Domains",
    body: "Healer와 Crafter가 서로를 단순한 의뢰인이나 작업자로 대하지 않고 서로의 언어를 배웁니다.",
  },
  {
    title: "Build Responsibly",
    body: "빠른 구현만큼 맥락, 안전, 데이터와 결과에 대한 책임을 중요하게 생각합니다.",
  },
  {
    title: "Share the Process",
    body: "완성된 성과뿐 아니라 질문, 시행착오와 배운 점을 함께 나눕니다.",
  },
  {
    title: "Small but Meaningful",
    body: "규모와 홍보 수치보다 실제로 배우고 기여하는 관계와 경험을 우선합니다.",
  },
];

export const methods = [
  "의료 현장의 맥락과 문제를 함께 이해하기",
  "서로의 전문 언어와 관점을 배우기",
  "작은 실험과 프로토타입으로 가정을 검토하기",
  "질문, 시행착오, 결과와 회고를 함께 남기기",
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
    date: "정기 활동",
    title: "모각코",
    body: "각자가 진행 중인 학습·개발 작업을 가져와 함께 집중하는 온라인 세션입니다.",
    tag: "Focus Session",
  },
  {
    date: "월간 활동",
    title: "Monthly Scrum",
    body: "프로젝트 진행 상황, 임상 현장의 관찰, 배운 점과 막힌 점을 공유하고 피드백합니다.",
    tag: "Share & Review",
  },
  {
    date: "2026.08.06",
    title: "2026 Summer Demo Day",
    body: "멤버의 프로젝트와 배움을 오프라인에서 공유하는 데모데이입니다.",
    tag: "Demo Day",
  },
];

export const contributors = ["수영", "정은", "재은"];

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

