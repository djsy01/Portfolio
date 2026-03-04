"use client";
import { useState, useEffect, useRef } from "react";
import { Wifi, Battery, Search, Command } from "lucide-react";
import { useWindowStore } from "@/store/useWindowStore";
import type { PortfolioType } from "@/store/useWindowStore";
import styles from "./MenuBar.module.css";

const TYPE_CONFIG: Record<PortfolioType, { label: string; color: string; emoji: string }> = {
  frontend: { label: "Frontend", color: "#4A9EFF", emoji: "🎨" },
  backend:  { label: "Backend",  color: "#34C759", emoji: "⚙️" },
  fullstack:{ label: "Fullstack",color: "#FF9F0A", emoji: "🚀" },
};

// Top Menu Bar Component
export const MenuBar = () => {
  const [date, setDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { portfolioType, logout, setSwitchTarget } = useWindowStore();

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formattedDate = date.toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const typeInfo = portfolioType ? TYPE_CONFIG[portfolioType] : null;

  const handleSwitch = (type: PortfolioType) => {
    if (type === portfolioType) { setMenuOpen(false); return; }
    setMenuOpen(false);
    setSwitchTarget(type);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div className={styles.menuBar}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <span className={styles.appleIcon}></span>

        {/* Portfolio 드롭다운 */}
        <div className={styles.portfolioMenu} ref={menuRef}>
          <span
            className={`${styles.menuItem} ${styles.menuItemBold}`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            Portfolio
          </span>
          {menuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>포트폴리오 전환</div>
              {(["frontend", "backend", "fullstack"] as PortfolioType[]).map((type) => {
                const info = TYPE_CONFIG[type];
                const isActive = portfolioType === type;
                return (
                  <button
                    key={type}
                    className={`${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ""}`}
                    style={isActive ? { color: info.color } : {}}
                    onClick={() => handleSwitch(type)}
                  >
                    <span>{info.emoji}</span>
                    <span>{info.label}</span>
                    {isActive && <span className={styles.checkmark}>✓</span>}
                  </button>
                );
              })}
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownLogout} onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>

        <span className={styles.menuItem}>File</span>
        <span className={styles.menuItem}>Edit</span>
        <span className={styles.menuItem}>View</span>

        {typeInfo && (
          <span
            className={styles.typeBadge}
            style={{
              background: typeInfo.color + "22",
              color: typeInfo.color,
              borderColor: typeInfo.color + "55",
            }}
          >
            {typeInfo.emoji} {typeInfo.label}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <Wifi size={16} />
        <Battery size={16} />
        <Search size={16} />
        <Command size={16} />
        <span className={styles.dateText}>{formattedDate}</span>
      </div>
    </div>
  );
};
