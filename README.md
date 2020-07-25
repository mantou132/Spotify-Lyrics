[![Build Status](https://travis-ci.org/mantou132/Spotify-Lyrics.svg?branch=master)](https://travis-ci.org/mantou132/Spotify-Lyrics)

# Spotify Lyrics

Install Extension: [Chrome](https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/spotify-lyrics/) | [Safari](https://github.com/mantou132/Spotify-Lyrics/releases)

The extension adds a button to the bottom left corner of Spotify Web Player,
Click to switch the display status of the lyrics,
which is displayed in the Picture-in-Picture window by default setting.
Spotify can be [installed as pwa](https://support.google.com/chrome/answer/9658361) instead of desktop client.

If you have any questions, please submit an [issue](https://github.com/mantou132/Spotify-Lyrics/issues).

![screenshot](./screenshot/screenshot3.jpg)

The extension also supports Youtube Music, but does not support videos well.

![screenshot](./screenshot/youtube.jpg)

## How To Work

1. [Listen](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) for track info element.
2. Search for songs and download lyrics using [`NeteaseCloudMusicApi`](https://github.com/Binaryify/NeteaseCloudMusicApi).
3. Rendering lyrics to `<canvas>` using [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject).
4. [Capture](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream) video stream from `<canvas>` and merge cover image.
5. Update lyrics scroll position with a [loop](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

## Compatibility

* Firefox does not currently support [PiP WebAPI](https://bugzilla.mozilla.org/show_bug.cgi?id=1463402)
* Chrome [70+](https://caniuse.com/#feat=picture-in-picture)
* Safari [14+](https://developer.apple.com/documentation/safariservices/safari_web_extensions)

## Development

Requirement: [Node.js](https://nodejs.org)

```bash
# install dependencies
npm install
# start develop
npm run start
```

Build:
```bash
npm run build:zip
```

## Contribution

Fork it, submit PR.

* If you can write code, you can fix [bugs](https://github.com/mantou132/Spotify-Lyrics/issues?q=is%3Aissue+is%3Aopen+label%3Abug) or improve [performance](https://github.com/mantou132/Spotify-Lyrics/issues?q=is%3Aissue+is%3Aopen+label%3Aperformance)
* Optimize the matching rate of Chinese, Japanese and Korean lyrics.(edit [config.json](./src/page/config.json)). *Note: The extension already has automatic optimization, this list serves as a supplement* . *[Unmatched lyrics report](https://datastudio.google.com/reporting/bfd79c68-f9f4-4af5-8e51-a12d3d6be450)*