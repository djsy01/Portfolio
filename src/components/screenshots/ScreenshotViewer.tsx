import { useEffect, useId, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { convertImageUrl } from '@/lib/imageUtils';
import type { Screenshot } from './ScreenshotGallery';
import styles from './ScreenshotViewer.module.css';
interface Props {
  shots: Screenshot[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

export function ScreenshotViewer({ shots, index, onChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const shot = shots[index];
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (trigger instanceof HTMLElement) trigger.focus({ preventScroll: true });
    };
  }, []);

  const move = (step: number) => {
    const nextIndex = index + step;
    if (nextIndex >= 0 && nextIndex < shots.length) onChange(nextIndex);
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1);
        if (event.key === 'ArrowRight') move(1);
      }}>
      <div className={styles.panel}>
        <header className={styles.toolbar}>
          <h2 id={titleId} aria-live="polite">{shot.label}</h2>
          <button type="button" aria-label="닫기" onClick={onClose}><X size={20} /></button>
        </header>
        <div key={shot.src} className={styles.scroll} tabIndex={0} aria-label="확대된 스크린샷">
          {/* Use intrinsic dimensions for full-page captures and animated GIFs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={convertImageUrl(shot.src)} alt={shot.label} className={styles.image} />
        </div>
        <footer className={styles.toolbar}>
          <button type="button" aria-label="이전 화면" disabled={index === 0} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
          <span>{index + 1} / {shots.length}</span>
          <button type="button" aria-label="다음 화면" disabled={index === shots.length - 1} onClick={() => move(1)}><ChevronRight size={20} /></button>
        </footer>
      </div>
    </dialog>
  );
}
