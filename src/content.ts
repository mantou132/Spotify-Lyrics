import { browser } from 'webextension-polyfill-ts';

const script = document.createElement('script');
// Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
script.src = browser.runtime.getURL('page.js');
// "run_at": "document_start"
// Firefox have `<head>`, Chrome have't.
document.documentElement.append(script);
