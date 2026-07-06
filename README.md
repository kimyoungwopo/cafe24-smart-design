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
  <a href="#ai-도구별-설치">AI 도구별 설치</a> ·
  <a href="#개발--검증">개발/검증</a>
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
| Quality Gate | registry 무결성 검증과 CI | `scripts/validate-data.mjs`, `.github/workflows/check.yml` |

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
| CI Gate | Red Team / Blue Team / Readiness 체크 | GitHub Actions |

---

## AI 도구별 설치

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

`SKILL.md`와 `references/*.md`를 프로젝트 지침 또는 knowledge/context 파일로 추가하세요.

| 도구 | 적용 위치 |
|---|---|
| ChatGPT | Custom Instructions 또는 GPT Knowledge |
| Codex | `AGENTS.md` 또는 프로젝트 컨텍스트 |
| Gemini | `GEMINI.md`, Gems, AI Studio System Instructions |

---

## 개발 / 검증

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

## Red Team / Blue Team 머지 게이트

PR은 GitHub Actions의 세 가지 게이트를 통과해야 자동 머지될 수 있습니다.

| Gate | 역할 |
|---|---|
| Red Team | diff sanity, hardcoded secret scan, critical audit |
| Blue Team | `npm ci`, registry validation, tests |
| Deployment Readiness | Red/Blue 결과를 fail-closed로 종합 |

자세한 운영 방식은 [`docs/red-blue-merge-gates.md`](docs/red-blue-merge-gates.md)를 참고하세요.

---

## 다음 개발 아이디어

- `cafe24-smart-design-check` CLI: HTML 스킨 파일에서 잘못된 module/variable/modifier 검사
- VS Code / Cursor snippets 자동 생성
- `data/*.json`에서 Markdown/HTML 문서 자동 생성
- 공식 문서 source URL과 verifiedAt 필드 강화
- GitHub Pages 기반 검색형 docs site

---

## 라이선스

MIT
