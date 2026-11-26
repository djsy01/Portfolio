// components/SafariContent.tsx
'use client';
import { useState } from 'react';
import { useWindowStore } from '@/store/useWindowStore';
import styles from './SafariContent.module.css';
import { FolderOpen, ArrowLeft } from 'lucide-react';
import { ScreenshotGallery, type Screenshot } from './screenshots/ScreenshotGallery';
import { sortTeamMembers } from '@/lib/sortTeamMembers';
import projectsData from '@/data/projects.json';
import { ProjectAiUsage } from './ProjectAiUsage';
import { ProjectDetailIcon } from './ProjectDetailIcon';
import { ProjectLinks, type PublicProjectLinks } from './ProjectLinks';
import { WorkLog, type WorkLogEntry } from './worklog/WorkLog';
import { ProjectStory, type ProjectStoryData } from './story/ProjectStory';

import { TeamMemberCard, type TeamMember } from "./TeamMemberCard";

interface Project {
  id: number;
  hidden?: boolean;
  title: string;
  desc: string;
  story?: ProjectStoryData;
  date: string;
  status: string;
  icon: string;
  iconImage?: string;
  type: string;
  screenshots: Screenshot[];
  worklog?: WorkLogEntry[];
  tech: string[];
  problems?: string[];
  solutions?: string[];
  features?: string[];
  team?: TeamMember[];
  links: PublicProjectLinks;
}

const PROJECTS = projectsData as Project[];

export const SafariContent = () => {
  const { selectedProject: storeSelectedProject } = useWindowStore();
  const [currentView, setCurrentView] = useState<'detail' | 'website'>('detail');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [prevStoreProject, setPrevStoreProject] = useState(storeSelectedProject);

  // Reset view when selected project changes (React-recommended derived state pattern)
  if (prevStoreProject !== storeSelectedProject) {
    setPrevStoreProject(storeSelectedProject);
    if (storeSelectedProject !== null) {
      setCurrentView('detail');
      setCurrentUrl('');
    }
  }

  const handleBackToDetail = () => {
    setCurrentView('detail');
    setCurrentUrl('');
  };

  const openSite = (url: string) => {
    setCurrentUrl(url);
    setCurrentView('website');
  };

  const project = PROJECTS.find((p) => p.id === storeSelectedProject);
  return (
    <div className={styles.safariContainer}>
      {/* Safari Address Bar */}
      <div className={styles.addressBar}>
        {currentView === 'website' && (
          <button onClick={handleBackToDetail} className={styles.backButton}>
            <ArrowLeft size={18} />
          </button>
        )}
        <div className={styles.urlBar}>{currentUrl || project?.title || 'Safari'}</div>
      </div>

      {/* Empty State */}
      {!project && currentView === 'detail' && (
        <div className={styles.emptyState}>
          <FolderOpen size={64} color="#d1d5db" />
          <h3 className={styles.emptyTitle}>프로젝트를 선택해주세요</h3>
          <p className={styles.emptyDesc}>Finder에서 프로젝트 폴더를 클릭하세요</p>
        </div>
      )}

      {/* Detail View */}
      {currentView === 'detail' && project && (
        <div className={styles.projectDetail}>
          <ProjectDetailIcon icon={project.icon} iconImage={project.iconImage} />

          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>{project.title}</h2>
            <div className={styles.statusRow}>
              <span className={`${styles.status} ${project.status === "완료" ? styles.statusDone : project.status === "예정" ? styles.statusPlanned : styles.statusInProgress}`}>{project.status}</span>
              {project.date && <span className={styles.date}>📅 {project.date}</span>}
            </div>
          </div>

          <p className={styles.desc}>{project.desc}</p>
          <ProjectStory story={project.story} sectionClassName={styles.section} />

          {/* Tech Stack */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>🛠️ 기술 스택</h3>
            <div className={styles.techStack}>
              {project.tech.map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          {project.team && project.team.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{project.type === 'team' ? '👥 팀 구성' : '개발자'}</h3>
              <div className={styles.teamList}>
                {sortTeamMembers(project.team).map((member) => (
                  <TeamMemberCard key={member.name} member={member} classes={{
                    card: styles.teamMember, header: styles.memberHeader, name: styles.memberName,
                    role: styles.memberRole, list: styles.responsibilitiesList,
                  }} />
                ))}
              </div>
            </div>
          )}

          <WorkLog key={project.id} entries={project.worklog}
            sectionClassName={styles.section} titleClassName={styles.sectionTitle} />
          <ProjectAiUsage projectId={project.id} sectionClassName={styles.section} titleClassName={styles.sectionTitle} />

          {/* Features */}
          {project.features && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>✨ 주요 기능</h3>
              <ul className={styles.list}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Problems */}
          {project.problems && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>🔧 개선 포인트</h3>
              <ul className={styles.list}>
                {project.problems.map((problem, index) => (
                  <li key={index}>{problem}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Solutions */}
          {project.solutions && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>✅ 해결 방안</h3>
              <ul className={styles.list}>
                {project.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          )}

          {project.screenshots.length > 0 && (
            <div className={styles.section}>
              <ScreenshotGallery key={project.id} screenshots={project.screenshots} titleClassName={styles.sectionTitle} />
            </div>
          )}

          <ProjectLinks
            links={project.links}
            rowClassName={styles.links}
            linkClassName={styles.linkButton}
            onOpenSite={openSite}
          />
        </div>
      )}

      {/* Website iframe */}
      {currentView === 'website' && currentUrl && (
        <div className={styles.iframeContainer}>
          <iframe src={currentUrl} className={styles.iframe} title={project?.title || 'Website'} />
        </div>
      )}
    </div>
  );
};
