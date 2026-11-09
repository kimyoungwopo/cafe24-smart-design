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
  <a href="https://kimyoungwopo.github.io/cafe24-smart-design"><strong>공개 GitHub Pages 보기</strong></a> ·
  <a href="#이번-업데이트에서-추가된-것">이번 업데이트</a> ·
  <a href="#빠른-시작">빠른 시작</a> ·
  <a href="#무엇이-들어있나요">구성</a> ·
  <a href="#ai-도구별-사용법">AI 도구별 사용법</a> ·
  <a href="#소스-검증">소스 검증</a>
</p>

---

## 소개

`cafe24-smart-design`는 카페24 쇼핑몰 스킨 작업에서 AI가 자주 틀리는 **모듈명, 변수 scope, modifier 문법, 실전 템플릿 패턴**을 한곳에 정리한 오픈소스 레퍼런스입니다.

카페24 편집기 안에서 이 레퍼런스로 디자인을 수정하고 검증하는 **Cafe24 Smart Design Guard 크롬 확장**은 이 저장소와 별도로 배포합니다. Chrome 웹 스토어 등록 전까지는 [GitHub Releases](https://github.com/kimyoungwopo/cafe24-smart-design/releases)에서 설치 파일을 내려받을 수 있습니다. 확장 프로그램의 소스는 이 저장소에 포함되지 않습니다.

단순 문서 모음이 아니라, AI 도구와 자동화가 재사용할 수 있도록 `data/*.json` registry와 검증 스크립트까지 포함합니다.

> 목표: Claude Code, Cursor, GitHub Copilot, Windsurf, GPT, Gemini 같은 AI 도구가 카페24 스마트디자인 코드를 더 안전하고 정확하게 생성하도록 돕기.

---

## 이번 업데이트에서 추가된 것

이번 확장은 기존 registry 숫자만 늘리는 업데이트가 아니라, 실제 작업자가 어디를 봐야 하는지 바로 알 수 있도록 **공개 뷰어의 신규 문서 진입점**을 정리한 업데이트입니다.

| 추가 영역 | 사람들이 바로 확인할 위치 | 무엇을 알 수 있나 |
|---|---|---|
| 공개 GitHub Pages | https://kimyoungwopo.github.io/cafe24-smart-design | 검색 가능한 레퍼런스 뷰어를 설치 없이 확인 |
| SEO/GEO 메타 | `index.html`, `robots.txt`, `sitemap.xml`, `llms.txt` | 검색엔진·AI 검색·에이전트가 canonical, 범위, 데이터 출처를 파악 |
| 공식 디자인 문서 맵 | `index.html#official-map` | 개발자센터 Design 문서군을 제작/운영/컴포넌트로 분류 |
| 스킨 제작 흐름 | `index.html#skin-workflow` | 구상 → 편집 → 로컬 확인 → 테스트 스킨 preview → 상품화 단계 |
| AI 안전 규칙 | `index.html#ai-guardrails` | `module`, `{$...}`, action/form 변수, `ec-base-*` 보존 체크 |
| URL/템플릿 모달 | `index.html#url-template-map` | URL별 수정 후보 파일·모듈·위험 포인트를 카드/모달로 확인 |

> 먼저 볼 링크: **https://kimyoungwopo.github.io/cafe24-smart-design**

---

## 무엇이 들어있나요?

| 영역 | 내용 | 파일 |
|---|---|---|
| Skill | AI 에이전트용 핵심 규칙과 트리거 | `SKILL.md` |
| Modules | 레이아웃, 상품, 주문, 회원, 게시판 모듈 | `references/modules.md`, `data/modules.json` |
| Variables | 상품/주문/회원/게시판 변수 레퍼런스 | `references/variables.md`, `data/variables.json` |
| Modifiers | `cut`, `display`, `numberformat` 등 13종 | `references/modifiers-and-syntax.md`, `data/modifiers.json` |
| Visual Docs | 검색 가능한 단일 HTML 레퍼런스 | `cafe24-modules-variables.html` |
| Official Map | 개발자센터 Design 하위 문서 맵과 제작/운영 흐름 | `index.html#official-map` |
| Component Cheatsheet | PC/Mobile 테마 컴포넌트 핵심 클래스 | `index.html#component-cheatsheet` |
| URL Template Map | 특정 URL이 어느 스킨 파일/모듈에 연결되는지 보여주는 샘플 모달 | `index.html#url-template-map` |
| Source QA | registry 무결성 검증과 테스트 | `scripts/validate-data.mjs`, `test/validate-data.test.mjs` |
| GitHub Pages | 공개 레퍼런스 뷰어 진입점 | https://kimyoungwopo.github.io/cafe24-smart-design |

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

공개 페이지에서 바로 볼 수 있습니다.

- https://kimyoungwopo.github.io/cafe24-smart-design

로컬에서는 아래 파일을 열면 검색 가능한 전체 레퍼런스를 볼 수 있습니다.

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
# tests 9
# pass 9
```

---

## 주요 기능

| 기능 | 설명 | 예시 |
|---|---|---|
| 모듈 레퍼런스 | 카페24 페이지별 module ID 정리 | `Layout_LogoTop`, `product_listnormal`, `Order_form` |
| 변수 레퍼런스 | 상품/주문/회원/게시판 변수 정리 | `{$product_name}`, `{$product_price}`, `{$order_id}` |
| 수정자 레퍼런스 | 데이터 변환 modifier 문법 | `{$product_name|cut:20,...}`, `{$price|numberformat}` |
| 실전 패턴 | 상품 목록, 로그인 분기, 게시판, 컬러칩 | `product_listmain_1`, `member_login` |
| 공식 문서 맵 | 개발자센터 Design 하위 문서를 제작/운영/컴포넌트로 분류 | `index.html#official-map` |
| AI 안전 규칙 | module/변수/action/폼 변수 보존 체크리스트 | `index.html#ai-guardrails` |
| URL Template Map | URL별 수정 후보 파일/모듈을 모달로 보여주는 작업자 학습 UI | `index.html#url-template-map` |
| Registry | 자동화/AI 도구가 읽을 수 있는 JSON | `data/modules.json` |
| Source QA | JSON registry와 테스트로 문서/데이터 정합성 확인 | `npm run check` |
| GitHub Pages | 루트 URL에서 HTML 레퍼런스 뷰어로 바로 이동 | https://kimyoungwopo.github.io/cafe24-smart-design |

---

## 자동 소스 리서치와 PR 승인 정책

`.github/workflows/cafe24-source-watch.yml`이 매주 공식 Cafe24 자료를 확인하고, 변경이 있으면 `research/cafe24-source-watch` PR을 생성합니다.

저위험 source-watch PR은 `.github/workflows/auto-approve-source-watch.yml`에서 다음 조건을 모두 확인한 뒤에만 별도 reviewer 계정으로 자동 승인합니다.

- PR 작성자가 `github-actions[bot]`
- head branch가 `research/cafe24-source-watch`
- 동일 저장소에서 생성된 PR
- 변경 파일이 `data/source-snapshots.json`과 `research/cafe24-source-watch.md`뿐
- registry, workflow, dependency, script 파일 변경 없음

자동 승인은 새 Cafe24 계약을 추측하거나 registry를 직접 수정하는 권한이 아닙니다. `data/modules.json`, `data/variables.json`, `data/modifiers.json` 변경은 항상 수동 검토 대상으로 남깁니다.

### GitHub 저장소 설정

자동 승인 reviewer는 PR을 만든 `github-actions[bot]`과 다른 GitHub App 또는 별도 사용자여야 합니다. 해당 reviewer의 토큰을 저장소 secret으로 등록합니다.

```bash
gh secret set CAFE24_REVIEW_TOKEN --repo kimyoungwopo/cafe24-smart-design
```

토큰 값은 저장소 파일, 로그, PR 본문에 기록하지 않습니다. secret을 등록하기 전에는 workflow가 자동 승인을 수행하지 않고 명확히 실패합니다.

---

## 공식 Design 문서 리서치 반영

개발자센터 Design 하위 문서를 기준으로, 레퍼런스 뷰어에 다음 실무 섹션을 추가했습니다.

| 섹션 | 내용 | 링크 |
|---|---|---|
| 공식 디자인 문서 맵 | 디자인 가이드, 스마트디자인, 테마 컴포넌트 문서군 구분 | `index.html#official-map` |
| 스킨 제작 실제 흐름 | 구상, 편집, 로컬 확인, 카페24 preview, 상품화 단계 | `index.html#skin-workflow` |
| AI 수정 안전 규칙 | `module`, `{$...}`, action 변수, 폼 변수, `ec-base-*` 보존 규칙 | `index.html#ai-guardrails` |
| 테마 컴포넌트 치트시트 | PC/Mobile 기본 컴포넌트와 대표 클래스 | `index.html#component-cheatsheet` |
| URL별 템플릿/모달 | 샘플 사이트 카드를 클릭하면 URL, 수정 후보 파일, 관련 모듈, 주의점을 모달로 표시 | `index.html#url-template-map` |

핵심 원칙:

```txt
카페24 스킨 작업은 module, 변수, action, 폼 변수를 먼저 보존하고,
실제 카페24 preview에서 상품·옵션·장바구니·로그인 상태를 확인해야 합니다.
```

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

1. 공식/참고 소스 URL을 가져와 텍스트를 정규화하고 모듈 목록 조회수 변동은 제외합니다.
2. 이전 hash와 비교해 새 정보나 변경이 있는지 확인합니다. 정규화 방식이 바뀐 첫 실행은 새 기준으로 표시합니다. 기존 source-watch PR이 열려 있으면 변경 내역을 덮어쓰지 않도록 작업을 중단하므로, 해당 PR을 수동 검토 후 병합하거나 닫아야 합니다.
3. 변경이 있으면 `research/cafe24-source-watch` 브랜치에 report/snapshot을 올리고 PR을 생성하거나 갱신합니다.
4. registry와 문서 본문은 자동으로 추측 수정하지 않습니다. 변경된 공식 소스를 사람이 확인한 뒤 `data/*.json`, `references/*.md`, `cafe24-modules-variables.html`에 반영합니다.

---

## 다음 개발 아이디어

- CLI 검사 범위와 분석 정확도 개선: 템플릿 문법 및 모듈 scope 검증
- VS Code / Cursor snippets 자동 생성
- `data/*.json`에서 Markdown/HTML 문서 자동 생성
- 더 많은 항목에 공식 문서 source URL, 검증 날짜와 확인 범위 추가
- 소스 변경 PR을 기반으로 registry 업데이트 PR 자동 초안 생성

---

## 라이선스

MIT

## 스킨 HTML 검사 CLI

저장소를 클론한 뒤 Node.js 20 이상에서 실행합니다.

```bash
node bin/cafe24-smart-design-check.mjs /path/to/skin
node bin/cafe24-smart-design-check.mjs --json /path/to/skin/product/detail.html
node bin/cafe24-smart-design-check.mjs --strict /path/to/skin
```

디렉터리 안의 `.html`과 `.htm`을 재귀적으로 검사하고, registry에 없는 모듈·변수·수정자와 위치를 출력합니다. 기본 종료 코드는 발견 항목이 있어도 0이며, `--strict`를 사용하면 1입니다. 실행 오류는 2입니다. npm으로 설치하면 `cafe24-smart-design-check` 명령을 사용할 수 있습니다.

Registry는 **선별된 목록**이므로 미등록 항목은 잘못되었다는 뜻이 아닙니다. 이 정적 검사는 변수의 모듈별 scope, 실제 동작, 스킨 설정이나 카페24 서버의 렌더링을 검증하지 않습니다. 반드시 공식 자료와 테스트 스킨 preview에서 확인하세요.

## 출처와 검증 범위

`source`는 저장소 내 참고 문서입니다. 공식 문서에서 직접 확인한 항목에만 `verification`을 추가하며, `sourceUrl`, `verifiedAt`, `scope`는 확인한 근거와 범위를 나타냅니다. 이 필드가 없는 기존 항목은 **개별 공식 검증 여부가 기록되지 않은 상태**이며 오류라는 의미는 아닙니다. 공식 예시 확인은 모든 스킨·상황에서의 동작을 보증하지 않습니다.

문서의 registry 요약 숫자를 갱신하려면 `npm run sync:docs`를 실행하세요. `npm run check`는 요약 숫자가 데이터와 일치하는지 검사합니다. Markdown과 HTML의 모든 본문이 자동 생성되는 것은 아니므로 항목의 실제 설명과 예시는 여전히 수동 대조가 필요합니다.

## FTP로 스킨 작업하기

FTP로 내려받은 스킨의 HTML은 위 CLI로 점검할 수 있습니다. FTP 경로 확인, 백업과 preview 절차는 [FTP 작업 안내](references/ftp-workflow.md)를 참고하세요. 이 저장소의 확장과 CLI는 FTP 연결이나 업로드를 수행하지 않습니다.
