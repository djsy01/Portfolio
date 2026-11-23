import type { Line } from '@/data/terminalData';
import { HELP, MANUAL, WELCOME, SPECS } from '@/data/terminalData';
import profile from '@/data/profile.json';
import projects from '@/data/projects.json';
import { sortProjects } from './sortProjects';

export type { Line } from '@/data/terminalData';
export type CommandResult = Line[];

const section = (title: string): Line => ({ type: 'section', text: `◆ ${title}` });
const item = (text: string): Line => ({ type: 'item', text });
const output = (text: string): Line => ({ type: 'output', text });
const displayName = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);

function projectLines(): Line[] {
  const visible = sortProjects(projects.filter((project) => !project.hidden));
  return ['fullstack', 'frontend', 'backend'].flatMap((category) => {
    const members = visible.filter((project) => project.category === category);
    if (!members.length) return [];
    return [
      section(displayName(category)),
      ...members.map(({ title, status }) => item(`  · ${title} (${status})`)),
    ];
  });
}

export const COMMANDS: Record<string, () => CommandResult> = {
  whoami: () => profile.whoami.split('\n').map(output),
  skills: () => Object.entries(profile.skills).flatMap(([group, skills]) => [
    section(group === 'tools' ? 'Deploy / Tools' : displayName(group)), item(skills.join('  ·  ')),
  ]),
  projects: projectLines,
  contact: () => Object.entries(profile.contact).map(([key, value]) => output(`${key.padEnd(8)}: ${value}`)),
  help: () => HELP,
  menual: () => MANUAL,
  specs: () => SPECS,
  clear: () => [],
};

export const getWelcome = (): Line[] => WELCOME;
