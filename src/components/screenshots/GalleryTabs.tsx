import { useEffect, useRef, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { convertImageUrl } from '@/lib/imageUtils';
import styles from './GalleryTabs.module.css';

interface Props {
  panelId: string;
  label: string;
  options: { label: string; src?: string }[];
  selected: number;
  onSelect: (index: number) => void;
  thumbnails?: boolean;
}

export function GalleryTabs({ panelId, label, options, selected, onSelect, thumbnails }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const button = selectedRef.current;
    if (!thumbnails || !row || !button) return;

    const frame = row.getBoundingClientRect();
    const item = button.getBoundingClientRect();
    if (item.left < frame.left + 4 || item.right > frame.right - 4) {
      row.scrollBy({ left: item.left - frame.left - (frame.width - item.width) / 2 });
    }
  }, [options, selected, thumbnails]);

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const last = options.length - 1;
    const nextByKey: Record<string, number> = {
      ArrowLeft: (selected + last) % options.length,
      ArrowRight: (selected + 1) % options.length,
      Home: 0,
      End: last,
    };
    const next = nextByKey[event.key];
    if (typeof next !== 'number') return;

    event.preventDefault();
    onSelect(next);
    event.currentTarget.querySelectorAll('button')[next]?.focus({ preventScroll: true });
  }

  return (
    <div ref={rowRef} className={thumbnails ? styles.thumbnails : styles.segments}
      role="tablist" aria-label={label} onKeyDown={handleKey}>
      {options.map((option, index) => (
        <button key={option.src ?? option.label} id={`${panelId}-${index}`}
          ref={selected === index ? selectedRef : undefined} role="tab" type="button"
          aria-label={option.label} aria-selected={selected === index} aria-controls={panelId}
          tabIndex={selected === index ? 0 : -1} onClick={() => onSelect(index)}>
          {option.src ? <Image src={convertImageUrl(option.src)} alt="" fill unoptimized /> : option.label}
        </button>
      ))}
    </div>
  );
}
