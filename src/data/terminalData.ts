export interface Line {
  type: 'input' | 'output' | 'error' | 'system' | 'section' | 'item';
  text: string;
}

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
