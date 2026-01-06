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
      "	https://lh3.googleusercontent.com/rd-d/ALs6j_Ho6AoUZ8LX3u8E7JWue5waTDSFnbIWCqUQRJ9EvhC6aDQsR_99vuwTyCJfDUWS3rt3coJgsMwbqfMn79zWDk5aJ-eBBl1RrgdccKaenvNiMGKIAUiOrg5VRzyve9hWHNUD03ay_Ytq6ReR2ehI1BWDj6vSvvS7GNqiF5bL3X-oL1Me80Fq4Yf8hybhiKbi1RAZw85jYpmOofa9fzM3xVM1vysmpNC-y1gNxAtQOWW00WX-PkbGumZlgM2tn_qZCTiN2nSAesbUMAf28aERwUvDSo6xsoz8FkDRw4MNziRhF06mb0yl1Gmf2lzGLdr8JGQdYoeJYHXc65hds6OoT9FGoUxJlBHjWWgev-Y1IINq_O25qU-cHyrZ-6owQRVlgY-TkCr95tzIg_oFKCR92TgNKQMPoCznzP52_5a2VdMfxK21JKu8m_LcfolqWhc3nmKg3DqJLO4akZfqPUzNpAd_wzpWFqwT6SR3yGsjpyagTpdW0nzW_ppiuRSov7OndzpBHjbRK8CBm-LO5_53iz70z_A1sB0sjgpxInbAneNXBmWKOGjxxsHW9Ck1Gy8P6ndSM2qUI19p1AosQO3dN7EtQzce671JobDU3h9bCmY0Vr9Hh2TV1jWTLCfx5zXqJxwdAGQfn5xGnQdWbnDnB8qsQVrk9Knfk6GnWR3PGWRkku0ApK4Jz7XXJW2X4RuzT_qDVwCC3gjwTVcI2urbPIjjLMmqILHbJiNM94UPIGIcksjnqHf97WgmzPQAeB1qoS8BHPKhGmvd8EypTRwxQTncNv6HID5qbQEvF-pW4hxo-KsGoyb5gSt8uHbdfds1w9ra8VdcaGhiXHBPulCOU7aOk6Xzp93M2Gg15Ol2SdnvtB-C2ud5O1CJB9gI0lg3o2oWmdUReiJavXBHIXIEAzVOEpN8FonCF-evHM6ScfZWR-AD6gUxrOJnXoMwtqEQArf4Ry43haIHn9okQMAang6-Ed0ZCqWi3kYff5avTP5GgTXgz2Py54ryS0VXFxY81nsWWEEVjslBiedmYUD3_m6xPMjdNEa_RGxA5i84bm1wFVMV=w3584-h1812?auditContext=prefetch",
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
      "https://lh3.googleusercontent.com/rd-d/ALs6j_HOVud8mXRPPXA6WRksflRIS5rqdXUeItPC8eBJXXIaaU0Fy5spUGB-C4GI9UX42U3Pp1pmCdg-VDwTac4aOtwa05uIHNeT7rsQ8GMy9n1rNw9mXSD61GGltz6IQ-88HEndhEBQ0NtmRrJsgaaX4cW-48YmHDQdzeykn8lCd7JPDsngxLgrPkKqeTHqbUTIGPKMDUaR49qWCuXNJfVHvbgo8qK-7TvFda1R_r5LraoLNh2sASLtBWIxykQkwPSQmCqwHKVAI6StmC-PoU1VjujAC9hAMGpCywfN4h7EJQREZeqgDZ27YfDXsCX6Y_qc4YR1YhgL04d3FtRzHwNoW_cB2qdTf9KwSr-Xlb8tTS05AUGIW0bkXwbqz7LUC11AwFR8ifWi5h7Tpuqotc7j0ZeN7MNGrIurmYIQQhLGb00tAt16RZcPAS8p0IoABja455I7FcG0FypsZm3CsHViqvkjuHDBb_78w1K37HkAc_hIoE4sOK-rS3-LUjmZUayLIyen-iMUIwQLXPcvFhAvry8KTgKWpACV12gbpkYoAq7xvuZ0NfXwrQddSDToeRZ9jHxBNoiuW8ldlRRJg0kBrwwITiXq7qDNl7eSWJnuKM8Xa7kXEiSIzcgrcneJaR6i06eSin8-F5ngo9_z2LitUTAz3APHiAUlLsi4N8q-YFScRWRxtjPnsSDcwwY2J4JSp7Ekh67WJ_YwDlzf-5gmQYnlna5S4j3AThcafTYaUqn88qJ9qTb0vy9UI4hYWgpjLHx5-ph4FwmHZ3BYqm1D4NTzq31C-54CkW6kqv0Kfi6qjkFoFliJ6XCEz6i9Jghl5JqxfiGf7DBK0ivDXNVkbETXQwc1xrtTyz3v8057H16lisCPDdWUzYOJVRvh79MvCcTiO0JX5ZfkalJ3d-Hnwpw-Hlc-HC0F1-s5EOVYmJ6qplwl7VvpWLmxxaRWeCM3e6nwwkoezUiXUpHXR9wtHDcb8XHv_mQYS2KlsGOyjmzoxtRyVD4tXlc_32XRBaYMl3jIauXTIrOXXQUArYsqdW1YWMrmThBtZLe5OiKxk1yEGlR31A=w3584-h1812?auditContext=prefetch",
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
