"use client";
import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./Window.module.css";

// Draggable Window Component
export const Window = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  const { apps, closeApp, focusApp } = useWindowStore();
  const app = apps[id];
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Center the window on mount
  useEffect(() => {
    // Calculate center position
    const windowWidth = window.innerWidth;
    const elementWidth = 700;
    const menuBarHeight = 30;

    // Set initial position to center
    setPosition({
      x: (windowWidth - elementWidth) / 2,
      y: menuBarHeight + 50,
    });

    // Mark as mounted
    setMounted(true);
  }, []);

  // Handle window close action
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeApp(id);
  };

  // If the app is not open or not mounted yet, do not render
  if (!app?.isOpen || !mounted) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      defaultPosition={position}
      onStart={() => {
        focusApp(id);
      }}
    >
      {/* Window Container */}
      <div
        ref={nodeRef}
        style={{
          zIndex: app.zIndex,
          position: "absolute",
        }}
        className={styles.windowContainer}
        onClick={() => focusApp(id)}
      >
        {/* Window Header */}
        <div className={`${styles.header} drag-handle`}>
          <div className={styles.buttonGroup}>
            <button
              onClick={handleClose}
              className={`${styles.circle} ${styles.close}`}
            />
          </div>
          {/* Window Title */}
          <span className={styles.title}>{title}</span>
        </div>
        {/* Window Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </Draggable>
  );
};
