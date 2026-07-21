export const BLUE_TEAM_CHECKS = [
  {
    id: 'no-auto-save',
    label: '자동 저장/자동 업로드 금지',
    pass: ({ capabilities = {} }) => !capabilities.autoSave && !capabilities.autoUpload,
    failMessage: 'MVP에서 자동 저장 또는 자동 업로드 기능이 감지되면 제거한다.'
  },
  {
    id: 'no-secret-read',
    label: '쿠키/비밀번호/API key 미수집',
    pass: ({ permissions = [] }) => !permissions.includes('cookies') && !permissions.includes('webRequest'),
    failMessage: '쿠키/webRequest permission 또는 외부 전송 코드를 제거한다.'
  },
  {
    id: 'no-external-network',
    label: '코드/세션 외부 전송 없음',
    pass: ({ capabilities = {} }) => !capabilities.externalNetwork,
    failMessage: '외부 네트워크 전송은 MVP에서 금지한다.'
  },
  {
    id: 'editor-not-blocked',
    label: '패널이 에디터 저장/미리보기 UI를 가리지 않음',
    manual: true,
    failMessage: '패널 위치/크기를 조정하거나 접기 기본값을 제공한다.'
  },
  {
    id: 'keyboard-access',
    label: '버튼 focus-visible, Escape 닫기, 접기/펼치기 가능',
    manual: true,
    failMessage: '키보드 접근성과 focus style을 보완한다.'
  },
  {
    id: 'cafe24-contracts',
    label: 'module/변수/action/import 삭제 경고가 실제로 동작',
    pass: ({ diffReport = {} }) => Array.isArray(diffReport.checks) && diffReport.checks.includes('removed-actions'),
    failMessage: '삭제 경고 테스트 fixture를 추가하고 diff 검사를 보강한다.'
  },
  {
    id: 'mobile-counterpart',
    label: 'PC 파일 수정 시 모바일 counterpart 알림',
    pass: ({ fileHints = [] }) => fileHints.some((hint) => hint?.counterpart),
    failMessage: 'product/list, product/detail 등 counterpart hint를 추가한다.'
  },
  {
    id: 'preview-truth',
    label: '실제 카페24 preview 전 완료 선언 금지',
    manual: true,
    failMessage: 'README와 패널에 테스트 스킨/샘플쇼핑몰 preview caveat을 유지한다.'
  }
];

export function runBlueTeamChecks(input = {}) {
  const items = BLUE_TEAM_CHECKS.map((check) => {
    if (check.manual) {
      return { id: check.id, label: check.label, status: 'manual', message: check.failMessage };
    }
    const passed = Boolean(check.pass(input));
    return {
      id: check.id,
      label: check.label,
      status: passed ? 'pass' : 'fail',
      message: passed ? '통과' : check.failMessage
    };
  });

  const summary = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, { pass: 0, fail: 0, manual: 0 });

  return { items, summary };
}

if (typeof window !== 'undefined') {
  window.Cafe24BlueTeam = { runBlueTeamChecks, BLUE_TEAM_CHECKS };
}
