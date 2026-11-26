import { sortTeamMembers } from '@/lib/sortTeamMembers';
import { TeamMemberCard, type TeamMember } from '../TeamMemberCard';
import { DetailList } from './DetailList';
import type { DetailStyles } from './projectDetailStyles';

interface Props {
  contributions?: string[];
  team?: TeamMember[];
  styles: DetailStyles;
  personal: boolean;
}

export function ProjectContributions({ contributions, team, styles, personal }: Props) {
  return (
    <>
      {!!contributions?.length && <DetailList items={contributions} className={styles.list} />}
      {!!team?.length && (
        <>
          <h4 className={styles.subTitle}>{personal ? '개발자' : '👥 팀 구성'}</h4>
          <div className={styles.teamList}>
            {sortTeamMembers(team).map((member) => (
              <TeamMemberCard key={member.name} member={member} classes={styles.member} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
