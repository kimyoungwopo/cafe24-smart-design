import { Cafe24GuardPanel } from './panel.js';

export function parseEditorContext(currentLocation = location) {
  const params = new URLSearchParams(currentLocation.search || '');
  return {
    host: currentLocation.host || '',
    skinNo: params.get('skin_no'),
    skinCode: params.get('skin_code'),
    shopNo: params.get('shop_no'),
    editorFile: params.get('editorFile')
  };
}

export function startCafe24Guard() {
  const context = parseEditorContext(location);
  window.__cafe24GuardContext = context;
  Cafe24GuardPanel.mount(context);
}

if (typeof window !== 'undefined') {
  window.Cafe24GuardContent = { parseEditorContext, startCafe24Guard };
}
