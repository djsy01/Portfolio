import styles from './ProjectStory.module.css';

export interface ProjectStoryData {
  overview: string;
  motivation?: string;
  contributions: string[];
}

interface Props {
  story?: ProjectStoryData;
  sectionClassName: string;
}

export function ProjectStory({ story, sectionClassName }: Props) {
  if (!story) return null;

  return (
    <div className={sectionClassName}>
      <div className={styles.blocks}>
        <section>
          <h3>📌 개요</h3>
          <p>{story.overview}</p>
        </section>
        {story.motivation && (
          <section>
            <h3>💡 왜 만들었나</h3>
            <p>{story.motivation}</p>
          </section>
        )}
        <section>
          <h3>🙋 내 기여</h3>
          <ul>
            {story.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
