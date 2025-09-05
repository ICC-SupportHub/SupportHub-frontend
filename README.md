# 🌐 SupportHub - Frontend

> 감정 기반 공감 챗봇 플랫폼 **SupportHub**의 프론트엔드 프로젝트입니다.  
> **Next.js + React + JavaScript 기반 웹 애플리케이션**으로, 백엔드와 연동된 사용자 중심 UI/UX 구현을 목표로 합니다.

---

## /supporthub-frontend

├── .next/ # Next.js 빌드 출력물 (자동 생성)
├── node_modules/ # 설치된 패키지 모듈 (자동 생성)
├── public/ # 정적 리소스 (favicon, og 이미지 등)
├── src/
│ ├── app/ # App Router 라우팅 및 전역 구성
│ │ ├── ai-chat/ # AI 챗봇 관련 라우트
│ │ ├── anonymous-community/# 익명 커뮤니티 라우트
│ │ ├── api/ # API 라우트 핸들러 (Next.js API route)
│ │ ├── auth/ # 인증 관련 라우트 (로그인, 회원가입 등)
│ │ ├── conversation-topics/# 대화 주제 관련 페이지
│ │ ├── emergency-support/ # 긴급 지원 라우트
│ │ ├── emotion-diary/ # 감정 일기 라우트
│ │ ├── emotion-history/ # 감정 기록 히스토리 라우트
│ │ ├── shared-conversation/# 대화 공유 페이지
│ │ ├── globals.css # 전역 스타일
│ │ ├── layout.jsx # App Router 기본 레이아웃
│ │ └── page.jsx # 루트 페이지
│
│ ├── components/ # 공통 UI 컴포넌트
│ │ ├── ui/
│ │ │ ├── chat-interface.jsx
│ │ │ ├── emotion-diary.jsx
│ │ │ ├── emotion-history.jsx
│ │ │ └── sidebar-nav.jsx
│
│ ├── hooks/ # 커스텀 훅 정의
│
│ └── lib/ # 유틸 함수, 상수 등 공통 라이브러리
│
├── .gitignore # Git에서 무시할 파일 목록
├── .prettierrc # Prettier 포맷 설정
├── .prettierignore # Prettier 무시 대상
├── components.json # Tailwind UI 구성 요소 참조 (옵션)
├── eslint.config.mjs # ESLint 설정 파일
├── jsconfig.json # JavaScript/VSCode 모듈 경로 설정
├── next-env.d.ts # Next.js 타입 선언 (TS 프로젝트일 경우)
├── next.config.js / .mjs # Next.js 설정 파일
├── package.json # 프로젝트 메타정보 및 의존성
├── postcss.config.js # Tailwind/PostCSS 설정
├── tailwind.config.js # Tailwind CSS 설정
├── README.md # 프로젝트 설명 문서

## 🚀 실행 방법

### Node.js 설치 확인

node -v
npm -v

### 개발 서버 실행

npm install
npm run dev

기본 주소: http://localhost:3000

### 🔗 백엔드 연동

API 서버 주소: http://localhost:8080/api

.env.local에 다음과 같이 설정:
NEXT_PUBLIC_API_URL=http://localhost:8080/api

Axios 등으로 API 요청 시 process.env.NEXT_PUBLIC_API_URL 사용

### 🛡️ 브랜치 전략

브랜치 | 설명
main | 운영 배포 브랜치 (🔒 보호)
dev | 통합 개발 브랜치 (🔒 보호)
이름 | 브랜치 팀원별 기능 개발용 브랜치 (dohee, minsu 등)

main, dev 브랜치는 직접 push 금지
각자 이름 브랜치에서 작업 후 dev 브랜치로 Pull Request를 보내고 코드 리뷰를 거쳐 병합합니다.

### 📝 PR 작성 규칙

브랜치에서 기능 구현 후 dev 브랜치로 PR 생성

PR 제목 형식: [이름] 작업 요약

예: [도희] 회원가입 페이지 구현

### 💬 커밋 규칙

커밋 메시지는 한글로 작성하고 다음 prefix를 사용합니다:

Prefix | 설명
feat | 새로운 기능 추가
fix | 버그 수정
docs | 문서 작업 또는 README 수정
style | 스타일 (CSS 등) 변경
refactor | 리팩토링 (기능 변화 없음)
config | 설정 파일 변경 (예: eslint, next.config)

예시:
git add .
git add 폴더명

git commit -m "feat: 감정 일기 작성 기능 추가"

git push origin (자기브랜치)

### 📌 협업 주의사항

.env.local 파일은 절대 커밋 금지 (Git에서 무시되도록 .gitignore에 설정됨)

모든 기능은 개인 브랜치에서 작업 후 PR로 병합

작업 내용은 Notion에 정리하여 공유

서로의 PR을 확인하고 반드시 리뷰 후 승인

### 🔐 보안 설정 (GitHub)

main, dev 브랜치 보호 설정:

Allow force pushes ❌

Allow deletions ❌

Require pull request before merging ✅

레포지토리는 기본 private 유지

### 📚 사용 스택

구분 | 기술 스택
프레임워크 | Next.js
라이브러리 | React
언어 | JavaScript
스타일링 | CSS Modules / Tailwind (선택)
API 통신 | Axios
기타 | dotenv, ESLint, Prettier 등

### ✅ 개발 체크리스트

페이지 라우팅 구조 설계

공통 컴포넌트 구조화

Axios 인터셉터 구성

사용자 인증 흐름 구현

UI 테스트 및 반응형 구현

Notion에 작업 내용 정리

### 📅 회의 일정 및 협업 규칙

✅ 매주: 각자 개발한 기능 정리 → Notion 업로드

✅ 모든 팀원: 서로의 노션 문서를 참고하여 피드백 주고받기

✅ 2주마다: 온라인 미팅 진행 (기능 공유 및 피드백)

✅ 한 달에 1회: 전체 회의 필수 참석 (중간 회의 불참자 포함)

### 📞 문의 및 연락

GitHub: https://github.com/ICC-SupportHub/SupportHub-frontend

Notion: https://www.notion.so/222672d5ce4680a0848bf36722bea3aa?v=222672d5ce4680af9968000cb3750e20&source=copy_links
