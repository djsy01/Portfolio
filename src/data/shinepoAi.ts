export const shinepoAi = [
  {
    scope: "프론트엔드 인증·라우팅",
    tool: "Claude Code",
    approach: "역할별 화면을 구현하기 전에 인증 상태를 공통 Provider로 옮기고 라우트 경로를 상수로 모았습니다. 초기 인증 목업은 개발 모드에서만 동작하도록 제한했습니다.",
  },
  {
    scope: "과정 CSV 가져오기",
    tool: "GitHub Copilot",
    approach: "관리자 과정 목록의 도구 모음에서 누락된 경로 상수 import를 복구해 CSV 가져오기 링크 연결을 수정했습니다.",
  },
  {
    scope: "팀의 물어보기 기능",
    tool: "ko-sroberta-multitask",
    approach: "한국어 질문을 임베딩해 미리 정의한 업무 의도와 비교하고, 유사도에 따라 답변·후보·답 없음으로 분기했습니다. 키워드 방식과 다른 임베딩 모델을 함께 비교하고 오답 사례로 예시 질문을 보강했습니다.",
  },
];
