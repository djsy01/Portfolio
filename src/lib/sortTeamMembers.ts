interface TeamMemberRole {
  name: string;
  role: string;
}

const roleOrder = [
  /\bmaster\b|마스터/i,
  /\b(?:planning|planner|product manager|pm)\b|기획/i,
  /\b(?:ux|ui|design(?:er)?)\b|디자인/i,
  /\b(?:front[\s-]?end|fe|full[\s-]?stack)\b|프론트엔드|풀스택/i,
  /\b(?:back[\s-]?end|be)\b|백엔드/i,
  /\bnlp\b|자연어/i,
  /\b(?:cloud|cl|devops|infra(?:structure)?)\b|클라우드|인프라/i,
];

const collator = new Intl.Collator("ko");

function roleRank(role: string) {
  const rank = roleOrder.findIndex((pattern) => pattern.test(role));
  return rank === -1 ? roleOrder.length : rank;
}

export function sortTeamMembers<T extends TeamMemberRole>(members: T[]): T[] {
  return [...members].sort((a, b) =>
    roleRank(a.role) - roleRank(b.role) || collator.compare(a.name, b.name),
  );
}
