export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: "github" | "blog" | "portfolio" | "linkedin" | "email" | "link";
  isCopyAction?: boolean;
}

export interface Skill {
  name: string;
  brand?: boolean;
}

export interface ProfileData {
  avatarText: string;
  badge: string;
  greetingTitle: string;
  bioText: string;
  contactEmail: string;
  skills: Skill[];
  links: LinkItem[];
}

export const DEFAULT_LINKS: LinkItem[] = [
  {
    id: "link-1",
    title: "GitHub",
    subtitle: "오픈소스 기여와 코드 저장소를 둘러보세요",
    url: "https://github.com",
    icon: "github",
  },
  {
    id: "link-2",
    title: "기술 블로그 (Velog)",
    subtitle: "개발하면서 배운 지식과 회고를 기록해요",
    url: "https://velog.io",
    icon: "blog",
  },
  {
    id: "link-3",
    title: "노션 포트폴리오",
    subtitle: "프로젝트 트러블슈팅과 상세 과정을 담았어요",
    url: "https://notion.so",
    icon: "portfolio",
  },
  {
    id: "link-4",
    title: "LinkedIn 프로필",
    subtitle: "이력과 학력, 커리어 히스토리를 확인해보세요",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    id: "link-5",
    title: "AI 데이터 분석 데모 프로젝트",
    subtitle: "직접 체험해볼 수 있는 웹 서비스 데모예요",
    url: "https://demo.example.com",
    icon: "link",
  },
  {
    id: "link-6",
    title: "이메일 주소 복사",
    subtitle: "contact@example.com",
    url: "contact@example.com",
    icon: "email",
    isCopyAction: true,
  },
];

export const DEFAULT_PROFILE: ProfileData = {
  avatarText: "장",
  badge: "🎓 정보시스템학과",
  greetingTitle: "안녕하세요,\n개발자 장연재예요",
  bioText: "데이터와 코드로 일상의 문제를 해결해요. 견고한 소프트웨어를 만들기 위해 꾸준히 배우고 있어요.",
  contactEmail: "contact@example.com",
  skills: [
    { name: "Next.js", brand: true },
    { name: "React", brand: true },
    { name: "TypeScript", brand: false },
    { name: "Python", brand: false },
    { name: "데이터 분석", brand: false },
    { name: "UI/UX", brand: false },
  ],
  links: DEFAULT_LINKS,
};
