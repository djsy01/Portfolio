"use client";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./FinderContent.module.css";
import { FolderOpen } from "lucide-react";

// project data
const PROJECTS = [
  {
    id: 1,
    title: "OBED",
    desc: "기존 사이트와 티켓 시스템의 UX 개선 및 통합",
    status: "진행중",
    icon: "🎭",
    image:
      "https://drive.google.com/thumbnail?id=1ym1g3e9WDSxyjdnFcSli-qfKXCMDN9Tg&sz=w400",
  },
  {
    id: 2,
    title: "Ticketing System",
    desc: "실시간 티켓 예매 및 관리 시스템",
    status: "진행중",
    icon: "🎫",
    image: null,
  },
  {
    id: 3,
    title: "Personal Portfolio",
    desc: "개인 프로젝트 및 기술 스택을 소개하는 포트폴리오 사이트",
    status: "진행중",
    icon: "💼",
    image:
      "https://drive.google.com/thumbnail?id=1muIErFtDceRy4nXpmSTgc_qIWWR6Ds_L&sz=w400",
  },
];

// Finder Component
export const FinderContent = () => {
  const { openApp, focusApp, setSelectedProject } = useWindowStore();

  // Handle project click to open in Safari
  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    openApp("safari");
    setTimeout(() => {
      focusApp("safari");
    }, 0);
  };

  return (
    <div className={styles.finderContainer}>
      {/* Finder Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarTitle}>즐겨찾기</div>
          <div className={`${styles.sidebarItem} ${styles.active}`}>
            <FolderOpen size={16} />
            <span>Projects</span>
          </div>
        </div>
      </div>

      {/* Finder Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.toolbar}>
          <div className={styles.breadcrumb}>Projects</div>
        </div>

        {/* Project Grid */}
        <div className={styles.projectGrid}>
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={styles.folderItem}
              onClick={() => handleProjectClick(project.id)}
              onDoubleClick={() => handleProjectClick(project.id)}
            >
              {project.image ? (
                <div className={styles.imageWrapper}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>
              ) : (
                <div className={styles.folderIconWrapper}>
                  <FolderOpen size={64} color="#007AFF" />
                  <span className={styles.folderEmoji}>{project.icon}</span>
                </div>
              )}
              <div className={styles.folderInfo}>
                <div className={styles.folderTitle}>{project.title}</div>
                <div className={styles.folderDesc}>{project.desc}</div>
                <span className={styles.folderStatus}>{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
