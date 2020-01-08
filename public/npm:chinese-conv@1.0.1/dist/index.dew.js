import { dew as _tongwenStDewDew } from '../tongwen/tongwen-st.dew.js';
import { dew as _tongwenTsDewDew } from '../tongwen/tongwen-ts.dew.js';
let exports = {},
  _dewExec = false;
const module = {
  exports: exports,
};
export function dew() {
  if (_dewExec) return module.exports;
  _dewExec = true;

  (function(global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../tongwen/tongwen-st.js', '../tongwen/tongwen-ts.js'], factory);
    } else if (typeof exports !== 'undefined' && true) {
      factory(exports, module, _tongwenStDewDew(), _tongwenTsDewDew());
    } else {
      const mod = {
        exports: {},
      };
      factory(mod.exports, mod, global.tongwenSt, global.tongwenTs);
      global.index = mod.exports;
    }
  })(exports, function(exports, module, _tongwenTongwenStJs, _tongwenTongwenTsJs) {
    'use strict';

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule
        ? obj
        : {
            default: obj,
          };
    }

    const _tongwenSt = _interopRequireDefault(_tongwenTongwenStJs);

    const _tongwenTs = _interopRequireDefault(_tongwenTongwenTsJs);

    module.exports = {
      sify: _tongwenTs['default'],
      tify: _tongwenSt['default'],
    };
  });

  return module.exports;
}
