import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { convertImageUrl } from '@/lib/imageUtils';
import type { Screenshot } from './ScreenshotGallery';
import styles from './ScreenshotGallery.module.css';

interface Props {
  id: string;
  shot: Screenshot;
  index: number;
  count: number;
  onMove: (step: number) => void;
  onOpen: () => void;
}

export function ScreenshotPreview({ id, shot, index, count, onMove, onOpen }: Props) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={`${id}-${index}`}>
      <figure className={styles.figure}>
        <div className={styles.stage} data-kind={shot.kind}>
          <button type="button" className={styles.preview} aria-haspopup="dialog"
            aria-label={`${shot.label} 확대 보기`} onClick={onOpen}>
            <Image src={convertImageUrl(shot.src)} alt="" fill unoptimized />
          </button>
          {count > 1 && (
            <>
              <button type="button" className={styles.previous}
                aria-label="이전 스크린샷" onClick={() => onMove(-1)}><ChevronLeft size={20} /></button>
              <button type="button" className={styles.next}
                aria-label="다음 스크린샷" onClick={() => onMove(1)}><ChevronRight size={20} /></button>
            </>
          )}
        </div>
        <figcaption className={styles.caption} aria-live="polite">
          <span>{shot.label}</span>
          <span>{index + 1} / {count}</span>
        </figcaption>
      </figure>
    </div>
  );
}
