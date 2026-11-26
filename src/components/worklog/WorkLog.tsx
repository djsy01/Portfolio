'use client';
import { useId, useState } from 'react';
import styles from './WorkLog.module.css';

export interface WorkLogEntry {
  date: string;
  title: string;
  items: string[];
}

interface Props {
  entries?: WorkLogEntry[];
  sectionClassName: string;
  titleClassName: string;
}

export function WorkLog({ entries, sectionClassName, titleClassName }: Props) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  if (!entries?.length) return null;

  const hasMore = entries.length > 5;
  const start = hasMore && !expanded ? entries.length - 4 : 0;

  return (
    <section className={sectionClassName} aria-labelledby={`${listId}-title`}>
      <div className={styles.header}>
        <h3 id={`${listId}-title`} className={titleClassName}>작업 기록</h3>
        {hasMore && (
          <button type="button" className={styles.toggle} aria-expanded={expanded}
            aria-controls={listId} onClick={() => setExpanded(!expanded)}>
            {expanded ? '접기' : `전체 보기 (${entries.length})`}
          </button>
        )}
      </div>
      <ol id={listId} className={styles.timeline} start={start + 1} role="list">
        {entries.slice(start).map(({ date, title, items }) => (
          <li key={date} className={styles.entry}>
            <time className={styles.date} dateTime={date.replaceAll('.', '-')}>{date}</time>
            <h4 className={styles.title}>{title}</h4>
            <ul className={styles.items}>
              {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
