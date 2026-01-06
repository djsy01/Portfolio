"use client";
import { useState, useEffect } from "react";
import { Wifi, Battery, Search, Command } from "lucide-react";
import styles from "./MenuBar.module.css";

// Top Menu Bar Component
export const MenuBar = () => {
  const [date, setDate] = useState(new Date());

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date to "MMM DD ddd HH:mm" in Korean locale
  const formattedDate = date.toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={styles.menuBar}>
      {/* Left Section of Menu Bar */}
      <div className={styles.leftSection}>
        <span className={styles.appleIcon}></span>
        <span className={`${styles.menuItem} font-bold`}>Portfolio</span>
        <span className={styles.menuItem}>File</span>
        <span className={styles.menuItem}>Edit</span>
        <span className={styles.menuItem}>View</span>
      </div>

      {/* Right Section of Menu Bar */}
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
