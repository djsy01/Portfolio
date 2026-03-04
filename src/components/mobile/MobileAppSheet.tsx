"use client";
import { useEffect } from "react";
import styles from "./MobileAppSheet.module.css";

interface MobileAppSheetProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const MobileAppSheet = ({
  title,
  isOpen,
  onClose,
  children,
}: MobileAppSheetProps) => {
  // 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        {/* 앱 상단 바 (iOS 스타일) */}
        <div className={styles.topBar}>
          <div className={styles.drag} />
          <div className={styles.titleRow}>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
            <span className={styles.appTitle}>{title}</span>
            <div style={{ width: 40 }} />
          </div>
        </div>
        {/* 앱 콘텐츠 */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
