"use client";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import styles from './Window.module.css'; // CSS 모듈 임포트

export const Window = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
  const { apps, closeApp, focusApp } = useWindowStore();
  const app = apps[id];

  if (!app?.isOpen) return null;

  return (
    <Draggable handle={`.${styles.header}`} onMouseDown={() => focusApp(id)}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ zIndex: app.zIndex }}
        className={styles.windowContainer}
      >
        <div className={styles.header}>
          <div className={styles.buttonGroup}>
            <button onClick={() => closeApp(id)} className={`${styles.circle} ${styles.close}`} />
            <button className={`${styles.circle} ${styles.minimize}`} />
            <button className={`${styles.circle} ${styles.maximize}`} />
          </div>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </Draggable>
  );
};