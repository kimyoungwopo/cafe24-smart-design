<p align="center">
  <img src="https://img.shields.io/badge/Cafe24-Smart%20Design-2563EB?style=for-the-badge" alt="Cafe24 Smart Design" />
  <img src="https://img.shields.io/badge/AI%20Skill-Ready-7C3AED?style=for-the-badge" alt="AI Skill Ready" />
  <img src="https://img.shields.io/badge/License-MIT-111827?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">Cafe24 Smart Design Skill</h1>

<p align="center">
  AI 코딩 에이전트를 위한 카페24 스마트디자인 레퍼런스 툴킷<br />
  <strong>모듈 89개 · 변수 194개 · 수정자 13종 · 검증 가능한 Registry</strong>
</p>

<p align="center">
  <a href="#빠른-시작">빠른 시작</a> ·
  <a href="#무엇이-들어있나요">구성</a> ·
  <a href="#ai-도구별-사용법">AI 도구별 사용법</a> ·
  <a href="#소스-검증">소스 검증</a>
</p>

---

## 소개

`cafe24-smart-design`는 카페24 쇼핑몰 스킨 작업에서 AI가 자주 틀리는 **모듈명, 변수 scope, modifier 문법, 실전 템플릿 패턴**을 한곳에 정리한 오픈소스 레퍼런스입니다.

단순 문서 모음이 아니라, AI 도구와 자동화가 재사용할 수 있도록 `data/*.json` registry와 검증 스크립트까지 포함합니다.

> 목표: Claude Code, Cursor, GitHub Copilot, Windsurf, GPT, Gemini 같은 AI 도구가 카페24 스마트디자인 코드를 더 안전하고 정확하게 생성하도록 돕기.

---

## 무엇이 들어있나요?

| 영역 | 내용 | 파일 |
|---|---|---|
| Skill | AI 에이전트용 핵심 규칙과 트리거 | `SKILL.md` |
| Modules | 레이아웃, 상품, 주문, 회원, 게시판 모듈 | `references/modules.md`, `data/modules.json` |
| Variables | 상품/주문/회원/게시판 변수 레퍼런스 | `references/variables.md`, `data/variables.json` |
| Modifiers | `cut`, `display`, `numberformat` 등 13종 | `references/modifiers-and-syntax.md`, `data/modifiers.json` |
| Visual Docs | 검색 가능한 단일 HTML 레퍼런스 | `cafe24-modules-variables.html` |
| Source QA | registry 무결성 검증과 테스트 | `scripts/validate-data.mjs`, `test/validate-data.test.mjs` |
| GitHub Pages | 공개 레퍼런스 뷰어 진입점 | `index.html`, `cafe24-modules-variables.html` |

```txt
cafe24-smart-design/
├── SKILL.md
├── README.md
├── cafe24-modules-variables.html
├── data/
│   ├── modules.json
│   ├── variables.json
│   └── modifiers.json
├── references/
│   ├── modules.md
│   ├── variables.md
│   └── modifiers-and-syntax.md
└── scripts/
    └── validate-data.mjs
```

---

## 빠른 시작

### 레퍼런스 보기

브라우저에서 아래 파일을 열면 검색 가능한 전체 레퍼런스를 볼 수 있습니다.

```bash
open cafe24-modules-variables.html
```

보기 팁:

- 상단 **빠른 찾기**에서 모듈/변수/수정자를 한 번에 검색합니다.
- `⌘K` / `Ctrl+K` 또는 `/` 키로 빠른 찾기 입력창에 바로 포커스할 수 있습니다.
- 검색 결과 카드를 누르면 원문 표 위치로 이동합니다.

### 데이터 검증

```bash
npm install
npm run check
```

성공 예시:

```txt
✓ registry ok: 89 modules, 194 variables, 13 modifiers
# tests 2
# pass 2
```

---

## 주요 기능

| 기능 | 설명 | 예시 |
|---|---|---|
| 모듈 레퍼런스 | 카페24 페이지별 module ID 정리 | `Layout_LogoTop`, `product_listnormal`, `Order_form` |
| 변수 레퍼런스 | 상품/주문/회원/게시판 변수 정리 | `{$product_name}`, `{$product_price}`, `{$order_id}` |
| 수정자 레퍼런스 | 데이터 변환 modifier 문법 | `{$product_name|cut:20,...}`, `{$price|numberformat}` |
| 실전 패턴 | 상품 목록, 로그인 분기, 게시판, 컬러칩 | `product_listmain_1`, `member_login` |
| Registry | 자동화/AI 도구가 읽을 수 있는 JSON | `data/modules.json` |
| Source QA | JSON registry와 테스트로 문서/데이터 정합성 확인 | `npm run check` |
| GitHub Pages | 루트 URL에서 HTML 레퍼런스 뷰어로 바로 이동 | `index.html` |

