import { projectAi } from "@/data/projectAi";
import styles from "./ProjectAiUsage.module.css";

interface ProjectAiUsageProps {
  projectId: number;
  sectionClassName: string;
  titleClassName: string;
}

export function ProjectAiUsage({ projectId, sectionClassName, titleClassName }: ProjectAiUsageProps) {
  const cases = projectAi[projectId];
  if (!cases?.length) return null;

  return (
    <section className={sectionClassName}>
      <h3 className={titleClassName}>AI 활용</h3>
      <dl className={styles.cases}>
        {cases.map(({ scope, tool, approach }) => (
          <div key={scope}>
            <dt className={styles.scope}>
              {scope} <span className={styles.tool}>{tool}</span>
            </dt>
            <dd className={styles.approach}>{approach}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
