# Cafe24 Smart Design Skill

Cafe24(카페24) 스마트디자인 모듈, 변수, 수정자 레퍼런스를 제공하는 [Claude Code](https://claude.ai/claude-code) 스킬입니다.

카페24 쇼핑몰 스킨 HTML 파일 작업 시 자동으로 트리거되어 정확한 모듈/변수 문법을 참조할 수 있습니다.

## 설치

```bash
# Claude Code 스킬 디렉토리에 클론
git clone https://github.com/kimyoungwopo/cafe24-smart-design.git ~/.claude/skills/cafe24-smart-design
```

## 트리거 키워드

다음 키워드가 포함된 작업 시 자동으로 활성화됩니다:

- `cafe24`, `카페24`
- `smart design`, `스마트디자인`
- `module=`, `{$...}`
- `카페24 스킨`, `카페24 모듈`, `카페24 변수`

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
