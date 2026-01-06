"use client";
import { useWindowStore } from "@/store/useWindowStore";
import { Terminal, Globe, FolderOpen } from "lucide-react";
import styles from "./Dock.module.css";

// Bottom Dock Component
export const Dock = () => {
  // Zustand store hooks
  const { openApp, apps } = useWindowStore();

  // Dock items configuration
  const dockItems = [
    {
      id: "finder",
      icon: <FolderOpen size={32} color="#007AFF" />,
      label: "Finder",
    },
    {
      id: "safari",
      icon: <Globe size={32} color="#5AC8FA" />,
      label: "Safari",
    },
    {
      id: "terminal",
      icon: <Terminal size={32} color="#333" />,
      label: "Terminal",
    },
  ];

  return (
    <div className={styles.dockContainer}>
      {/* Render each dock item */}
      {dockItems.map((item) => (
        <div
          key={item.id}
          className={styles.dockItem}
          onClick={() => openApp(item.id)}
        >
          {/* Tooltip on hover */}
          <div className={styles.tooltip}>{item.label}</div>
          <div className={styles.iconWrapper}>{item.icon}</div>
          {/* Indicator for open apps */}
          {apps[item.id]?.isOpen && <div className={styles.indicator} />}
        </div>
      ))}
    </div>
  );
};
