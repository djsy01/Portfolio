// components/SafariContent.tsx
"use client";
import styles from "./SafariContent.module.css";

const PROJECTS = [
  {
    id: 1,
    title: "OBED Homepage",
    desc: "기존 사이트와 티켓 시스템의 UX 개선 및 통합",
    status: "진행중",
    tech: ["Vue.js, Vite, TypeScript, CSS, Redis, MySQL"],
    problems: [
      "기존 사이트의 복잡한 네비게이션",
      "티켓 예매 시스템의 분리된 사용자 경험",
    ],
    solutions: ["직관적인 단일 플랫폼으로 통합", "개선된 예매 플로우 설계"],
    links: {
      github: "#",
      Site: "#",
    },
  },
  {
    id: 2,
    title: "Ticketing System",
    desc: "실시간 티켓 예매 및 관리 시스템",
    status: "진행중",
    tech: ["React", "Node.js", "TypeScript"],
    features: ["실시간 좌석 선택", "결제 시스템 연동", "예매 내역 관리"],
    links: {
      github: "#",
      Site: "#",
    },
  },
  {
    id: 3,
    title: "Personal Portfolio",
    desc: "개인 프로젝트 및 기술 스택을 소개하는 포트폴리오 사이트",
    status: "진행중",
    tech: ["Next.js", "TypeScript", "CSS", "React"],
    features: ["프로젝트 갤러리", "연락처 폼"],
    links: {
      github: "#",
      Site: "#",
    },
  },
];

export const SafariContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Selected Projects</h2>
        <p className={styles.subtitle}>진행중인 프로젝트들입니다</p>
      </div>

      <div className={styles.projectGrid}>
        {PROJECTS.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span className={styles.status}>{project.status}</span>
            </div>

            <p className={styles.desc}>{project.desc}</p>

            {/* 기술 스택 */}
            <div className={styles.techStack}>
              {project.tech.map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>

            {/* 오벧 프로젝트 전용: 문제점과 해결방안 */}
            {project.problems && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>개선 포인트</h4>
                <ul className={styles.list}>
                  {project.problems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
                <h4 className={styles.sectionTitle}>해결 방안</h4>
                <ul className={styles.list}>
                  {project.solutions?.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 티켓팅 사이트 전용: 주요 기능 */}
            {project.features && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>주요 기능</h4>
                <ul className={styles.list}>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 링크 */}
            <div className={styles.links}>
              <a
                href={project.links.github}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={project.links.demo}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
