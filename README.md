# Cafe24 Smart Design Skill

Cafe24(카페24) 스마트디자인 모듈, 변수, 수정자 레퍼런스입니다.

카페24 쇼핑몰 스킨 작업 시 AI 코딩 에이전트가 정확한 모듈/변수 문법을 참조할 수 있도록 합니다. Claude Code, Cursor, GitHub Copilot, Windsurf, GPT, Gemini 등 다양한 AI 도구에서 사용 가능합니다.

## 설치

### Claude Code

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git ~/.claude/skills/cafe24-smart-design
```

`SKILL.md`의 트리거 키워드(`cafe24`, `카페24`, `스마트디자인` 등)가 감지되면 자동으로 레퍼런스가 활성화됩니다.

### Cursor

프로젝트 루트에 `.cursor/rules/` 디렉토리를 만들고 레퍼런스 파일을 복사합니다.

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
mkdir -p .cursor/rules
cp /tmp/cafe24-ref/references/*.md .cursor/rules/
cp /tmp/cafe24-ref/SKILL.md .cursor/rules/cafe24-smart-design.md
```

또는 `.cursorrules` 파일에 직접 내용을 붙여넣어 사용할 수 있습니다.

### GitHub Copilot

프로젝트 루트에 `.github/copilot-instructions.md` 파일을 만들고 레퍼런스 내용을 포함합니다.

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
mkdir -p .github
cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md > .github/copilot-instructions.md
```

### Windsurf

프로젝트 루트에 `.windsurfrules` 파일을 만들고 레퍼런스 내용을 포함합니다.

```bash
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git /tmp/cafe24-ref
cat /tmp/cafe24-ref/SKILL.md /tmp/cafe24-ref/references/*.md > .windsurfrules
```

### GPT (ChatGPT / Codex)

레퍼런스 파일 내용을 **Custom Instructions** 또는 **프로젝트 지식(Knowledge)** 에 추가합니다.

1. `SKILL.md` + `references/*.md` 내용을 복사
2. ChatGPT: Settings > Custom Instructions에 붙여넣기
3. GPT Builder: Knowledge 파일로 업로드
4. Codex: 프로젝트의 `AGENTS.md` 또는 컨텍스트 파일에 포함

### Gemini

레퍼런스 파일을 **Gemini Gems** 또는 프로젝트 컨텍스트로 활용합니다.

1. `SKILL.md` + `references/*.md` 내용을 복사
2. Gems: 새 Gem 생성 시 Instructions에 붙여넣기
3. Google AI Studio: System Instructions에 포함
4. Gemini CLI: 프로젝트의 `GEMINI.md` 또는 컨텍스트 파일에 포함

## 포함된 레퍼런스

| 파일 | 내용 |
|------|------|
| `SKILL.md` | 스킬 정의 및 핵심 개념 요약 |
| `references/modules.md` | 카테고리별 전체 모듈 목록 및 사용 예제 |
| `references/variables.md` | 250+ 변수 레퍼런스 (상품, 주문, 회원, 게시판 등) |
| `references/modifiers-and-syntax.md` | 13종 수정자, 제어 문법, 코드 패턴 |

## 주요 기능

- **모듈 참조**: `Layout_LogoTop`, `product_listnormal`, `Order_result` 등 전체 모듈
- **변수 참조**: `{$product_name}`, `{$product_price}` 등 250+ 변수
- **수정자 참조**: `|cut`, `|numberformat`, `|display` 등 13종 수정자
- **코드 패턴**: 상품 목록, 로그인 분기, 레이아웃 구조 등 실전 템플릿

## 라이선스

MIT
