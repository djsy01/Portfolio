import desktop from '../SafariContent.module.css';
import mobile from '../mobile/MobileSafari.module.css';

export function projectDetailStyles(isMobile?: boolean) {
  const styles = isMobile ? mobile : desktop;

  return {
    section: styles.section,
    sectionTitle: styles.sectionTitle,
    subTitle: styles.subTitle,
    issue: styles.issue,
    evidence: styles.evidence,
    list: isMobile ? styles.ulList : styles.list,
    techStack: isMobile ? styles.techList : styles.techStack,
    techTag: styles.techTag,
    teamList: isMobile ? undefined : styles.teamList,
    member: isMobile
      ? {
        card: styles.member, header: styles.memberHead, name: styles.memberName,
        role: styles.memberRole, list: styles.respList,
      }
      : {
        card: styles.teamMember, header: styles.memberHeader, name: styles.memberName,
        role: styles.memberRole, list: styles.responsibilitiesList,
      },
  };
}

export type DetailStyles = ReturnType<typeof projectDetailStyles>;
