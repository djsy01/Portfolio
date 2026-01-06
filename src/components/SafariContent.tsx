// components/SafariContent.tsx
"use client";
import { useState, useEffect } from "react";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./SafariContent.module.css";
import { FolderOpen, ArrowLeft, ExternalLink } from "lucide-react";

// project data
const PROJECTS = [
  {
    id: 1,
    title: "OBED",
    desc: "기존 사이트와 티켓 시스템의 UX 개선 및 통합",
    status: "진행중",
    type: "team",
    tech: ["Vue.js", "Vite", "TypeScript", "CSS", "Redis", "MySQL"],
    problems: [
      "기존 사이트의 서버가 없는 동적 페이지",
      "티켓 예매 시스템의 분리된 사용자 경험",
    ],
    solutions: ["직관적인 단일 플랫폼으로 통합", "개선된 예매 플로우 설계"],
    team: [
      {
        name: "김승훈",
        role: "Back-End Developer",
        responsibilities: [
          "Node.js를 활용한 서버 구축 및 API 개발",
          "티켓 예매 시스템의 백엔드 로직 구현",
        ],
      },
    ],
    links: {
      github: "https://github.com/yourusername/obed-homepage",
      site: "https://obedworship.vercel.app",
    },
  },
  {
    id: 2,
    title: "Ticketing System",
    desc: "실시간 티켓 예매 및 관리 시스템",
    status: "진행중",
    type: "team",
    tech: ["React", "TypeScript"],
    features: ["실시간 좌석 선택", "결제 시스템 연동", "예매 내역 관리"],
    team: [
      {
        name: "이준행",
        role: "Back-End Developer",
        responsibilities: [
          "DB설계",
          "서버 구축 및 API 개발",
          "결제 시스템 연동",
        ],
      },
    ],
    links: {
      github: "https://github.com/LeopoldBloom2K/ticketingsitedemo",
      site: "",
    },
  },
  {
    id: 3,
    title: "Personal Portfolio",
    desc: "개인 프로젝트 및 기술 스택을 소개하는 포트폴리오 사이트",
    status: "진행중",
    type: "Personal",
    tech: ["Next.js", "React", "TypeScript", "CSS", "React"],
    features: ["프로젝트 갤러리", "연락처 폼"],
    links: {
      github: "https://github.com/djsy01/Portfolio",
      site: "https://portfolio-gamma-nine-ulldr7th7m.vercel.app/",
    },
  },
];

// Safari Content Component
export const SafariContent = () => {
  const { selectedProject: storeSelectedProject } = useWindowStore();
  const [currentView, setCurrentView] = useState<"detail" | "website">(
    "detail"
  );
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Automatically navigate to detail view when a project is selected from Finder
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
      // Open GitHub in a new tab
      window.open(url, "_blank");
    } else {
      // Open Live Site in iframe
      setCurrentUrl(url);
      setCurrentView("website");
    }
  };

  const project = PROJECTS.find((p) => p.id === selectedProject);

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

      {/* Empty State - No Project Selected */}
      {!project && currentView === "detail" && (
        <div className={styles.emptyState}>
          <FolderOpen size={64} color="#d1d5db" />
          <h3 className={styles.emptyTitle}>프로젝트를 선택해주세요</h3>
          <p className={styles.emptyDesc}>
            Finder에서 프로젝트 폴더를 클릭하세요
          </p>
        </div>
      )}

      {/* Detail View - Project Information */}
      {currentView === "detail" && project && (
        <div className={styles.projectDetail}>
          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>{project.title}</h2>
            <span className={styles.status}>{project.status}</span>
          </div>

          <p className={styles.desc}>{project.desc}</p>

          {/* Tech Stack Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기술 스택</h3>
            <div className={styles.techStack}>
              {project.tech.map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members Section */}
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

          {/* Problems and Solutions Section */}
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

          {/* Key Features Section */}
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

          {/* Link Buttons */}
          <div className={styles.links}>
            <button
              onClick={() => handleLinkClick(project.links.github, true)}
              className={styles.linkButton}
            >
              <ExternalLink size={16} />
              GitHub
            </button>
            <button
              onClick={() => handleLinkClick(project.links.site, false)}
              className={styles.linkButton}
            >
              <ExternalLink size={16} />
              Live Site
            </button>
          </div>
        </div>
      )}

      {/* Website View - Display actual site in iframe */}
      {currentView === "website" && currentUrl && (
        <div className={styles.iframeContainer}>
          <iframe
            src={currentUrl}
            className={styles.iframe}
            title={project?.title || "Website"}
          />
        </div>
      )}
    </div>
  );
};
