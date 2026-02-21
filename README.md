# Pulse — Personal Dashboard

개인 생산성 대시보드 앱. 할 일 관리, 메모, 습관 트래커, 포모도로 타이머 등 다양한 생산성 도구를 하나의 대시보드에서 사용할 수 있다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Animation**: Framer Motion
- **Chart**: Recharts
- **Drag & Drop**: @dnd-kit
- **Icon**: Lucide React
- **Date**: date-fns
- **Data**: LocalStorage (클라이언트 영속성)

## 시작하기

```bash
npm install
npm run dev     # 개발 서버 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버
```

## 프로젝트 구조

```
app/
  layout.jsx            # 루트 레이아웃 (폰트, ThemeProvider, 공유 UI)
  globals.css            # 글로벌 스타일 (Tailwind, 글래스모피즘, 테마 유틸리티)
  page.jsx               # / — 대시보드
  todos/page.jsx         # /todos — 할 일 목록
  notes/page.jsx         # /notes — 메모
  stats/page.jsx         # /stats — 통계
  pomodoro/page.jsx      # /pomodoro — 포모도로 타이머
  ambient/page.jsx       # /ambient — 분위기 사운드
  settings/page.jsx      # /settings — 설정
src/
  components/            # UI 컴포넌트 (13개)
  contexts/
    ThemeContext.jsx      # 테마 색상 Context
  hooks/
    useLocalStorage.js   # localStorage 커스텀 훅
public/
  vite.svg               # 파비콘
```

## 주요 기능

### 대시보드 (`/`)
통계 카드, 활동 차트, 포모도로 타이머, 습관 트래커, 명언 위젯, 빠른 링크를 한눈에 볼 수 있는 메인 화면.

### 할 일 목록 (`/todos`)
할 일 추가/삭제/완료 처리. 우선순위(높음/중간/낮음) 표시, 즐겨찾기, 필터링(전체/진행/완료/중요) 지원.

### 메모 (`/notes`)
메모 작성/삭제/고정. @dnd-kit을 이용한 드래그 앤 드롭 정렬. 5가지 컬러 테마 자동 적용.

### 통계 (`/stats`)
통계 카드 + 주간 히트맵으로 활동 데이터 시각화.

### 포모도로 타이머 (`/pomodoro`)
집중(25분)/짧은 휴식(5분)/긴 휴식(15분) 모드 전환. 원형 프로그레스 타이머. 완료 세션 카운트 저장.

### 분위기 사운드 (`/ambient`)
비, 바람, 모닥불, 바다, 숲 5가지 사운드. 개별 볼륨 + 마스터 볼륨 조절.

### 설정 (`/settings`)
다크모드, 알림, 자동저장 등 토글 설정. 6가지 테마 색상(Indigo, Pink, Emerald, Orange, Blue, Violet) 변경.

## 데이터 저장 (localStorage)

모든 사용자 데이터는 브라우저 localStorage에 저장되어 새로고침/재방문 시에도 유지된다.

| 키 | 저장 데이터 | 사용 컴포넌트 |
|---|---|---|
| `pulse-todos` | 할 일 목록 | TodoList |
| `pulse-notes` | 메모 목록 | Notes |
| `pulse-habits` | 습관 진행률 | HabitTracker |
| `pulse-pomodoro-sessions` | 포모도로 완료 세션 수 | PomodoroTimer |
| `pulse-ambient-sounds` | 활성 사운드 및 개별 볼륨 | AmbientSounds |
| `pulse-ambient-volume` | 마스터 볼륨 | AmbientSounds |
| `pulse-settings` | 설정 토글 값 | SettingsPanel |
| `pulse-theme-color` | 선택된 테마 색상 | ThemeContext |

## 라우팅

Next.js App Router 기반 파일 시스템 라우팅. Sidebar에서 `next/link` + `usePathname()`으로 네비게이션. 각 페이지는 `'use client'` 클라이언트 컴포넌트로 동작하며, Framer Motion 진입 애니메이션이 적용되어 있다.

## 배포

Vercel에 배포 가능. `next build`로 정적 페이지가 사전 생성된다.
