(async () => {
  try {
    const base = typeof chrome !== 'undefined' && chrome.runtime?.getURL
      ? chrome.runtime.getURL('')
      : '';
    const [{ startCafe24Guard }] = await Promise.all([
      import(base + 'src/content.js')
    ]);
    startCafe24Guard();
  } catch (error) {
    console.error('[Cafe24 Guard] failed to start', error);
  }
})();
