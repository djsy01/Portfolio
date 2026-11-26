import type { Project } from '@/types/project';
import { ProjectAiUsage } from '../ProjectAiUsage';
import { ScreenshotGallery } from '../screenshots/ScreenshotGallery';
import { WorkLog } from '../worklog/WorkLog';
import { ProjectContributions } from './ProjectContributions';
import { ProjectIntro } from './ProjectIntro';
import { ProjectFeatures } from './ProjectFeatures';
import { ProjectTroubleshooting } from './ProjectTroubleshooting';
import { DetailList } from './DetailList';
import { ProjectVideo } from './ProjectVideo';
import { projectDetailStyles } from './projectDetailStyles';

export function ProjectDetailBody({ project, mobile }: { project: Project; mobile?: boolean }) {
  const styles = projectDetailStyles(mobile);
  const { screenshots, features, tech, techStack, story, team,
    troubleshooting, problems, solutions, refactoring, outcomes } = project;

  const sections = [
    { title: '🧭 프로젝트 소개', content: <ProjectIntro project={project} listClassName={styles.list} /> },
    {
      title: '✨ 주요 기능',
      content: features?.length || techStack?.length || tech.length
        ? <ProjectFeatures features={features} techStack={techStack} tech={tech} styles={styles} /> : null,
    },
    {
      title: '🙋 내가 기여한 바',
      content: story?.contributions.length || team?.length
        ? <ProjectContributions contributions={story?.contributions} team={team} styles={styles} personal={project.type === 'personal'} /> : null,
    },
    {
      title: '🔧 트러블슈팅',
      content: troubleshooting?.length || problems?.length || solutions?.length
        ? <ProjectTroubleshooting items={troubleshooting} problems={problems} solutions={solutions} styles={styles} /> : null,
    },
    { title: '♻️ 리팩토링', content: refactoring?.length ? <DetailList items={refactoring} className={styles.list} /> : null },
    { title: '🏆 성과', content: outcomes?.length ? <DetailList items={outcomes} className={styles.list} /> : null },
  ];

  return (
    <>
      {sections.filter(({ content }) => content !== null).map(({ title, content }) => (
        <section className={styles.section} key={title}>
          <h3 className={styles.sectionTitle}>{title}</h3>
          {content}
        </section>
      ))}
      <WorkLog entries={project.worklog} sectionClassName={styles.section} titleClassName={styles.sectionTitle} />
      <ProjectAiUsage projectId={project.id} sectionClassName={styles.section} titleClassName={styles.sectionTitle} />
      {project.video && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🎬 시연 영상</h3>
          <ProjectVideo url={project.video} title={project.title} />
        </section>
      )}
      {screenshots.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🖼️ 스크린샷</h3>
          <ScreenshotGallery screenshots={screenshots} />
        </section>
      )}
    </>
  );
}
