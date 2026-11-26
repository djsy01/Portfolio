import type { Project } from '@/types/project';
import { ProjectDetailIcon } from '../ProjectDetailIcon';
import desktop from '../SafariContent.module.css';
import phone from '../mobile/MobileSafari.module.css';

interface Props {
  project: Project;
  mobile?: boolean;
}

export function ProjectSafariHeader({ project, mobile }: Props) {
  const styles = mobile ? phone : desktop;
  const status = mobile ? styles.badge : styles.status;
  const statusClass = project.status === '완료'
    ? mobile ? styles.done : styles.statusDone
    : project.status === '예정'
      ? mobile ? styles.planned : styles.statusPlanned
      : mobile ? styles.inProgress : styles.statusInProgress;

  return (
    <>
      <ProjectDetailIcon icon={project.icon} iconImage={project.iconImage} />
      <div className={styles.detailHeader}>
        <h2 className={styles.detailTitle}>{project.title}</h2>
        <div className={styles.statusRow}>
          <span className={`${status} ${statusClass}`}>{project.status}</span>
          {project.date && <span className={styles.date}>{mobile ? '' : '📅 '}{project.date}</span>}
        </div>
      </div>
      <p className={styles.desc}>{project.desc}</p>
    </>
  );
}
