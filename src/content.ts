import { browser } from 'webextension-polyfill-ts';

window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  // Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
  script.src = browser.runtime.getURL('page.js');
  document.head.append(script);
});
