# 🌐 SupportHub - Frontend

> 감정 기반 공감 챗봇 플랫폼 **SupportHub**의 프론트엔드 프로젝트입니다.  
> **Next.js + React + JavaScript 기반 웹 애플리케이션**으로, 백엔드와 연동된 사용자 중심 UI/UX 구현을 목표로 합니다.

---

## 📁 프로젝트 구조

```
/supporthub-frontend
├── public/               # 정적 파일 (favicon 등)
├── src/
│   ├── components/       # 공통 컴포넌트
│   ├── pages/            # 라우팅 페이지
│   ├── styles/           # 전역 스타일
│   └── utils/            # 유틸 함수
├── .env.local            # 환경 변수
├── package.json
├── next.config.js
├── README.md
```

---

odfdfdfs

## 🚀 실행 방법

### Node.js 설치 확인

```bash
node -v
npm -v
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

- 기본 주소: `http://localhost:3000`

---

## 🔗 백엔드 연동

- API 서버 주소: `http://localhost:8080/api`
- `.env.local`에 다음과 같이 설정:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

- Axios 등으로 API 요청 시 `process.env.NEXT_PUBLIC_API_URL` 사용

---

## 🛡️ 브랜치 전략

| 브랜치          | 설명                                |
| --------------- | ----------------------------------- |
| `main`          | 운영 배포 브랜치 (🔒 보호)          |
| `dev`           | 통합 개발 브랜치 (🔒 보호)          |
| `feat/{기능명}` | 기능 단위 브랜치 (`feat/join-page`) |

> `main`, `dev`는 직접 push 금지  
> 반드시 PR(Pull Request)을 통해 병합하며 코드 리뷰 필수

---

## 📝 PR 작성 규칙

- PR 제목 형식: `[기능명] 작업 내용`
- 예: `[UI] 회원가입 페이지 구현`

---

## 💬 커밋 규칙

커밋 메시지는 **한글**로 작성하고 다음 prefix를 사용합니다:

| Prefix     | 설명                                     |
| ---------- | ---------------------------------------- |
| `feat`     | 새로운 기능 추가                         |
| `fix`      | 버그 수정                                |
| `docs`     | 문서 작업 또는 README 수정               |
| `style`    | 스타일 (CSS 등) 변경                     |
| `refactor` | 리팩토링 (기능 변화 없음)                |
| `config`   | 설정 파일 변경 (예: eslint, next.config) |

예시:

```bash
git commit -m "style: 메인 페이지 버튼 정렬 수정"
```

---

## 📌 협업 주의사항

- `.env.local` 파일은 절대 커밋 금지 (Git에서 무시되도록 설정)
- 기능 구현은 브랜치 분기 후 PR로 관리
- 작업 내용은 **Notion**에 정리하고 공유
- 서로의 PR 내용을 확인하고 **리뷰 및 피드백** 주고받기

---

## 🔐 보안 설정 (GitHub)

- `main`, `dev` 브랜치 보호 설정:

  - `Allow force pushes` ❌
  - `Allow deletions` ❌
  - `Require pull request before merging` ✅

- 레포지토리는 기본 `private` 유지

---

## 📚 사용 스택

| 구분       | 기술 스택                     |
| ---------- | ----------------------------- |
| 프레임워크 | Next.js                       |
| 라이브러리 | React                         |
| 언어       | JavaScript                    |
| 스타일링   | CSS Modules / Tailwind (선택) |
| API 통신   | Axios                         |
| 기타       | dotenv, ESLint, Prettier 등   |

---

## ✅ 개발 체크리스트

- [ ] 페이지 라우팅 구조 설계
- [ ] 공통 컴포넌트 구조화
- [ ] Axios 인터셉터 구성
- [ ] 사용자 인증 흐름 구현
- [ ] UI 테스트 및 반응형 구현
- [ ] Notion에 작업 내용 정리

---

## 📅 회의 일정 및 협업 규칙

- ✅ **매주**: 각자 개발한 기능 정리 → Notion 업로드
- ✅ **모든 팀원**: 서로의 노션 문서를 참고하여 피드백 주고받기
- ✅ **2주마다**: 온라인 미팅 진행 (기능 공유 및 피드백)
- ✅ **한 달에 1회**: 전체 회의 필수 참석 (중간 회의 불참자 포함)

---

## 📞 문의 및 연락

- GitHub: https://github.com/ICC-SupportHub/SupportHub-frontend
- Notion: https://www.notion.so/222672d5ce4680a0848bf36722bea3aa?v=222672d5ce4680af9968000cb3750e20&source=copy_links

---
