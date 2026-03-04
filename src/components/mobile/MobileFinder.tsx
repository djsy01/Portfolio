"use client";
import projects from "@/data/projects.json";
import styles from "./MobileFinder.module.css";

interface Project {
  id: number;
  title: string;
  desc: string;
  status: string;
  icon: string;
  image: string | null;
}

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
      <div className={styles.list}>
        {(projects as Project[]).map((project) => (
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
              className={`${styles.badge} ${project.status === "완료" ? styles.done : styles.inProgress}`}
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
