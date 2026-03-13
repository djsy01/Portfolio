import type { PortfolioType } from '@/store/useWindowStore';
import type { Line } from '@/data/terminalData';
import { WHOAMI, SKILLS, PROJECTS, CONTACT, HELP, MANUAL, WELCOME, SPECS } from '@/data/terminalData';

export type { Line } from '@/data/terminalData';
export type CommandResult = Line[];

export const getCommands = (type: PortfolioType | null): Record<string, () => CommandResult> => {
  const t = type ?? 'frontend';
  return {
    whoami: () => WHOAMI[t],
    skills: () => SKILLS[t],
    projects: () => PROJECTS[t],
    contact: () => CONTACT,
    help: () => HELP[t],
    menual: () => MANUAL,
    specs: () => SPECS,
    clear: () => [],
  };
};

export const getWelcome = (type: PortfolioType | null): Line[] => {
  return WELCOME[type ?? 'frontend'];
};

// 호환용 기본값 (MobileTerminal 등에서 직접 import 시)
export const COMMANDS = getCommands('frontend');
