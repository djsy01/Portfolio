"use client";
import { useState, useEffect } from "react";
import styles from "./MobileStatusBar.module.css";

export const MobileStatusBar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.statusBar}>
      <span className={styles.time}>{time}</span>
      <div className={styles.icons}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="4" width="3" height="8" rx="1" />
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="9" y="1" width="3" height="11" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
          <path d="M8 6.5C9.8 6.5 11.4 7.3 12.5 8.5L11 10c-.7-.8-1.8-1.3-3-1.3S5.7 9.2 5 10L3.5 8.5C4.6 7.3 6.2 6.5 8 6.5z" />
          <path d="M8 3C10.8 3 13.3 4.2 15 6.1L13.5 7.6C12.2 6.1 10.2 5 8 5S3.8 6.1 2.5 7.6L1 6.1C2.7 4.2 5.2 3 8 3z"/>
        </svg>
        {/* Battery */}
        <div className={styles.battery}>
          <div className={styles.batteryBody}>
            <div className={styles.batteryFill} />
          </div>
          <div className={styles.batteryTip} />
        </div>
      </div>
    </div>
  );
};
