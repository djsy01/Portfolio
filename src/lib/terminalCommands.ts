import type { Line } from '@/data/terminalData';
import { WHOAMI, SKILLS, PROJECTS, CONTACT, HELP, MANUAL, WELCOME, SPECS } from '@/data/terminalData';

export type { Line } from '@/data/terminalData';
export type CommandResult = Line[];

export const COMMANDS: Record<string, () => CommandResult> = {
  whoami: () => WHOAMI,
  skills: () => SKILLS,
  projects: () => PROJECTS,
  contact: () => CONTACT,
  help: () => HELP,
  menual: () => MANUAL,
  specs: () => SPECS,
  clear: () => [],
};

export const getWelcome = (): Line[] => WELCOME;
