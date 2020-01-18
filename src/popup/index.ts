import { render, html } from '@mantou/gem';

import './elements/list';

render(
  html`
    <style>
      body {
        width: 20rem;
        height: 30rem;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-family: sans-serif;
      }
    </style>
    <song-list>No lyrics currently available</song-list>
  `,
  document.body,
);
