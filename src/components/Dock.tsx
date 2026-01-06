"use client";
import { useWindowStore } from '@/store/useWindowStore';
import { Terminal, Globe, FolderOpen } from 'lucide-react';
import styles from './Dock.module.css';

export const Dock = () => {
  const { openApp, apps } = useWindowStore();
  
  const dockItems = [
    { id: 'finder', icon: <FolderOpen size={32} color="#007AFF" />, label: 'Finder' },
    { id: 'safari', icon: <Globe size={32} color="#5AC8FA" />, label: 'Safari' },
    { id: 'terminal', icon: <Terminal size={32} color="#333" />, label: 'Terminal' },
  ];

  return (
    <div className={styles.dockContainer}>
      {dockItems.map((item) => (
        <div key={item.id} className={styles.dockItem} onClick={() => openApp(item.id)}>
          <div className={styles.tooltip}>{item.label}</div>
          <div className={styles.iconWrapper}>
            {item.icon}
          </div>
          {/* 앱이 열려있다면 하단에 점 표시 */}
          {apps[item.id]?.isOpen && <div className={styles.indicator} />}
        </div>
      ))}
    </div>
  );
};