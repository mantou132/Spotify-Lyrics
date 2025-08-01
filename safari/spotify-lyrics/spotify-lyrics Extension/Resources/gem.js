const GemExports = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get GemElement() {
    return GemElement;
  },
  get SVGTemplateResult() {
    return SVGTemplateResult;
  },
  get TemplateResult() {
    return TemplateResult;
  },
  get defineAttribute() {
    return defineAttribute;
  },
  get defineCSSState() {
    return defineCSSState;
  },
  get defineProperty() {
    return defineProperty;
  },
  get defineRef() {
    return defineRef;
  },
  get directive() {
    return directive;
  },
  get guard() {
    return guard;
  },
  get html() {
    return html;
  },
  get ifDefined() {
    return ifDefined;
  },
  get nativeDefineElement() {
    return nativeDefineElement;
  },
  get render() {
    return render;
  },
  get repeat() {
    return repeat;
  },
  get svg() {
    return svg;
  }
}, Symbol.toStringTag, { value: "Module" }));
var __classPrivateFieldGet$1 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$1 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _LinkedList_instances, _LinkedList_map, _LinkedList_firstItem, _LinkedList_lastItem, _LinkedList_delete, _QueryString_stringify, _QueryString_parse;
const microtaskSet = /* @__PURE__ */ new Set();
function addMicrotask(func) {
  if (typeof func !== "function")
    return;
  if (!microtaskSet.size) {
    globalThis.queueMicrotask(() => {
      microtaskSet.forEach((func2) => func2());
      microtaskSet.clear();
    });
  }
  microtaskSet.delete(func);
  microtaskSet.add(func);
}
function absoluteLocation(currentPath = "", relativePath = "") {
  const { pathname, search, hash } = new URL(relativePath, location.origin + currentPath);
  return pathname + search + decodeURIComponent(hash);
}
function addListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
class LinkedList extends EventTarget {
  constructor() {
    super(...arguments);
    _LinkedList_instances.add(this);
    _LinkedList_map.set(this, /* @__PURE__ */ new Map());
    _LinkedList_firstItem.set(this, void 0);
    _LinkedList_lastItem.set(this, void 0);
  }
  get size() {
    return __classPrivateFieldGet$1(this, _LinkedList_map, "f").size;
  }
  get first() {
    return __classPrivateFieldGet$1(this, _LinkedList_firstItem, "f");
  }
  get last() {
    return __classPrivateFieldGet$1(this, _LinkedList_lastItem, "f");
  }
  isSuperLinkOf(subLink) {
    let subItem = subLink.first;
    if (!subItem)
      return true;
    let item = this.find(subItem.value);
    while (item && item.value === subItem.value) {
      subItem = subItem.next;
      if (!subItem)
        return true;
      item = item.next;
    }
    return false;
  }
  find(value) {
    return __classPrivateFieldGet$1(this, _LinkedList_map, "f").get(value);
  }
  // 添加到尾部，已存在时会删除老的项目
  // 如果是添加第一个，start 事件会在添加前触发，避免处理事件重复的逻辑
  add(value) {
    if (!__classPrivateFieldGet$1(this, _LinkedList_lastItem, "f")) {
      this.dispatchEvent(new CustomEvent("start"));
    }
    const item = __classPrivateFieldGet$1(this, _LinkedList_instances, "m", _LinkedList_delete).call(this, value) || { value };
    item.prev = __classPrivateFieldGet$1(this, _LinkedList_lastItem, "f");
    if (item.prev) {
      item.prev.next = item;
    }
    item.next = void 0;
    __classPrivateFieldSet$1(this, _LinkedList_lastItem, item, "f");
    if (!__classPrivateFieldGet$1(this, _LinkedList_firstItem, "f")) {
      __classPrivateFieldSet$1(this, _LinkedList_firstItem, item, "f");
    }
    __classPrivateFieldGet$1(this, _LinkedList_map, "f").set(value, item);
  }
  // 删除这个元素后没有其他元素时立即出发 end 事件
  delete(value) {
    const deleteItem = __classPrivateFieldGet$1(this, _LinkedList_instances, "m", _LinkedList_delete).call(this, value);
    if (!__classPrivateFieldGet$1(this, _LinkedList_firstItem, "f")) {
      this.dispatchEvent(new CustomEvent("end"));
    }
    return deleteItem;
  }
  // 获取头部元素
  // 会从链表删除
  get() {
    const firstItem = __classPrivateFieldGet$1(this, _LinkedList_firstItem, "f");
    if (!firstItem)
      return;
    this.delete(firstItem.value);
    return firstItem.value;
  }
}
_LinkedList_map = /* @__PURE__ */ new WeakMap(), _LinkedList_firstItem = /* @__PURE__ */ new WeakMap(), _LinkedList_lastItem = /* @__PURE__ */ new WeakMap(), _LinkedList_instances = /* @__PURE__ */ new WeakSet(), _LinkedList_delete = function _LinkedList_delete2(value) {
  const existItem = __classPrivateFieldGet$1(this, _LinkedList_map, "f").get(value);
  if (existItem) {
    if (existItem.prev) {
      existItem.prev.next = existItem.next;
    } else {
      __classPrivateFieldSet$1(this, _LinkedList_firstItem, existItem.next, "f");
    }
    if (existItem.next) {
      existItem.next.prev = existItem.prev;
    } else {
      __classPrivateFieldSet$1(this, _LinkedList_lastItem, existItem.prev, "f");
    }
    __classPrivateFieldGet$1(this, _LinkedList_map, "f").delete(value);
  }
  return existItem;
};
class PropProxyMap extends WeakMap {
  get(ele) {
    let proxy = super.get(ele);
    if (!proxy) {
      proxy = {};
      this.set(ele, proxy);
    }
    return proxy;
  }
}
class QueryString extends URLSearchParams {
  constructor(param) {
    super(param);
    _QueryString_stringify.set(this, (value) => typeof value === "string" ? value : JSON.stringify(value));
    _QueryString_parse.set(this, (value) => {
      if (!value)
        return null;
      try {
        return JSON.parse(value);
      } catch (_a2) {
        return null;
      }
    });
  }
  // support `{ key: ObjectValue }`
  concat(param) {
    let query;
    if (typeof param === "string") {
      query = Object.fromEntries(new URLSearchParams(param).entries());
    } else {
      query = param;
    }
    Object.entries(query).forEach(([key2, value]) => {
      this.append(key2, __classPrivateFieldGet$1(this, _QueryString_stringify, "f").call(this, value));
    });
  }
  setAny(key2, value) {
    if (Array.isArray(value)) {
      this.delete(key2);
      value.forEach((e) => this.append(key2, __classPrivateFieldGet$1(this, _QueryString_stringify, "f").call(this, e)));
    } else {
      const v = __classPrivateFieldGet$1(this, _QueryString_stringify, "f").call(this, value);
      v ? this.set(key2, v) : this.delete(key2);
    }
  }
  getAny(key2) {
    return this.getAnyAll(key2)[0];
  }
  getAnyAll(key2) {
    return this.getAll(key2).filter((e) => e !== "").map((e) => __classPrivateFieldGet$1(this, _QueryString_parse, "f").call(this, e));
  }
  toString() {
    const string = super.toString();
    return string ? `?${string}` : "";
  }
  toJSON() {
    return this.toString();
  }
}
_QueryString_stringify = /* @__PURE__ */ new WeakMap(), _QueryString_parse = /* @__PURE__ */ new WeakMap();
const SheetToken = Symbol.for("gem@sheetToken");
function randomStr(len = 5) {
  const str = Math.random().toString(36).slice(2).slice(0, len);
  if (str.length < len)
    return str + randomStr(len - str.length);
  return str;
}
function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, ($1) => "-" + $1.toLowerCase());
}
function kebabToCamelCase(str) {
  return str.replace(/-(.)/g, (_substr, $1) => $1.toUpperCase());
}
function cleanObject(o) {
  Object.keys(o).forEach((key2) => {
    const k = key2;
    delete o[k];
  });
  return o;
}
class GemError extends Error {
  constructor(msg) {
    super(msg);
    this.message = `gem: ${this.message}`;
  }
}
function isArrayChange(newValues, oldValues) {
  const length = newValues.length;
  if (oldValues.length !== length)
    return true;
  for (let i = 0; i < length; i++) {
    if (newValues[i] !== oldValues[i])
      return true;
  }
  return false;
}
function removeItems(target, items) {
  const set = new Set(items);
  return target.filter((e) => {
    if (set.has(e)) {
      set.delete(e);
      return false;
    }
    return true;
  });
}
const StoreListenerMap = /* @__PURE__ */ new WeakMap();
function createStore(originStore) {
  if (StoreListenerMap.has(originStore)) {
    throw new GemError("argument error");
  }
  StoreListenerMap.set(originStore, /* @__PURE__ */ new Set());
  return originStore;
}
function updateStore(store2, value) {
  var _a2;
  Object.assign(store2, value);
  (_a2 = StoreListenerMap.get(store2)) === null || _a2 === void 0 ? void 0 : _a2.forEach((func) => {
    addMicrotask(func);
  });
}
function useStore(originStore) {
  const store2 = createStore(originStore);
  return [store2, (value) => updateStore(store2, value)];
}
function connect(store2, func) {
  const listeners = StoreListenerMap.get(store2);
  listeners === null || listeners === void 0 ? void 0 : listeners.add(func);
  return () => {
    listeners === null || listeners === void 0 ? void 0 : listeners.delete(func);
  };
}
const nativeHistory = window.history;
const nativePushState = nativeHistory.pushState.bind(nativeHistory);
const nativeReplaceState = nativeHistory.replaceState.bind(nativeHistory);
let key = 0;
const getKey = () => `${performance.now()}-${++key}`;
const [store, updateHistoryStore] = useStore({
  $hasCloseHandle: false,
  $hasOpenHandle: false,
  $hasShouldCloseHandle: false,
  $key: ""
});
const paramsMap = /* @__PURE__ */ new Map();
function validData(data) {
  const { $key, $hasCloseHandle, $hasOpenHandle, $hasShouldCloseHandle } = data || {};
  if (store.$key === $key)
    return;
  if ($key)
    throw new GemError("`$key` is not allowed");
  if ($hasCloseHandle)
    throw new GemError("`$hasCloseHandle` is not allowed");
  if ($hasOpenHandle)
    throw new GemError("`$hasOpenHandle` is not allowed");
  if ($hasShouldCloseHandle)
    throw new GemError("`$hasShouldCloseHandle` is not allowed");
}
function getUrlBarPath(internalPath) {
  return gemHistory.basePath ? gemHistory.basePath + internalPath : internalPath;
}
function getInternalPath(urlBarPath) {
  if (urlBarPath === gemHistory.basePath)
    return "/";
  return urlBarPath.replace(new RegExp(`^${gemHistory.basePath}/`), "/");
}
function dispatchBeforeChangeEvent() {
  gemHistory.dispatchEvent(new CustomEvent("beforechange"));
}
function normalizeParams(params) {
  var _a2, _b;
  const current = paramsMap.get(store.$key) || { path: getInternalPath(location.pathname), query: new QueryString() };
  const path = params.path ? absoluteLocation(current.path, params.path) : getInternalPath(location.pathname);
  const newQueryObject = new QueryString((_a2 = params.query) !== null && _a2 !== void 0 ? _a2 : params.path ? "" : location.search);
  const queryChanged = String(newQueryObject) !== String(current.query);
  const query = queryChanged ? newQueryObject : current.query;
  const urlChanged = path !== current.path || queryChanged;
  const title = params.title || (urlChanged ? "" : document.title);
  const statusChanged = params.close || params.data || params.open || params.shouldClose;
  const hash = decodeURIComponent((_b = params.hash) !== null && _b !== void 0 ? _b : !urlChanged && statusChanged ? location.hash : "");
  return { ...params, title, path, query, hash };
}
function updateHistory(p, native) {
  validData(p.data);
  const params = normalizeParams(p);
  const { title, path, query, hash, close, open, shouldClose, data } = params;
  const state = {
    $hasCloseHandle: !!close,
    $hasOpenHandle: !!open,
    $hasShouldCloseHandle: !!shouldClose,
    $key: getKey(),
    $title: title,
    ...data
  };
  paramsMap.set(state.$key, params);
  dispatchBeforeChangeEvent();
  cleanObject(store);
  updateHistoryStore(state);
  const url = getUrlBarPath(path) + new QueryString(query) + hash;
  const prevHash = decodeURIComponent(location.hash);
  native(state, title, url);
  if (prevHash !== hash)
    window.dispatchEvent(new CustomEvent("hashchange"));
}
function updateHistoryByNative(data, title, originUrl, native) {
  validData(data);
  const state = {
    $key: getKey(),
    $title: title,
    ...data || {}
  };
  const { pathname, search, hash } = new URL(originUrl, location.origin + location.pathname);
  const params = normalizeParams({ path: pathname, query: new QueryString(search), hash, title, data });
  paramsMap.set(state.$key, params);
  dispatchBeforeChangeEvent();
  cleanObject(store);
  updateHistoryStore(state);
  const url = getUrlBarPath(pathname) + params.query + hash;
  const prevHash = location.hash;
  native(state, title, url);
  if (prevHash !== hash)
    window.dispatchEvent(new CustomEvent("hashchange"));
}
const [gemBasePathStore, updateBasePathStore] = useStore({
  basePath: ""
});
class GemHistory extends EventTarget {
  get store() {
    return store;
  }
  get currentKey() {
    return store.$key;
  }
  get basePath() {
    return gemBasePathStore.basePath;
  }
  set basePath(basePath) {
    updateBasePathStore({ basePath });
    Object.assign(paramsMap.get(store.$key), { path: getInternalPath(location.pathname) });
  }
  getParams() {
    return paramsMap.get(store.$key);
  }
  updateParams(params) {
    Object.assign(paramsMap.get(store.$key), params);
    updateHistoryStore();
  }
  push(params) {
    updateHistory(params, nativePushState);
  }
  replace(params) {
    updateHistory(params, nativeReplaceState);
  }
  pushIgnoreCloseHandle(params) {
    var _a2, _b;
    if (store.$hasCloseHandle) {
      (_b = (_a2 = paramsMap.get(store.$key)) === null || _a2 === void 0 ? void 0 : _a2.close) === null || _b === void 0 ? void 0 : _b.call(_a2);
      this.replace(params);
    } else {
      this.push(params);
    }
  }
  forward() {
    nativeHistory.forward();
  }
  back() {
    nativeHistory.back();
  }
}
const gemHistory = new GemHistory();
const [gemTitleStore, updateTitleStore] = useStore({ title: "" });
const _GEMHISTORY = { history: gemHistory, titleStore: gemTitleStore, basePathStore: gemBasePathStore };
if (!window._GEMHISTORY) {
  window._GEMHISTORY = _GEMHISTORY;
  nativeHistory.pushState = function(state, title, path) {
    updateHistoryByNative(state, title, path, nativePushState);
  };
  nativeHistory.replaceState = function(state, title, path) {
    updateHistoryByNative(state, title, path, nativeReplaceState);
  };
  window.addEventListener("hashchange", ({ isTrusted }) => {
    if (isTrusted) {
      gemHistory.replace({ hash: location.hash });
    }
  });
  if (!nativeHistory.state) {
    const { pathname, search, hash } = location;
    gemHistory.replace({ path: pathname, query: search, hash });
  } else if (nativeHistory.state.$hasCloseHandle) {
    updateHistoryStore(nativeHistory.state);
    const params = normalizeParams({ title: document.title });
    paramsMap.set(store.$key, params);
    gemHistory.back();
  } else {
    const params = normalizeParams({ title: document.title, hash: location.hash });
    updateHistoryStore({
      $key: getKey(),
      ...nativeHistory.state || {}
    });
    paramsMap.set(store.$key, params);
  }
  connect(gemTitleStore, () => {
    const params = paramsMap.get(store.$key);
    if (params) {
      params.title = gemTitleStore.title;
    }
  });
  connect(store, () => {
    const { title } = gemHistory.getParams();
    if (title !== gemTitleStore.title) {
      updateTitleStore({ title });
    }
  });
  let navigating = false;
  window.addEventListener("popstate", (event) => {
    var _a2, _b;
    const newState = event.state;
    if (!(newState === null || newState === void 0 ? void 0 : newState.$key)) {
      return;
    }
    if (navigating) {
      navigating = false;
      return;
    }
    if (!paramsMap.has(newState.$key)) {
      const { pathname, search, hash } = location;
      paramsMap.set(newState.$key, {
        path: pathname,
        query: new QueryString(search),
        hash: decodeURIComponent(hash),
        title: newState.$title,
        // document.title 是导航前的
        data: newState
      });
    }
    const prevState = store;
    const isForward = parseFloat(newState.$key) > parseFloat(prevState.$key);
    if (isForward && newState.$hasOpenHandle) {
      (_b = (_a2 = paramsMap.get(newState.$key)) === null || _a2 === void 0 ? void 0 : _a2.open) === null || _b === void 0 ? void 0 : _b.call(_a2);
    } else if (prevState.$hasCloseHandle) {
      const prevParams = paramsMap.get(prevState.$key);
      const closeHandle = prevParams === null || prevParams === void 0 ? void 0 : prevParams.close;
      const shouldCloseHandle = prevParams === null || prevParams === void 0 ? void 0 : prevParams.shouldClose;
      const notAllowClose = shouldCloseHandle && !shouldCloseHandle();
      if (notAllowClose) {
        navigating = true;
        gemHistory.forward();
        return;
      } else {
        if (closeHandle) {
          closeHandle();
        } else if (newState.$hasCloseHandle) {
          navigating = true;
          gemHistory.back();
        }
      }
    }
    dispatchBeforeChangeEvent();
    cleanObject(store);
    updateHistoryStore(newState);
  });
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = /* @__PURE__ */ new WeakMap();
const directive = (f) => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
const isDirective = (o) => {
  return typeof o === "function" && directives.has(o);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const noChange = {};
const nothing = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
const boundAttributeSuffix = "$lit$";
class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const { strings, values: { length } } = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const { length: length2 } = attributes;
          let count = 0;
          for (let i = 0; i < length2; i++) {
            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({ type: "attribute", index, name, strings: statics });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings2 = data.split(markerRegex);
          const lastIndex = strings2.length - 1;
          for (let i = 0; i < lastIndex; i++) {
            let insert;
            let s = strings2[i];
            if (s === "") {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({ type: "node", index: ++index });
          }
          if (strings2[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings2[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({ type: "node", index });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            this.parts.push({ type: "node", index: -1 });
            partIndex++;
          }
        }
      }
    }
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
}
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
const createMarker = () => document.createComment("");
const lastAttributeNameRegex = (
  // eslint-disable-next-line no-control-regex
  /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts2 = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts2.length) {
      part = parts2[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */
  getHTML() {
    const l = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
}
class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }
  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    reparentNodes(content, svgElement.firstChild);
    return template;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
const isIterable = (value) => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts2 = this.parts;
    if (l === 1 && strings[0] === "" && strings[1] === "") {
      const v = parts2[0].value;
      if (typeof v === "symbol") {
        return String(v);
      }
      if (typeof v === "string" || !isIterable(v)) {
        return v;
      }
    }
    let text = "";
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts2[i];
      if (part !== void 0) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === "string" ? t : String(t);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
class AttributePart {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}
class NodePart {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
}
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e) => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
const getOptions = (o) => o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer2 = new PropertyCommitter(element, name.slice(1), strings);
      return committer2.parts;
    }
    if (prefix === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */
  handleTextExpression(options) {
    return new NodePart(options);
  }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: /* @__PURE__ */ new WeakMap(),
      keyString: /* @__PURE__ */ new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key2 = result.strings.join(marker);
  template = templateCache.keyString.get(key2);
  if (template === void 0) {
    template = new Template(result, result.getTemplateElement());
    templateCache.keyString.set(key2, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = /* @__PURE__ */ new Map();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = /* @__PURE__ */ new WeakMap();
const render = (result, container, options) => {
  let part = parts.get(container);
  if (part === void 0) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
}
const html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, "svg", defaultTemplateProcessor);
const version = "1.7.12";
const VersionExports = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  version
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const createAndInsertPart = (containerPart, beforePart) => {
  const container = containerPart.startNode.parentNode;
  const beforeNode = beforePart === void 0 ? containerPart.endNode : beforePart.startNode;
  const startNode = container.insertBefore(createMarker(), beforeNode);
  container.insertBefore(createMarker(), beforeNode);
  const newPart = new NodePart(containerPart.options);
  newPart.insertAfterNode(startNode);
  return newPart;
};
const updatePart = (part, value) => {
  part.setValue(value);
  part.commit();
  return part;
};
const insertPartBefore = (containerPart, part, ref) => {
  const container = containerPart.startNode.parentNode;
  const beforeNode = ref ? ref.startNode : containerPart.endNode;
  const endNode = part.endNode.nextSibling;
  if (endNode !== beforeNode) {
    reparentNodes(container, part.startNode, endNode, beforeNode);
  }
};
const removePart = (part) => {
  removeNodes(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
};
const generateMap = (list, start, end) => {
  const map = /* @__PURE__ */ new Map();
  for (let i = start; i <= end; i++) {
    map.set(list[i], i);
  }
  return map;
};
const partListCache = /* @__PURE__ */ new WeakMap();
const keyListCache = /* @__PURE__ */ new WeakMap();
const repeat = directive((items, keyFnOrTemplate, template) => {
  let keyFn;
  if (template === void 0) {
    template = keyFnOrTemplate;
  } else if (keyFnOrTemplate !== void 0) {
    keyFn = keyFnOrTemplate;
  }
  return (containerPart) => {
    if (!(containerPart instanceof NodePart)) {
      throw new Error("repeat can only be used in text bindings");
    }
    const oldParts = partListCache.get(containerPart) || [];
    const oldKeys = keyListCache.get(containerPart) || [];
    const newParts = [];
    const newValues = [];
    const newKeys = [];
    let index = 0;
    for (const item of items) {
      newKeys[index] = keyFn ? keyFn(item, index) : index;
      newValues[index] = template(item, index);
      index++;
    }
    let newKeyToIndexMap;
    let oldKeyToIndexMap;
    let oldHead = 0;
    let oldTail = oldParts.length - 1;
    let newHead = 0;
    let newTail = newValues.length - 1;
    while (oldHead <= oldTail && newHead <= newTail) {
      if (oldParts[oldHead] === null) {
        oldHead++;
      } else if (oldParts[oldTail] === null) {
        oldTail--;
      } else if (oldKeys[oldHead] === newKeys[newHead]) {
        newParts[newHead] = updatePart(oldParts[oldHead], newValues[newHead]);
        oldHead++;
        newHead++;
      } else if (oldKeys[oldTail] === newKeys[newTail]) {
        newParts[newTail] = updatePart(oldParts[oldTail], newValues[newTail]);
        oldTail--;
        newTail--;
      } else if (oldKeys[oldHead] === newKeys[newTail]) {
        newParts[newTail] = updatePart(oldParts[oldHead], newValues[newTail]);
        insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
        oldHead++;
        newTail--;
      } else if (oldKeys[oldTail] === newKeys[newHead]) {
        newParts[newHead] = updatePart(oldParts[oldTail], newValues[newHead]);
        insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
        oldTail--;
        newHead++;
      } else {
        if (newKeyToIndexMap === void 0) {
          newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
          oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
        }
        if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
          removePart(oldParts[oldHead]);
          oldHead++;
        } else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
          removePart(oldParts[oldTail]);
          oldTail--;
        } else {
          const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
          const oldPart = oldIndex !== void 0 ? oldParts[oldIndex] : null;
          if (oldPart === null) {
            const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
            updatePart(newPart, newValues[newHead]);
            newParts[newHead] = newPart;
          } else {
            newParts[newHead] = updatePart(oldPart, newValues[newHead]);
            insertPartBefore(containerPart, oldPart, oldParts[oldHead]);
            oldParts[oldIndex] = null;
          }
          newHead++;
        }
      }
    }
    while (newHead <= newTail) {
      const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
      updatePart(newPart, newValues[newHead]);
      newParts[newHead++] = newPart;
    }
    while (oldHead <= oldTail) {
      const oldPart = oldParts[oldHead++];
      if (oldPart !== null) {
        removePart(oldPart);
      }
    }
    partListCache.set(containerPart, newParts);
    keyListCache.set(containerPart, newKeys);
  };
});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const previousValues$1 = /* @__PURE__ */ new WeakMap();
const guard = directive((value, f) => (part) => {
  const previousValue = previousValues$1.get(part);
  if (Array.isArray(value)) {
    if (Array.isArray(previousValue) && previousValue.length === value.length && value.every((v, i) => v === previousValue[i])) {
      return;
    }
  } else if (previousValue === value && (value !== void 0 || previousValues$1.has(part))) {
    return;
  }
  part.setValue(f());
  previousValues$1.set(part, Array.isArray(value) ? Array.from(value) : value);
});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const previousValues = /* @__PURE__ */ new WeakMap();
const ifDefined = directive((value) => (part) => {
  const previousValue = previousValues.get(part);
  if (value === void 0 && part instanceof AttributePart) {
    if (previousValue !== void 0 || !previousValues.has(part)) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else if (value !== previousValue) {
    part.setValue(value);
  }
  previousValues.set(part, value);
});
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _a, _GemElement_final, _GemElement_renderRoot, _GemElement_internals, _GemElement_isAppendReason, _GemElement_isMounted, _GemElement_isAsync, _GemElement_effectList, _GemElement_memoList, _GemElement_unmountCallback, _GemElement_exec, _GemElement_execEffect, _GemElement_execMemo, _GemElement_initEffect, _GemElement_render, _GemElement_shouldUpdate, _GemElement_updateCallback, _GemElement_update, _GemElement_updated, _GemElement_disconnectStore, _GemElement_connectedCallback, _GemElement_clearEffect;
function emptyFunction() {
}
function execCallback(fun) {
  typeof fun === "function" && fun();
}
const asyncRenderTaskList = new LinkedList();
const tick = (timeStamp = performance.now()) => {
  if (performance.now() > timeStamp + 16)
    return requestAnimationFrame(tick);
  const task = asyncRenderTaskList.get();
  if (task) {
    task();
    tick(timeStamp);
  }
};
asyncRenderTaskList.addEventListener("start", () => addMicrotask(tick));
const constructorSymbol = Symbol("constructor");
const initSymbol = Symbol("init");
const updateSymbol = Symbol("update");
class GemElement extends HTMLElement {
  constructor(options = {}) {
    super();
    _GemElement_renderRoot.set(this, void 0);
    _GemElement_internals.set(this, void 0);
    _GemElement_isAppendReason.set(this, void 0);
    _GemElement_isMounted.set(this, void 0);
    _GemElement_isAsync.set(this, void 0);
    _GemElement_effectList.set(this, void 0);
    _GemElement_memoList.set(this, void 0);
    _GemElement_unmountCallback.set(this, void 0);
    this.setState = (payload) => {
      if (!this.state)
        throw new GemError("`state` not initialized");
      Object.assign(this.state, payload);
      addMicrotask(__classPrivateFieldGet(this, _GemElement_update, "f"));
    };
    _GemElement_exec.set(this, (list) => {
      list === null || list === void 0 ? void 0 : list.forEach((effectItem) => {
        const { callback, getDep, values, preCallback } = effectItem;
        const newValues = getDep === null || getDep === void 0 ? void 0 : getDep();
        if (!getDep || !values || isArrayChange(values, newValues)) {
          execCallback(preCallback);
          effectItem.preCallback = callback(newValues, values);
          effectItem.values = newValues;
        }
      });
    });
    _GemElement_execEffect.set(this, () => {
      __classPrivateFieldGet(this, _GemElement_exec, "f").call(this, __classPrivateFieldGet(this, _GemElement_effectList, "f"));
    });
    _GemElement_execMemo.set(this, () => {
      __classPrivateFieldGet(this, _GemElement_exec, "f").call(this, __classPrivateFieldGet(this, _GemElement_memoList, "f"));
    });
    this.effect = (callback, getDep) => {
      if (!__classPrivateFieldGet(this, _GemElement_effectList, "f"))
        __classPrivateFieldSet(this, _GemElement_effectList, [], "f");
      const effectItem = {
        callback,
        getDep,
        initialized: __classPrivateFieldGet(this, _GemElement_isMounted, "f"),
        inConstructor: this[constructorSymbol]
      };
      if (__classPrivateFieldGet(this, _GemElement_isMounted, "f")) {
        effectItem.values = getDep === null || getDep === void 0 ? void 0 : getDep();
        effectItem.preCallback = callback(effectItem.values);
      }
      __classPrivateFieldGet(this, _GemElement_effectList, "f").push(effectItem);
    };
    this.memo = (callback, getDep) => {
      if (!__classPrivateFieldGet(this, _GemElement_memoList, "f"))
        __classPrivateFieldSet(this, _GemElement_memoList, [], "f");
      __classPrivateFieldGet(this, _GemElement_memoList, "f").push({
        callback,
        getDep,
        inConstructor: this[constructorSymbol]
      });
    };
    _GemElement_initEffect.set(this, () => {
      var _b;
      (_b = __classPrivateFieldGet(this, _GemElement_effectList, "f")) === null || _b === void 0 ? void 0 : _b.forEach((effectItem) => {
        const { callback, getDep, initialized } = effectItem;
        if (!initialized) {
          effectItem.values = getDep === null || getDep === void 0 ? void 0 : getDep();
          effectItem.preCallback = callback(effectItem.values);
          effectItem.initialized = true;
        }
      });
    });
    _GemElement_render.set(this, () => {
      __classPrivateFieldGet(this, _GemElement_execMemo, "f").call(this);
      const isLight = __classPrivateFieldGet(this, _GemElement_renderRoot, "f") === this;
      const temp = this.render ? this.render() : isLight ? void 0 : html`<slot></slot>`;
      if (temp === void 0)
        return;
      render(temp, __classPrivateFieldGet(this, _GemElement_renderRoot, "f"));
    });
    _GemElement_shouldUpdate.set(this, () => {
      return this.shouldUpdate ? this.shouldUpdate() : true;
    });
    _GemElement_updateCallback.set(this, () => {
      if (__classPrivateFieldGet(this, _GemElement_isMounted, "f") && __classPrivateFieldGet(this, _GemElement_shouldUpdate, "f").call(this)) {
        __classPrivateFieldGet(this, _GemElement_render, "f").call(this);
        addMicrotask(__classPrivateFieldGet(this, _GemElement_updated, "f"));
        addMicrotask(__classPrivateFieldGet(this, _GemElement_execEffect, "f"));
      }
    });
    _GemElement_update.set(this, () => {
      if (__classPrivateFieldGet(this, _GemElement_isAsync, "f")) {
        asyncRenderTaskList.add(__classPrivateFieldGet(this, _GemElement_updateCallback, "f"));
      } else {
        __classPrivateFieldGet(this, _GemElement_updateCallback, "f").call(this);
      }
    });
    this.update = () => {
      addMicrotask(__classPrivateFieldGet(this, _GemElement_update, "f"));
    };
    _GemElement_updated.set(this, () => {
      var _b;
      (_b = this.updated) === null || _b === void 0 ? void 0 : _b.call(this);
    });
    _GemElement_disconnectStore.set(this, void 0);
    _GemElement_connectedCallback.set(this, () => {
      var _b, _c, _d;
      if (__classPrivateFieldGet(this, _GemElement_isAppendReason, "f")) {
        __classPrivateFieldSet(this, _GemElement_isAppendReason, false, "f");
        return;
      }
      Reflect.set(this, constructorSymbol, false);
      (_b = this.willMount) === null || _b === void 0 ? void 0 : _b.call(this);
      const { observedStores, rootElement } = this.constructor;
      __classPrivateFieldSet(this, _GemElement_disconnectStore, observedStores === null || observedStores === void 0 ? void 0 : observedStores.map((store2) => connect(store2, __classPrivateFieldGet(this, _GemElement_update, "f"))), "f");
      __classPrivateFieldGet(this, _GemElement_render, "f").call(this);
      __classPrivateFieldSet(this, _GemElement_isMounted, true, "f");
      __classPrivateFieldSet(this, _GemElement_unmountCallback, (_c = this.mounted) === null || _c === void 0 ? void 0 : _c.call(this), "f");
      __classPrivateFieldGet(this, _GemElement_initEffect, "f").call(this);
      if (rootElement && this.isConnected && ((_d = this.getRootNode().host) === null || _d === void 0 ? void 0 : _d.tagName) !== rootElement.toUpperCase()) {
        throw new GemError(`not allow current root type`);
      }
    });
    _GemElement_clearEffect.set(this, (list) => {
      return list === null || list === void 0 ? void 0 : list.filter((e) => {
        execCallback(e.preCallback);
        e.initialized = false;
        return e.inConstructor;
      });
    });
    addMicrotask(() => Reflect.set(this, initSymbol, false));
    Reflect.set(this, constructorSymbol, true);
    Reflect.set(this, initSymbol, true);
    Reflect.set(this, updateSymbol, () => {
      if (__classPrivateFieldGet(this, _GemElement_isMounted, "f")) {
        addMicrotask(__classPrivateFieldGet(this, _GemElement_update, "f"));
      }
    });
    __classPrivateFieldSet(this, _GemElement_isAsync, options.isAsync, "f");
    __classPrivateFieldSet(this, _GemElement_renderRoot, options.isLight ? this : this.attachShadow({
      mode: options.mode || "open",
      delegatesFocus: options.delegatesFocus,
      slotAssignment: options.slotAssignment
    }), "f");
    let hasInitTabIndex;
    this.effect(([disabled = false]) => {
      if (hasInitTabIndex === void 0)
        hasInitTabIndex = this.hasAttribute("tabindex");
      this.internals.ariaDisabled = String(disabled);
      if (options.focusable && !hasInitTabIndex) {
        this.tabIndex = -Number(disabled);
      }
      if ((options.focusable || options.delegatesFocus) && disabled) {
        return addListener(this, "click", (e) => e.isTrusted && e.stopImmediatePropagation(), {
          capture: true
        });
      }
    }, () => [Reflect.get(this, "disabled")]);
    const { adoptedStyleSheets } = new.target;
    if (adoptedStyleSheets) {
      const sheets = adoptedStyleSheets.map((item) => item[SheetToken] || item);
      if (this.shadowRoot) {
        this.shadowRoot.adoptedStyleSheets = sheets;
      } else {
        this.effect(() => {
          const root = this.getRootNode();
          root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...sheets];
          return () => {
            root.adoptedStyleSheets = removeItems(root.adoptedStyleSheets, sheets);
          };
        }, () => []);
      }
    }
  }
  get internals() {
    if (!__classPrivateFieldGet(this, _GemElement_internals, "f")) {
      __classPrivateFieldSet(this, _GemElement_internals, this.attachInternals(), "f");
      try {
        __classPrivateFieldGet(this, _GemElement_internals, "f").states.add("foo");
        __classPrivateFieldGet(this, _GemElement_internals, "f").states.delete("foo");
      } catch (_b) {
        Reflect.defineProperty(__classPrivateFieldGet(this, _GemElement_internals, "f"), "states", {
          value: {
            has: (v) => kebabToCamelCase(v) in this.dataset,
            add: (v) => this.dataset[kebabToCamelCase(v)] = "",
            delete: (v) => delete this.dataset[kebabToCamelCase(v)]
          }
        });
      }
    }
    return __classPrivateFieldGet(this, _GemElement_internals, "f");
  }
  /**
   * @private
   * @final
   * use `effect`
   */
  attributeChangedCallback() {
    if (__classPrivateFieldGet(this, _GemElement_isMounted, "f")) {
      addMicrotask(__classPrivateFieldGet(this, _GemElement_update, "f"));
    }
    return __classPrivateFieldGet(_a, _a, "f", _GemElement_final);
  }
  closestElement(constructorOrTag) {
    const isConstructor = typeof constructorOrTag === "function";
    const tagName = typeof constructorOrTag === "string" && constructorOrTag.toUpperCase();
    const is = (ele) => isConstructor ? ele.constructor === constructorOrTag : ele.tagName === tagName;
    let node = this;
    while (node) {
      if (is(node))
        break;
      node = node.parentElement || node.getRootNode().host;
    }
    return node;
  }
  /**
   * @private
   * @final
   * use `mounted`; 允许手动调用 `connectedCallback` 以清除装饰器定义的字段
   */
  connectedCallback() {
    if (this.isConnected && __classPrivateFieldGet(this, _GemElement_isAsync, "f")) {
      asyncRenderTaskList.add(__classPrivateFieldGet(this, _GemElement_connectedCallback, "f"));
    } else {
      __classPrivateFieldGet(this, _GemElement_connectedCallback, "f").call(this);
    }
    return __classPrivateFieldGet(_a, _a, "f", _GemElement_final);
  }
  /**
   * @private
   * @final
   */
  adoptedCallback() {
    return __classPrivateFieldGet(_a, _a, "f", _GemElement_final);
  }
  /**
   * @private
   * @final
   * use `unmounted`
   */
  disconnectedCallback() {
    var _b, _c;
    if (this.isConnected) {
      __classPrivateFieldSet(this, _GemElement_isAppendReason, true, "f");
      return;
    }
    __classPrivateFieldSet(this, _GemElement_isMounted, false, "f");
    (_b = __classPrivateFieldGet(this, _GemElement_disconnectStore, "f")) === null || _b === void 0 ? void 0 : _b.forEach((disconnect) => disconnect());
    execCallback(__classPrivateFieldGet(this, _GemElement_unmountCallback, "f"));
    (_c = this.unmounted) === null || _c === void 0 ? void 0 : _c.call(this);
    __classPrivateFieldSet(this, _GemElement_effectList, __classPrivateFieldGet(this, _GemElement_clearEffect, "f").call(this, __classPrivateFieldGet(this, _GemElement_effectList, "f")), "f");
    __classPrivateFieldSet(this, _GemElement_memoList, __classPrivateFieldGet(this, _GemElement_clearEffect, "f").call(this, __classPrivateFieldGet(this, _GemElement_memoList, "f")), "f");
    return __classPrivateFieldGet(_a, _a, "f", _GemElement_final);
  }
}
_a = GemElement, _GemElement_renderRoot = /* @__PURE__ */ new WeakMap(), _GemElement_internals = /* @__PURE__ */ new WeakMap(), _GemElement_isAppendReason = /* @__PURE__ */ new WeakMap(), _GemElement_isMounted = /* @__PURE__ */ new WeakMap(), _GemElement_isAsync = /* @__PURE__ */ new WeakMap(), _GemElement_effectList = /* @__PURE__ */ new WeakMap(), _GemElement_memoList = /* @__PURE__ */ new WeakMap(), _GemElement_unmountCallback = /* @__PURE__ */ new WeakMap(), _GemElement_exec = /* @__PURE__ */ new WeakMap(), _GemElement_execEffect = /* @__PURE__ */ new WeakMap(), _GemElement_execMemo = /* @__PURE__ */ new WeakMap(), _GemElement_initEffect = /* @__PURE__ */ new WeakMap(), _GemElement_render = /* @__PURE__ */ new WeakMap(), _GemElement_shouldUpdate = /* @__PURE__ */ new WeakMap(), _GemElement_updateCallback = /* @__PURE__ */ new WeakMap(), _GemElement_update = /* @__PURE__ */ new WeakMap(), _GemElement_updated = /* @__PURE__ */ new WeakMap(), _GemElement_disconnectStore = /* @__PURE__ */ new WeakMap(), _GemElement_connectedCallback = /* @__PURE__ */ new WeakMap(), _GemElement_clearEffect = /* @__PURE__ */ new WeakMap();
_GemElement_final = { value: Symbol() };
const gemElementProxyMap = new PropProxyMap();
function defineAttribute(target, prop, attr) {
  const { booleanAttributes, numberAttributes } = target.constructor;
  Object.defineProperty(target, prop, {
    configurable: true,
    get() {
      if (!(initSymbol in this))
        return;
      const that = this;
      const value = that.getAttribute(attr);
      if (booleanAttributes === null || booleanAttributes === void 0 ? void 0 : booleanAttributes.has(attr)) {
        return value === null ? false : true;
      }
      if (numberAttributes === null || numberAttributes === void 0 ? void 0 : numberAttributes.has(attr)) {
        return Number(value);
      }
      return value || "";
    },
    set(v) {
      const that = this;
      const proxy = gemElementProxyMap.get(this);
      const hasSet = proxy[prop];
      const value = that.getAttribute(attr);
      if (this[initSymbol] && value !== null && !hasSet)
        return;
      proxy[prop] = true;
      const isBool = booleanAttributes === null || booleanAttributes === void 0 ? void 0 : booleanAttributes.has(attr);
      if (v === null || v === void 0) {
        that.removeAttribute(attr);
      } else if (isBool) {
        that.toggleAttribute(attr, !!v);
      } else {
        if (value !== String(v))
          that.setAttribute(attr, String(v));
      }
    }
  });
}
const isEventHandleSymbol = Symbol("event handle");
function defineProperty(target, prop, event, eventOptions) {
  Object.defineProperty(target, prop, {
    configurable: true,
    get() {
      const value = gemElementProxyMap.get(this)[prop];
      if (value || !event) {
        return value;
      } else {
        this[prop] = emptyFunction;
        return this[prop];
      }
    },
    set(v) {
      const that = this;
      const proxy = gemElementProxyMap.get(that);
      if (v !== proxy[prop]) {
        if (event) {
          proxy[prop] = (v === null || v === void 0 ? void 0 : v[isEventHandleSymbol]) ? v : (detail, options) => {
            const evt = new CustomEvent(event, { ...options, ...eventOptions, detail });
            that.dispatchEvent(evt);
            v(detail, options);
          };
          Reflect.set(proxy[prop], isEventHandleSymbol, true);
        } else {
          proxy[prop] = v;
          this[updateSymbol]();
        }
      }
    }
  });
}
const getReflectTargets = (ele) => [...ele.querySelectorAll("[data-gem-reflect]")].map((e) => e.target);
function defineRef(target, prop, ref) {
  const refSelector = `[ref=${ref}]`;
  Object.defineProperty(target, prop, {
    configurable: true,
    get() {
      const proxy = gemElementProxyMap.get(this);
      let refobject2 = proxy[prop];
      if (!refobject2) {
        const that = this;
        const ele = that.shadowRoot || that;
        refobject2 = {
          get ref() {
            return ref;
          },
          get element() {
            for (const e of [ele, ...getReflectTargets(ele)]) {
              const result = e.querySelector(refSelector);
              if (result)
                return result;
            }
          },
          get elements() {
            return [ele, ...getReflectTargets(ele)].map((e) => [...e.querySelectorAll(refSelector)]).flat();
          }
        };
        proxy[prop] = refobject2;
      }
      return refobject2;
    }
  });
}
function defineCSSState(target, prop, state) {
  Object.defineProperty(target, prop, {
    configurable: true,
    get() {
      const that = this;
      const { states } = that.internals;
      return states === null || states === void 0 ? void 0 : states.has(state);
    },
    set(v) {
      const that = this;
      const { states } = that.internals;
      if (v) {
        states === null || states === void 0 ? void 0 : states.add(state);
      } else {
        states === null || states === void 0 ? void 0 : states.delete(state);
      }
    }
  });
}
const nativeDefineElement = customElements.define.bind(customElements);
customElements.define = (name, cls, options) => {
  if (cls.prototype instanceof GemElement) {
    const { observedAttributes, observedProperties, defineEvents, defineCSSStates, defineRefs } = cls;
    observedAttributes === null || observedAttributes === void 0 ? void 0 : observedAttributes.forEach((attr) => defineAttribute(cls.prototype, kebabToCamelCase(attr), attr));
    observedProperties === null || observedProperties === void 0 ? void 0 : observedProperties.forEach((prop) => defineProperty(cls.prototype, prop));
    defineEvents === null || defineEvents === void 0 ? void 0 : defineEvents.forEach((event) => defineProperty(cls.prototype, kebabToCamelCase(event), event));
    defineCSSStates === null || defineCSSStates === void 0 ? void 0 : defineCSSStates.forEach((state) => defineCSSState(cls.prototype, kebabToCamelCase(state), state));
    defineRefs === null || defineRefs === void 0 ? void 0 : defineRefs.forEach((ref) => defineRef(cls.prototype, kebabToCamelCase(ref), ref));
  }
  nativeDefineElement(name, cls, options);
};
if (window.__GEM_DEVTOOLS__HOOK__) {
  Object.assign(window.__GEM_DEVTOOLS__HOOK__, { ...GemExports, ...VersionExports });
}
function pushStaticField(target, field, member, isSet = false) {
  const cls = target.constructor;
  const current = cls[field];
  if (!cls.hasOwnProperty(field)) {
    Object.defineProperty(cls, field, {
      value: isSet ? new Set(current) : current ? Array.from(current) : []
    });
  }
  cls[field][isSet ? "add" : "push"](member);
}
function refobject(target, prop) {
  const ref = `${camelToKebabCase(prop)}-${randomStr()}`;
  pushStaticField(target, "defineRefs", ref);
  defineRef(target, prop, ref);
}
function defineAttr(target, prop, attr) {
  pushStaticField(target, "observedAttributes", attr);
  defineAttribute(target, prop, attr);
}
function attribute(target, prop) {
  defineAttr(target, prop, camelToKebabCase(prop));
}
function boolattribute(target, prop) {
  const attr = camelToKebabCase(prop);
  pushStaticField(target, "booleanAttributes", attr, true);
  defineAttr(target, prop, attr);
}
function property(target, prop) {
  pushStaticField(target, "observedProperties", prop);
  defineProperty(target, prop);
}
function emitter(target, prop) {
  defineEmitter(target, prop);
}
function defineEmitter(target, prop, options) {
  const event = camelToKebabCase(prop);
  pushStaticField(target, "defineEvents", event);
  defineProperty(target, prop, event, options);
}
function connectStore(store2) {
  return function(cls) {
    const con = cls;
    pushStaticField(con.prototype, "observedStores", store2);
  };
}
function customElement(name) {
  return function(cls) {
    nativeDefineElement(name, cls);
  };
}
export {
  GemElement as G,
  connectStore as a,
  customElement as b,
  createStore as c,
  attribute as d,
  boolattribute as e,
  refobject as f,
  emitter as g,
  html as h,
  randomStr as i,
  connect as j,
  kebabToCamelCase as k,
  camelToKebabCase as l,
  property as p,
  render as r,
  updateStore as u
};
//# sourceMappingURL=gem.js.map
