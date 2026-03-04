"use client";
import { useState } from "react";
import { MobileStatusBar } from "@/components/mobile/MobileStatusBar";
import { MobileAppSheet } from "@/components/mobile/MobileAppSheet";
import { MobileFinder } from "@/components/mobile/MobileFinder";
import { MobileSafari } from "@/components/mobile/MobileSafari";
import { MobileTerminal } from "@/components/mobile/MobileTerminal";
import { LoginScreen } from "@/components/LoginScreen";
import { useWindowStore } from "@/store/useWindowStore";
import { LogOut } from "lucide-react";
import styles from "./page.module.css";

type AppId = "finder" | "safari" | "terminal" | null;

const APPS = [
  {
    id: "finder" as AppId,
    label: "Finder",
    emoji: "📁",
    bg: "linear-gradient(145deg, #4fc3f7, #0288d1)",
  },
  {
    id: "safari" as AppId,
    label: "Safari",
    emoji: "🌐",
    bg: "linear-gradient(145deg, #66bb6a, #1b5e20)",
  },
  {
    id: "terminal" as AppId,
    label: "Terminal",
    emoji: "⌨️",
    bg: "linear-gradient(145deg, #455a64, #1c2b33)",
  },
];

const TYPE_LABEL: Record<string, { label: string; emoji: string }> = {
  frontend: { label: "Frontend", emoji: "🎨" },
  backend:  { label: "Backend",  emoji: "⚙️" },
  fullstack:{ label: "Fullstack",emoji: "🚀" },
};

export default function MobilePage() {
  const [openApp, setOpenApp] = useState<AppId>(null);
  const [safariProjectId, setSafariProjectId] = useState<number | null>(null);
  const { isLoggedIn, portfolioType, logout } = useWindowStore();

  const handleFinderProjectSelect = (id: number) => {
    setSafariProjectId(id);
    setOpenApp("safari");
  };

  const typeInfo = portfolioType ? TYPE_LABEL[portfolioType] : null;

  return (
    <div className={styles.screen}>
      {/* 로그인 화면 오버레이 */}
      {!isLoggedIn && <LoginScreen />}

      {/* iOS 상태바 */}
      <MobileStatusBar />

      {/* 배경 히어로 */}
      <div className={styles.hero}>
        <div className={styles.heroDate}>
          {new Date().toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
        <div className={styles.heroName}>엄인호</div>
        <div className={styles.heroSub}>
          {typeInfo ? `${typeInfo.emoji} ${typeInfo.label} Developer` : "Developer"}
        </div>
      </div>

      {/* 하단 독 */}
      <div className={styles.dock}>
        {APPS.map((app) => (
          <button
            key={app.id}
            className={styles.dockIcon}
            onClick={() => setOpenApp(app.id)}
          >
            <div className={styles.dockIconBox} style={{ background: app.bg }}>
              <span className={styles.dockEmoji}>{app.emoji}</span>
            </div>
            <span className={styles.dockLabel}>{app.label}</span>
            {openApp === app.id && <div className={styles.dockDot} />}
          </button>
        ))}

        {/* 로그아웃 버튼 (Terminal 옆) */}
        <button className={styles.dockIcon} onClick={logout}>
          <div className={`${styles.dockIconBox} ${styles.logoutIconBox}`}>
            <LogOut size={26} color="rgba(255,255,255,0.9)" />
          </div>
          <span className={styles.dockLabel}>로그아웃</span>
        </button>
      </div>

      {/* 앱 시트 - Finder */}
      <MobileAppSheet
        title="Finder"
        isOpen={openApp === "finder"}
        onClose={() => setOpenApp(null)}
      >
        <MobileFinder onProjectSelect={handleFinderProjectSelect} />
      </MobileAppSheet>

      {/* 앱 시트 - Safari */}
      <MobileAppSheet
        title="Safari"
        isOpen={openApp === "safari"}
        onClose={() => {
          setOpenApp(null);
          setSafariProjectId(null);
        }}
      >
        <MobileSafari initialProjectId={safariProjectId} />
      </MobileAppSheet>

      {/* 앱 시트 - Terminal */}
      <MobileAppSheet
        title="Terminal"
        isOpen={openApp === "terminal"}
        onClose={() => setOpenApp(null)}
      >
        <MobileTerminal />
      </MobileAppSheet>
    </div>
  );
}
