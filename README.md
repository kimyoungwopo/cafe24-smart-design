<p align="center">
  <h1 align="center">Cafe24 Smart Design Skill</h1>
  <p align="center">
    AI 코딩 에이전트를 위한 카페24 스마트디자인 레퍼런스
    <br />
    모듈 · 변수 250+ · 수정자 13종 · 코드 패턴
  </p>
</p>

<p align="center">
  <a href="#설치">설치</a> · <a href="#포함된-레퍼런스">레퍼런스</a> · <a href="#주요-기능">기능</a>
</p>

---

## 소개

카페24 쇼핑몰 스킨 작업 시 AI가 정확한 모듈/변수 문법을 참조할 수 있도록 하는 레퍼런스 스킬입니다.

**Claude Code, Cursor, GitHub Copilot, Windsurf, GPT, Gemini** 등 다양한 AI 도구에서 사용할 수 있습니다.

---

## 포함된 레퍼런스

```
cafe24-smart-design/
├── SKILL.md                              # 스킬 정의 및 핵심 개념
└── references/
    ├── modules.md                        # 카테고리별 전체 모듈 + 예제
    ├── variables.md                      # 250+ 변수 레퍼런스
    └── modifiers-and-syntax.md           # 13종 수정자 + 제어 문법
```

---

## 주요 기능

| 분류 | 내용 | 예시 |
|------|------|------|
| **모듈** | 레이아웃, 상품, 주문, 회원, 게시판 전체 모듈 | `Layout_LogoTop`, `product_listnormal`, `Order_result` |
| **변수** | 250+ 변수 레퍼런스 | `{$product_name}`, `{$product_price}`, `{$order_id}` |
| **수정자** | 13종 데이터 변환 수정자 | `\|cut`, `\|numberformat`, `\|display`, `\|date` |
| **코드 패턴** | 실전 템플릿 모음 | 상품 목록, 로그인 분기, 레이아웃 구조 |

---

## 설치

### Claude Code

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git \
  ~/.claude/skills/cafe24-smart-design
```

> 트리거 키워드(`cafe24`, `카페24`, `스마트디자인`, `module=`, `{$...}`)가 감지되면 자동 활성화됩니다.

---

### Cursor

`.cursor/rules/` 디렉토리에 레퍼런스를 복사합니다.

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref

mkdir -p .cursor/rules
cp /tmp/cafe24-ref/references/*.md .cursor/rules/
cp /tmp/cafe24-ref/SKILL.md .cursor/rules/cafe24-smart-design.md
```

> 또는 `.cursorrules` 파일에 직접 내용을 붙여넣어도 됩니다.

---

### GitHub Copilot

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref

mkdir -p .github
cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md \
  > .github/copilot-instructions.md
```

---

### Windsurf

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref

cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md \
  > .windsurfrules
```

---

### GPT (ChatGPT / Codex)

`SKILL.md` + `references/*.md` 내용을 아래 중 하나에 추가합니다.

| 도구 | 적용 위치 |
|------|-----------|
| ChatGPT | Settings > Custom Instructions |
| GPT Builder | Knowledge 파일로 업로드 |
| Codex | 프로젝트의 `AGENTS.md` 또는 컨텍스트 파일 |

---

### Gemini

`SKILL.md` + `references/*.md` 내용을 아래 중 하나에 추가합니다.

| 도구 | 적용 위치 |
|------|-----------|
| Gems | 새 Gem 생성 > Instructions |
| AI Studio | System Instructions |
| Gemini CLI | 프로젝트의 `GEMINI.md` 또는 컨텍스트 파일 |

---

## 라이선스

MIT