---

## AI 도구별 사용법

### Claude Code

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git   ~/.claude/skills/cafe24-smart-design
```

트리거 키워드:

```txt
cafe24, 카페24, 스마트디자인, module=, {$...}, 카페24 스킨
```

### Cursor

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
mkdir -p .cursor/rules
cp /tmp/cafe24-ref/references/*.md .cursor/rules/
cp /tmp/cafe24-ref/SKILL.md .cursor/rules/cafe24-smart-design.md
```

### GitHub Copilot

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
mkdir -p .github
cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md   > .github/copilot-instructions.md
```

### Windsurf

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md   > .windsurfrules
```

### GPT / Gemini / Codex

범용 AI 도구는 저장소 전체를 설치하기보다, 아래 파일을 프로젝트 지침 또는 knowledge/context로 넣는 방식이 가장 안정적입니다.

| 도구 | 추천 적용 위치 | 넣을 파일 | 사용 팁 |
|---|---|---|---|
| ChatGPT | Custom Instructions, GPT Knowledge, Project files | `SKILL.md`, `references/*.md` | “카페24 스마트디자인 작업 시 이 문서를 우선 참고”라고 지시 |
| Gemini | `GEMINI.md`, Gems, AI Studio System Instructions | `SKILL.md`, `references/*.md` | 긴 작업은 `references/modules.md`와 `references/variables.md`를 분리해서 첨부 |
| Codex | `AGENTS.md` 또는 프로젝트 컨텍스트 | `SKILL.md`, `references/*.md` | 실제 스킨 repo 루트에 `AGENTS.md`로 합쳐두면 반복 사용 편함 |

Codex용 `AGENTS.md` 예시:

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md > AGENTS.md
```

---

---|
| ChatGPT | Custom Instructions 또는 GPT Knowledge |
| Codex | `AGENTS.md` 또는 프로젝트 컨텍스트 |
| Gemini | `GEMINI.md`, Gems, AI Studio System Instructions |

---

## 소스 검증

이 저장소는 문서뿐 아니라 AI 도구가 재사용할 수 있는 machine-readable registry를 함께 제공합니다.

```bash
npm install
npm run validate:data
npm test
npm run check
```

`npm run validate:data`는 다음을 검사합니다.

- 모듈/변수/수정자 중복 여부
- 필수 필드 누락 여부
- 모듈이 참조하는 변수가 registry에 존재하는지
- modifier syntax/example이 실제 pipe modifier 이름을 포함하는지

---

## 주기적 소스 리서치

공식 카페24 스마트디자인 문서와 주요 모듈 소스 페이지는 GitHub Actions로 주 1회 확인합니다.

| 항목 | 내용 |
|---|---|
| Workflow | `.github/workflows/cafe24-source-watch.yml` |
| Schedule | 매주 월요일 09:00 KST |
| Manual run | GitHub Actions의 `Cafe24 Source Watch` → `Run workflow` |
| Watch script | `scripts/research-cafe24-sources.mjs` |
| Snapshot | `data/source-snapshots.json` |
| Report | `research/cafe24-source-watch.md` |
| Upload branch | `research/cafe24-source-watch` |

동작 방식:

1. 공식/참고 소스 URL을 가져와 텍스트를 정규화합니다.
2. 이전 hash와 비교해 새 정보나 변경이 있는지 확인합니다.
3. 변경이 있으면 `research/cafe24-source-watch` 브랜치에 report/snapshot을 올리고 PR을 생성하거나 갱신합니다.
4. registry와 문서 본문은 자동으로 추측 수정하지 않습니다. 변경된 공식 소스를 사람이 확인한 뒤 `data/*.json`, `references/*.md`, `cafe24-modules-variables.html`에 반영합니다.

---

## 다음 개발 아이디어

- `cafe24-smart-design-check` CLI: HTML 스킨 파일에서 잘못된 module/variable/modifier 검사
- VS Code / Cursor snippets 자동 생성
- `data/*.json`에서 Markdown/HTML 문서 자동 생성
- 공식 문서 source URL과 verifiedAt 필드 강화
- 소스 변경 PR을 기반으로 registry 업데이트 PR 자동 초안 생성

---

## 라이선스

MIT
