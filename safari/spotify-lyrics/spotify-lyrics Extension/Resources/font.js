import { i as randomStr, c as createStore, j as connect, l as camelToKebabCase, h as html } from "./gem.js";
const themeStoreMap = /* @__PURE__ */ new WeakMap();
const themePropsMap = /* @__PURE__ */ new WeakMap();
const setThemeFnMap = /* @__PURE__ */ new WeakMap();
function createTheme(themeObj) {
  const salt = randomStr();
  const style = document.createElement("style");
  const store = createStore(themeObj);
  const theme2 = {};
  const props = {};
  themePropsMap.set(theme2, props);
  themeStoreMap.set(theme2, store);
  const setTheme = () => Object.keys(store).forEach((key) => {
    if (props[key])
      return;
    props[key] = `--${camelToKebabCase(key)}-${salt}`;
    theme2[key] = `var(${props[key]})`;
  });
  setThemeFnMap.set(theme2, setTheme);
  setTheme();
  const getStyle = () => `:root, :host {${Object.keys(store).reduce((prev, key) => prev + `${props[key]}:${store[key]};`, "")}}`;
  const replace = () => style.textContent = getStyle();
  connect(store, replace);
  replace();
  (document.head || document.documentElement).append(style);
  return theme2;
}
const theme = createTheme({
  primaryRGB: "30, 215, 96",
  backgroundRGB: "18, 18, 18",
  textRGB: "255, 255, 255",
  blackRGB: "0, 0, 0"
});
const fontStyle = html`
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
export {
  fontStyle as f,
  theme as t
};
//# sourceMappingURL=font.js.map
