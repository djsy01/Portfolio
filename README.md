# 🖥️ macOS Portfolio

Next.js로 구현한 인터랙티브 macOS 스타일 포트폴리오 웹사이트

![macOS Portfolio](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

## ✨ 주요 기능

- 🪟 **드래그 가능한 창**: macOS 스타일의 드래그 가능한 윈도우 시스템
- 📁 **Finder**: 프로젝트를 시각적으로 탐색할 수 있는 파일 탐색기
- 🌐 **Safari**: 프로젝트 상세 정보 및 라이브 사이트 미리보기
- 💻 **Terminal**: 인터랙티브 터미널 UI
- 👥 **협업자 정보**: 팀 프로젝트의 협업자와 담당 업무 표시
- 🎨 **애니메이션 배경**: 부드럽게 움직이는 그라데이션 배경
- 📱 **반응형 디자인**: 다양한 화면 크기 지원

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/macos-portfolio.git
cd macos-portfolio

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📁 프로젝트 구조

```
my-mac-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 메인 페이지
│   │   └── globals.css           # 글로벌 스타일 및 애니메이션
│   ├── components/
│   │   ├── Window.tsx            # 드래그 가능한 창 컴포넌트
│   │   ├── Window.module.css
│   │   ├── Dock.tsx              # macOS 독
│   │   ├── Dock.module.css
│   │   ├── MenuBar.tsx           # 상단 메뉴바
│   │   ├── FinderContent.tsx     # Finder 앱 내용
│   │   ├── FinderContent.module.css
│   │   ├── SafariContent.tsx     # Safari 앱 내용
│   │   ├── SafariContent.module.css
│   │   ├── TerminalContent.tsx   # Terminal 앱 내용
│   │   └── TerminalContent.module.css
│   └── store/
│       └── useWindowStore.ts     # Zustand 상태 관리
├── public/
│   └── images/                   # 프로젝트 이미지
├── package.json
├── LICENSE
└── README.md
```

## 🛠️ 기술 스택

### 프론트엔드

- **Next.js 16.1.1** - React 프레임워크
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 상태 관리

- **Zustand 5.0.9** - 경량 상태 관리 라이브러리

### UI/UX

- **react-draggable 4.5.0** - 드래그 앤 드롭 기능
- **lucide-react 0.562.0** - 아이콘 라이브러리
- **Tailwind CSS 4** - 유틸리티 CSS 프레임워크

### 스타일링

- **CSS Modules** - 컴포넌트 스코프 스타일링
- **Custom Animations** - 커스텀 CSS 애니메이션

## 🎨 커스터마이징

### 배경 변경

`src/app/page.tsx`에서 배경 클래스를 변경할 수 있습니다:

```tsx
// 옵션 1: macOS 스타일 그라데이션 (기본)
<main className="macos-gradient">

// 옵션 2: 활기찬 컬러
<main className="animated-gradient">

// 옵션 3: 차분한 블루
<main className="calm-blue-gradient">

// 옵션 4: 퍼플-핑크
<main className="purple-pink-gradient">
```

### 프로젝트 추가

#### 1. Finder에 프로젝트 추가

`src/components/FinderContent.tsx`에서 `PROJECTS` 배열에 새 프로젝트를 추가:

```tsx
const PROJECTS = [
  {
    id: 1,
    title: "프로젝트 이름",
    desc: "프로젝트 설명",
    status: "진행중",
    icon: "🚀",
    image: "프로젝트 썸네일 이미지 URL", // 선택사항
  },
  // 더 많은 프로젝트...
];
```

#### 2. Safari에 상세 정보 추가

`src/components/SafariContent.tsx`의 `PROJECTS` 배열에 상세 정보 추가:

```tsx
{
  id: 1,
  title: "프로젝트 이름",
  desc: "상세 설명",
  status: "진행중",
  type: "team", // "solo" 또는 "team"
  tech: ["React", "TypeScript", "Node.js"],

  // 협업 프로젝트인 경우
  team: [
    {
      name: "홍길동",
      role: "Frontend Developer",
      responsibilities: [
        "UI/UX 디자인 구현",
        "React 컴포넌트 개발"
      ],
    },
    {
      name: "김철수",
      role: "Backend Developer",
      responsibilities: [
        "API 서버 구축",
        "데이터베이스 설계"
      ],
    },
  ],

  // 문제점과 해결방안 (선택사항)
  problems: ["문제점 1", "문제점 2"],
  solutions: ["해결방안 1", "해결방안 2"],

  // 또는 주요 기능 (선택사항)
  features: ["기능 1", "기능 2"],

  links: {
    github: "GitHub URL",
    site: "라이브 사이트 URL",
  },
}
```

### 프로젝트 타입

- **`type: "solo"`**: 개인 프로젝트 - "개발자" 섹션으로 표시
- **`type: "team"`**: 팀 프로젝트 - "👥 팀 구성" 섹션으로 표시

## 🎯 주요 컴포넌트

### Window

드래그 가능한 창 컴포넌트. 각 앱이 독립적인 창으로 작동합니다.

- 드래그하여 위치 이동
- 크기 조절 가능 (resize)
- 빨간색 닫기 버튼

### Dock

하단의 앱 런처. 클릭하여 앱을 열고 실행 중인 앱을 표시합니다.

- 호버 시 확대 효과
- 실행 중인 앱 표시 (점 인디케이터)
- 툴팁 표시

### Finder

프로젝트 폴더를 시각적으로 보여주는 파일 탐색기.

- 프로젝트 썸네일 이미지 표시
- 프로젝트 클릭 시 Safari 자동 실행
- macOS 스타일 사이드바

### Safari

프로젝트 상세 정보와 라이브 사이트를 미리보기할 수 있는 브라우저.

- **기술 스택**: 사용된 기술 태그 표시
- **팀 구성**: 협업자 이름, 역할, 담당 업무
- **문제점 & 해결방안**: 프로젝트의 개선 포인트
- **주요 기능**: 핵심 기능 리스트
- **GitHub**: 새 탭에서 열기
- **Live Site**: Safari 내부 iframe에서 미리보기

### Terminal

인터랙티브 터미널 UI (향후 확장 가능)

## 📝 사용법

1. **Dock에서 앱 클릭**: Finder, Safari, Terminal 앱을 실행
2. **창 드래그**: 헤더를 클릭하고 드래그하여 창 이동
3. **창 크기 조절**: 창 모서리를 드래그하여 크기 조절
4. **프로젝트 탐색**:
   - Finder에서 프로젝트 폴더 클릭
   - Safari가 자동으로 열리며 프로젝트 상세 정보 표시
5. **외부 링크**:
   - GitHub 버튼: 새 탭에서 열림
   - Live Site 버튼: Safari 내부에서 iframe으로 표시

## 🌟 특징

- ✅ macOS Big Sur 스타일 UI/UX
- ✅ 부드러운 트랜지션
- ✅ 반응형 디자인
- ✅ TypeScript로 타입 안정성 확보
- ✅ 모듈식 컴포넌트 구조
- ✅ Zustand를 통한 효율적인 상태 관리
- ✅ 협업자 정보 및 역할 표시
- ✅ 프로젝트 썸네일 이미지 지원
- ✅ 영어 주석으로 작성된 깔끔한 코드

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
- `PROJECTS` 배열의 모든 데이터
- 협업자 정보 및 팀 구성원 정보

**이 템플릿을 사용하려면:**

1. ✅ 코드 구조와 디자인 사용 가능
2. ❌ 프로젝트 데이터는 본인의 정보로 교체 필수
3. ❌ 이미지는 본인의 이미지로 교체 필수
4. ❌ 협업자 정보는 본인의 팀원 정보로 교체 필수

자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👤 개발자

**Your Name**

- Portfolio: [your-portfolio.com](https://portfolio-gamma-nine-ulldr7th7m.vercel.app/)
- GitHub: [@yourusername](https://github.com/djsy01)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/)
- [react-draggable](https://github.com/react-grid-layout/react-draggable)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)
