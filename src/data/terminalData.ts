import type { PortfolioType } from '@/store/useWindowStore';
import { text } from 'stream/consumers';

export interface Line {
    type: 'input' | 'output' | 'error' | 'system' | 'section' | 'item';
    text: string;
}

/* ===================== WHOAMI ===================== */
export const WHOAMI: Record<PortfolioType, Line[]> = {
    frontend: [
        { type: 'output', text: '엄인호 — Frontend Developer' },
        { type: 'output', text: '사용자 경험 중심으로 설계하고, React / Vue / Next.js 로 구현합니다.' },
    ],
    backend: [
        { type: 'output', text: '엄인호 — Backend Developer (학습 중)' },
        { type: 'output', text: '서버 아키텍처와 API 설계를 공부하며,' },
        { type: 'output', text: '프론트 경험을 바탕으로 백엔드 역량을 확장 중입니다.' },
    ],
    fullstack: [
        { type: 'output', text: '엄인호 — Fullstack Developer' },
        { type: 'output', text: '프론트엔드 메인, 백엔드 협업 경험을 보유한 풀스택 지향 개발자입니다.' },
        { type: 'output', text: 'UI/UX 설계부터 API 연동, 배포까지 전 과정을 아우릅니다.' },
    ],
};

/* ===================== SKILLS ===================== */
export const SKILLS: Record<PortfolioType, Line[]> = {
    frontend: [
        { type: 'section', text: '◆ Languages' },
        { type: 'item', text: 'HTML  ·  CSS  ·  JavaScript  ·  TypeScript' },
        { type: 'section', text: '◆ Frameworks / Libraries' },
        { type: 'item', text: 'React  ·  Vue.js  ·  Next.js' },
        { type: 'section', text: '◆ Styling' },
        { type: 'item', text: 'Tailwind CSS  ·  CSS Modules  ·  Framer Motion' },
        { type: 'section', text: '◆ Tools' },
        { type: 'item', text: 'Git  ·  GitHub  ·  Vercel  ·  Netlify' },
    ],
    backend: [
        { type: 'section', text: '◆ Runtime / Languages' },
        { type: 'item', text: 'Node.js  ·  JavaScript  ·  TypeScript' },
        { type: 'section', text: '◆ Frameworks' },
        { type: 'item', text: 'Express.js  (학습 중)' },
        { type: 'section', text: '◆ Database' },
        { type: 'item', text: 'MySQL  ·  Redis' },
        { type: 'section', text: '◆ Infra / Deploy' },
        { type: 'item', text: 'Railway  ·  Render  ·  GitHub Actions' },
    ],
    fullstack: [
        { type: 'section', text: '◆ Frontend' },
        { type: 'item', text: 'React  ·  Vue.js  ·  Next.js  ·  TypeScript  ·  Tailwind CSS' },
        { type: 'section', text: '◆ Backend' },
        { type: 'item', text: 'Node.js  ·  Express.js' },
        { type: 'section', text: '◆ Database' },
        { type: 'item', text: 'MySQL  ·  Redis' },
        { type: 'section', text: '◆ Deploy / Tools' },
        { type: 'item', text: 'Vercel  ·  Railway  ·  Render  ·  Git  ·  GitHub' },
    ],
};

/* ===================== PROJECTS ===================== */
export const PROJECTS: Record<PortfolioType, Line[]> = {
    frontend: [
        { type: 'item', text: '  · OBED 웹사이트 리뉴얼              (진행중)' },
        { type: 'item', text: '  · 티켓팅 사이트 프론트엔드          (진행중)' },
        { type: 'item', text: '  · UT Tailwind 컴포넌트 라이브러리   (완료)' },
        { type: 'item', text: '  · 개인 포트폴리오 사이트            (완료)' },
    ],
    backend: [{ type: 'output', text: '  ※ 백엔드 개인 프로젝트를 준비 중입니다.' }],
    fullstack: [{ type: 'item', text: '  · 개인 포트폴리오         (완료)    — Next.js + TypeScript' }],
};

/* ===================== CONTACT (공통) ===================== */
export const CONTACT: Line[] = [
    { type: 'output', text: 'email   : dlsgh8884@naver.com' },
    { type: 'output', text: 'github  : github.com/djsy01' },
];

/* ===================== HELP ===================== */
export const HELP: Record<PortfolioType, Line[]> = {
    frontend: [
        { type: 'output', text: '사용 가능한 명령어 [Frontend Mode]:' },
        { type: 'item', text: '  whoami    — 개발자 소개' },
        { type: 'item', text: '  skills    — 프론트엔드 기술 스택' },
        { type: 'item', text: '  projects  — 프론트엔드 프로젝트 목록' },
        { type: 'item', text: '  contact   — 연락처' },
        { type: 'item', text: '  menual    — 사이트 사용 방법' },
        { type: 'item', text: '  clear     — 터미널 초기화' },
    ],
    backend: [
        { type: 'output', text: '사용 가능한 명령어 [Backend Mode]:' },
        { type: 'item', text: '  whoami    — 개발자 소개' },
        { type: 'item', text: '  skills    — 백엔드 기술 스택' },
        { type: 'item', text: '  projects  — 백엔드 프로젝트 목록' },
        { type: 'item', text: '  contact   — 연락처' },
        { type: 'item', text: '  menual    — 사이트 사용 방법' },
        { type: 'item', text: '  clear     — 터미널 초기화' },
    ],
    fullstack: [
        { type: 'output', text: '사용 가능한 명령어 [Fullstack Mode]:' },
        { type: 'item', text: '  whoami    — 개발자 소개' },
        { type: 'item', text: '  skills    — 풀스택 기술 스택' },
        { type: 'item', text: '  projects  — 전체 프로젝트 목록' },
        { type: 'item', text: '  contact   — 연락처' },
        { type: 'item', text: '  menual    — 사이트 사용 방법' },
        { type: 'item', text: '  clear     — 터미널 초기화' },
    ],
};

/* ===================== MENUAL(공용) ===================== */
export const MENUAL: Line[] = [
    { type: 'output', text: '사이트 사용 방법:' },
    { type: 'item', text: '  menu bar (Portfolio)   — 사용자 전환' },
    { type: 'item', text: '  finder (Folder)        — 프로젝트 확인' },
    { type: 'item', text: '  safari (Internet)      — 각 프로젝트 상세 보기' },
    { type: 'item', text: '  terminal (Terminal)    — 명령어 입력' },
];

/* ===================== WELCOME ===================== */
export const WELCOME: Record<PortfolioType, Line[]> = {
    frontend: [
        { type: 'system', text: `Last login: ${new Date().toLocaleDateString('ko-KR')} on ttys001` },
        { type: 'system', text: '[ Frontend Mode ]' },
        { type: 'system', text: "Type 'help' to see commands, or 'menual' to learn how to use this site." },
    ],
    backend: [
        { type: 'system', text: `Last login: ${new Date().toLocaleDateString('ko-KR')} on ttys001` },
        { type: 'system', text: '[ Backend Mode ]' },
        { type: 'system', text: "Type 'help' to see commands, or 'menual' to learn how to use this site." },
    ],
    fullstack: [
        { type: 'system', text: `Last login: ${new Date().toLocaleDateString('ko-KR')} on ttys001` },
        { type: 'system', text: '[ Fullstack Mode ]' },
        { type: 'system', text: "Type 'help' to see commands, or 'menual' to learn how to use this site." },
    ],
};
