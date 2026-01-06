"use client";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { useWindowStore } from "@/store/useWindowStore";
import styles from "./Window.module.css";

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

  if (!app?.isOpen) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle={`.${styles.header}`}
      position={position}
      onDrag={(e, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
      onStart={() => {
        console.log("Drag started"); // 디버깅용
        focusApp(id);
      }}
    >
      <motion.div
        ref={nodeRef}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ zIndex: app.zIndex }}
        className={styles.windowContainer}
      >
        <div className={styles.header}>
          <div className={styles.buttonGroup}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeApp(id);
              }}
              className={`${styles.circle} ${styles.close}`}
            />
            <button
              onClick={(e) => e.stopPropagation()}
              className={`${styles.circle} ${styles.minimize}`}
            />
            <button
              onClick={(e) => e.stopPropagation()}
              className={`${styles.circle} ${styles.maximize}`}
            />
          </div>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </Draggable>
  );
};
