'use client';
import { useState } from 'react';
import Image from 'next/image';
import { convertImageUrl } from '@/lib/imageUtils';
import { ScreenshotViewer } from './ScreenshotViewer';
import styles from './ScreenshotGallery.module.css';

const groups = {
  desktop: '데스크톱',
  mobile: '모바일',
  demo: '기능 시연',
  general: '프로젝트 화면',
} as const;

export interface Screenshot {
  src: string;
  label: string;
  kind: keyof typeof groups;
}

interface Props {
  screenshots: Screenshot[];
  titleClassName: string;
}

export function ScreenshotGallery({ screenshots, titleClassName }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  if (!screenshots.length) return null;

  return (
    <>
      <h3 className={titleClassName}>스크린샷</h3>
      <div className={styles.groups}>
        {Object.entries(groups).map(([kind, title]) => {
          const entries = screenshots.filter((shot) => shot.kind === kind);
          if (!entries.length) return null;

          return (
            <section key={kind} className={styles.group}>
              <h4>{title}</h4>
              <div className={styles.grid} data-kind={kind}>
                {entries.map((shot) => (
                  <button key={shot.src} type="button" className={styles.card}
                    aria-haspopup="dialog" onClick={() => setSelected(screenshots.indexOf(shot))}>
                    <span className={styles.preview}>
                      <Image src={convertImageUrl(shot.src)} alt="" fill unoptimized />
                    </span>
                    <span className={styles.label}>{shot.label}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {selected !== null && <ScreenshotViewer shots={screenshots} index={selected}
        onChange={setSelected} onClose={() => setSelected(null)} />}
    </>
  );
}
