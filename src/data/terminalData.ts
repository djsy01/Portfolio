export interface Line {
  type: 'input' | 'output' | 'error' | 'system' | 'section' | 'item';
  text: string;
}

/* ===================== WHOAMI ===================== */
export const WHOAMI: Line[] = [
  { type: 'output', text: '엄인호 — Web Developer' },
  { type: 'output', text: '사용자 경험 중심으로 설계하고, React / Vue / Next.js 로 구현합니다.' },
  { type: 'output', text: 'Node.js / NestJS 기반 백엔드까지 영역을 넓혀가는 풀스택 지향 개발자입니다.' },
];

/* ===================== SKILLS ===================== */
export const SKILLS: Line[] = [
  { type: 'section', text: '◆ Languages' },
  { type: 'item', text: 'HTML  ·  CSS  ·  JavaScript  ·  TypeScript' },
  { type: 'section', text: '◆ Frontend' },
  { type: 'item', text: 'React  ·  Vue.js  ·  Next.js  ·  Tailwind CSS  ·  Zustand' },
  { type: 'section', text: '◆ Backend' },
  { type: 'item', text: 'Node.js  ·  NestJS  ·  Prisma  ·  Supabase' },
  { type: 'section', text: '◆ Database' },
  { type: 'item', text: 'MySQL  ·  PostgreSQL  ·  Redis  ·  SQLite' },
  { type: 'section', text: '◆ Deploy / Tools' },
  { type: 'item', text: 'Git  ·  GitHub  ·  Vercel  ·  Netlify  ·  Railway  ·  Render' },
];

/* ===================== PROJECTS ===================== */
export const PROJECTS: Line[] = [
  { type: 'section', text: '◆ Fullstack' },
  { type: 'item', text: '  · WorshipLog                     (진행중)' },
  { type: 'item', text: '  · RogiArm                        (완료)' },
  { type: 'section', text: '◆ Frontend' },
  { type: 'item', text: '  · OBED 웹사이트 리뉴얼               (진행중)' },
  { type: 'item', text: '  · Cookeat                        (완료)' },
  { type: 'item', text: '  · Poke-Archive                   (완료)' },
  { type: 'item', text: '  · UT Tailwind 컴포넌트 라이브러리     (완료)' },
  { type: 'item', text: '  · 개인 포트폴리오 사이트               (완료)' },
];

/* ===================== CONTACT ===================== */
export const CONTACT: Line[] = [
  { type: 'output', text: 'email   : dlsgh8884@naver.com' },
  { type: 'output', text: 'github  : github.com/djsy01' },
];

/* ===================== HELP ===================== */
export const HELP: Line[] = [
  { type: 'output', text: '사용 가능한 명령어:' },
  { type: 'item', text: '  whoami    — 개발자 소개' },
  { type: 'item', text: '  skills    — 기술 스택' },
  { type: 'item', text: '  projects  — 분야별 프로젝트 목록' },
  { type: 'item', text: '  contact   — 연락처' },
  { type: 'item', text: '  specs     — 개발 환경 사양' },
  { type: 'item', text: '  menual    — 사이트 사용 방법' },
  { type: 'item', text: '  clear     — 터미널 초기화' },
];

/* ===================== MENUAL ===================== */
export const MANUAL: Line[] = [
  { type: 'output', text: '사이트 사용 방법:' },
  { type: 'item', text: '  menu bar (Portfolio)   — 로그아웃' },
  { type: 'item', text: '  finder (Folder)        — 분야별(Frontend / Backend / Fullstack) 프로젝트 확인' },
  { type: 'item', text: '  safari (Internet)      — 각 프로젝트 상세 보기' },
  { type: 'item', text: '  terminal (Terminal)    — 명령어 입력' },
];

export const SPECS: Line[] = [{ type: 'output', text: ' M5 Macbook Pro 14 24GB RAM 1TB SSD ' }];

/* ===================== WELCOME ===================== */
export const WELCOME: Line[] = [
  { type: 'system', text: `Last login: ${new Date().toLocaleDateString('ko-KR')} on ttys001` },
  { type: 'system', text: "Type 'help' to see commands, or 'menual' to learn how to use this site." },
];
