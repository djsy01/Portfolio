import type { Project } from '@/types/project';
import styles from './MobileSafari.module.css';

interface Props {
  projects: Project[];
  onSelect: (id: number) => void;
}

export function MobileSafariProjects({ projects, onSelect }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <span className={styles.searchPlaceholder}>프로젝트를 선택하세요</span>
      </div>
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📂</div>
        <p className={styles.emptyText}>Finder에서 프로젝트를 선택하세요</p>
      </div>
      <div className={styles.projectList}>
        {projects.map(({ id, title, image, icon }) => (
          <button key={id} className={styles.quickItem} onClick={() => onSelect(id)}>
            {image ? (
              <img src={image} alt={title} className={styles.quickThumb} />
            ) : (
              <span className={styles.quickIcon}>{icon}</span>
            )}
            <span className={styles.quickTitle}>{title}</span>
            <span className={styles.quickArrow}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
