"use client";
import projects from "@/data/projects.json";
import type { ProjectCategory } from "@/store/useWindowStore";
import styles from "./MobileFinder.module.css";

interface Project {
  id: number;
  hidden?: boolean;
  title: string;
  desc: string;
  status: string;
  icon: string;
  image: string | null;
  category: ProjectCategory;
}

const FOLDERS: { type: ProjectCategory; label: string; emoji: string }[] = [
  { type: "frontend",  label: "Frontend",  emoji: "🎨" },
  { type: "backend",   label: "Backend",   emoji: "⚙️" },
  { type: "fullstack", label: "Fullstack", emoji: "🚀" },
];

const visibleProjects = (projects as Project[]).filter((p) => !p.hidden);

interface MobileFinderProps {
  onProjectSelect: (id: number) => void;
}

export const MobileFinder = ({ onProjectSelect }: MobileFinderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.folder}>📁</span>
        <h2 className={styles.title}>Projects</h2>
      </div>
      {FOLDERS.map((folder) => {
        const folderProjects = visibleProjects.filter((p) => p.category === folder.type);
        if (folderProjects.length === 0) return null;
        return (
          <section key={folder.type}>
            <div className={styles.sectionHeader}>
              {folder.emoji} {folder.label}
              <span className={styles.sectionCount}>{folderProjects.length}</span>
            </div>
            <div className={styles.list}>
              {folderProjects.map((project) => (
                <div
                  key={project.id}
                  className={styles.item}
                  onClick={() => onProjectSelect(project.id)}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.thumbnail}
                    />
                  ) : (
                    <div className={styles.iconBox}>
                      <span className={styles.icon}>{project.icon}</span>
                    </div>
                  )}
                  <div className={styles.info}>
                    <div className={styles.itemTitle}>{project.title}</div>
                    <div className={styles.itemDesc}>{project.desc}</div>
                  </div>
                  <span
                    className={`${styles.badge} ${project.status === "완료" ? styles.done : project.status === "예정" ? styles.planned : styles.inProgress}`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
