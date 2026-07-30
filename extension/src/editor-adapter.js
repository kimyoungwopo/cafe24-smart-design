function getVisibleTextFromCodeLikeNode() {
  const codeLike = document.querySelector('pre, code, .ace_content, .CodeMirror-code');
  return codeLike?.innerText || '';
}

export function getEditorCode(root = document) {
  const textarea = root.querySelector('textarea');
  if (textarea && typeof textarea.value === 'string' && textarea.value.trim()) {
    return { code: textarea.value, source: 'textarea' };
  }

  const codeMirrorElement = root.querySelector('.CodeMirror');
  const codeMirror = codeMirrorElement?.CodeMirror;
  if (codeMirror && typeof codeMirror.getValue === 'function') {
    return { code: codeMirror.getValue(), source: 'codemirror' };
  }

  const aceElement = root.querySelector('.ace_editor');
  if (aceElement && typeof window !== 'undefined' && window.ace?.edit) {
    try {
      const editor = window.ace.edit(aceElement);
      if (editor && typeof editor.getValue === 'function') {
        return { code: editor.getValue(), source: 'ace' };
      }
    } catch (_) {
      // Keep falling through to safer adapters.
    }
  }

  const editable = root.querySelector('[contenteditable="true"]');
  if (editable && editable.innerText.trim()) {
    return { code: editable.innerText, source: 'contenteditable' };
  }

  const fallback = getVisibleTextFromCodeLikeNode();
  if (fallback.trim()) return { code: fallback, source: 'visible-code' };

  return { code: '', source: 'not-found' };
}

export const Cafe24EditorAdapter = { getCode: () => getEditorCode().code, getEditorCode };

if (typeof window !== 'undefined') {
  window.Cafe24EditorAdapter = Cafe24EditorAdapter;
}
