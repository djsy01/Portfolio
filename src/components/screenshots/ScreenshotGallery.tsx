'use client';
import { useId, useState } from 'react';
import { GalleryTabs } from './GalleryTabs';
import { ScreenshotPreview } from './ScreenshotPreview';
import { ScreenshotViewer } from './ScreenshotViewer';
import styles from './ScreenshotGallery.module.css';

const groups = {
  desktop: '데스크톱', mobile: '모바일', demo: '기능 시연', general: '프로젝트 화면',
} as const;

export interface Screenshot {
  src: string;
  label: string;
  kind: keyof typeof groups;
}

interface Props {
  screenshots: Screenshot[];
}

export function ScreenshotGallery({ screenshots }: Props) {
  const id = useId();
  const [selection, setSelection] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const shot = screenshots[selection];
  if (!shot) return null;

  const kinds = (Object.keys(groups) as Screenshot['kind'][])
    .filter((kind) => screenshots.some((entry) => entry.kind === kind));
  const slides = screenshots.filter((entry) => entry.kind === shot.kind);
  const kindIndex = kinds.indexOf(shot.kind);
  const index = slides.indexOf(shot);
  const select = (next: number) => setSelection(screenshots.indexOf(slides[next]));
  const move = (step: number) => select((index + step + slides.length) % slides.length);
  const hasGroups = kinds.length > 1;
  const groupId = `${id}-group`;
  const previewId = `${id}-preview`;

  return (
    <>
      <div className={styles.gallery}>
        {hasGroups && <GalleryTabs panelId={groupId} label="스크린샷 종류"
          options={kinds.map((kind) => ({ label: groups[kind] }))} selected={kindIndex}
          onSelect={(next) => setSelection(screenshots.findIndex((entry) => entry.kind === kinds[next]))} />}
        <div className={styles.gallery} id={groupId} role={hasGroups ? 'tabpanel' : undefined}
          aria-labelledby={hasGroups ? `${groupId}-${kindIndex}` : undefined}>
          <ScreenshotPreview id={previewId} shot={shot} index={index} count={slides.length}
            onMove={move} onOpen={() => setViewerIndex(selection)} />
          <GalleryTabs panelId={previewId} label="스크린샷 썸네일" thumbnails
            options={slides} selected={index} onSelect={select} />
        </div>
      </div>
      {viewerIndex !== null && <ScreenshotViewer shots={screenshots} index={viewerIndex}
        onChange={setViewerIndex} onClose={() => setViewerIndex(null)} />}
    </>
  );
}
