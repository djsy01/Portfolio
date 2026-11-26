'use client';
import { useState } from 'react';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import projects from '@/data/projects.json';
import { useWindowStore } from '@/store/useWindowStore';
import type { Project } from '@/types/project';
import { ProjectDetailBody } from './detail/ProjectDetailBody';
import { ProjectSafariHeader } from './detail/ProjectSafariHeader';
import { ProjectLinks } from './ProjectLinks';
import styles from './SafariContent.module.css';

const PROJECTS = projects as Project[];

function SafariView({ project }: { project?: Project }) {
  const [siteUrl, setSiteUrl] = useState<string | null>(null);
  return (
    <div className={styles.safariContainer}>
      <div className={styles.addressBar}>
        {siteUrl && (
          <button type="button" aria-label="프로젝트로 돌아가기" className={styles.backButton}
            onClick={() => setSiteUrl(null)}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        )}
        <div className={styles.urlBar}>{siteUrl || project?.title || 'Safari'}</div>
      </div>
      {siteUrl ? (
        <div className={styles.iframeContainer}>
          <iframe src={siteUrl} className={styles.iframe} title={project?.title || 'Website'} />
        </div>
      ) : project ? (
        <div className={styles.projectDetail}>
          <ProjectSafariHeader project={project} />
          <ProjectDetailBody key={project.id} project={project} />
          <ProjectLinks links={project.links} rowClassName={styles.links}
            linkClassName={styles.linkButton} onOpenSite={setSiteUrl} />
        </div>
      ) : (
        <div className={styles.emptyState}>
          <FolderOpen size={64} color="#d1d5db" />
          <h3 className={styles.emptyTitle}>프로젝트를 선택해주세요</h3>
          <p className={styles.emptyDesc}>Finder에서 프로젝트 폴더를 클릭하세요</p>
        </div>
      )}
    </div>
  );
}

export function SafariContent() {
  const selectedId = useWindowStore((state) => state.selectedProject);
  const project = PROJECTS.find(({ id }) => id === selectedId);
  return <SafariView key={selectedId} project={project} />;
}
