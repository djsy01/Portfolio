import type { TechStackGroup } from '@/types/project';
import { DetailList } from './DetailList';
import type { DetailStyles } from './projectDetailStyles';

interface Props {
  features?: string[];
  techStack?: TechStackGroup[];
  tech: string[];
  styles: DetailStyles;
}

function TechTags({ items, styles }: { items: string[]; styles: DetailStyles }) {
  return (
    <div className={styles.techStack}>
      {items.map((item) => <span className={styles.techTag} key={item}>{item}</span>)}
    </div>
  );
}

export function ProjectFeatures({ features, techStack, tech, styles }: Props) {
  return (
    <>
      {!!features?.length && <DetailList items={features} className={styles.list} emphasizeLabels />}
      {!!(techStack?.length || tech.length) && <h4 className={styles.subTitle}>🛠️ 기술 스택</h4>}
      {techStack?.length ? techStack.map(({ category, items }) => (
        <div className={styles.issue} key={category}>
          <h5 className={styles.subTitle}>{category}</h5>
          <TechTags items={items} styles={styles} />
        </div>
      )) : !!tech.length && <TechTags items={tech} styles={styles} />}
    </>
  );
}
