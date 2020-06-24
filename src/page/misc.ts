import { appendStyle, css } from './utils';

// sync write
appendStyle(css`
  /* download link */
  .NavBar__download-item,
  /* icon */
  [role='banner'],
  /* ad */
  [role='main'] ~ div {
    display: none;
  }
`);

// Add PWA support
navigator.serviceWorker.getRegistration().then(reg => {
  if (!reg) {
    navigator.serviceWorker.register('https://open.spotify.com/service-worker.js').then(() => {
      console.log('sw register success!');
    });
  }
});
