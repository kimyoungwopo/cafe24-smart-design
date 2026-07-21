# Cafe24 Smart Design Guard Extension

카페24 스마트디자인 팝업 에디터에 붙는 읽기 전용 Chrome Extension MVP입니다.

## 목표

```txt
현재 에디터 파일 감지
→ 코드 읽기
→ module/변수/action/include 분석
→ 변경 전 스냅샷 저장
→ 저장 전 위험 diff 검사
→ Blue Team 검수
→ AI 안전 프롬프트 복사
```

## 설치

1. Chrome에서 `chrome://extensions` 열기
2. 우측 상단 **Developer mode** 켜기
3. **Load unpacked** 클릭
4. 이 저장소의 `extension/` 폴더 선택
5. 카페24 스마트디자인 에디터 팝업을 열기

대상 URL 예:

```txt
https://{mall-id}.cafe24.com/disp/admin/editor/main?skin_no=1&skin_code=base&shop_no=1&editorFile=/index.html
```

## MVP 기능

- URL query에서 context 추출
  - `skin_no`
  - `skin_code`
  - `shop_no`
  - `editorFile`
- textarea / CodeMirror / Ace / contenteditable 순서로 에디터 코드 읽기
- 카페24 계약 요소 분석
  - `<!--@layout(...)-->`
  - `<!--@import(...)-->`
  - `<!--@css(...)-->`
  - `<!--@js(...)-->`
  - `module="..."`
  - `{$...}`
  - `{$action_...}`
  - `<!-- $count = ... -->`
- 스냅샷 저장
- 저장 전 diff 위험 검사
- Blue Team 검수
- AI 안전 프롬프트 복사

## 하지 않는 것

- 카페24 저장 버튼 자동 클릭 안 함
- 카페24 저장 API 직접 호출 안 함
- 운영 스킨 자동 업로드 안 함
- 쿠키/세션/비밀번호/API key 읽지 않음
- 외부 서버로 코드 전송 안 함
- AI API 직접 호출 안 함

## Blue Team 검수 기준

| 항목 | 기준 |
|---|---|
| 자동 저장 | extension이 저장 버튼/API를 누르지 않음 |
| 외부 전송 | 코드/쿠키/세션을 외부 서버로 보내지 않음 |
| UI 간섭 | 패널이 저장/미리보기/코드 편집을 가리지 않음 |
| 접근성 | 버튼 focus-visible, 키보드 조작, 접기/펼치기 가능 |
| 카페24 계약 | module/변수/action/import 삭제 경고 동작 |
| Preview 진실성 | 로컬 분석만으로 완료 선언 금지 |

## 로컬 fixture 테스트

카페24 계정 없이 패널 UI를 확인할 때:

```bash
cd extension
python3 -m http.server 8768 --bind 127.0.0.1
open 'http://127.0.0.1:8768/dev-fixtures/editor.html'
```

확인할 것:

1. 패널이 오른쪽 하단에 표시된다.
2. `[현재 코드 분석]` 클릭 시 Layout/Import/CSS/JS/Modules/Variables/Actions 카운트가 보인다.
3. `[변경 전 스냅샷 저장]`이 동작한다.
4. textarea에서 `module="Layout_statelogon"` 또는 `{$action_logout}`를 삭제한다.
5. `[저장 전 위험 검사]`가 삭제 경고를 보여준다.
6. `[Blue Team 검수]`가 pass/manual 항목을 보여준다.
7. `[AI 프롬프트 복사]`가 클립보드에 안전 프롬프트를 복사한다.

## 실제 카페24 사용 시 주의

- 이 확장은 **읽기/분석/경고/프롬프트 생성** 도구입니다.
- 최종 저장은 사용자가 카페24 기본 저장 버튼으로 직접 수행합니다.
- 로컬 분석만으로 완료 처리하지 말고, 테스트 스킨 또는 샘플쇼핑몰 preview에서 실제 `module`, `{$...}`, action 동작을 확인하세요.
