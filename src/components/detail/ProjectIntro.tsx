import type { Project } from '@/types/project';
import storyStyles from '../story/ProjectStory.module.css';

export function ProjectIntro({ project, listClassName }: { project: Project; listClassName: string }) {
  const { story, desc, date, team, type } = project;
  const myRole = team?.find((member) => member.githubUsername === 'djsy01')?.role;
  const teamSize = team?.length ? `${team.length}인 팀` : '팀 프로젝트';

  return (
    <>
      <div className={storyStyles.blocks}>
        <section>
          <h4>📌 개요</h4>
          <p>{story?.overview || desc}</p>
        </section>
        {story?.motivation && (
          <section>
            <h4>💡 왜 만들었나</h4>
            <p>{story.motivation}</p>
          </section>
        )}
      </div>
      <ul className={listClassName}>
        {date && <li><strong>기간</strong>: {date}</li>}
        <li>
          <strong>팀 구성</strong>: {type === 'team' ? [teamSize, myRole].filter(Boolean).join(' · ') : '개인 프로젝트'}
        </li>
      </ul>
    </>
  );
}
