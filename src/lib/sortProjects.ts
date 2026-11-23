interface Sortable {
  status: string;
  date?: string;
}

// "2026.05.28 ~ 2026.07.07" → 종료일, "현재"는 가장 최근으로 취급
const toKey = (text: string | undefined, fallback: number) => {
  if (!text) return fallback;
  const m = text.trim().match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  return m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : fallback;
};

const getKeys = (date: string | undefined) => {
  if (!date) return { start: 0, end: 0 }; // 날짜 없음은 맨 아래
  const [start, end] = date.split("~").map((v) => v.trim());
  return { start: toKey(start, 0), end: toKey(end, Infinity) };
};

// 진행중 먼저, 그다음 최근 종료일 순 (완료 프로젝트는 최근 것이 위)
export const sortProjects = <T extends Sortable>(list: T[]): T[] =>
  [...list].sort((a, b) => {
    const aDone = a.status === "완료" ? 1 : 0;
    const bDone = b.status === "완료" ? 1 : 0;
    if (aDone !== bDone) return aDone - bDone;
    const ka = getKeys(a.date);
    const kb = getKeys(b.date);
    if (ka.end !== kb.end) return kb.end - ka.end;
    return kb.start - ka.start;
  });
