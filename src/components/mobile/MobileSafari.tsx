'use client';
import { useState } from 'react';
import projects from '@/data/projects.json';
import type { Project } from '@/types/project';
import { ProjectDetailBody } from '../detail/ProjectDetailBody';
import { ProjectSafariHeader } from '../detail/ProjectSafariHeader';
import { ProjectLinks } from '../ProjectLinks';
import { MobileSafariProjects } from './MobileSafariProjects';
import styles from './MobileSafari.module.css';

interface Props {
  initialProjectId?: number | null;
}

const PROJECTS = projects as Project[];

export function MobileSafari({ initialProjectId }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(initialProjectId ?? null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const project = PROJECTS.find(({ id }) => id === selectedId);

  if (iframeUrl) {
    return (
      <div className={styles.iframeWrap}>
        <div className={styles.iframeBar}>
          <button className={styles.backBtn} onClick={() => setIframeUrl(null)}>‹ 뒤로</button>
          <span className={styles.iframeUrl}>{iframeUrl}</span>
        </div>
        <iframe src={iframeUrl} className={styles.iframe} title="Live Site" />
      </div>
    );
  }

  if (!project) return <MobileSafariProjects projects={PROJECTS} onSelect={setSelectedId} />;


  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <button className={styles.backSmall} aria-label="프로젝트 목록으로 돌아가기"
          onClick={() => setSelectedId(null)}>‹</button>
        <span className={styles.searchText}>{project.title}</span>
      </div>
      <div className={styles.detail}>
        <ProjectSafariHeader project={project} mobile />
        <ProjectDetailBody key={project.id} project={project} mobile />
        <ProjectLinks links={project.links} rowClassName={styles.linkRow}
          linkClassName={styles.linkBtn} onOpenSite={setIframeUrl} />
      </div>
    </div>
  );
}
