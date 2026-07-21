function lines(label, values = []) {
  if (!values.length) return `${label}: 없음`;
  return `${label}:\n${values.map((value) => `- ${value}`).join('\n')}`;
}

export function buildPrompt({ context = {}, analysis = {}, request = '[여기에 변경 목표를 입력]' } = {}) {
  return `카페24 스마트디자인 스킨 파일을 수정한다.

현재 파일: ${context.editorFile || '(unknown)'}
스킨: skin_no=${context.skinNo || '-'}, skin_code=${context.skinCode || '-'}, shop_no=${context.shopNo || '-'}

${lines('감지된 include/import', [
  ...(analysis.layouts || []).map((item) => `layout: ${item}`),
  ...(analysis.imports || []).map((item) => `import: ${item}`),
  ...(analysis.css || []).map((item) => `css: ${item}`),
  ...(analysis.js || []).map((item) => `js: ${item}`)
])}

${lines('감지된 module', analysis.modules || [])}

${lines('감지된 action 변수', analysis.actions || [])}

유지:
- module 속성
- {$...} 변수
- action 변수
- 카페24 주석 옵션
- <!--@layout/css/js/import -->
- 기존 폼 변수 구조

금지:
- 임의 변수 생성
- 주문/회원/결제 action 재작성
- 폼 변수를 일반 input/select로 재작성
- 범위 밖 파일 수정
- 로컬 분석만으로 카페24 동작 완료 선언

요청:
${request}

검증:
- 변경 전후 삭제된 module/변수/action 보고
- PC preview 확인
- 모바일 counterpart 확인
- 카페24 테스트 스킨 또는 샘플쇼핑몰 preview에서 실제 module/변수/action 동작 확인
- Blue Team 검수: 자동 저장 없음, 외부 전송 없음, UI 간섭 없음, keyboard/focus 가능`;
}

if (typeof window !== 'undefined') {
  window.Cafe24PromptBuilder = { buildPrompt };
}
