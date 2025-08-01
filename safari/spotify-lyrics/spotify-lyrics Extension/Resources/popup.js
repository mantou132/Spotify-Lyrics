import { c as createStore, u as updateStore, p as property, a as connectStore, b as customElement, G as GemElement, h as html, r as render } from "./gem.js";
import { t as theme, f as fontStyle } from "./font.js";
import { b as browser, E as Event, s as sendMessage, g as getOptions, a as sendEvent, e as events, i as i18n, c as captureException } from "./i18n.js";
const store = createStore({
  name: "",
  artists: "",
  list: [],
  id: 0,
  aId: 0
});
function changeSong(id) {
  updateStore(store, { id });
  const msg = {
    type: Event.SELECT_SONG,
    data: store
  };
  sendMessage(msg);
}
function cancelMId() {
  updateStore(store, { id: store.aId });
  const msg = {
    type: Event.SELECT_SONG,
    data: store
  };
  sendMessage(msg);
}
function confirmedMId() {
  sendMessage({ type: Event.CONFIRMED_SONG });
  setTimeout(window.close, 300);
}
browser.runtime.onMessage.addListener((msg) => {
  if (msg?.type === Event.SEND_SONGS) {
    updateStore(store, msg.data);
  }
});
sendMessage({ type: Event.GET_SONGS });
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let SongItem = class extends GemElement {
  render() {
    if (!this.song)
      return null;
    const { id, name, artists, album, duration } = this.song;
    const durationText = duration ? `${Math.floor(duration / 1e3 / 60)}:${(Math.floor(duration / 1e3) % 60).toString().padStart(2, "0")}` : "";
    const checked = id === store.id;
    const artist = artists.map(({ name: name2 }) => name2).join(",");
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          padding: 0.75rem 0.875em;
          cursor: default;
          background: rgba(${theme.textRGB}, 0);
          color: rgba(${theme.textRGB}, 1);
        }
        .track-info {
          line-height: 1.375;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .track-info div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .artist-name {
          font-size: 0.875rem;
          color: rgba(${theme.textRGB}, 0.5);
        }
        .status {
          padding-left: 1rem;
        }
      </style>
      <div class="track-info">
        <div title=${name} class="track-name">${name}</div>
        <div class="artist-name">
          <span title="id: ${id}">${durationText}</span>
          • <span title=${artist}>${artist}</span> •
          <span title=${album.name}>${album.name}</span>
        </div>
      </div>
      ${checked ? html`<div class="status">✓</div>` : null}
    `;
  }
  mounted() {
    this.effect(
      () => {
        if (this.song?.id === store.id) {
          this.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      },
      () => [store.id]
    );
  }
};
__decorateClass$2([
  property
], SongItem.prototype, "song", 2);
SongItem = __decorateClass$2([
  connectStore(store),
  customElement("app-track-item")
], SongItem);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let SongList$1 = class SongList extends GemElement {
  constructor() {
    super(...arguments);
    this.select = async (id) => {
      const { cid } = await getOptions();
      sendEvent(cid, events.selectTrack);
      changeSong(id);
    };
  }
  render() {
    if (store.list.length === 0) {
      return null;
    }
    return html`
      <style>
        app-track-item:hover {
          background: rgba(${theme.textRGB}, 0.1);
        }
      </style>
      ${store.list.map(
      (song) => html`
          <app-track-item @click=${() => this.select(song.id)} .song=${song}></app-track-item>
        `
    )}
    `;
  }
};
SongList$1 = __decorateClass$1([
  connectStore(store),
  customElement("app-track-list")
], SongList$1);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  member.set(obj, value);
  return value;
};
var _rendered;
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "i") {
    const id = Number(prompt("Enter NetEase Cloud Music ID:"));
    if (id)
      changeSong(id);
  }
});
let SongList2 = class extends GemElement {
  constructor() {
    super(...arguments);
    this.autoSelect = async () => {
      const { cid } = await getOptions();
      sendEvent(cid, events.autoSelectTrack);
      changeSong(0);
    };
    __privateAdd(this, _rendered, false);
    this.mounted = () => {
      setTimeout(() => {
        __privateSet(this, _rendered, true);
        this.update();
      }, 200);
    };
  }
  render() {
    if (store.list.length === 0 && !store.id) {
      return html`
        <style>
          :host {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
          }
        </style>
        ${__privateGet(this, _rendered) ? html`<slot></slot>` : ""}
      `;
    }
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          font-weight: 400;
        }
        .header {
          display: flex;
          flex-shrink: 0;
          padding: 1rem 0;
          margin: 0 0.875rem;
          border-bottom: 1px solid rgba(${theme.textRGB}, 0.2);
          color: rgba(${theme.textRGB}, 0.5);
        }
        .header p {
          margin: 0;
          flex-grow: 1;
        }
        .highlight {
          color: rgba(${theme.primaryRGB}, 1);
        }
        .header .button {
          border-bottom: 1px dotted;
        }
        .header .button:hover {
          cursor: default;
          color: rgba(${theme.textRGB}, 1);
        }
        .header button {
          background: transparent;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0;
          margin-left: 0.5rem;
          line-height: 1rem;
          letter-spacing: 0.1em;
          border: none;
          color: inherit;
        }
        .header button:hover {
          color: rgba(${theme.textRGB}, 1);
        }
        .header button:focus {
          outline: none;
        }
        .main {
          overflow: auto;
          flex-grow: 1;
          scrollbar-width: none;
        }
        .main::-webkit-scrollbar {
          display: none;
        }
      </style>
      <div class="header">
        ${store.id && store.id !== store.aId ? html`
              <p class="highlight">${i18n.popupConfirmTip()}</p>
              <button @click=${cancelMId}>${i18n.popupConfirmCancel()}</button>
              <button @click=${confirmedMId}>${i18n.popupConfirmSave()}</button>
            ` : html`
              <p>
                ${i18n.popupMatchDescription1()}
                <span @click=${this.autoSelect} class="button">
                  ${i18n.popupMatchDescription2()}
                </span>
                ${i18n.popupMatchDescription3()}
              </p>
            `}
      </div>
      <div class="main">
        <app-track-list class="list"></app-track-list>
      </div>
    `;
  }
};
_rendered = /* @__PURE__ */ new WeakMap();
SongList2 = __decorateClass([
  connectStore(store),
  customElement("app-root")
], SongList2);
function main(fontSize) {
  render(
    html`
      ${fontStyle}
      <style>
        :root {
          font-size: ${fontSize}px;
        }
        body {
          box-sizing: border-box;
          border: 1px solid rgba(${theme.textRGB}, 0.2);
          width: 20rem;
          height: 30rem;
          margin: 0;
          overflow: hidden;
          background: rgb(${theme.backgroundRGB});
          color: rgb(${theme.textRGB});
          font-size: 1rem;
        }
        app-root {
          height: 100%;
        }
      </style>
      <app-root>${i18n.popupMissMatch()}</app-root>
    `,
    document.body
  );
}
const getFontSize = () => {
  return Number(localStorage.getItem("fontSize")) || 16;
};
const setFontSize = (fontSize) => {
  localStorage.setItem("fontSize", String(fontSize));
  main(fontSize);
};
main(getFontSize());
window.addEventListener("keydown", (evt) => {
  const { key, ctrlKey, metaKey } = evt;
  if (!ctrlKey && !metaKey)
    return;
  const scale = (n) => {
    evt.preventDefault();
    setFontSize(getFontSize() * n);
  };
  if (key === "=" || key === "+") {
    scale(1.2);
  }
  if (key === "-") {
    scale(1 / 1.2);
  }
});
setTimeout(() => {
  if (matchMedia("(min-width: 20.001rem)").matches) {
    document.body.style.width = "100%";
  }
}, 200);
getOptions().then(({ cid }) => {
  sendEvent(cid, events.openPopupPage);
});
window.addEventListener("error", (e) => {
  captureException(e);
});
//# sourceMappingURL=popup.js.map
