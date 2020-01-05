import pagejs from './page.inject.js';

// Is there a more elegant way?
window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.innerHTML = `(() => {${pagejs}})()`;
  document.head.append(script);
});
