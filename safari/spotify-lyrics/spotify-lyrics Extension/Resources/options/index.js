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
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js
  var require_webcomponents_bundle = __commonJS({
    "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"(exports) {
      (function() {
        "use strict";
        var v;
        function ba(a) {
          var b = 0;
          return function() {
            return b < a.length ? { done: false, value: a[b++] } : { done: true };
          };
        }
        var ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
          if (a == Array.prototype || a == Object.prototype)
            return a;
          a[b] = c.value;
          return a;
        };
        function da(a) {
          a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
          for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
              return c;
          }
          throw Error("Cannot find global object");
        }
        var ea = da(this);
        function fa(a, b) {
          if (b)
            a: {
              var c = ea;
              a = a.split(".");
              for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c))
                  break a;
                c = c[e];
              }
              a = a[a.length - 1];
              d = c[a];
              b = b(d);
              b != d && null != b && ca(c, a, { configurable: true, writable: true, value: b });
            }
        }
        fa("Symbol", function(a) {
          function b(e) {
            if (this instanceof b)
              throw new TypeError("Symbol is not a constructor");
            return new c("jscomp_symbol_" + (e || "") + "_" + d++, e);
          }
          function c(e, f) {
            this.g = e;
            ca(this, "description", { configurable: true, writable: true, value: f });
          }
          if (a)
            return a;
          c.prototype.toString = function() {
            return this.g;
          };
          var d = 0;
          return b;
        });
        fa("Symbol.iterator", function(a) {
          if (a)
            return a;
          a = Symbol("Symbol.iterator");
          for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ca(d.prototype, a, { configurable: true, writable: true, value: function() {
              return ja(ba(this));
            } });
          }
          return a;
        });
        function ja(a) {
          a = { next: a };
          a[Symbol.iterator] = function() {
            return this;
          };
          return a;
        }
        function ka(a) {
          var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
          return b ? b.call(a) : { next: ba(a) };
        }
        function w(a) {
          if (!(a instanceof Array)) {
            a = ka(a);
            for (var b, c = []; !(b = a.next()).done; )
              c.push(b.value);
            a = c;
          }
          return a;
        }
        var la;
        if ("function" == typeof Object.setPrototypeOf)
          la = Object.setPrototypeOf;
        else {
          var na;
          a: {
            var oa = { a: true }, pa = {};
            try {
              pa.__proto__ = oa;
              na = pa.a;
              break a;
            } catch (a) {
            }
            na = false;
          }
          la = na ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
              throw new TypeError(a + " is not extensible");
            return a;
          } : null;
        }
        var qa = la;
        function ra() {
          this.u = false;
          this.h = null;
          this.Oa = void 0;
          this.g = 1;
          this.ea = 0;
          this.i = null;
        }
        function ua(a) {
          if (a.u)
            throw new TypeError("Generator is already running");
          a.u = true;
        }
        ra.prototype.O = function(a) {
          this.Oa = a;
        };
        function wa(a, b) {
          a.i = { ab: b, fb: true };
          a.g = a.ea;
        }
        ra.prototype.return = function(a) {
          this.i = { return: a };
          this.g = this.ea;
        };
        function ya(a, b) {
          a.g = 3;
          return { value: b };
        }
        function za(a) {
          this.g = new ra();
          this.h = a;
        }
        function Aa(a, b) {
          ua(a.g);
          var c = a.g.h;
          if (c)
            return Ba(a, "return" in c ? c["return"] : function(d) {
              return { value: d, done: true };
            }, b, a.g.return);
          a.g.return(b);
          return Ca(a);
        }
        function Ba(a, b, c, d) {
          try {
            var e = b.call(a.g.h, c);
            if (!(e instanceof Object))
              throw new TypeError("Iterator result " + e + " is not an object");
            if (!e.done)
              return a.g.u = false, e;
            var f = e.value;
          } catch (g) {
            return a.g.h = null, wa(a.g, g), Ca(a);
          }
          a.g.h = null;
          d.call(a.g, f);
          return Ca(a);
        }
        function Ca(a) {
          for (; a.g.g; )
            try {
              var b = a.h(a.g);
              if (b)
                return a.g.u = false, { value: b.value, done: false };
            } catch (c) {
              a.g.Oa = void 0, wa(a.g, c);
            }
          a.g.u = false;
          if (a.g.i) {
            b = a.g.i;
            a.g.i = null;
            if (b.fb)
              throw b.ab;
            return { value: b.return, done: true };
          }
          return { value: void 0, done: true };
        }
        function Da(a) {
          this.next = function(b) {
            ua(a.g);
            a.g.h ? b = Ba(a, a.g.h.next, b, a.g.O) : (a.g.O(b), b = Ca(a));
            return b;
          };
          this.throw = function(b) {
            ua(a.g);
            a.g.h ? b = Ba(a, a.g.h["throw"], b, a.g.O) : (wa(a.g, b), b = Ca(a));
            return b;
          };
          this.return = function(b) {
            return Aa(a, b);
          };
          this[Symbol.iterator] = function() {
            return this;
          };
        }
        function Ea(a, b) {
          b = new Da(new za(b));
          qa && a.prototype && qa(b, a.prototype);
          return b;
        }
        Array.from || (Array.from = function(a) {
          return [].slice.call(a);
        });
        Object.assign || (Object.assign = function(a) {
          for (var b = [].slice.call(arguments, 1), c = 0, d; c < b.length; c++)
            if (d = b[c])
              for (var e = a, f = Object.keys(d), g = 0; g < f.length; g++) {
                var h = f[g];
                e[h] = d[h];
              }
          return a;
        });
        var Fa = setTimeout;
        function Ga() {
        }
        function Ha(a, b) {
          return function() {
            a.apply(b, arguments);
          };
        }
        function A(a) {
          if (!(this instanceof A))
            throw new TypeError("Promises must be constructed via new");
          if ("function" !== typeof a)
            throw new TypeError("not a function");
          this.N = 0;
          this.Ha = false;
          this.I = void 0;
          this.ba = [];
          Ia(a, this);
        }
        function Ja(a, b) {
          for (; 3 === a.N; )
            a = a.I;
          0 === a.N ? a.ba.push(b) : (a.Ha = true, Ka(function() {
            var c = 1 === a.N ? b.hb : b.ib;
            if (null === c)
              (1 === a.N ? La : Ma)(b.promise, a.I);
            else {
              try {
                var d = c(a.I);
              } catch (e) {
                Ma(b.promise, e);
                return;
              }
              La(b.promise, d);
            }
          }));
        }
        function La(a, b) {
          try {
            if (b === a)
              throw new TypeError("A promise cannot be resolved with itself.");
            if (b && ("object" === typeof b || "function" === typeof b)) {
              var c = b.then;
              if (b instanceof A) {
                a.N = 3;
                a.I = b;
                Na(a);
                return;
              }
              if ("function" === typeof c) {
                Ia(Ha(c, b), a);
                return;
              }
            }
            a.N = 1;
            a.I = b;
            Na(a);
          } catch (d) {
            Ma(a, d);
          }
        }
        function Ma(a, b) {
          a.N = 2;
          a.I = b;
          Na(a);
        }
        function Na(a) {
          2 === a.N && 0 === a.ba.length && Ka(function() {
            a.Ha || "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a.I);
          });
          for (var b = 0, c = a.ba.length; b < c; b++)
            Ja(a, a.ba[b]);
          a.ba = null;
        }
        function Oa(a, b, c) {
          this.hb = "function" === typeof a ? a : null;
          this.ib = "function" === typeof b ? b : null;
          this.promise = c;
        }
        function Ia(a, b) {
          var c = false;
          try {
            a(function(d) {
              c || (c = true, La(b, d));
            }, function(d) {
              c || (c = true, Ma(b, d));
            });
          } catch (d) {
            c || (c = true, Ma(b, d));
          }
        }
        A.prototype["catch"] = function(a) {
          return this.then(null, a);
        };
        A.prototype.then = function(a, b) {
          var c = new this.constructor(Ga);
          Ja(this, new Oa(a, b, c));
          return c;
        };
        A.prototype["finally"] = function(a) {
          var b = this.constructor;
          return this.then(function(c) {
            return b.resolve(a()).then(function() {
              return c;
            });
          }, function(c) {
            return b.resolve(a()).then(function() {
              return b.reject(c);
            });
          });
        };
        function Pa(a) {
          return new A(function(b, c) {
            function d(h, k) {
              try {
                if (k && ("object" === typeof k || "function" === typeof k)) {
                  var l = k.then;
                  if ("function" === typeof l) {
                    l.call(k, function(m) {
                      d(h, m);
                    }, c);
                    return;
                  }
                }
                e[h] = k;
                0 === --f && b(e);
              } catch (m) {
                c(m);
              }
            }
            if (!a || "undefined" === typeof a.length)
              return c(new TypeError("Promise.all accepts an array"));
            var e = Array.prototype.slice.call(a);
            if (0 === e.length)
              return b([]);
            for (var f = e.length, g = 0; g < e.length; g++)
              d(g, e[g]);
          });
        }
        function Qa(a) {
          return a && "object" === typeof a && a.constructor === A ? a : new A(function(b) {
            b(a);
          });
        }
        function Ra(a) {
          return new A(function(b, c) {
            c(a);
          });
        }
        function Sa(a) {
          return new A(function(b, c) {
            if (!a || "undefined" === typeof a.length)
              return c(new TypeError("Promise.race accepts an array"));
            for (var d = 0, e = a.length; d < e; d++)
              Qa(a[d]).then(b, c);
          });
        }
        var Ka = "function" === typeof setImmediate && function(a) {
          setImmediate(a);
        } || function(a) {
          Fa(a, 0);
        };
        if (!window.Promise) {
          window.Promise = A;
          A.prototype.then = A.prototype.then;
          A.all = Pa;
          A.race = Sa;
          A.resolve = Qa;
          A.reject = Ra;
          var Ta = document.createTextNode(""), Ua = [];
          new MutationObserver(function() {
            for (var a = Ua.length, b = 0; b < a; b++)
              Ua[b]();
            Ua.splice(0, a);
          }).observe(Ta, { characterData: true });
          Ka = function(a) {
            Ua.push(a);
            Ta.textContent = 0 < Ta.textContent.length ? "" : "a";
          };
        }
        ;
        (function(a, b) {
          if (!(b in a)) {
            var c = typeof global === typeof c ? window : global, d = 0, e = String(Math.random()), f = "__symbol@@" + e, g = a.getOwnPropertyNames, h = a.getOwnPropertyDescriptor, k = a.create, l = a.keys, m = a.freeze || a, q = a.defineProperty, H = a.defineProperties, C = h(a, "getOwnPropertyNames"), t = a.prototype, F = t.hasOwnProperty, E = t.propertyIsEnumerable, N = t.toString, y = function(I, u, G) {
              F.call(I, f) || q(I, f, { enumerable: false, configurable: false, writable: false, value: {} });
              I[f]["@@" + u] = G;
            }, X = function(I, u) {
              var G = k(I);
              g(u).forEach(function(p) {
                sa.call(
                  u,
                  p
                ) && Va(G, p, u[p]);
              });
              return G;
            }, x = function() {
            }, ta = function(I) {
              return I != f && !F.call(ha, I);
            }, ia = function(I) {
              return I != f && F.call(ha, I);
            }, sa = function(I) {
              var u = String(I);
              return ia(u) ? F.call(this, u) && !!this[f] && this[f]["@@" + u] : E.call(this, I);
            }, n = function(I) {
              q(t, I, { enumerable: false, configurable: true, get: x, set: function(u) {
                xa(this, I, { enumerable: false, configurable: true, writable: true, value: u });
                y(this, I, true);
              } });
              ha[I] = q(a(I), "constructor", kc);
              return m(ha[I]);
            }, J = function G(u) {
              if (this instanceof G)
                throw new TypeError("Symbol is not a constructor");
              return n("__symbol:".concat(u || "", e, ++d));
            }, ha = k(null), kc = { value: J }, ib = function(u) {
              return ha[u];
            }, Va = function(u, G, p) {
              var r = String(G);
              if (ia(r)) {
                G = xa;
                if (p.enumerable) {
                  var B = k(p);
                  B.enumerable = false;
                } else
                  B = p;
                G(u, r, B);
                y(u, r, !!p.enumerable);
              } else
                q(u, G, p);
              return u;
            }, jb = function(u) {
              return g(u).filter(ia).map(ib);
            };
            C.value = Va;
            q(a, "defineProperty", C);
            C.value = jb;
            q(a, b, C);
            C.value = function(u) {
              return g(u).filter(ta);
            };
            q(a, "getOwnPropertyNames", C);
            C.value = function(u, G) {
              var p = jb(G);
              p.length ? l(G).concat(p).forEach(function(r) {
                sa.call(
                  G,
                  r
                ) && Va(u, r, G[r]);
              }) : H(u, G);
              return u;
            };
            q(a, "defineProperties", C);
            C.value = sa;
            q(t, "propertyIsEnumerable", C);
            C.value = J;
            q(c, "Symbol", C);
            C.value = function(u) {
              u = "__symbol:".concat("__symbol:", u, e);
              return u in t ? ha[u] : n(u);
            };
            q(J, "for", C);
            C.value = function(u) {
              if (ta(u))
                throw new TypeError(u + " is not a symbol");
              if (F.call(ha, u) && (u = u.slice(10), "__symbol:" === u.slice(0, 10) && (u = u.slice(10), u !== e)))
                return u = u.slice(0, u.length - e.length), 0 < u.length ? u : void 0;
            };
            q(J, "keyFor", C);
            C.value = function(u, G) {
              var p = h(u, G);
              p && ia(G) && (p.enumerable = sa.call(u, G));
              return p;
            };
            q(a, "getOwnPropertyDescriptor", C);
            C.value = function(u, G) {
              return 1 === arguments.length || "undefined" === typeof G ? k(u) : X(u, G);
            };
            q(a, "create", C);
            C.value = function() {
              var u = N.call(this);
              return "[object String]" === u && ia(this) ? "[object Symbol]" : u;
            };
            q(t, "toString", C);
            try {
              if (true === k(q({}, "__symbol:", { get: function() {
                return q(this, "__symbol:", { value: true })["__symbol:"];
              } }))["__symbol:"])
                var xa = q;
              else
                throw "IE11";
            } catch (u) {
              xa = function(G, p, r) {
                var B = h(t, p);
                delete t[p];
                q(G, p, r);
                q(t, p, B);
              };
            }
          }
        })(Object, "getOwnPropertySymbols");
        (function(a, b) {
          var c = a.defineProperty, d = a.prototype, e = d.toString, f;
          "iterator match replace search split hasInstance isConcatSpreadable unscopables species toPrimitive toStringTag".split(" ").forEach(function(g) {
            g in b || (c(b, g, { value: b(g) }), "toStringTag" === g && (f = a.getOwnPropertyDescriptor(d, "toString"), f.value = function() {
              var h = e.call(this), k = null == this ? this : this[b.toStringTag];
              return null == k ? h : "[object " + k + "]";
            }, c(d, "toString", f)));
          });
        })(Object, Symbol);
        (function(a, b, c) {
          function d() {
            return this;
          }
          b[a] || (b[a] = function() {
            var e = 0, f = this, g = { next: function() {
              var h = f.length <= e;
              return h ? { done: h } : { done: h, value: f[e++] };
            } };
            g[a] = d;
            return g;
          });
          c[a] || (c[a] = function() {
            var e = String.fromCodePoint, f = this, g = 0, h = f.length, k = { next: function() {
              var l = h <= g, m = l ? "" : e(f.codePointAt(g));
              g += m.length;
              return l ? { done: l } : { done: l, value: m };
            } };
            k[a] = d;
            return k;
          });
        })(Symbol.iterator, Array.prototype, String.prototype);
        var Wa = Object.prototype.toString;
        Object.prototype.toString = function() {
          return void 0 === this ? "[object Undefined]" : null === this ? "[object Null]" : Wa.call(this);
        };
        Object.keys = function(a) {
          return Object.getOwnPropertyNames(a).filter(function(b) {
            return (b = Object.getOwnPropertyDescriptor(a, b)) && b.enumerable;
          });
        };
        String.prototype[Symbol.iterator] && String.prototype.codePointAt || (String.prototype[Symbol.iterator] = function Xa() {
          var b, c = this;
          return Ea(Xa, function(d) {
            1 == d.g && (b = 0);
            if (3 != d.g)
              return b < c.length ? d = ya(d, c[b]) : (d.g = 0, d = void 0), d;
            b++;
            d.g = 2;
          });
        });
        Set.prototype[Symbol.iterator] || (Set.prototype[Symbol.iterator] = function Ya() {
          var b, c = this, d;
          return Ea(Ya, function(e) {
            1 == e.g && (b = [], c.forEach(function(f) {
              b.push(f);
            }), d = 0);
            if (3 != e.g)
              return d < b.length ? e = ya(e, b[d]) : (e.g = 0, e = void 0), e;
            d++;
            e.g = 2;
          });
        });
        Map.prototype[Symbol.iterator] || (Map.prototype[Symbol.iterator] = function Za() {
          var b, c = this, d;
          return Ea(Za, function(e) {
            1 == e.g && (b = [], c.forEach(function(f, g) {
              b.push([g, f]);
            }), d = 0);
            if (3 != e.g)
              return d < b.length ? e = ya(e, b[d]) : (e.g = 0, e = void 0), e;
            d++;
            e.g = 2;
          });
        });
        var $a = document.createEvent("Event");
        $a.initEvent("foo", true, true);
        $a.preventDefault();
        if (!$a.defaultPrevented) {
          var ab = Event.prototype.preventDefault;
          Event.prototype.preventDefault = function() {
            this.cancelable && (ab.call(this), Object.defineProperty(this, "defaultPrevented", { get: function() {
              return true;
            }, configurable: true }));
          };
        }
        var bb = /Trident/.test(navigator.userAgent);
        if (!window.Event || bb && "function" !== typeof window.Event) {
          var cb = window.Event;
          window.Event = function(a, b) {
            b = b || {};
            var c = document.createEvent("Event");
            c.initEvent(a, !!b.bubbles, !!b.cancelable);
            return c;
          };
          if (cb) {
            for (var db in cb)
              window.Event[db] = cb[db];
            window.Event.prototype = cb.prototype;
          }
        }
        if (!window.CustomEvent || bb && "function" !== typeof window.CustomEvent)
          window.CustomEvent = function(a, b) {
            b = b || {};
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c;
          }, window.CustomEvent.prototype = window.Event.prototype;
        if (!window.MouseEvent || bb && "function" !== typeof window.MouseEvent) {
          var eb = window.MouseEvent;
          window.MouseEvent = function(a, b) {
            b = b || {};
            var c = document.createEvent("MouseEvent");
            c.initMouseEvent(a, !!b.bubbles, !!b.cancelable, b.view || window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);
            return c;
          };
          if (eb)
            for (var fb in eb)
              window.MouseEvent[fb] = eb[fb];
          window.MouseEvent.prototype = eb.prototype;
        }
        ;
        var gb, hb = function() {
          function a() {
            e++;
          }
          var b = false, c = false, d = { get capture() {
            return b = true;
          }, get once() {
            return c = true;
          } }, e = 0, f = document.createElement("div");
          f.addEventListener("click", a, d);
          var g = b && c;
          g && (f.dispatchEvent(new Event("click")), f.dispatchEvent(new Event("click")), g = 1 == e);
          f.removeEventListener("click", a, d);
          return g;
        }(), kb = null !== (gb = window.EventTarget) && void 0 !== gb ? gb : window.Node;
        if (!hb && "addEventListener" in kb.prototype) {
          var lb = function(a) {
            if (!a || "object" !== typeof a && "function" !== typeof a) {
              var b = !!a;
              a = false;
            } else
              b = !!a.capture, a = !!a.once;
            return { capture: b, once: a };
          }, mb = kb.prototype.addEventListener, nb = kb.prototype.removeEventListener, qb = /* @__PURE__ */ new WeakMap(), rb = /* @__PURE__ */ new WeakMap(), sb = function(a, b, c) {
            var d = c ? qb : rb;
            c = d.get(a);
            void 0 === c && d.set(a, c = /* @__PURE__ */ new Map());
            a = c.get(b);
            void 0 === a && c.set(b, a = /* @__PURE__ */ new WeakMap());
            return a;
          };
          kb.prototype.addEventListener = function(a, b, c) {
            var d = this;
            if (null != b) {
              c = lb(c);
              var e = c.capture;
              c = c.once;
              var f = sb(this, a, e);
              if (!f.has(b)) {
                var g = c ? function(h) {
                  f.delete(b);
                  nb.call(d, a, g, e);
                  if ("function" === typeof b)
                    return b.call(d, h);
                  if ("function" === typeof (null === b || void 0 === b ? void 0 : b.handleEvent))
                    return b.handleEvent(h);
                } : null;
                f.set(b, g);
                mb.call(this, a, null !== g && void 0 !== g ? g : b, e);
              }
            }
          };
          kb.prototype.removeEventListener = function(a, b, c) {
            if (null != b) {
              c = lb(c).capture;
              var d = sb(this, a, c), e = d.get(b);
              void 0 !== e && (d.delete(b), nb.call(this, a, null !== e && void 0 !== e ? e : b, c));
            }
          };
        }
        ;
        Object.getOwnPropertyDescriptor(Node.prototype, "baseURI") || Object.defineProperty(Node.prototype, "baseURI", { get: function() {
          var a = (this.ownerDocument || this).querySelector("base[href]");
          return a && a.href || window.location.href;
        }, configurable: true, enumerable: true });
        var tb, ub, vb = Element.prototype, wb = null !== (tb = Object.getOwnPropertyDescriptor(vb, "attributes")) && void 0 !== tb ? tb : Object.getOwnPropertyDescriptor(Node.prototype, "attributes"), xb = null !== (ub = null === wb || void 0 === wb ? void 0 : wb.get) && void 0 !== ub ? ub : function() {
          return this.attributes;
        }, yb = Array.prototype.map;
        vb.hasOwnProperty("getAttributeNames") || (vb.getAttributeNames = function() {
          return yb.call(xb.call(this), function(a) {
            return a.name;
          });
        });
        var zb, Ab = Element.prototype;
        Ab.hasOwnProperty("matches") || (Ab.matches = null !== (zb = Ab.webkitMatchesSelector) && void 0 !== zb ? zb : Ab.msMatchesSelector);
        var Bb = Node.prototype.appendChild;
        function Cb(a) {
          a = a.prototype;
          a.hasOwnProperty("append") || Object.defineProperty(a, "append", { configurable: true, enumerable: true, writable: true, value: function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
              c[d] = arguments[d];
            c = ka(c);
            for (d = c.next(); !d.done; d = c.next())
              d = d.value, Bb.call(this, "string" === typeof d ? document.createTextNode(d) : d);
          } });
        }
        Cb(Document);
        Cb(DocumentFragment);
        Cb(Element);
        var Db, Eb, Fb = Node.prototype.insertBefore, Gb = null !== (Eb = null === (Db = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild")) || void 0 === Db ? void 0 : Db.get) && void 0 !== Eb ? Eb : function() {
          return this.firstChild;
        };
        function Hb(a) {
          a = a.prototype;
          a.hasOwnProperty("prepend") || Object.defineProperty(a, "prepend", { configurable: true, enumerable: true, writable: true, value: function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
              c[d] = arguments[d];
            d = Gb.call(this);
            c = ka(c);
            for (var e = c.next(); !e.done; e = c.next())
              e = e.value, Fb.call(this, "string" === typeof e ? document.createTextNode(e) : e, d);
          } });
        }
        Hb(Document);
        Hb(DocumentFragment);
        Hb(Element);
        var Ib, Jb, Kb = Node.prototype.appendChild, Lb = Node.prototype.removeChild, Mb = null !== (Jb = null === (Ib = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild")) || void 0 === Ib ? void 0 : Ib.get) && void 0 !== Jb ? Jb : function() {
          return this.firstChild;
        };
        function Nb(a) {
          a = a.prototype;
          a.hasOwnProperty("replaceChildren") || Object.defineProperty(a, "replaceChildren", { configurable: true, enumerable: true, writable: true, value: function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
              c[d] = arguments[d];
            for (; null !== (d = Mb.call(this)); )
              Lb.call(this, d);
            c = ka(c);
            for (d = c.next(); !d.done; d = c.next())
              d = d.value, Kb.call(this, "string" === typeof d ? document.createTextNode(d) : d);
          } });
        }
        Nb(Document);
        Nb(DocumentFragment);
        Nb(Element);
        var Ob, Pb, Qb, Rb, Sb = Node.prototype.insertBefore, Tb = null !== (Pb = null === (Ob = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode")) || void 0 === Ob ? void 0 : Ob.get) && void 0 !== Pb ? Pb : function() {
          return this.parentNode;
        }, Ub = null !== (Rb = null === (Qb = Object.getOwnPropertyDescriptor(Node.prototype, "nextSibling")) || void 0 === Qb ? void 0 : Qb.get) && void 0 !== Rb ? Rb : function() {
          return this.nextSibling;
        };
        function Vb(a) {
          a = a.prototype;
          a.hasOwnProperty("after") || Object.defineProperty(a, "after", { configurable: true, enumerable: true, writable: true, value: function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
              c[d] = arguments[d];
            d = Tb.call(this);
            if (null !== d) {
              var e = Ub.call(this);
              c = ka(c);
              for (var f = c.next(); !f.done; f = c.next())
                f = f.value, Sb.call(d, "string" === typeof f ? document.createTextNode(f) : f, e);
            }
          } });
        }
        Vb(CharacterData);
        Vb(Element);
        var Wb, Xb, Yb = Node.prototype.insertBefore, Zb = null !== (Xb = null === (Wb = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode")) || void 0 === Wb ? void 0 : Wb.get) && void 0 !== Xb ? Xb : function() {
          return this.parentNode;
        };
        function $b(a) {
          a = a.prototype;
          a.hasOwnProperty("before") || Object.defineProperty(a, "before", { configurable: true, enumerable: true, writable: true, value: function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
              c[d] = arguments[d];
            d = Zb.call(this);
            if (null !== d) {
              c = ka(c);
              for (var e = c.next(); !e.done; e = c.next())
                e = e.value, Yb.call(d, "string" === typeof e ? document.createTextNode(e) : e, this);
            }
          } });
        }
        $b(CharacterData);
        $b(Element);
        var ac, bc, cc = Node.prototype.removeChild, dc = null !== (bc = null === (ac = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode")) || void 0 === ac ? void 0 : ac.get) && void 0 !== bc ? bc : function() {
          return this.parentNode;
        };
        function ec(a) {
          a = a.prototype;
          a.hasOwnProperty("remove") || Object.defineProperty(a, "remove", { configurable: true, enumerable: true, writable: true, value: function() {
            var b = dc.call(this);
            b && cc.call(b, this);
          } });
        }
        ec(CharacterData);
        ec(Element);
        var fc, gc, hc = Node.prototype.insertBefore, ic = Node.prototype.removeChild, jc = null !== (gc = null === (fc = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode")) || void 0 === fc ? void 0 : fc.get) && void 0 !== gc ? gc : function() {
          return this.parentNode;
        };
        function lc(a) {
          a = a.prototype;
          a.hasOwnProperty("replaceWith") || Object.defineProperty(a, "replaceWith", { configurable: true, enumerable: true, writable: true, value: function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d)
              c[d] = arguments[d];
            d = jc.call(this);
            if (null !== d) {
              c = ka(c);
              for (var e = c.next(); !e.done; e = c.next())
                e = e.value, hc.call(d, "string" === typeof e ? document.createTextNode(e) : e, this);
              ic.call(d, this);
            }
          } });
        }
        lc(CharacterData);
        lc(Element);
        var mc = window.Element.prototype, nc = window.HTMLElement.prototype, oc = window.SVGElement.prototype;
        !nc.hasOwnProperty("classList") || mc.hasOwnProperty("classList") || oc.hasOwnProperty("classList") || Object.defineProperty(mc, "classList", Object.getOwnPropertyDescriptor(nc, "classList"));
        var pc = Element.prototype, qc = Element.prototype.hasAttribute, rc = Element.prototype.setAttribute, sc = Element.prototype.removeAttribute;
        pc.hasOwnProperty("toggleAttribute") || (pc.toggleAttribute = function(a, b) {
          if (void 0 === b) {
            if (qc.call(this, a))
              return sc.call(this, a), false;
            rc.call(this, a, "");
            return true;
          }
          if (b)
            return qc.call(this, a) || rc.call(this, a, ""), true;
          sc.call(this, a);
          return false;
        });
        var tc = document.createElement("style");
        tc.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
        var uc = document.querySelector("head");
        uc.insertBefore(tc, uc.firstChild);
        var vc = window;
        vc.WebComponents = vc.WebComponents || { flags: {} };
        var wc = document.querySelector('script[src*="webcomponents-bundle"]'), xc = /wc-(.+)/, yc = {};
        if (!yc.noOpts) {
          location.search.slice(1).split("&").forEach(function(a) {
            a = a.split("=");
            var b;
            a[0] && (b = a[0].match(xc)) && (yc[b[1]] = a[1] || true);
          });
          if (wc)
            for (var zc = 0, Ac = void 0; Ac = wc.attributes[zc]; zc++)
              "src" !== Ac.name && (yc[Ac.name] = Ac.value || true);
          var Bc = {};
          yc.log && yc.log.split && yc.log.split(",").forEach(function(a) {
            Bc[a] = true;
          });
          yc.log = Bc;
        }
        vc.WebComponents.flags = yc;
        var Cc = yc.shadydom;
        if (Cc) {
          vc.ShadyDOM = vc.ShadyDOM || {};
          vc.ShadyDOM.force = Cc;
          var Dc = yc.noPatch;
          vc.ShadyDOM.noPatch = "true" === Dc ? true : Dc;
        }
        var Ec = yc.register || yc.ce;
        Ec && window.customElements && (vc.customElements.forcePolyfill = Ec);
        (function() {
          function a() {
          }
          function b(p, r) {
            if (!p.childNodes.length)
              return [];
            switch (p.nodeType) {
              case Node.DOCUMENT_NODE:
                return F.call(p, r);
              case Node.DOCUMENT_FRAGMENT_NODE:
                return E.call(p, r);
              default:
                return t.call(p, r);
            }
          }
          var c = "undefined" === typeof HTMLTemplateElement, d = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment), e = false;
          /Trident/.test(navigator.userAgent) && function() {
            function p(z, R) {
              if (z instanceof DocumentFragment)
                for (var ob; ob = z.firstChild; )
                  B.call(this, ob, R);
              else
                B.call(
                  this,
                  z,
                  R
                );
              return z;
            }
            e = true;
            var r = Node.prototype.cloneNode;
            Node.prototype.cloneNode = function(z) {
              z = r.call(this, z);
              this instanceof DocumentFragment && (z.__proto__ = DocumentFragment.prototype);
              return z;
            };
            DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
            DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
            Object.defineProperties(DocumentFragment.prototype, { nodeType: { get: function() {
              return Node.DOCUMENT_FRAGMENT_NODE;
            }, configurable: true }, localName: {
              get: function() {
              },
              configurable: true
            }, nodeName: { get: function() {
              return "#document-fragment";
            }, configurable: true } });
            var B = Node.prototype.insertBefore;
            Node.prototype.insertBefore = p;
            var K = Node.prototype.appendChild;
            Node.prototype.appendChild = function(z) {
              z instanceof DocumentFragment ? p.call(this, z, null) : K.call(this, z);
              return z;
            };
            var aa = Node.prototype.removeChild, ma = Node.prototype.replaceChild;
            Node.prototype.replaceChild = function(z, R) {
              z instanceof DocumentFragment ? (p.call(this, z, R), aa.call(this, R)) : ma.call(this, z, R);
              return R;
            };
            Document.prototype.createDocumentFragment = function() {
              var z = this.createElement("df");
              z.__proto__ = DocumentFragment.prototype;
              return z;
            };
            var va = Document.prototype.importNode;
            Document.prototype.importNode = function(z, R) {
              R = va.call(this, z, R || false);
              z instanceof DocumentFragment && (R.__proto__ = DocumentFragment.prototype);
              return R;
            };
          }();
          var f = Node.prototype.cloneNode, g = Document.prototype.createElement, h = Document.prototype.importNode, k = Node.prototype.removeChild, l = Node.prototype.appendChild, m = Node.prototype.replaceChild, q = DOMParser.prototype.parseFromString, H = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML") || { get: function() {
            return this.innerHTML;
          }, set: function(p) {
            this.innerHTML = p;
          } }, C = Object.getOwnPropertyDescriptor(window.Node.prototype, "childNodes") || { get: function() {
            return this.childNodes;
          } }, t = Element.prototype.querySelectorAll, F = Document.prototype.querySelectorAll, E = DocumentFragment.prototype.querySelectorAll, N = function() {
            if (!c) {
              var p = document.createElement("template"), r = document.createElement("template");
              r.content.appendChild(document.createElement("div"));
              p.content.appendChild(r);
              p = p.cloneNode(true);
              return 0 === p.content.childNodes.length || 0 === p.content.firstChild.content.childNodes.length || d;
            }
          }();
          if (c) {
            var y = document.implementation.createHTMLDocument("template"), X = true, x = document.createElement("style");
            x.textContent = "template{display:none;}";
            var ta = document.head;
            ta.insertBefore(x, ta.firstElementChild);
            a.prototype = Object.create(HTMLElement.prototype);
            var ia = !document.createElement("div").hasOwnProperty("innerHTML");
            a.Z = function(p) {
              if (!p.content && p.namespaceURI === document.documentElement.namespaceURI) {
                p.content = y.createDocumentFragment();
                for (var r; r = p.firstChild; )
                  l.call(p.content, r);
                if (ia)
                  p.__proto__ = a.prototype;
                else if (p.cloneNode = function(B) {
                  return a.va(this, B);
                }, X)
                  try {
                    n(p), J(p);
                  } catch (B) {
                    X = false;
                  }
                a.bootstrap(p.content);
              }
            };
            var sa = { option: ["select"], thead: ["table"], col: ["colgroup", "table"], tr: ["tbody", "table"], th: ["tr", "tbody", "table"], td: ["tr", "tbody", "table"] }, n = function(p) {
              Object.defineProperty(p, "innerHTML", { get: function() {
                return xa(this);
              }, set: function(r) {
                var B = sa[(/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(r) || ["", ""])[1].toLowerCase()];
                if (B)
                  for (var K = 0; K < B.length; K++)
                    r = "<" + B[K] + ">" + r + "</" + B[K] + ">";
                y.body.innerHTML = r;
                for (a.bootstrap(y); this.content.firstChild; )
                  k.call(this.content, this.content.firstChild);
                r = y.body;
                if (B)
                  for (K = 0; K < B.length; K++)
                    r = r.lastChild;
                for (; r.firstChild; )
                  l.call(this.content, r.firstChild);
              }, configurable: true });
            }, J = function(p) {
              Object.defineProperty(p, "outerHTML", { get: function() {
                return "<template>" + this.innerHTML + "</template>";
              }, set: function(r) {
                if (this.parentNode) {
                  y.body.innerHTML = r;
                  for (r = this.ownerDocument.createDocumentFragment(); y.body.firstChild; )
                    l.call(r, y.body.firstChild);
                  m.call(this.parentNode, r, this);
                } else
                  throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
              }, configurable: true });
            };
            n(a.prototype);
            J(a.prototype);
            a.bootstrap = function(p) {
              p = b(p, "template");
              for (var r = 0, B = p.length, K; r < B && (K = p[r]); r++)
                a.Z(K);
            };
            document.addEventListener("DOMContentLoaded", function() {
              a.bootstrap(document);
            });
            Document.prototype.createElement = function() {
              var p = g.apply(this, arguments);
              "template" === p.localName && a.Z(p);
              return p;
            };
            DOMParser.prototype.parseFromString = function() {
              var p = q.apply(this, arguments);
              a.bootstrap(p);
              return p;
            };
            Object.defineProperty(HTMLElement.prototype, "innerHTML", { get: function() {
              return xa(this);
            }, set: function(p) {
              H.set.call(this, p);
              a.bootstrap(this);
            }, configurable: true, enumerable: true });
            var ha = /[&\u00A0"]/g, kc = /[&\u00A0<>]/g, ib = function(p) {
              switch (p) {
                case "&":
                  return "&amp;";
                case "<":
                  return "&lt;";
                case ">":
                  return "&gt;";
                case '"':
                  return "&quot;";
                case "\xA0":
                  return "&nbsp;";
              }
            };
            x = function(p) {
              for (var r = {}, B = 0; B < p.length; B++)
                r[p[B]] = true;
              return r;
            };
            var Va = x("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")), jb = x("style script xmp iframe noembed noframes plaintext noscript".split(" ")), xa = function(p, r) {
              "template" === p.localName && (p = p.content);
              for (var B = "", K = r ? r(p) : C.get.call(p), aa = 0, ma = K.length, va; aa < ma && (va = K[aa]); aa++) {
                a: {
                  var z = va;
                  var R = p;
                  var ob = r;
                  switch (z.nodeType) {
                    case Node.ELEMENT_NODE:
                      for (var Kc = z.localName, pb = "<" + Kc, Zh = z.attributes, He = 0; R = Zh[He]; He++)
                        pb += " " + R.name + '="' + R.value.replace(ha, ib) + '"';
                      pb += ">";
                      z = Va[Kc] ? pb : pb + xa(z, ob) + "</" + Kc + ">";
                      break a;
                    case Node.TEXT_NODE:
                      z = z.data;
                      z = R && jb[R.localName] ? z : z.replace(kc, ib);
                      break a;
                    case Node.COMMENT_NODE:
                      z = "<!--" + z.data + "-->";
                      break a;
                    default:
                      throw window.console.error(z), Error("not implemented");
                  }
                }
                B += z;
              }
              return B;
            };
          }
          if (c || N) {
            a.va = function(p, r) {
              var B = f.call(p, false);
              this.Z && this.Z(B);
              r && (l.call(B.content, f.call(p.content, true)), I(B.content, p.content));
              return B;
            };
            var I = function(p, r) {
              if (r.querySelectorAll && (r = b(r, "template"), 0 !== r.length)) {
                p = b(p, "template");
                for (var B = 0, K = p.length, aa, ma; B < K; B++)
                  ma = r[B], aa = p[B], a && a.Z && a.Z(ma), m.call(aa.parentNode, u.call(ma, true), aa);
              }
            }, u = Node.prototype.cloneNode = function(p) {
              if (!e && d && this instanceof DocumentFragment)
                if (p)
                  var r = G.call(this.ownerDocument, this, true);
                else
                  return this.ownerDocument.createDocumentFragment();
              else
                this.nodeType === Node.ELEMENT_NODE && "template" === this.localName && this.namespaceURI == document.documentElement.namespaceURI ? r = a.va(this, p) : r = f.call(
                  this,
                  p
                );
              p && I(r, this);
              return r;
            }, G = Document.prototype.importNode = function(p, r) {
              r = r || false;
              if ("template" === p.localName)
                return a.va(p, r);
              var B = h.call(this, p, r);
              if (r) {
                I(B, p);
                p = b(B, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
                for (var K, aa = 0; aa < p.length; aa++) {
                  K = p[aa];
                  r = g.call(document, "script");
                  r.textContent = K.textContent;
                  for (var ma = K.attributes, va = 0, z; va < ma.length; va++)
                    z = ma[va], r.setAttribute(z.name, z.value);
                  m.call(K.parentNode, r, K);
                }
              }
              return B;
            };
          }
          c && (window.HTMLTemplateElement = a);
        })();
        function Fc() {
        }
        Fc.prototype.toJSON = function() {
          return {};
        };
        function D(a) {
          a.__shady || (a.__shady = new Fc());
          return a.__shady;
        }
        function L(a) {
          return a && a.__shady;
        }
        ;
        var M = window.ShadyDOM || {};
        M.cb = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
        var Gc = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
        M.D = !!(Gc && Gc.configurable && Gc.get);
        M.Ba = M.force || !M.cb;
        M.J = M.noPatch || false;
        M.ha = M.preferPerformance;
        M.Da = "on-demand" === M.J;
        var Hc;
        var Ic = M.querySelectorImplementation;
        Hc = -1 < ["native", "selectorEngine"].indexOf(Ic) ? Ic : void 0;
        M.wb = Hc;
        M.Ra = navigator.userAgent.match("Trident");
        function Jc() {
          return Document.prototype.msElementsFromPoint ? "msElementsFromPoint" : "elementsFromPoint";
        }
        function Lc(a) {
          return (a = L(a)) && void 0 !== a.firstChild;
        }
        function O(a) {
          return a instanceof ShadowRoot;
        }
        function Mc(a) {
          return (a = (a = L(a)) && a.root) && Nc(a);
        }
        var Oc = Element.prototype, Pc = Oc.matches || Oc.matchesSelector || Oc.mozMatchesSelector || Oc.msMatchesSelector || Oc.oMatchesSelector || Oc.webkitMatchesSelector, Qc = document.createTextNode(""), Rc = 0, Sc = [];
        new MutationObserver(function() {
          for (; Sc.length; )
            try {
              Sc.shift()();
            } catch (a) {
              throw Qc.textContent = Rc++, a;
            }
        }).observe(Qc, { characterData: true });
        function Tc(a) {
          Sc.push(a);
          Qc.textContent = Rc++;
        }
        var Uc = document.contains ? function(a, b) {
          return a.__shady_native_contains(b);
        } : function(a, b) {
          return a === b || a.documentElement && a.documentElement.__shady_native_contains(b);
        };
        function Vc(a, b) {
          for (; b; ) {
            if (b == a)
              return true;
            b = b.__shady_parentNode;
          }
          return false;
        }
        function Wc(a) {
          for (var b = a.length - 1; 0 <= b; b--) {
            var c = a[b], d = c.getAttribute("id") || c.getAttribute("name");
            d && "length" !== d && isNaN(d) && (a[d] = c);
          }
          a.item = function(e) {
            return a[e];
          };
          a.namedItem = function(e) {
            if ("length" !== e && isNaN(e) && a[e])
              return a[e];
            for (var f = ka(a), g = f.next(); !g.done; g = f.next())
              if (g = g.value, (g.getAttribute("id") || g.getAttribute("name")) == e)
                return g;
            return null;
          };
          return a;
        }
        function Xc(a) {
          var b = [];
          for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling)
            b.push(a);
          return b;
        }
        function Yc(a) {
          var b = [];
          for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling)
            b.push(a);
          return b;
        }
        function Zc(a, b, c) {
          c.configurable = true;
          if (c.value)
            a[b] = c.value;
          else
            try {
              Object.defineProperty(a, b, c);
            } catch (d) {
            }
        }
        function P(a, b, c, d) {
          c = void 0 === c ? "" : c;
          for (var e in b)
            d && 0 <= d.indexOf(e) || Zc(a, c + e, b[e]);
        }
        function $c(a, b) {
          for (var c in b)
            c in a && Zc(a, c, b[c]);
        }
        function Q(a) {
          var b = {};
          Object.getOwnPropertyNames(a).forEach(function(c) {
            b[c] = Object.getOwnPropertyDescriptor(a, c);
          });
          return b;
        }
        function ad(a, b) {
          for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length; d++)
            e = c[d], a[e] = b[e];
        }
        function bd(a) {
          return a instanceof Node ? a : document.createTextNode("" + a);
        }
        function cd(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          if (1 === b.length)
            return bd(b[0]);
          c = document.createDocumentFragment();
          b = ka(b);
          for (var d = b.next(); !d.done; d = b.next())
            c.appendChild(bd(d.value));
          return c;
        }
        function dd(a) {
          var b;
          for (b = void 0 === b ? 1 : b; 0 < b; b--)
            a = a.reduce(function(c, d) {
              Array.isArray(d) ? c.push.apply(c, w(d)) : c.push(d);
              return c;
            }, []);
          return a;
        }
        function ed(a) {
          var b = [], c = /* @__PURE__ */ new Set();
          a = ka(a);
          for (var d = a.next(); !d.done; d = a.next())
            d = d.value, c.has(d) || (b.push(d), c.add(d));
          return b;
        }
        ;
        var fd = [], gd;
        function hd(a) {
          gd || (gd = true, Tc(id));
          fd.push(a);
        }
        function id() {
          gd = false;
          for (var a = !!fd.length; fd.length; )
            fd.shift()();
          return a;
        }
        id.list = fd;
        function jd() {
          this.g = false;
          this.addedNodes = [];
          this.removedNodes = [];
          this.qa = /* @__PURE__ */ new Set();
        }
        function kd(a) {
          a.g || (a.g = true, Tc(function() {
            a.flush();
          }));
        }
        jd.prototype.flush = function() {
          if (this.g) {
            this.g = false;
            var a = this.takeRecords();
            a.length && this.qa.forEach(function(b) {
              b(a);
            });
          }
        };
        jd.prototype.takeRecords = function() {
          if (this.addedNodes.length || this.removedNodes.length) {
            var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];
            this.addedNodes = [];
            this.removedNodes = [];
            return a;
          }
          return [];
        };
        function ld(a, b) {
          var c = D(a);
          c.ga || (c.ga = new jd());
          c.ga.qa.add(b);
          var d = c.ga;
          return { Va: b, X: d, Wa: a, takeRecords: function() {
            return d.takeRecords();
          } };
        }
        function md(a) {
          var b = a && a.X;
          b && (b.qa.delete(a.Va), b.qa.size || (D(a.Wa).ga = null));
        }
        function nd(a, b) {
          var c = b.getRootNode();
          return a.map(function(d) {
            var e = c === d.target.getRootNode();
            if (e && d.addedNodes) {
              if (e = [].slice.call(d.addedNodes).filter(function(f) {
                return c === f.getRootNode();
              }), e.length)
                return d = Object.create(d), Object.defineProperty(d, "addedNodes", { value: e, configurable: true }), d;
            } else if (e)
              return d;
          }).filter(function(d) {
            return d;
          });
        }
        ;
        var od = /[&\u00A0"]/g, pd = /[&\u00A0<>]/g;
        function qd(a) {
          switch (a) {
            case "&":
              return "&amp;";
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            case '"':
              return "&quot;";
            case "\xA0":
              return "&nbsp;";
          }
        }
        function rd(a) {
          for (var b = {}, c = 0; c < a.length; c++)
            b[a[c]] = true;
          return b;
        }
        var sd = rd("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")), td = rd("style script xmp iframe noembed noframes plaintext noscript".split(" "));
        function ud(a, b) {
          "template" === a.localName && (a = a.content);
          for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
            a: {
              var h = g;
              var k = a, l = b;
              switch (h.nodeType) {
                case Node.ELEMENT_NODE:
                  k = h.localName;
                  for (var m = "<" + k, q = h.attributes, H = 0, C; C = q[H]; H++)
                    m += " " + C.name + '="' + C.value.replace(od, qd) + '"';
                  m += ">";
                  h = sd[k] ? m : m + ud(h, l) + "</" + k + ">";
                  break a;
                case Node.TEXT_NODE:
                  h = h.data;
                  h = k && td[k.localName] ? h : h.replace(pd, qd);
                  break a;
                case Node.COMMENT_NODE:
                  h = "<!--" + h.data + "-->";
                  break a;
                default:
                  throw window.console.error(h), Error("not implemented");
              }
            }
            c += h;
          }
          return c;
        }
        ;
        var vd = M.D, wd = { querySelector: function(a) {
          return this.__shady_native_querySelector(a);
        }, querySelectorAll: function(a) {
          return this.__shady_native_querySelectorAll(a);
        } }, xd = {};
        function yd(a) {
          xd[a] = function(b) {
            return b["__shady_native_" + a];
          };
        }
        function zd(a, b) {
          P(a, b, "__shady_native_");
          for (var c in b)
            yd(c);
        }
        function S(a, b) {
          b = void 0 === b ? [] : b;
          for (var c = 0; c < b.length; c++) {
            var d = b[c], e = Object.getOwnPropertyDescriptor(a, d);
            e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? wd[d] || (wd[d] = e.value) : yd(d));
          }
        }
        var Ad = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false), Bd = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, false), Cd = document.implementation.createHTMLDocument("inert");
        function Dd(a) {
          for (var b; b = a.__shady_native_firstChild; )
            a.__shady_native_removeChild(b);
        }
        var Ed = ["firstElementChild", "lastElementChild", "children", "childElementCount"], Fd = ["querySelector", "querySelectorAll", "append", "prepend", "replaceChildren"];
        function Gd() {
          var a = ["dispatchEvent", "addEventListener", "removeEventListener"];
          window.EventTarget ? (S(window.EventTarget.prototype, a), void 0 === window.__shady_native_addEventListener && S(Window.prototype, a)) : (S(Node.prototype, a), S(Window.prototype, a), S(XMLHttpRequest.prototype, a));
          vd ? S(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : zd(Node.prototype, {
            parentNode: { get: function() {
              Ad.currentNode = this;
              return Ad.parentNode();
            } },
            firstChild: { get: function() {
              Ad.currentNode = this;
              return Ad.firstChild();
            } },
            lastChild: { get: function() {
              Ad.currentNode = this;
              return Ad.lastChild();
            } },
            previousSibling: { get: function() {
              Ad.currentNode = this;
              return Ad.previousSibling();
            } },
            nextSibling: { get: function() {
              Ad.currentNode = this;
              return Ad.nextSibling();
            } },
            childNodes: { get: function() {
              var b = [];
              Ad.currentNode = this;
              for (var c = Ad.firstChild(); c; )
                b.push(c), c = Ad.nextSibling();
              return b;
            } },
            parentElement: { get: function() {
              Bd.currentNode = this;
              return Bd.parentNode();
            } },
            textContent: { get: function() {
              switch (this.nodeType) {
                case Node.ELEMENT_NODE:
                case Node.DOCUMENT_FRAGMENT_NODE:
                  for (var b = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, false), c = "", d; d = b.nextNode(); )
                    c += d.nodeValue;
                  return c;
                default:
                  return this.nodeValue;
              }
            }, set: function(b) {
              if ("undefined" === typeof b || null === b)
                b = "";
              switch (this.nodeType) {
                case Node.ELEMENT_NODE:
                case Node.DOCUMENT_FRAGMENT_NODE:
                  Dd(this);
                  (0 < b.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(b), void 0);
                  break;
                default:
                  this.nodeValue = b;
              }
            } }
          });
          S(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
          S(HTMLElement.prototype, ["parentElement", "contains"]);
          a = { firstElementChild: { get: function() {
            Bd.currentNode = this;
            return Bd.firstChild();
          } }, lastElementChild: { get: function() {
            Bd.currentNode = this;
            return Bd.lastChild();
          } }, children: { get: function() {
            var b = [];
            Bd.currentNode = this;
            for (var c = Bd.firstChild(); c; )
              b.push(c), c = Bd.nextSibling();
            return Wc(b);
          } }, childElementCount: { get: function() {
            return this.children ? this.children.length : 0;
          } } };
          vd ? (S(Element.prototype, Ed), S(Element.prototype, [
            "previousElementSibling",
            "nextElementSibling",
            "innerHTML",
            "className"
          ]), S(HTMLElement.prototype, ["children", "innerHTML", "className"])) : (zd(Element.prototype, a), zd(Element.prototype, { previousElementSibling: { get: function() {
            Bd.currentNode = this;
            return Bd.previousSibling();
          } }, nextElementSibling: { get: function() {
            Bd.currentNode = this;
            return Bd.nextSibling();
          } }, innerHTML: { get: function() {
            return ud(this, Xc);
          }, set: function(b) {
            var c = "template" === this.localName ? this.content : this;
            Dd(c);
            var d = this.localName || "div";
            d = this.namespaceURI && this.namespaceURI !== Cd.namespaceURI ? Cd.createElementNS(this.namespaceURI, d) : Cd.createElement(d);
            d.innerHTML = b;
            for (b = "template" === this.localName ? d.content : d; d = b.__shady_native_firstChild; )
              c.__shady_native_insertBefore(d, void 0);
          } }, className: { get: function() {
            return this.getAttribute("class") || "";
          }, set: function(b) {
            this.setAttribute("class", b);
          } } }));
          S(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute toggleAttribute focus blur".split(" "));
          S(Element.prototype, Fd);
          S(HTMLElement.prototype, ["focus", "blur"]);
          window.HTMLTemplateElement && S(window.HTMLTemplateElement.prototype, ["innerHTML"]);
          vd ? S(DocumentFragment.prototype, Ed) : zd(DocumentFragment.prototype, a);
          S(DocumentFragment.prototype, Fd);
          vd ? (S(Document.prototype, Ed), S(Document.prototype, ["activeElement"])) : zd(Document.prototype, a);
          S(Document.prototype, ["importNode", "getElementById", "elementFromPoint", Jc()]);
          S(Document.prototype, Fd);
        }
        ;
        var Hd = Q({ get childNodes() {
          return this.__shady_childNodes;
        }, get firstChild() {
          return this.__shady_firstChild;
        }, get lastChild() {
          return this.__shady_lastChild;
        }, get childElementCount() {
          return this.__shady_childElementCount;
        }, get children() {
          return this.__shady_children;
        }, get firstElementChild() {
          return this.__shady_firstElementChild;
        }, get lastElementChild() {
          return this.__shady_lastElementChild;
        }, get shadowRoot() {
          return this.__shady_shadowRoot;
        } }), Id = Q({ get textContent() {
          return this.__shady_textContent;
        }, set textContent(a) {
          this.__shady_textContent = a;
        }, get innerHTML() {
          return this.__shady_innerHTML;
        }, set innerHTML(a) {
          this.__shady_innerHTML = a;
        } }), Jd = Q({ get parentElement() {
          return this.__shady_parentElement;
        }, get parentNode() {
          return this.__shady_parentNode;
        }, get nextSibling() {
          return this.__shady_nextSibling;
        }, get previousSibling() {
          return this.__shady_previousSibling;
        }, get nextElementSibling() {
          return this.__shady_nextElementSibling;
        }, get previousElementSibling() {
          return this.__shady_previousElementSibling;
        }, get className() {
          return this.__shady_className;
        }, set className(a) {
          this.__shady_className = a;
        } });
        function Kd(a) {
          for (var b in a) {
            var c = a[b];
            c && (c.enumerable = false);
          }
        }
        Kd(Hd);
        Kd(Id);
        Kd(Jd);
        var Ld = M.D || true === M.J, Md = Ld ? function() {
        } : function(a) {
          var b = D(a);
          b.Ta || (b.Ta = true, $c(a, Jd));
        }, Nd = Ld ? function() {
        } : function(a) {
          var b = D(a);
          b.Sa || (b.Sa = true, $c(a, Hd), window.customElements && window.customElements.polyfillWrapFlushCallback && !M.J || $c(a, Id));
        };
        var Od = "__eventWrappers" + Date.now(), Pd = function() {
          var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");
          return a ? function(b) {
            return a.get.call(b);
          } : null;
        }(), Qd = function() {
          function a() {
          }
          var b = false, c = { get capture() {
            b = true;
            return false;
          } };
          window.addEventListener("test", a, c);
          window.removeEventListener("test", a, c);
          return b;
        }();
        function Rd(a) {
          if (null === a || "object" !== typeof a && "function" !== typeof a) {
            var b = !!a;
            var c = false;
          } else {
            b = !!a.capture;
            c = !!a.once;
            var d = a.U;
          }
          return { Pa: d, capture: b, once: c, Na: Qd ? a : b };
        }
        var Sd = {
          blur: true,
          focus: true,
          focusin: true,
          focusout: true,
          click: true,
          dblclick: true,
          mousedown: true,
          mouseenter: true,
          mouseleave: true,
          mousemove: true,
          mouseout: true,
          mouseover: true,
          mouseup: true,
          wheel: true,
          beforeinput: true,
          input: true,
          keydown: true,
          keyup: true,
          compositionstart: true,
          compositionupdate: true,
          compositionend: true,
          touchstart: true,
          touchend: true,
          touchmove: true,
          touchcancel: true,
          pointerover: true,
          pointerenter: true,
          pointerdown: true,
          pointermove: true,
          pointerup: true,
          pointercancel: true,
          pointerout: true,
          pointerleave: true,
          gotpointercapture: true,
          lostpointercapture: true,
          dragstart: true,
          drag: true,
          dragenter: true,
          dragleave: true,
          dragover: true,
          drop: true,
          dragend: true,
          DOMActivate: true,
          DOMFocusIn: true,
          DOMFocusOut: true,
          keypress: true
        }, Td = { DOMAttrModified: true, DOMAttributeNameChanged: true, DOMCharacterDataModified: true, DOMElementNameChanged: true, DOMNodeInserted: true, DOMNodeInsertedIntoDocument: true, DOMNodeRemoved: true, DOMNodeRemovedFromDocument: true, DOMSubtreeModified: true };
        function Ud(a) {
          return a instanceof Node ? a.__shady_getRootNode() : a;
        }
        function Vd(a, b) {
          var c = [], d = a;
          for (a = Ud(a); d; )
            c.push(d), d = d.__shady_assignedSlot ? d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d.host : d.__shady_parentNode;
          c[c.length - 1] === document && c.push(window);
          return c;
        }
        function Wd(a) {
          a.__composedPath || (a.__composedPath = Vd(a.target, true));
          return a.__composedPath;
        }
        function Xd(a, b) {
          if (!O)
            return a;
          a = Vd(a, true);
          for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++)
            if (d = b[c], f = Ud(d), f !== e && (g = a.indexOf(f), e = f), !O(f) || -1 < g)
              return d;
        }
        var Yd = { get composed() {
          void 0 === this.__composed && (Pd ? this.__composed = "focusin" === this.type || "focusout" === this.type || Pd(this) : false !== this.isTrusted && (this.__composed = Sd[this.type]));
          return this.__composed || false;
        }, composedPath: function() {
          this.__composedPath || (this.__composedPath = Vd(this.__target, this.composed));
          return this.__composedPath;
        }, get target() {
          return Xd(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
        }, get relatedTarget() {
          if (!this.__relatedTarget)
            return null;
          this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = Vd(this.__relatedTarget, true));
          return Xd(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
        }, stopPropagation: function() {
          Event.prototype.stopPropagation.call(this);
          this.ua = true;
        }, stopImmediatePropagation: function() {
          Event.prototype.stopImmediatePropagation.call(this);
          this.ua = this.__immediatePropagationStopped = true;
        } }, Zd = M.D && Object.getOwnPropertyDescriptor(Event.prototype, "eventPhase");
        Zd && (Object.defineProperty(Yd, "eventPhase", { get: function() {
          return this.currentTarget === this.target ? Event.AT_TARGET : this.__shady_native_eventPhase;
        }, enumerable: true, configurable: true }), Object.defineProperty(Yd, "__shady_native_eventPhase", Zd));
        function $d(a) {
          function b(c, d) {
            c = new a(c, d);
            c.__composed = d && !!d.composed;
            return c;
          }
          b.__proto__ = a;
          b.prototype = a.prototype;
          return b;
        }
        var ae = { focus: true, blur: true };
        function be(a) {
          return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
        }
        function ce(a, b, c) {
          if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c])
            for (var d = 0, e; (e = c[d]) && (!be(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++)
              ;
        }
        var de = new Event("e").hasOwnProperty("currentTarget");
        function ee(a) {
          a = de ? Object.create(a) : a;
          var b = a.composedPath(), c = b.map(function(m) {
            return Xd(m, b);
          }), d = a.bubbles, e = Object.getOwnPropertyDescriptor(a, "currentTarget");
          Object.defineProperty(a, "currentTarget", { configurable: true, enumerable: true, get: function() {
            return k;
          } });
          var f = Event.CAPTURING_PHASE, g = Object.getOwnPropertyDescriptor(a, "eventPhase");
          Object.defineProperty(a, "eventPhase", { configurable: true, enumerable: true, get: function() {
            return f;
          } });
          try {
            for (var h = b.length - 1; 0 <= h; h--) {
              var k = b[h];
              f = k === c[h] ? Event.AT_TARGET : Event.CAPTURING_PHASE;
              ce(a, k, "capture");
              if (a.ua)
                return;
            }
            for (h = 0; h < b.length; h++) {
              k = b[h];
              var l = k === c[h];
              if (l || d) {
                if (f = l ? Event.AT_TARGET : Event.BUBBLING_PHASE, ce(a, k, "bubble"), a.ua)
                  break;
              }
            }
          } finally {
            de || (e ? Object.defineProperty(a, "currentTarget", e) : delete a.currentTarget, g ? Object.defineProperty(a, "eventPhase", g) : delete a.eventPhase);
          }
        }
        function fe(a, b, c, d) {
          for (var e = 0; e < a.length; e++) {
            var f = a[e], g = f.type, h = f.capture;
            if (b === f.node && c === g && d === h)
              return e;
          }
          return -1;
        }
        function ge(a) {
          id();
          return !M.ha && this instanceof Node && !Uc(document, this) ? (a.__target || he(a, this), ee(a)) : this.__shady_native_dispatchEvent(a);
        }
        function ie(a, b, c) {
          var d = this, e = Rd(c), f = e.capture, g = e.once, h = e.Pa;
          e = e.Na;
          if (b) {
            var k = typeof b;
            if ("function" === k || "object" === k) {
              if ("object" !== k || b.handleEvent && "function" === typeof b.handleEvent) {
                if (Td[a])
                  return this.__shady_native_addEventListener(a, b, e);
                var l = h || this;
                if (h = b[Od]) {
                  if (-1 < fe(h, l, a, f))
                    return;
                } else
                  b[Od] = [];
                h = function(m) {
                  g && d.__shady_removeEventListener(a, b, c);
                  m.__target || he(m);
                  if (l !== d) {
                    var q = Object.getOwnPropertyDescriptor(m, "currentTarget");
                    Object.defineProperty(m, "currentTarget", {
                      get: function() {
                        return l;
                      },
                      configurable: true
                    });
                    var H = Object.getOwnPropertyDescriptor(m, "eventPhase");
                    Object.defineProperty(m, "eventPhase", { configurable: true, enumerable: true, get: function() {
                      return f ? Event.CAPTURING_PHASE : Event.BUBBLING_PHASE;
                    } });
                  }
                  m.__previousCurrentTarget = m.currentTarget;
                  if (!O(l) && "slot" !== l.localName || -1 != m.composedPath().indexOf(l)) {
                    if (m.composed || -1 < m.composedPath().indexOf(l)) {
                      if (be(m) && m.target === m.relatedTarget)
                        m.eventPhase === Event.BUBBLING_PHASE && m.stopImmediatePropagation();
                      else if (m.eventPhase === Event.CAPTURING_PHASE || m.bubbles || m.target === l || l instanceof Window) {
                        var C = "function" === k ? b.call(l, m) : b.handleEvent && b.handleEvent(m);
                        l !== d && (q ? (Object.defineProperty(m, "currentTarget", q), q = null) : delete m.currentTarget, H ? (Object.defineProperty(m, "eventPhase", H), H = null) : delete m.eventPhase);
                        return C;
                      }
                    }
                  }
                };
                b[Od].push({ node: l, type: a, capture: f, ub: h });
                this.__handlers = this.__handlers || {};
                this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] };
                this.__handlers[a][f ? "capture" : "bubble"].push(h);
                ae[a] || this.__shady_native_addEventListener(
                  a,
                  h,
                  e
                );
              }
            }
          }
        }
        function je(a, b, c) {
          if (b) {
            var d = Rd(c);
            c = d.capture;
            var e = d.Pa;
            d = d.Na;
            if (Td[a])
              return this.__shady_native_removeEventListener(a, b, d);
            var f = e || this;
            e = void 0;
            var g = null;
            try {
              g = b[Od];
            } catch (h) {
            }
            g && (f = fe(g, f, a, c), -1 < f && (e = g.splice(f, 1)[0].ub, g.length || (b[Od] = void 0)));
            this.__shady_native_removeEventListener(a, e || b, d);
            e && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][c ? "capture" : "bubble"], b = a.indexOf(e), -1 < b && a.splice(b, 1));
          }
        }
        function ke() {
          for (var a in ae)
            window.__shady_native_addEventListener(a, function(b) {
              b.__target || (he(b), ee(b));
            }, true);
        }
        var le = Q(Yd);
        function he(a, b) {
          b = void 0 === b ? a.target : b;
          a.__target = b;
          a.__relatedTarget = a.relatedTarget;
          if (M.D) {
            b = Object.getPrototypeOf(a);
            if (!b.hasOwnProperty("__shady_patchedProto")) {
              var c = Object.create(b);
              c.__shady_sourceProto = b;
              P(c, le);
              b.__shady_patchedProto = c;
            }
            a.__proto__ = b.__shady_patchedProto;
          } else
            P(a, le);
        }
        var me = $d(Event), ne = $d(CustomEvent), oe = $d(MouseEvent);
        function pe() {
          if (!Pd && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
            var a = function() {
              var b = new MouseEvent("click", { bubbles: true, cancelable: true, composed: true });
              this.__shady_dispatchEvent(b);
            };
            Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
          }
        }
        var qe = Object.getOwnPropertyNames(Element.prototype).filter(function(a) {
          return "on" === a.substring(0, 2);
        }), re = Object.getOwnPropertyNames(HTMLElement.prototype).filter(function(a) {
          return "on" === a.substring(0, 2);
        });
        function se(a) {
          return { set: function(b) {
            var c = D(this), d = a.substring(2);
            c.T || (c.T = {});
            c.T[a] && this.removeEventListener(d, c.T[a]);
            this.__shady_addEventListener(d, b);
            c.T[a] = b;
          }, get: function() {
            var b = L(this);
            return b && b.T && b.T[a];
          }, configurable: true };
        }
        ;
        function te(a, b) {
          return { index: a, ia: [], pa: b };
        }
        function ue(a, b, c, d) {
          var e = 0, f = 0, g = 0, h = 0, k = Math.min(b - e, d - f);
          if (0 == e && 0 == f)
            a: {
              for (g = 0; g < k; g++)
                if (a[g] !== c[g])
                  break a;
              g = k;
            }
          if (b == a.length && d == c.length) {
            h = a.length;
            for (var l = c.length, m = 0; m < k - g && ve(a[--h], c[--l]); )
              m++;
            h = m;
          }
          e += g;
          f += g;
          b -= h;
          d -= h;
          if (0 == b - e && 0 == d - f)
            return [];
          if (e == b) {
            for (b = te(e, 0); f < d; )
              b.ia.push(c[f++]);
            return [b];
          }
          if (f == d)
            return [te(e, b - e)];
          k = e;
          g = f;
          d = d - g + 1;
          h = b - k + 1;
          b = Array(d);
          for (l = 0; l < d; l++)
            b[l] = Array(h), b[l][0] = l;
          for (l = 0; l < h; l++)
            b[0][l] = l;
          for (l = 1; l < d; l++)
            for (m = 1; m < h; m++)
              if (a[k + m - 1] === c[g + l - 1])
                b[l][m] = b[l - 1][m - 1];
              else {
                var q = b[l - 1][m] + 1, H = b[l][m - 1] + 1;
                b[l][m] = q < H ? q : H;
              }
          k = b.length - 1;
          g = b[0].length - 1;
          d = b[k][g];
          for (a = []; 0 < k || 0 < g; )
            0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], l = b[k - 1][g], m = b[k][g - 1], q = l < m ? l < h ? l : h : m < h ? m : h, q == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : q == l ? (a.push(3), k--, d = l) : (a.push(2), g--, d = m));
          a.reverse();
          b = void 0;
          k = [];
          for (g = 0; g < a.length; g++)
            switch (a[g]) {
              case 0:
                b && (k.push(b), b = void 0);
                e++;
                f++;
                break;
              case 1:
                b || (b = te(e, 0));
                b.pa++;
                e++;
                b.ia.push(c[f]);
                f++;
                break;
              case 2:
                b || (b = te(
                  e,
                  0
                ));
                b.pa++;
                e++;
                break;
              case 3:
                b || (b = te(e, 0)), b.ia.push(c[f]), f++;
            }
          b && k.push(b);
          return k;
        }
        function ve(a, b) {
          return a === b;
        }
        ;
        var we = Q({ dispatchEvent: ge, addEventListener: ie, removeEventListener: je });
        var xe = null;
        function ye() {
          xe || (xe = window.ShadyCSS && window.ShadyCSS.ScopingShim);
          return xe || null;
        }
        function ze(a, b, c) {
          var d = ye();
          return d && "class" === b ? (d.setElementClass(a, c), true) : false;
        }
        function Ae(a, b) {
          var c = ye();
          c && c.unscopeNode(a, b);
        }
        function Be(a, b) {
          var c = ye();
          if (!c)
            return true;
          if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            c = true;
            for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling)
              c = c && Be(a, b);
            return c;
          }
          return a.nodeType !== Node.ELEMENT_NODE ? true : c.currentScopeForNode(a) === b;
        }
        function Ce(a) {
          if (a.nodeType !== Node.ELEMENT_NODE)
            return "";
          var b = ye();
          return b ? b.currentScopeForNode(a) : "";
        }
        function De(a, b) {
          if (a)
            for (a.nodeType === Node.ELEMENT_NODE && b(a), a = a.__shady_firstChild; a; a = a.__shady_nextSibling)
              a.nodeType === Node.ELEMENT_NODE && De(a, b);
        }
        ;
        var Ee = window.document, Fe = M.ha, Ge = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"), Ie = Ge && Ge.get;
        function Je(a) {
          for (var b; b = a.__shady_firstChild; )
            a.__shady_removeChild(b);
        }
        function Ke(a) {
          var b = L(a);
          if (b && void 0 !== b.ta)
            for (b = a.__shady_firstChild; b; b = b.__shady_nextSibling)
              Ke(b);
          if (a = L(a))
            a.ta = void 0;
        }
        function Le(a) {
          var b = a;
          if (a && "slot" === a.localName) {
            var c = L(a);
            (c = c && c.aa) && (b = c.length ? c[0] : Le(a.__shady_nextSibling));
          }
          return b;
        }
        function Me(a, b, c) {
          if (a = (a = L(a)) && a.ga) {
            if (b)
              if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
                for (var d = 0, e = b.childNodes.length; d < e; d++)
                  a.addedNodes.push(b.childNodes[d]);
              else
                a.addedNodes.push(b);
            c && a.removedNodes.push(c);
            kd(a);
          }
        }
        var Te = Q({
          get parentNode() {
            var a = L(this);
            a = a && a.parentNode;
            return void 0 !== a ? a : this.__shady_native_parentNode;
          },
          get firstChild() {
            var a = L(this);
            a = a && a.firstChild;
            return void 0 !== a ? a : this.__shady_native_firstChild;
          },
          get lastChild() {
            var a = L(this);
            a = a && a.lastChild;
            return void 0 !== a ? a : this.__shady_native_lastChild;
          },
          get nextSibling() {
            var a = L(this);
            a = a && a.nextSibling;
            return void 0 !== a ? a : this.__shady_native_nextSibling;
          },
          get previousSibling() {
            var a = L(this);
            a = a && a.previousSibling;
            return void 0 !== a ? a : this.__shady_native_previousSibling;
          },
          get childNodes() {
            if (Lc(this)) {
              var a = L(this);
              if (!a.childNodes) {
                a.childNodes = [];
                for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling)
                  a.childNodes.push(b);
              }
              var c = a.childNodes;
            } else
              c = this.__shady_native_childNodes;
            c.item = function(d) {
              return c[d];
            };
            return c;
          },
          get parentElement() {
            var a = L(this);
            (a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);
            return void 0 !== a ? a : this.__shady_native_parentElement;
          },
          get isConnected() {
            if (Ie && Ie.call(this))
              return true;
            if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE)
              return false;
            var a = this.ownerDocument;
            if (null === a || Uc(a, this))
              return true;
            for (a = this; a && !(a instanceof Document); )
              a = a.__shady_parentNode || (O(a) ? a.host : void 0);
            return !!(a && a instanceof Document);
          },
          get textContent() {
            if (Lc(this)) {
              for (var a = [], b = this.__shady_firstChild; b; b = b.__shady_nextSibling)
                b.nodeType !== Node.COMMENT_NODE && a.push(b.__shady_textContent);
              return a.join("");
            }
            return this.__shady_native_textContent;
          },
          set textContent(a) {
            if ("undefined" === typeof a || null === a)
              a = "";
            switch (this.nodeType) {
              case Node.ELEMENT_NODE:
              case Node.DOCUMENT_FRAGMENT_NODE:
                if (!Lc(this) && M.D) {
                  var b = this.__shady_firstChild;
                  (b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && Je(this);
                  this.__shady_native_textContent = a;
                } else
                  Je(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));
                break;
              default:
                this.nodeValue = a;
            }
          },
          insertBefore: function(a, b) {
            if (this.ownerDocument !== Ee && a.ownerDocument !== Ee)
              return this.__shady_native_insertBefore(a, b), a;
            if (a === this)
              throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
            if (b) {
              var c = L(b);
              c = c && c.parentNode;
              if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this)
                throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
            }
            if (b === a)
              return a;
            Me(this, a);
            var d = [], e = (c = Ne(this)) ? c.host.localName : Ce(this), f = a.__shady_parentNode;
            if (f) {
              var g = Ce(a);
              var h = !!c || !Ne(a) || Fe && void 0 !== this.__noInsertionPoint;
              f.__shady_removeChild(a, h);
            }
            f = true;
            var k = (!Fe || void 0 === a.__noInsertionPoint && void 0 === this.__noInsertionPoint) && !Be(a, e), l = c && !a.__noInsertionPoint && (!Fe || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
            if (l || k)
              k && (g = g || Ce(a)), De(a, function(m) {
                l && "slot" === m.localName && d.push(m);
                if (k) {
                  var q = g;
                  ye() && (q && Ae(m, q), (q = ye()) && q.scopeNode(m, e));
                }
              });
            d.length && (Oe(c), c.i.push.apply(c.i, w(d)), Pe(c));
            Lc(this) && (Qe(a, this, b), h = L(this), h.root ? (f = false, Mc(this) && Pe(h.root)) : c && "slot" === this.localName && (f = false, Pe(c)));
            f ? (c = O(this) ? this.host : this, b ? (b = Le(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);
            return a;
          },
          appendChild: function(a) {
            if (this != a || !O(a))
              return this.__shady_insertBefore(a);
          },
          removeChild: function(a, b) {
            b = void 0 === b ? false : b;
            if (this.ownerDocument !== Ee)
              return this.__shady_native_removeChild(a);
            if (a.__shady_parentNode !== this)
              throw Error("The node to be removed is not a child of this node: " + a);
            Me(this, null, a);
            var c = Ne(a), d = c && Re(c, a), e = L(this);
            if (Lc(this) && (Se(a, this), Mc(this))) {
              Pe(e.root);
              var f = true;
            }
            if (ye() && !b && c && a.nodeType !== Node.TEXT_NODE) {
              var g = Ce(a);
              De(a, function(h) {
                Ae(h, g);
              });
            }
            Ke(a);
            c && ((b = "slot" === this.localName) && (f = true), (d || b) && Pe(c));
            f || (f = O(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));
            return a;
          },
          replaceChild: function(a, b) {
            this.__shady_insertBefore(a, b);
            this.__shady_removeChild(b);
            return a;
          },
          cloneNode: function(a) {
            if ("template" == this.localName)
              return this.__shady_native_cloneNode(a);
            var b = this.__shady_native_cloneNode(false);
            if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
              a = this.__shady_firstChild;
              for (var c; a; a = a.__shady_nextSibling)
                c = a.__shady_cloneNode(true), b.__shady_appendChild(c);
            }
            return b;
          },
          getRootNode: function(a) {
            if (this && this.nodeType) {
              var b = D(this), c = b.ta;
              void 0 === c && (O(this) ? (c = this, b.ta = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.ta = c)));
              return c;
            }
          },
          contains: function(a) {
            return Vc(this, a);
          }
        });
        var Ve = Q({ get assignedSlot() {
          var a = this.__shady_parentNode;
          (a = a && a.__shady_shadowRoot) && Ue(a);
          return (a = L(this)) && a.assignedSlot || null;
        } });
        var We = /* @__PURE__ */ new Map();
        [["(", { end: ")", sa: true }], ["[", { end: "]", sa: true }], ['"', { end: '"', sa: false }], ["'", { end: "'", sa: false }]].forEach(function(a) {
          var b = ka(a);
          a = b.next().value;
          b = b.next().value;
          We.set(a, b);
        });
        function Xe(a, b, c, d) {
          for (d = void 0 === d ? true : d; b < a.length; b++)
            if ("\\" === a[b] && b < a.length - 1 && "\n" !== a[b + 1])
              b++;
            else {
              if (-1 !== c.indexOf(a[b]))
                return b;
              if (d && We.has(a[b])) {
                var e = We.get(a[b]);
                b = Xe(a, b + 1, [e.end], e.sa);
              }
            }
          return a.length;
        }
        function Ye(a) {
          function b() {
            if (0 < d.length) {
              for (; " " === d[d.length - 1]; )
                d.pop();
              c.push({ La: d.filter(function(k, l) {
                return 0 === l % 2;
              }), Za: d.filter(function(k, l) {
                return 1 === l % 2;
              }) });
              d.length = 0;
            }
          }
          for (var c = [], d = [], e = 0; e < a.length; ) {
            var f = d[d.length - 1], g = Xe(a, e, [",", " ", ">", "+", "~"]), h = g === e ? a[e] : a.substring(e, g);
            if ("," === h)
              b();
            else if (-1 === [void 0, " ", ">", "+", "~"].indexOf(f) || " " !== h)
              " " === f && -1 !== [">", "+", "~"].indexOf(h) ? d[d.length - 1] = h : d.push(h);
            e = g + (g === e ? 1 : 0);
          }
          b();
          return c;
        }
        ;
        function Ze(a, b, c) {
          var d = [];
          $e(a, b, c, d);
          return d;
        }
        function $e(a, b, c, d) {
          for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
            var e;
            if (e = a.nodeType === Node.ELEMENT_NODE) {
              e = a;
              var f = b, g = c, h = d, k = f(e);
              k && h.push(e);
              g && g(k) ? e = k : ($e(e, f, g, h), e = void 0);
            }
            if (e)
              break;
          }
        }
        var af = { get firstElementChild() {
          var a = L(this);
          if (a && void 0 !== a.firstChild) {
            for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.__shady_nextSibling;
            return a;
          }
          return this.__shady_native_firstElementChild;
        }, get lastElementChild() {
          var a = L(this);
          if (a && void 0 !== a.lastChild) {
            for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE; )
              a = a.__shady_previousSibling;
            return a;
          }
          return this.__shady_native_lastElementChild;
        }, get children() {
          return Lc(this) ? Wc(Array.prototype.filter.call(
            Yc(this),
            function(a) {
              return a.nodeType === Node.ELEMENT_NODE;
            }
          )) : this.__shady_native_children;
        }, get childElementCount() {
          var a = this.__shady_children;
          return a ? a.length : 0;
        } }, bf = Q((af.append = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          this.__shady_insertBefore(cd.apply(null, w(b)), null);
        }, af.prepend = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          this.__shady_insertBefore(cd.apply(null, w(b)), this.__shady_firstChild);
        }, af.replaceChildren = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          for (; null !== (c = this.__shady_firstChild); )
            this.__shady_removeChild(c);
          this.__shady_insertBefore(cd.apply(null, w(b)), null);
        }, af));
        function cf(a, b) {
          function c(e, f) {
            return (e === a || -1 === f.indexOf(":scope")) && Pc.call(e, f);
          }
          var d = Ye(b);
          if (1 > d.length)
            return [];
          for (b = dd(Ze(a, function() {
            return true;
          }).map(function(e) {
            return dd(d.map(function(f) {
              var g = f.La, h = g.length - 1;
              return c(e, g[h]) ? { target: e, da: f, fa: e, index: h } : [];
            }));
          })); b.some(function(e) {
            return 0 < e.index;
          }); )
            b = dd(b.map(function(e) {
              if (0 >= e.index)
                return e;
              var f = e.target, g = e.fa, h = e.da;
              e = e.index - 1;
              var k = h.Za[e], l = h.La[e];
              if (" " === k) {
                k = [];
                for (g = g.__shady_parentElement; g; g = g.__shady_parentElement)
                  c(
                    g,
                    l
                  ) && k.push({ target: f, da: h, fa: g, index: e });
                return k;
              }
              if (">" === k)
                return g = g.__shady_parentElement, c(g, l) ? { target: f, da: h, fa: g, index: e } : [];
              if ("+" === k)
                return (g = g.__shady_previousElementSibling) && c(g, l) ? { target: f, da: h, fa: g, index: e } : [];
              if ("~" === k) {
                k = [];
                for (g = g.__shady_previousElementSibling; g; g = g.__shady_previousElementSibling)
                  c(g, l) && k.push({ target: f, da: h, fa: g, index: e });
                return k;
              }
              throw Error("Unrecognized combinator: '" + k + "'.");
            }));
          return ed(b.map(function(e) {
            return e.target;
          }));
        }
        var df = M.querySelectorImplementation, ef = Q({ querySelector: function(a) {
          if ("native" === df) {
            var b = Array.prototype.slice.call((this instanceof ShadowRoot ? this.host : this).__shady_native_querySelectorAll(a)), c = this.__shady_getRootNode();
            b = ka(b);
            for (var d = b.next(); !d.done; d = b.next())
              if (d = d.value, d.__shady_getRootNode() == c)
                return d;
            return null;
          }
          if ("selectorEngine" === df)
            return cf(this, a)[0] || null;
          if (void 0 === df)
            return Ze(this, function(e) {
              return Pc.call(e, a);
            }, function(e) {
              return !!e;
            })[0] || null;
          throw Error("Unrecognized value of ShadyDOM.querySelectorImplementation: '" + (df + "'"));
        }, querySelectorAll: function(a, b) {
          if (b || "native" === df) {
            b = Array.prototype.slice.call((this instanceof ShadowRoot ? this.host : this).__shady_native_querySelectorAll(a));
            var c = this.__shady_getRootNode();
            return Wc(b.filter(function(d) {
              return d.__shady_getRootNode() == c;
            }));
          }
          if ("selectorEngine" === df)
            return Wc(cf(this, a));
          if (void 0 === df)
            return Wc(Ze(this, function(d) {
              return Pc.call(d, a);
            }));
          throw Error("Unrecognized value of ShadyDOM.querySelectorImplementation: '" + (df + "'"));
        } }), ff = M.ha && !M.J ? ad({}, bf) : bf;
        ad(bf, ef);
        var gf = Q({ after: function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          c = this.__shady_parentNode;
          if (null !== c) {
            var d = this.__shady_nextSibling;
            c.__shady_insertBefore(cd.apply(null, w(b)), d);
          }
        }, before: function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          c = this.__shady_parentNode;
          null !== c && c.__shady_insertBefore(cd.apply(null, w(b)), this);
        }, remove: function() {
          var a = this.__shady_parentNode;
          null !== a && a.__shady_removeChild(this);
        }, replaceWith: function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          c = this.__shady_parentNode;
          if (null !== c) {
            var d = this.__shady_nextSibling;
            c.__shady_removeChild(this);
            c.__shady_insertBefore(cd.apply(null, w(b)), d);
          }
        } });
        var hf = window.document;
        function jf(a, b) {
          if ("slot" === b)
            a = a.__shady_parentNode, Mc(a) && Pe(L(a).root);
          else if ("slot" === a.localName && "name" === b && (b = Ne(a))) {
            if (b.g) {
              kf(b);
              var c = a.Ua, d = lf(a);
              if (d !== c) {
                c = b.h[c];
                var e = c.indexOf(a);
                0 <= e && c.splice(e, 1);
                c = b.h[d] || (b.h[d] = []);
                c.push(a);
                1 < c.length && (b.h[d] = mf(c));
              }
            }
            Pe(b);
          }
        }
        var nf = Q({
          get previousElementSibling() {
            var a = L(this);
            if (a && void 0 !== a.previousSibling) {
              for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE; )
                a = a.__shady_previousSibling;
              return a;
            }
            return this.__shady_native_previousElementSibling;
          },
          get nextElementSibling() {
            var a = L(this);
            if (a && void 0 !== a.nextSibling) {
              for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE; )
                a = a.__shady_nextSibling;
              return a;
            }
            return this.__shady_native_nextElementSibling;
          },
          get slot() {
            return this.getAttribute("slot");
          },
          set slot(a) {
            this.__shady_setAttribute("slot", a);
          },
          get className() {
            return this.getAttribute("class") || "";
          },
          set className(a) {
            this.__shady_setAttribute("class", a);
          },
          setAttribute: function(a, b) {
            this.ownerDocument !== hf ? this.__shady_native_setAttribute(a, b) : ze(this, a, b) || (this.__shady_native_setAttribute(a, b), jf(this, a));
          },
          removeAttribute: function(a) {
            this.ownerDocument !== hf ? this.__shady_native_removeAttribute(a) : ze(this, a, "") ? "" === this.getAttribute(a) && this.__shady_native_removeAttribute(a) : (this.__shady_native_removeAttribute(a), jf(this, a));
          },
          toggleAttribute: function(a, b) {
            if (this.ownerDocument !== hf)
              return this.__shady_native_toggleAttribute(a, b);
            if (!ze(this, a, ""))
              return b = this.__shady_native_toggleAttribute(a, b), jf(this, a), b;
            if ("" === this.getAttribute(a) && !b)
              return this.__shady_native_toggleAttribute(a, b);
          }
        });
        M.ha || qe.forEach(function(a) {
          nf[a] = se(a);
        });
        var sf = Q({ attachShadow: function(a) {
          if (!this)
            throw Error("Must provide a host.");
          if (!a)
            throw Error("Not enough arguments.");
          if (a.shadyUpgradeFragment && !M.Ra) {
            var b = a.shadyUpgradeFragment;
            b.__proto__ = ShadowRoot.prototype;
            of(b, this, a);
            pf(b, b);
            a = b.__noInsertionPoint ? null : b.querySelectorAll("slot");
            b.__noInsertionPoint = void 0;
            if (a && a.length) {
              var c = b;
              Oe(c);
              c.i.push.apply(c.i, w(a));
              Pe(b);
            }
            b.host.__shady_native_appendChild(b);
          } else
            b = new qf(rf, this, a);
          return this.__CE_shadowRoot = b;
        }, get shadowRoot() {
          var a = L(this);
          return a && a.lb || null;
        } });
        ad(nf, sf);
        var tf = document.implementation.createHTMLDocument("inert"), uf = Q({ get innerHTML() {
          return Lc(this) ? ud("template" === this.localName ? this.content : this, Yc) : this.__shady_native_innerHTML;
        }, set innerHTML(a) {
          if ("template" === this.localName)
            this.__shady_native_innerHTML = a;
          else {
            Je(this);
            var b = this.localName || "div";
            b = this.namespaceURI && this.namespaceURI !== tf.namespaceURI ? tf.createElementNS(this.namespaceURI, b) : tf.createElement(b);
            for (M.D ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild; )
              this.__shady_insertBefore(a);
          }
        } });
        var vf = Q({ blur: function() {
          var a = L(this);
          (a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
        } });
        M.ha || re.forEach(function(a) {
          vf[a] = se(a);
        });
        var wf = Q({ assignedNodes: function(a) {
          if ("slot" === this.localName) {
            var b = this.__shady_getRootNode();
            b && O(b) && Ue(b);
            return (b = L(this)) ? (a && a.flatten ? b.aa : b.assignedNodes) || [] : [];
          }
        }, addEventListener: function(a, b, c) {
          if ("slot" !== this.localName || "slotchange" === a)
            ie.call(this, a, b, c);
          else {
            "object" !== typeof c && (c = { capture: !!c });
            var d = this.__shady_parentNode;
            if (!d)
              throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");
            c.U = this;
            d.__shady_addEventListener(a, b, c);
          }
        }, removeEventListener: function(a, b, c) {
          if ("slot" !== this.localName || "slotchange" === a)
            je.call(this, a, b, c);
          else {
            "object" !== typeof c && (c = { capture: !!c });
            var d = this.__shady_parentNode;
            if (!d)
              throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");
            c.U = this;
            d.__shady_removeEventListener(a, b, c);
          }
        } });
        var xf = Q({ getElementById: function(a) {
          return "" === a ? null : Ze(this, function(b) {
            return b.id == a;
          }, function(b) {
            return !!b;
          })[0] || null;
        } });
        function yf(a, b) {
          for (var c; b && !a.has(c = b.__shady_getRootNode()); )
            b = c.host;
          return b;
        }
        function zf(a) {
          var b = /* @__PURE__ */ new Set();
          for (b.add(a); O(a) && a.host; )
            a = a.host.__shady_getRootNode(), b.add(a);
          return b;
        }
        var Af = "__shady_native_" + Jc(), Bf = Q({ get activeElement() {
          var a = M.D ? document.__shady_native_activeElement : document.activeElement;
          if (!a || !a.nodeType)
            return null;
          var b = !!O(this);
          if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a)))
            return null;
          for (b = Ne(a); b && b !== this; )
            a = b.host, b = Ne(a);
          return this === document ? b ? null : a : b === this ? a : null;
        }, elementsFromPoint: function(a, b) {
          a = document[Af](a, b);
          if (this === document && M.useNativeDocumentEFP)
            return a;
          a = [].slice.call(a);
          b = zf(this);
          for (var c = /* @__PURE__ */ new Set(), d = 0; d < a.length; d++)
            c.add(yf(b, a[d]));
          var e = [];
          c.forEach(function(f) {
            return e.push(f);
          });
          return e;
        }, elementFromPoint: function(a, b) {
          return this === document && M.useNativeDocumentEFP ? this.__shady_native_elementFromPoint(a, b) : this.__shady_elementsFromPoint(a, b)[0] || null;
        } });
        var Cf = window.document, Df = Q({ importNode: function(a, b) {
          if (a.ownerDocument !== Cf || "template" === a.localName)
            return this.__shady_native_importNode(a, b);
          var c = this.__shady_native_importNode(a, false);
          if (b)
            for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling)
              b = this.__shady_importNode(a, true), c.__shady_appendChild(b);
          return c;
        } });
        var Ef = Q({ dispatchEvent: ge, addEventListener: ie.bind(window), removeEventListener: je.bind(window) });
        var Ff = {};
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (Ff.parentElement = Te.parentElement);
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (Ff.contains = Te.contains);
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (Ff.children = bf.children);
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (Ff.innerHTML = uf.innerHTML);
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (Ff.className = nf.className);
        var Gf = { EventTarget: [we], Node: [Te, window.EventTarget ? null : we], Text: [Ve], Comment: [Ve], CDATASection: [Ve], ProcessingInstruction: [Ve], Element: [nf, bf, gf, Ve, !M.D || "innerHTML" in Element.prototype ? uf : null, window.HTMLSlotElement ? null : wf], HTMLElement: [vf, Ff], HTMLSlotElement: [wf], DocumentFragment: [ff, xf], Document: [Df, ff, xf, Bf], Window: [Ef], CharacterData: [gf], XMLHttpRequest: [window.EventTarget ? null : we] }, Hf = M.D ? null : ["innerHTML", "textContent"];
        function If(a, b, c, d) {
          b.forEach(function(e) {
            return a && e && P(a, e, c, d);
          });
        }
        function Jf(a) {
          var b = a ? null : Hf, c;
          for (c in Gf)
            If(window[c] && window[c].prototype, Gf[c], a, b);
        }
        ["Text", "Comment", "CDATASection", "ProcessingInstruction"].forEach(function(a) {
          var b = window[a], c = Object.create(b.prototype);
          c.__shady_protoIsPatched = true;
          If(c, Gf.EventTarget);
          If(c, Gf.Node);
          Gf[a] && If(c, Gf[a]);
          b.prototype.__shady_patchedProto = c;
        });
        function Kf(a) {
          a.__shady_protoIsPatched = true;
          If(a, Gf.EventTarget);
          If(a, Gf.Node);
          If(a, Gf.Element);
          If(a, Gf.HTMLElement);
          If(a, Gf.HTMLSlotElement);
          return a;
        }
        ;
        var Lf = M.Da, Mf = M.D;
        function Nf(a, b) {
          if (Lf && !a.__shady_protoIsPatched && !O(a)) {
            var c = Object.getPrototypeOf(a), d = c.hasOwnProperty("__shady_patchedProto") && c.__shady_patchedProto;
            d || (d = Object.create(c), Kf(d), c.__shady_patchedProto = d);
            Object.setPrototypeOf(a, d);
          }
          Mf || (1 === b ? Md(a) : 2 === b && Nd(a));
        }
        function Of(a, b, c, d) {
          Nf(a, 1);
          d = d || null;
          var e = D(a), f = d ? D(d) : null;
          e.previousSibling = d ? f.previousSibling : b.__shady_lastChild;
          if (f = L(e.previousSibling))
            f.nextSibling = a;
          if (f = L(e.nextSibling = d))
            f.previousSibling = a;
          e.parentNode = b;
          d ? d === c.firstChild && (c.firstChild = a) : (c.lastChild = a, c.firstChild || (c.firstChild = a));
          c.childNodes = null;
        }
        function Qe(a, b, c) {
          Nf(b, 2);
          var d = D(b);
          void 0 !== d.firstChild && (d.childNodes = null);
          if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
            for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling)
              Of(a, b, d, c);
          else
            Of(a, b, d, c);
        }
        function Se(a, b) {
          var c = D(a);
          b = D(b);
          a === b.firstChild && (b.firstChild = c.nextSibling);
          a === b.lastChild && (b.lastChild = c.previousSibling);
          a = c.previousSibling;
          var d = c.nextSibling;
          a && (D(a).nextSibling = d);
          d && (D(d).previousSibling = a);
          c.parentNode = c.previousSibling = c.nextSibling = void 0;
          void 0 !== b.childNodes && (b.childNodes = null);
        }
        function pf(a, b) {
          var c = D(a);
          if (b || void 0 === c.firstChild) {
            c.childNodes = null;
            var d = c.firstChild = a.__shady_native_firstChild;
            c.lastChild = a.__shady_native_lastChild;
            Nf(a, 2);
            c = d;
            for (d = void 0; c; c = c.__shady_native_nextSibling) {
              var e = D(c);
              e.parentNode = b || a;
              e.nextSibling = c.__shady_native_nextSibling;
              e.previousSibling = d || null;
              d = c;
              Nf(c, 1);
            }
          }
        }
        ;
        var Pf = Q({ addEventListener: function(a, b, c) {
          "object" !== typeof c && (c = { capture: !!c });
          c.U = c.U || this;
          this.host.__shady_addEventListener(a, b, c);
        }, removeEventListener: function(a, b, c) {
          "object" !== typeof c && (c = { capture: !!c });
          c.U = c.U || this;
          this.host.__shady_removeEventListener(a, b, c);
        } });
        function Qf(a, b) {
          P(a, Pf, b);
          P(a, Bf, b);
          P(a, uf, b);
          P(a, bf, b);
          M.J && !b ? (P(a, Te, b), P(a, xf, b)) : M.D || (P(a, Jd), P(a, Hd), P(a, Id));
        }
        ;
        var rf = {}, Rf = M.deferConnectionCallbacks && "loading" === document.readyState, Sf;
        function Tf(a) {
          var b = [];
          do
            b.unshift(a);
          while (a = a.__shady_parentNode);
          return b;
        }
        function qf(a, b, c) {
          if (a !== rf)
            throw new TypeError("Illegal constructor");
          this.g = null;
          of(this, b, c);
        }
        function of(a, b, c) {
          a.host = b;
          a.mode = c && c.mode;
          pf(a.host);
          b = D(a.host);
          b.root = a;
          b.lb = "closed" !== a.mode ? a : null;
          b = D(a);
          b.firstChild = b.lastChild = b.parentNode = b.nextSibling = b.previousSibling = null;
          if (M.preferPerformance)
            for (; b = a.host.__shady_native_firstChild; )
              a.host.__shady_native_removeChild(b);
          else
            Pe(a);
        }
        function Pe(a) {
          a.Y || (a.Y = true, hd(function() {
            return Ue(a);
          }));
        }
        function Ue(a) {
          var b;
          if (b = a.Y) {
            for (var c; a; )
              a: {
                a.Y && (c = a), b = a;
                a = b.host.__shady_getRootNode();
                if (O(a) && (b = L(b.host)) && 0 < b.ka)
                  break a;
                a = void 0;
              }
            b = c;
          }
          (c = b) && c._renderSelf();
        }
        qf.prototype._renderSelf = function() {
          var a = Rf;
          Rf = true;
          this.Y = false;
          if (this.g) {
            kf(this);
            for (var b = 0, c; b < this.g.length; b++) {
              c = this.g[b];
              var d = L(c), e = d.assignedNodes;
              d.assignedNodes = [];
              d.aa = [];
              if (d.Ja = e)
                for (d = 0; d < e.length; d++) {
                  var f = L(e[d]);
                  f.xa = f.assignedSlot;
                  f.assignedSlot === c && (f.assignedSlot = null);
                }
            }
            for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling)
              Uf(this, b);
            for (b = 0; b < this.g.length; b++) {
              c = this.g[b];
              e = L(c);
              if (!e.assignedNodes.length)
                for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling)
                  Uf(
                    this,
                    d,
                    c
                  );
              (d = (d = L(c.__shady_parentNode)) && d.root) && (Nc(d) || d.Y) && d._renderSelf();
              Vf(this, e.aa, e.assignedNodes);
              if (d = e.Ja) {
                for (f = 0; f < d.length; f++)
                  L(d[f]).xa = null;
                e.Ja = null;
                d.length > e.assignedNodes.length && (e.Aa = true);
              }
              e.Aa && (e.Aa = false, Wf(this, c));
            }
            c = this.g;
            b = [];
            for (e = 0; e < c.length; e++)
              d = c[e].__shady_parentNode, (f = L(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);
            for (c = 0; c < b.length; c++) {
              f = b[c];
              e = f === this ? this.host : f;
              d = [];
              for (f = f.__shady_firstChild; f; f = f.__shady_nextSibling)
                if ("slot" == f.localName)
                  for (var g = L(f).aa, h = 0; h < g.length; h++)
                    d.push(g[h]);
                else
                  d.push(f);
              f = Xc(e);
              g = ue(d, d.length, f, f.length);
              for (var k = h = 0, l = void 0; h < g.length && (l = g[h]); h++) {
                for (var m = 0, q = void 0; m < l.ia.length && (q = l.ia[m]); m++)
                  q.__shady_native_parentNode === e && e.__shady_native_removeChild(q), f.splice(l.index + k, 1);
                k -= l.pa;
              }
              k = 0;
              for (l = void 0; k < g.length && (l = g[k]); k++)
                for (h = f[l.index], m = l.index; m < l.index + l.pa; m++)
                  q = d[m], e.__shady_native_insertBefore(q, h), f.splice(m, 0, q);
            }
          }
          if (!M.preferPerformance && !this.Ia)
            for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling)
              c = L(b), b.__shady_native_parentNode !== this.host || "slot" !== b.localName && c.assignedSlot || this.host.__shady_native_removeChild(b);
          this.Ia = true;
          Rf = a;
          Sf && Sf();
        };
        function Uf(a, b, c) {
          var d = D(b), e = d.xa;
          d.xa = null;
          c || (c = (a = a.h[b.__shady_slot || "__catchall"]) && a[0]);
          c ? (D(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;
          e !== d.assignedSlot && d.assignedSlot && (D(d.assignedSlot).Aa = true);
        }
        function Vf(a, b, c) {
          for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++)
            if ("slot" == e.localName) {
              var f = L(e).assignedNodes;
              f && f.length && Vf(a, b, f);
            } else
              b.push(c[d]);
        }
        function Wf(a, b) {
          b.__shady_native_dispatchEvent(new Event("slotchange"));
          b = L(b);
          b.assignedSlot && Wf(a, b.assignedSlot);
        }
        function Oe(a) {
          a.i = a.i || [];
          a.g = a.g || [];
          a.h = a.h || {};
        }
        function kf(a) {
          if (a.i && a.i.length) {
            for (var b = a.i, c, d = 0; d < b.length; d++) {
              var e = b[d];
              pf(e);
              var f = e.__shady_parentNode;
              pf(f);
              f = L(f);
              f.ka = (f.ka || 0) + 1;
              f = lf(e);
              a.h[f] ? (c = c || {}, c[f] = true, a.h[f].push(e)) : a.h[f] = [e];
              a.g.push(e);
            }
            if (c)
              for (var g in c)
                a.h[g] = mf(a.h[g]);
            a.i = [];
          }
        }
        function lf(a) {
          var b = a.name || a.getAttribute("name") || "__catchall";
          return a.Ua = b;
        }
        function mf(a) {
          return a.sort(function(b, c) {
            b = Tf(b);
            for (var d = Tf(c), e = 0; e < b.length; e++) {
              c = b[e];
              var f = d[e];
              if (c !== f)
                return b = Yc(c.__shady_parentNode), b.indexOf(c) - b.indexOf(f);
            }
          });
        }
        function Re(a, b) {
          if (a.g) {
            kf(a);
            var c = a.h, d;
            for (d in c)
              for (var e = c[d], f = 0; f < e.length; f++) {
                var g = e[f];
                if (Vc(b, g)) {
                  e.splice(f, 1);
                  var h = a.g.indexOf(g);
                  0 <= h && (a.g.splice(h, 1), (h = L(g.__shady_parentNode)) && h.ka && h.ka--);
                  f--;
                  g = L(g);
                  if (h = g.aa)
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k], m = l.__shady_native_parentNode;
                      m && m.__shady_native_removeChild(l);
                    }
                  g.aa = [];
                  g.assignedNodes = [];
                  h = true;
                }
              }
            return h;
          }
        }
        function Nc(a) {
          kf(a);
          return !(!a.g || !a.g.length);
        }
        (function(a) {
          a.__proto__ = DocumentFragment.prototype;
          Qf(a, "__shady_");
          Qf(a);
          Object.defineProperties(a, { nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: true }, nodeName: { value: "#document-fragment", configurable: true }, nodeValue: { value: null, configurable: true } });
          ["localName", "namespaceURI", "prefix"].forEach(function(b) {
            Object.defineProperty(a, b, { value: void 0, configurable: true });
          });
          ["ownerDocument", "baseURI", "isConnected"].forEach(function(b) {
            Object.defineProperty(a, b, {
              get: function() {
                return this.host[b];
              },
              configurable: true
            });
          });
        })(qf.prototype);
        if (window.customElements && window.customElements.define && M.Ba && !M.preferPerformance) {
          var Xf = /* @__PURE__ */ new Map();
          Sf = function() {
            var a = [];
            Xf.forEach(function(d, e) {
              a.push([e, d]);
            });
            Xf.clear();
            for (var b = 0; b < a.length; b++) {
              var c = a[b][0];
              a[b][1] ? c.__shadydom_connectedCallback() : c.__shadydom_disconnectedCallback();
            }
          };
          Rf && document.addEventListener("readystatechange", function() {
            Rf = false;
            Sf();
          }, { once: true });
          var Yf = function(a, b, c) {
            var d = 0, e = "__isConnected" + d++;
            if (b || c)
              a.prototype.connectedCallback = a.prototype.__shadydom_connectedCallback = function() {
                Rf ? Xf.set(this, true) : this[e] || (this[e] = true, b && b.call(this));
              }, a.prototype.disconnectedCallback = a.prototype.__shadydom_disconnectedCallback = function() {
                Rf ? this.isConnected || Xf.set(this, false) : this[e] && (this[e] = false, c && c.call(this));
              };
            return a;
          }, Zf = window.customElements.define, $f = function(a, b) {
            var c = b.prototype.connectedCallback, d = b.prototype.disconnectedCallback;
            Zf.call(window.customElements, a, Yf(b, c, d));
            b.prototype.connectedCallback = c;
            b.prototype.disconnectedCallback = d;
          };
          window.customElements.define = $f;
          Object.defineProperty(window.CustomElementRegistry.prototype, "define", { value: $f, configurable: true });
        }
        function Ne(a) {
          a = a.__shady_getRootNode();
          if (O(a))
            return a;
        }
        ;
        function ag(a) {
          this.node = a;
        }
        v = ag.prototype;
        v.addEventListener = function(a, b, c) {
          return this.node.__shady_addEventListener(a, b, c);
        };
        v.removeEventListener = function(a, b, c) {
          return this.node.__shady_removeEventListener(a, b, c);
        };
        v.appendChild = function(a) {
          return this.node.__shady_appendChild(a);
        };
        v.insertBefore = function(a, b) {
          return this.node.__shady_insertBefore(a, b);
        };
        v.removeChild = function(a) {
          return this.node.__shady_removeChild(a);
        };
        v.replaceChild = function(a, b) {
          return this.node.__shady_replaceChild(a, b);
        };
        v.cloneNode = function(a) {
          return this.node.__shady_cloneNode(a);
        };
        v.getRootNode = function(a) {
          return this.node.__shady_getRootNode(a);
        };
        v.contains = function(a) {
          return this.node.__shady_contains(a);
        };
        v.dispatchEvent = function(a) {
          return this.node.__shady_dispatchEvent(a);
        };
        v.setAttribute = function(a, b) {
          this.node.__shady_setAttribute(a, b);
        };
        v.getAttribute = function(a) {
          return this.node.__shady_native_getAttribute(a);
        };
        v.hasAttribute = function(a) {
          return this.node.__shady_native_hasAttribute(a);
        };
        v.removeAttribute = function(a) {
          this.node.__shady_removeAttribute(a);
        };
        v.toggleAttribute = function(a, b) {
          return this.node.__shady_toggleAttribute(a, b);
        };
        v.attachShadow = function(a) {
          return this.node.__shady_attachShadow(a);
        };
        v.focus = function() {
          this.node.__shady_native_focus();
        };
        v.blur = function() {
          this.node.__shady_blur();
        };
        v.importNode = function(a, b) {
          if (this.node.nodeType === Node.DOCUMENT_NODE)
            return this.node.__shady_importNode(a, b);
        };
        v.getElementById = function(a) {
          if (this.node.nodeType === Node.DOCUMENT_NODE)
            return this.node.__shady_getElementById(a);
        };
        v.elementsFromPoint = function(a, b) {
          return this.node.__shady_elementsFromPoint(a, b);
        };
        v.elementFromPoint = function(a, b) {
          return this.node.__shady_elementFromPoint(a, b);
        };
        v.querySelector = function(a) {
          return this.node.__shady_querySelector(a);
        };
        v.querySelectorAll = function(a, b) {
          return this.node.__shady_querySelectorAll(a, b);
        };
        v.assignedNodes = function(a) {
          if ("slot" === this.node.localName)
            return this.node.__shady_assignedNodes(a);
        };
        v.append = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          return this.node.__shady_append.apply(this.node, w(b));
        };
        v.prepend = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          return this.node.__shady_prepend.apply(this.node, w(b));
        };
        v.after = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          return this.node.__shady_after.apply(this.node, w(b));
        };
        v.before = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          return this.node.__shady_before.apply(this.node, w(b));
        };
        v.remove = function() {
          return this.node.__shady_remove();
        };
        v.replaceWith = function(a) {
          for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
          return this.node.__shady_replaceWith.apply(this.node, w(b));
        };
        ea.Object.defineProperties(ag.prototype, {
          activeElement: { configurable: true, enumerable: true, get: function() {
            if (O(this.node) || this.node.nodeType === Node.DOCUMENT_NODE)
              return this.node.__shady_activeElement;
          } },
          _activeElement: { configurable: true, enumerable: true, get: function() {
            return this.activeElement;
          } },
          host: { configurable: true, enumerable: true, get: function() {
            if (O(this.node))
              return this.node.host;
          } },
          parentNode: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_parentNode;
          } },
          firstChild: {
            configurable: true,
            enumerable: true,
            get: function() {
              return this.node.__shady_firstChild;
            }
          },
          lastChild: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_lastChild;
          } },
          nextSibling: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_nextSibling;
          } },
          previousSibling: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_previousSibling;
          } },
          childNodes: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_childNodes;
          } },
          parentElement: {
            configurable: true,
            enumerable: true,
            get: function() {
              return this.node.__shady_parentElement;
            }
          },
          firstElementChild: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_firstElementChild;
          } },
          lastElementChild: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_lastElementChild;
          } },
          nextElementSibling: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_nextElementSibling;
          } },
          previousElementSibling: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_previousElementSibling;
          } },
          children: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_children;
          } },
          childElementCount: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_childElementCount;
          } },
          shadowRoot: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_shadowRoot;
          } },
          assignedSlot: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_assignedSlot;
          } },
          isConnected: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_isConnected;
          } },
          innerHTML: {
            configurable: true,
            enumerable: true,
            get: function() {
              return this.node.__shady_innerHTML;
            },
            set: function(a) {
              this.node.__shady_innerHTML = a;
            }
          },
          textContent: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_textContent;
          }, set: function(a) {
            this.node.__shady_textContent = a;
          } },
          slot: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_slot;
          }, set: function(a) {
            this.node.__shady_slot = a;
          } },
          className: { configurable: true, enumerable: true, get: function() {
            return this.node.__shady_className;
          }, set: function(a) {
            this.node.__shady_className = a;
          } }
        });
        function bg(a) {
          Object.defineProperty(ag.prototype, a, { get: function() {
            return this.node["__shady_" + a];
          }, set: function(b) {
            this.node["__shady_" + a] = b;
          }, configurable: true });
        }
        qe.forEach(function(a) {
          return bg(a);
        });
        re.forEach(function(a) {
          return bg(a);
        });
        var cg = /* @__PURE__ */ new WeakMap();
        function dg(a) {
          if (O(a) || a instanceof ag)
            return a;
          var b = cg.get(a);
          b || (b = new ag(a), cg.set(a, b));
          return b;
        }
        ;
        if (M.Ba) {
          var eg = M.D ? function(a) {
            return a;
          } : function(a) {
            Nd(a);
            Md(a);
            return a;
          }, ShadyDOM = {
            inUse: M.Ba,
            patch: eg,
            isShadyRoot: O,
            enqueue: hd,
            flush: id,
            flushInitial: function(a) {
              !a.Ia && a.Y && Ue(a);
            },
            settings: M,
            filterMutations: nd,
            observeChildren: ld,
            unobserveChildren: md,
            deferConnectionCallbacks: M.deferConnectionCallbacks,
            preferPerformance: M.preferPerformance,
            handlesDynamicScoping: true,
            wrap: M.J ? dg : eg,
            wrapIfNeeded: true === M.J ? dg : function(a) {
              return a;
            },
            Wrapper: ag,
            composedPath: Wd,
            noPatch: M.J,
            patchOnDemand: M.Da,
            nativeMethods: wd,
            nativeTree: xd,
            patchElementProto: Kf,
            querySelectorImplementation: M.querySelectorImplementation
          };
          window.ShadyDOM = ShadyDOM;
          Gd();
          Jf("__shady_");
          Object.defineProperty(document, "_activeElement", Bf.activeElement);
          P(Window.prototype, Ef, "__shady_");
          M.J ? M.Da && P(Element.prototype, sf) : (Jf(), pe());
          ke();
          window.Event = me;
          window.CustomEvent = ne;
          window.MouseEvent = oe;
          window.ShadowRoot = qf;
        }
        ;
        var fg = window.Document.prototype.createElement, gg = window.Document.prototype.createElementNS, hg = window.Document.prototype.importNode, ig = window.Document.prototype.prepend, jg = window.Document.prototype.append, kg = window.DocumentFragment.prototype.prepend, lg = window.DocumentFragment.prototype.append, mg = window.Node.prototype.cloneNode, ng = window.Node.prototype.appendChild, og = window.Node.prototype.insertBefore, pg = window.Node.prototype.removeChild, qg = window.Node.prototype.replaceChild, rg = Object.getOwnPropertyDescriptor(
          window.Node.prototype,
          "textContent"
        ), sg = window.Element.prototype.attachShadow, tg = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), ug = window.Element.prototype.getAttribute, vg = window.Element.prototype.setAttribute, wg = window.Element.prototype.removeAttribute, xg = window.Element.prototype.toggleAttribute, yg = window.Element.prototype.getAttributeNS, zg = window.Element.prototype.setAttributeNS, Ag = window.Element.prototype.removeAttributeNS, Bg = window.Element.prototype.insertAdjacentElement, Cg = window.Element.prototype.insertAdjacentHTML, Dg = window.Element.prototype.prepend, Eg = window.Element.prototype.append, Fg = window.Element.prototype.before, Gg = window.Element.prototype.after, Hg = window.Element.prototype.replaceWith, Ig = window.Element.prototype.remove, Jg = window.HTMLElement, Kg = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), Lg = window.HTMLElement.prototype.insertAdjacentElement, Mg = window.HTMLElement.prototype.insertAdjacentHTML;
        var Ng = /* @__PURE__ */ new Set();
        "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(a) {
          return Ng.add(a);
        });
        function Og(a) {
          var b = Ng.has(a);
          a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
          return !b && a;
        }
        var Pg = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
        function T(a) {
          var b = a.isConnected;
          if (void 0 !== b)
            return b;
          if (Pg(a))
            return true;
          for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
            a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
          return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
        }
        function Qg(a) {
          var b = a.children;
          if (b)
            return Array.prototype.slice.call(b);
          b = [];
          for (a = a.firstChild; a; a = a.nextSibling)
            a.nodeType === Node.ELEMENT_NODE && b.push(a);
          return b;
        }
        function Rg(a, b) {
          for (; b && b !== a && !b.nextSibling; )
            b = b.parentNode;
          return b && b !== a ? b.nextSibling : null;
        }
        function Sg(a, b, c) {
          for (var d = a; d; ) {
            if (d.nodeType === Node.ELEMENT_NODE) {
              var e = d;
              b(e);
              var f = e.localName;
              if ("link" === f && "import" === e.getAttribute("rel")) {
                d = e.import;
                void 0 === c && (c = /* @__PURE__ */ new Set());
                if (d instanceof Node && !c.has(d))
                  for (c.add(d), d = d.firstChild; d; d = d.nextSibling)
                    Sg(d, b, c);
                d = Rg(a, e);
                continue;
              } else if ("template" === f) {
                d = Rg(a, e);
                continue;
              }
              if (e = e.__CE_shadowRoot)
                for (e = e.firstChild; e; e = e.nextSibling)
                  Sg(e, b, c);
            }
            d = d.firstChild ? d.firstChild : Rg(a, d);
          }
        }
        ;
        function Tg() {
          var a = !(null === Ug || void 0 === Ug || !Ug.noDocumentConstructionObserver), b = !(null === Ug || void 0 === Ug || !Ug.shadyDomFastWalk);
          this.ca = [];
          this.g = [];
          this.W = false;
          this.shadyDomFastWalk = b;
          this.sb = !a;
        }
        function Vg(a, b, c, d) {
          var e = window.ShadyDOM;
          if (a.shadyDomFastWalk && e && e.inUse) {
            if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll)
              for (a = e.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++)
                c(a[b]);
          } else
            Sg(b, c, d);
        }
        function Wg(a, b) {
          a.W = true;
          a.ca.push(b);
        }
        function Xg(a, b) {
          a.W = true;
          a.g.push(b);
        }
        function Yg(a, b) {
          a.W && Vg(a, b, function(c) {
            return Zg(a, c);
          });
        }
        function Zg(a, b) {
          if (a.W && !b.__CE_patched) {
            b.__CE_patched = true;
            for (var c = 0; c < a.ca.length; c++)
              a.ca[c](b);
            for (c = 0; c < a.g.length; c++)
              a.g[c](b);
          }
        }
        function $g(a, b) {
          var c = [];
          Vg(a, b, function(e) {
            return c.push(e);
          });
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state ? a.connectedCallback(d) : ah(a, d);
          }
        }
        function bh(a, b) {
          var c = [];
          Vg(a, b, function(e) {
            return c.push(e);
          });
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state && a.disconnectedCallback(d);
          }
        }
        function ch(a, b, c) {
          c = void 0 === c ? {} : c;
          var d = c.tb, e = c.upgrade || function(g) {
            return ah(a, g);
          }, f = [];
          Vg(a, b, function(g) {
            a.W && Zg(a, g);
            if ("link" === g.localName && "import" === g.getAttribute("rel")) {
              var h = g.import;
              h instanceof Node && (h.__CE_isImportDocument = true, h.__CE_registry = document.__CE_registry);
              h && "complete" === h.readyState ? h.__CE_documentLoadHandled = true : g.addEventListener("load", function() {
                var k = g.import;
                if (!k.__CE_documentLoadHandled) {
                  k.__CE_documentLoadHandled = true;
                  var l = /* @__PURE__ */ new Set();
                  d && (d.forEach(function(m) {
                    return l.add(m);
                  }), l.delete(k));
                  ch(a, k, { tb: l, upgrade: e });
                }
              });
            } else
              f.push(g);
          }, d);
          for (b = 0; b < f.length; b++)
            e(f[b]);
        }
        function ah(a, b) {
          try {
            var c = b.ownerDocument, d = c.__CE_registry;
            var e = d && (c.defaultView || c.__CE_isImportDocument) ? dh(d, b.localName) : void 0;
            if (e && void 0 === b.__CE_state) {
              e.constructionStack.push(b);
              try {
                try {
                  if (new e.constructorFunction() !== b)
                    throw Error("The custom element constructor did not produce the element being upgraded.");
                } finally {
                  e.constructionStack.pop();
                }
              } catch (k) {
                throw b.__CE_state = 2, k;
              }
              b.__CE_state = 1;
              b.__CE_definition = e;
              if (e.attributeChangedCallback && b.hasAttributes()) {
                var f = e.observedAttributes;
                for (e = 0; e < f.length; e++) {
                  var g = f[e], h = b.getAttribute(g);
                  null !== h && a.attributeChangedCallback(b, g, null, h, null);
                }
              }
              T(b) && a.connectedCallback(b);
            }
          } catch (k) {
            eh(k);
          }
        }
        Tg.prototype.connectedCallback = function(a) {
          var b = a.__CE_definition;
          if (b.connectedCallback)
            try {
              b.connectedCallback.call(a);
            } catch (c) {
              eh(c);
            }
        };
        Tg.prototype.disconnectedCallback = function(a) {
          var b = a.__CE_definition;
          if (b.disconnectedCallback)
            try {
              b.disconnectedCallback.call(a);
            } catch (c) {
              eh(c);
            }
        };
        Tg.prototype.attributeChangedCallback = function(a, b, c, d, e) {
          var f = a.__CE_definition;
          if (f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b))
            try {
              f.attributeChangedCallback.call(a, b, c, d, e);
            } catch (g) {
              eh(g);
            }
        };
        function fh(a, b, c, d) {
          var e = b.__CE_registry;
          if (e && (null === d || "http://www.w3.org/1999/xhtml" === d) && (e = dh(e, c)))
            try {
              var f = new e.constructorFunction();
              if (void 0 === f.__CE_state || void 0 === f.__CE_definition)
                throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");
              if ("http://www.w3.org/1999/xhtml" !== f.namespaceURI)
                throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");
              if (f.hasAttributes())
                throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");
              if (null !== f.firstChild)
                throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");
              if (null !== f.parentNode)
                throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");
              if (f.ownerDocument !== b)
                throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");
              if (f.localName !== c)
                throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
              return f;
            } catch (g) {
              return eh(g), b = null === d ? fg.call(b, c) : gg.call(b, d, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, Zg(a, b), b;
            }
          b = null === d ? fg.call(b, c) : gg.call(b, d, c);
          Zg(a, b);
          return b;
        }
        function eh(a) {
          var b = "", c = "", d = 0, e = 0;
          a instanceof Error ? (b = a.message, c = a.sourceURL || a.fileName || "", d = a.line || a.lineNumber || 0, e = a.column || a.columnNumber || 0) : b = "Uncaught " + String(a);
          var f = void 0;
          void 0 === ErrorEvent.prototype.initErrorEvent ? f = new ErrorEvent("error", { cancelable: true, message: b, filename: c, lineno: d, colno: e, error: a }) : (f = document.createEvent("ErrorEvent"), f.initErrorEvent("error", false, true, b, c, d), f.preventDefault = function() {
            Object.defineProperty(this, "defaultPrevented", { configurable: true, get: function() {
              return true;
            } });
          });
          void 0 === f.error && Object.defineProperty(f, "error", { configurable: true, enumerable: true, get: function() {
            return a;
          } });
          window.dispatchEvent(f);
          f.defaultPrevented || console.error(a);
        }
        ;
        function gh() {
          var a = this;
          this.I = void 0;
          this.Ka = new Promise(function(b) {
            a.g = b;
          });
        }
        gh.prototype.resolve = function(a) {
          if (this.I)
            throw Error("Already resolved.");
          this.I = a;
          this.g(a);
        };
        function hh(a) {
          var b = document;
          this.X = void 0;
          this.S = a;
          this.g = b;
          ch(this.S, this.g);
          "loading" === this.g.readyState && (this.X = new MutationObserver(this.h.bind(this)), this.X.observe(this.g, { childList: true, subtree: true }));
        }
        function ih(a) {
          a.X && a.X.disconnect();
        }
        hh.prototype.h = function(a) {
          var b = this.g.readyState;
          "interactive" !== b && "complete" !== b || ih(this);
          for (b = 0; b < a.length; b++)
            for (var c = a[b].addedNodes, d = 0; d < c.length; d++)
              ch(this.S, c[d]);
        };
        function U(a) {
          this.ma = /* @__PURE__ */ new Map();
          this.na = /* @__PURE__ */ new Map();
          this.Fa = /* @__PURE__ */ new Map();
          this.wa = false;
          this.za = /* @__PURE__ */ new Map();
          this.la = function(b) {
            return b();
          };
          this.V = false;
          this.oa = [];
          this.S = a;
          this.Ga = a.sb ? new hh(a) : void 0;
        }
        v = U.prototype;
        v.jb = function(a, b) {
          var c = this;
          if (!(b instanceof Function))
            throw new TypeError("Custom element constructor getters must be functions.");
          jh(this, a);
          this.ma.set(a, b);
          this.oa.push(a);
          this.V || (this.V = true, this.la(function() {
            return kh(c);
          }));
        };
        v.define = function(a, b) {
          var c = this;
          if (!(b instanceof Function))
            throw new TypeError("Custom element constructors must be functions.");
          jh(this, a);
          lh(this, a, b);
          this.oa.push(a);
          this.V || (this.V = true, this.la(function() {
            return kh(c);
          }));
        };
        function jh(a, b) {
          if (!Og(b))
            throw new SyntaxError("The element name '" + b + "' is not valid.");
          if (dh(a, b))
            throw Error("A custom element with name '" + (b + "' has already been defined."));
          if (a.wa)
            throw Error("A custom element is already being defined.");
        }
        function lh(a, b, c) {
          a.wa = true;
          var d;
          try {
            var e = c.prototype;
            if (!(e instanceof Object))
              throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = function(m) {
              var q = e[m];
              if (void 0 !== q && !(q instanceof Function))
                throw Error("The '" + m + "' callback must be a function.");
              return q;
            };
            var g = f("connectedCallback");
            var h = f("disconnectedCallback");
            var k = f("adoptedCallback");
            var l = (d = f("attributeChangedCallback")) && c.observedAttributes || [];
          } catch (m) {
            throw m;
          } finally {
            a.wa = false;
          }
          c = {
            localName: b,
            constructorFunction: c,
            connectedCallback: g,
            disconnectedCallback: h,
            adoptedCallback: k,
            attributeChangedCallback: d,
            observedAttributes: l,
            constructionStack: []
          };
          a.na.set(b, c);
          a.Fa.set(c.constructorFunction, c);
          return c;
        }
        v.upgrade = function(a) {
          ch(this.S, a);
        };
        function kh(a) {
          if (false !== a.V) {
            a.V = false;
            for (var b = [], c = a.oa, d = /* @__PURE__ */ new Map(), e = 0; e < c.length; e++)
              d.set(c[e], []);
            ch(a.S, document, { upgrade: function(k) {
              if (void 0 === k.__CE_state) {
                var l = k.localName, m = d.get(l);
                m ? m.push(k) : a.na.has(l) && b.push(k);
              }
            } });
            for (e = 0; e < b.length; e++)
              ah(a.S, b[e]);
            for (e = 0; e < c.length; e++) {
              for (var f = c[e], g = d.get(f), h = 0; h < g.length; h++)
                ah(a.S, g[h]);
              (f = a.za.get(f)) && f.resolve(void 0);
            }
            c.length = 0;
          }
        }
        v.get = function(a) {
          if (a = dh(this, a))
            return a.constructorFunction;
        };
        v.whenDefined = function(a) {
          if (!Og(a))
            return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
          var b = this.za.get(a);
          if (b)
            return b.Ka;
          b = new gh();
          this.za.set(a, b);
          var c = this.na.has(a) || this.ma.has(a);
          a = -1 === this.oa.indexOf(a);
          c && a && b.resolve(void 0);
          return b.Ka;
        };
        v.polyfillWrapFlushCallback = function(a) {
          this.Ga && ih(this.Ga);
          var b = this.la;
          this.la = function(c) {
            return a(function() {
              return b(c);
            });
          };
        };
        function dh(a, b) {
          var c = a.na.get(b);
          if (c)
            return c;
          if (c = a.ma.get(b)) {
            a.ma.delete(b);
            try {
              return lh(a, b, c());
            } catch (d) {
              eh(d);
            }
          }
        }
        U.prototype.define = U.prototype.define;
        U.prototype.upgrade = U.prototype.upgrade;
        U.prototype.get = U.prototype.get;
        U.prototype.whenDefined = U.prototype.whenDefined;
        U.prototype.polyfillDefineLazy = U.prototype.jb;
        U.prototype.polyfillWrapFlushCallback = U.prototype.polyfillWrapFlushCallback;
        function mh(a, b, c) {
          function d(e) {
            return function(f) {
              for (var g = [], h = 0; h < arguments.length; ++h)
                g[h] = arguments[h];
              h = [];
              for (var k = [], l = 0; l < g.length; l++) {
                var m = g[l];
                m instanceof Element && T(m) && k.push(m);
                if (m instanceof DocumentFragment)
                  for (m = m.firstChild; m; m = m.nextSibling)
                    h.push(m);
                else
                  h.push(m);
              }
              e.apply(this, g);
              for (g = 0; g < k.length; g++)
                bh(a, k[g]);
              if (T(this))
                for (g = 0; g < h.length; g++)
                  k = h[g], k instanceof Element && $g(a, k);
            };
          }
          void 0 !== c.prepend && (b.prepend = d(c.prepend));
          void 0 !== c.append && (b.append = d(c.append));
        }
        ;
        function nh(a) {
          Document.prototype.createElement = function(b) {
            return fh(a, this, b, null);
          };
          Document.prototype.importNode = function(b, c) {
            b = hg.call(this, b, !!c);
            this.__CE_registry ? ch(a, b) : Yg(a, b);
            return b;
          };
          Document.prototype.createElementNS = function(b, c) {
            return fh(a, this, c, b);
          };
          mh(a, Document.prototype, { prepend: ig, append: jg });
        }
        ;
        function oh(a) {
          function b(d) {
            return function(e) {
              for (var f = [], g = 0; g < arguments.length; ++g)
                f[g] = arguments[g];
              g = [];
              for (var h = [], k = 0; k < f.length; k++) {
                var l = f[k];
                l instanceof Element && T(l) && h.push(l);
                if (l instanceof DocumentFragment)
                  for (l = l.firstChild; l; l = l.nextSibling)
                    g.push(l);
                else
                  g.push(l);
              }
              d.apply(this, f);
              for (f = 0; f < h.length; f++)
                bh(a, h[f]);
              if (T(this))
                for (f = 0; f < g.length; f++)
                  h = g[f], h instanceof Element && $g(a, h);
            };
          }
          var c = Element.prototype;
          void 0 !== Fg && (c.before = b(Fg));
          void 0 !== Gg && (c.after = b(Gg));
          void 0 !== Hg && (c.replaceWith = function(d) {
            for (var e = [], f = 0; f < arguments.length; ++f)
              e[f] = arguments[f];
            f = [];
            for (var g = [], h = 0; h < e.length; h++) {
              var k = e[h];
              k instanceof Element && T(k) && g.push(k);
              if (k instanceof DocumentFragment)
                for (k = k.firstChild; k; k = k.nextSibling)
                  f.push(k);
              else
                f.push(k);
            }
            h = T(this);
            Hg.apply(this, e);
            for (e = 0; e < g.length; e++)
              bh(a, g[e]);
            if (h)
              for (bh(a, this), e = 0; e < f.length; e++)
                g = f[e], g instanceof Element && $g(a, g);
          });
          void 0 !== Ig && (c.remove = function() {
            var d = T(this);
            Ig.call(this);
            d && bh(a, this);
          });
        }
        ;
        function ph(a) {
          function b(e, f) {
            Object.defineProperty(e, "innerHTML", { enumerable: f.enumerable, configurable: true, get: f.get, set: function(g) {
              var h = this, k = void 0;
              T(this) && (k = [], Vg(a, this, function(q) {
                q !== h && k.push(q);
              }));
              f.set.call(this, g);
              if (k)
                for (var l = 0; l < k.length; l++) {
                  var m = k[l];
                  1 === m.__CE_state && a.disconnectedCallback(m);
                }
              this.ownerDocument.__CE_registry ? ch(a, this) : Yg(a, this);
              return g;
            } });
          }
          function c(e, f) {
            e.insertAdjacentElement = function(g, h) {
              var k = T(h);
              g = f.call(this, g, h);
              k && bh(a, h);
              T(g) && $g(a, h);
              return g;
            };
          }
          function d(e, f) {
            function g(h, k) {
              for (var l = []; h !== k; h = h.nextSibling)
                l.push(h);
              for (k = 0; k < l.length; k++)
                ch(a, l[k]);
            }
            e.insertAdjacentHTML = function(h, k) {
              h = h.toLowerCase();
              if ("beforebegin" === h) {
                var l = this.previousSibling;
                f.call(this, h, k);
                g(l || this.parentNode.firstChild, this);
              } else if ("afterbegin" === h)
                l = this.firstChild, f.call(this, h, k), g(this.firstChild, l);
              else if ("beforeend" === h)
                l = this.lastChild, f.call(this, h, k), g(l || this.firstChild, null);
              else if ("afterend" === h)
                l = this.nextSibling, f.call(this, h, k), g(
                  this.nextSibling,
                  l
                );
              else
                throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            };
          }
          sg && (Element.prototype.attachShadow = function(e) {
            e = sg.call(this, e);
            if (a.W && !e.__CE_patched) {
              e.__CE_patched = true;
              for (var f = 0; f < a.ca.length; f++)
                a.ca[f](e);
            }
            return this.__CE_shadowRoot = e;
          });
          tg && tg.get ? b(Element.prototype, tg) : Kg && Kg.get ? b(HTMLElement.prototype, Kg) : Xg(a, function(e) {
            b(e, { enumerable: true, configurable: true, get: function() {
              return mg.call(this, true).innerHTML;
            }, set: function(f) {
              var g = "template" === this.localName, h = g ? this.content : this, k = gg.call(document, this.namespaceURI, this.localName);
              for (k.innerHTML = f; 0 < h.childNodes.length; )
                pg.call(h, h.childNodes[0]);
              for (f = g ? k.content : k; 0 < f.childNodes.length; )
                ng.call(h, f.childNodes[0]);
            } });
          });
          Element.prototype.setAttribute = function(e, f) {
            if (1 !== this.__CE_state)
              return vg.call(this, e, f);
            var g = ug.call(this, e);
            vg.call(this, e, f);
            f = ug.call(this, e);
            a.attributeChangedCallback(this, e, g, f, null);
          };
          Element.prototype.setAttributeNS = function(e, f, g) {
            if (1 !== this.__CE_state)
              return zg.call(
                this,
                e,
                f,
                g
              );
            var h = yg.call(this, e, f);
            zg.call(this, e, f, g);
            g = yg.call(this, e, f);
            a.attributeChangedCallback(this, f, h, g, e);
          };
          Element.prototype.removeAttribute = function(e) {
            if (1 !== this.__CE_state)
              return wg.call(this, e);
            var f = ug.call(this, e);
            wg.call(this, e);
            null !== f && a.attributeChangedCallback(this, e, f, null, null);
          };
          xg && (Element.prototype.toggleAttribute = function(e, f) {
            if (1 !== this.__CE_state)
              return xg.call(this, e, f);
            var g = ug.call(this, e), h = null !== g;
            f = xg.call(this, e, f);
            h !== f && a.attributeChangedCallback(this, e, g, f ? "" : null, null);
            return f;
          });
          Element.prototype.removeAttributeNS = function(e, f) {
            if (1 !== this.__CE_state)
              return Ag.call(this, e, f);
            var g = yg.call(this, e, f);
            Ag.call(this, e, f);
            var h = yg.call(this, e, f);
            g !== h && a.attributeChangedCallback(this, f, g, h, e);
          };
          Lg ? c(HTMLElement.prototype, Lg) : Bg && c(Element.prototype, Bg);
          Mg ? d(HTMLElement.prototype, Mg) : Cg && d(Element.prototype, Cg);
          mh(a, Element.prototype, { prepend: Dg, append: Eg });
          oh(a);
        }
        ;
        var qh = {};
        function rh(a) {
          function b() {
            var c = this.constructor;
            var d = document.__CE_registry.Fa.get(c);
            if (!d)
              throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
            var e = d.constructionStack;
            if (0 === e.length)
              return e = fg.call(document, d.localName), Object.setPrototypeOf(e, c.prototype), e.__CE_state = 1, e.__CE_definition = d, Zg(a, e), e;
            var f = e.length - 1, g = e[f];
            if (g === qh)
              throw Error("Failed to construct '" + d.localName + "': This element was already constructed.");
            e[f] = qh;
            Object.setPrototypeOf(g, c.prototype);
            Zg(a, g);
            return g;
          }
          b.prototype = Jg.prototype;
          Object.defineProperty(HTMLElement.prototype, "constructor", { writable: true, configurable: true, enumerable: false, value: b });
          window.HTMLElement = b;
        }
        ;
        function sh(a) {
          function b(c, d) {
            Object.defineProperty(c, "textContent", { enumerable: d.enumerable, configurable: true, get: d.get, set: function(e) {
              if (this.nodeType === Node.TEXT_NODE)
                d.set.call(this, e);
              else {
                var f = void 0;
                if (this.firstChild) {
                  var g = this.childNodes, h = g.length;
                  if (0 < h && T(this)) {
                    f = Array(h);
                    for (var k = 0; k < h; k++)
                      f[k] = g[k];
                  }
                }
                d.set.call(this, e);
                if (f)
                  for (e = 0; e < f.length; e++)
                    bh(a, f[e]);
              }
            } });
          }
          Node.prototype.insertBefore = function(c, d) {
            if (c instanceof DocumentFragment) {
              var e = Qg(c);
              c = og.call(this, c, d);
              if (T(this))
                for (d = 0; d < e.length; d++)
                  $g(a, e[d]);
              return c;
            }
            e = c instanceof Element && T(c);
            d = og.call(this, c, d);
            e && bh(a, c);
            T(this) && $g(a, c);
            return d;
          };
          Node.prototype.appendChild = function(c) {
            if (c instanceof DocumentFragment) {
              var d = Qg(c);
              c = ng.call(this, c);
              if (T(this))
                for (var e = 0; e < d.length; e++)
                  $g(a, d[e]);
              return c;
            }
            d = c instanceof Element && T(c);
            e = ng.call(this, c);
            d && bh(a, c);
            T(this) && $g(a, c);
            return e;
          };
          Node.prototype.cloneNode = function(c) {
            c = mg.call(this, !!c);
            this.ownerDocument.__CE_registry ? ch(a, c) : Yg(a, c);
            return c;
          };
          Node.prototype.removeChild = function(c) {
            var d = c instanceof Element && T(c), e = pg.call(this, c);
            d && bh(a, c);
            return e;
          };
          Node.prototype.replaceChild = function(c, d) {
            if (c instanceof DocumentFragment) {
              var e = Qg(c);
              c = qg.call(this, c, d);
              if (T(this))
                for (bh(a, d), d = 0; d < e.length; d++)
                  $g(a, e[d]);
              return c;
            }
            e = c instanceof Element && T(c);
            var f = qg.call(this, c, d), g = T(this);
            g && bh(a, d);
            e && bh(a, c);
            g && $g(a, c);
            return f;
          };
          rg && rg.get ? b(Node.prototype, rg) : Wg(a, function(c) {
            b(c, { enumerable: true, configurable: true, get: function() {
              for (var d = [], e = this.firstChild; e; e = e.nextSibling)
                e.nodeType !== Node.COMMENT_NODE && d.push(e.textContent);
              return d.join("");
            }, set: function(d) {
              for (; this.firstChild; )
                pg.call(this, this.firstChild);
              null != d && "" !== d && ng.call(this, document.createTextNode(d));
            } });
          });
        }
        ;
        var Ug = window.customElements;
        function th() {
          var a = new Tg();
          rh(a);
          nh(a);
          mh(a, DocumentFragment.prototype, { prepend: kg, append: lg });
          sh(a);
          ph(a);
          window.CustomElementRegistry = U;
          a = new U(a);
          document.__CE_registry = a;
          Object.defineProperty(window, "customElements", { configurable: true, enumerable: true, value: a });
        }
        Ug && !Ug.forcePolyfill && "function" == typeof Ug.define && "function" == typeof Ug.get || th();
        window.__CE_installPolyfill = th;
        function uh() {
          this.end = this.start = 0;
          this.rules = this.parent = this.previous = null;
          this.cssText = this.parsedCssText = "";
          this.atRule = false;
          this.type = 0;
          this.parsedSelector = this.selector = this.keyframesName = "";
        }
        function vh(a) {
          var b = a = a.replace(wh, "").replace(xh, ""), c = new uh();
          c.start = 0;
          c.end = b.length;
          for (var d = c, e = 0, f = b.length; e < f; e++)
            if ("{" === b[e]) {
              d.rules || (d.rules = []);
              var g = d, h = g.rules[g.rules.length - 1] || null;
              d = new uh();
              d.start = e + 1;
              d.parent = g;
              d.previous = h;
              g.rules.push(d);
            } else
              "}" === b[e] && (d.end = e + 1, d = d.parent || c);
          return yh(c, a);
        }
        function yh(a, b) {
          var c = b.substring(a.start, a.end - 1);
          a.parsedCssText = a.cssText = c.trim();
          a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = zh(c), c = c.replace(Ah, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = Bh : c.match(Ch) && (a.type = Dh, a.keyframesName = a.selector.split(Ah).pop()) : a.type = 0 === c.indexOf("--") ? Eh : Fh);
          if (c = a.rules)
            for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++)
              yh(
                f,
                b
              );
          return a;
        }
        function zh(a) {
          return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(b, c) {
            b = c;
            for (c = 6 - b.length; c--; )
              b = "0" + b;
            return "\\" + b;
          });
        }
        function Gh(a, b, c) {
          c = void 0 === c ? "" : c;
          var d = "";
          if (a.cssText || a.rules) {
            var e = a.rules, f;
            if (f = e)
              f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));
            if (f) {
              f = 0;
              for (var g = e.length, h = void 0; f < g && (h = e[f]); f++)
                d = Gh(h, b, d);
            } else
              b ? b = a.cssText : (b = a.cssText, b = b.replace(Hh, "").replace(Ih, ""), b = b.replace(Jh, "").replace(Kh, "")), (d = b.trim()) && (d = "  " + d + "\n");
          }
          d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));
          return c;
        }
        var Fh = 1, Dh = 7, Bh = 4, Eh = 1e3, wh = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, xh = /@import[^;]*;/gim, Hh = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim, Ih = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim, Jh = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, Kh = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim, Ch = /^@[^\s]*keyframes/, Ah = /\s+/g;
        var V = !(window.ShadyDOM && window.ShadyDOM.inUse), Lh;
        function Mh(a) {
          Lh = a && a.shimcssproperties ? false : V || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
        }
        var Nh;
        window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (Nh = window.ShadyCSS.cssBuild);
        var Oh = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
        window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? Lh = window.ShadyCSS.nativeCss : window.ShadyCSS ? (Mh(window.ShadyCSS), window.ShadyCSS = void 0) : Mh(window.WebComponents && window.WebComponents.flags);
        var W = Lh;
        var Ph = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi, Qh = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, Rh = /(--[\w-]+)\s*([:,;)]|$)/gi, Sh = /(animation\s*:)|(animation-name\s*:)/, Th = /@media\s(.*)/, Uh = /\{[^}]*\}/g;
        var Vh = /* @__PURE__ */ new Set();
        function Wh(a, b) {
          if (!a)
            return "";
          "string" === typeof a && (a = vh(a));
          b && Xh(a, b);
          return Gh(a, W);
        }
        function Yh(a) {
          !a.__cssRules && a.textContent && (a.__cssRules = vh(a.textContent));
          return a.__cssRules || null;
        }
        function $h(a) {
          return !!a.parent && a.parent.type === Dh;
        }
        function Xh(a, b, c, d) {
          if (a) {
            var e = false, f = a.type;
            if (d && f === Bh) {
              var g = a.selector.match(Th);
              g && (window.matchMedia(g[1]).matches || (e = true));
            }
            f === Fh ? b(a) : c && f === Dh ? c(a) : f === Eh && (e = true);
            if ((a = a.rules) && !e)
              for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++)
                Xh(g, b, c, d);
          }
        }
        function ai(a, b, c, d) {
          var e = document.createElement("style");
          b && e.setAttribute("scope", b);
          e.textContent = a;
          bi(e, c, d);
          return e;
        }
        var ci = null;
        function di(a) {
          a = document.createComment(" Shady DOM styles for " + a + " ");
          var b = document.head;
          b.insertBefore(a, (ci ? ci.nextSibling : null) || b.firstChild);
          return ci = a;
        }
        function bi(a, b, c) {
          b = b || document.head;
          b.insertBefore(a, c && c.nextSibling || b.firstChild);
          ci ? a.compareDocumentPosition(ci) === Node.DOCUMENT_POSITION_PRECEDING && (ci = a) : ci = a;
        }
        function ei(a, b) {
          for (var c = 0, d = a.length; b < d; b++)
            if ("(" === a[b])
              c++;
            else if (")" === a[b] && 0 === --c)
              return b;
          return -1;
        }
        function fi(a, b) {
          var c = a.indexOf("var(");
          if (-1 === c)
            return b(a, "", "", "");
          var d = ei(a, c + 3), e = a.substring(c + 4, d);
          c = a.substring(0, c);
          a = fi(a.substring(d + 1), b);
          d = e.indexOf(",");
          return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
        }
        function gi(a, b) {
          V ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
        }
        var hi = window.ShadyDOM && window.ShadyDOM.wrap || function(a) {
          return a;
        };
        function ii(a) {
          var b = a.localName, c = "";
          b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);
          return { is: b, ja: c };
        }
        function ji(a) {
          for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++)
            if ("(" === a[d]) {
              var e = ei(a, d);
              c += a.slice(d, e + 1);
              d = e;
            } else
              "," === a[d] ? (b.push(c), c = "") : c += a[d];
          c && b.push(c);
          return b;
        }
        function ki(a) {
          if (void 0 !== Nh)
            return Nh;
          if (void 0 === a.__cssBuild) {
            var b = a.getAttribute("css-build");
            if (b)
              a.__cssBuild = b;
            else {
              a: {
                b = "template" === a.localName ? a.content.firstChild : a.firstChild;
                if (b instanceof Comment && (b = b.textContent.trim().split(":"), "css-build" === b[0])) {
                  b = b[1];
                  break a;
                }
                b = "";
              }
              if ("" !== b) {
                var c = "template" === a.localName ? a.content.firstChild : a.firstChild;
                c.parentNode.removeChild(c);
              }
              a.__cssBuild = b;
            }
          }
          return a.__cssBuild || "";
        }
        function li(a) {
          a = void 0 === a ? "" : a;
          return "" !== a && W ? V ? "shadow" === a : "shady" === a : false;
        }
        ;
        function mi() {
        }
        function ni(a, b) {
          oi(pi, a, function(c) {
            qi(c, b || "");
          });
        }
        function oi(a, b, c) {
          b.nodeType === Node.ELEMENT_NODE && c(b);
          var d;
          "template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;
          if (d)
            for (b = 0; b < d.length; b++)
              oi(a, d[b], c);
        }
        function qi(a, b, c) {
          if (b) {
            if (a.classList)
              c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));
            else if (a.getAttribute) {
              var d = a.getAttribute("class");
              c ? d && (b = d.replace("style-scope", "").replace(b, ""), gi(a, b)) : gi(a, (d ? d + " " : "") + "style-scope " + b);
            }
          }
        }
        function ri(a, b, c) {
          oi(pi, a, function(d) {
            qi(d, b, true);
            qi(d, c);
          });
        }
        function si(a, b) {
          oi(pi, a, function(c) {
            qi(c, b || "", true);
          });
        }
        function ti(a, b, c, d, e) {
          var f = pi;
          e = void 0 === e ? "" : e;
          "" === e && (V || "shady" === (void 0 === d ? "" : d) ? e = Wh(b, c) : (a = ii(a), e = ui(f, b, a.is, a.ja, c) + "\n\n"));
          return e.trim();
        }
        function ui(a, b, c, d, e) {
          var f = vi(c, d);
          c = c ? "." + c : "";
          return Wh(b, function(g) {
            g.i || (g.selector = g.G = wi(a, g, a.h, c, f), g.i = true);
            e && e(g, c, f);
          });
        }
        function vi(a, b) {
          return b ? "[is=" + a + "]" : a;
        }
        function wi(a, b, c, d, e) {
          var f = ji(b.selector);
          if (!$h(b)) {
            b = 0;
            for (var g = f.length, h = void 0; b < g && (h = f[b]); b++)
              f[b] = c.call(a, h, d, e);
          }
          return f.filter(function(k) {
            return !!k;
          }).join(",");
        }
        function xi(a) {
          return a.replace(yi, function(b, c, d) {
            -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
            return ":" + c + "(" + d + ")";
          });
        }
        function zi(a) {
          for (var b = [], c; c = a.match(Ai); ) {
            var d = c.index, e = ei(a, d);
            if (-1 === e)
              throw Error(c.input + " selector missing ')'");
            c = a.slice(d, e + 1);
            a = a.replace(c, "\uE000");
            b.push(c);
          }
          return { Ea: a, matches: b };
        }
        function Bi(a, b) {
          var c = a.split("\uE000");
          return b.reduce(function(d, e, f) {
            return d + e + c[f + 1];
          }, c[0]);
        }
        mi.prototype.h = function(a, b, c) {
          var d = false;
          a = a.trim();
          var e = yi.test(a);
          e && (a = a.replace(yi, function(h, k, l) {
            return ":" + k + "(" + l.replace(/\s/g, "") + ")";
          }), a = xi(a));
          var f = Ai.test(a);
          if (f) {
            var g = zi(a);
            a = g.Ea;
            g = g.matches;
          }
          a = a.replace(Ci, ":host $1");
          a = a.replace(Di, function(h, k, l) {
            d || (h = Ei(l, k, b, c), d = d || h.stop, k = h.Ya, l = h.value);
            return k + l;
          });
          f && (a = Bi(a, g));
          e && (a = xi(a));
          return a = a.replace(Fi, function(h, k, l, m) {
            return '[dir="' + l + '"] ' + k + m + ", " + k + '[dir="' + l + '"]' + m;
          });
        };
        function Ei(a, b, c, d) {
          var e = a.indexOf("::slotted");
          0 <= a.indexOf(":host") ? a = Gi(a, d) : 0 !== e && (a = c ? Hi(a, c) : a);
          c = false;
          0 <= e && (b = "", c = true);
          if (c) {
            var f = true;
            c && (a = a.replace(Ii, function(g, h) {
              return " > " + h;
            }));
          }
          return { value: a, Ya: b, stop: f };
        }
        function Hi(a, b) {
          a = a.split(/(\[.+?\])/);
          for (var c = [], d = 0; d < a.length; d++)
            if (1 === d % 2)
              c.push(a[d]);
            else {
              var e = a[d];
              if ("" !== e || d !== a.length - 1)
                e = e.split(":"), e[0] += b, c.push(e.join(":"));
            }
          return c.join("");
        }
        function Gi(a, b) {
          var c = a.match(Ji);
          return (c = c && c[2].trim() || "") ? c[0].match(Ki) ? a.replace(Ji, function(d, e, f) {
            return b + f;
          }) : c.split(Ki)[0] === b ? c : "should_not_match" : a.replace(":host", b);
        }
        function Li(a) {
          ":root" === a.selector && (a.selector = "html");
        }
        mi.prototype.i = function(a) {
          return a.match(":host") ? "" : a.match("::slotted") ? this.h(a, ":not(.style-scope)") : Hi(a.trim(), ":not(.style-scope)");
        };
        ea.Object.defineProperties(mi.prototype, { g: { configurable: true, enumerable: true, get: function() {
          return "style-scope";
        } } });
        var yi = /:(nth[-\w]+)\(([^)]+)\)/, Di = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g, Ki = /[[.:#*]/, Ci = /^(::slotted)/, Ji = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, Ii = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, Fi = /(.*):dir\((?:(ltr|rtl))\)(.*)/, Ai = /:(?:matches|any|-(?:webkit|moz)-any)/, pi = new mi();
        function Mi(a, b, c, d, e) {
          this.M = a || null;
          this.h = b || null;
          this.Ca = c || [];
          this.K = null;
          this.cssBuild = e || "";
          this.ja = d || "";
          this.g = this.L = this.R = null;
        }
        function Ni(a) {
          return a ? a.__styleInfo : null;
        }
        function Oi(a, b) {
          return a.__styleInfo = b;
        }
        Mi.prototype.i = function() {
          return this.M;
        };
        Mi.prototype._getStyleRules = Mi.prototype.i;
        function Pi(a) {
          var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
          return b && b.call(this, a);
        }
        var Qi = /:host\s*>\s*/, Ri = navigator.userAgent.match("Trident");
        function Si() {
        }
        function Ti(a) {
          var b = {}, c = [], d = 0;
          Xh(a, function(f) {
            Ui(f);
            f.index = d++;
            f = f.F.cssText;
            for (var g; g = Rh.exec(f); ) {
              var h = g[1];
              ":" !== g[2] && (b[h] = true);
            }
          }, function(f) {
            c.push(f);
          });
          a.h = c;
          a = [];
          for (var e in b)
            a.push(e);
          return a;
        }
        function Ui(a) {
          if (!a.F) {
            var b = {}, c = {};
            Vi(a, c) && (b.P = c, a.rules = null);
            b.cssText = a.parsedCssText.replace(Uh, "").replace(Ph, "");
            a.F = b;
          }
        }
        function Vi(a, b) {
          var c = a.F;
          if (c) {
            if (c.P)
              return Object.assign(b, c.P), true;
          } else {
            c = a.parsedCssText;
            for (var d; a = Ph.exec(c); ) {
              d = (a[2] || a[3]).trim();
              if ("inherit" !== d || "unset" !== d)
                b[a[1].trim()] = d;
              d = true;
            }
            return d;
          }
        }
        function Wi(a, b, c) {
          b && (b = 0 <= b.indexOf(";") ? Xi(a, b, c) : fi(b, function(d, e, f, g) {
            if (!e)
              return d + g;
            (e = Wi(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = Wi(a, c[f] || f, c) || f;
            return d + (e || "") + g;
          }));
          return b && b.trim() || "";
        }
        function Xi(a, b, c) {
          b = b.split(";");
          for (var d = 0, e, f; d < b.length; d++)
            if (e = b[d]) {
              Qh.lastIndex = 0;
              if (f = Qh.exec(e))
                e = Wi(a, c[f[1]], c);
              else if (f = e.indexOf(":"), -1 !== f) {
                var g = e.substring(f);
                g = g.trim();
                g = Wi(a, g, c) || g;
                e = e.substring(0, f) + g;
              }
              b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
            }
          return b.join(";");
        }
        function Yi(a, b) {
          var c = {}, d = [];
          Xh(a, function(e) {
            e.F || Ui(e);
            var f = e.G || e.parsedSelector;
            b && e.F.P && f && Pi.call(b, f) && (Vi(e, c), e = e.index, f = parseInt(e / 32, 10), d[f] = (d[f] || 0) | 1 << e % 32);
          }, null, true);
          return { P: c, key: d };
        }
        function Zi(a, b, c, d) {
          b.F || Ui(b);
          if (b.F.P) {
            var e = ii(a);
            a = e.is;
            e = e.ja;
            e = a ? vi(a, e) : "html";
            var f = b.parsedSelector;
            var g = !!f.match(Qi) || "html" === e && -1 < f.indexOf("html");
            var h = 0 === f.indexOf(":host") && !g;
            "shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));
            if (g || h)
              c = e, h && (b.G || (b.G = wi(pi, b, pi.h, a ? "." + a : "", e)), c = b.G || e), g && "html" === e && (c = b.G || b.O), d({ Ea: c, gb: h, vb: g });
          }
        }
        function $i(a, b, c) {
          var d = {}, e = {};
          Xh(b, function(f) {
            Zi(a, f, c, function(g) {
              Pi.call(a._element || a, g.Ea) && (g.gb ? Vi(f, d) : Vi(f, e));
            });
          }, null, true);
          return { mb: e, eb: d };
        }
        function aj(a, b, c, d) {
          var e = ii(b), f = vi(e.is, e.ja), g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"), h = Ni(b);
          e = h.M;
          h = h.cssBuild;
          var k = bj(e, d);
          return ti(b, e, function(l) {
            var m = "";
            l.F || Ui(l);
            l.F.cssText && (m = Xi(a, l.F.cssText, c));
            l.cssText = m;
            if (!V && !$h(l) && l.cssText) {
              var q = m = l.cssText;
              null == l.Ma && (l.Ma = Sh.test(m));
              if (l.Ma)
                if (null == l.ra) {
                  l.ra = [];
                  for (var H in k)
                    q = k[H], q = q(m), m !== q && (m = q, l.ra.push(H));
                } else {
                  for (H = 0; H < l.ra.length; ++H)
                    q = k[l.ra[H]], m = q(m);
                  q = m;
                }
              l.cssText = q;
              l.G = l.G || l.selector;
              m = "." + d;
              H = ji(l.G);
              q = 0;
              for (var C = H.length, t = void 0; q < C && (t = H[q]); q++)
                H[q] = t.match(g) ? t.replace(f, m) : m + " " + t;
              l.selector = H.join(",");
            }
          }, h);
        }
        function bj(a, b) {
          a = a.h;
          var c = {};
          if (!V && a)
            for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
              var f = e, g = b;
              f.u = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");
              f.g = f.keyframesName + "-" + g;
              f.G = f.G || f.selector;
              f.selector = f.G.replace(f.keyframesName, f.g);
              c[e.keyframesName] = cj(e);
            }
          return c;
        }
        function cj(a) {
          return function(b) {
            return b.replace(a.u, a.g);
          };
        }
        function dj(a, b) {
          var c = ej, d = Yh(a);
          a.textContent = Wh(d, function(e) {
            var f = e.cssText = e.parsedCssText;
            e.F && e.F.cssText && (f = f.replace(Hh, "").replace(Ih, ""), e.cssText = Xi(c, f, b));
          });
        }
        ea.Object.defineProperties(Si.prototype, { g: { configurable: true, enumerable: true, get: function() {
          return "x-scope";
        } } });
        var ej = new Si();
        var fj = {}, gj = window.customElements;
        if (gj && !V && !Oh) {
          var hj = gj.define;
          gj.define = function(a, b, c) {
            fj[a] || (fj[a] = di(a));
            hj.call(gj, a, b, c);
          };
        }
        ;
        function ij() {
          this.cache = {};
        }
        ij.prototype.store = function(a, b, c, d) {
          var e = this.cache[a] || [];
          e.push({ P: b, styleElement: c, L: d });
          100 < e.length && e.shift();
          this.cache[a] = e;
        };
        function jj() {
        }
        var kj = new RegExp(pi.g + "\\s*([^\\s]*)");
        function lj(a) {
          return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(kj)) ? a[1] : "";
        }
        function mj(a) {
          var b = hi(a).getRootNode();
          return b === a || b === a.ownerDocument ? "" : (a = b.host) ? ii(a).is : "";
        }
        function nj(a) {
          for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.target !== document.documentElement && c.target !== document.head)
              for (var d = 0; d < c.addedNodes.length; d++) {
                var e = c.addedNodes[d];
                if (e.nodeType === Node.ELEMENT_NODE) {
                  var f = e.getRootNode(), g = lj(e);
                  if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === ki(e)))
                    si(e, g);
                  else if (f instanceof ShadowRoot)
                    for (f = mj(e), f !== g && ri(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + pi.g + ")"), g = 0; g < e.length; g++) {
                      f = e[g];
                      var h = mj(f);
                      h && qi(f, h);
                    }
                }
              }
          }
        }
        if (!(V || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
          var oj = new MutationObserver(nj), pj = function(a) {
            oj.observe(a, { childList: true, subtree: true });
          };
          if (window.customElements && !window.customElements.polyfillWrapFlushCallback)
            pj(document);
          else {
            var qj = function() {
              pj(document.body);
            };
            window.HTMLImports ? window.HTMLImports.whenReady(qj) : requestAnimationFrame(function() {
              if ("loading" === document.readyState) {
                var a = function() {
                  qj();
                  document.removeEventListener("readystatechange", a);
                };
                document.addEventListener(
                  "readystatechange",
                  a
                );
              } else
                qj();
            });
          }
          jj = function() {
            nj(oj.takeRecords());
          };
        }
        ;
        var rj = {};
        var sj = Promise.resolve();
        function tj(a) {
          if (a = rj[a])
            a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
        }
        function uj(a) {
          return a._applyShimCurrentVersion === a._applyShimNextVersion;
        }
        function vj(a) {
          a._applyShimValidatingVersion = a._applyShimNextVersion;
          a._validating || (a._validating = true, sj.then(function() {
            a._applyShimCurrentVersion = a._applyShimNextVersion;
            a._validating = false;
          }));
        }
        ;
        var wj = {}, xj = new ij();
        function Y() {
          this.ea = {};
          this.i = document.documentElement;
          var a = new uh();
          a.rules = [];
          this.u = Oi(this.i, new Mi(a));
          this.O = false;
          this.g = this.h = null;
        }
        v = Y.prototype;
        v.flush = function() {
          jj();
        };
        v.bb = function(a) {
          return Yh(a);
        };
        v.qb = function(a) {
          return Wh(a);
        };
        v.prepareTemplate = function(a, b, c) {
          this.prepareTemplateDom(a, b);
          this.prepareTemplateStyles(a, b, c);
        };
        v.prepareTemplateStyles = function(a, b, c) {
          if (!a._prepared && !Oh) {
            V || fj[b] || (fj[b] = di(b));
            a._prepared = true;
            a.name = b;
            a.extends = c;
            rj[b] = a;
            var d = ki(a), e = li(d);
            c = { is: b, extends: c };
            for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
              var k = g[h];
              if (k.hasAttribute("shady-unscoped")) {
                if (!V) {
                  var l = k.textContent;
                  if (!Vh.has(l)) {
                    Vh.add(l);
                    var m = document.createElement("style");
                    m.setAttribute("shady-unscoped", "");
                    m.textContent = l;
                    document.head.appendChild(m);
                  }
                  k.parentNode.removeChild(k);
                }
              } else
                f.push(k.textContent), k.parentNode.removeChild(k);
            }
            f = f.join("").trim() + (wj[b] || "");
            yj(this);
            if (!e) {
              if (g = !d)
                g = Qh.test(f) || Ph.test(f), Qh.lastIndex = 0, Ph.lastIndex = 0;
              h = vh(f);
              g && W && this.h && this.h.transformRules(h, b);
              a._styleAst = h;
            }
            g = [];
            W || (g = Ti(a._styleAst));
            if (!g.length || W)
              h = V ? a.content : null, b = fj[b] || null, d = ti(c, a._styleAst, null, d, e ? f : ""), d = d.length ? ai(d, c.is, h, b) : null, a._style = d;
            a.g = g;
          }
        };
        v.kb = function(a, b) {
          wj[b] = a.join(" ");
        };
        v.prepareTemplateDom = function(a, b) {
          if (!Oh) {
            var c = ki(a);
            V || "shady" === c || a._domPrepared || (a._domPrepared = true, ni(a.content, b));
          }
        };
        function zj(a) {
          var b = ii(a), c = b.is;
          b = b.ja;
          var d = fj[c] || null, e = rj[c];
          if (e) {
            c = e._styleAst;
            var f = e.g;
            e = ki(e);
            b = new Mi(c, d, f, b, e);
            Oi(a, b);
            return b;
          }
        }
        function Aj(a) {
          !a.g && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.g = window.ShadyCSS.CustomStyleInterface, a.g.transformCallback = function(b) {
            a.Qa(b);
          }, a.g.validateCallback = function() {
            requestAnimationFrame(function() {
              (a.g.enqueued || a.O) && a.flushCustomStyles();
            });
          });
        }
        function yj(a) {
          if (!a.h && window.ShadyCSS && window.ShadyCSS.ApplyShim) {
            a.h = window.ShadyCSS.ApplyShim;
            a.h.invalidCallback = tj;
            var b = true;
          } else
            b = false;
          Aj(a);
          return b;
        }
        v.flushCustomStyles = function() {
          if (!Oh) {
            var a = yj(this);
            if (this.g) {
              var b = this.g.processStyles();
              if ((a || this.g.enqueued) && !li(this.u.cssBuild)) {
                if (W) {
                  if (!this.u.cssBuild)
                    for (a = 0; a < b.length; a++) {
                      var c = this.g.getStyleForCustomStyle(b[a]);
                      if (c && W && this.h) {
                        var d = Yh(c);
                        yj(this);
                        this.h.transformRules(d);
                        c.textContent = Wh(d);
                      }
                    }
                } else {
                  Bj(this, b);
                  Cj(this, this.i, this.u);
                  for (a = 0; a < b.length; a++)
                    (c = this.g.getStyleForCustomStyle(b[a])) && dj(c, this.u.R);
                  this.O && this.styleDocument();
                }
                this.g.enqueued = false;
              }
            }
          }
        };
        function Bj(a, b) {
          b = b.map(function(c) {
            return a.g.getStyleForCustomStyle(c);
          }).filter(function(c) {
            return !!c;
          });
          b.sort(function(c, d) {
            c = d.compareDocumentPosition(c);
            return c & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : c & Node.DOCUMENT_POSITION_PRECEDING ? -1 : 0;
          });
          a.u.M.rules = b.map(function(c) {
            return Yh(c);
          });
        }
        v.styleElement = function(a, b) {
          if (Oh) {
            if (b) {
              Ni(a) || Oi(a, new Mi(null));
              var c = Ni(a);
              c.K = c.K || {};
              Object.assign(c.K, b);
              Dj(this, a, c);
            }
          } else if (c = Ni(a) || zj(a)) {
            if (a !== this.i && (this.O = true), b && (c.K = c.K || {}, Object.assign(c.K, b)), W)
              Dj(this, a, c);
            else if (this.flush(), Cj(this, a, c), c.Ca && c.Ca.length) {
              b = ii(a).is;
              var d;
              a: {
                if (d = xj.cache[b])
                  for (var e = d.length - 1; 0 <= e; e--) {
                    var f = d[e];
                    b: {
                      var g = c.Ca;
                      for (var h = 0; h < g.length; h++) {
                        var k = g[h];
                        if (f.P[k] !== c.R[k]) {
                          g = false;
                          break b;
                        }
                      }
                      g = true;
                    }
                    if (g) {
                      d = f;
                      break a;
                    }
                  }
                d = void 0;
              }
              g = d ? d.styleElement : null;
              e = c.L;
              (f = d && d.L) || (f = this.ea[b] = (this.ea[b] || 0) + 1, f = b + "-" + f);
              c.L = f;
              f = c.L;
              h = ej;
              h = g ? g.textContent || "" : aj(h, a, c.R, f);
              k = Ni(a);
              var l = k.g;
              l && !V && l !== g && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));
              V ? k.g ? (k.g.textContent = h, g = k.g) : h && (g = ai(h, f, a.shadowRoot, k.h)) : g ? g.parentNode || (Ri && -1 < h.indexOf("@media") && (g.textContent = h), bi(g, null, k.h)) : h && (g = ai(h, f, null, k.h));
              g && (g._useCount = g._useCount || 0, k.g != g && g._useCount++, k.g = g);
              f = g;
              V || (g = c.L, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" + e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && gi(a, k));
              d || xj.store(b, c.R, f, c.L);
            }
          }
        };
        function Dj(a, b, c) {
          var d = ii(b).is;
          if (c.K) {
            var e = c.K, f;
            for (f in e)
              null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f]);
          }
          e = rj[d];
          if (!(!e && b !== a.i || e && "" !== ki(e)) && e && e._style && !uj(e)) {
            if (uj(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion)
              yj(a), a.h && a.h.transformRules(e._styleAst, d), e._style.textContent = ti(b, c.M), vj(e);
            V && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = ti(b, c.M));
            c.M = e._styleAst;
          }
        }
        function Ej(a, b) {
          return (b = hi(b).getRootNode().host) ? Ni(b) || zj(b) ? b : Ej(a, b) : a.i;
        }
        function Cj(a, b, c) {
          var d = Ej(a, b), e = Ni(d), f = e.R;
          d === a.i || f || (Cj(a, d, e), f = e.R);
          a = Object.create(f || null);
          d = $i(b, c.M, c.cssBuild);
          b = Yi(e.M, b).P;
          Object.assign(a, d.eb, b, d.mb);
          b = c.K;
          for (var g in b)
            if ((e = b[g]) || 0 === e)
              a[g] = e;
          g = ej;
          b = Object.getOwnPropertyNames(a);
          for (e = 0; e < b.length; e++)
            d = b[e], a[d] = Wi(g, a[d], a);
          c.R = a;
        }
        v.styleDocument = function(a) {
          this.styleSubtree(this.i, a);
        };
        v.styleSubtree = function(a, b) {
          var c = hi(a), d = c.shadowRoot, e = a === this.i;
          (d || e) && this.styleElement(a, b);
          if (a = e ? c : d)
            for (a = Array.from(a.querySelectorAll("*")).filter(function(f) {
              return hi(f).shadowRoot;
            }), b = 0; b < a.length; b++)
              this.styleSubtree(a[b]);
        };
        v.Qa = function(a) {
          var b = this, c = ki(a);
          c !== this.u.cssBuild && (this.u.cssBuild = c);
          if (!li(c)) {
            var d = Yh(a);
            Xh(d, function(e) {
              if (V)
                Li(e);
              else {
                var f = pi;
                e.selector = e.parsedSelector;
                Li(e);
                e.selector = e.G = wi(f, e, f.i, void 0, void 0);
              }
              W && "" === c && (yj(b), b.h && b.h.transformRule(e));
            });
            W ? a.textContent = Wh(d) : this.u.M.rules.push(d);
          }
        };
        v.getComputedStyleValue = function(a, b) {
          var c;
          W || (c = (Ni(a) || Ni(Ej(this, a))).R[b]);
          return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
        };
        v.pb = function(a, b) {
          var c = hi(a).getRootNode();
          b = b ? ("string" === typeof b ? b : String(b)).split(/\s/) : [];
          c = c.host && c.host.localName;
          if (!c) {
            var d = a.getAttribute("class");
            if (d) {
              d = d.split(/\s/);
              for (var e = 0; e < d.length; e++)
                if (d[e] === pi.g) {
                  c = d[e + 1];
                  break;
                }
            }
          }
          c && b.push(pi.g, c);
          W || (c = Ni(a)) && c.L && b.push(ej.g, c.L);
          gi(a, b.join(" "));
        };
        v.Xa = function(a) {
          return Ni(a);
        };
        v.ob = function(a, b) {
          qi(a, b);
        };
        v.rb = function(a, b) {
          qi(a, b, true);
        };
        v.nb = function(a) {
          return mj(a);
        };
        v.$a = function(a) {
          return lj(a);
        };
        Y.prototype.flush = Y.prototype.flush;
        Y.prototype.prepareTemplate = Y.prototype.prepareTemplate;
        Y.prototype.styleElement = Y.prototype.styleElement;
        Y.prototype.styleDocument = Y.prototype.styleDocument;
        Y.prototype.styleSubtree = Y.prototype.styleSubtree;
        Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue;
        Y.prototype.setElementClass = Y.prototype.pb;
        Y.prototype._styleInfoForNode = Y.prototype.Xa;
        Y.prototype.transformCustomStyleForDocument = Y.prototype.Qa;
        Y.prototype.getStyleAst = Y.prototype.bb;
        Y.prototype.styleAstToString = Y.prototype.qb;
        Y.prototype.flushCustomStyles = Y.prototype.flushCustomStyles;
        Y.prototype.scopeNode = Y.prototype.ob;
        Y.prototype.unscopeNode = Y.prototype.rb;
        Y.prototype.scopeForNode = Y.prototype.nb;
        Y.prototype.currentScopeForNode = Y.prototype.$a;
        Y.prototype.prepareAdoptedCssText = Y.prototype.kb;
        Object.defineProperties(Y.prototype, { nativeShadow: { get: function() {
          return V;
        } }, nativeCss: { get: function() {
          return W;
        } } });
        var Z = new Y(), Fj, Gj;
        window.ShadyCSS && (Fj = window.ShadyCSS.ApplyShim, Gj = window.ShadyCSS.CustomStyleInterface);
        window.ShadyCSS = {
          ScopingShim: Z,
          prepareTemplate: function(a, b, c) {
            Z.flushCustomStyles();
            Z.prepareTemplate(a, b, c);
          },
          prepareTemplateDom: function(a, b) {
            Z.prepareTemplateDom(a, b);
          },
          prepareTemplateStyles: function(a, b, c) {
            Z.flushCustomStyles();
            Z.prepareTemplateStyles(a, b, c);
          },
          styleSubtree: function(a, b) {
            Z.flushCustomStyles();
            Z.styleSubtree(a, b);
          },
          styleElement: function(a) {
            Z.flushCustomStyles();
            Z.styleElement(a);
          },
          styleDocument: function(a) {
            Z.flushCustomStyles();
            Z.styleDocument(a);
          },
          flushCustomStyles: function() {
            Z.flushCustomStyles();
          },
          getComputedStyleValue: function(a, b) {
            return Z.getComputedStyleValue(a, b);
          },
          nativeCss: W,
          nativeShadow: V,
          cssBuild: Nh,
          disableRuntime: Oh
        };
        Fj && (window.ShadyCSS.ApplyShim = Fj);
        Gj && (window.ShadyCSS.CustomStyleInterface = Gj);
        (function(a) {
          function b(t) {
            "" == t && (f.call(this), this.m = true);
            return t.toLowerCase();
          }
          function c(t) {
            var F = t.charCodeAt(0);
            return 32 < F && 127 > F && -1 == [34, 35, 60, 62, 63, 96].indexOf(F) ? t : encodeURIComponent(t);
          }
          function d(t) {
            var F = t.charCodeAt(0);
            return 32 < F && 127 > F && -1 == [34, 35, 60, 62, 96].indexOf(F) ? t : encodeURIComponent(t);
          }
          function e(t, F, E) {
            function N(ha) {
              sa.push(ha);
            }
            var y = F || "scheme start", X = 0, x = "", ta = false, ia = false, sa = [];
            a:
              for (; (void 0 != t[X - 1] || 0 == X) && !this.m; ) {
                var n = t[X];
                switch (y) {
                  case "scheme start":
                    if (n && q.test(n))
                      x += n.toLowerCase(), y = "scheme";
                    else if (F) {
                      N("Invalid scheme.");
                      break a;
                    } else {
                      x = "";
                      y = "no scheme";
                      continue;
                    }
                    break;
                  case "scheme":
                    if (n && H.test(n))
                      x += n.toLowerCase();
                    else if (":" == n) {
                      this.l = x;
                      x = "";
                      if (F)
                        break a;
                      void 0 !== l[this.l] && (this.H = true);
                      y = "file" == this.l ? "relative" : this.H && E && E.l == this.l ? "relative or authority" : this.H ? "authority first slash" : "scheme data";
                    } else if (F) {
                      void 0 != n && N("Code point not allowed in scheme: " + n);
                      break a;
                    } else {
                      x = "";
                      X = 0;
                      y = "no scheme";
                      continue;
                    }
                    break;
                  case "scheme data":
                    "?" == n ? (this.A = "?", y = "query") : "#" == n ? (this.C = "#", y = "fragment") : void 0 != n && "	" != n && "\n" != n && "\r" != n && (this.ya += c(n));
                    break;
                  case "no scheme":
                    if (E && void 0 !== l[E.l]) {
                      y = "relative";
                      continue;
                    } else
                      N("Missing scheme."), f.call(this), this.m = true;
                    break;
                  case "relative or authority":
                    if ("/" == n && "/" == t[X + 1])
                      y = "authority ignore slashes";
                    else {
                      N("Expected /, got: " + n);
                      y = "relative";
                      continue;
                    }
                    break;
                  case "relative":
                    this.H = true;
                    "file" != this.l && (this.l = E.l);
                    if (void 0 == n) {
                      this.o = E.o;
                      this.v = E.v;
                      this.s = E.s.slice();
                      this.A = E.A;
                      this.B = E.B;
                      this.j = E.j;
                      break a;
                    } else if ("/" == n || "\\" == n)
                      "\\" == n && N("\\ is an invalid code point."), y = "relative slash";
                    else if ("?" == n)
                      this.o = E.o, this.v = E.v, this.s = E.s.slice(), this.A = "?", this.B = E.B, this.j = E.j, y = "query";
                    else if ("#" == n)
                      this.o = E.o, this.v = E.v, this.s = E.s.slice(), this.A = E.A, this.C = "#", this.B = E.B, this.j = E.j, y = "fragment";
                    else {
                      y = t[X + 1];
                      var J = t[X + 2];
                      if ("file" != this.l || !q.test(n) || ":" != y && "|" != y || void 0 != J && "/" != J && "\\" != J && "?" != J && "#" != J)
                        this.o = E.o, this.v = E.v, this.B = E.B, this.j = E.j, this.s = E.s.slice(), this.s.pop();
                      y = "relative path";
                      continue;
                    }
                    break;
                  case "relative slash":
                    if ("/" == n || "\\" == n)
                      "\\" == n && N("\\ is an invalid code point."), y = "file" == this.l ? "file host" : "authority ignore slashes";
                    else {
                      "file" != this.l && (this.o = E.o, this.v = E.v, this.B = E.B, this.j = E.j);
                      y = "relative path";
                      continue;
                    }
                    break;
                  case "authority first slash":
                    if ("/" == n)
                      y = "authority second slash";
                    else {
                      N("Expected '/', got: " + n);
                      y = "authority ignore slashes";
                      continue;
                    }
                    break;
                  case "authority second slash":
                    y = "authority ignore slashes";
                    if ("/" != n) {
                      N("Expected '/', got: " + n);
                      continue;
                    }
                    break;
                  case "authority ignore slashes":
                    if ("/" != n && "\\" != n) {
                      y = "authority";
                      continue;
                    } else
                      N("Expected authority, got: " + n);
                    break;
                  case "authority":
                    if ("@" == n) {
                      ta && (N("@ already seen."), x += "%40");
                      ta = true;
                      for (n = 0; n < x.length; n++)
                        J = x[n], "	" == J || "\n" == J || "\r" == J ? N("Invalid whitespace in authority.") : ":" == J && null === this.j ? this.j = "" : (J = c(J), null !== this.j ? this.j += J : this.B += J);
                      x = "";
                    } else if (void 0 == n || "/" == n || "\\" == n || "?" == n || "#" == n) {
                      X -= x.length;
                      x = "";
                      y = "host";
                      continue;
                    } else
                      x += n;
                    break;
                  case "file host":
                    if (void 0 == n || "/" == n || "\\" == n || "?" == n || "#" == n) {
                      2 != x.length || !q.test(x[0]) || ":" != x[1] && "|" != x[1] ? (0 != x.length && (this.o = b.call(this, x), x = ""), y = "relative path start") : y = "relative path";
                      continue;
                    } else
                      "	" == n || "\n" == n || "\r" == n ? N("Invalid whitespace in file host.") : x += n;
                    break;
                  case "host":
                  case "hostname":
                    if (":" != n || ia)
                      if (void 0 == n || "/" == n || "\\" == n || "?" == n || "#" == n) {
                        this.o = b.call(this, x);
                        x = "";
                        y = "relative path start";
                        if (F)
                          break a;
                        continue;
                      } else
                        "	" != n && "\n" != n && "\r" != n ? ("[" == n ? ia = true : "]" == n && (ia = false), x += n) : N("Invalid code point in host/hostname: " + n);
                    else if (this.o = b.call(this, x), x = "", y = "port", "hostname" == F)
                      break a;
                    break;
                  case "port":
                    if (/[0-9]/.test(n))
                      x += n;
                    else if (void 0 == n || "/" == n || "\\" == n || "?" == n || "#" == n || F) {
                      "" != x && (x = parseInt(x, 10), x != l[this.l] && (this.v = x + ""), x = "");
                      if (F)
                        break a;
                      y = "relative path start";
                      continue;
                    } else
                      "	" == n || "\n" == n || "\r" == n ? N("Invalid code point in port: " + n) : (f.call(this), this.m = true);
                    break;
                  case "relative path start":
                    "\\" == n && N("'\\' not allowed in path.");
                    y = "relative path";
                    if ("/" != n && "\\" != n)
                      continue;
                    break;
                  case "relative path":
                    if (void 0 != n && "/" != n && "\\" != n && (F || "?" != n && "#" != n))
                      "	" != n && "\n" != n && "\r" != n && (x += c(n));
                    else {
                      "\\" == n && N("\\ not allowed in relative path.");
                      if (J = m[x.toLowerCase()])
                        x = J;
                      ".." == x ? (this.s.pop(), "/" != n && "\\" != n && this.s.push("")) : "." == x && "/" != n && "\\" != n ? this.s.push("") : "." != x && ("file" == this.l && 0 == this.s.length && 2 == x.length && q.test(x[0]) && "|" == x[1] && (x = x[0] + ":"), this.s.push(x));
                      x = "";
                      "?" == n ? (this.A = "?", y = "query") : "#" == n && (this.C = "#", y = "fragment");
                    }
                    break;
                  case "query":
                    F || "#" != n ? void 0 != n && "	" != n && "\n" != n && "\r" != n && (this.A += d(n)) : (this.C = "#", y = "fragment");
                    break;
                  case "fragment":
                    void 0 != n && "	" != n && "\n" != n && "\r" != n && (this.C += n);
                }
                X++;
              }
          }
          function f() {
            this.B = this.ya = this.l = "";
            this.j = null;
            this.v = this.o = "";
            this.s = [];
            this.C = this.A = "";
            this.H = this.m = false;
          }
          function g(t, F) {
            void 0 === F || F instanceof g || (F = new g(String(F)));
            this.g = t;
            f.call(this);
            e.call(this, this.g.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, ""), null, F);
          }
          var h = false;
          try {
            var k = new URL("b", "http://a");
            k.pathname = "c%20d";
            h = "http://a/c%20d" === k.href;
          } catch (t) {
          }
          if (!h) {
            var l = /* @__PURE__ */ Object.create(null);
            l.ftp = 21;
            l.file = 0;
            l.gopher = 70;
            l.http = 80;
            l.https = 443;
            l.ws = 80;
            l.wss = 443;
            var m = /* @__PURE__ */ Object.create(null);
            m["%2e"] = ".";
            m[".%2e"] = "..";
            m["%2e."] = "..";
            m["%2e%2e"] = "..";
            var q = /[a-zA-Z]/, H = /[a-zA-Z0-9+\-.]/;
            g.prototype = { toString: function() {
              return this.href;
            }, get href() {
              if (this.m)
                return this.g;
              var t = "";
              if ("" != this.B || null != this.j)
                t = this.B + (null != this.j ? ":" + this.j : "") + "@";
              return this.protocol + (this.H ? "//" + t + this.host : "") + this.pathname + this.A + this.C;
            }, set href(t) {
              f.call(this);
              e.call(this, t);
            }, get protocol() {
              return this.l + ":";
            }, set protocol(t) {
              this.m || e.call(this, t + ":", "scheme start");
            }, get host() {
              return this.m ? "" : this.v ? this.o + ":" + this.v : this.o;
            }, set host(t) {
              !this.m && this.H && e.call(this, t, "host");
            }, get hostname() {
              return this.o;
            }, set hostname(t) {
              !this.m && this.H && e.call(this, t, "hostname");
            }, get port() {
              return this.v;
            }, set port(t) {
              !this.m && this.H && e.call(this, t, "port");
            }, get pathname() {
              return this.m ? "" : this.H ? "/" + this.s.join("/") : this.ya;
            }, set pathname(t) {
              !this.m && this.H && (this.s = [], e.call(this, t, "relative path start"));
            }, get search() {
              return this.m || !this.A || "?" == this.A ? "" : this.A;
            }, set search(t) {
              !this.m && this.H && (this.A = "?", "?" == t[0] && (t = t.slice(1)), e.call(this, t, "query"));
            }, get hash() {
              return this.m || !this.C || "#" == this.C ? "" : this.C;
            }, set hash(t) {
              this.m || (t ? (this.C = "#", "#" == t[0] && (t = t.slice(1)), e.call(this, t, "fragment")) : this.C = "");
            }, get origin() {
              var t;
              if (this.m || !this.l)
                return "";
              switch (this.l) {
                case "data":
                case "file":
                case "javascript":
                case "mailto":
                  return "null";
              }
              return (t = this.host) ? this.l + "://" + t : "";
            } };
            var C = a.URL;
            C && (g.createObjectURL = function(t) {
              return C.createObjectURL.apply(
                C,
                arguments
              );
            }, g.revokeObjectURL = function(t) {
              C.revokeObjectURL(t);
            });
            a.URL = g;
          }
        })(window);
        var Hj = window.customElements, Ij = false, Jj = null;
        Hj.polyfillWrapFlushCallback && Hj.polyfillWrapFlushCallback(function(a) {
          Jj = a;
          Ij && a();
        });
        function Kj() {
          window.HTMLTemplateElement.bootstrap && window.HTMLTemplateElement.bootstrap(window.document);
          Jj && Jj();
          Ij = true;
          window.WebComponents.ready = true;
          document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: true }));
        }
        "complete" !== document.readyState ? (window.addEventListener("load", Kj), window.addEventListener("DOMContentLoaded", function() {
          window.removeEventListener("load", Kj);
          Kj();
        })) : Kj();
      }).call(exports);
    }
  });

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports, module) {
      (function(global2, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global2.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module2) {
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
    }
  });

  // src/options/index.ts
  var import_webcomponentsjs = __toESM(require_webcomponents_bundle());

  // node_modules/@mantou/gem/lib/element.js
  var element_exports = {};
  __export(element_exports, {
    GemElement: () => GemElement,
    SVGTemplateResult: () => SVGTemplateResult,
    TemplateResult: () => TemplateResult,
    defineAttribute: () => defineAttribute,
    defineCSSState: () => defineCSSState,
    defineProperty: () => defineProperty,
    defineRef: () => defineRef,
    directive: () => directive,
    guard: () => guard,
    html: () => html,
    ifDefined: () => ifDefined,
    nativeDefineElement: () => nativeDefineElement,
    render: () => render,
    repeat: () => repeat,
    svg: () => svg
  });

  // node_modules/lit-html/lib/directive.js
  var directives = /* @__PURE__ */ new WeakMap();
  var directive = (f) => (...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
  };
  var isDirective = (o) => {
    return typeof o === "function" && directives.has(o);
  };

  // node_modules/lit-html/lib/dom.js
  var isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
  var reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
      const n = start.nextSibling;
      container.insertBefore(start, before);
      start = n;
    }
  };
  var removeNodes = (container, start, end = null) => {
    while (start !== end) {
      const n = start.nextSibling;
      container.removeChild(start);
      start = n;
    }
  };

  // node_modules/lit-html/lib/part.js
  var noChange = {};
  var nothing = {};

  // node_modules/lit-html/lib/template.js
  var marker = `{{lit-${String(Math.random()).slice(2)}}}`;
  var nodeMarker = `<!--${marker}-->`;
  var markerRegex = new RegExp(`${marker}|${nodeMarker}`);
  var boundAttributeSuffix = "$lit$";
  var Template = class {
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
  };
  var endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
  };
  var isTemplatePartActive = (part) => part.index !== -1;
  var createMarker = () => document.createComment("");
  var lastAttributeNameRegex = (
    // eslint-disable-next-line no-control-regex
    /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
  );

  // node_modules/lit-html/lib/template-instance.js
  var TemplateInstance = class {
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
  };

  // node_modules/lit-html/lib/template-result.js
  var policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (s) => s });
  var commentMarker = ` ${marker} `;
  var TemplateResult = class {
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
  };
  var SVGTemplateResult = class extends TemplateResult {
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
  };

  // node_modules/lit-html/lib/parts.js
  var isPrimitive = (value) => {
    return value === null || !(typeof value === "object" || typeof value === "function");
  };
  var isIterable = (value) => {
    return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(value && value[Symbol.iterator]);
  };
  var AttributeCommitter = class {
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
  };
  var AttributePart = class {
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
  };
  var NodePart = class _NodePart {
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
          itemPart = new _NodePart(this.options);
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
  };
  var BooleanAttributePart = class {
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
  };
  var PropertyCommitter = class extends AttributeCommitter {
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
  };
  var PropertyPart = class extends AttributePart {
  };
  var eventOptionsSupported = false;
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
  var EventPart = class {
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
  };
  var getOptions = (o) => o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture);

  // node_modules/lit-html/lib/default-template-processor.js
  var DefaultTemplateProcessor = class {
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
  };
  var defaultTemplateProcessor = new DefaultTemplateProcessor();

  // node_modules/lit-html/lib/template-factory.js
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
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === void 0) {
      template = new Template(result, result.getTemplateElement());
      templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
  }
  var templateCaches = /* @__PURE__ */ new Map();

  // node_modules/lit-html/lib/render.js
  var parts = /* @__PURE__ */ new WeakMap();
  var render = (result, container, options) => {
    let part = parts.get(container);
    if (part === void 0) {
      removeNodes(container, container.firstChild);
      parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
      part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
  };

  // node_modules/lit-html/lit-html.js
  if (typeof window !== "undefined") {
    (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
  }
  var html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);
  var svg = (strings, ...values) => new SVGTemplateResult(strings, values, "svg", defaultTemplateProcessor);

  // node_modules/@mantou/gem/lib/utils.js
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
  var _LinkedList_instances;
  var _LinkedList_map;
  var _LinkedList_firstItem;
  var _LinkedList_lastItem;
  var _LinkedList_delete;
  var _QueryString_stringify;
  var _QueryString_parse;
  var microtaskSet = /* @__PURE__ */ new Set();
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
  function addListener(target, type, listener, options) {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
  }
  var LinkedList = class extends EventTarget {
    constructor() {
      super(...arguments);
      _LinkedList_instances.add(this);
      _LinkedList_map.set(this, /* @__PURE__ */ new Map());
      _LinkedList_firstItem.set(this, void 0);
      _LinkedList_lastItem.set(this, void 0);
    }
    get size() {
      return __classPrivateFieldGet(this, _LinkedList_map, "f").size;
    }
    get first() {
      return __classPrivateFieldGet(this, _LinkedList_firstItem, "f");
    }
    get last() {
      return __classPrivateFieldGet(this, _LinkedList_lastItem, "f");
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
      return __classPrivateFieldGet(this, _LinkedList_map, "f").get(value);
    }
    // 添加到尾部，已存在时会删除老的项目
    // 如果是添加第一个，start 事件会在添加前触发，避免处理事件重复的逻辑
    add(value) {
      if (!__classPrivateFieldGet(this, _LinkedList_lastItem, "f")) {
        this.dispatchEvent(new CustomEvent("start"));
      }
      const item = __classPrivateFieldGet(this, _LinkedList_instances, "m", _LinkedList_delete).call(this, value) || { value };
      item.prev = __classPrivateFieldGet(this, _LinkedList_lastItem, "f");
      if (item.prev) {
        item.prev.next = item;
      }
      item.next = void 0;
      __classPrivateFieldSet(this, _LinkedList_lastItem, item, "f");
      if (!__classPrivateFieldGet(this, _LinkedList_firstItem, "f")) {
        __classPrivateFieldSet(this, _LinkedList_firstItem, item, "f");
      }
      __classPrivateFieldGet(this, _LinkedList_map, "f").set(value, item);
    }
    // 删除这个元素后没有其他元素时立即出发 end 事件
    delete(value) {
      const deleteItem = __classPrivateFieldGet(this, _LinkedList_instances, "m", _LinkedList_delete).call(this, value);
      if (!__classPrivateFieldGet(this, _LinkedList_firstItem, "f")) {
        this.dispatchEvent(new CustomEvent("end"));
      }
      return deleteItem;
    }
    // 获取头部元素
    // 会从链表删除
    get() {
      const firstItem = __classPrivateFieldGet(this, _LinkedList_firstItem, "f");
      if (!firstItem)
        return;
      this.delete(firstItem.value);
      return firstItem.value;
    }
  };
  _LinkedList_map = /* @__PURE__ */ new WeakMap(), _LinkedList_firstItem = /* @__PURE__ */ new WeakMap(), _LinkedList_lastItem = /* @__PURE__ */ new WeakMap(), _LinkedList_instances = /* @__PURE__ */ new WeakSet(), _LinkedList_delete = function _LinkedList_delete2(value) {
    const existItem = __classPrivateFieldGet(this, _LinkedList_map, "f").get(value);
    if (existItem) {
      if (existItem.prev) {
        existItem.prev.next = existItem.next;
      } else {
        __classPrivateFieldSet(this, _LinkedList_firstItem, existItem.next, "f");
      }
      if (existItem.next) {
        existItem.next.prev = existItem.prev;
      } else {
        __classPrivateFieldSet(this, _LinkedList_lastItem, existItem.prev, "f");
      }
      __classPrivateFieldGet(this, _LinkedList_map, "f").delete(value);
    }
    return existItem;
  };
  var PropProxyMap = class extends WeakMap {
    get(ele) {
      let proxy = super.get(ele);
      if (!proxy) {
        proxy = {};
        this.set(ele, proxy);
      }
      return proxy;
    }
  };
  _QueryString_stringify = /* @__PURE__ */ new WeakMap(), _QueryString_parse = /* @__PURE__ */ new WeakMap();
  var SheetToken = Symbol.for("gem@sheetToken");
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
  var GemError = class extends Error {
    constructor(msg) {
      super(msg);
      this.message = `gem: ${this.message}`;
    }
  };
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

  // node_modules/@mantou/gem/lib/store.js
  var StoreListenerMap = /* @__PURE__ */ new WeakMap();
  function createStore(originStore) {
    if (StoreListenerMap.has(originStore)) {
      throw new GemError("argument error");
    }
    StoreListenerMap.set(originStore, /* @__PURE__ */ new Set());
    return originStore;
  }
  function connect(store, func) {
    const listeners = StoreListenerMap.get(store);
    listeners === null || listeners === void 0 ? void 0 : listeners.add(func);
    return () => {
      listeners === null || listeners === void 0 ? void 0 : listeners.delete(func);
    };
  }

  // node_modules/@mantou/gem/lib/version.js
  var version_exports = {};
  __export(version_exports, {
    version: () => version
  });
  var version = "1.7.12";

  // node_modules/lit-html/directives/repeat.js
  var createAndInsertPart = (containerPart, beforePart) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = beforePart === void 0 ? containerPart.endNode : beforePart.startNode;
    const startNode = container.insertBefore(createMarker(), beforeNode);
    container.insertBefore(createMarker(), beforeNode);
    const newPart = new NodePart(containerPart.options);
    newPart.insertAfterNode(startNode);
    return newPart;
  };
  var updatePart = (part, value) => {
    part.setValue(value);
    part.commit();
    return part;
  };
  var insertPartBefore = (containerPart, part, ref) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = ref ? ref.startNode : containerPart.endNode;
    const endNode = part.endNode.nextSibling;
    if (endNode !== beforeNode) {
      reparentNodes(container, part.startNode, endNode, beforeNode);
    }
  };
  var removePart = (part) => {
    removeNodes(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
  };
  var generateMap = (list, start, end) => {
    const map = /* @__PURE__ */ new Map();
    for (let i = start; i <= end; i++) {
      map.set(list[i], i);
    }
    return map;
  };
  var partListCache = /* @__PURE__ */ new WeakMap();
  var keyListCache = /* @__PURE__ */ new WeakMap();
  var repeat = directive((items, keyFnOrTemplate, template) => {
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

  // node_modules/lit-html/directives/guard.js
  var previousValues = /* @__PURE__ */ new WeakMap();
  var guard = directive((value, f) => (part) => {
    const previousValue = previousValues.get(part);
    if (Array.isArray(value)) {
      if (Array.isArray(previousValue) && previousValue.length === value.length && value.every((v, i) => v === previousValue[i])) {
        return;
      }
    } else if (previousValue === value && (value !== void 0 || previousValues.has(part))) {
      return;
    }
    part.setValue(f());
    previousValues.set(part, Array.isArray(value) ? Array.from(value) : value);
  });

  // node_modules/lit-html/directives/if-defined.js
  var previousValues2 = /* @__PURE__ */ new WeakMap();
  var ifDefined = directive((value) => (part) => {
    const previousValue = previousValues2.get(part);
    if (value === void 0 && part instanceof AttributePart) {
      if (previousValue !== void 0 || !previousValues2.has(part)) {
        const name = part.committer.name;
        part.committer.element.removeAttribute(name);
      }
    } else if (value !== previousValue) {
      part.setValue(value);
    }
    previousValues2.set(part, value);
  });

  // node_modules/@mantou/gem/lib/element.js
  var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _a;
  var _GemElement_final;
  var _GemElement_renderRoot;
  var _GemElement_internals;
  var _GemElement_isAppendReason;
  var _GemElement_isMounted;
  var _GemElement_isAsync;
  var _GemElement_effectList;
  var _GemElement_memoList;
  var _GemElement_unmountCallback;
  var _GemElement_exec;
  var _GemElement_execEffect;
  var _GemElement_execMemo;
  var _GemElement_initEffect;
  var _GemElement_render;
  var _GemElement_shouldUpdate;
  var _GemElement_updateCallback;
  var _GemElement_update;
  var _GemElement_updated;
  var _GemElement_disconnectStore;
  var _GemElement_connectedCallback;
  var _GemElement_clearEffect;
  function emptyFunction() {
  }
  function execCallback(fun) {
    typeof fun === "function" && fun();
  }
  var asyncRenderTaskList = new LinkedList();
  var tick = (timeStamp = performance.now()) => {
    if (performance.now() > timeStamp + 16)
      return requestAnimationFrame(tick);
    const task = asyncRenderTaskList.get();
    if (task) {
      task();
      tick(timeStamp);
    }
  };
  asyncRenderTaskList.addEventListener("start", () => addMicrotask(tick));
  var constructorSymbol = Symbol("constructor");
  var initSymbol = Symbol("init");
  var updateSymbol = Symbol("update");
  var GemElement = class extends HTMLElement {
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
        addMicrotask(__classPrivateFieldGet2(this, _GemElement_update, "f"));
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
        __classPrivateFieldGet2(this, _GemElement_exec, "f").call(this, __classPrivateFieldGet2(this, _GemElement_effectList, "f"));
      });
      _GemElement_execMemo.set(this, () => {
        __classPrivateFieldGet2(this, _GemElement_exec, "f").call(this, __classPrivateFieldGet2(this, _GemElement_memoList, "f"));
      });
      this.effect = (callback, getDep) => {
        if (!__classPrivateFieldGet2(this, _GemElement_effectList, "f"))
          __classPrivateFieldSet2(this, _GemElement_effectList, [], "f");
        const effectItem = {
          callback,
          getDep,
          initialized: __classPrivateFieldGet2(this, _GemElement_isMounted, "f"),
          inConstructor: this[constructorSymbol]
        };
        if (__classPrivateFieldGet2(this, _GemElement_isMounted, "f")) {
          effectItem.values = getDep === null || getDep === void 0 ? void 0 : getDep();
          effectItem.preCallback = callback(effectItem.values);
        }
        __classPrivateFieldGet2(this, _GemElement_effectList, "f").push(effectItem);
      };
      this.memo = (callback, getDep) => {
        if (!__classPrivateFieldGet2(this, _GemElement_memoList, "f"))
          __classPrivateFieldSet2(this, _GemElement_memoList, [], "f");
        __classPrivateFieldGet2(this, _GemElement_memoList, "f").push({
          callback,
          getDep,
          inConstructor: this[constructorSymbol]
        });
      };
      _GemElement_initEffect.set(this, () => {
        var _b;
        (_b = __classPrivateFieldGet2(this, _GemElement_effectList, "f")) === null || _b === void 0 ? void 0 : _b.forEach((effectItem) => {
          const { callback, getDep, initialized } = effectItem;
          if (!initialized) {
            effectItem.values = getDep === null || getDep === void 0 ? void 0 : getDep();
            effectItem.preCallback = callback(effectItem.values);
            effectItem.initialized = true;
          }
        });
      });
      _GemElement_render.set(this, () => {
        __classPrivateFieldGet2(this, _GemElement_execMemo, "f").call(this);
        const isLight = __classPrivateFieldGet2(this, _GemElement_renderRoot, "f") === this;
        const temp = this.render ? this.render() : isLight ? void 0 : html`<slot></slot>`;
        if (temp === void 0)
          return;
        render(temp, __classPrivateFieldGet2(this, _GemElement_renderRoot, "f"));
      });
      _GemElement_shouldUpdate.set(this, () => {
        return this.shouldUpdate ? this.shouldUpdate() : true;
      });
      _GemElement_updateCallback.set(this, () => {
        if (__classPrivateFieldGet2(this, _GemElement_isMounted, "f") && __classPrivateFieldGet2(this, _GemElement_shouldUpdate, "f").call(this)) {
          __classPrivateFieldGet2(this, _GemElement_render, "f").call(this);
          addMicrotask(__classPrivateFieldGet2(this, _GemElement_updated, "f"));
          addMicrotask(__classPrivateFieldGet2(this, _GemElement_execEffect, "f"));
        }
      });
      _GemElement_update.set(this, () => {
        if (__classPrivateFieldGet2(this, _GemElement_isAsync, "f")) {
          asyncRenderTaskList.add(__classPrivateFieldGet2(this, _GemElement_updateCallback, "f"));
        } else {
          __classPrivateFieldGet2(this, _GemElement_updateCallback, "f").call(this);
        }
      });
      this.update = () => {
        addMicrotask(__classPrivateFieldGet2(this, _GemElement_update, "f"));
      };
      _GemElement_updated.set(this, () => {
        var _b;
        (_b = this.updated) === null || _b === void 0 ? void 0 : _b.call(this);
      });
      _GemElement_disconnectStore.set(this, void 0);
      _GemElement_connectedCallback.set(this, () => {
        var _b, _c, _d;
        if (__classPrivateFieldGet2(this, _GemElement_isAppendReason, "f")) {
          __classPrivateFieldSet2(this, _GemElement_isAppendReason, false, "f");
          return;
        }
        Reflect.set(this, constructorSymbol, false);
        (_b = this.willMount) === null || _b === void 0 ? void 0 : _b.call(this);
        const { observedStores, rootElement } = this.constructor;
        __classPrivateFieldSet2(this, _GemElement_disconnectStore, observedStores === null || observedStores === void 0 ? void 0 : observedStores.map((store) => connect(store, __classPrivateFieldGet2(this, _GemElement_update, "f"))), "f");
        __classPrivateFieldGet2(this, _GemElement_render, "f").call(this);
        __classPrivateFieldSet2(this, _GemElement_isMounted, true, "f");
        __classPrivateFieldSet2(this, _GemElement_unmountCallback, (_c = this.mounted) === null || _c === void 0 ? void 0 : _c.call(this), "f");
        __classPrivateFieldGet2(this, _GemElement_initEffect, "f").call(this);
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
        if (__classPrivateFieldGet2(this, _GemElement_isMounted, "f")) {
          addMicrotask(__classPrivateFieldGet2(this, _GemElement_update, "f"));
        }
      });
      __classPrivateFieldSet2(this, _GemElement_isAsync, options.isAsync, "f");
      __classPrivateFieldSet2(this, _GemElement_renderRoot, options.isLight ? this : this.attachShadow({
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
      if (!__classPrivateFieldGet2(this, _GemElement_internals, "f")) {
        __classPrivateFieldSet2(this, _GemElement_internals, this.attachInternals(), "f");
        try {
          __classPrivateFieldGet2(this, _GemElement_internals, "f").states.add("foo");
          __classPrivateFieldGet2(this, _GemElement_internals, "f").states.delete("foo");
        } catch (_b) {
          Reflect.defineProperty(__classPrivateFieldGet2(this, _GemElement_internals, "f"), "states", {
            value: {
              has: (v) => kebabToCamelCase(v) in this.dataset,
              add: (v) => this.dataset[kebabToCamelCase(v)] = "",
              delete: (v) => delete this.dataset[kebabToCamelCase(v)]
            }
          });
        }
      }
      return __classPrivateFieldGet2(this, _GemElement_internals, "f");
    }
    /**
     * @private
     * @final
     * use `effect`
     */
    attributeChangedCallback() {
      if (__classPrivateFieldGet2(this, _GemElement_isMounted, "f")) {
        addMicrotask(__classPrivateFieldGet2(this, _GemElement_update, "f"));
      }
      return __classPrivateFieldGet2(_a, _a, "f", _GemElement_final);
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
      if (this.isConnected && __classPrivateFieldGet2(this, _GemElement_isAsync, "f")) {
        asyncRenderTaskList.add(__classPrivateFieldGet2(this, _GemElement_connectedCallback, "f"));
      } else {
        __classPrivateFieldGet2(this, _GemElement_connectedCallback, "f").call(this);
      }
      return __classPrivateFieldGet2(_a, _a, "f", _GemElement_final);
    }
    /**
     * @private
     * @final
     */
    adoptedCallback() {
      return __classPrivateFieldGet2(_a, _a, "f", _GemElement_final);
    }
    /**
     * @private
     * @final
     * use `unmounted`
     */
    disconnectedCallback() {
      var _b, _c;
      if (this.isConnected) {
        __classPrivateFieldSet2(this, _GemElement_isAppendReason, true, "f");
        return;
      }
      __classPrivateFieldSet2(this, _GemElement_isMounted, false, "f");
      (_b = __classPrivateFieldGet2(this, _GemElement_disconnectStore, "f")) === null || _b === void 0 ? void 0 : _b.forEach((disconnect) => disconnect());
      execCallback(__classPrivateFieldGet2(this, _GemElement_unmountCallback, "f"));
      (_c = this.unmounted) === null || _c === void 0 ? void 0 : _c.call(this);
      __classPrivateFieldSet2(this, _GemElement_effectList, __classPrivateFieldGet2(this, _GemElement_clearEffect, "f").call(this, __classPrivateFieldGet2(this, _GemElement_effectList, "f")), "f");
      __classPrivateFieldSet2(this, _GemElement_memoList, __classPrivateFieldGet2(this, _GemElement_clearEffect, "f").call(this, __classPrivateFieldGet2(this, _GemElement_memoList, "f")), "f");
      return __classPrivateFieldGet2(_a, _a, "f", _GemElement_final);
    }
  };
  _a = GemElement, _GemElement_renderRoot = /* @__PURE__ */ new WeakMap(), _GemElement_internals = /* @__PURE__ */ new WeakMap(), _GemElement_isAppendReason = /* @__PURE__ */ new WeakMap(), _GemElement_isMounted = /* @__PURE__ */ new WeakMap(), _GemElement_isAsync = /* @__PURE__ */ new WeakMap(), _GemElement_effectList = /* @__PURE__ */ new WeakMap(), _GemElement_memoList = /* @__PURE__ */ new WeakMap(), _GemElement_unmountCallback = /* @__PURE__ */ new WeakMap(), _GemElement_exec = /* @__PURE__ */ new WeakMap(), _GemElement_execEffect = /* @__PURE__ */ new WeakMap(), _GemElement_execMemo = /* @__PURE__ */ new WeakMap(), _GemElement_initEffect = /* @__PURE__ */ new WeakMap(), _GemElement_render = /* @__PURE__ */ new WeakMap(), _GemElement_shouldUpdate = /* @__PURE__ */ new WeakMap(), _GemElement_updateCallback = /* @__PURE__ */ new WeakMap(), _GemElement_update = /* @__PURE__ */ new WeakMap(), _GemElement_updated = /* @__PURE__ */ new WeakMap(), _GemElement_disconnectStore = /* @__PURE__ */ new WeakMap(), _GemElement_connectedCallback = /* @__PURE__ */ new WeakMap(), _GemElement_clearEffect = /* @__PURE__ */ new WeakMap();
  _GemElement_final = { value: Symbol() };
  var gemElementProxyMap = new PropProxyMap();
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
  var isEventHandleSymbol = Symbol("event handle");
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
  var getReflectTargets = (ele) => [...ele.querySelectorAll("[data-gem-reflect]")].map((e) => e.target);
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
  var nativeDefineElement = customElements.define.bind(customElements);
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
    Object.assign(window.__GEM_DEVTOOLS__HOOK__, { ...element_exports, ...version_exports });
  }

  // src/common/constants.ts
  var VERSION = "1.6.10";
  var isProd = false;
  var isWebApp = location.protocol.startsWith("http");
  var isFirefox = navigator.userAgent.includes("Firefox");
  var LyricsPositions = ["page", "pip"];
  var LyricsAlign = ["left", "center"];
  var LyricsFontFamily = ["CircularSp", "Sans-Serif", "Serif", "Cursive"];
  var LyricsTransform = ["Origin", "Simplified", "Traditional"];
  var LyricsServer = ["NetEase", "LRCLIB"];

  // src/common/font.ts
  var fontStyle = html`
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
  function captureException({ error }, extra) {
    if (!isProd)
      console.error(error, extra);
    const msg = {
      type: 100008 /* CAPTURE_EXCEPTION */,
      data: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        extra: { href: location.href, ...extra }
      }
    };
    import_webextension_polyfill.default.runtime.sendMessage(msg);
  }

  // node_modules/@mantou/gem/lib/decorators.js
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
  function customElement(name) {
    return function(cls) {
      nativeDefineElement(name, cls);
    };
  }

  // src/common/ga.ts
  var postReq = (params) => {
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
      window.postMessage({ type: 100009 /* SEND_REQUEST */, data }, "*");
    } else {
      fetch(uri, options);
    }
  };
  var gaRequiredPayload = {
    v: "1",
    // protocol version
    tid: isProd ? "UA-163443161-1" : "UA-88601817-2"
    // measurement id
  };
  var events = {
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

  // node_modules/@mantou/gem/helper/theme.js
  var themeStoreMap = /* @__PURE__ */ new WeakMap();
  var themePropsMap = /* @__PURE__ */ new WeakMap();
  var setThemeFnMap = /* @__PURE__ */ new WeakMap();
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

  // src/common/theme.ts
  var theme = createTheme({
    primaryRGB: "30, 215, 96",
    backgroundRGB: "18, 18, 18",
    textRGB: "255, 255, 255",
    blackRGB: "0, 0, 0"
  });

  // src/i18n.ts
  var import_webextension_polyfill2 = __toESM(require_browser_polyfill());

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
      p[c] = (...rest) => import_webextension_polyfill2.default.i18n.getMessage(c, ...rest);
      return p;
    },
    {}
  );
  var i18nMap = Object.keys(messages_default).reduce(
    (p, c) => {
      p[c] = import_webextension_polyfill2.default.i18n.getMessage(c);
      return p;
    },
    {}
  );

  // src/options/elements/form.ts
  var Form = class extends GemElement {
    get elements() {
      return [...this.querySelectorAll("[name]")];
    }
    get value() {
      const formData = new FormData();
      this.elements.forEach((ele) => {
        if ("value" in ele && "name" in ele) {
          formData.append(ele.name, ele.value);
        }
      });
      return formData;
    }
    render() {
      return html`
      <style>
        :host {
          display: block;
          font-size: 1.3em;
        }
      </style>
      <slot></slot>
    `;
    }
  };
  Form = __decorateClass([
    customElement("ele-form")
  ], Form);

  // src/options/elements/form-item.ts
  var FormItem = class extends GemElement {
    render() {
      return html`
      <style>
        :host {
          display: flex;
          padding: 0.8em 0;
        }
        :host([hidden]) {
          display: none;
        }
        :host([disabled]) {
          pointer-events: none;
          opacity: 0.3;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          cursor: default;
          flex-grow: 1;
          line-height: 1.3;
          padding-right: 1em;
        }
        .desc {
          opacity: 0.4;
        }
        .control {
          display: flex;
          place-items: center;
        }
      </style>
      <div class="text">
        <div class="label">${this.label}</div>
        <div class="desc">${this.description}</div>
      </div>
      <div class="control">
        <slot></slot>
      </div>
    `;
    }
  };
  __decorateClass([
    attribute
  ], FormItem.prototype, "label", 2);
  __decorateClass([
    attribute
  ], FormItem.prototype, "description", 2);
  __decorateClass([
    boolattribute
  ], FormItem.prototype, "disabled", 2);
  FormItem = __decorateClass([
    customElement("ele-form-item")
  ], FormItem);

  // src/options/elements/select.ts
  var Select = class extends GemElement {
    constructor() {
      super(...arguments);
      this.options = [];
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1655937
      this.inputHandler = (e) => {
        if (!e.composed)
          this.input(null, { composed: true, bubbles: true });
      };
    }
    get control() {
      return this.selectRef.element;
    }
    get value() {
      return this.control.value;
    }
    render() {
      return html`
      <style>
        :host {
          position: relative;
        }
        select {
          outline: none;
          color: currentColor;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
          border-radius: 2px;
          border: 1px solid;
          background: transparent;
          line-height: 1.3;
          padding: 0.2em 1em 0.2em 0.2em;
          min-width: 5em;
        }
        select:focus {
          outline: none;
        }
        select:focus-visible {
          outline-offset: 2px;
          outline: rgba(${theme.primaryRGB}, 0.2) auto 2px;
        }
        .mark {
          content: '';
          position: absolute;
          border-style: solid;
          border-color: rgba(${theme.blackRGB}, 0.7) transparent transparent;
          border-width: 6px 4px 0;
          right: 0.3em;
          top: 0;
          bottom: 0;
          width: 0;
          height: 0;
          margin: auto;
        }
      </style>
      <select ref=${this.selectRef.ref} @input=${this.inputHandler}>
        ${this.options.map(
        (option) => html`
            <option
              ?selected=${this.defaultValue === option.value}
              value=${option.value}
              style=${option.style || ""}
            >
              ${option.label}
            </option>
          `
      )}
      </select>
      <div class="mark"></div>
    `;
    }
  };
  __decorateClass([
    attribute
  ], Select.prototype, "name", 2);
  __decorateClass([
    attribute
  ], Select.prototype, "defaultValue", 2);
  __decorateClass([
    property
  ], Select.prototype, "options", 2);
  __decorateClass([
    refobject
  ], Select.prototype, "selectRef", 2);
  __decorateClass([
    emitter
  ], Select.prototype, "input", 2);
  Select = __decorateClass([
    customElement("ele-select")
  ], Select);

  // src/options/elements/switch.ts
  var Switch = class extends GemElement {
    get control() {
      return this.checkboxRef.element;
    }
    get value() {
      return this.control.checked ? "on" : "off";
    }
    render() {
      return html`
      <style>
      :host {
        display: contents;
      }
      label {
        position: relative;
        display: flex;
        place-items: center;
        cursor: pointer;
      }
      .track {
        border-radius: 100px;
        width: 2.5em;
        height: 1.2em;
        background: currentColor;
        opacity: .2;
      }
      .btn {
        position: absolute;
        border-radius: 100%;
        width: 1.3em;
        height: 1.3em;
        left: .13em;
        background: currentColor;
        opacity: .5;
        transition: left .2s;
      }
      input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      input:checked ~ label {
        color: rgb(${theme.primaryRGB});
      }
      input:checked ~ label .btn {
        left: calc(100% - 1.3em - .13em);
        opacity: 1;
      }
      input:focus {
        outline: none;
      }
      input:focus-visible ~ label .btn {
        transform: scale(1.4);
      }
      </style>
      <input
        ref=${this.checkboxRef.ref}
        ?checked=${this.defaultValue === "on"}
        id="control"
        type="checkbox"
      ></input>
      <label for="control">
        <div class="track"></div>
        <div class="btn"></div>
      </label>
    `;
    }
  };
  __decorateClass([
    attribute
  ], Switch.prototype, "name", 2);
  __decorateClass([
    attribute
  ], Switch.prototype, "defaultValue", 2);
  __decorateClass([
    refobject
  ], Switch.prototype, "checkboxRef", 2);
  Switch = __decorateClass([
    customElement("ele-switch")
  ], Switch);

  // src/options/store.ts
  var import_webextension_polyfill3 = __toESM(require_browser_polyfill());
  var uiLanguage = import_webextension_polyfill3.default.i18n.getUILanguage();
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
  async function getOptions2() {
    const options = await import_webextension_polyfill3.default.storage.sync.get(defaultOptions);
    if (options.cid === defaultOptions.cid) {
      await import_webextension_polyfill3.default.storage.sync.set({ cid: options.cid });
    }
    return options;
  }
  async function updateOptions(value) {
    await import_webextension_polyfill3.default.storage.sync.set(value);
    const options = await getOptions2();
    if (isWebApp) {
      window.postMessage({ type: 100005 /* SEND_OPTIONS */, data: options }, "*");
    } else {
      sendMessage({ type: 100005 /* SEND_OPTIONS */, data: options });
    }
    return options;
  }

  // src/options/app.ts
  var OptionsApp = class extends GemElement {
    constructor() {
      super(...arguments);
      this.state = {
        options: null,
        localFonts: []
      };
      this.loadLocalFonts = async () => {
        if ("queryLocalFonts" in window && !this.state.localFonts.length) {
          const fonts = /* @__PURE__ */ new Set();
          const iterable = await window.queryLocalFonts();
          for (const font of iterable) {
            fonts.add(font.family);
          }
          this.setState({ localFonts: [...fonts] });
        }
      };
      this.inputHandler = async () => {
        if (!this.formRef.element)
          return;
        const options = await updateOptions(Object.fromEntries(this.formRef.element.value));
        this.setState({ options });
      };
      this.copyIdHandler = (e) => {
        const { options } = this.state;
        if (e.key.toLowerCase() === "c" && options) {
          navigator.clipboard.writeText(options.cid);
        }
      };
    }
    async mounted() {
      const options = await getOptions2();
      sendEvent(options.cid, events.openOptionsPage);
      this.setState({ options });
      window.addEventListener("keydown", this.copyIdHandler, true);
    }
    unmounted() {
      window.removeEventListener("keydown", this.copyIdHandler, true);
    }
    render() {
      const { options } = this.state;
      if (!options)
        return null;
      return html`
      <style>
        :host {
          display: block;
          padding: 0.8em 1.6em 1.6em;
          color: rgb(${theme.blackRGB});
        }
        ele-form {
          margin-bottom: 1em;
        }
        ele-form-item {
          border-bottom: 1px solid rgba(${theme.blackRGB}, 0.1);
        }
        .tip {
          font-size: 1.2em;
          font-style: italic;
          opacity: 0.5;
          margin: 1em 0;
          padding: 0;
          list-style: none;
        }
      </style>
      <ele-form @input=${this.inputHandler} ref=${this.formRef.ref}>
        <ele-form-item label=${i18n.optionsFontSize()} description=${i18n.optionsFontSizeDetail()}>
          <ele-select
            name=${"font-size"}
            default-value=${options["font-size"]}
            .options=${new Array(9).fill(null).map((_, index) => ({
        label: String(index * 2 + 32) + "px",
        value: String(index * 2 + 32)
      }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item label=${i18n.optionsFontFamily()}>
          <ele-select
            @click=${this.loadLocalFonts}
            name=${"font-family"}
            default-value=${options["font-family"]}
            .options=${[
        .../* @__PURE__ */ new Set([...LyricsFontFamily, ...this.state.localFonts, options["font-family"]])
      ].map((e) => ({
        label: e,
        value: e,
        style: `font-family: ${e}`
      }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item label=${i18n.optionsLyricsAlign()}>
          <ele-select
            name=${"lyrics-align"}
            default-value=${options["lyrics-align"]}
            .options=${LyricsAlign.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item
          hidden
          label=${i18n.optionsShowCleanLyrics()}
          description=${i18n.optionsShowCleanLyricsDetail()}
        >
          <ele-switch
            name=${"clean-lyrics"}
            default-value=${options["clean-lyrics"]}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          label="${i18n.optionsLyricsTransform()} *"
          description=${i18n.optionsLyricsTransformDetail()}
        >
          <ele-select
            name=${"lyrics-transform"}
            default-value=${options["lyrics-transform"]}
            .options=${LyricsTransform.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item
          ?hidden=${!document.pictureInPictureEnabled}
          label="${i18n.optionsLyricsPosition()} **"
        >
          <ele-select
            name=${"show-on"}
            default-value=${options["show-on"]}
            .options=${LyricsPositions.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item
          label="${i18n.optionsToggleShortcut()}"
          description=${i18n.optionsToggleShortcutDetail()}
        >
          <ele-select
            name=${"toggle-shortcut"}
            default-value=${options["toggle-shortcut"]}
            .options=${new Array(26).fill(null).map((_, index) => ({
        label: String.fromCharCode(index + 97),
        value: String.fromCharCode(index + 97)
      }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item label=${i18n.optionsShowLyrics()}>
          <ele-switch
            name=${"only-cover"}
            default-value=${options["only-cover"]}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          ?hidden=${!("filter" in CanvasRenderingContext2D.prototype)}
          ?disabled=${options["only-cover"] === "on"}
          label=${i18n.optionsHDCover()}
          description=${i18n.optionsHDCoverDetail()}
        >
          <ele-switch
            name=${"hd-cover"}
            default-value=${options["hd-cover"]}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          label="${i18n.optionsUseUnreviewedLyrics()} *"
          description=${i18n.optionsUseUnreviewedLyricsDetail()}
        >
          <ele-switch
            name=${"use-unreviewed-lyrics"}
            default-value=${options["use-unreviewed-lyrics"]}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item label="${i18n.optionsLyricsServer()} *">
          <ele-select
            name=${"lyrics-server"}
            default-value=${options["lyrics-server"]}
            .options=${LyricsServer.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
      </ele-form>
      <ul class="tip">
        <li>* ${i18n.optionsSaveTip1()}</li>
        <li>** ${i18n.optionsSaveTip2()}</li>
      </ul>
    `;
    }
  };
  __decorateClass([
    refobject
  ], OptionsApp.prototype, "formRef", 2);
  OptionsApp = __decorateClass([
    customElement("options-app")
  ], OptionsApp);

  // src/common/elements/modal-base.ts
  var Modal = class extends GemElement {
    constructor(content) {
      super();
      this.close = () => {
        this.constructor.close();
      };
      this.keydownHandler = (e) => {
        if (e.key === "Escape") {
          e.stopImmediatePropagation();
          e.stopPropagation();
          this.close();
        }
      };
      this.content = content;
      this.addEventListener("close", this.close);
      this.tabIndex = 0;
    }
    static {
      this.instance = null;
    }
    static open(content) {
      if (this.instance)
        return;
      this.instance = new this(content);
      document.body.append(this.instance);
    }
    static close() {
      this.instance?.remove();
      this.instance = null;
    }
    mounted() {
      this.focus();
      window.addEventListener("keydown", this.keydownHandler, true);
      return () => {
        window.removeEventListener("keydown", this.keydownHandler, true);
      };
    }
    render() {
      return html`
      <style>
        .root {
          font-size: 10px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2147483647;
        }
        .body {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 4px;
        }
        .close-btn {
          cursor: pointer;
          position: absolute;
          top: -2em;
          right: -2em;
          height: 2em;
          width: 2em;
        }
        .close-btn::before,
        .close-btn::after {
          position: absolute;
          content: '';
          background: white;
          transform-origin: center;
          width: 1.5em;
          height: 0.2em;
          top: 0.9em;
          left: 0.25em;
        }
        .close-btn::before {
          transform: rotate(-45deg);
        }
        .close-btn::after {
          transform: rotate(45deg);
        }
        .body > :first-child {
          width: 45em;
          max-height: 90vh;
          overflow: auto;
        }
      </style>
      <div class="root">
        <div class="body">
          ${this.content}
          <div class="close-btn" @click=${this.close}></div>
        </div>
      </div>
    `;
    }
  };

  // src/options/modal.ts
  var OptionsModal = class extends Modal {
  };
  OptionsModal = __decorateClass([
    customElement("options-modal")
  ], OptionsModal);
  window.addEventListener("message", ({ data }) => {
    if (data?.type === 100006 /* OPEN_OPTIONS */) {
      OptionsModal.open(new OptionsApp());
    }
  });

  // src/options/index.ts
  if (!isWebApp) {
    render(
      html`
      ${fontStyle}
      <style>
        html {
          font-size: 62.5%;
          background: white;
        }
        body {
          font-size: inherit;
          margin: 0;
        }
        @media (min-width: 45rem) {
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2.5rem;
          }
          options-app {
            width: 40rem;
            border: 2px solid;
          }
        }
      </style>
      <options-app></options-app>
    `,
      document.body
    );
    window.addEventListener("error", (e) => {
      captureException(e);
    });
  } else {
    Object.defineProperty(HTMLElement.prototype, "attachInternals", {
      value: function attachInternals() {
        return {
          states: {
            has: (v) => kebabToCamelCase(v) in this.dataset,
            add: (v) => this.dataset[kebabToCamelCase(v)] = "",
            delete: (v) => delete this.dataset[kebabToCamelCase(v)]
          }
        };
      }
    });
  }
})();
/*! Bundled license information:

@webcomponents/webcomponentsjs/webcomponents-bundle.js:
  (**
  @license @nocompile
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

lit-html/lib/directive.js:
  (**
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
   *)

lit-html/lib/dom.js:
  (**
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
   *)

lit-html/lib/part.js:
  (**
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
   *)

lit-html/lib/template.js:
  (**
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
   *)

lit-html/lib/template-instance.js:
  (**
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
   *)

lit-html/lib/template-result.js:
  (**
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
   *)

lit-html/lib/parts.js:
  (**
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
   *)

lit-html/lib/default-template-processor.js:
  (**
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
   *)

lit-html/lib/template-factory.js:
  (**
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
   *)

lit-html/lib/render.js:
  (**
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
   *)

lit-html/lit-html.js:
  (**
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
   *)

lit-html/directives/repeat.js:
  (**
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
   *)

lit-html/directives/guard.js:
  (**
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
   *)

lit-html/directives/if-defined.js:
  (**
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
   *)
*/
