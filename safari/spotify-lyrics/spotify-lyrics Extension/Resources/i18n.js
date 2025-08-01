const VERSION = "1.6.10";
const isWebApp = location.protocol.startsWith("http");
navigator.userAgent.includes("Firefox");
var Event = /* @__PURE__ */ ((Event2) => {
  Event2[Event2["GET_SONGS"] = 1e5] = "GET_SONGS";
  Event2[Event2["SEND_SONGS"] = 100001] = "SEND_SONGS";
  Event2[Event2["SELECT_SONG"] = 100002] = "SELECT_SONG";
  Event2[Event2["CONFIRMED_SONG"] = 100003] = "CONFIRMED_SONG";
  Event2[Event2["GET_OPTIONS"] = 100004] = "GET_OPTIONS";
  Event2[Event2["SEND_OPTIONS"] = 100005] = "SEND_OPTIONS";
  Event2[Event2["OPEN_OPTIONS"] = 100006] = "OPEN_OPTIONS";
  Event2[Event2["POPUP_ACTIVE"] = 100007] = "POPUP_ACTIVE";
  Event2[Event2["CAPTURE_EXCEPTION"] = 100008] = "CAPTURE_EXCEPTION";
  Event2[Event2["SEND_REQUEST"] = 100009] = "SEND_REQUEST";
  Event2[Event2["SEND_RESPONSE"] = 100010] = "SEND_RESPONSE";
  Event2[Event2["TOGGLE"] = 100011] = "TOGGLE";
  return Event2;
})(Event || {});
const LyricsPositions = ["page", "pip"];
const LyricsAlign = ["left", "center"];
const LyricsFontFamily = ["CircularSp", "Sans-Serif", "Serif", "Cursive"];
const LyricsTransform = ["Origin", "Simplified", "Traditional"];
const LyricsServer = ["NetEase", "LRCLIB"];
const postReq = (params) => {
  const uri = "https://www.google-analytics.com/collect";
  const options = {
    method: "post",
    body: new URLSearchParams(params).toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  };
  if (isWebApp) {
    const data = { reqId: -1, uri, options };
    window.postMessage({ type: Event.SEND_REQUEST, data }, "*");
  } else {
    fetch(uri, options);
  }
};
const gaRequiredPayload = {
  v: "1",
  // protocol version
  tid: "UA-88601817-2"
  // measurement id
};
const events = {
  loadLyrics: {
    ec: "Load",
    ea: "LoadLyrics",
    el: "LoadLyricsTime"
  },
  notMatch: {
    ec: "Load",
    ea: "NotMatchLyrics"
  },
  useRemoteMatch: {
    ec: "Load",
    ea: "UseRemoteMatch"
  },
  noLyrics: {
    ec: "Load",
    ea: "NoLyrics"
  },
  useRemoteLyrics: {
    ec: "Load",
    ea: "UseRemoteLyrics"
  },
  selectTrack: {
    ec: "Click",
    ea: "ManuallySelectTrack"
  },
  autoSelectTrack: {
    ec: "Click",
    ea: "AutoSelectTrack"
  },
  clickToggleLyrics: {
    ec: "Click",
    ea: "ClickToggleLyrics"
  },
  keypressToggleLyrics: {
    ec: "Click",
    ea: "KeypressToggleLyrics"
  },
  openEditor: {
    ec: "Window",
    ea: "OpenEditor"
  },
  openOptionsPage: {
    ec: "Window",
    ea: "OpenOptionsPage"
  },
  openPopupPage: {
    ec: "Window",
    ea: "OpenPopupPage"
  }
};
function sendEvent(cid, payload, customOptions = {}) {
  postReq({
    cid,
    // client id
    t: "event",
    // hit type
    cn: VERSION,
    // campaign name
    ul: navigator.language.toLowerCase(),
    // user language
    sr: `${screen.width}x${screen.height}`,
    // screen resolution
    ...gaRequiredPayload,
    ...payload,
    ...customOptions,
    ...isWebApp ? {
      vp: `${innerWidth}x${innerHeight}`,
      // viewport size
      cs: matchMedia("(display-mode: standalone), (display-mode: minimal-ui)").matches ? "pwa" : "webpage",
      // campaign source
      cm: location.host
      // campaign medium
    } : {}
  });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var browserPolyfill = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    {
      factory(module);
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
    if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
      throw new Error("This script should only be loaded in a browser extension.");
    }
    if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
      const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
      const wrapAPIs = (extensionAPIs) => {
        const apiMetadata = {
          "alarms": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "clearAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "bookmarks": {
            "create": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getChildren": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getRecent": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getSubTree": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getTree": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "move": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeTree": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "search": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          },
          "browserAction": {
            "disable": {
              "minArgs": 0,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "enable": {
              "minArgs": 0,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "getBadgeBackgroundColor": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getBadgeText": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getPopup": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getTitle": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "openPopup": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "setBadgeBackgroundColor": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setBadgeText": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setIcon": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "setPopup": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setTitle": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            }
          },
          "browsingData": {
            "remove": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "removeCache": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeCookies": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeDownloads": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeFormData": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeHistory": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeLocalStorage": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removePasswords": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removePluginData": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "settings": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "commands": {
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "contextMenus": {
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          },
          "cookies": {
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAllCookieStores": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "devtools": {
            "inspectedWindow": {
              "eval": {
                "minArgs": 1,
                "maxArgs": 2,
                "singleCallbackArg": false
              }
            },
            "panels": {
              "create": {
                "minArgs": 3,
                "maxArgs": 3,
                "singleCallbackArg": true
              },
              "elements": {
                "createSidebarPane": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            }
          },
          "downloads": {
            "cancel": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "download": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "erase": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getFileIcon": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "open": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "pause": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeFile": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "resume": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "search": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "show": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            }
          },
          "extension": {
            "isAllowedFileSchemeAccess": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "isAllowedIncognitoAccess": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "history": {
            "addUrl": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "deleteAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "deleteRange": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "deleteUrl": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getVisits": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "search": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "i18n": {
            "detectLanguage": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAcceptLanguages": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "identity": {
            "launchWebAuthFlow": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "idle": {
            "queryState": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "management": {
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getSelf": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "setEnabled": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "uninstallSelf": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "notifications": {
            "clear": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "create": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getPermissionLevel": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          },
          "pageAction": {
            "getPopup": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getTitle": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "hide": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setIcon": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "setPopup": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "setTitle": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            },
            "show": {
              "minArgs": 1,
              "maxArgs": 1,
              "fallbackToNoCallback": true
            }
          },
          "permissions": {
            "contains": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "request": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "runtime": {
            "getBackgroundPage": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getPlatformInfo": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "openOptionsPage": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "requestUpdateCheck": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "sendMessage": {
              "minArgs": 1,
              "maxArgs": 3
            },
            "sendNativeMessage": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "setUninstallURL": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "sessions": {
            "getDevices": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getRecentlyClosed": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "restore": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "storage": {
            "local": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getBytesInUse": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "managed": {
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getBytesInUse": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "sync": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getBytesInUse": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          },
          "tabs": {
            "captureVisibleTab": {
              "minArgs": 0,
              "maxArgs": 2
            },
            "create": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "detectLanguage": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "discard": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "duplicate": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "executeScript": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "get": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getCurrent": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "getZoom": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getZoomSettings": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "goBack": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "goForward": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "highlight": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "insertCSS": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "move": {
              "minArgs": 2,
              "maxArgs": 2
            },
            "query": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "reload": {
              "minArgs": 0,
              "maxArgs": 2
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "removeCSS": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "sendMessage": {
              "minArgs": 2,
              "maxArgs": 3
            },
            "setZoom": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "setZoomSettings": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "update": {
              "minArgs": 1,
              "maxArgs": 2
            }
          },
          "topSites": {
            "get": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "webNavigation": {
            "getAllFrames": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "getFrame": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "webRequest": {
            "handlerBehaviorChanged": {
              "minArgs": 0,
              "maxArgs": 0
            }
          },
          "windows": {
            "create": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "get": {
              "minArgs": 1,
              "maxArgs": 2
            },
            "getAll": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getCurrent": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getLastFocused": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "update": {
              "minArgs": 2,
              "maxArgs": 2
            }
          }
        };
        if (Object.keys(apiMetadata).length === 0) {
          throw new Error("api-metadata.json has not been included in browser-polyfill");
        }
        class DefaultWeakMap extends WeakMap {
          constructor(createItem, items = void 0) {
            super(items);
            this.createItem = createItem;
          }
          get(key) {
            if (!this.has(key)) {
              this.set(key, this.createItem(key));
            }
            return super.get(key);
          }
        }
        const isThenable = (value) => {
          return value && typeof value === "object" && typeof value.then === "function";
        };
        const makeCallback = (promise, metadata) => {
          return (...callbackArgs) => {
            if (extensionAPIs.runtime.lastError) {
              promise.reject(new Error(extensionAPIs.runtime.lastError.message));
            } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
              promise.resolve(callbackArgs[0]);
            } else {
              promise.resolve(callbackArgs);
            }
          };
        };
        const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
        const wrapAsyncFunction = (name, metadata) => {
          return function asyncFunctionWrapper(target, ...args) {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              if (metadata.fallbackToNoCallback) {
                try {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                } catch (cbError) {
                  console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                  target[name](...args);
                  metadata.fallbackToNoCallback = false;
                  metadata.noCallback = true;
                  resolve();
                }
              } else if (metadata.noCallback) {
                target[name](...args);
                resolve();
              } else {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              }
            });
          };
        };
        const wrapMethod = (target, method, wrapper) => {
          return new Proxy(method, {
            apply(targetMethod, thisObj, args) {
              return wrapper.call(thisObj, target, ...args);
            }
          });
        };
        let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
        const wrapObject = (target, wrappers = {}, metadata = {}) => {
          let cache = /* @__PURE__ */ Object.create(null);
          let handlers = {
            has(proxyTarget2, prop) {
              return prop in target || prop in cache;
            },
            get(proxyTarget2, prop, receiver) {
              if (prop in cache) {
                return cache[prop];
              }
              if (!(prop in target)) {
                return void 0;
              }
              let value = target[prop];
              if (typeof value === "function") {
                if (typeof wrappers[prop] === "function") {
                  value = wrapMethod(target, target[prop], wrappers[prop]);
                } else if (hasOwnProperty(metadata, prop)) {
                  let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                  value = wrapMethod(target, target[prop], wrapper);
                } else {
                  value = value.bind(target);
                }
              } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                value = wrapObject(value, wrappers[prop], metadata[prop]);
              } else if (hasOwnProperty(metadata, "*")) {
                value = wrapObject(value, wrappers[prop], metadata["*"]);
              } else {
                Object.defineProperty(cache, prop, {
                  configurable: true,
                  enumerable: true,
                  get() {
                    return target[prop];
                  },
                  set(value2) {
                    target[prop] = value2;
                  }
                });
                return value;
              }
              cache[prop] = value;
              return value;
            },
            set(proxyTarget2, prop, value, receiver) {
              if (prop in cache) {
                cache[prop] = value;
              } else {
                target[prop] = value;
              }
              return true;
            },
            defineProperty(proxyTarget2, prop, desc) {
              return Reflect.defineProperty(cache, prop, desc);
            },
            deleteProperty(proxyTarget2, prop) {
              return Reflect.deleteProperty(cache, prop);
            }
          };
          let proxyTarget = Object.create(target);
          return new Proxy(proxyTarget, handlers);
        };
        const wrapEvent = (wrapperMap) => ({
          addListener(target, listener, ...args) {
            target.addListener(wrapperMap.get(listener), ...args);
          },
          hasListener(target, listener) {
            return target.hasListener(wrapperMap.get(listener));
          },
          removeListener(target, listener) {
            target.removeListener(wrapperMap.get(listener));
          }
        });
        const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
          if (typeof listener !== "function") {
            return listener;
          }
          return function onRequestFinished(req) {
            const wrappedReq = wrapObject(req, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            listener(wrappedReq);
          };
        });
        const onMessageWrappers = new DefaultWeakMap((listener) => {
          if (typeof listener !== "function") {
            return listener;
          }
          return function onMessage(message, sender, sendResponse) {
            let didCallSendResponse = false;
            let wrappedSendResponse;
            let sendResponsePromise = new Promise((resolve) => {
              wrappedSendResponse = function(response) {
                didCallSendResponse = true;
                resolve(response);
              };
            });
            let result;
            try {
              result = listener(message, sender, wrappedSendResponse);
            } catch (err) {
              result = Promise.reject(err);
            }
            const isResultThenable = result !== true && isThenable(result);
            if (result !== true && !isResultThenable && !didCallSendResponse) {
              return false;
            }
            const sendPromisedResult = (promise) => {
              promise.then((msg) => {
                sendResponse(msg);
              }, (error) => {
                let message2;
                if (error && (error instanceof Error || typeof error.message === "string")) {
                  message2 = error.message;
                } else {
                  message2 = "An unexpected error occurred";
                }
                sendResponse({
                  __mozWebExtensionPolyfillReject__: true,
                  message: message2
                });
              }).catch((err) => {
                console.error("Failed to send onMessage rejected reply", err);
              });
            };
            if (isResultThenable) {
              sendPromisedResult(result);
            } else {
              sendPromisedResult(sendResponsePromise);
            }
            return true;
          };
        });
        const wrappedSendMessageCallback = ({
          reject,
          resolve
        }, reply) => {
          if (extensionAPIs.runtime.lastError) {
            if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
              resolve();
            } else {
              reject(new Error(extensionAPIs.runtime.lastError.message));
            }
          } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
            reject(new Error(reply.message));
          } else {
            resolve(reply);
          }
        };
        const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }
          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }
          return new Promise((resolve, reject) => {
            const wrappedCb = wrappedSendMessageCallback.bind(null, {
              resolve,
              reject
            });
            args.push(wrappedCb);
            apiNamespaceObj.sendMessage(...args);
          });
        };
        const staticWrappers = {
          devtools: {
            network: {
              onRequestFinished: wrapEvent(onRequestFinishedWrappers)
            }
          },
          runtime: {
            onMessage: wrapEvent(onMessageWrappers),
            onMessageExternal: wrapEvent(onMessageWrappers),
            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        };
        const settingMetadata = {
          clear: {
            minArgs: 1,
            maxArgs: 1
          },
          get: {
            minArgs: 1,
            maxArgs: 1
          },
          set: {
            minArgs: 1,
            maxArgs: 1
          }
        };
        apiMetadata.privacy = {
          network: {
            "*": settingMetadata
          },
          services: {
            "*": settingMetadata
          },
          websites: {
            "*": settingMetadata
          }
        };
        return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
      };
      module2.exports = wrapAPIs(chrome);
    } else {
      module2.exports = globalThis.browser;
    }
  });
})(browserPolyfill);
var browserPolyfillExports = browserPolyfill.exports;
const browser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
async function getTabs() {
  return browser.tabs.query({
    url: browser.runtime.getManifest().content_scripts[0].matches
  });
}
async function sendMessage(tabIdOrMsg, msg) {
  if (typeof tabIdOrMsg === "number") {
    browser.tabs.sendMessage(tabIdOrMsg, msg);
  } else {
    const tabs = await getTabs();
    tabs.forEach((tab) => {
      if (tab?.id)
        browser.tabs.sendMessage(tab.id, tabIdOrMsg);
    });
  }
}
function captureException({ error }, extra) {
  console.error(error, extra);
  const msg = {
    type: Event.CAPTURE_EXCEPTION,
    data: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      extra: { href: location.href, ...extra }
    }
  };
  browser.runtime.sendMessage(msg);
}
const uiLanguage = browser.i18n.getUILanguage();
const defaultOptions = {
  cid: `${Date.now()}-${Math.random()}`,
  "only-cover": "off",
  "hd-cover": "filter" in OffscreenCanvasRenderingContext2D.prototype ? "off" : "on",
  "clean-lyrics": "on",
  "show-on": "pip",
  "lyrics-align": "left",
  "font-size": "48",
  "font-family": LyricsFontFamily[0],
  "use-unreviewed-lyrics": "on",
  "toggle-shortcut": "l",
  "traditional-chinese-lyrics": uiLanguage === "zh-TW" || uiLanguage === "zh-HK" ? "on" : "off",
  "lyrics-transform": "Origin",
  "lyrics-server": "LRCLIB"
};
async function getOptions() {
  const options = await browser.storage.sync.get(defaultOptions);
  if (options.cid === defaultOptions.cid) {
    await browser.storage.sync.set({ cid: options.cid });
  }
  return options;
}
async function updateOptions(value) {
  await browser.storage.sync.set(value);
  const options = await getOptions();
  if (isWebApp) {
    window.postMessage({ type: Event.SEND_OPTIONS, data: options }, "*");
  } else {
    sendMessage({ type: Event.SEND_OPTIONS, data: options });
  }
  return options;
}
const extensionName = {
  message: "SLyrics",
  description: "Name of the extension"
};
const extensionDescription = {
  message: "Instant synchronized lyrics display in picture-in-picture window",
  description: "Description of the extension"
};
const actionDisableTitle = {
  message: "View other lyrics after opening lyrics",
  description: "Browser action disable title"
};
const actionEnableTitle = {
  message: "Try other lyrics",
  description: "Browser action enable title"
};
const popupMissMatch = {
  message: "No songs currently available",
  description: "The currently playing song was not found on the lyrics service."
};
const popupConfirmTip = {
  message: "Save this change?",
  description: "Request confirmation from the user"
};
const popupConfirmSave = {
  message: "Save",
  description: "Save user selection"
};
const popupConfirmCancel = {
  message: "Cancel",
  description: "Cancel manually set lyrics"
};
const popupMatchDescription1 = {
  message: "Try other lyrics or",
  description: "Lyric matching description1"
};
const popupMatchDescription2 = {
  message: "use default",
  description: "Lyric matching use default"
};
const popupMatchDescription3 = {
  message: "",
  description: "Lyric matching description3"
};
const optionsSaveTip1 = {
  message: "Switch song to take effect",
  description: "Some tips for saving options"
};
const optionsSaveTip2 = {
  message: "Reopen the lyrics to take effect",
  description: "Some tips for saving options"
};
const optionsFontSize = {
  message: "Lyrics font size",
  description: "Specify lyrics font size"
};
const optionsFontSizeDetail = {
  message: "This is a relative size, the width of the lyrics window is treated as 640px",
  description: "Specify font size detail"
};
const optionsFontFamily = {
  message: "Lyrics font family",
  description: "Specify lyrics font family"
};
const optionsLyricsAlign = {
  message: "Lyrics align",
  description: "Specify alignment"
};
const optionsHDCover = {
  message: "Use high-resolution cover as the lyrics background",
  description: "Use high-resolution cover as the lyrics background"
};
const optionsHDCoverDetail = {
  message: "Fall back to the blurred cover when the high-resolution cover fails to load",
  description: "Use high-resolution cover as the lyrics background detail"
};
const optionsUseUnreviewedLyrics = {
  message: "Use unreviewed lyrics",
  description: "Use unreviewed lyrics"
};
const optionsUseUnreviewedLyricsDetail = {
  message: "Use lyrics uploaded by other users but not reviewed",
  description: "Use unreviewed lyrics detail"
};
const optionsShowLyrics = {
  message: "Only show cover",
  description: "Only show cover option"
};
const optionsShowCleanLyrics = {
  message: "Show clean lyrics",
  description: "Show clean lyrics option"
};
const optionsShowCleanLyricsDetail = {
  message: "Hide composer and producer information",
  description: "Show clean lyrics option detail"
};
const optionsTraditionalChineseLyrics = {
  message: "Traditional chinese lyrics",
  description: "Lyrics use traditional chinese"
};
const optionsLyricsTransform = {
  message: "Lyrics transform"
};
const optionsLyricsServer = {
  message: "Lyrics server"
};
const optionsLyricsTransformDetail = {
  message: "When using simplified Chinese, try to load the translated lyrics"
};
const optionsLyricsPosition = {
  message: "Where the lyrics show",
  description: "Lyrics position option"
};
const optionsToggleShortcut = {
  message: "Shortcut",
  description: "Toggle show lyrics shortcut"
};
const optionsToggleShortcutDetail = {
  message: "When webapp is in focus, you can use shortcuts to open and close lyrics, global shortcut: chrome://extensions/shortcuts",
  description: "Toggle show lyrics shortcut detail"
};
const menusFeedback = {
  message: "Feedback",
  description: "Feedback context menus item"
};
const menusWelcome = {
  message: "Welcome",
  description: "Welcome menus item"
};
const menusRateMe = {
  message: "Rate this extension",
  description: "Rate me context menus item"
};
const pageButtonTitle = {
  message: "Lyrics",
  description: "Lyrics button title"
};
const pageTipError = {
  message: "Error",
  description: "Load lyrics error tip"
};
const pageTipNoLyrics = {
  message: "No lyrics",
  description: "No lyrics tip"
};
const pageTipLoading = {
  message: "Loading...",
  description: "Loading lyrics tip"
};
const pageTipWaiting = {
  message: "Waiting to play...",
  description: "Waiting for music tip"
};
const pageEditorOpenValid = {
  message: "Please open the lyrics first",
  description: "Open LRC editor fail tip"
};
const pageEditorTitle = {
  message: "LRC Editor",
  description: "LRC editor title"
};
const pageEditorSearch = {
  message: "Search lyrics",
  description: "Search lyrics tip"
};
const pageEditorPlaybackRate = {
  message: "Playback rate",
  description: "Audio playback rate"
};
const pageEditorOffset = {
  message: "Global offset",
  description: "Lyrics offset lable"
};
const pageEditorOffsetDetail = {
  message: "Offset 0.1s",
  description: "Lyrics offset button title"
};
const pageEditorClearAll = {
  message: "Clear all",
  description: "Cleaer all lyrics"
};
const pageEditorSeek = {
  message: "Jump",
  description: "Track seek tip"
};
const pageEditorAddLyrics1 = {
  message: "Paste or",
  description: "Paste or upload lyrics"
};
const pageEditorAddLyrics2 = {
  message: "choose",
  description: "Paste or upload lyrics"
};
const pageEditorAddLyrics3 = {
  message: "lyrics",
  description: "Paste or upload lyrics"
};
const pageEditorMarkLine = {
  message: "Mark Line",
  description: "Mark line"
};
const pageEditorInsetLine = {
  message: "Inset Line",
  description: "Inset line"
};
const pageEditorReset = {
  message: "Reset",
  description: "Reset remote and local lyrics"
};
const pageEditorDownload = {
  message: "Download",
  description: "Download lyrics"
};
const pageEditorSave = {
  message: "Save",
  description: "Save lyrics"
};
const pageEditorSaveValid = {
  message: "Please add a timestamp to each line of text",
  description: "Save lyrics valid tip"
};
const i18nEnMessages = {
  extensionName,
  extensionDescription,
  actionDisableTitle,
  actionEnableTitle,
  popupMissMatch,
  popupConfirmTip,
  popupConfirmSave,
  popupConfirmCancel,
  popupMatchDescription1,
  popupMatchDescription2,
  popupMatchDescription3,
  optionsSaveTip1,
  optionsSaveTip2,
  optionsFontSize,
  optionsFontSizeDetail,
  optionsFontFamily,
  optionsLyricsAlign,
  optionsHDCover,
  optionsHDCoverDetail,
  optionsUseUnreviewedLyrics,
  optionsUseUnreviewedLyricsDetail,
  optionsShowLyrics,
  optionsShowCleanLyrics,
  optionsShowCleanLyricsDetail,
  optionsTraditionalChineseLyrics,
  optionsLyricsTransform,
  optionsLyricsServer,
  optionsLyricsTransformDetail,
  optionsLyricsPosition,
  optionsToggleShortcut,
  optionsToggleShortcutDetail,
  menusFeedback,
  menusWelcome,
  menusRateMe,
  pageButtonTitle,
  pageTipError,
  pageTipNoLyrics,
  pageTipLoading,
  pageTipWaiting,
  pageEditorOpenValid,
  pageEditorTitle,
  pageEditorSearch,
  pageEditorPlaybackRate,
  pageEditorOffset,
  pageEditorOffsetDetail,
  pageEditorClearAll,
  pageEditorSeek,
  pageEditorAddLyrics1,
  pageEditorAddLyrics2,
  pageEditorAddLyrics3,
  pageEditorMarkLine,
  pageEditorInsetLine,
  pageEditorReset,
  pageEditorDownload,
  pageEditorSave,
  pageEditorSaveValid
};
const i18n = Object.keys(i18nEnMessages).reduce(
  (p, c) => {
    p[c] = (...rest) => browser.i18n.getMessage(c, ...rest);
    return p;
  },
  {}
);
Object.keys(i18nEnMessages).reduce(
  (p, c) => {
    p[c] = browser.i18n.getMessage(c);
    return p;
  },
  {}
);
export {
  Event as E,
  LyricsFontFamily as L,
  sendEvent as a,
  browser as b,
  captureException as c,
  commonjsGlobal as d,
  events as e,
  LyricsAlign as f,
  getOptions as g,
  LyricsTransform as h,
  i18n as i,
  LyricsPositions as j,
  LyricsServer as k,
  isWebApp as l,
  sendMessage as s,
  updateOptions as u
};
//# sourceMappingURL=i18n.js.map
