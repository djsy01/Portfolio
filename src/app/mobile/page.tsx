"use client";
import { useState } from "react";
import { MobileStatusBar } from "@/components/mobile/MobileStatusBar";
import { MobileAppSheet } from "@/components/mobile/MobileAppSheet";
import { MobileFinder } from "@/components/mobile/MobileFinder";
import { MobileSafari } from "@/components/mobile/MobileSafari";
import { MobileTerminal } from "@/components/mobile/MobileTerminal";
import styles from "./page.module.css";

type AppId = "finder" | "safari" | "terminal" | null;

const APPS = [
  {
    id: "finder" as AppId,
    label: "Finder",
    emoji: "📁",
    bg: "linear-gradient(145deg, #4fc3f7, #0288d1)",
    title: "Finder",
  },
  {
    id: "safari" as AppId,
    label: "Safari",
    emoji: "🌐",
    bg: "linear-gradient(145deg, #66bb6a, #1b5e20)",
    title: "Safari",
  },
  {
    id: "terminal" as AppId,
    label: "Terminal",
    emoji: "⌨️",
    bg: "linear-gradient(145deg, #455a64, #1c2b33)",
    title: "Terminal",
  },
];

export default function MobilePage() {
  const [openApp, setOpenApp] = useState<AppId>(null);
  const [safariProjectId, setSafariProjectId] = useState<number | null>(null);

  const handleFinderProjectSelect = (id: number) => {
    setSafariProjectId(id);
    setOpenApp("safari");
  };

  return (
    <div className={styles.screen}>
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
        <div className={styles.heroSub}>Frontend Developer</div>
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
