"use client";
import { useState } from "react";
import projects from "@/data/projects.json";
import styles from "./MobileSafari.module.css";
import { convertImageUrl } from "@/lib/imageUtils";
import { sortTeamMembers } from "@/lib/sortTeamMembers";
import { ProjectAiUsage } from "../ProjectAiUsage";
import { ProjectDetailIcon } from "../ProjectDetailIcon";
import { ProjectLinks, type PublicProjectLinks } from "../ProjectLinks";

import { TeamMemberCard, type TeamMember } from "../TeamMemberCard";

interface Project {
  id: number;
  title: string;
  desc: string;
  date?: string;
  status: string;
  icon: string;
  iconImage?: string;
  image: string | null;
  images: string[];
  imageLabels?: string[];
  type: string;
  tech: string[];
  problems?: string[];
  solutions?: string[];
  features?: string[];
  team?: TeamMember[];
  links: PublicProjectLinks;
}

interface MobileSafariProps {
  initialProjectId?: number | null;
}

export const MobileSafari = ({ initialProjectId }: MobileSafariProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(initialProjectId ?? null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const project = (projects as Project[]).find((p) => p.id === selectedId);
  const galleryImages = project?.images ?? [];

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

  if (lightboxIdx !== null) {
    return (
      <div className={styles.lightboxScreen} onClick={() => setLightboxIdx(null)}>
        <button className={styles.lightboxClose} onClick={() => setLightboxIdx(null)}>✕</button>
        <img
          src={convertImageUrl(galleryImages[lightboxIdx])}
          alt={project?.imageLabels?.[lightboxIdx] ?? `스크린샷 ${lightboxIdx + 1}`}
          className={styles.lightboxImg}
          onClick={(e) => e.stopPropagation()}
        />
        <div className={styles.lightboxNav}>
          <button
            className={styles.lightboxBtn}
            disabled={lightboxIdx === 0}
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
          >‹</button>
          <span className={styles.lightboxCount}>{lightboxIdx + 1} / {galleryImages.length}</span>
          <button
            className={styles.lightboxBtn}
            disabled={lightboxIdx === galleryImages.length - 1}
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
          >›</button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <span className={styles.searchPlaceholder}>프로젝트를 선택하세요</span>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📂</div>
          <p className={styles.emptyText}>Finder에서 프로젝트를 선택하세요</p>
        </div>
        <div className={styles.projectList}>
          {(projects as Project[]).map((p) => (
            <button key={p.id} className={styles.quickItem} onClick={() => setSelectedId(p.id)}>
              {p.image ? (
                <img src={p.image} alt={p.title} className={styles.quickThumb} />
              ) : (
                <span className={styles.quickIcon}>{p.icon}</span>
              )}
              <span className={styles.quickTitle}>{p.title}</span>
              <span className={styles.quickArrow}>›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <button className={styles.backSmall} onClick={() => setSelectedId(null)}>‹</button>
        <span className={styles.searchText}>{project.title}</span>
      </div>

      <div className={styles.detail}>
        <ProjectDetailIcon icon={project.icon} iconImage={project.iconImage} />

        <div className={styles.detailHeader}>
          <h2 className={styles.detailTitle}>{project.title}</h2>
          <div className={styles.statusRow}>
            <span className={`${styles.badge} ${project.status === "완료" ? styles.done : project.status === "예정" ? styles.planned : styles.inProgress}`}>
              {project.status}
            </span>
            {project.date && <span className={styles.date}>{project.date}</span>}
          </div>
        </div>
        <p className={styles.desc}>{project.desc}</p>

        {/* 기술 스택 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>기술 스택</h3>
          <div className={styles.techList}>
            {project.tech.map((t, i) => (
              <span key={i} className={styles.techTag}>{t}</span>
            ))}
          </div>
        </div>

        {/* 팀 구성 */}
        {project.team && project.team.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {project.type === "team" ? "👥 팀 구성" : "개발자"}
            </h3>
            {sortTeamMembers(project.team).map((member) => (
              <TeamMemberCard key={member.name} member={member} classes={{
                card: styles.member, header: styles.memberHead, name: styles.memberName,
                role: styles.memberRole, list: styles.respList,
              }} />
            ))}
          </div>
        )}

        {/* 스크린샷 갤러리 */}
        {galleryImages.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>스크린샷</h3>
            <div className={styles.gallery}>
              {galleryImages.map((src, i) => (
                <button key={i} className={styles.galleryItem} onClick={() => setLightboxIdx(i)}>
                  <img src={convertImageUrl(src)} alt={project.imageLabels?.[i] ?? `스크린샷 ${i + 1}`} className={styles.galleryImg} />
                </button>
              ))}
            </div>
          </div>
        )}

        <ProjectAiUsage projectId={project.id} sectionClassName={styles.section} titleClassName={styles.sectionTitle} />

        {/* 개선 포인트 */}
        {(project.problems || project.solutions) && (
          <div className={styles.section}>
            {project.problems && (
              <>
                <h3 className={styles.sectionTitle}>개선 포인트</h3>
                <ul className={styles.ulList}>
                  {project.problems.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </>
            )}
            {project.solutions && (
              <>
                <h3 className={styles.sectionTitle} style={{ marginTop: 14 }}>해결 방안</h3>
                <ul className={styles.ulList}>
                  {project.solutions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}
          </div>
        )}

        {/* 주요 기능 */}
        {project.features && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>주요 기능</h3>
            <ul className={styles.ulList}>
              {project.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}

        <ProjectLinks
          links={project.links}
          rowClassName={styles.linkRow}
          linkClassName={styles.linkBtn}
          onOpenSite={setIframeUrl}
        />
      </div>
    </div>
  );
};
