import { html } from '@mantou/gem/lib/element';

export const fontStyle = html`
  <style>
    body {
      font-family:
        spotify-circular,
        Helvetica Neue,
        Helvetica,
        Arial,
        Hiragino Kaku Gothic Pro,
        Meiryo,
        MS Gothic,
        sans-serif;
    }
    @font-face {
      font-family: spotify-circular;
      src:
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.afd9ab26.woff2) format('woff2'),
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.2a78c017.woff) format('woff'),
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.89e4be2e.ttf) format('truetype');
      font-weight: 200;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: spotify-circular;
      src:
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.3466e0ec.woff2) format('woff2'),
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.ea8d19db.woff) format('woff'),
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.a357677a.ttf) format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: spotify-circular;
      src:
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.8d0a45cc.woff2) format('woff2'),
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.10e93738.woff) format('woff'),
        url(https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.7eb7d0f7.ttf) format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  </style>
`;
