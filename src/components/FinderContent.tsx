"use client";
import { useState } from "react";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./FinderContent.module.css";
import { FolderOpen, ChevronRight } from "lucide-react";
import type { PortfolioType } from "@/store/useWindowStore";
import allProjects from "@/data/projects.json";

interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  status: string;
  icon: string;
  image: string | null;
  category: string[];
}

const FOLDERS: { type: PortfolioType; label: string; emoji: string; color: string }[] = [
  { type: "frontend",  label: "Frontend",  emoji: "🎨", color: "#4A9EFF" },
  { type: "backend",   label: "Backend",   emoji: "⚙️", color: "#34C759" },
  { type: "fullstack", label: "Fullstack", emoji: "🚀", color: "#FF9F0A" },
];

export const FinderContent = () => {
  const { openApp, focusApp, setSelectedProject, portfolioType } = useWindowStore();
  const [currentFolder, setCurrentFolder] = useState<PortfolioType | null>(portfolioType);

  const visibleProjects: ProjectItem[] = currentFolder
    ? (allProjects as ProjectItem[]).filter((p) => p.category.includes(currentFolder))
    : [];
  const activeFolderInfo = FOLDERS.find((f) => f.type === currentFolder);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    openApp("safari");
    setTimeout(() => focusApp("safari"), 0);
  };

  return (
    <div className={styles.finderContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarTitle}>즐겨찾기</div>
          <div
            className={`${styles.sidebarItem} ${!currentFolder ? styles.active : ""}`}
            onClick={() => setCurrentFolder(null)}
          >
            <FolderOpen size={16} />
            <span>Portfolio</span>
          </div>
        </div>
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarTitle}>분야</div>
          {FOLDERS.map((f) => (
            <div
              key={f.type}
              className={`${styles.sidebarItem} ${currentFolder === f.type ? styles.active : ""}`}
              onClick={() => setCurrentFolder(f.type)}
            >
              <span className={styles.sidebarEmoji}>{f.emoji}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.toolbar}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbLink} onClick={() => setCurrentFolder(null)}>
              Portfolio
            </span>
            {currentFolder && (
              <>
                <ChevronRight size={12} style={{ opacity: 0.4 }} />
                <span style={{ color: activeFolderInfo?.color }}>
                  {activeFolderInfo?.emoji} {activeFolderInfo?.label}
                </span>
              </>
            )}
          </div>
        </div>

        <div className={styles.projectGrid}>
          {!currentFolder &&
            FOLDERS.map((f) => {
              const count = (allProjects as ProjectItem[]).filter((p) => p.category.includes(f.type)).length;
              return (
                <div
                  key={f.type}
                  className={styles.folderItem}
                  onClick={() => setCurrentFolder(f.type)}
                  onDoubleClick={() => setCurrentFolder(f.type)}
                >
                  <div
                    className={styles.folderIconWrapper}
                    style={{ background: f.color + "18", border: `1px solid ${f.color}30` }}
                  >
                    <span className={styles.folderEmoji}>{f.emoji}</span>
                  </div>
                  <div className={styles.folderInfo}>
                    <div className={styles.folderTitle}>{f.label}</div>
                    <div className={styles.folderDesc}>{count}개 프로젝트</div>
                    {f.type === portfolioType && (
                      <span
                        className={styles.folderStatus}
                        style={{ background: f.color + "22", color: f.color }}
                      >
                        현재 모드
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

          {currentFolder && visibleProjects.length === 0 && (
            <div className={styles.emptyMsg}>프로젝트를 준비 중입니다 🚧</div>
          )}
          {currentFolder &&
            visibleProjects.map((project) => (
              <div
                key={project.id}
                className={styles.folderItem}
                onClick={() => handleProjectClick(project.id)}
                onDoubleClick={() => handleProjectClick(project.id)}
              >
                {project.image ? (
                  <div className={styles.imageWrapper}>
                    <img src={project.image} alt={project.title} className={styles.projectImage} />
                  </div>
                ) : (
                  <div className={styles.folderIconWrapper}>
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
