import { shinepoAi } from "./shinepoAi";

export interface ProjectAiCase {
  scope: string;
  tool: string;
  approach: string;
}

export const projectAi: Partial<Record<number, ProjectAiCase[]>> = {
  1: [
    {
      scope: "파일 업로드와 배포 오류",
      tool: "Claude",
      approach: "배포 환경에서 업로드·저장 시 발생한 500 오류를 추적하고, GCS와 디스크로 나뉜 업로드 방식을 DB의 files 테이블로 통일했습니다.",
    },
  ],
  2: [
    {
      scope: "Flutter 채팅과 예배 순서지",
      tool: "Claude",
      approach: "첨부 이미지·파일이 채팅 안에서 보이도록 렌더링을 보완했습니다. 순서지 PDF는 폰트를 앱에 포함하고, 내보내기 전에 미리 볼 수 있도록 흐름을 바꿨습니다.",
    },
  ],
  3: [
    {
      scope: "사용자·판매자·관리자 API 명세",
      tool: "Claude",
      approach: "프론트엔드 구현에서 참고할 수 있도록 인증, 레시피, 상품, 주문 API를 영역별로 정리하고, 요청·응답 형식을 문서화했습니다.",
    },
  ],
  5: [
    {
      scope: "팀의 선행 Vanilla JS 프로젝트 코드 리뷰",
      tool: "Claude",
      approach: "선행 저장소에서 초기 구조와 변경분을 검토하고 API 사용 방식 개선안을 정리한 기록이 있습니다. React 버전에서 제가 맡은 로그인·마이페이지의 AI 활용은 확인 중입니다.",
    },
  ],
  7: [
    {
      scope: "프로젝트 탐색과 화면 갤러리",
      tool: "Claude",
      approach: "포트폴리오 모드를 통합하고 Finder에서 분야별로 프로젝트를 탐색하도록 개선했습니다. 갤러리에는 실제 사이트의 화면을 다시 촬영해 담았습니다.",
    },
  ],
  8: [
    {
      scope: "팀의 센서 이미지 학습",
      tool: "이미지 학습",
      approach: "팀 역할에 센서 이미지 학습이 포함됐습니다. 모델·데이터와 학습 결과는 확인 중입니다. 제가 맡은 웹 대시보드는 하드웨어 연동이 지연돼 샘플 데이터로 시연했습니다.",
    },
  ],
  9: shinepoAi,
};
