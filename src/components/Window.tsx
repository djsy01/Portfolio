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
  const { apps, closeApp, focusApp, maximizeApp } = useWindowStore();
  const app = apps[id];
  const isMaximized = app?.isMaximized ?? false;
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Center the window on mount. window.innerWidth is only known client-side,
  // so this must run in an effect; setPosition/setMounted are batched into a
  // single extra render rather than the cascade the lint rule warns about.
  useEffect(() => {
    // Calculate center position
    const windowWidth = window.innerWidth;
    const elementWidth = 1024;
    const menuBarHeight = 30;

    // Set initial position to center
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition({
      x: (windowWidth - elementWidth) / 2,
      y: menuBarHeight + 50,
    });

    // Mark as mounted
    setMounted(true);
  }, []);

  // Keep the window inside windowArea (never under the Dock or off-screen).
  // Clamp runs synchronously on open/un-maximize (el's size from CSS
  // max-height is already final by the time this effect runs), and a
  // ResizeObserver keeps watching for native resize-handle drags after that.
  useEffect(() => {
    const el = nodeRef.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent || isMaximized) return;

    const clampToParent = () => {
      const maxX = Math.max(0, parent.clientWidth - el.offsetWidth);
      const maxY = Math.max(0, parent.clientHeight - el.offsetHeight);
      setPosition((prev) => {
        const x = Math.min(prev.x, maxX);
        const y = Math.min(prev.y, maxY);
        return x === prev.x && y === prev.y ? prev : { x, y };
      });
    };

    clampToParent();
    const observer = new ResizeObserver(clampToParent);
    observer.observe(el);
    return () => observer.disconnect();
    // `app?.isOpen` is what changes exactly when the div (re)mounts —
    // `mounted` flips true on first page load, well before that, so it
    // wouldn't mark when nodeRef.current actually becomes non-null.
  }, [isMaximized, app?.isOpen]);

  // Handle window close action
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeApp(id);
  };

  // Handle window maximize action
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeApp(id);
  };

  // If the app is not open or not mounted yet, do not render
  if (!app?.isOpen || !mounted) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      bounds="parent"
      position={isMaximized ? { x: 0, y: 0 } : position}
      disabled={isMaximized}
      onStart={() => {
        focusApp(id);
      }}
      onDrag={(_e, data) => setPosition({ x: data.x, y: data.y })}
      onStop={(_e, data) => setPosition({ x: data.x, y: data.y })}
    >
      {/* Window Container */}
      <div
        ref={nodeRef}
        style={{
          zIndex: app.zIndex,
          position: "absolute",
        }}
        className={`${styles.windowContainer} ${isMaximized ? styles.maximized : ""}`}
        onClick={() => focusApp(id)}
      >
        {/* Window Header */}
        <div className={`${styles.header} drag-handle`}>
          <div className={styles.buttonGroup}>
            <button
              onClick={handleClose}
              className={`${styles.circle} ${styles.close}`}
            />
            <button
              onClick={handleMaximize}
              className={`${styles.circle} ${styles.maximize}`}
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
