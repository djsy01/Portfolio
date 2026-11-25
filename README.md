# 🖥️ macOS Portfolio

엄인호의 개발 포트폴리오입니다. Finder에서 프로젝트를 열면 Safari에서 구현 화면, 팀원의 담당 업무, AI 활용 사례를 살펴볼 수 있습니다. [포트폴리오 열기](https://portfolio.inho.pe.kr)

![macOS Portfolio](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

## ✨ 주요 기능

- 🪟 **드래그 가능한 창**: macOS 스타일의 드래그·최대화·닫기 가능한 윈도우 시스템
- 📁 **Finder**: Frontend / Backend / Fullstack 폴더별로 프로젝트를 탐색할 수 있는 파일 탐색기
- 🌐 **Safari**: 프로젝트 상세 정보, 갤러리 라이트박스, 라이브 사이트 iframe 미리보기
- 💻 **Terminal**: 인터랙티브 터미널 UI (`whoami`, `skills`, `projects`, `contact` 등)
- 👥 **협업자 정보** — 역할별 팀원 카드에서 담당 업무를 확인하고 GitHub 프로필로 이동
- 📱 **모바일 자동 라우팅**: User-Agent 감지 후 iOS 스타일 모바일 UI로 자동 전환
- 🔄 **창 상태 관리**: Zustand로 창 z-index, 포커스, 최대화 상태 통합 관리

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone https://github.com/djsy01/Portfolio.git
cd Portfolio

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📁 프로젝트 구조

```text
Portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 데스크탑 메인 페이지
│   │   ├── layout.tsx            # 루트 레이아웃 (메타데이터)
│   │   ├── globals.css           # 글로벌 스타일
│   │   └── mobile/
│   │       ├── page.tsx          # 모바일 메인 페이지
│   │       └── layout.tsx        # 모바일 레이아웃
│   ├── components/
│   │   ├── Window.tsx            # 드래그 가능한 창 컴포넌트
│   │   ├── Dock.tsx              # 하단 앱 독
│   │   ├── MenuBar.tsx           # 상단 메뉴바 (실시간 시계)
│   │   ├── FinderContent.tsx     # Finder 앱 내용
│   │   ├── SafariContent.tsx     # Safari 앱 내용
│   │   ├── TerminalContent.tsx   # Terminal 앱 내용
│   │   └── mobile/
│   │       ├── MobileStatusBar.tsx   # iOS 상태바
│   │       ├── MobileAppSheet.tsx    # 바텀 시트 모달
│   │       ├── MobileFinder.tsx      # 모바일 프로젝트 브라우저
│   │       ├── MobileSafari.tsx      # 모바일 프로젝트 뷰어
│   │       └── MobileTerminal.tsx    # 모바일 터미널
│   ├── store/
│   │   └── useWindowStore.ts     # Zustand 창 상태 관리
│   ├── data/
│   │   ├── projects.json         # 프로젝트 데이터 (수정 가능)
│   │   ├── profile.json          # 터미널의 소개·기술·연락처
│   │   ├── projectAi.ts          # 프로젝트 ID별 AI 활용 사례
│   │   ├── shinepoAi.ts          # 샤인포 AI 활용 사례
│   │   └── terminalData.ts       # 도움말·사용 안내·개발 환경 사양
│   ├── lib/
│   │   ├── terminalCommands.ts   # 터미널 명령어 핸들러
│   │   └── imageUtils.ts         # Google Drive 이미지 URL 변환
│   └── middleware.ts             # 모바일 감지 & 자동 라우팅
├── public/
├── package.json
├── LICENSE.md
└── README.md
```

## 🛠️ 기술 스택

### 프론트엔드

- **Next.js 16.1.1** - React 프레임워크
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 상태 관리

- **Zustand 5.0.9** - 창 상태(열기/닫기/포커스/최대화) 통합 관리

### UI/UX

- **react-draggable 4.5.0** - 창 드래그 기능
- **lucide-react** - 아이콘 라이브러리
- **Framer Motion 12** - 애니메이션
- **Tailwind CSS 4** - 유틸리티 CSS 프레임워크

### 스타일링

- **CSS Modules** - 컴포넌트 스코프 스타일링

## 💬 터미널 명령어

| 명령어     | 설명                                             |
| ---------- | ------------------------------------------------ |
| `whoami`   | 개발자 소개                                      |
| `skills`   | 언어, 프론트엔드, 백엔드, 데이터베이스, 배포·개발 도구 |
| `projects` | Finder와 같은 분야별 프로젝트 목록 및 진행 상태 |
| `contact`  | 이메일 및 GitHub 프로필 |
| `specs`    | 개발에 사용하는 장비 사양 |
| `help`     | 사용 가능한 명령어 목록                          |
| `menual`   | 사이트 사용 방법 안내                            |
| `clear`    | 터미널 초기화                                    |

## 🎨 커스터마이징

### 프로젝트 추가/수정

Finder와 터미널의 `projects` 명령은 같은 [프로젝트 목록](src/data/projects.json)을 읽습니다. 새 프로젝트에는 고유한 `id`를 지정합니다.

```json
[
  {
    "id": 10,
    "title": "프로젝트 이름",
    "desc": "프로젝트 설명",
    "status": "진행중",
    "date": "2026.11.01 ~ 현재",
    "icon": "🖥️",
    "type": "team",
    "category": "frontend",
    "image": null,
    "screenshots": [],
    "tech": ["React", "TypeScript", "Node.js"],
    "problems": ["문제점 1", "문제점 2"],
    "solutions": ["해결방안 1", "해결방안 2"],
    "team": [
      {
        "name": "홍길동",
        "role": "Frontend Developer",
        "responsibilities": ["UI/UX 디자인 구현", "React 컴포넌트 개발"]
      }
    ],
    "links": {
      "github": null,
      "site": null
    }
  }
]
```

### 프로필 수정

터미널의 `whoami`, `skills`, `contact` 출력을 바꾸려면 [프로필 데이터](src/data/profile.json)를 수정합니다.

```json
{
  "whoami": "개발자 소개",
  "skills": {
    "languages": ["HTML", "CSS", "TypeScript"],
    "frontend": ["React", "Vite"],
    "backend": ["Node.js"],
    "database": ["MySQL"],
    "tools": ["Git", "Vercel"]
  },
  "contact": {
    "email": "you@example.com",
    "github": "github.com/your-account"
  }
}
```

### 프로젝트 분류

- **`category`**: `"frontend"` | `"backend"` | `"fullstack"` — Finder에서 해당 폴더에 표시됨
- `hidden: true`인 항목은 Finder와 터미널의 `projects` 목록에서 숨깁니다. 둘 다 분야 안에서 같은 정렬 규칙을 사용합니다.

### 프로젝트 타입

- **`type: "personal"`**: 개인 프로젝트
- **`type: "team"`**: 팀 프로젝트 — `team` 배열의 구성원 정보가 표시됨

## 🎯 주요 컴포넌트

### Window

드래그 가능한 창 컴포넌트. 각 앱이 독립적인 창으로 작동합니다.

- 헤더를 드래그하여 위치 이동
- 노란색 버튼으로 전체화면(최대화) 토글
- 빨간색 버튼으로 창 닫기
- 클릭 시 z-index 자동 조정 (포커스 레이어링)

### Dock

하단의 앱 런처. 클릭하여 앱을 열고 실행 중인 앱을 표시합니다.

- 호버 시 툴팁 표시
- 실행 중인 앱에 점 인디케이터 표시

### Finder

프로젝트 폴더를 시각적으로 보여주는 파일 탐색기.

- `projects.json` 데이터 기반 프로젝트 그리드 표시
- 프로젝트 클릭 시 Safari 창 자동 실행
- macOS 스타일 사이드바

### Safari

프로젝트 상세 정보와 라이브 사이트를 미리보기할 수 있는 브라우저.

- **기술 스택**: 사용된 기술 태그 표시
- **팀 구성** — 마스터를 먼저 표시하고 기획, UX, FE, BE, NLP, 클라우드 순으로 정렬합니다. 같은 역할 안에서는 이름 가나다순입니다. 팀원 데이터의 `githubUsername`에 계정명을 입력하면 카드 전체가 해당 프로필을 새 탭으로 여는 링크가 됩니다.
- **AI 활용** — 프로젝트 ID에 연결된 사례가 있으면 적용한 작업(`scope`), 도구(`tool`), 구현 방식(`approach`)을 표시합니다. [사례 데이터](src/data/projectAi.ts)
- **문제점 & 해결방안**: 프로젝트 개선 포인트
- **아이콘과 갤러리** — 상세 상단에는 `iconImage` 또는 `icon` 이모지를 표시합니다. 스크린샷은 `screenshots`에 `src`(이미지 경로), `label`(화면 이름), `kind`(`desktop`, `mobile`, `demo`, `general`)로 등록합니다. 같은 유형의 첫 번째 화면을 대표로 배치합니다. 샤인포에는 담당자 홈, 과정별 할 일 목록, 할 일 상세, 이메일 로그인 화면이 있습니다.
- **GitHub**: 새 탭에서 열기
- **Live Site**: Safari 내부 iframe에서 미리보기

공개할 주소만 `links.github`와 `links.site`에 입력합니다. 값이 `null`이면 해당 버튼을 숨깁니다.

### Terminal

`src/data/profile.json`과 `src/data/projects.json`을 기반으로 동작하는 인터랙티브 터미널.

- 명령어 히스토리 (↑/↓ 방향키)
- 커서 깜빡임 애니메이션
- 자동 스크롤

## 📱 모바일 대응

`src/middleware.ts`에서 User-Agent를 감지해 모바일 기기를 자동으로 `/mobile` 경로로 라우팅합니다.
데스크톱에서도 `/mobile` 경로를 직접 열어 모바일 화면을 확인할 수 있습니다.

모바일 UI 구성:

- **MobileStatusBar**: iOS 스타일 상태바 (시간, 배터리, WiFi)
- **MobileAppSheet**: 슬라이드업 바텀 시트 모달
- **MobileFinder / MobileSafari / MobileTerminal**: 모바일 최적화 컴포넌트

## 📝 사용법

1. **Dock에서 앱 클릭**: Finder, Safari, Terminal 앱을 실행
2. **창 드래그**: 헤더를 클릭하고 드래그하여 창 이동
3. **전체화면**: 노란색 버튼 클릭으로 창 최대화/복원
4. **프로젝트 탐색**:
   - Finder에서 프로젝트 클릭
   - Safari가 자동으로 열리며 프로젝트 상세 정보 표시
5. **외부 링크**:
   - GitHub 버튼: 새 탭에서 열림
   - Live Site 버튼: Safari 내부 iframe으로 표시

## 🔧 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📄 라이선스

이 프로젝트는 이중 라이선스를 따릅니다:

### 코드 (MIT License)

코드베이스는 MIT 라이선스 하에 자유롭게 사용 가능합니다. 포크, 수정, 배포가 가능합니다.

### 콘텐츠 (All Rights Reserved)

다음 콘텐츠는 **사용이 제한**됩니다:

- 프로젝트 정보 및 설명
- 프로젝트 이미지 및 스크린샷
- 개인 정보 및 포트폴리오 내용
- `projects.json`, `profile.json`의 모든 데이터
- 협업자 정보 및 팀 구성원 정보

**이 템플릿을 사용하려면:**

1. ✅ 코드 구조와 디자인 사용 가능
2. ❌ `projects.json` 데이터는 본인의 프로젝트 정보로 교체 필수
3. ❌ `profile.json` 데이터는 본인의 프로필로 교체 필수
4. ❌ 이미지는 본인의 이미지로 교체 필수

자세한 내용은 [LICENSE.md](LICENSE.md) 파일을 참조하세요.

## 👤 개발자 : 엄인호 (Inho Um)

- Portfolio: [portfolio.inho.pe.kr](https://portfolio.inho.pe.kr)
- GitHub: [@djsy01](https://github.com/djsy01)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/)
- [react-draggable](https://github.com/react-grid-layout/react-draggable)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)
