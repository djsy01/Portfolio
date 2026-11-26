import type { TroubleshootingItem } from '@/types/project';
import { DetailList } from './DetailList';
import type { DetailStyles } from './projectDetailStyles';

interface Props {
  items?: TroubleshootingItem[];
  problems?: string[];
  solutions?: string[];
  styles: DetailStyles;
}

export function ProjectTroubleshooting({ items, problems, solutions, styles }: Props) {
  if (items?.length) {
    return items.map(({ title, problem, cause, solution, result, link }) => (
      <div key={title} className={styles.issue}>
        <h4 className={styles.subTitle}>{title}</h4>
        <ul className={styles.list}>
          <li><strong>문제</strong>: {problem}</li>
          {cause && <li><strong>원인</strong>: {cause}</li>}
          <li><strong>해결</strong>: {solution}</li>
          {result && <li><strong>결과</strong>: {result}</li>}
          {link && (
            <li><a className={styles.evidence} href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>
          )}
        </ul>
      </div>
    ));
  }

  return (
    <>
      {!!problems?.length && (
        <>
          <h4 className={styles.subTitle}>개선 포인트</h4>
          <DetailList items={problems} className={styles.list} />
        </>
      )}
      {!!solutions?.length && (
        <>
          <h4 className={styles.subTitle}>해결 방안</h4>
          <DetailList items={solutions} className={styles.list} />
        </>
      )}
    </>
  );
}
