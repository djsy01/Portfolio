import profile from "@/data/profile.json";

export interface Line {
  type: "input" | "output" | "error" | "system" | "section" | "item";
  text: string;
}

export type CommandResult = Line[];

const skillsLines = (): CommandResult => [
  { type: "section", text: "◆ Front-End" },
  { type: "item",    text: profile.skills.frontend.join("  ·  ") },
  { type: "section", text: "◆ Back-End" },
  { type: "item",    text: profile.skills.backend.join("  ·  ") },
  { type: "section", text: "◆ Database" },
  { type: "item",    text: profile.skills.database.join("  ·  ") },
  { type: "section", text: "◆ Tools" },
  { type: "item",    text: profile.skills.tools.join("  ·  ") },
];

export const COMMANDS: Record<string, () => CommandResult> = {
  whoami: () => [{ type: "output", text: profile.whoami }],

  skills: skillsLines,

  projects: () =>
    profile.projects.map((p) => ({
      type: "item" as const,
      text: `  · ${p.title}  (${p.status})`,
    })),

  contact: () => [{ type: "output", text: `email : ${profile.contact.email}` }],

  help: () => [
    { type: "output", text: "사용 가능한 명령어:" },
    { type: "item",   text: "  whoami    — 개발자 소개" },
    { type: "item",   text: "  skills    — 기술 스택" },
    { type: "item",   text: "  projects  — 프로젝트 목록" },
    { type: "item",   text: "  contact   — 연락처" },
    { type: "item",   text: "  clear     — 터미널 초기화" },
    { type: "item",   text: "  help      — 도움말" },
  ],
};

export const WELCOME: Line[] = [
  {
    type: "system",
    text: `Last login: ${new Date().toLocaleDateString("ko-KR")} on ttys001`,
  },
  { type: "system", text: "Type 'help' to see available commands." },
];
