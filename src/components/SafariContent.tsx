// components/SafariContent.tsx
"use client";
import { useState, useEffect } from "react";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./SafariContent.module.css";
import { FolderOpen, ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { convertImageUrl } from "@/lib/imageUtils";
import projectsData from "@/data/projects.json";

interface TeamMember {
  name: string;
  role: string;
  responsibilities: string[];
}

interface Project {
  id: number;
  title: string;
  desc: string;
  status: string;
  icon: string;
  type: string;
  image: string | null;
  images: string[];
  tech: string[];
  problems?: string[];
  solutions?: string[];
  features?: string[];
  team?: TeamMember[];
  links: {
    github?: string | null;
    site?: string | null;
  };
}

const PROJECTS = projectsData as Project[];

export const SafariContent = () => {
  const { selectedProject: storeSelectedProject } = useWindowStore();
  const [currentView, setCurrentView] = useState<"detail" | "website">("detail");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (storeSelectedProject !== null) {
      setSelectedProject(storeSelectedProject);
      setCurrentView("detail");
      setCurrentUrl("");
    }
  }, [storeSelectedProject]);

  const handleBackToDetail = () => {
    setCurrentView("detail");
    setCurrentUrl("");
  };

  const handleLinkClick = (url: string, isGithub: boolean = false) => {
    if (isGithub) {
      window.open(url, "_blank");
    } else {
      setCurrentUrl(url);
      setCurrentView("website");
    }
  };

  const project = PROJECTS.find((p) => p.id === selectedProject);
  const galleryImages = project?.images ?? [];

  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null));
  const nextImage = () => setLightboxIdx((i) => (i !== null ? Math.min(galleryImages.length - 1, i + 1) : null));

  return (
    <div className={styles.safariContainer}>
      {/* Safari Address Bar */}
      <div className={styles.addressBar}>
        {currentView === "website" && (
          <button onClick={handleBackToDetail} className={styles.backButton}>
            <ArrowLeft size={18} />
          </button>
        )}
        <div className={styles.urlBar}>
          {currentUrl || project?.title || "Safari"}
        </div>
      </div>

      {/* Empty State */}
      {!project && currentView === "detail" && (
        <div className={styles.emptyState}>
          <FolderOpen size={64} color="#d1d5db" />
          <h3 className={styles.emptyTitle}>프로젝트를 선택해주세요</h3>
          <p className={styles.emptyDesc}>Finder에서 프로젝트 폴더를 클릭하세요</p>
        </div>
      )}

      {/* Detail View */}
      {currentView === "detail" && project && (
        <div className={styles.projectDetail}>
          {project.image && (
            <div className={styles.heroWrap}>
              <img src={project.image} alt={project.title} className={styles.heroImg} />
            </div>
          )}

          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>{project.title}</h2>
            <span className={styles.status}>{project.status}</span>
          </div>

          <p className={styles.desc}>{project.desc}</p>

          {/* Tech Stack */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기술 스택</h3>
            <div className={styles.techStack}>
              {project.tech.map((tech, index) => (
                <span key={index} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          {project.team && project.team.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                {project.type === "team" ? "👥 팀 구성" : "개발자"}
              </h3>
              <div className={styles.teamList}>
                {project.team.map((member, index) => (
                  <div key={index} className={styles.teamMember}>
                    <div className={styles.memberHeader}>
                      <span className={styles.memberName}>{member.name}</span>
                      <span className={styles.memberRole}>{member.role}</span>
                    </div>
                    <ul className={styles.responsibilitiesList}>
                      {member.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshot Gallery — 팀 구성 ↓ 개선 포인트 사이 */}
          {galleryImages.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>스크린샷</h3>
              <div className={styles.gallery}>
                {galleryImages.map((src, i) => (
                  <button key={i} className={styles.galleryItem} onClick={() => setLightboxIdx(i)}>
                    <img src={convertImageUrl(src)} alt={`screenshot-${i + 1}`} className={styles.galleryImg} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Problems and Solutions */}
          {project.problems && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>개선 포인트</h3>
              <ul className={styles.list}>
                {project.problems.map((problem, index) => (
                  <li key={index}>{problem}</li>
                ))}
              </ul>
              <h3 className={styles.sectionTitle}>해결 방안</h3>
              <ul className={styles.list}>
                {project.solutions?.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Features */}
          {project.features && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>주요 기능</h3>
              <ul className={styles.list}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className={styles.links}>
            {project.links.github ? (
              <button onClick={() => handleLinkClick(project.links.github!, true)} className={styles.linkButton}>
                <ExternalLink size={16} />GitHub
              </button>
            ) : (
              <button className={`${styles.linkButton} ${styles.linkDisabled}`} disabled>
                <ExternalLink size={16} />GitHub (비공개)
              </button>
            )}
            {project.links.site ? (
              <button onClick={() => handleLinkClick(project.links.site!, false)} className={styles.linkButton}>
                <ExternalLink size={16} />Live Site
              </button>
            ) : (
              <button className={`${styles.linkButton} ${styles.linkDisabled}`} disabled>
                <ExternalLink size={16} />Live Site (준비중)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Website iframe */}
      {currentView === "website" && currentUrl && (
        <div className={styles.iframeContainer}>
          <iframe src={currentUrl} className={styles.iframe} title={project?.title || "Website"} />
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}><X size={24} /></button>
          {lightboxIdx > 0 && (
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <ChevronLeft size={32} />
            </button>
          )}
          <img
            src={convertImageUrl(galleryImages[lightboxIdx])}
            alt={`screenshot-${lightboxIdx + 1}`}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxIdx < galleryImages.length - 1 && (
            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight size={32} />
            </button>
          )}
          <div className={styles.lightboxDots}>
            {galleryImages.map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === lightboxIdx ? styles.dotActive : ""}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
