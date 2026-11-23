import { Github } from "lucide-react";
import styles from "./TeamMemberCard.module.css";

export interface TeamMember {
  name: string;
  role: string;
  responsibilities?: string[];
  githubUsername?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  classes: {
    card: string;
    header: string;
    name: string;
    role: string;
    list: string;
  };
}

export function TeamMemberCard({ member, classes }: TeamMemberCardProps) {
  const { name, githubUsername, role, responsibilities } = member;
  const content = (
    <>
      <div className={classes.header}>
        <span className={`${classes.name} ${styles.name}`}>
          {name}
          {githubUsername && <Github size={16} aria-hidden="true" />}
        </span>
        <span className={classes.role}>{role}</span>
      </div>
      <ul className={classes.list}>
        {responsibilities?.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </>
  );

  if (!githubUsername) return <div className={classes.card}>{content}</div>;

  return (
    <a
      className={`${classes.card} ${styles.link}`}
      href={`https://github.com/${githubUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}의 GitHub 프로필 (새 탭)`}
      title={`GitHub · @${githubUsername}`}
    >
      {content}
    </a>
  );
}
