import { render, html } from '@mantou/gem';

import { i18n } from '../i18n';

render(
  html`
    <style>
      * {
        box-sizing: border-box;
      }
      html {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-bottom: 5em;
        font-size: 62.5%;
      }
      body {
        font-size: 1.6rem;
      }
      h1, h2 {
        text-align: center;
      }
      img {
        display: block;
        width: 80%;
        margin: auto auto .5em;
      }
      section {
        width: 60em;
        padding: 1em;
        margin: auto;
        max-width: 100%;
      }
      details {
        padding: .5em;
      }
      summary {
        cursor: pointer;
        margin: -.5em -.5em 0;
        padding: .5em;
      }
    </style>
    <h1>${i18n.extensionName()}</h1>
    <h2>${i18n.extensionDescription()}</h2>
    <section>
      <img src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/lyrics-button.jpg"></img>
    </section>
    <section>
      <h3>FQA</h3>
      <details>
        <summary>Can't find lyrics</summary>
        <ul>
          <li>Open extension popup, try other lyrics</li>
          <li>Middle-click the lyrics button, open LRC editor, then edit and upload</li>
        </ul>
        <img src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/chrome-popup.jpg"></img>
        <img src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/lrc-editor-in-spotify.jpg"></img>
      </details>
      <details>
        <summary>Custom lyrics</summary>
        <p>Right click on the lyrics button to open options</p>
        <img src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/options-in-spotify.jpg"></img>
      </details>
      <details>
        <summary>Support other music web player?</summary>
        <p>
          In addition to Spotify, YouTube music is now supported.
          If you want to display lyrics in other web music players, please comment <a href="https://github.com/mantou132/Spotify-Lyrics/issues/35">here</a>.</p>
      </details>
    </section>
  `,
  document.body,
);
