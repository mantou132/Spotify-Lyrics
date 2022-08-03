import { render, html } from '@mantou/gem';

import { fontStyle } from '../common/font';
import { theme } from '../common/theme';

render(
  html`
    ${fontStyle}
    <style>
      * {
        box-sizing: border-box;
      }
      html {
        padding-bottom: 5em;
        font-size: 62.5%;
      }
      body {
        font-size: 1.6rem;
      }
      h1,
      h2 {
        text-align: center;
      }
      h2 {
        font-weight: 200;
      }
      img {
        display: block;
        max-width: 80%;
        margin: auto auto 0.5em;
      }
      section {
        width: 60em;
        padding: 1em;
        margin: auto;
        max-width: 100%;
      }
      details {
        padding: 1em;
        border: 1px solid rgba(${theme.blackRGB}, 0.1);
      }
      details + details {
        border-top: none;
        margin-top: -1px;
      }
      details[open] summary::after {
        transform: rotate(270deg);
      }
      details > summary::-webkit-details-marker {
        display: none;
      }
      summary {
        cursor: pointer;
        margin: -1em;
        padding: 1em;
        display: flex;
        align-items: center;
      }
      summary::after {
        content: '›';
        font-size: 2em;
        line-height: 0.5;
        margin-right: 0.5em;
        transform: rotate(90deg);
      }
      summary h3 {
        flex-grow: 1;
        margin: 0;
        line-height: 1.3;
      }
      summary:focus {
        outline: none;
      }
    </style>
    <section>
      <h1>Welcome</h1>
      <h2>Click lyrics button or press the ${'`L`'} key to open the lyrics</h2>
    </section>
    <section>
      <img
        src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/lyrics-button.jpg"
      />
    </section>
    <section>
      <h2>FAQ</h2>
      <details>
        <summary><h3>No lyrics button</h3></summary>
        <ul>
          <li>Try to refresh the WebApp</li>
          <li>Ensure you are logged in</li>
          <li>
            Ensure that the extension can read and change site data,
            <a href="https://support.google.com/chrome_webstore/answer/2664769" target="_blank"
              >detail</a
            >
          </li>
          <li>
            Update this extension to the latest version. If the version cannot be updated due to the
            slow review of Edge Addons, you can install it from the
            <a
              href="https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod"
              target="_blank"
              >Chrome Webstore</a
            >
          </li>
          <li>
            Ask for help in
            <a href="https://discord.com/invite/fQbzzdJ" target="_blank">Discord</a> or
            <a href="https://github.com/mantou132/Spotify-Lyrics/issues" target="_blank">Github</a>
          </li>
        </ul>
      </details>
      <details>
        <summary><h3>Error: Failed to fetch</h3></summary>
        <p>
          The extension uses the agent
          <a href="https://firebase.google.com/products/functions" target="_blank"
            >Google Cloud Functions</a
          >, please make sure your network can access
          <a
            href="https://files.xianqiao.wang/https://us-central1-spotify-lyrics-ef482.cloudfunctions.net"
            target="_blank"
            >this url</a
          >.
        </p>
      </details>
      <details>
        <summary><h3>Can't find lyrics</h3></summary>
        <ul>
          <li>
            Open the popup from the extension menu, try other lyrics, If you have found the correct
            lyrics, save your choice
          </li>
          <li>Middle-click the lyrics button, open LRC editor, then edit and upload</li>
        </ul>
        <img
          src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/chrome-popup.jpg"
        />
        <img
          src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/lrc-editor-in-spotify.jpg"
        />
      </details>
      <details>
        <summary><h3>Modify lyrics style</h3></summary>
        <p>Right click on the lyrics button to open options.</p>
        <img
          src="https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/screenshot/options-in-spotify.jpg"
        />
      </details>
      <details>
        <summary><h3>Desktop client support?</h3></summary>
        <p>
          You can
          <a href="https://support.google.com/chrome/answer/9658361" target="_blank">install</a>
          WebApp(PWA) instead of desktop client.
        </p>
        <p>
          Note: Deezer does not currently support installation, but creating shortcut(use "Open as
          window") can also run in a similar way to desktop applications,
          <a href="https://support.google.com/chrome_webstore/answer/3060053" target="_blank"
            >detail</a
          >.
        </p>
      </details>
      <details>
        <summary><h3>Support other music web player?</h3></summary>
        <p>
          In addition to Spotify, YouTube Music, Apple Music, Deezer, Tidal is now supported.
          <a href="https://github.com/mantou132/Spotify-Lyrics/issues/35">detail</a>.
        </p>
      </details>
    </section>
  `,
  document.body,
);
