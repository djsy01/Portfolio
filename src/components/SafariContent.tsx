"use client";
import styles from "./SafariContent.module.css";

const PROJECTS = [
  { id: 1, title: "My Portfolio", desc: "Next.js & TypeScript" },
  { id: 2, title: "E-commerce App", desc: "React & Redux" },
  { id: 3, title: "Admin Dashboard", desc: "Vue.js & Pinia" },
];

export const SafariContent = () => {
  return (
    <div className={styles.container}>
      {PROJECTS.map((project) => (
        <div key={project.id} className={styles.card}>
          <div className={styles.thumbnail}>Image</div>
          <div className={styles.info}>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};