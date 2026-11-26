import type { Screenshot } from '@/components/screenshots/ScreenshotGallery';
import type { TeamMember } from '@/components/TeamMemberCard';
import type { WorkLogEntry } from '@/components/worklog/WorkLog';

export interface PublicProjectLinks {
  github?: string | null;
  site?: string | null;
}

export interface TroubleshootingItem {
  title: string;
  problem: string;
  cause?: string;
  solution: string;
  result?: string;
  link?: { label: string; url: string };
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface Project {
  id: number;
  hidden?: boolean;
  title: string;
  desc: string;
  story?: {
    overview: string;
    motivation?: string;
    contributions: string[];
  };
  date?: string;
  status: string;
  icon: string;
  iconImage?: string;
  image: string | null;
  type: 'team' | 'personal';
  screenshots: Screenshot[];
  worklog?: WorkLogEntry[];
  tech: string[];
  features?: string[];
  problems?: string[];
  solutions?: string[];
  team?: TeamMember[];
  links: PublicProjectLinks;
  troubleshooting?: TroubleshootingItem[];
  refactoring?: string[];
  outcomes?: string[];
  techStack?: TechStackGroup[];
  video?: string;
}
