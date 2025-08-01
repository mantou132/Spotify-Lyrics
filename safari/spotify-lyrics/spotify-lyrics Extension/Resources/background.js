"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports, module2) {
      (function(global6, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module2);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global6.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module3) {
        "use strict";
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
            const isThenable2 = (value) => {
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
              let handlers2 = {
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
              return new Proxy(proxyTarget, handlers2);
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
                const isResultThenable = result !== true && isThenable2(result);
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
          module3.exports = wrapAPIs(chrome);
        } else {
          module3.exports = globalThis.browser;
        }
      });
    }
  });

  // src/background.ts
  var import_webextension_polyfill4 = __toESM(require_browser_polyfill());

  // node_modules/@sentry/browser/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    BrowserClient: () => BrowserClient,
    Hub: () => Hub,
    Integrations: () => INTEGRATIONS,
    SDK_NAME: () => SDK_NAME,
    SDK_VERSION: () => SDK_VERSION,
    Scope: () => Scope,
    Severity: () => Severity,
    Status: () => Status,
    Transports: () => transports_exports,
    addBreadcrumb: () => addBreadcrumb,
    addGlobalEventProcessor: () => addGlobalEventProcessor,
    captureEvent: () => captureEvent,
    captureException: () => captureException,
    captureMessage: () => captureMessage,
    close: () => close,
    configureScope: () => configureScope,
    defaultIntegrations: () => defaultIntegrations,
    eventFromException: () => eventFromException,
    eventFromMessage: () => eventFromMessage,
    flush: () => flush,
    forceLoad: () => forceLoad,
    getCurrentHub: () => getCurrentHub,
    getHubFromCarrier: () => getHubFromCarrier,
    init: () => init,
    injectReportDialog: () => injectReportDialog,
    lastEventId: () => lastEventId,
    makeMain: () => makeMain,
    onLoad: () => onLoad,
    setContext: () => setContext,
    setExtra: () => setExtra,
    setExtras: () => setExtras,
    setTag: () => setTag,
    setTags: () => setTags,
    setUser: () => setUser,
    showReportDialog: () => showReportDialog,
    startTransaction: () => startTransaction,
    withScope: () => withScope,
    wrap: () => wrap2
  });

  // node_modules/tslib/tslib.es6.js
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }

  // node_modules/@sentry/types/esm/session.js
  var SessionStatus;
  (function(SessionStatus2) {
    SessionStatus2["Ok"] = "ok";
    SessionStatus2["Exited"] = "exited";
    SessionStatus2["Crashed"] = "crashed";
    SessionStatus2["Abnormal"] = "abnormal";
  })(SessionStatus || (SessionStatus = {}));

  // node_modules/@sentry/types/esm/severity.js
  var Severity;
  (function(Severity2) {
    Severity2["Fatal"] = "fatal";
    Severity2["Error"] = "error";
    Severity2["Warning"] = "warning";
    Severity2["Log"] = "log";
    Severity2["Info"] = "info";
    Severity2["Debug"] = "debug";
    Severity2["Critical"] = "critical";
  })(Severity || (Severity = {}));
  (function(Severity2) {
    function fromString(level) {
      switch (level) {
        case "debug":
          return Severity2.Debug;
        case "info":
          return Severity2.Info;
        case "warn":
        case "warning":
          return Severity2.Warning;
        case "error":
          return Severity2.Error;
        case "fatal":
          return Severity2.Fatal;
        case "critical":
          return Severity2.Critical;
        case "log":
        default:
          return Severity2.Log;
      }
    }
    Severity2.fromString = fromString;
  })(Severity || (Severity = {}));

  // node_modules/@sentry/types/esm/status.js
  var Status;
  (function(Status2) {
    Status2["Unknown"] = "unknown";
    Status2["Skipped"] = "skipped";
    Status2["Success"] = "success";
    Status2["RateLimit"] = "rate_limit";
    Status2["Invalid"] = "invalid";
    Status2["Failed"] = "failed";
  })(Status || (Status = {}));
  (function(Status2) {
    function fromHttpCode(code) {
      if (code >= 200 && code < 300) {
        return Status2.Success;
      }
      if (code === 429) {
        return Status2.RateLimit;
      }
      if (code >= 400 && code < 500) {
        return Status2.Invalid;
      }
      if (code >= 500) {
        return Status2.Failed;
      }
      return Status2.Unknown;
    }
    Status2.fromHttpCode = fromHttpCode;
  })(Status || (Status = {}));

  // node_modules/@sentry/utils/esm/is.js
  function isError(wat) {
    switch (Object.prototype.toString.call(wat)) {
      case "[object Error]":
        return true;
      case "[object Exception]":
        return true;
      case "[object DOMException]":
        return true;
      default:
        return isInstanceOf(wat, Error);
    }
  }
  function isErrorEvent(wat) {
    return Object.prototype.toString.call(wat) === "[object ErrorEvent]";
  }
  function isDOMError(wat) {
    return Object.prototype.toString.call(wat) === "[object DOMError]";
  }
  function isDOMException(wat) {
    return Object.prototype.toString.call(wat) === "[object DOMException]";
  }
  function isString(wat) {
    return Object.prototype.toString.call(wat) === "[object String]";
  }
  function isPrimitive(wat) {
    return wat === null || typeof wat !== "object" && typeof wat !== "function";
  }
  function isPlainObject(wat) {
    return Object.prototype.toString.call(wat) === "[object Object]";
  }
  function isEvent(wat) {
    return typeof Event !== "undefined" && isInstanceOf(wat, Event);
  }
  function isElement(wat) {
    return typeof Element !== "undefined" && isInstanceOf(wat, Element);
  }
  function isRegExp(wat) {
    return Object.prototype.toString.call(wat) === "[object RegExp]";
  }
  function isThenable(wat) {
    return Boolean(wat && wat.then && typeof wat.then === "function");
  }
  function isSyntheticEvent(wat) {
    return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
  }
  function isInstanceOf(wat, base) {
    try {
      return wat instanceof base;
    } catch (_e) {
      return false;
    }
  }

  // node_modules/@sentry/utils/esm/browser.js
  function htmlTreeAsString(elem) {
    try {
      var currentElem = elem;
      var MAX_TRAVERSE_HEIGHT = 5;
      var MAX_OUTPUT_LEN = 80;
      var out = [];
      var height = 0;
      var len = 0;
      var separator = " > ";
      var sepLength = separator.length;
      var nextStr = void 0;
      while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
        nextStr = _htmlElementAsString(currentElem);
        if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN) {
          break;
        }
        out.push(nextStr);
        len += nextStr.length;
        currentElem = currentElem.parentNode;
      }
      return out.reverse().join(separator);
    } catch (_oO) {
      return "<unknown>";
    }
  }
  function _htmlElementAsString(el) {
    var elem = el;
    var out = [];
    var className;
    var classes;
    var key;
    var attr;
    var i;
    if (!elem || !elem.tagName) {
      return "";
    }
    out.push(elem.tagName.toLowerCase());
    if (elem.id) {
      out.push("#" + elem.id);
    }
    className = elem.className;
    if (className && isString(className)) {
      classes = className.split(/\s+/);
      for (i = 0; i < classes.length; i++) {
        out.push("." + classes[i]);
      }
    }
    var allowedAttrs = ["type", "name", "title", "alt"];
    for (i = 0; i < allowedAttrs.length; i++) {
      key = allowedAttrs[i];
      attr = elem.getAttribute(key);
      if (attr) {
        out.push("[" + key + '="' + attr + '"]');
      }
    }
    return out.join("");
  }

  // node_modules/@sentry/utils/esm/polyfill.js
  var setPrototypeOf = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
  function setProtoOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }
  function mixinProperties(obj, proto) {
    for (var prop in proto) {
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = proto[prop];
      }
    }
    return obj;
  }

  // node_modules/@sentry/utils/esm/error.js
  var SentryError = (
    /** @class */
    function(_super) {
      __extends(SentryError2, _super);
      function SentryError2(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = _newTarget.prototype.constructor.name;
        setPrototypeOf(_this, _newTarget.prototype);
        return _this;
      }
      return SentryError2;
    }(Error)
  );

  // node_modules/@sentry/utils/esm/dsn.js
  var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
  var ERROR_MESSAGE = "Invalid Dsn";
  var Dsn = (
    /** @class */
    function() {
      function Dsn2(from) {
        if (typeof from === "string") {
          this._fromString(from);
        } else {
          this._fromComponents(from);
        }
        this._validate();
      }
      Dsn2.prototype.toString = function(withPassword) {
        if (withPassword === void 0) {
          withPassword = false;
        }
        var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId, protocol = _a.protocol, user = _a.user;
        return protocol + "://" + user + (withPassword && pass ? ":" + pass : "") + ("@" + host + (port ? ":" + port : "") + "/" + (path ? path + "/" : path) + projectId);
      };
      Dsn2.prototype._fromString = function(str) {
        var match = DSN_REGEX.exec(str);
        if (!match) {
          throw new SentryError(ERROR_MESSAGE);
        }
        var _a = __read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = _b === void 0 ? "" : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? "" : _c, lastPath = _a[5];
        var path = "";
        var projectId = lastPath;
        var split = projectId.split("/");
        if (split.length > 1) {
          path = split.slice(0, -1).join("/");
          projectId = split.pop();
        }
        if (projectId) {
          var projectMatch = projectId.match(/^\d+/);
          if (projectMatch) {
            projectId = projectMatch[0];
          }
        }
        this._fromComponents({ host, pass, path, projectId, port, protocol, user });
      };
      Dsn2.prototype._fromComponents = function(components) {
        this.protocol = components.protocol;
        this.user = components.user;
        this.pass = components.pass || "";
        this.host = components.host;
        this.port = components.port || "";
        this.path = components.path || "";
        this.projectId = components.projectId;
      };
      Dsn2.prototype._validate = function() {
        var _this = this;
        ["protocol", "user", "host", "projectId"].forEach(function(component) {
          if (!_this[component]) {
            throw new SentryError(ERROR_MESSAGE + ": " + component + " missing");
          }
        });
        if (!this.projectId.match(/^\d+$/)) {
          throw new SentryError(ERROR_MESSAGE + ": Invalid projectId " + this.projectId);
        }
        if (this.protocol !== "http" && this.protocol !== "https") {
          throw new SentryError(ERROR_MESSAGE + ": Invalid protocol " + this.protocol);
        }
        if (this.port && isNaN(parseInt(this.port, 10))) {
          throw new SentryError(ERROR_MESSAGE + ": Invalid port " + this.port);
        }
      };
      return Dsn2;
    }()
  );

  // node_modules/@sentry/utils/esm/memo.js
  var Memo = (
    /** @class */
    function() {
      function Memo2() {
        this._hasWeakSet = typeof WeakSet === "function";
        this._inner = this._hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
      }
      Memo2.prototype.memoize = function(obj) {
        if (this._hasWeakSet) {
          if (this._inner.has(obj)) {
            return true;
          }
          this._inner.add(obj);
          return false;
        }
        for (var i = 0; i < this._inner.length; i++) {
          var value = this._inner[i];
          if (value === obj) {
            return true;
          }
        }
        this._inner.push(obj);
        return false;
      };
      Memo2.prototype.unmemoize = function(obj) {
        if (this._hasWeakSet) {
          this._inner.delete(obj);
        } else {
          for (var i = 0; i < this._inner.length; i++) {
            if (this._inner[i] === obj) {
              this._inner.splice(i, 1);
              break;
            }
          }
        }
      };
      return Memo2;
    }()
  );

  // node_modules/@sentry/utils/esm/stacktrace.js
  var defaultFunctionName = "<anonymous>";
  function getFunctionName(fn) {
    try {
      if (!fn || typeof fn !== "function") {
        return defaultFunctionName;
      }
      return fn.name || defaultFunctionName;
    } catch (e) {
      return defaultFunctionName;
    }
  }

  // node_modules/@sentry/utils/esm/string.js
  function truncate(str, max) {
    if (max === void 0) {
      max = 0;
    }
    if (typeof str !== "string" || max === 0) {
      return str;
    }
    return str.length <= max ? str : str.substr(0, max) + "...";
  }
  function safeJoin(input, delimiter) {
    if (!Array.isArray(input)) {
      return "";
    }
    var output = [];
    for (var i = 0; i < input.length; i++) {
      var value = input[i];
      try {
        output.push(String(value));
      } catch (e) {
        output.push("[value cannot be serialized]");
      }
    }
    return output.join(delimiter);
  }
  function isMatchingPattern(value, pattern) {
    if (!isString(value)) {
      return false;
    }
    if (isRegExp(pattern)) {
      return pattern.test(value);
    }
    if (typeof pattern === "string") {
      return value.indexOf(pattern) !== -1;
    }
    return false;
  }

  // node_modules/@sentry/utils/esm/object.js
  function fill(source, name, replacementFactory) {
    if (!(name in source)) {
      return;
    }
    var original = source[name];
    var wrapped = replacementFactory(original);
    if (typeof wrapped === "function") {
      try {
        wrapped.prototype = wrapped.prototype || {};
        Object.defineProperties(wrapped, {
          __sentry_original__: {
            enumerable: false,
            value: original
          }
        });
      } catch (_Oo) {
      }
    }
    source[name] = wrapped;
  }
  function urlEncode(object) {
    return Object.keys(object).map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    }).join("&");
  }
  function getWalkSource(value) {
    if (isError(value)) {
      var error = value;
      var err = {
        message: error.message,
        name: error.name,
        stack: error.stack
      };
      for (var i in error) {
        if (Object.prototype.hasOwnProperty.call(error, i)) {
          err[i] = error[i];
        }
      }
      return err;
    }
    if (isEvent(value)) {
      var event_1 = value;
      var source = {};
      source.type = event_1.type;
      try {
        source.target = isElement(event_1.target) ? htmlTreeAsString(event_1.target) : Object.prototype.toString.call(event_1.target);
      } catch (_oO) {
        source.target = "<unknown>";
      }
      try {
        source.currentTarget = isElement(event_1.currentTarget) ? htmlTreeAsString(event_1.currentTarget) : Object.prototype.toString.call(event_1.currentTarget);
      } catch (_oO) {
        source.currentTarget = "<unknown>";
      }
      if (typeof CustomEvent !== "undefined" && isInstanceOf(value, CustomEvent)) {
        source.detail = event_1.detail;
      }
      for (var i in event_1) {
        if (Object.prototype.hasOwnProperty.call(event_1, i)) {
          source[i] = event_1;
        }
      }
      return source;
    }
    return value;
  }
  function utf8Length(value) {
    return ~-encodeURI(value).split(/%..|./).length;
  }
  function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
  }
  function normalizeToSize(object, depth, maxSize) {
    if (depth === void 0) {
      depth = 3;
    }
    if (maxSize === void 0) {
      maxSize = 100 * 1024;
    }
    var serialized = normalize(object, depth);
    if (jsonSize(serialized) > maxSize) {
      return normalizeToSize(object, depth - 1, maxSize);
    }
    return serialized;
  }
  function serializeValue(value) {
    var type = Object.prototype.toString.call(value);
    if (typeof value === "string") {
      return value;
    }
    if (type === "[object Object]") {
      return "[Object]";
    }
    if (type === "[object Array]") {
      return "[Array]";
    }
    var normalized = normalizeValue(value);
    return isPrimitive(normalized) ? normalized : type;
  }
  function normalizeValue(value, key) {
    if (key === "domain" && value && typeof value === "object" && value._events) {
      return "[Domain]";
    }
    if (key === "domainEmitter") {
      return "[DomainEmitter]";
    }
    if (typeof global !== "undefined" && value === global) {
      return "[Global]";
    }
    if (typeof window !== "undefined" && value === window) {
      return "[Window]";
    }
    if (typeof document !== "undefined" && value === document) {
      return "[Document]";
    }
    if (isSyntheticEvent(value)) {
      return "[SyntheticEvent]";
    }
    if (typeof value === "number" && value !== value) {
      return "[NaN]";
    }
    if (value === void 0) {
      return "[undefined]";
    }
    if (typeof value === "function") {
      return "[Function: " + getFunctionName(value) + "]";
    }
    if (typeof value === "symbol") {
      return "[" + String(value) + "]";
    }
    if (typeof value === "bigint") {
      return "[BigInt: " + String(value) + "]";
    }
    return value;
  }
  function walk(key, value, depth, memo) {
    if (depth === void 0) {
      depth = Infinity;
    }
    if (memo === void 0) {
      memo = new Memo();
    }
    if (depth === 0) {
      return serializeValue(value);
    }
    if (value !== null && value !== void 0 && typeof value.toJSON === "function") {
      return value.toJSON();
    }
    var normalized = normalizeValue(value, key);
    if (isPrimitive(normalized)) {
      return normalized;
    }
    var source = getWalkSource(value);
    var acc = Array.isArray(value) ? [] : {};
    if (memo.memoize(value)) {
      return "[Circular ~]";
    }
    for (var innerKey in source) {
      if (!Object.prototype.hasOwnProperty.call(source, innerKey)) {
        continue;
      }
      acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo);
    }
    memo.unmemoize(value);
    return acc;
  }
  function normalize(input, depth) {
    try {
      return JSON.parse(JSON.stringify(input, function(key, value) {
        return walk(key, value, depth);
      }));
    } catch (_oO) {
      return "**non-serializable**";
    }
  }
  function extractExceptionKeysForMessage(exception, maxLength) {
    if (maxLength === void 0) {
      maxLength = 40;
    }
    var keys = Object.keys(getWalkSource(exception));
    keys.sort();
    if (!keys.length) {
      return "[object has no keys]";
    }
    if (keys[0].length >= maxLength) {
      return truncate(keys[0], maxLength);
    }
    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
      var serialized = keys.slice(0, includedKeys).join(", ");
      if (serialized.length > maxLength) {
        continue;
      }
      if (includedKeys === keys.length) {
        return serialized;
      }
      return truncate(serialized, maxLength);
    }
    return "";
  }
  function dropUndefinedKeys(val) {
    var e_1, _a;
    if (isPlainObject(val)) {
      var obj = val;
      var rv = {};
      try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          if (typeof obj[key] !== "undefined") {
            rv[key] = dropUndefinedKeys(obj[key]);
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return rv;
    }
    if (Array.isArray(val)) {
      return val.map(dropUndefinedKeys);
    }
    return val;
  }

  // node_modules/@sentry/utils/esm/node.js
  function isNodeEnv() {
    return Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
  }
  function dynamicRequire(mod, request) {
    return mod.require(request);
  }

  // node_modules/@sentry/utils/esm/misc.js
  var fallbackGlobalObject = {};
  function getGlobalObject() {
    return isNodeEnv() ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : fallbackGlobalObject;
  }
  function uuid4() {
    var global6 = getGlobalObject();
    var crypto = global6.crypto || global6.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
      var arr = new Uint16Array(8);
      crypto.getRandomValues(arr);
      arr[3] = arr[3] & 4095 | 16384;
      arr[4] = arr[4] & 16383 | 32768;
      var pad = function(num) {
        var v = num.toString(16);
        while (v.length < 4) {
          v = "0" + v;
        }
        return v;
      };
      return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
    }
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  function parseUrl(url) {
    if (!url) {
      return {};
    }
    var match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
      return {};
    }
    var query = match[6] || "";
    var fragment = match[8] || "";
    return {
      host: match[4],
      path: match[5],
      protocol: match[2],
      relative: match[5] + query + fragment
    };
  }
  function getEventDescription(event) {
    if (event.message) {
      return event.message;
    }
    if (event.exception && event.exception.values && event.exception.values[0]) {
      var exception = event.exception.values[0];
      if (exception.type && exception.value) {
        return exception.type + ": " + exception.value;
      }
      return exception.type || exception.value || event.event_id || "<unknown>";
    }
    return event.event_id || "<unknown>";
  }
  function consoleSandbox(callback) {
    var global6 = getGlobalObject();
    var levels = ["debug", "info", "warn", "error", "log", "assert"];
    if (!("console" in global6)) {
      return callback();
    }
    var originalConsole = global6.console;
    var wrappedLevels = {};
    levels.forEach(function(level) {
      if (level in global6.console && originalConsole[level].__sentry_original__) {
        wrappedLevels[level] = originalConsole[level];
        originalConsole[level] = originalConsole[level].__sentry_original__;
      }
    });
    var result = callback();
    Object.keys(wrappedLevels).forEach(function(level) {
      originalConsole[level] = wrappedLevels[level];
    });
    return result;
  }
  function addExceptionTypeValue(event, value, type) {
    event.exception = event.exception || {};
    event.exception.values = event.exception.values || [];
    event.exception.values[0] = event.exception.values[0] || {};
    event.exception.values[0].value = event.exception.values[0].value || value || "";
    event.exception.values[0].type = event.exception.values[0].type || type || "Error";
  }
  function addExceptionMechanism(event, mechanism) {
    if (mechanism === void 0) {
      mechanism = {};
    }
    try {
      event.exception.values[0].mechanism = event.exception.values[0].mechanism || {};
      Object.keys(mechanism).forEach(function(key) {
        event.exception.values[0].mechanism[key] = mechanism[key];
      });
    } catch (_oO) {
    }
  }
  function getLocationHref() {
    try {
      return document.location.href;
    } catch (oO) {
      return "";
    }
  }
  var defaultRetryAfter = 60 * 1e3;
  function parseRetryAfterHeader(now, header) {
    if (!header) {
      return defaultRetryAfter;
    }
    var headerDelay = parseInt("" + header, 10);
    if (!isNaN(headerDelay)) {
      return headerDelay * 1e3;
    }
    var headerDate = Date.parse("" + header);
    if (!isNaN(headerDate)) {
      return headerDate - now;
    }
    return defaultRetryAfter;
  }

  // node_modules/@sentry/utils/esm/logger.js
  var global2 = getGlobalObject();
  var PREFIX = "Sentry Logger ";
  var Logger = (
    /** @class */
    function() {
      function Logger2() {
        this._enabled = false;
      }
      Logger2.prototype.disable = function() {
        this._enabled = false;
      };
      Logger2.prototype.enable = function() {
        this._enabled = true;
      };
      Logger2.prototype.log = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!this._enabled) {
          return;
        }
        consoleSandbox(function() {
          global2.console.log(PREFIX + "[Log]: " + args.join(" "));
        });
      };
      Logger2.prototype.warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!this._enabled) {
          return;
        }
        consoleSandbox(function() {
          global2.console.warn(PREFIX + "[Warn]: " + args.join(" "));
        });
      };
      Logger2.prototype.error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!this._enabled) {
          return;
        }
        consoleSandbox(function() {
          global2.console.error(PREFIX + "[Error]: " + args.join(" "));
        });
      };
      return Logger2;
    }()
  );
  global2.__SENTRY__ = global2.__SENTRY__ || {};
  var logger = global2.__SENTRY__.logger || (global2.__SENTRY__.logger = new Logger());

  // node_modules/@sentry/utils/esm/supports.js
  function supportsFetch() {
    if (!("fetch" in getGlobalObject())) {
      return false;
    }
    try {
      new Headers();
      new Request("");
      new Response();
      return true;
    } catch (e) {
      return false;
    }
  }
  function isNativeFetch(func) {
    return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
  }
  function supportsNativeFetch() {
    if (!supportsFetch()) {
      return false;
    }
    var global6 = getGlobalObject();
    if (isNativeFetch(global6.fetch)) {
      return true;
    }
    var result = false;
    var doc = global6.document;
    if (doc && typeof doc.createElement === "function") {
      try {
        var sandbox = doc.createElement("iframe");
        sandbox.hidden = true;
        doc.head.appendChild(sandbox);
        if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
          result = isNativeFetch(sandbox.contentWindow.fetch);
        }
        doc.head.removeChild(sandbox);
      } catch (err) {
        logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
      }
    }
    return result;
  }
  function supportsReferrerPolicy() {
    if (!supportsFetch()) {
      return false;
    }
    try {
      new Request("_", {
        referrerPolicy: "origin"
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  function supportsHistory() {
    var global6 = getGlobalObject();
    var chrome3 = global6.chrome;
    var isChromePackagedApp = chrome3 && chrome3.app && chrome3.app.runtime;
    var hasHistoryApi = "history" in global6 && !!global6.history.pushState && !!global6.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
  }

  // node_modules/@sentry/utils/esm/instrument.js
  var global3 = getGlobalObject();
  var handlers = {};
  var instrumented = {};
  function instrument(type) {
    if (instrumented[type]) {
      return;
    }
    instrumented[type] = true;
    switch (type) {
      case "console":
        instrumentConsole();
        break;
      case "dom":
        instrumentDOM();
        break;
      case "xhr":
        instrumentXHR();
        break;
      case "fetch":
        instrumentFetch();
        break;
      case "history":
        instrumentHistory();
        break;
      case "error":
        instrumentError();
        break;
      case "unhandledrejection":
        instrumentUnhandledRejection();
        break;
      default:
        logger.warn("unknown instrumentation type:", type);
    }
  }
  function addInstrumentationHandler(handler) {
    if (!handler || typeof handler.type !== "string" || typeof handler.callback !== "function") {
      return;
    }
    handlers[handler.type] = handlers[handler.type] || [];
    handlers[handler.type].push(handler.callback);
    instrument(handler.type);
  }
  function triggerHandlers(type, data) {
    var e_1, _a;
    if (!type || !handlers[type]) {
      return;
    }
    try {
      for (var _b = __values(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
        var handler = _c.value;
        try {
          handler(data);
        } catch (e) {
          logger.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + getFunctionName(handler) + "\nError: " + e);
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  }
  function instrumentConsole() {
    if (!("console" in global3)) {
      return;
    }
    ["debug", "info", "warn", "error", "log", "assert"].forEach(function(level) {
      if (!(level in global3.console)) {
        return;
      }
      fill(global3.console, level, function(originalConsoleLevel) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          triggerHandlers("console", { args, level });
          if (originalConsoleLevel) {
            Function.prototype.apply.call(originalConsoleLevel, global3.console, args);
          }
        };
      });
    });
  }
  function instrumentFetch() {
    if (!supportsNativeFetch()) {
      return;
    }
    fill(global3, "fetch", function(originalFetch) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var handlerData = {
          args,
          fetchData: {
            method: getFetchMethod(args),
            url: getFetchUrl(args)
          },
          startTimestamp: Date.now()
        };
        triggerHandlers("fetch", __assign({}, handlerData));
        return originalFetch.apply(global3, args).then(function(response) {
          triggerHandlers("fetch", __assign(__assign({}, handlerData), { endTimestamp: Date.now(), response }));
          return response;
        }, function(error) {
          triggerHandlers("fetch", __assign(__assign({}, handlerData), { endTimestamp: Date.now(), error }));
          throw error;
        });
      };
    });
  }
  function getFetchMethod(fetchArgs) {
    if (fetchArgs === void 0) {
      fetchArgs = [];
    }
    if ("Request" in global3 && isInstanceOf(fetchArgs[0], Request) && fetchArgs[0].method) {
      return String(fetchArgs[0].method).toUpperCase();
    }
    if (fetchArgs[1] && fetchArgs[1].method) {
      return String(fetchArgs[1].method).toUpperCase();
    }
    return "GET";
  }
  function getFetchUrl(fetchArgs) {
    if (fetchArgs === void 0) {
      fetchArgs = [];
    }
    if (typeof fetchArgs[0] === "string") {
      return fetchArgs[0];
    }
    if ("Request" in global3 && isInstanceOf(fetchArgs[0], Request)) {
      return fetchArgs[0].url;
    }
    return String(fetchArgs[0]);
  }
  function instrumentXHR() {
    if (!("XMLHttpRequest" in global3)) {
      return;
    }
    var requestKeys = [];
    var requestValues = [];
    var xhrproto = XMLHttpRequest.prototype;
    fill(xhrproto, "open", function(originalOpen) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var xhr = this;
        var url = args[1];
        xhr.__sentry_xhr__ = {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          method: isString(args[0]) ? args[0].toUpperCase() : args[0],
          url: args[1]
        };
        if (isString(url) && xhr.__sentry_xhr__.method === "POST" && url.match(/sentry_key/)) {
          xhr.__sentry_own_request__ = true;
        }
        var onreadystatechangeHandler = function() {
          if (xhr.readyState === 4) {
            try {
              if (xhr.__sentry_xhr__) {
                xhr.__sentry_xhr__.status_code = xhr.status;
              }
            } catch (e) {
            }
            try {
              var requestPos = requestKeys.indexOf(xhr);
              if (requestPos !== -1) {
                requestKeys.splice(requestPos);
                var args_1 = requestValues.splice(requestPos)[0];
                if (xhr.__sentry_xhr__ && args_1[0] !== void 0) {
                  xhr.__sentry_xhr__.body = args_1[0];
                }
              }
            } catch (e) {
            }
            triggerHandlers("xhr", {
              args,
              endTimestamp: Date.now(),
              startTimestamp: Date.now(),
              xhr
            });
          }
        };
        if ("onreadystatechange" in xhr && typeof xhr.onreadystatechange === "function") {
          fill(xhr, "onreadystatechange", function(original) {
            return function() {
              var readyStateArgs = [];
              for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                readyStateArgs[_i2] = arguments[_i2];
              }
              onreadystatechangeHandler();
              return original.apply(xhr, readyStateArgs);
            };
          });
        } else {
          xhr.addEventListener("readystatechange", onreadystatechangeHandler);
        }
        return originalOpen.apply(xhr, args);
      };
    });
    fill(xhrproto, "send", function(originalSend) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        requestKeys.push(this);
        requestValues.push(args);
        triggerHandlers("xhr", {
          args,
          startTimestamp: Date.now(),
          xhr: this
        });
        return originalSend.apply(this, args);
      };
    });
  }
  var lastHref;
  function instrumentHistory() {
    if (!supportsHistory()) {
      return;
    }
    var oldOnPopState = global3.onpopstate;
    global3.onpopstate = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var to = global3.location.href;
      var from = lastHref;
      lastHref = to;
      triggerHandlers("history", {
        from,
        to
      });
      if (oldOnPopState) {
        return oldOnPopState.apply(this, args);
      }
    };
    function historyReplacementFunction(originalHistoryFunction) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var url = args.length > 2 ? args[2] : void 0;
        if (url) {
          var from = lastHref;
          var to = String(url);
          lastHref = to;
          triggerHandlers("history", {
            from,
            to
          });
        }
        return originalHistoryFunction.apply(this, args);
      };
    }
    fill(global3.history, "pushState", historyReplacementFunction);
    fill(global3.history, "replaceState", historyReplacementFunction);
  }
  function instrumentDOM() {
    if (!("document" in global3)) {
      return;
    }
    global3.document.addEventListener("click", domEventHandler("click", triggerHandlers.bind(null, "dom")), false);
    global3.document.addEventListener("keypress", keypressEventHandler(triggerHandlers.bind(null, "dom")), false);
    ["EventTarget", "Node"].forEach(function(target) {
      var proto = global3[target] && global3[target].prototype;
      if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
        return;
      }
      fill(proto, "addEventListener", function(original) {
        return function(eventName, fn, options) {
          if (fn && fn.handleEvent) {
            if (eventName === "click") {
              fill(fn, "handleEvent", function(innerOriginal) {
                return function(event) {
                  domEventHandler("click", triggerHandlers.bind(null, "dom"))(event);
                  return innerOriginal.call(this, event);
                };
              });
            }
            if (eventName === "keypress") {
              fill(fn, "handleEvent", function(innerOriginal) {
                return function(event) {
                  keypressEventHandler(triggerHandlers.bind(null, "dom"))(event);
                  return innerOriginal.call(this, event);
                };
              });
            }
          } else {
            if (eventName === "click") {
              domEventHandler("click", triggerHandlers.bind(null, "dom"), true)(this);
            }
            if (eventName === "keypress") {
              keypressEventHandler(triggerHandlers.bind(null, "dom"))(this);
            }
          }
          return original.call(this, eventName, fn, options);
        };
      });
      fill(proto, "removeEventListener", function(original) {
        return function(eventName, fn, options) {
          try {
            original.call(this, eventName, fn.__sentry_wrapped__, options);
          } catch (e) {
          }
          return original.call(this, eventName, fn, options);
        };
      });
    });
  }
  var debounceDuration = 1e3;
  var debounceTimer = 0;
  var keypressTimeout;
  var lastCapturedEvent;
  function domEventHandler(name, handler, debounce) {
    if (debounce === void 0) {
      debounce = false;
    }
    return function(event) {
      keypressTimeout = void 0;
      if (!event || lastCapturedEvent === event) {
        return;
      }
      lastCapturedEvent = event;
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      if (debounce) {
        debounceTimer = setTimeout(function() {
          handler({ event, name });
        });
      } else {
        handler({ event, name });
      }
    };
  }
  function keypressEventHandler(handler) {
    return function(event) {
      var target;
      try {
        target = event.target;
      } catch (e) {
        return;
      }
      var tagName = target && target.tagName;
      if (!tagName || tagName !== "INPUT" && tagName !== "TEXTAREA" && !target.isContentEditable) {
        return;
      }
      if (!keypressTimeout) {
        domEventHandler("input", handler)(event);
      }
      clearTimeout(keypressTimeout);
      keypressTimeout = setTimeout(function() {
        keypressTimeout = void 0;
      }, debounceDuration);
    };
  }
  var _oldOnErrorHandler = null;
  function instrumentError() {
    _oldOnErrorHandler = global3.onerror;
    global3.onerror = function(msg, url, line, column, error) {
      triggerHandlers("error", {
        column,
        error,
        line,
        msg,
        url
      });
      if (_oldOnErrorHandler) {
        return _oldOnErrorHandler.apply(this, arguments);
      }
      return false;
    };
  }
  var _oldOnUnhandledRejectionHandler = null;
  function instrumentUnhandledRejection() {
    _oldOnUnhandledRejectionHandler = global3.onunhandledrejection;
    global3.onunhandledrejection = function(e) {
      triggerHandlers("unhandledrejection", e);
      if (_oldOnUnhandledRejectionHandler) {
        return _oldOnUnhandledRejectionHandler.apply(this, arguments);
      }
      return true;
    };
  }

  // node_modules/@sentry/utils/esm/syncpromise.js
  var States;
  (function(States2) {
    States2["PENDING"] = "PENDING";
    States2["RESOLVED"] = "RESOLVED";
    States2["REJECTED"] = "REJECTED";
  })(States || (States = {}));
  var SyncPromise = (
    /** @class */
    function() {
      function SyncPromise2(executor) {
        var _this = this;
        this._state = States.PENDING;
        this._handlers = [];
        this._resolve = function(value) {
          _this._setResult(States.RESOLVED, value);
        };
        this._reject = function(reason) {
          _this._setResult(States.REJECTED, reason);
        };
        this._setResult = function(state, value) {
          if (_this._state !== States.PENDING) {
            return;
          }
          if (isThenable(value)) {
            value.then(_this._resolve, _this._reject);
            return;
          }
          _this._state = state;
          _this._value = value;
          _this._executeHandlers();
        };
        this._attachHandler = function(handler) {
          _this._handlers = _this._handlers.concat(handler);
          _this._executeHandlers();
        };
        this._executeHandlers = function() {
          if (_this._state === States.PENDING) {
            return;
          }
          var cachedHandlers = _this._handlers.slice();
          _this._handlers = [];
          cachedHandlers.forEach(function(handler) {
            if (handler.done) {
              return;
            }
            if (_this._state === States.RESOLVED) {
              if (handler.onfulfilled) {
                handler.onfulfilled(_this._value);
              }
            }
            if (_this._state === States.REJECTED) {
              if (handler.onrejected) {
                handler.onrejected(_this._value);
              }
            }
            handler.done = true;
          });
        };
        try {
          executor(this._resolve, this._reject);
        } catch (e) {
          this._reject(e);
        }
      }
      SyncPromise2.resolve = function(value) {
        return new SyncPromise2(function(resolve) {
          resolve(value);
        });
      };
      SyncPromise2.reject = function(reason) {
        return new SyncPromise2(function(_, reject) {
          reject(reason);
        });
      };
      SyncPromise2.all = function(collection) {
        return new SyncPromise2(function(resolve, reject) {
          if (!Array.isArray(collection)) {
            reject(new TypeError("Promise.all requires an array as input."));
            return;
          }
          if (collection.length === 0) {
            resolve([]);
            return;
          }
          var counter = collection.length;
          var resolvedCollection = [];
          collection.forEach(function(item, index) {
            SyncPromise2.resolve(item).then(function(value) {
              resolvedCollection[index] = value;
              counter -= 1;
              if (counter !== 0) {
                return;
              }
              resolve(resolvedCollection);
            }).then(null, reject);
          });
        });
      };
      SyncPromise2.prototype.then = function(onfulfilled, onrejected) {
        var _this = this;
        return new SyncPromise2(function(resolve, reject) {
          _this._attachHandler({
            done: false,
            onfulfilled: function(result) {
              if (!onfulfilled) {
                resolve(result);
                return;
              }
              try {
                resolve(onfulfilled(result));
                return;
              } catch (e) {
                reject(e);
                return;
              }
            },
            onrejected: function(reason) {
              if (!onrejected) {
                reject(reason);
                return;
              }
              try {
                resolve(onrejected(reason));
                return;
              } catch (e) {
                reject(e);
                return;
              }
            }
          });
        });
      };
      SyncPromise2.prototype.catch = function(onrejected) {
        return this.then(function(val) {
          return val;
        }, onrejected);
      };
      SyncPromise2.prototype.finally = function(onfinally) {
        var _this = this;
        return new SyncPromise2(function(resolve, reject) {
          var val;
          var isRejected;
          return _this.then(function(value) {
            isRejected = false;
            val = value;
            if (onfinally) {
              onfinally();
            }
          }, function(reason) {
            isRejected = true;
            val = reason;
            if (onfinally) {
              onfinally();
            }
          }).then(function() {
            if (isRejected) {
              reject(val);
              return;
            }
            resolve(val);
          });
        });
      };
      SyncPromise2.prototype.toString = function() {
        return "[object SyncPromise]";
      };
      return SyncPromise2;
    }()
  );

  // node_modules/@sentry/utils/esm/promisebuffer.js
  var PromiseBuffer = (
    /** @class */
    function() {
      function PromiseBuffer2(_limit) {
        this._limit = _limit;
        this._buffer = [];
      }
      PromiseBuffer2.prototype.isReady = function() {
        return this._limit === void 0 || this.length() < this._limit;
      };
      PromiseBuffer2.prototype.add = function(task) {
        var _this = this;
        if (!this.isReady()) {
          return SyncPromise.reject(new SentryError("Not adding Promise due to buffer limit reached."));
        }
        if (this._buffer.indexOf(task) === -1) {
          this._buffer.push(task);
        }
        task.then(function() {
          return _this.remove(task);
        }).then(null, function() {
          return _this.remove(task).then(null, function() {
          });
        });
        return task;
      };
      PromiseBuffer2.prototype.remove = function(task) {
        var removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];
        return removedTask;
      };
      PromiseBuffer2.prototype.length = function() {
        return this._buffer.length;
      };
      PromiseBuffer2.prototype.drain = function(timeout) {
        var _this = this;
        return new SyncPromise(function(resolve) {
          var capturedSetTimeout = setTimeout(function() {
            if (timeout && timeout > 0) {
              resolve(false);
            }
          }, timeout);
          SyncPromise.all(_this._buffer).then(function() {
            clearTimeout(capturedSetTimeout);
            resolve(true);
          }).then(null, function() {
            resolve(true);
          });
        });
      };
      return PromiseBuffer2;
    }()
  );

  // node_modules/@sentry/utils/esm/time.js
  var dateTimestampSource = {
    nowSeconds: function() {
      return Date.now() / 1e3;
    }
  };
  function getBrowserPerformance() {
    var performance = getGlobalObject().performance;
    if (!performance || !performance.now) {
      return void 0;
    }
    var timeOrigin = Date.now() - performance.now();
    return {
      now: function() {
        return performance.now();
      },
      timeOrigin
    };
  }
  function getNodePerformance() {
    try {
      var perfHooks = dynamicRequire(module, "perf_hooks");
      return perfHooks.performance;
    } catch (_) {
      return void 0;
    }
  }
  var platformPerformance = isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
  var timestampSource = platformPerformance === void 0 ? dateTimestampSource : {
    nowSeconds: function() {
      return (platformPerformance.timeOrigin + platformPerformance.now()) / 1e3;
    }
  };
  var dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
  var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
  var browserPerformanceTimeOrigin = function() {
    var performance = getGlobalObject().performance;
    if (!performance) {
      return void 0;
    }
    if (performance.timeOrigin) {
      return performance.timeOrigin;
    }
    return performance.timing && performance.timing.navigationStart || Date.now();
  }();

  // node_modules/@sentry/hub/esm/scope.js
  var Scope = (
    /** @class */
    function() {
      function Scope2() {
        this._notifyingListeners = false;
        this._scopeListeners = [];
        this._eventProcessors = [];
        this._breadcrumbs = [];
        this._user = {};
        this._tags = {};
        this._extra = {};
        this._contexts = {};
      }
      Scope2.clone = function(scope) {
        var newScope = new Scope2();
        if (scope) {
          newScope._breadcrumbs = __spread(scope._breadcrumbs);
          newScope._tags = __assign({}, scope._tags);
          newScope._extra = __assign({}, scope._extra);
          newScope._contexts = __assign({}, scope._contexts);
          newScope._user = scope._user;
          newScope._level = scope._level;
          newScope._span = scope._span;
          newScope._session = scope._session;
          newScope._transactionName = scope._transactionName;
          newScope._fingerprint = scope._fingerprint;
          newScope._eventProcessors = __spread(scope._eventProcessors);
        }
        return newScope;
      };
      Scope2.prototype.addScopeListener = function(callback) {
        this._scopeListeners.push(callback);
      };
      Scope2.prototype.addEventProcessor = function(callback) {
        this._eventProcessors.push(callback);
        return this;
      };
      Scope2.prototype.setUser = function(user) {
        this._user = user || {};
        if (this._session) {
          this._session.update({ user });
        }
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.getUser = function() {
        return this._user;
      };
      Scope2.prototype.setTags = function(tags) {
        this._tags = __assign(__assign({}, this._tags), tags);
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setTag = function(key, value) {
        var _a;
        this._tags = __assign(__assign({}, this._tags), (_a = {}, _a[key] = value, _a));
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setExtras = function(extras) {
        this._extra = __assign(__assign({}, this._extra), extras);
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setExtra = function(key, extra) {
        var _a;
        this._extra = __assign(__assign({}, this._extra), (_a = {}, _a[key] = extra, _a));
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setFingerprint = function(fingerprint) {
        this._fingerprint = fingerprint;
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setLevel = function(level) {
        this._level = level;
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setTransactionName = function(name) {
        this._transactionName = name;
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setTransaction = function(name) {
        return this.setTransactionName(name);
      };
      Scope2.prototype.setContext = function(key, context) {
        var _a;
        if (context === null) {
          delete this._contexts[key];
        } else {
          this._contexts = __assign(__assign({}, this._contexts), (_a = {}, _a[key] = context, _a));
        }
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.setSpan = function(span) {
        this._span = span;
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.getSpan = function() {
        return this._span;
      };
      Scope2.prototype.getTransaction = function() {
        var _a, _b, _c, _d;
        var span = this.getSpan();
        if ((_a = span) === null || _a === void 0 ? void 0 : _a.transaction) {
          return (_b = span) === null || _b === void 0 ? void 0 : _b.transaction;
        }
        if ((_d = (_c = span) === null || _c === void 0 ? void 0 : _c.spanRecorder) === null || _d === void 0 ? void 0 : _d.spans[0]) {
          return span.spanRecorder.spans[0];
        }
        return void 0;
      };
      Scope2.prototype.setSession = function(session) {
        if (!session) {
          delete this._session;
        } else {
          this._session = session;
        }
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.getSession = function() {
        return this._session;
      };
      Scope2.prototype.update = function(captureContext) {
        if (!captureContext) {
          return this;
        }
        if (typeof captureContext === "function") {
          var updatedScope = captureContext(this);
          return updatedScope instanceof Scope2 ? updatedScope : this;
        }
        if (captureContext instanceof Scope2) {
          this._tags = __assign(__assign({}, this._tags), captureContext._tags);
          this._extra = __assign(__assign({}, this._extra), captureContext._extra);
          this._contexts = __assign(__assign({}, this._contexts), captureContext._contexts);
          if (captureContext._user && Object.keys(captureContext._user).length) {
            this._user = captureContext._user;
          }
          if (captureContext._level) {
            this._level = captureContext._level;
          }
          if (captureContext._fingerprint) {
            this._fingerprint = captureContext._fingerprint;
          }
        } else if (isPlainObject(captureContext)) {
          captureContext = captureContext;
          this._tags = __assign(__assign({}, this._tags), captureContext.tags);
          this._extra = __assign(__assign({}, this._extra), captureContext.extra);
          this._contexts = __assign(__assign({}, this._contexts), captureContext.contexts);
          if (captureContext.user) {
            this._user = captureContext.user;
          }
          if (captureContext.level) {
            this._level = captureContext.level;
          }
          if (captureContext.fingerprint) {
            this._fingerprint = captureContext.fingerprint;
          }
        }
        return this;
      };
      Scope2.prototype.clear = function() {
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = void 0;
        this._transactionName = void 0;
        this._fingerprint = void 0;
        this._span = void 0;
        this._session = void 0;
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.addBreadcrumb = function(breadcrumb, maxBreadcrumbs) {
        var mergedBreadcrumb = __assign({ timestamp: dateTimestampInSeconds() }, breadcrumb);
        this._breadcrumbs = maxBreadcrumbs !== void 0 && maxBreadcrumbs >= 0 ? __spread(this._breadcrumbs, [mergedBreadcrumb]).slice(-maxBreadcrumbs) : __spread(this._breadcrumbs, [mergedBreadcrumb]);
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.clearBreadcrumbs = function() {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
      };
      Scope2.prototype.applyToEvent = function(event, hint) {
        var _a;
        if (this._extra && Object.keys(this._extra).length) {
          event.extra = __assign(__assign({}, this._extra), event.extra);
        }
        if (this._tags && Object.keys(this._tags).length) {
          event.tags = __assign(__assign({}, this._tags), event.tags);
        }
        if (this._user && Object.keys(this._user).length) {
          event.user = __assign(__assign({}, this._user), event.user);
        }
        if (this._contexts && Object.keys(this._contexts).length) {
          event.contexts = __assign(__assign({}, this._contexts), event.contexts);
        }
        if (this._level) {
          event.level = this._level;
        }
        if (this._transactionName) {
          event.transaction = this._transactionName;
        }
        if (this._span) {
          event.contexts = __assign({ trace: this._span.getTraceContext() }, event.contexts);
          var transactionName = (_a = this._span.transaction) === null || _a === void 0 ? void 0 : _a.name;
          if (transactionName) {
            event.tags = __assign({ transaction: transactionName }, event.tags);
          }
        }
        this._applyFingerprint(event);
        event.breadcrumbs = __spread(event.breadcrumbs || [], this._breadcrumbs);
        event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : void 0;
        return this._notifyEventProcessors(__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
      };
      Scope2.prototype._notifyEventProcessors = function(processors, event, hint, index) {
        var _this = this;
        if (index === void 0) {
          index = 0;
        }
        return new SyncPromise(function(resolve, reject) {
          var processor = processors[index];
          if (event === null || typeof processor !== "function") {
            resolve(event);
          } else {
            var result = processor(__assign({}, event), hint);
            if (isThenable(result)) {
              result.then(function(final) {
                return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve);
              }).then(null, reject);
            } else {
              _this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
            }
          }
        });
      };
      Scope2.prototype._notifyScopeListeners = function() {
        var _this = this;
        if (!this._notifyingListeners) {
          this._notifyingListeners = true;
          this._scopeListeners.forEach(function(callback) {
            callback(_this);
          });
          this._notifyingListeners = false;
        }
      };
      Scope2.prototype._applyFingerprint = function(event) {
        event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
        if (this._fingerprint) {
          event.fingerprint = event.fingerprint.concat(this._fingerprint);
        }
        if (event.fingerprint && !event.fingerprint.length) {
          delete event.fingerprint;
        }
      };
      return Scope2;
    }()
  );
  function getGlobalEventProcessors() {
    var global6 = getGlobalObject();
    global6.__SENTRY__ = global6.__SENTRY__ || {};
    global6.__SENTRY__.globalEventProcessors = global6.__SENTRY__.globalEventProcessors || [];
    return global6.__SENTRY__.globalEventProcessors;
  }
  function addGlobalEventProcessor(callback) {
    getGlobalEventProcessors().push(callback);
  }

  // node_modules/@sentry/hub/esm/session.js
  var Session = (
    /** @class */
    function() {
      function Session2(context) {
        this.errors = 0;
        this.sid = uuid4();
        this.timestamp = Date.now();
        this.started = Date.now();
        this.duration = 0;
        this.status = SessionStatus.Ok;
        if (context) {
          this.update(context);
        }
      }
      Session2.prototype.update = function(context) {
        if (context === void 0) {
          context = {};
        }
        if (context.user) {
          if (context.user.ip_address) {
            this.ipAddress = context.user.ip_address;
          }
          if (!context.did) {
            this.did = context.user.id || context.user.email || context.user.username;
          }
        }
        this.timestamp = context.timestamp || Date.now();
        if (context.sid) {
          this.sid = context.sid.length === 32 ? context.sid : uuid4();
        }
        if (context.did) {
          this.did = "" + context.did;
        }
        if (typeof context.started === "number") {
          this.started = context.started;
        }
        if (typeof context.duration === "number") {
          this.duration = context.duration;
        } else {
          this.duration = this.timestamp - this.started;
        }
        if (context.release) {
          this.release = context.release;
        }
        if (context.environment) {
          this.environment = context.environment;
        }
        if (context.ipAddress) {
          this.ipAddress = context.ipAddress;
        }
        if (context.userAgent) {
          this.userAgent = context.userAgent;
        }
        if (typeof context.errors === "number") {
          this.errors = context.errors;
        }
        if (context.status) {
          this.status = context.status;
        }
      };
      Session2.prototype.close = function(status) {
        if (status) {
          this.update({ status });
        } else if (this.status === SessionStatus.Ok) {
          this.update({ status: SessionStatus.Exited });
        } else {
          this.update();
        }
      };
      Session2.prototype.toJSON = function() {
        return dropUndefinedKeys({
          sid: "" + this.sid,
          init: true,
          started: new Date(this.started).toISOString(),
          timestamp: new Date(this.timestamp).toISOString(),
          status: this.status,
          errors: this.errors,
          did: typeof this.did === "number" || typeof this.did === "string" ? "" + this.did : void 0,
          duration: this.duration,
          attrs: dropUndefinedKeys({
            release: this.release,
            environment: this.environment,
            ip_address: this.ipAddress,
            user_agent: this.userAgent
          })
        });
      };
      return Session2;
    }()
  );

  // node_modules/@sentry/hub/esm/hub.js
  var API_VERSION = 3;
  var DEFAULT_BREADCRUMBS = 100;
  var MAX_BREADCRUMBS = 100;
  var Hub = (
    /** @class */
    function() {
      function Hub2(client, scope, _version) {
        if (scope === void 0) {
          scope = new Scope();
        }
        if (_version === void 0) {
          _version = API_VERSION;
        }
        this._version = _version;
        this._stack = [{}];
        this.getStackTop().scope = scope;
        this.bindClient(client);
      }
      Hub2.prototype.isOlderThan = function(version) {
        return this._version < version;
      };
      Hub2.prototype.bindClient = function(client) {
        var top = this.getStackTop();
        top.client = client;
        if (client && client.setupIntegrations) {
          client.setupIntegrations();
        }
      };
      Hub2.prototype.pushScope = function() {
        var scope = Scope.clone(this.getScope());
        this.getStack().push({
          client: this.getClient(),
          scope
        });
        return scope;
      };
      Hub2.prototype.popScope = function() {
        if (this.getStack().length <= 1)
          return false;
        return !!this.getStack().pop();
      };
      Hub2.prototype.withScope = function(callback) {
        var scope = this.pushScope();
        try {
          callback(scope);
        } finally {
          this.popScope();
        }
      };
      Hub2.prototype.getClient = function() {
        return this.getStackTop().client;
      };
      Hub2.prototype.getScope = function() {
        return this.getStackTop().scope;
      };
      Hub2.prototype.getStack = function() {
        return this._stack;
      };
      Hub2.prototype.getStackTop = function() {
        return this._stack[this._stack.length - 1];
      };
      Hub2.prototype.captureException = function(exception, hint) {
        var eventId = this._lastEventId = uuid4();
        var finalHint = hint;
        if (!hint) {
          var syntheticException = void 0;
          try {
            throw new Error("Sentry syntheticException");
          } catch (exception2) {
            syntheticException = exception2;
          }
          finalHint = {
            originalException: exception,
            syntheticException
          };
        }
        this._invokeClient("captureException", exception, __assign(__assign({}, finalHint), { event_id: eventId }));
        return eventId;
      };
      Hub2.prototype.captureMessage = function(message, level, hint) {
        var eventId = this._lastEventId = uuid4();
        var finalHint = hint;
        if (!hint) {
          var syntheticException = void 0;
          try {
            throw new Error(message);
          } catch (exception) {
            syntheticException = exception;
          }
          finalHint = {
            originalException: message,
            syntheticException
          };
        }
        this._invokeClient("captureMessage", message, level, __assign(__assign({}, finalHint), { event_id: eventId }));
        return eventId;
      };
      Hub2.prototype.captureEvent = function(event, hint) {
        var eventId = this._lastEventId = uuid4();
        this._invokeClient("captureEvent", event, __assign(__assign({}, hint), { event_id: eventId }));
        return eventId;
      };
      Hub2.prototype.lastEventId = function() {
        return this._lastEventId;
      };
      Hub2.prototype.addBreadcrumb = function(breadcrumb, hint) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (!scope || !client)
          return;
        var _b = client.getOptions && client.getOptions() || {}, _c = _b.beforeBreadcrumb, beforeBreadcrumb = _c === void 0 ? null : _c, _d = _b.maxBreadcrumbs, maxBreadcrumbs = _d === void 0 ? DEFAULT_BREADCRUMBS : _d;
        if (maxBreadcrumbs <= 0)
          return;
        var timestamp = dateTimestampInSeconds();
        var mergedBreadcrumb = __assign({ timestamp }, breadcrumb);
        var finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(function() {
          return beforeBreadcrumb(mergedBreadcrumb, hint);
        }) : mergedBreadcrumb;
        if (finalBreadcrumb === null)
          return;
        scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
      };
      Hub2.prototype.setUser = function(user) {
        var scope = this.getScope();
        if (scope)
          scope.setUser(user);
      };
      Hub2.prototype.setTags = function(tags) {
        var scope = this.getScope();
        if (scope)
          scope.setTags(tags);
      };
      Hub2.prototype.setExtras = function(extras) {
        var scope = this.getScope();
        if (scope)
          scope.setExtras(extras);
      };
      Hub2.prototype.setTag = function(key, value) {
        var scope = this.getScope();
        if (scope)
          scope.setTag(key, value);
      };
      Hub2.prototype.setExtra = function(key, extra) {
        var scope = this.getScope();
        if (scope)
          scope.setExtra(key, extra);
      };
      Hub2.prototype.setContext = function(name, context) {
        var scope = this.getScope();
        if (scope)
          scope.setContext(name, context);
      };
      Hub2.prototype.configureScope = function(callback) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (scope && client) {
          callback(scope);
        }
      };
      Hub2.prototype.run = function(callback) {
        var oldHub = makeMain(this);
        try {
          callback(this);
        } finally {
          makeMain(oldHub);
        }
      };
      Hub2.prototype.getIntegration = function(integration) {
        var client = this.getClient();
        if (!client)
          return null;
        try {
          return client.getIntegration(integration);
        } catch (_oO) {
          logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
          return null;
        }
      };
      Hub2.prototype.startSpan = function(context) {
        return this._callExtensionMethod("startSpan", context);
      };
      Hub2.prototype.startTransaction = function(context, customSamplingContext) {
        return this._callExtensionMethod("startTransaction", context, customSamplingContext);
      };
      Hub2.prototype.traceHeaders = function() {
        return this._callExtensionMethod("traceHeaders");
      };
      Hub2.prototype.startSession = function(context) {
        this.endSession();
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        var _b = client && client.getOptions() || {}, release = _b.release, environment = _b.environment;
        var session = new Session(__assign(__assign({
          release,
          environment
        }, scope && { user: scope.getUser() }), context));
        if (scope) {
          scope.setSession(session);
        }
        return session;
      };
      Hub2.prototype.endSession = function() {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (!scope)
          return;
        var session = scope.getSession && scope.getSession();
        if (session) {
          session.close();
          if (client && client.captureSession) {
            client.captureSession(session);
          }
          scope.setSession();
        }
      };
      Hub2.prototype._invokeClient = function(method) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var _b = this.getStackTop(), scope = _b.scope, client = _b.client;
        if (client && client[method]) {
          (_a = client)[method].apply(_a, __spread(args, [scope]));
        }
      };
      Hub2.prototype._callExtensionMethod = function(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var carrier = getMainCarrier();
        var sentry = carrier.__SENTRY__;
        if (sentry && sentry.extensions && typeof sentry.extensions[method] === "function") {
          return sentry.extensions[method].apply(this, args);
        }
        logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
      };
      return Hub2;
    }()
  );
  function getMainCarrier() {
    var carrier = getGlobalObject();
    carrier.__SENTRY__ = carrier.__SENTRY__ || {
      extensions: {},
      hub: void 0
    };
    return carrier;
  }
  function makeMain(hub) {
    var registry = getMainCarrier();
    var oldHub = getHubFromCarrier(registry);
    setHubOnCarrier(registry, hub);
    return oldHub;
  }
  function getCurrentHub() {
    var registry = getMainCarrier();
    if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
      setHubOnCarrier(registry, new Hub());
    }
    if (isNodeEnv()) {
      return getHubFromActiveDomain(registry);
    }
    return getHubFromCarrier(registry);
  }
  function getActiveDomain() {
    var sentry = getMainCarrier().__SENTRY__;
    return sentry && sentry.extensions && sentry.extensions.domain && sentry.extensions.domain.active;
  }
  function getHubFromActiveDomain(registry) {
    try {
      var activeDomain = getActiveDomain();
      if (!activeDomain) {
        return getHubFromCarrier(registry);
      }
      if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
        var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
        setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, Scope.clone(registryHubTopStack.scope)));
      }
      return getHubFromCarrier(activeDomain);
    } catch (_Oo) {
      return getHubFromCarrier(registry);
    }
  }
  function hasHubOnCarrier(carrier) {
    return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
  }
  function getHubFromCarrier(carrier) {
    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub)
      return carrier.__SENTRY__.hub;
    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
    carrier.__SENTRY__.hub = new Hub();
    return carrier.__SENTRY__.hub;
  }
  function setHubOnCarrier(carrier, hub) {
    if (!carrier)
      return false;
    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
    carrier.__SENTRY__.hub = hub;
    return true;
  }

  // node_modules/@sentry/minimal/esm/index.js
  function callOnHub(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var hub = getCurrentHub();
    if (hub && hub[method]) {
      return hub[method].apply(hub, __spread(args));
    }
    throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
  }
  function captureException(exception, captureContext) {
    var syntheticException;
    try {
      throw new Error("Sentry syntheticException");
    } catch (exception2) {
      syntheticException = exception2;
    }
    return callOnHub("captureException", exception, {
      captureContext,
      originalException: exception,
      syntheticException
    });
  }
  function captureMessage(message, captureContext) {
    var syntheticException;
    try {
      throw new Error(message);
    } catch (exception) {
      syntheticException = exception;
    }
    var level = typeof captureContext === "string" ? captureContext : void 0;
    var context = typeof captureContext !== "string" ? { captureContext } : void 0;
    return callOnHub("captureMessage", message, level, __assign({ originalException: message, syntheticException }, context));
  }
  function captureEvent(event) {
    return callOnHub("captureEvent", event);
  }
  function configureScope(callback) {
    callOnHub("configureScope", callback);
  }
  function addBreadcrumb(breadcrumb) {
    callOnHub("addBreadcrumb", breadcrumb);
  }
  function setContext(name, context) {
    callOnHub("setContext", name, context);
  }
  function setExtras(extras) {
    callOnHub("setExtras", extras);
  }
  function setTags(tags) {
    callOnHub("setTags", tags);
  }
  function setExtra(key, extra) {
    callOnHub("setExtra", key, extra);
  }
  function setTag(key, value) {
    callOnHub("setTag", key, value);
  }
  function setUser(user) {
    callOnHub("setUser", user);
  }
  function withScope(callback) {
    callOnHub("withScope", callback);
  }
  function startTransaction(context, customSamplingContext) {
    return callOnHub("startTransaction", __assign({}, context), customSamplingContext);
  }

  // node_modules/@sentry/core/esm/api.js
  var SENTRY_API_VERSION = "7";
  var API = (
    /** @class */
    function() {
      function API2(dsn) {
        this.dsn = dsn;
        this._dsnObject = new Dsn(dsn);
      }
      API2.prototype.getDsn = function() {
        return this._dsnObject;
      };
      API2.prototype.getBaseApiEndpoint = function() {
        var dsn = this._dsnObject;
        var protocol = dsn.protocol ? dsn.protocol + ":" : "";
        var port = dsn.port ? ":" + dsn.port : "";
        return protocol + "//" + dsn.host + port + (dsn.path ? "/" + dsn.path : "") + "/api/";
      };
      API2.prototype.getStoreEndpoint = function() {
        return this._getIngestEndpoint("store");
      };
      API2.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
        return this.getStoreEndpoint() + "?" + this._encodedAuth();
      };
      API2.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function() {
        return this._getEnvelopeEndpoint() + "?" + this._encodedAuth();
      };
      API2.prototype.getStoreEndpointPath = function() {
        var dsn = this._dsnObject;
        return (dsn.path ? "/" + dsn.path : "") + "/api/" + dsn.projectId + "/store/";
      };
      API2.prototype.getRequestHeaders = function(clientName, clientVersion) {
        var dsn = this._dsnObject;
        var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
        header.push("sentry_client=" + clientName + "/" + clientVersion);
        header.push("sentry_key=" + dsn.user);
        if (dsn.pass) {
          header.push("sentry_secret=" + dsn.pass);
        }
        return {
          "Content-Type": "application/json",
          "X-Sentry-Auth": header.join(", ")
        };
      };
      API2.prototype.getReportDialogEndpoint = function(dialogOptions) {
        if (dialogOptions === void 0) {
          dialogOptions = {};
        }
        var dsn = this._dsnObject;
        var endpoint = this.getBaseApiEndpoint() + "embed/error-page/";
        var encodedOptions = [];
        encodedOptions.push("dsn=" + dsn.toString());
        for (var key in dialogOptions) {
          if (key === "dsn") {
            continue;
          }
          if (key === "user") {
            if (!dialogOptions.user) {
              continue;
            }
            if (dialogOptions.user.name) {
              encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
            }
            if (dialogOptions.user.email) {
              encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
            }
          } else {
            encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
          }
        }
        if (encodedOptions.length) {
          return endpoint + "?" + encodedOptions.join("&");
        }
        return endpoint;
      };
      API2.prototype._getEnvelopeEndpoint = function() {
        return this._getIngestEndpoint("envelope");
      };
      API2.prototype._getIngestEndpoint = function(target) {
        var base = this.getBaseApiEndpoint();
        var dsn = this._dsnObject;
        return "" + base + dsn.projectId + "/" + target + "/";
      };
      API2.prototype._encodedAuth = function() {
        var dsn = this._dsnObject;
        var auth = {
          // We send only the minimum set of required information. See
          // https://github.com/getsentry/sentry-javascript/issues/2572.
          sentry_key: dsn.user,
          sentry_version: SENTRY_API_VERSION
        };
        return urlEncode(auth);
      };
      return API2;
    }()
  );

  // node_modules/@sentry/core/esm/integration.js
  var installedIntegrations = [];
  function getIntegrationsToSetup(options) {
    var defaultIntegrations2 = options.defaultIntegrations && __spread(options.defaultIntegrations) || [];
    var userIntegrations = options.integrations;
    var integrations = [];
    if (Array.isArray(userIntegrations)) {
      var userIntegrationsNames_1 = userIntegrations.map(function(i) {
        return i.name;
      });
      var pickedIntegrationsNames_1 = [];
      defaultIntegrations2.forEach(function(defaultIntegration) {
        if (userIntegrationsNames_1.indexOf(defaultIntegration.name) === -1 && pickedIntegrationsNames_1.indexOf(defaultIntegration.name) === -1) {
          integrations.push(defaultIntegration);
          pickedIntegrationsNames_1.push(defaultIntegration.name);
        }
      });
      userIntegrations.forEach(function(userIntegration) {
        if (pickedIntegrationsNames_1.indexOf(userIntegration.name) === -1) {
          integrations.push(userIntegration);
          pickedIntegrationsNames_1.push(userIntegration.name);
        }
      });
    } else if (typeof userIntegrations === "function") {
      integrations = userIntegrations(defaultIntegrations2);
      integrations = Array.isArray(integrations) ? integrations : [integrations];
    } else {
      integrations = __spread(defaultIntegrations2);
    }
    var integrationsNames = integrations.map(function(i) {
      return i.name;
    });
    var alwaysLastToRun = "Debug";
    if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
      integrations.push.apply(integrations, __spread(integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1)));
    }
    return integrations;
  }
  function setupIntegration(integration) {
    if (installedIntegrations.indexOf(integration.name) !== -1) {
      return;
    }
    integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
    installedIntegrations.push(integration.name);
    logger.log("Integration installed: " + integration.name);
  }
  function setupIntegrations(options) {
    var integrations = {};
    getIntegrationsToSetup(options).forEach(function(integration) {
      integrations[integration.name] = integration;
      setupIntegration(integration);
    });
    return integrations;
  }

  // node_modules/@sentry/core/esm/baseclient.js
  var BaseClient = (
    /** @class */
    function() {
      function BaseClient2(backendClass, options) {
        this._integrations = {};
        this._processing = 0;
        this._backend = new backendClass(options);
        this._options = options;
        if (options.dsn) {
          this._dsn = new Dsn(options.dsn);
        }
      }
      BaseClient2.prototype.captureException = function(exception, hint, scope) {
        var _this = this;
        var eventId = hint && hint.event_id;
        this._process(this._getBackend().eventFromException(exception, hint).then(function(event) {
          return _this._captureEvent(event, hint, scope);
        }).then(function(result) {
          eventId = result;
        }));
        return eventId;
      };
      BaseClient2.prototype.captureMessage = function(message, level, hint, scope) {
        var _this = this;
        var eventId = hint && hint.event_id;
        var promisedEvent = isPrimitive(message) ? this._getBackend().eventFromMessage(String(message), level, hint) : this._getBackend().eventFromException(message, hint);
        this._process(promisedEvent.then(function(event) {
          return _this._captureEvent(event, hint, scope);
        }).then(function(result) {
          eventId = result;
        }));
        return eventId;
      };
      BaseClient2.prototype.captureEvent = function(event, hint, scope) {
        var eventId = hint && hint.event_id;
        this._process(this._captureEvent(event, hint, scope).then(function(result) {
          eventId = result;
        }));
        return eventId;
      };
      BaseClient2.prototype.captureSession = function(session) {
        if (!session.release) {
          logger.warn("Discarded session because of missing release");
        } else {
          this._sendSession(session);
        }
      };
      BaseClient2.prototype.getDsn = function() {
        return this._dsn;
      };
      BaseClient2.prototype.getOptions = function() {
        return this._options;
      };
      BaseClient2.prototype.flush = function(timeout) {
        var _this = this;
        return this._isClientProcessing(timeout).then(function(ready) {
          return _this._getBackend().getTransport().close(timeout).then(function(transportFlushed) {
            return ready && transportFlushed;
          });
        });
      };
      BaseClient2.prototype.close = function(timeout) {
        var _this = this;
        return this.flush(timeout).then(function(result) {
          _this.getOptions().enabled = false;
          return result;
        });
      };
      BaseClient2.prototype.setupIntegrations = function() {
        if (this._isEnabled()) {
          this._integrations = setupIntegrations(this._options);
        }
      };
      BaseClient2.prototype.getIntegration = function(integration) {
        try {
          return this._integrations[integration.id] || null;
        } catch (_oO) {
          logger.warn("Cannot retrieve integration " + integration.id + " from the current Client");
          return null;
        }
      };
      BaseClient2.prototype._updateSessionFromEvent = function(session, event) {
        var e_1, _a;
        var crashed = false;
        var errored = false;
        var userAgent;
        var exceptions = event.exception && event.exception.values;
        if (exceptions) {
          errored = true;
          try {
            for (var exceptions_1 = __values(exceptions), exceptions_1_1 = exceptions_1.next(); !exceptions_1_1.done; exceptions_1_1 = exceptions_1.next()) {
              var ex = exceptions_1_1.value;
              var mechanism = ex.mechanism;
              if (mechanism && mechanism.handled === false) {
                crashed = true;
                break;
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (exceptions_1_1 && !exceptions_1_1.done && (_a = exceptions_1.return))
                _a.call(exceptions_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
        var user = event.user;
        if (!session.userAgent) {
          var headers = event.request ? event.request.headers : {};
          for (var key in headers) {
            if (key.toLowerCase() === "user-agent") {
              userAgent = headers[key];
              break;
            }
          }
        }
        session.update(__assign(__assign({}, crashed && { status: SessionStatus.Crashed }), {
          user,
          userAgent,
          errors: session.errors + Number(errored || crashed)
        }));
      };
      BaseClient2.prototype._sendSession = function(session) {
        this._getBackend().sendSession(session);
      };
      BaseClient2.prototype._isClientProcessing = function(timeout) {
        var _this = this;
        return new SyncPromise(function(resolve) {
          var ticked = 0;
          var tick = 1;
          var interval = setInterval(function() {
            if (_this._processing == 0) {
              clearInterval(interval);
              resolve(true);
            } else {
              ticked += tick;
              if (timeout && ticked >= timeout) {
                clearInterval(interval);
                resolve(false);
              }
            }
          }, tick);
        });
      };
      BaseClient2.prototype._getBackend = function() {
        return this._backend;
      };
      BaseClient2.prototype._isEnabled = function() {
        return this.getOptions().enabled !== false && this._dsn !== void 0;
      };
      BaseClient2.prototype._prepareEvent = function(event, scope, hint) {
        var _this = this;
        var _a = this.getOptions().normalizeDepth, normalizeDepth = _a === void 0 ? 3 : _a;
        var prepared = __assign(__assign({}, event), { event_id: event.event_id || (hint && hint.event_id ? hint.event_id : uuid4()), timestamp: event.timestamp || dateTimestampInSeconds() });
        this._applyClientOptions(prepared);
        this._applyIntegrationsMetadata(prepared);
        var finalScope = scope;
        if (hint && hint.captureContext) {
          finalScope = Scope.clone(finalScope).update(hint.captureContext);
        }
        var result = SyncPromise.resolve(prepared);
        if (finalScope) {
          result = finalScope.applyToEvent(prepared, hint);
        }
        return result.then(function(evt) {
          if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
            return _this._normalizeEvent(evt, normalizeDepth);
          }
          return evt;
        });
      };
      BaseClient2.prototype._normalizeEvent = function(event, depth) {
        if (!event) {
          return null;
        }
        var normalized = __assign(__assign(__assign(__assign(__assign({}, event), event.breadcrumbs && {
          breadcrumbs: event.breadcrumbs.map(function(b) {
            return __assign(__assign({}, b), b.data && {
              data: normalize(b.data, depth)
            });
          })
        }), event.user && {
          user: normalize(event.user, depth)
        }), event.contexts && {
          contexts: normalize(event.contexts, depth)
        }), event.extra && {
          extra: normalize(event.extra, depth)
        });
        if (event.contexts && event.contexts.trace) {
          normalized.contexts.trace = event.contexts.trace;
        }
        return normalized;
      };
      BaseClient2.prototype._applyClientOptions = function(event) {
        var options = this.getOptions();
        var environment = options.environment, release = options.release, dist = options.dist, _a = options.maxValueLength, maxValueLength = _a === void 0 ? 250 : _a;
        if (!("environment" in event)) {
          event.environment = "environment" in options ? environment : "production";
        }
        if (event.release === void 0 && release !== void 0) {
          event.release = release;
        }
        if (event.dist === void 0 && dist !== void 0) {
          event.dist = dist;
        }
        if (event.message) {
          event.message = truncate(event.message, maxValueLength);
        }
        var exception = event.exception && event.exception.values && event.exception.values[0];
        if (exception && exception.value) {
          exception.value = truncate(exception.value, maxValueLength);
        }
        var request = event.request;
        if (request && request.url) {
          request.url = truncate(request.url, maxValueLength);
        }
      };
      BaseClient2.prototype._applyIntegrationsMetadata = function(event) {
        var sdkInfo = event.sdk;
        var integrationsArray = Object.keys(this._integrations);
        if (sdkInfo && integrationsArray.length > 0) {
          sdkInfo.integrations = integrationsArray;
        }
      };
      BaseClient2.prototype._sendEvent = function(event) {
        this._getBackend().sendEvent(event);
      };
      BaseClient2.prototype._captureEvent = function(event, hint, scope) {
        return this._processEvent(event, hint, scope).then(function(finalEvent) {
          return finalEvent.event_id;
        }, function(reason) {
          logger.error(reason);
          return void 0;
        });
      };
      BaseClient2.prototype._processEvent = function(event, hint, scope) {
        var _this = this;
        var _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
        if (!this._isEnabled()) {
          return SyncPromise.reject(new SentryError("SDK not enabled, will not send event."));
        }
        var isTransaction = event.type === "transaction";
        if (!isTransaction && typeof sampleRate === "number" && Math.random() > sampleRate) {
          return SyncPromise.reject(new SentryError("Discarding event because it's not included in the random sample (sampling rate = " + sampleRate + ")"));
        }
        return this._prepareEvent(event, scope, hint).then(function(prepared) {
          if (prepared === null) {
            throw new SentryError("An event processor returned null, will not send event.");
          }
          var isInternalException = hint && hint.data && hint.data.__sentry__ === true;
          if (isInternalException || isTransaction || !beforeSend) {
            return prepared;
          }
          var beforeSendResult = beforeSend(prepared, hint);
          if (typeof beforeSendResult === "undefined") {
            throw new SentryError("`beforeSend` method has to return `null` or a valid event.");
          } else if (isThenable(beforeSendResult)) {
            return beforeSendResult.then(function(event2) {
              return event2;
            }, function(e) {
              throw new SentryError("beforeSend rejected with " + e);
            });
          }
          return beforeSendResult;
        }).then(function(processedEvent) {
          if (processedEvent === null) {
            throw new SentryError("`beforeSend` returned `null`, will not send event.");
          }
          var session = scope && scope.getSession && scope.getSession();
          if (!isTransaction && session) {
            _this._updateSessionFromEvent(session, processedEvent);
          }
          _this._sendEvent(processedEvent);
          return processedEvent;
        }).then(null, function(reason) {
          if (reason instanceof SentryError) {
            throw reason;
          }
          _this.captureException(reason, {
            data: {
              __sentry__: true
            },
            originalException: reason
          });
          throw new SentryError("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + reason);
        });
      };
      BaseClient2.prototype._process = function(promise) {
        var _this = this;
        this._processing += 1;
        promise.then(function(value) {
          _this._processing -= 1;
          return value;
        }, function(reason) {
          _this._processing -= 1;
          return reason;
        });
      };
      return BaseClient2;
    }()
  );

  // node_modules/@sentry/core/esm/transports/noop.js
  var NoopTransport = (
    /** @class */
    function() {
      function NoopTransport2() {
      }
      NoopTransport2.prototype.sendEvent = function(_) {
        return SyncPromise.resolve({
          reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
          status: Status.Skipped
        });
      };
      NoopTransport2.prototype.close = function(_) {
        return SyncPromise.resolve(true);
      };
      return NoopTransport2;
    }()
  );

  // node_modules/@sentry/core/esm/basebackend.js
  var BaseBackend = (
    /** @class */
    function() {
      function BaseBackend2(options) {
        this._options = options;
        if (!this._options.dsn) {
          logger.warn("No DSN provided, backend will not do anything.");
        }
        this._transport = this._setupTransport();
      }
      BaseBackend2.prototype.eventFromException = function(_exception, _hint) {
        throw new SentryError("Backend has to implement `eventFromException` method");
      };
      BaseBackend2.prototype.eventFromMessage = function(_message, _level, _hint) {
        throw new SentryError("Backend has to implement `eventFromMessage` method");
      };
      BaseBackend2.prototype.sendEvent = function(event) {
        this._transport.sendEvent(event).then(null, function(reason) {
          logger.error("Error while sending event: " + reason);
        });
      };
      BaseBackend2.prototype.sendSession = function(session) {
        if (!this._transport.sendSession) {
          logger.warn("Dropping session because custom transport doesn't implement sendSession");
          return;
        }
        this._transport.sendSession(session).then(null, function(reason) {
          logger.error("Error while sending session: " + reason);
        });
      };
      BaseBackend2.prototype.getTransport = function() {
        return this._transport;
      };
      BaseBackend2.prototype._setupTransport = function() {
        return new NoopTransport();
      };
      return BaseBackend2;
    }()
  );

  // node_modules/@sentry/core/esm/request.js
  function sessionToSentryRequest(session, api) {
    var envelopeHeaders = JSON.stringify({
      sent_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    var itemHeaders = JSON.stringify({
      type: "session"
    });
    return {
      body: envelopeHeaders + "\n" + itemHeaders + "\n" + JSON.stringify(session),
      type: "session",
      url: api.getEnvelopeEndpointWithUrlEncodedAuth()
    };
  }
  function eventToSentryRequest(event, api) {
    var _a = event.tags || {}, samplingMethod = _a.__sentry_samplingMethod, sampleRate = _a.__sentry_sampleRate, otherTags = __rest(_a, ["__sentry_samplingMethod", "__sentry_sampleRate"]);
    event.tags = otherTags;
    var useEnvelope = event.type === "transaction";
    var req = {
      body: JSON.stringify(event),
      type: event.type || "event",
      url: useEnvelope ? api.getEnvelopeEndpointWithUrlEncodedAuth() : api.getStoreEndpointWithUrlEncodedAuth()
    };
    if (useEnvelope) {
      var envelopeHeaders = JSON.stringify({
        event_id: event.event_id,
        sent_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      var itemHeaders = JSON.stringify({
        type: event.type,
        // TODO: Right now, sampleRate may or may not be defined (it won't be in the cases of inheritance and
        // explicitly-set sampling decisions). Are we good with that?
        sample_rates: [{ id: samplingMethod, rate: sampleRate }]
      });
      var envelope = envelopeHeaders + "\n" + itemHeaders + "\n" + req.body;
      req.body = envelope;
    }
    return req;
  }

  // node_modules/@sentry/core/esm/sdk.js
  function initAndBind(clientClass, options) {
    if (options.debug === true) {
      logger.enable();
    }
    var hub = getCurrentHub();
    var client = new clientClass(options);
    hub.bindClient(client);
  }

  // node_modules/@sentry/core/esm/integrations/index.js
  var integrations_exports = {};
  __export(integrations_exports, {
    FunctionToString: () => FunctionToString,
    InboundFilters: () => InboundFilters
  });

  // node_modules/@sentry/core/esm/integrations/functiontostring.js
  var originalFunctionToString;
  var FunctionToString = (
    /** @class */
    function() {
      function FunctionToString2() {
        this.name = FunctionToString2.id;
      }
      FunctionToString2.prototype.setupOnce = function() {
        originalFunctionToString = Function.prototype.toString;
        Function.prototype.toString = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var context = this.__sentry_original__ || this;
          return originalFunctionToString.apply(context, args);
        };
      };
      FunctionToString2.id = "FunctionToString";
      return FunctionToString2;
    }()
  );

  // node_modules/@sentry/core/esm/integrations/inboundfilters.js
  var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
  var InboundFilters = (
    /** @class */
    function() {
      function InboundFilters2(_options) {
        if (_options === void 0) {
          _options = {};
        }
        this._options = _options;
        this.name = InboundFilters2.id;
      }
      InboundFilters2.prototype.setupOnce = function() {
        addGlobalEventProcessor(function(event) {
          var hub = getCurrentHub();
          if (!hub) {
            return event;
          }
          var self2 = hub.getIntegration(InboundFilters2);
          if (self2) {
            var client = hub.getClient();
            var clientOptions = client ? client.getOptions() : {};
            var options = self2._mergeOptions(clientOptions);
            if (self2._shouldDropEvent(event, options)) {
              return null;
            }
          }
          return event;
        });
      };
      InboundFilters2.prototype._shouldDropEvent = function(event, options) {
        if (this._isSentryError(event, options)) {
          logger.warn("Event dropped due to being internal Sentry Error.\nEvent: " + getEventDescription(event));
          return true;
        }
        if (this._isIgnoredError(event, options)) {
          logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + getEventDescription(event));
          return true;
        }
        if (this._isDeniedUrl(event, options)) {
          logger.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event));
          return true;
        }
        if (!this._isAllowedUrl(event, options)) {
          logger.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event));
          return true;
        }
        return false;
      };
      InboundFilters2.prototype._isSentryError = function(event, options) {
        if (!options.ignoreInternal) {
          return false;
        }
        try {
          return event && event.exception && event.exception.values && event.exception.values[0] && event.exception.values[0].type === "SentryError" || false;
        } catch (_oO) {
          return false;
        }
      };
      InboundFilters2.prototype._isIgnoredError = function(event, options) {
        if (!options.ignoreErrors || !options.ignoreErrors.length) {
          return false;
        }
        return this._getPossibleEventMessages(event).some(function(message) {
          return options.ignoreErrors.some(function(pattern) {
            return isMatchingPattern(message, pattern);
          });
        });
      };
      InboundFilters2.prototype._isDeniedUrl = function(event, options) {
        if (!options.denyUrls || !options.denyUrls.length) {
          return false;
        }
        var url = this._getEventFilterUrl(event);
        return !url ? false : options.denyUrls.some(function(pattern) {
          return isMatchingPattern(url, pattern);
        });
      };
      InboundFilters2.prototype._isAllowedUrl = function(event, options) {
        if (!options.allowUrls || !options.allowUrls.length) {
          return true;
        }
        var url = this._getEventFilterUrl(event);
        return !url ? true : options.allowUrls.some(function(pattern) {
          return isMatchingPattern(url, pattern);
        });
      };
      InboundFilters2.prototype._mergeOptions = function(clientOptions) {
        if (clientOptions === void 0) {
          clientOptions = {};
        }
        return {
          allowUrls: __spread(this._options.whitelistUrls || [], this._options.allowUrls || [], clientOptions.whitelistUrls || [], clientOptions.allowUrls || []),
          denyUrls: __spread(this._options.blacklistUrls || [], this._options.denyUrls || [], clientOptions.blacklistUrls || [], clientOptions.denyUrls || []),
          ignoreErrors: __spread(this._options.ignoreErrors || [], clientOptions.ignoreErrors || [], DEFAULT_IGNORE_ERRORS),
          ignoreInternal: typeof this._options.ignoreInternal !== "undefined" ? this._options.ignoreInternal : true
        };
      };
      InboundFilters2.prototype._getPossibleEventMessages = function(event) {
        if (event.message) {
          return [event.message];
        }
        if (event.exception) {
          try {
            var _a = event.exception.values && event.exception.values[0] || {}, _b = _a.type, type = _b === void 0 ? "" : _b, _c = _a.value, value = _c === void 0 ? "" : _c;
            return ["" + value, type + ": " + value];
          } catch (oO) {
            logger.error("Cannot extract message for event " + getEventDescription(event));
            return [];
          }
        }
        return [];
      };
      InboundFilters2.prototype._getEventFilterUrl = function(event) {
        try {
          if (event.stacktrace) {
            var frames_1 = event.stacktrace.frames;
            return frames_1 && frames_1[frames_1.length - 1].filename || null;
          }
          if (event.exception) {
            var frames_2 = event.exception.values && event.exception.values[0].stacktrace && event.exception.values[0].stacktrace.frames;
            return frames_2 && frames_2[frames_2.length - 1].filename || null;
          }
          return null;
        } catch (oO) {
          logger.error("Cannot extract url for event " + getEventDescription(event));
          return null;
        }
      };
      InboundFilters2.id = "InboundFilters";
      return InboundFilters2;
    }()
  );

  // node_modules/@sentry/browser/esm/tracekit.js
  var UNKNOWN_FUNCTION = "?";
  var chrome2 = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
  var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
  var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
  var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
  var reactMinifiedRegexp = /Minified React error #\d+;/i;
  function computeStackTrace(ex) {
    var stack = null;
    var popSize = 0;
    if (ex) {
      if (typeof ex.framesToPop === "number") {
        popSize = ex.framesToPop;
      } else if (reactMinifiedRegexp.test(ex.message)) {
        popSize = 1;
      }
    }
    try {
      stack = computeStackTraceFromStacktraceProp(ex);
      if (stack) {
        return popFrames(stack, popSize);
      }
    } catch (e) {
    }
    try {
      stack = computeStackTraceFromStackProp(ex);
      if (stack) {
        return popFrames(stack, popSize);
      }
    } catch (e) {
    }
    return {
      message: extractMessage(ex),
      name: ex && ex.name,
      stack: [],
      failed: true
    };
  }
  function computeStackTraceFromStackProp(ex) {
    if (!ex || !ex.stack) {
      return null;
    }
    var stack = [];
    var lines = ex.stack.split("\n");
    var isEval;
    var submatch;
    var parts;
    var element;
    for (var i = 0; i < lines.length; ++i) {
      if (parts = chrome2.exec(lines[i])) {
        var isNative = parts[2] && parts[2].indexOf("native") === 0;
        isEval = parts[2] && parts[2].indexOf("eval") === 0;
        if (isEval && (submatch = chromeEval.exec(parts[2]))) {
          parts[2] = submatch[1];
          parts[3] = submatch[2];
          parts[4] = submatch[3];
        }
        element = {
          // working with the regexp above is super painful. it is quite a hack, but just stripping the `address at `
          // prefix here seems like the quickest solution for now.
          url: parts[2] && parts[2].indexOf("address at ") === 0 ? parts[2].substr("address at ".length) : parts[2],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: isNative ? [parts[2]] : [],
          line: parts[3] ? +parts[3] : null,
          column: parts[4] ? +parts[4] : null
        };
      } else if (parts = winjs.exec(lines[i])) {
        element = {
          url: parts[2],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: [],
          line: +parts[3],
          column: parts[4] ? +parts[4] : null
        };
      } else if (parts = gecko.exec(lines[i])) {
        isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
        if (isEval && (submatch = geckoEval.exec(parts[3]))) {
          parts[1] = parts[1] || "eval";
          parts[3] = submatch[1];
          parts[4] = submatch[2];
          parts[5] = "";
        } else if (i === 0 && !parts[5] && ex.columnNumber !== void 0) {
          stack[0].column = ex.columnNumber + 1;
        }
        element = {
          url: parts[3],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: parts[2] ? parts[2].split(",") : [],
          line: parts[4] ? +parts[4] : null,
          column: parts[5] ? +parts[5] : null
        };
      } else {
        continue;
      }
      if (!element.func && element.line) {
        element.func = UNKNOWN_FUNCTION;
      }
      stack.push(element);
    }
    if (!stack.length) {
      return null;
    }
    return {
      message: extractMessage(ex),
      name: ex.name,
      stack
    };
  }
  function computeStackTraceFromStacktraceProp(ex) {
    if (!ex || !ex.stacktrace) {
      return null;
    }
    var stacktrace = ex.stacktrace;
    var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
    var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i;
    var lines = stacktrace.split("\n");
    var stack = [];
    var parts;
    for (var line = 0; line < lines.length; line += 2) {
      var element = null;
      if (parts = opera10Regex.exec(lines[line])) {
        element = {
          url: parts[2],
          func: parts[3],
          args: [],
          line: +parts[1],
          column: null
        };
      } else if (parts = opera11Regex.exec(lines[line])) {
        element = {
          url: parts[6],
          func: parts[3] || parts[4],
          args: parts[5] ? parts[5].split(",") : [],
          line: +parts[1],
          column: +parts[2]
        };
      }
      if (element) {
        if (!element.func && element.line) {
          element.func = UNKNOWN_FUNCTION;
        }
        stack.push(element);
      }
    }
    if (!stack.length) {
      return null;
    }
    return {
      message: extractMessage(ex),
      name: ex.name,
      stack
    };
  }
  function popFrames(stacktrace, popSize) {
    try {
      return __assign(__assign({}, stacktrace), { stack: stacktrace.stack.slice(popSize) });
    } catch (e) {
      return stacktrace;
    }
  }
  function extractMessage(ex) {
    var message = ex && ex.message;
    if (!message) {
      return "No error message";
    }
    if (message.error && typeof message.error.message === "string") {
      return message.error.message;
    }
    return message;
  }

  // node_modules/@sentry/browser/esm/parsers.js
  var STACKTRACE_LIMIT = 50;
  function exceptionFromStacktrace(stacktrace) {
    var frames = prepareFramesForEvent(stacktrace.stack);
    var exception = {
      type: stacktrace.name,
      value: stacktrace.message
    };
    if (frames && frames.length) {
      exception.stacktrace = { frames };
    }
    if (exception.type === void 0 && exception.value === "") {
      exception.value = "Unrecoverable error caught";
    }
    return exception;
  }
  function eventFromPlainObject(exception, syntheticException, rejection) {
    var event = {
      exception: {
        values: [
          {
            type: isEvent(exception) ? exception.constructor.name : rejection ? "UnhandledRejection" : "Error",
            value: "Non-Error " + (rejection ? "promise rejection" : "exception") + " captured with keys: " + extractExceptionKeysForMessage(exception)
          }
        ]
      },
      extra: {
        __serialized__: normalizeToSize(exception)
      }
    };
    if (syntheticException) {
      var stacktrace = computeStackTrace(syntheticException);
      var frames_1 = prepareFramesForEvent(stacktrace.stack);
      event.stacktrace = {
        frames: frames_1
      };
    }
    return event;
  }
  function eventFromStacktrace(stacktrace) {
    var exception = exceptionFromStacktrace(stacktrace);
    return {
      exception: {
        values: [exception]
      }
    };
  }
  function prepareFramesForEvent(stack) {
    if (!stack || !stack.length) {
      return [];
    }
    var localStack = stack;
    var firstFrameFunction = localStack[0].func || "";
    var lastFrameFunction = localStack[localStack.length - 1].func || "";
    if (firstFrameFunction.indexOf("captureMessage") !== -1 || firstFrameFunction.indexOf("captureException") !== -1) {
      localStack = localStack.slice(1);
    }
    if (lastFrameFunction.indexOf("sentryWrapped") !== -1) {
      localStack = localStack.slice(0, -1);
    }
    return localStack.slice(0, STACKTRACE_LIMIT).map(function(frame) {
      return {
        colno: frame.column === null ? void 0 : frame.column,
        filename: frame.url || localStack[0].url,
        function: frame.func || "?",
        in_app: true,
        lineno: frame.line === null ? void 0 : frame.line
      };
    }).reverse();
  }

  // node_modules/@sentry/browser/esm/eventbuilder.js
  function eventFromException(options, exception, hint) {
    var syntheticException = hint && hint.syntheticException || void 0;
    var event = eventFromUnknownInput(exception, syntheticException, {
      attachStacktrace: options.attachStacktrace
    });
    addExceptionMechanism(event, {
      handled: true,
      type: "generic"
    });
    event.level = Severity.Error;
    if (hint && hint.event_id) {
      event.event_id = hint.event_id;
    }
    return SyncPromise.resolve(event);
  }
  function eventFromMessage(options, message, level, hint) {
    if (level === void 0) {
      level = Severity.Info;
    }
    var syntheticException = hint && hint.syntheticException || void 0;
    var event = eventFromString(message, syntheticException, {
      attachStacktrace: options.attachStacktrace
    });
    event.level = level;
    if (hint && hint.event_id) {
      event.event_id = hint.event_id;
    }
    return SyncPromise.resolve(event);
  }
  function eventFromUnknownInput(exception, syntheticException, options) {
    if (options === void 0) {
      options = {};
    }
    var event;
    if (isErrorEvent(exception) && exception.error) {
      var errorEvent = exception;
      exception = errorEvent.error;
      event = eventFromStacktrace(computeStackTrace(exception));
      return event;
    }
    if (isDOMError(exception) || isDOMException(exception)) {
      var domException = exception;
      var name_1 = domException.name || (isDOMError(domException) ? "DOMError" : "DOMException");
      var message = domException.message ? name_1 + ": " + domException.message : name_1;
      event = eventFromString(message, syntheticException, options);
      addExceptionTypeValue(event, message);
      if ("code" in domException) {
        event.tags = __assign(__assign({}, event.tags), { "DOMException.code": "" + domException.code });
      }
      return event;
    }
    if (isError(exception)) {
      event = eventFromStacktrace(computeStackTrace(exception));
      return event;
    }
    if (isPlainObject(exception) || isEvent(exception)) {
      var objectException = exception;
      event = eventFromPlainObject(objectException, syntheticException, options.rejection);
      addExceptionMechanism(event, {
        synthetic: true
      });
      return event;
    }
    event = eventFromString(exception, syntheticException, options);
    addExceptionTypeValue(event, "" + exception, void 0);
    addExceptionMechanism(event, {
      synthetic: true
    });
    return event;
  }
  function eventFromString(input, syntheticException, options) {
    if (options === void 0) {
      options = {};
    }
    var event = {
      message: input
    };
    if (options.attachStacktrace && syntheticException) {
      var stacktrace = computeStackTrace(syntheticException);
      var frames_1 = prepareFramesForEvent(stacktrace.stack);
      event.stacktrace = {
        frames: frames_1
      };
    }
    return event;
  }

  // node_modules/@sentry/browser/esm/transports/index.js
  var transports_exports = {};
  __export(transports_exports, {
    BaseTransport: () => BaseTransport,
    FetchTransport: () => FetchTransport,
    XHRTransport: () => XHRTransport
  });

  // node_modules/@sentry/browser/esm/transports/base.js
  var BaseTransport = (
    /** @class */
    function() {
      function BaseTransport2(options) {
        this.options = options;
        this._buffer = new PromiseBuffer(30);
        this._rateLimits = {};
        this._api = new API(this.options.dsn);
        this.url = this._api.getStoreEndpointWithUrlEncodedAuth();
      }
      BaseTransport2.prototype.sendEvent = function(_) {
        throw new SentryError("Transport Class has to implement `sendEvent` method");
      };
      BaseTransport2.prototype.close = function(timeout) {
        return this._buffer.drain(timeout);
      };
      BaseTransport2.prototype._handleResponse = function(_a) {
        var requestType = _a.requestType, response = _a.response, headers = _a.headers, resolve = _a.resolve, reject = _a.reject;
        var status = Status.fromHttpCode(response.status);
        var limited = this._handleRateLimit(headers);
        if (limited)
          logger.warn("Too many requests, backing off until: " + this._disabledUntil(requestType));
        if (status === Status.Success) {
          resolve({ status });
          return;
        }
        reject(response);
      };
      BaseTransport2.prototype._disabledUntil = function(category) {
        return this._rateLimits[category] || this._rateLimits.all;
      };
      BaseTransport2.prototype._isRateLimited = function(category) {
        return this._disabledUntil(category) > new Date(Date.now());
      };
      BaseTransport2.prototype._handleRateLimit = function(headers) {
        var e_1, _a, e_2, _b;
        var now = Date.now();
        var rlHeader = headers["x-sentry-rate-limits"];
        var raHeader = headers["retry-after"];
        if (rlHeader) {
          try {
            for (var _c = __values(rlHeader.trim().split(",")), _d = _c.next(); !_d.done; _d = _c.next()) {
              var limit = _d.value;
              var parameters = limit.split(":", 2);
              var headerDelay = parseInt(parameters[0], 10);
              var delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
              try {
                for (var _e = (e_2 = void 0, __values(parameters[1].split(";"))), _f = _e.next(); !_f.done; _f = _e.next()) {
                  var category = _f.value;
                  this._rateLimits[category || "all"] = new Date(now + delay);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (_f && !_f.done && (_b = _e.return))
                    _b.call(_e);
                } finally {
                  if (e_2)
                    throw e_2.error;
                }
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_d && !_d.done && (_a = _c.return))
                _a.call(_c);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return true;
        } else if (raHeader) {
          this._rateLimits.all = new Date(now + parseRetryAfterHeader(now, raHeader));
          return true;
        }
        return false;
      };
      return BaseTransport2;
    }()
  );

  // node_modules/@sentry/browser/esm/transports/fetch.js
  var global4 = getGlobalObject();
  var FetchTransport = (
    /** @class */
    function(_super) {
      __extends(FetchTransport2, _super);
      function FetchTransport2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      FetchTransport2.prototype.sendEvent = function(event) {
        return this._sendRequest(eventToSentryRequest(event, this._api), event);
      };
      FetchTransport2.prototype.sendSession = function(session) {
        return this._sendRequest(sessionToSentryRequest(session, this._api), session);
      };
      FetchTransport2.prototype._sendRequest = function(sentryRequest, originalPayload) {
        var _this = this;
        if (this._isRateLimited(sentryRequest.type)) {
          return Promise.reject({
            event: originalPayload,
            type: sentryRequest.type,
            reason: "Transport locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
            status: 429
          });
        }
        var options = {
          body: sentryRequest.body,
          method: "POST",
          // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
          // https://caniuse.com/#feat=referrer-policy
          // It doesn't. And it throw exception instead of ignoring this parameter...
          // REF: https://github.com/getsentry/raven-js/issues/1233
          referrerPolicy: supportsReferrerPolicy() ? "origin" : ""
        };
        if (this.options.fetchParameters !== void 0) {
          Object.assign(options, this.options.fetchParameters);
        }
        if (this.options.headers !== void 0) {
          options.headers = this.options.headers;
        }
        return this._buffer.add(new SyncPromise(function(resolve, reject) {
          global4.fetch(sentryRequest.url, options).then(function(response) {
            var headers = {
              "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
              "retry-after": response.headers.get("Retry-After")
            };
            _this._handleResponse({
              requestType: sentryRequest.type,
              response,
              headers,
              resolve,
              reject
            });
          }).catch(reject);
        }));
      };
      return FetchTransport2;
    }(BaseTransport)
  );

  // node_modules/@sentry/browser/esm/transports/xhr.js
  var XHRTransport = (
    /** @class */
    function(_super) {
      __extends(XHRTransport2, _super);
      function XHRTransport2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      XHRTransport2.prototype.sendEvent = function(event) {
        return this._sendRequest(eventToSentryRequest(event, this._api), event);
      };
      XHRTransport2.prototype.sendSession = function(session) {
        return this._sendRequest(sessionToSentryRequest(session, this._api), session);
      };
      XHRTransport2.prototype._sendRequest = function(sentryRequest, originalPayload) {
        var _this = this;
        if (this._isRateLimited(sentryRequest.type)) {
          return Promise.reject({
            event: originalPayload,
            type: sentryRequest.type,
            reason: "Transport locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
            status: 429
          });
        }
        return this._buffer.add(new SyncPromise(function(resolve, reject) {
          var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            if (request.readyState === 4) {
              var headers = {
                "x-sentry-rate-limits": request.getResponseHeader("X-Sentry-Rate-Limits"),
                "retry-after": request.getResponseHeader("Retry-After")
              };
              _this._handleResponse({ requestType: sentryRequest.type, response: request, headers, resolve, reject });
            }
          };
          request.open("POST", sentryRequest.url);
          for (var header in _this.options.headers) {
            if (_this.options.headers.hasOwnProperty(header)) {
              request.setRequestHeader(header, _this.options.headers[header]);
            }
          }
          request.send(sentryRequest.body);
        }));
      };
      return XHRTransport2;
    }(BaseTransport)
  );

  // node_modules/@sentry/browser/esm/backend.js
  var BrowserBackend = (
    /** @class */
    function(_super) {
      __extends(BrowserBackend2, _super);
      function BrowserBackend2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      BrowserBackend2.prototype.eventFromException = function(exception, hint) {
        return eventFromException(this._options, exception, hint);
      };
      BrowserBackend2.prototype.eventFromMessage = function(message, level, hint) {
        if (level === void 0) {
          level = Severity.Info;
        }
        return eventFromMessage(this._options, message, level, hint);
      };
      BrowserBackend2.prototype._setupTransport = function() {
        if (!this._options.dsn) {
          return _super.prototype._setupTransport.call(this);
        }
        var transportOptions = __assign(__assign({}, this._options.transportOptions), { dsn: this._options.dsn });
        if (this._options.transport) {
          return new this._options.transport(transportOptions);
        }
        if (supportsFetch()) {
          return new FetchTransport(transportOptions);
        }
        return new XHRTransport(transportOptions);
      };
      return BrowserBackend2;
    }(BaseBackend)
  );

  // node_modules/@sentry/browser/esm/helpers.js
  var ignoreOnError = 0;
  function shouldIgnoreOnError() {
    return ignoreOnError > 0;
  }
  function ignoreNextOnError() {
    ignoreOnError += 1;
    setTimeout(function() {
      ignoreOnError -= 1;
    });
  }
  function wrap(fn, options, before) {
    if (options === void 0) {
      options = {};
    }
    if (typeof fn !== "function") {
      return fn;
    }
    try {
      if (fn.__sentry__) {
        return fn;
      }
      if (fn.__sentry_wrapped__) {
        return fn.__sentry_wrapped__;
      }
    } catch (e) {
      return fn;
    }
    var sentryWrapped = function() {
      var args = Array.prototype.slice.call(arguments);
      try {
        if (before && typeof before === "function") {
          before.apply(this, arguments);
        }
        var wrappedArguments = args.map(function(arg) {
          return wrap(arg, options);
        });
        if (fn.handleEvent) {
          return fn.handleEvent.apply(this, wrappedArguments);
        }
        return fn.apply(this, wrappedArguments);
      } catch (ex) {
        ignoreNextOnError();
        withScope(function(scope) {
          scope.addEventProcessor(function(event) {
            var processedEvent = __assign({}, event);
            if (options.mechanism) {
              addExceptionTypeValue(processedEvent, void 0, void 0);
              addExceptionMechanism(processedEvent, options.mechanism);
            }
            processedEvent.extra = __assign(__assign({}, processedEvent.extra), { arguments: args });
            return processedEvent;
          });
          captureException(ex);
        });
        throw ex;
      }
    };
    try {
      for (var property in fn) {
        if (Object.prototype.hasOwnProperty.call(fn, property)) {
          sentryWrapped[property] = fn[property];
        }
      }
    } catch (_oO) {
    }
    fn.prototype = fn.prototype || {};
    sentryWrapped.prototype = fn.prototype;
    Object.defineProperty(fn, "__sentry_wrapped__", {
      enumerable: false,
      value: sentryWrapped
    });
    Object.defineProperties(sentryWrapped, {
      __sentry__: {
        enumerable: false,
        value: true
      },
      __sentry_original__: {
        enumerable: false,
        value: fn
      }
    });
    try {
      var descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, "name");
      if (descriptor.configurable) {
        Object.defineProperty(sentryWrapped, "name", {
          get: function() {
            return fn.name;
          }
        });
      }
    } catch (_oO) {
    }
    return sentryWrapped;
  }
  function injectReportDialog(options) {
    if (options === void 0) {
      options = {};
    }
    if (!options.eventId) {
      logger.error("Missing eventId option in showReportDialog call");
      return;
    }
    if (!options.dsn) {
      logger.error("Missing dsn option in showReportDialog call");
      return;
    }
    var script = document.createElement("script");
    script.async = true;
    script.src = new API(options.dsn).getReportDialogEndpoint(options);
    if (options.onLoad) {
      script.onload = options.onLoad;
    }
    (document.head || document.body).appendChild(script);
  }

  // node_modules/@sentry/browser/esm/integrations/index.js
  var integrations_exports2 = {};
  __export(integrations_exports2, {
    Breadcrumbs: () => Breadcrumbs,
    GlobalHandlers: () => GlobalHandlers,
    LinkedErrors: () => LinkedErrors,
    TryCatch: () => TryCatch,
    UserAgent: () => UserAgent
  });

  // node_modules/@sentry/browser/esm/integrations/globalhandlers.js
  var GlobalHandlers = (
    /** @class */
    function() {
      function GlobalHandlers2(options) {
        this.name = GlobalHandlers2.id;
        this._onErrorHandlerInstalled = false;
        this._onUnhandledRejectionHandlerInstalled = false;
        this._options = __assign({ onerror: true, onunhandledrejection: true }, options);
      }
      GlobalHandlers2.prototype.setupOnce = function() {
        Error.stackTraceLimit = 50;
        if (this._options.onerror) {
          logger.log("Global Handler attached: onerror");
          this._installGlobalOnErrorHandler();
        }
        if (this._options.onunhandledrejection) {
          logger.log("Global Handler attached: onunhandledrejection");
          this._installGlobalOnUnhandledRejectionHandler();
        }
      };
      GlobalHandlers2.prototype._installGlobalOnErrorHandler = function() {
        var _this = this;
        if (this._onErrorHandlerInstalled) {
          return;
        }
        addInstrumentationHandler({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function(data) {
            var error = data.error;
            var currentHub = getCurrentHub();
            var hasIntegration = currentHub.getIntegration(GlobalHandlers2);
            var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
            if (!hasIntegration || shouldIgnoreOnError() || isFailedOwnDelivery) {
              return;
            }
            var client = currentHub.getClient();
            var event = isPrimitive(error) ? _this._eventFromIncompleteOnError(data.msg, data.url, data.line, data.column) : _this._enhanceEventWithInitialFrame(eventFromUnknownInput(error, void 0, {
              attachStacktrace: client && client.getOptions().attachStacktrace,
              rejection: false
            }), data.url, data.line, data.column);
            addExceptionMechanism(event, {
              handled: false,
              type: "onerror"
            });
            currentHub.captureEvent(event, {
              originalException: error
            });
          },
          type: "error"
        });
        this._onErrorHandlerInstalled = true;
      };
      GlobalHandlers2.prototype._installGlobalOnUnhandledRejectionHandler = function() {
        var _this = this;
        if (this._onUnhandledRejectionHandlerInstalled) {
          return;
        }
        addInstrumentationHandler({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function(e) {
            var error = e;
            try {
              if ("reason" in e) {
                error = e.reason;
              } else if ("detail" in e && "reason" in e.detail) {
                error = e.detail.reason;
              }
            } catch (_oO) {
            }
            var currentHub = getCurrentHub();
            var hasIntegration = currentHub.getIntegration(GlobalHandlers2);
            var isFailedOwnDelivery = error && error.__sentry_own_request__ === true;
            if (!hasIntegration || shouldIgnoreOnError() || isFailedOwnDelivery) {
              return true;
            }
            var client = currentHub.getClient();
            var event = isPrimitive(error) ? _this._eventFromRejectionWithPrimitive(error) : eventFromUnknownInput(error, void 0, {
              attachStacktrace: client && client.getOptions().attachStacktrace,
              rejection: true
            });
            event.level = Severity.Error;
            addExceptionMechanism(event, {
              handled: false,
              type: "onunhandledrejection"
            });
            currentHub.captureEvent(event, {
              originalException: error
            });
            return;
          },
          type: "unhandledrejection"
        });
        this._onUnhandledRejectionHandlerInstalled = true;
      };
      GlobalHandlers2.prototype._eventFromIncompleteOnError = function(msg, url, line, column) {
        var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
        var message = isErrorEvent(msg) ? msg.message : msg;
        var name;
        if (isString(message)) {
          var groups = message.match(ERROR_TYPES_RE);
          if (groups) {
            name = groups[1];
            message = groups[2];
          }
        }
        var event = {
          exception: {
            values: [
              {
                type: name || "Error",
                value: message
              }
            ]
          }
        };
        return this._enhanceEventWithInitialFrame(event, url, line, column);
      };
      GlobalHandlers2.prototype._eventFromRejectionWithPrimitive = function(reason) {
        return {
          exception: {
            values: [
              {
                type: "UnhandledRejection",
                // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
                value: "Non-Error promise rejection captured with value: " + String(reason)
              }
            ]
          }
        };
      };
      GlobalHandlers2.prototype._enhanceEventWithInitialFrame = function(event, url, line, column) {
        event.exception = event.exception || {};
        event.exception.values = event.exception.values || [];
        event.exception.values[0] = event.exception.values[0] || {};
        event.exception.values[0].stacktrace = event.exception.values[0].stacktrace || {};
        event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames || [];
        var colno = isNaN(parseInt(column, 10)) ? void 0 : column;
        var lineno = isNaN(parseInt(line, 10)) ? void 0 : line;
        var filename = isString(url) && url.length > 0 ? url : getLocationHref();
        if (event.exception.values[0].stacktrace.frames.length === 0) {
          event.exception.values[0].stacktrace.frames.push({
            colno,
            filename,
            function: "?",
            in_app: true,
            lineno
          });
        }
        return event;
      };
      GlobalHandlers2.id = "GlobalHandlers";
      return GlobalHandlers2;
    }()
  );

  // node_modules/@sentry/browser/esm/integrations/trycatch.js
  var DEFAULT_EVENT_TARGET = [
    "EventTarget",
    "Window",
    "Node",
    "ApplicationCache",
    "AudioTrackList",
    "ChannelMergerNode",
    "CryptoOperation",
    "EventSource",
    "FileReader",
    "HTMLUnknownElement",
    "IDBDatabase",
    "IDBRequest",
    "IDBTransaction",
    "KeyOperation",
    "MediaController",
    "MessagePort",
    "ModalWindow",
    "Notification",
    "SVGElementInstance",
    "Screen",
    "TextTrack",
    "TextTrackCue",
    "TextTrackList",
    "WebSocket",
    "WebSocketWorker",
    "Worker",
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "XMLHttpRequestUpload"
  ];
  var TryCatch = (
    /** @class */
    function() {
      function TryCatch2(options) {
        this.name = TryCatch2.id;
        this._options = __assign({ XMLHttpRequest: true, eventTarget: true, requestAnimationFrame: true, setInterval: true, setTimeout: true }, options);
      }
      TryCatch2.prototype.setupOnce = function() {
        var global6 = getGlobalObject();
        if (this._options.setTimeout) {
          fill(global6, "setTimeout", this._wrapTimeFunction.bind(this));
        }
        if (this._options.setInterval) {
          fill(global6, "setInterval", this._wrapTimeFunction.bind(this));
        }
        if (this._options.requestAnimationFrame) {
          fill(global6, "requestAnimationFrame", this._wrapRAF.bind(this));
        }
        if (this._options.XMLHttpRequest && "XMLHttpRequest" in global6) {
          fill(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this));
        }
        if (this._options.eventTarget) {
          var eventTarget = Array.isArray(this._options.eventTarget) ? this._options.eventTarget : DEFAULT_EVENT_TARGET;
          eventTarget.forEach(this._wrapEventTarget.bind(this));
        }
      };
      TryCatch2.prototype._wrapTimeFunction = function(original) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var originalCallback = args[0];
          args[0] = wrap(originalCallback, {
            mechanism: {
              data: { function: getFunctionName(original) },
              handled: true,
              type: "instrument"
            }
          });
          return original.apply(this, args);
        };
      };
      TryCatch2.prototype._wrapRAF = function(original) {
        return function(callback) {
          return original.call(this, wrap(callback, {
            mechanism: {
              data: {
                function: "requestAnimationFrame",
                handler: getFunctionName(original)
              },
              handled: true,
              type: "instrument"
            }
          }));
        };
      };
      TryCatch2.prototype._wrapEventTarget = function(target) {
        var global6 = getGlobalObject();
        var proto = global6[target] && global6[target].prototype;
        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
          return;
        }
        fill(proto, "addEventListener", function(original) {
          return function(eventName, fn, options) {
            try {
              if (typeof fn.handleEvent === "function") {
                fn.handleEvent = wrap(fn.handleEvent.bind(fn), {
                  mechanism: {
                    data: {
                      function: "handleEvent",
                      handler: getFunctionName(fn),
                      target
                    },
                    handled: true,
                    type: "instrument"
                  }
                });
              }
            } catch (err) {
            }
            return original.call(
              this,
              eventName,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              wrap(fn, {
                mechanism: {
                  data: {
                    function: "addEventListener",
                    handler: getFunctionName(fn),
                    target
                  },
                  handled: true,
                  type: "instrument"
                }
              }),
              options
            );
          };
        });
        fill(proto, "removeEventListener", function(originalRemoveEventListener) {
          return function(eventName, fn, options) {
            var _a;
            var wrappedEventHandler = fn;
            try {
              var originalEventHandler = (_a = wrappedEventHandler) === null || _a === void 0 ? void 0 : _a.__sentry_wrapped__;
              if (originalEventHandler) {
                originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
              }
            } catch (e) {
            }
            return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
          };
        });
      };
      TryCatch2.prototype._wrapXHR = function(originalSend) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var xhr = this;
          var xmlHttpRequestProps = ["onload", "onerror", "onprogress", "onreadystatechange"];
          xmlHttpRequestProps.forEach(function(prop) {
            if (prop in xhr && typeof xhr[prop] === "function") {
              fill(xhr, prop, function(original) {
                var wrapOptions = {
                  mechanism: {
                    data: {
                      function: prop,
                      handler: getFunctionName(original)
                    },
                    handled: true,
                    type: "instrument"
                  }
                };
                if (original.__sentry_original__) {
                  wrapOptions.mechanism.data.handler = getFunctionName(original.__sentry_original__);
                }
                return wrap(original, wrapOptions);
              });
            }
          });
          return originalSend.apply(this, args);
        };
      };
      TryCatch2.id = "TryCatch";
      return TryCatch2;
    }()
  );

  // node_modules/@sentry/browser/esm/integrations/breadcrumbs.js
  var Breadcrumbs = (
    /** @class */
    function() {
      function Breadcrumbs2(options) {
        this.name = Breadcrumbs2.id;
        this._options = __assign({ console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, options);
      }
      Breadcrumbs2.prototype.addSentryBreadcrumb = function(event) {
        if (!this._options.sentry) {
          return;
        }
        getCurrentHub().addBreadcrumb({
          category: "sentry." + (event.type === "transaction" ? "transaction" : "event"),
          event_id: event.event_id,
          level: event.level,
          message: getEventDescription(event)
        }, {
          event
        });
      };
      Breadcrumbs2.prototype.setupOnce = function() {
        var _this = this;
        if (this._options.console) {
          addInstrumentationHandler({
            callback: function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              _this._consoleBreadcrumb.apply(_this, __spread(args));
            },
            type: "console"
          });
        }
        if (this._options.dom) {
          addInstrumentationHandler({
            callback: function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              _this._domBreadcrumb.apply(_this, __spread(args));
            },
            type: "dom"
          });
        }
        if (this._options.xhr) {
          addInstrumentationHandler({
            callback: function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              _this._xhrBreadcrumb.apply(_this, __spread(args));
            },
            type: "xhr"
          });
        }
        if (this._options.fetch) {
          addInstrumentationHandler({
            callback: function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              _this._fetchBreadcrumb.apply(_this, __spread(args));
            },
            type: "fetch"
          });
        }
        if (this._options.history) {
          addInstrumentationHandler({
            callback: function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              _this._historyBreadcrumb.apply(_this, __spread(args));
            },
            type: "history"
          });
        }
      };
      Breadcrumbs2.prototype._consoleBreadcrumb = function(handlerData) {
        var breadcrumb = {
          category: "console",
          data: {
            arguments: handlerData.args,
            logger: "console"
          },
          level: Severity.fromString(handlerData.level),
          message: safeJoin(handlerData.args, " ")
        };
        if (handlerData.level === "assert") {
          if (handlerData.args[0] === false) {
            breadcrumb.message = "Assertion failed: " + (safeJoin(handlerData.args.slice(1), " ") || "console.assert");
            breadcrumb.data.arguments = handlerData.args.slice(1);
          } else {
            return;
          }
        }
        getCurrentHub().addBreadcrumb(breadcrumb, {
          input: handlerData.args,
          level: handlerData.level
        });
      };
      Breadcrumbs2.prototype._domBreadcrumb = function(handlerData) {
        var target;
        try {
          target = handlerData.event.target ? htmlTreeAsString(handlerData.event.target) : htmlTreeAsString(handlerData.event);
        } catch (e) {
          target = "<unknown>";
        }
        if (target.length === 0) {
          return;
        }
        getCurrentHub().addBreadcrumb({
          category: "ui." + handlerData.name,
          message: target
        }, {
          event: handlerData.event,
          name: handlerData.name
        });
      };
      Breadcrumbs2.prototype._xhrBreadcrumb = function(handlerData) {
        if (handlerData.endTimestamp) {
          if (handlerData.xhr.__sentry_own_request__) {
            return;
          }
          var _a = handlerData.xhr.__sentry_xhr__ || {}, method = _a.method, url = _a.url, status_code = _a.status_code, body = _a.body;
          getCurrentHub().addBreadcrumb({
            category: "xhr",
            data: {
              method,
              url,
              status_code
            },
            type: "http"
          }, {
            xhr: handlerData.xhr,
            input: body
          });
          return;
        }
      };
      Breadcrumbs2.prototype._fetchBreadcrumb = function(handlerData) {
        if (!handlerData.endTimestamp) {
          return;
        }
        if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === "POST") {
          return;
        }
        if (handlerData.error) {
          getCurrentHub().addBreadcrumb({
            category: "fetch",
            data: handlerData.fetchData,
            level: Severity.Error,
            type: "http"
          }, {
            data: handlerData.error,
            input: handlerData.args
          });
        } else {
          getCurrentHub().addBreadcrumb({
            category: "fetch",
            data: __assign(__assign({}, handlerData.fetchData), { status_code: handlerData.response.status }),
            type: "http"
          }, {
            input: handlerData.args,
            response: handlerData.response
          });
        }
      };
      Breadcrumbs2.prototype._historyBreadcrumb = function(handlerData) {
        var global6 = getGlobalObject();
        var from = handlerData.from;
        var to = handlerData.to;
        var parsedLoc = parseUrl(global6.location.href);
        var parsedFrom = parseUrl(from);
        var parsedTo = parseUrl(to);
        if (!parsedFrom.path) {
          parsedFrom = parsedLoc;
        }
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
          to = parsedTo.relative;
        }
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
          from = parsedFrom.relative;
        }
        getCurrentHub().addBreadcrumb({
          category: "navigation",
          data: {
            from,
            to
          }
        });
      };
      Breadcrumbs2.id = "Breadcrumbs";
      return Breadcrumbs2;
    }()
  );

  // node_modules/@sentry/browser/esm/integrations/linkederrors.js
  var DEFAULT_KEY = "cause";
  var DEFAULT_LIMIT = 5;
  var LinkedErrors = (
    /** @class */
    function() {
      function LinkedErrors2(options) {
        if (options === void 0) {
          options = {};
        }
        this.name = LinkedErrors2.id;
        this._key = options.key || DEFAULT_KEY;
        this._limit = options.limit || DEFAULT_LIMIT;
      }
      LinkedErrors2.prototype.setupOnce = function() {
        addGlobalEventProcessor(function(event, hint) {
          var self2 = getCurrentHub().getIntegration(LinkedErrors2);
          if (self2) {
            return self2._handler(event, hint);
          }
          return event;
        });
      };
      LinkedErrors2.prototype._handler = function(event, hint) {
        if (!event.exception || !event.exception.values || !hint || !isInstanceOf(hint.originalException, Error)) {
          return event;
        }
        var linkedErrors = this._walkErrorTree(hint.originalException, this._key);
        event.exception.values = __spread(linkedErrors, event.exception.values);
        return event;
      };
      LinkedErrors2.prototype._walkErrorTree = function(error, key, stack) {
        if (stack === void 0) {
          stack = [];
        }
        if (!isInstanceOf(error[key], Error) || stack.length + 1 >= this._limit) {
          return stack;
        }
        var stacktrace = computeStackTrace(error[key]);
        var exception = exceptionFromStacktrace(stacktrace);
        return this._walkErrorTree(error[key], key, __spread([exception], stack));
      };
      LinkedErrors2.id = "LinkedErrors";
      return LinkedErrors2;
    }()
  );

  // node_modules/@sentry/browser/esm/integrations/useragent.js
  var global5 = getGlobalObject();
  var UserAgent = (
    /** @class */
    function() {
      function UserAgent2() {
        this.name = UserAgent2.id;
      }
      UserAgent2.prototype.setupOnce = function() {
        addGlobalEventProcessor(function(event) {
          var _a, _b, _c;
          if (getCurrentHub().getIntegration(UserAgent2)) {
            if (!global5.navigator && !global5.location && !global5.document) {
              return event;
            }
            var url = ((_a = event.request) === null || _a === void 0 ? void 0 : _a.url) || ((_b = global5.location) === null || _b === void 0 ? void 0 : _b.href);
            var referrer = (global5.document || {}).referrer;
            var userAgent = (global5.navigator || {}).userAgent;
            var headers = __assign(__assign(__assign({}, (_c = event.request) === null || _c === void 0 ? void 0 : _c.headers), referrer && { Referer: referrer }), userAgent && { "User-Agent": userAgent });
            var request = __assign(__assign({}, url && { url }), { headers });
            return __assign(__assign({}, event), { request });
          }
          return event;
        });
      };
      UserAgent2.id = "UserAgent";
      return UserAgent2;
    }()
  );

  // node_modules/@sentry/browser/esm/version.js
  var SDK_NAME = "sentry.javascript.browser";
  var SDK_VERSION = "5.30.0";

  // node_modules/@sentry/browser/esm/client.js
  var BrowserClient = (
    /** @class */
    function(_super) {
      __extends(BrowserClient2, _super);
      function BrowserClient2(options) {
        if (options === void 0) {
          options = {};
        }
        return _super.call(this, BrowserBackend, options) || this;
      }
      BrowserClient2.prototype.showReportDialog = function(options) {
        if (options === void 0) {
          options = {};
        }
        var document2 = getGlobalObject().document;
        if (!document2) {
          return;
        }
        if (!this._isEnabled()) {
          logger.error("Trying to call showReportDialog with Sentry Client disabled");
          return;
        }
        injectReportDialog(__assign(__assign({}, options), { dsn: options.dsn || this.getDsn() }));
      };
      BrowserClient2.prototype._prepareEvent = function(event, scope, hint) {
        event.platform = event.platform || "javascript";
        event.sdk = __assign(__assign({}, event.sdk), { name: SDK_NAME, packages: __spread(event.sdk && event.sdk.packages || [], [
          {
            name: "npm:@sentry/browser",
            version: SDK_VERSION
          }
        ]), version: SDK_VERSION });
        return _super.prototype._prepareEvent.call(this, event, scope, hint);
      };
      BrowserClient2.prototype._sendEvent = function(event) {
        var integration = this.getIntegration(Breadcrumbs);
        if (integration) {
          integration.addSentryBreadcrumb(event);
        }
        _super.prototype._sendEvent.call(this, event);
      };
      return BrowserClient2;
    }(BaseClient)
  );

  // node_modules/@sentry/browser/esm/sdk.js
  var defaultIntegrations = [
    new integrations_exports.InboundFilters(),
    new integrations_exports.FunctionToString(),
    new TryCatch(),
    new Breadcrumbs(),
    new GlobalHandlers(),
    new LinkedErrors(),
    new UserAgent()
  ];
  function init(options) {
    if (options === void 0) {
      options = {};
    }
    if (options.defaultIntegrations === void 0) {
      options.defaultIntegrations = defaultIntegrations;
    }
    if (options.release === void 0) {
      var window_1 = getGlobalObject();
      if (window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id) {
        options.release = window_1.SENTRY_RELEASE.id;
      }
    }
    if (options.autoSessionTracking === void 0) {
      options.autoSessionTracking = false;
    }
    initAndBind(BrowserClient, options);
    if (options.autoSessionTracking) {
      startSessionTracking();
    }
  }
  function showReportDialog(options) {
    if (options === void 0) {
      options = {};
    }
    if (!options.eventId) {
      options.eventId = getCurrentHub().lastEventId();
    }
    var client = getCurrentHub().getClient();
    if (client) {
      client.showReportDialog(options);
    }
  }
  function lastEventId() {
    return getCurrentHub().lastEventId();
  }
  function forceLoad() {
  }
  function onLoad(callback) {
    callback();
  }
  function flush(timeout) {
    var client = getCurrentHub().getClient();
    if (client) {
      return client.flush(timeout);
    }
    return SyncPromise.reject(false);
  }
  function close(timeout) {
    var client = getCurrentHub().getClient();
    if (client) {
      return client.close(timeout);
    }
    return SyncPromise.reject(false);
  }
  function wrap2(fn) {
    return wrap(fn)();
  }
  function startSessionTracking() {
    var window2 = getGlobalObject();
    var hub = getCurrentHub();
    var loadResolved = document.readyState === "complete";
    var fcpResolved = false;
    var possiblyEndSession = function() {
      if (fcpResolved && loadResolved) {
        hub.endSession();
      }
    };
    var resolveWindowLoaded = function() {
      loadResolved = true;
      possiblyEndSession();
      window2.removeEventListener("load", resolveWindowLoaded);
    };
    hub.startSession();
    if (!loadResolved) {
      window2.addEventListener("load", resolveWindowLoaded);
    }
    try {
      var po = new PerformanceObserver(function(entryList, po2) {
        entryList.getEntries().forEach(function(entry) {
          if (entry.name === "first-contentful-paint" && entry.startTime < firstHiddenTime_1) {
            po2.disconnect();
            fcpResolved = true;
            possiblyEndSession();
          }
        });
      });
      var firstHiddenTime_1 = document.visibilityState === "hidden" ? 0 : Infinity;
      document.addEventListener("visibilitychange", function(event) {
        firstHiddenTime_1 = Math.min(firstHiddenTime_1, event.timeStamp);
      }, { once: true });
      po.observe({
        type: "paint",
        buffered: true
      });
    } catch (e) {
      fcpResolved = true;
      possiblyEndSession();
    }
  }

  // node_modules/@sentry/browser/esm/index.js
  var windowIntegrations = {};
  var _window = getGlobalObject();
  if (_window.Sentry && _window.Sentry.Integrations) {
    windowIntegrations = _window.Sentry.Integrations;
  }
  var INTEGRATIONS = __assign(__assign(__assign({}, windowIntegrations), integrations_exports), integrations_exports2);

  // src/common/constants.ts
  var VERSION = "1.6.10";
  var isProd = false;
  var isRateTest = false;
  var isWebApp = location.protocol.startsWith("http");
  var isFirefox = navigator.userAgent.includes("Firefox");
  var LyricsFontFamily = ["CircularSp", "Sans-Serif", "Serif", "Cursive"];

  // src/common/bg.ts
  var import_webextension_polyfill = __toESM(require_browser_polyfill());
  async function getTabs() {
    return import_webextension_polyfill.default.tabs.query({
      url: import_webextension_polyfill.default.runtime.getManifest().content_scripts[0].matches
    });
  }
  async function sendMessage(tabIdOrMsg, msg) {
    if (typeof tabIdOrMsg === "number") {
      import_webextension_polyfill.default.tabs.sendMessage(tabIdOrMsg, msg);
    } else {
      const tabs = await getTabs();
      tabs.forEach((tab) => {
        if (tab?.id)
          import_webextension_polyfill.default.tabs.sendMessage(tab.id, tabIdOrMsg);
      });
    }
  }

  // src/options/store.ts
  var import_webextension_polyfill2 = __toESM(require_browser_polyfill());
  var uiLanguage = import_webextension_polyfill2.default.i18n.getUILanguage();
  var defaultOptions = {
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
    const options = await import_webextension_polyfill2.default.storage.sync.get(defaultOptions);
    if (options.cid === defaultOptions.cid) {
      await import_webextension_polyfill2.default.storage.sync.set({ cid: options.cid });
    }
    return options;
  }

  // src/i18n.ts
  var import_webextension_polyfill3 = __toESM(require_browser_polyfill());

  // public/_locales/en/messages.json
  var messages_default = {
    extensionName: {
      message: "SLyrics",
      description: "Name of the extension"
    },
    extensionDescription: {
      message: "Instant synchronized lyrics display in picture-in-picture window",
      description: "Description of the extension"
    },
    actionDisableTitle: {
      message: "View other lyrics after opening lyrics",
      description: "Browser action disable title"
    },
    actionEnableTitle: {
      message: "Try other lyrics",
      description: "Browser action enable title"
    },
    popupMissMatch: {
      message: "No songs currently available",
      description: "The currently playing song was not found on the lyrics service."
    },
    popupConfirmTip: {
      message: "Save this change?",
      description: "Request confirmation from the user"
    },
    popupConfirmSave: {
      message: "Save",
      description: "Save user selection"
    },
    popupConfirmCancel: {
      message: "Cancel",
      description: "Cancel manually set lyrics"
    },
    popupMatchDescription1: {
      message: "Try other lyrics or",
      description: "Lyric matching description1"
    },
    popupMatchDescription2: {
      message: "use default",
      description: "Lyric matching use default"
    },
    popupMatchDescription3: {
      message: "",
      description: "Lyric matching description3"
    },
    optionsSaveTip1: {
      message: "Switch song to take effect",
      description: "Some tips for saving options"
    },
    optionsSaveTip2: {
      message: "Reopen the lyrics to take effect",
      description: "Some tips for saving options"
    },
    optionsFontSize: {
      message: "Lyrics font size",
      description: "Specify lyrics font size"
    },
    optionsFontSizeDetail: {
      message: "This is a relative size, the width of the lyrics window is treated as 640px",
      description: "Specify font size detail"
    },
    optionsFontFamily: {
      message: "Lyrics font family",
      description: "Specify lyrics font family"
    },
    optionsLyricsAlign: {
      message: "Lyrics align",
      description: "Specify alignment"
    },
    optionsHDCover: {
      message: "Use high-resolution cover as the lyrics background",
      description: "Use high-resolution cover as the lyrics background"
    },
    optionsHDCoverDetail: {
      message: "Fall back to the blurred cover when the high-resolution cover fails to load",
      description: "Use high-resolution cover as the lyrics background detail"
    },
    optionsUseUnreviewedLyrics: {
      message: "Use unreviewed lyrics",
      description: "Use unreviewed lyrics"
    },
    optionsUseUnreviewedLyricsDetail: {
      message: "Use lyrics uploaded by other users but not reviewed",
      description: "Use unreviewed lyrics detail"
    },
    optionsShowLyrics: {
      message: "Only show cover",
      description: "Only show cover option"
    },
    optionsShowCleanLyrics: {
      message: "Show clean lyrics",
      description: "Show clean lyrics option"
    },
    optionsShowCleanLyricsDetail: {
      message: "Hide composer and producer information",
      description: "Show clean lyrics option detail"
    },
    optionsTraditionalChineseLyrics: {
      message: "Traditional chinese lyrics",
      description: "Lyrics use traditional chinese"
    },
    optionsLyricsTransform: {
      message: "Lyrics transform"
    },
    optionsLyricsServer: {
      message: "Lyrics server"
    },
    optionsLyricsTransformDetail: {
      message: "When using simplified Chinese, try to load the translated lyrics"
    },
    optionsLyricsPosition: {
      message: "Where the lyrics show",
      description: "Lyrics position option"
    },
    optionsToggleShortcut: {
      message: "Shortcut",
      description: "Toggle show lyrics shortcut"
    },
    optionsToggleShortcutDetail: {
      message: "When webapp is in focus, you can use shortcuts to open and close lyrics, global shortcut: chrome://extensions/shortcuts",
      description: "Toggle show lyrics shortcut detail"
    },
    menusFeedback: {
      message: "Feedback",
      description: "Feedback context menus item"
    },
    menusWelcome: {
      message: "Welcome",
      description: "Welcome menus item"
    },
    menusRateMe: {
      message: "Rate this extension",
      description: "Rate me context menus item"
    },
    pageButtonTitle: {
      message: "Lyrics",
      description: "Lyrics button title"
    },
    pageTipError: {
      message: "Error",
      description: "Load lyrics error tip"
    },
    pageTipNoLyrics: {
      message: "No lyrics",
      description: "No lyrics tip"
    },
    pageTipLoading: {
      message: "Loading...",
      description: "Loading lyrics tip"
    },
    pageTipWaiting: {
      message: "Waiting to play...",
      description: "Waiting for music tip"
    },
    pageEditorOpenValid: {
      message: "Please open the lyrics first",
      description: "Open LRC editor fail tip"
    },
    pageEditorTitle: {
      message: "LRC Editor",
      description: "LRC editor title"
    },
    pageEditorSearch: {
      message: "Search lyrics",
      description: "Search lyrics tip"
    },
    pageEditorPlaybackRate: {
      message: "Playback rate",
      description: "Audio playback rate"
    },
    pageEditorOffset: {
      message: "Global offset",
      description: "Lyrics offset lable"
    },
    pageEditorOffsetDetail: {
      message: "Offset 0.1s",
      description: "Lyrics offset button title"
    },
    pageEditorClearAll: {
      message: "Clear all",
      description: "Cleaer all lyrics"
    },
    pageEditorSeek: {
      message: "Jump",
      description: "Track seek tip"
    },
    pageEditorAddLyrics1: {
      message: "Paste or",
      description: "Paste or upload lyrics"
    },
    pageEditorAddLyrics2: {
      message: "choose",
      description: "Paste or upload lyrics"
    },
    pageEditorAddLyrics3: {
      message: "lyrics",
      description: "Paste or upload lyrics"
    },
    pageEditorMarkLine: {
      message: "Mark Line",
      description: "Mark line"
    },
    pageEditorInsetLine: {
      message: "Inset Line",
      description: "Inset line"
    },
    pageEditorReset: {
      message: "Reset",
      description: "Reset remote and local lyrics"
    },
    pageEditorDownload: {
      message: "Download",
      description: "Download lyrics"
    },
    pageEditorSave: {
      message: "Save",
      description: "Save lyrics"
    },
    pageEditorSaveValid: {
      message: "Please add a timestamp to each line of text",
      description: "Save lyrics valid tip"
    }
  };

  // src/i18n.ts
  var i18n = Object.keys(messages_default).reduce(
    (p, c) => {
      p[c] = (...rest) => import_webextension_polyfill3.default.i18n.getMessage(c, ...rest);
      return p;
    },
    {}
  );
  var i18nMap = Object.keys(messages_default).reduce(
    (p, c) => {
      p[c] = import_webextension_polyfill3.default.i18n.getMessage(c);
      return p;
    },
    {}
  );

  // src/background.ts
  init({
    dsn: "https://124df8398d8b466fbcf09ec64bcfe144@o55145.ingest.sentry.io/5353517",
    release: VERSION,
    environment: isProd ? "prod" : "dev"
  });
  getOptions().then(({ cid }) => setUser({ id: cid }));
  if (!import_webextension_polyfill4.default.action) {
    import_webextension_polyfill4.default.action = import_webextension_polyfill4.default.browserAction;
    const oCreate = import_webextension_polyfill4.default.contextMenus.create;
    import_webextension_polyfill4.default.contextMenus.create = (arg) => {
      return oCreate({
        ...arg,
        contexts: arg.contexts?.map(
          (e) => e === "action" ? "browser_action" : ""
        )
      });
    };
  }
  function disableBrowserAction() {
    import_webextension_polyfill4.default.action.disable();
    import_webextension_polyfill4.default.action.setTitle({ title: i18n.actionDisableTitle() });
  }
  function enableBrowserAction() {
    import_webextension_polyfill4.default.action.enable();
    import_webextension_polyfill4.default.action.setTitle({ title: i18n.actionEnableTitle() });
  }
  disableBrowserAction();
  import_webextension_polyfill4.default.runtime.onMessage.addListener(async (msg, sender) => {
    const tabId = sender.tab?.id;
    const { type, data } = msg || {};
    switch (type) {
      case 100004 /* GET_OPTIONS */: {
        const options = await getOptions();
        if (!tabId)
          return;
        sendMessage(tabId, {
          type: 100005 /* SEND_OPTIONS */,
          data: { ...options, i18nMap }
        });
        return;
      }
      case 100007 /* POPUP_ACTIVE */: {
        if (data === true) {
          enableBrowserAction();
        } else {
          disableBrowserAction();
        }
        return;
      }
      case 100008 /* CAPTURE_EXCEPTION */: {
        const err = new Error(data.message);
        err.name = data.name;
        err.stack = data.stack;
        esm_exports?.captureException(err, {
          extra: data.extra
        });
        return;
      }
      case 100009 /* SEND_REQUEST */: {
        const { reqId, uri, options } = data;
        if (!tabId)
          return;
        const sendRes = (data2) => {
          sendMessage(tabId, { type: 100010 /* SEND_RESPONSE */, data: { reqId, ...data2 } });
        };
        try {
          const res = await fetch(uri, options);
          if (res.status === 0)
            throw "Request fail";
          if (res.status >= 400)
            throw res.statusText;
          const res2 = res.clone();
          let result;
          try {
            result = await res.json();
          } catch {
            result = await res2.text();
          }
          sendRes({ ok: true, data: result });
        } catch (err) {
          sendRes({ ok: false, data: String(err) });
        }
        return;
      }
    }
  });
  import_webextension_polyfill4.default.commands.onCommand.addListener((command) => {
    switch (command) {
      case "toggle": {
        return getTabs().then(async (tabs) => {
          const tab = tabs.find((e) => !!e.id);
          if (!tab)
            return;
          await import_webextension_polyfill4.default.windows.update(tab.windowId, { focused: true });
          await import_webextension_polyfill4.default.tabs.update(tab.id, { active: true });
          sendMessage({ type: 100011 /* TOGGLE */ });
        });
      }
    }
  });
  import_webextension_polyfill4.default.contextMenus.create({
    id: "welcome" /* WELCOME */,
    title: i18n.menusWelcome(),
    contexts: ["action"]
  });
  import_webextension_polyfill4.default.contextMenus.create({
    id: "feedback" /* FEEDBACK */,
    title: i18n.menusFeedback(),
    contexts: ["action"]
  });
  var storeLinkMap = {
    "{d5bcc68d-856a-41e2-8021-d4c51f3b8e4a}": "https://addons.mozilla.org/en-US/firefox/addon/spotify-lyrics/",
    mkjfooclbdgjdclepjeepbmmjaclipod: "https://chrome.google.com/webstore/detail/spotify-lyrics/mkjfooclbdgjdclepjeepbmmjaclipod/reviews",
    aiehldpoaeaidnljjimhbojpblkbembm: "https://microsoftedge.microsoft.com/addons/detail/spotify-lyrics/aiehldpoaeaidnljjimhbojpblkbembm",
    github: "https://github.com/mantou132/Spotify-Lyrics"
  };
  import_webextension_polyfill4.default.contextMenus.create({
    id: "rate-me" /* RATE_ME */,
    title: i18n.menusRateMe(),
    contexts: ["action"]
  });
  var openPage = async (url) => {
    const { windowId } = await import_webextension_polyfill4.default.tabs.create({ url });
    if (windowId)
      import_webextension_polyfill4.default.windows.update(windowId, { focused: true });
  };
  import_webextension_polyfill4.default.contextMenus.onClicked.addListener(async function(info) {
    switch (info.menuItemId) {
      case "welcome" /* WELCOME */:
        openPage(import_webextension_polyfill4.default.runtime.getURL("welcome.html"));
        break;
      case "feedback" /* FEEDBACK */:
        openPage("https://github.com/mantou132/Spotify-Lyrics/issues");
        break;
      case "rate-me" /* RATE_ME */:
        openPage(
          storeLinkMap[import_webextension_polyfill4.default.runtime.id] || storeLinkMap.github
        );
        break;
    }
  });
  import_webextension_polyfill4.default.runtime.setUninstallURL("https://forms.gle/bUWyEqfSTCU9NEwEA");
  import_webextension_polyfill4.default.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
      openPage(import_webextension_polyfill4.default.runtime.getURL("welcome.html"));
    }
  });
  if (isProd && !isFirefox) {
    import_webextension_polyfill4.default.scripting.registerContentScripts([
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        world: "MAIN",
        id: "page",
        runAt: "document_start",
        matches: import_webextension_polyfill4.default.runtime.getManifest().content_scripts[0].matches,
        js: [isRateTest ? "page/rate.js" : "page/index.js"]
      }
    ]).catch(() => {
    });
  }
})();
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
