/*!
  * @brisky/eventbus v0.0.0
  * (c) 2021 brisky-eventbus
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BriskyEventBus = {}, global._));
}(this, (function (exports, _) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

  exports.TapableHookType = void 0;
  (function (TapableHookType) {
      TapableHookType[TapableHookType["Default"] = 0] = "Default";
      TapableHookType[TapableHookType["Bail"] = 1] = "Bail";
      TapableHookType[TapableHookType["Waterfall"] = 2] = "Waterfall";
      TapableHookType[TapableHookType["Loop"] = 3] = "Loop"; // 返回非 undefined 时继续再次执行当前的回调。
  })(exports.TapableHookType || (exports.TapableHookType = {}));

  /*!
    * @brisky/util v0.0.0
    * (c) 2021 brisky-util
    * @license MIT
    */
  /*
   * @description: 类型检查
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 15:42:14
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-09 20:12:48
   */
  class DataCheck {
      /**
       * 是否是Object对象
       * @param obj
       * @returns
       */
      $isObject(obj) {
          return Object.prototype.toString.call(obj) === '[object Object]';
      }
      /**
       * 是否是Array对象
       * @param obj
       * @returns
       */
      $isArray(obj) {
          return Array.isArray(obj) || true;
      }
      /**
       *  是否是字符串
       * @param str
       * @returns
       */
      $isString(str) {
          const typeStr = str instanceof String || (typeof str).toLowerCase();
          return typeStr === 'string';
      }
      /**
       * 是否是函数
       * @param fun
       * @returns
       */
      $isFunction(fun) {
          return typeof fun === 'function';
      }
      /**
       * 检查特殊字符
       * @param {*} str
       */
      $checkSpecialKey(str) {
          if (str) {
              // var specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
              const specialKey = '~!@#$%^&*+{}|"<>?';
              for (var i = 0; i < str.length; i++) {
                  if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
                      return false;
                  }
              }
              return true;
          }
          else {
              return true;
          }
      }
  }

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  global$1.TYPED_ARRAY_SUPPORT !== undefined
    ? global$1.TYPED_ARRAY_SUPPORT
    : true;


  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer$1(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }

  function isFastBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
  }

  if (typeof global$1.setTimeout === 'function') ;
  if (typeof global$1.clearTimeout === 'function') ;

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  var inherits;
  if (typeof Object.create === 'function'){
    inherits = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  var inherits$1 = inherits;

  var formatRegExp = /%[sdj%]/g;
  function format(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
      if (x === '%%') return '%';
      if (i >= len) return x;
      switch (x) {
        case '%s': return String(args[i++]);
        case '%d': return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }
    return str;
  }

  // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.
  function deprecate(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(global$1.process)) {
      return function() {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }

    var warned = false;
    function deprecated() {
      if (!warned) {
        {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }

    return deprecated;
  }

  var debugs = {};
  var debugEnviron;
  function debuglog(set) {
    if (isUndefined(debugEnviron))
      debugEnviron = '';
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = 0;
        debugs[set] = function() {
          var msg = format.apply(null, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function() {};
      }
    }
    return debugs[set];
  }

  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };


  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str +
             '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }


  function stylizeNoColor(str, styleType) {
    return str;
  }


  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }


  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== inspect &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '', array = false, braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }


  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }


  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }


  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }


  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }


  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }


  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray(ar) {
    return Array.isArray(ar);
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isSymbol(arg) {
    return typeof arg === 'symbol';
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  function isError(e) {
    return isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isPrimitive(arg) {
    return arg === null ||
           typeof arg === 'boolean' ||
           typeof arg === 'number' ||
           typeof arg === 'string' ||
           typeof arg === 'symbol' ||  // ES6 symbol
           typeof arg === 'undefined';
  }

  function isBuffer(maybeBuf) {
    return isBuffer$1(maybeBuf);
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }


  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }


  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'];

  // 26 Feb 16:19:34
  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  }


  // log is just a thin wrapper to console.log that prepends a timestamp
  function log() {
    console.log('%s - %s', timestamp(), format.apply(null, arguments));
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var util$1 = {
    inherits: inherits$1,
    _extend: _extend,
    log: log,
    isBuffer: isBuffer,
    isPrimitive: isPrimitive,
    isFunction: isFunction,
    isError: isError,
    isDate: isDate,
    isObject: isObject,
    isRegExp: isRegExp,
    isUndefined: isUndefined,
    isSymbol: isSymbol,
    isString: isString,
    isNumber: isNumber,
    isNullOrUndefined: isNullOrUndefined,
    isNull: isNull,
    isBoolean: isBoolean,
    isArray: isArray,
    inspect: inspect,
    deprecate: deprecate,
    format: format,
    debuglog: debuglog
  };

  var util$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    format: format,
    deprecate: deprecate,
    debuglog: debuglog,
    inspect: inspect,
    isArray: isArray,
    isBoolean: isBoolean,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isNumber: isNumber,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isRegExp: isRegExp,
    isObject: isObject,
    isDate: isDate,
    isError: isError,
    isFunction: isFunction,
    isPrimitive: isPrimitive,
    isBuffer: isBuffer,
    log: log,
    inherits: inherits$1,
    _extend: _extend,
    'default': util$1
  });

  var util = /*@__PURE__*/getAugmentedNamespace(util$2);

  const deprecateContext = util.deprecate(() => {},
  "Hook.context is deprecated and will be removed");

  const CALL_DELEGATE = function(...args) {
  	this.call = this._createCall("sync");
  	return this.call(...args);
  };
  const CALL_ASYNC_DELEGATE = function(...args) {
  	this.callAsync = this._createCall("async");
  	return this.callAsync(...args);
  };
  const PROMISE_DELEGATE = function(...args) {
  	this.promise = this._createCall("promise");
  	return this.promise(...args);
  };

  class Hook {
  	constructor(args = [], name = undefined) {
  		this._args = args;
  		this.name = name;
  		this.taps = [];
  		this.interceptors = [];
  		this._call = CALL_DELEGATE;
  		this.call = CALL_DELEGATE;
  		this._callAsync = CALL_ASYNC_DELEGATE;
  		this.callAsync = CALL_ASYNC_DELEGATE;
  		this._promise = PROMISE_DELEGATE;
  		this.promise = PROMISE_DELEGATE;
  		this._x = undefined;

  		this.compile = this.compile;
  		this.tap = this.tap;
  		this.tapAsync = this.tapAsync;
  		this.tapPromise = this.tapPromise;
  	}

  	compile(options) {
  		throw new Error("Abstract: should be overridden");
  	}

  	_createCall(type) {
  		return this.compile({
  			taps: this.taps,
  			interceptors: this.interceptors,
  			args: this._args,
  			type: type
  		});
  	}

  	_tap(type, options, fn) {
  		if (typeof options === "string") {
  			options = {
  				name: options.trim()
  			};
  		} else if (typeof options !== "object" || options === null) {
  			throw new Error("Invalid tap options");
  		}
  		if (typeof options.name !== "string" || options.name === "") {
  			throw new Error("Missing name for tap");
  		}
  		if (typeof options.context !== "undefined") {
  			deprecateContext();
  		}
  		options = Object.assign({ type, fn }, options);
  		options = this._runRegisterInterceptors(options);
  		this._insert(options);
  	}

  	tap(options, fn) {
  		this._tap("sync", options, fn);
  	}

  	tapAsync(options, fn) {
  		this._tap("async", options, fn);
  	}

  	tapPromise(options, fn) {
  		this._tap("promise", options, fn);
  	}

  	_runRegisterInterceptors(options) {
  		for (const interceptor of this.interceptors) {
  			if (interceptor.register) {
  				const newOptions = interceptor.register(options);
  				if (newOptions !== undefined) {
  					options = newOptions;
  				}
  			}
  		}
  		return options;
  	}

  	withOptions(options) {
  		const mergeOptions = opt =>
  			Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);

  		return {
  			name: this.name,
  			tap: (opt, fn) => this.tap(mergeOptions(opt), fn),
  			tapAsync: (opt, fn) => this.tapAsync(mergeOptions(opt), fn),
  			tapPromise: (opt, fn) => this.tapPromise(mergeOptions(opt), fn),
  			intercept: interceptor => this.intercept(interceptor),
  			isUsed: () => this.isUsed(),
  			withOptions: opt => this.withOptions(mergeOptions(opt))
  		};
  	}

  	isUsed() {
  		return this.taps.length > 0 || this.interceptors.length > 0;
  	}

  	intercept(interceptor) {
  		this._resetCompilation();
  		this.interceptors.push(Object.assign({}, interceptor));
  		if (interceptor.register) {
  			for (let i = 0; i < this.taps.length; i++) {
  				this.taps[i] = interceptor.register(this.taps[i]);
  			}
  		}
  	}

  	_resetCompilation() {
  		this.call = this._call;
  		this.callAsync = this._callAsync;
  		this.promise = this._promise;
  	}

  	_insert(item) {
  		this._resetCompilation();
  		let before;
  		if (typeof item.before === "string") {
  			before = new Set([item.before]);
  		} else if (Array.isArray(item.before)) {
  			before = new Set(item.before);
  		}
  		let stage = 0;
  		if (typeof item.stage === "number") {
  			stage = item.stage;
  		}
  		let i = this.taps.length;
  		while (i > 0) {
  			i--;
  			const x = this.taps[i];
  			this.taps[i + 1] = x;
  			const xStage = x.stage || 0;
  			if (before) {
  				if (before.has(x.name)) {
  					before.delete(x.name);
  					continue;
  				}
  				if (before.size > 0) {
  					continue;
  				}
  			}
  			if (xStage > stage) {
  				continue;
  			}
  			i++;
  			break;
  		}
  		this.taps[i] = item;
  	}
  }

  Object.setPrototypeOf(Hook.prototype, null);

  var Hook_1 = Hook;

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */

  class HookCodeFactory {
  	constructor(config) {
  		this.config = config;
  		this.options = undefined;
  		this._args = undefined;
  	}

  	create(options) {
  		this.init(options);
  		let fn;
  		switch (this.options.type) {
  			case "sync":
  				fn = new Function(
  					this.args(),
  					'"use strict";\n' +
  						this.header() +
  						this.contentWithInterceptors({
  							onError: err => `throw ${err};\n`,
  							onResult: result => `return ${result};\n`,
  							resultReturns: true,
  							onDone: () => "",
  							rethrowIfPossible: true
  						})
  				);
  				break;
  			case "async":
  				fn = new Function(
  					this.args({
  						after: "_callback"
  					}),
  					'"use strict";\n' +
  						this.header() +
  						this.contentWithInterceptors({
  							onError: err => `_callback(${err});\n`,
  							onResult: result => `_callback(null, ${result});\n`,
  							onDone: () => "_callback();\n"
  						})
  				);
  				break;
  			case "promise":
  				let errorHelperUsed = false;
  				const content = this.contentWithInterceptors({
  					onError: err => {
  						errorHelperUsed = true;
  						return `_error(${err});\n`;
  					},
  					onResult: result => `_resolve(${result});\n`,
  					onDone: () => "_resolve();\n"
  				});
  				let code = "";
  				code += '"use strict";\n';
  				code += this.header();
  				code += "return new Promise((function(_resolve, _reject) {\n";
  				if (errorHelperUsed) {
  					code += "var _sync = true;\n";
  					code += "function _error(_err) {\n";
  					code += "if(_sync)\n";
  					code +=
  						"_resolve(Promise.resolve().then((function() { throw _err; })));\n";
  					code += "else\n";
  					code += "_reject(_err);\n";
  					code += "};\n";
  				}
  				code += content;
  				if (errorHelperUsed) {
  					code += "_sync = false;\n";
  				}
  				code += "}));\n";
  				fn = new Function(this.args(), code);
  				break;
  		}
  		this.deinit();
  		return fn;
  	}

  	setup(instance, options) {
  		instance._x = options.taps.map(t => t.fn);
  	}

  	/**
  	 * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
  	 */
  	init(options) {
  		this.options = options;
  		this._args = options.args.slice();
  	}

  	deinit() {
  		this.options = undefined;
  		this._args = undefined;
  	}

  	contentWithInterceptors(options) {
  		if (this.options.interceptors.length > 0) {
  			const onError = options.onError;
  			const onResult = options.onResult;
  			const onDone = options.onDone;
  			let code = "";
  			for (let i = 0; i < this.options.interceptors.length; i++) {
  				const interceptor = this.options.interceptors[i];
  				if (interceptor.call) {
  					code += `${this.getInterceptor(i)}.call(${this.args({
						before: interceptor.context ? "_context" : undefined
					})});\n`;
  				}
  			}
  			code += this.content(
  				Object.assign(options, {
  					onError:
  						onError &&
  						(err => {
  							let code = "";
  							for (let i = 0; i < this.options.interceptors.length; i++) {
  								const interceptor = this.options.interceptors[i];
  								if (interceptor.error) {
  									code += `${this.getInterceptor(i)}.error(${err});\n`;
  								}
  							}
  							code += onError(err);
  							return code;
  						}),
  					onResult:
  						onResult &&
  						(result => {
  							let code = "";
  							for (let i = 0; i < this.options.interceptors.length; i++) {
  								const interceptor = this.options.interceptors[i];
  								if (interceptor.result) {
  									code += `${this.getInterceptor(i)}.result(${result});\n`;
  								}
  							}
  							code += onResult(result);
  							return code;
  						}),
  					onDone:
  						onDone &&
  						(() => {
  							let code = "";
  							for (let i = 0; i < this.options.interceptors.length; i++) {
  								const interceptor = this.options.interceptors[i];
  								if (interceptor.done) {
  									code += `${this.getInterceptor(i)}.done();\n`;
  								}
  							}
  							code += onDone();
  							return code;
  						})
  				})
  			);
  			return code;
  		} else {
  			return this.content(options);
  		}
  	}

  	header() {
  		let code = "";
  		if (this.needContext()) {
  			code += "var _context = {};\n";
  		} else {
  			code += "var _context;\n";
  		}
  		code += "var _x = this._x;\n";
  		if (this.options.interceptors.length > 0) {
  			code += "var _taps = this.taps;\n";
  			code += "var _interceptors = this.interceptors;\n";
  		}
  		return code;
  	}

  	needContext() {
  		for (const tap of this.options.taps) if (tap.context) return true;
  		return false;
  	}

  	callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
  		let code = "";
  		let hasTapCached = false;
  		for (let i = 0; i < this.options.interceptors.length; i++) {
  			const interceptor = this.options.interceptors[i];
  			if (interceptor.tap) {
  				if (!hasTapCached) {
  					code += `var _tap${tapIndex} = ${this.getTap(tapIndex)};\n`;
  					hasTapCached = true;
  				}
  				code += `${this.getInterceptor(i)}.tap(${
					interceptor.context ? "_context, " : ""
				}_tap${tapIndex});\n`;
  			}
  		}
  		code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
  		const tap = this.options.taps[tapIndex];
  		switch (tap.type) {
  			case "sync":
  				if (!rethrowIfPossible) {
  					code += `var _hasError${tapIndex} = false;\n`;
  					code += "try {\n";
  				}
  				if (onResult) {
  					code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
  				} else {
  					code += `_fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
  				}
  				if (!rethrowIfPossible) {
  					code += "} catch(_err) {\n";
  					code += `_hasError${tapIndex} = true;\n`;
  					code += onError("_err");
  					code += "}\n";
  					code += `if(!_hasError${tapIndex}) {\n`;
  				}
  				if (onResult) {
  					code += onResult(`_result${tapIndex}`);
  				}
  				if (onDone) {
  					code += onDone();
  				}
  				if (!rethrowIfPossible) {
  					code += "}\n";
  				}
  				break;
  			case "async":
  				let cbCode = "";
  				if (onResult)
  					cbCode += `(function(_err${tapIndex}, _result${tapIndex}) {\n`;
  				else cbCode += `(function(_err${tapIndex}) {\n`;
  				cbCode += `if(_err${tapIndex}) {\n`;
  				cbCode += onError(`_err${tapIndex}`);
  				cbCode += "} else {\n";
  				if (onResult) {
  					cbCode += onResult(`_result${tapIndex}`);
  				}
  				if (onDone) {
  					cbCode += onDone();
  				}
  				cbCode += "}\n";
  				cbCode += "})";
  				code += `_fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined,
					after: cbCode
				})});\n`;
  				break;
  			case "promise":
  				code += `var _hasResult${tapIndex} = false;\n`;
  				code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined
				})});\n`;
  				code += `if (!_promise${tapIndex} || !_promise${tapIndex}.then)\n`;
  				code += `  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${tapIndex} + ')');\n`;
  				code += `_promise${tapIndex}.then((function(_result${tapIndex}) {\n`;
  				code += `_hasResult${tapIndex} = true;\n`;
  				if (onResult) {
  					code += onResult(`_result${tapIndex}`);
  				}
  				if (onDone) {
  					code += onDone();
  				}
  				code += `}), function(_err${tapIndex}) {\n`;
  				code += `if(_hasResult${tapIndex}) throw _err${tapIndex};\n`;
  				code += onError(`_err${tapIndex}`);
  				code += "});\n";
  				break;
  		}
  		return code;
  	}

  	callTapsSeries({
  		onError,
  		onResult,
  		resultReturns,
  		onDone,
  		doneReturns,
  		rethrowIfPossible
  	}) {
  		if (this.options.taps.length === 0) return onDone();
  		const firstAsync = this.options.taps.findIndex(t => t.type !== "sync");
  		const somethingReturns = resultReturns || doneReturns;
  		let code = "";
  		let current = onDone;
  		let unrollCounter = 0;
  		for (let j = this.options.taps.length - 1; j >= 0; j--) {
  			const i = j;
  			const unroll =
  				current !== onDone &&
  				(this.options.taps[i].type !== "sync" || unrollCounter++ > 20);
  			if (unroll) {
  				unrollCounter = 0;
  				code += `function _next${i}() {\n`;
  				code += current();
  				code += `}\n`;
  				current = () => `${somethingReturns ? "return " : ""}_next${i}();\n`;
  			}
  			const done = current;
  			const doneBreak = skipDone => {
  				if (skipDone) return "";
  				return onDone();
  			};
  			const content = this.callTap(i, {
  				onError: error => onError(i, error, done, doneBreak),
  				onResult:
  					onResult &&
  					(result => {
  						return onResult(i, result, done, doneBreak);
  					}),
  				onDone: !onResult && done,
  				rethrowIfPossible:
  					rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
  			});
  			current = () => content;
  		}
  		code += current();
  		return code;
  	}

  	callTapsLooping({ onError, onDone, rethrowIfPossible }) {
  		if (this.options.taps.length === 0) return onDone();
  		const syncOnly = this.options.taps.every(t => t.type === "sync");
  		let code = "";
  		if (!syncOnly) {
  			code += "var _looper = (function() {\n";
  			code += "var _loopAsync = false;\n";
  		}
  		code += "var _loop;\n";
  		code += "do {\n";
  		code += "_loop = false;\n";
  		for (let i = 0; i < this.options.interceptors.length; i++) {
  			const interceptor = this.options.interceptors[i];
  			if (interceptor.loop) {
  				code += `${this.getInterceptor(i)}.loop(${this.args({
					before: interceptor.context ? "_context" : undefined
				})});\n`;
  			}
  		}
  		code += this.callTapsSeries({
  			onError,
  			onResult: (i, result, next, doneBreak) => {
  				let code = "";
  				code += `if(${result} !== undefined) {\n`;
  				code += "_loop = true;\n";
  				if (!syncOnly) code += "if(_loopAsync) _looper();\n";
  				code += doneBreak(true);
  				code += `} else {\n`;
  				code += next();
  				code += `}\n`;
  				return code;
  			},
  			onDone:
  				onDone &&
  				(() => {
  					let code = "";
  					code += "if(!_loop) {\n";
  					code += onDone();
  					code += "}\n";
  					return code;
  				}),
  			rethrowIfPossible: rethrowIfPossible && syncOnly
  		});
  		code += "} while(_loop);\n";
  		if (!syncOnly) {
  			code += "_loopAsync = true;\n";
  			code += "});\n";
  			code += "_looper();\n";
  		}
  		return code;
  	}

  	callTapsParallel({
  		onError,
  		onResult,
  		onDone,
  		rethrowIfPossible,
  		onTap = (i, run) => run()
  	}) {
  		if (this.options.taps.length <= 1) {
  			return this.callTapsSeries({
  				onError,
  				onResult,
  				onDone,
  				rethrowIfPossible
  			});
  		}
  		let code = "";
  		code += "do {\n";
  		code += `var _counter = ${this.options.taps.length};\n`;
  		if (onDone) {
  			code += "var _done = (function() {\n";
  			code += onDone();
  			code += "});\n";
  		}
  		for (let i = 0; i < this.options.taps.length; i++) {
  			const done = () => {
  				if (onDone) return "if(--_counter === 0) _done();\n";
  				else return "--_counter;";
  			};
  			const doneBreak = skipDone => {
  				if (skipDone || !onDone) return "_counter = 0;\n";
  				else return "_counter = 0;\n_done();\n";
  			};
  			code += "if(_counter <= 0) break;\n";
  			code += onTap(
  				i,
  				() =>
  					this.callTap(i, {
  						onError: error => {
  							let code = "";
  							code += "if(_counter > 0) {\n";
  							code += onError(i, error, done, doneBreak);
  							code += "}\n";
  							return code;
  						},
  						onResult:
  							onResult &&
  							(result => {
  								let code = "";
  								code += "if(_counter > 0) {\n";
  								code += onResult(i, result, done, doneBreak);
  								code += "}\n";
  								return code;
  							}),
  						onDone:
  							!onResult &&
  							(() => {
  								return done();
  							}),
  						rethrowIfPossible
  					}),
  				done,
  				doneBreak
  			);
  		}
  		code += "} while(false);\n";
  		return code;
  	}

  	args({ before, after } = {}) {
  		let allArgs = this._args;
  		if (before) allArgs = [before].concat(allArgs);
  		if (after) allArgs = allArgs.concat(after);
  		if (allArgs.length === 0) {
  			return "";
  		} else {
  			return allArgs.join(", ");
  		}
  	}

  	getTapFn(idx) {
  		return `_x[${idx}]`;
  	}

  	getTap(idx) {
  		return `_taps[${idx}]`;
  	}

  	getInterceptor(idx) {
  		return `_interceptors[${idx}]`;
  	}
  }

  var HookCodeFactory_1 = HookCodeFactory;

  class SyncHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onDone, rethrowIfPossible }) {
  		return this.callTapsSeries({
  			onError: (i, err) => onError(err),
  			onDone,
  			rethrowIfPossible
  		});
  	}
  }

  const factory$9 = new SyncHookCodeFactory();

  const TAP_ASYNC$3 = () => {
  	throw new Error("tapAsync is not supported on a SyncHook");
  };

  const TAP_PROMISE$3 = () => {
  	throw new Error("tapPromise is not supported on a SyncHook");
  };

  const COMPILE$9 = function(options) {
  	factory$9.setup(this, options);
  	return factory$9.create(options);
  };

  function SyncHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = SyncHook;
  	hook.tapAsync = TAP_ASYNC$3;
  	hook.tapPromise = TAP_PROMISE$3;
  	hook.compile = COMPILE$9;
  	return hook;
  }

  SyncHook.prototype = null;

  var SyncHook_1 = SyncHook;

  class SyncBailHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onResult, resultReturns, onDone, rethrowIfPossible }) {
  		return this.callTapsSeries({
  			onError: (i, err) => onError(err),
  			onResult: (i, result, next) =>
  				`if(${result} !== undefined) {\n${onResult(
					result
				)};\n} else {\n${next()}}\n`,
  			resultReturns,
  			onDone,
  			rethrowIfPossible
  		});
  	}
  }

  const factory$8 = new SyncBailHookCodeFactory();

  const TAP_ASYNC$2 = () => {
  	throw new Error("tapAsync is not supported on a SyncBailHook");
  };

  const TAP_PROMISE$2 = () => {
  	throw new Error("tapPromise is not supported on a SyncBailHook");
  };

  const COMPILE$8 = function(options) {
  	factory$8.setup(this, options);
  	return factory$8.create(options);
  };

  function SyncBailHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = SyncBailHook;
  	hook.tapAsync = TAP_ASYNC$2;
  	hook.tapPromise = TAP_PROMISE$2;
  	hook.compile = COMPILE$8;
  	return hook;
  }

  SyncBailHook.prototype = null;

  var SyncBailHook_1 = SyncBailHook;

  class SyncWaterfallHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onResult, resultReturns, rethrowIfPossible }) {
  		return this.callTapsSeries({
  			onError: (i, err) => onError(err),
  			onResult: (i, result, next) => {
  				let code = "";
  				code += `if(${result} !== undefined) {\n`;
  				code += `${this._args[0]} = ${result};\n`;
  				code += `}\n`;
  				code += next();
  				return code;
  			},
  			onDone: () => onResult(this._args[0]),
  			doneReturns: resultReturns,
  			rethrowIfPossible
  		});
  	}
  }

  const factory$7 = new SyncWaterfallHookCodeFactory();

  const TAP_ASYNC$1 = () => {
  	throw new Error("tapAsync is not supported on a SyncWaterfallHook");
  };

  const TAP_PROMISE$1 = () => {
  	throw new Error("tapPromise is not supported on a SyncWaterfallHook");
  };

  const COMPILE$7 = function(options) {
  	factory$7.setup(this, options);
  	return factory$7.create(options);
  };

  function SyncWaterfallHook(args = [], name = undefined) {
  	if (args.length < 1)
  		throw new Error("Waterfall hooks must have at least one argument");
  	const hook = new Hook_1(args, name);
  	hook.constructor = SyncWaterfallHook;
  	hook.tapAsync = TAP_ASYNC$1;
  	hook.tapPromise = TAP_PROMISE$1;
  	hook.compile = COMPILE$7;
  	return hook;
  }

  SyncWaterfallHook.prototype = null;

  var SyncWaterfallHook_1 = SyncWaterfallHook;

  class SyncLoopHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onDone, rethrowIfPossible }) {
  		return this.callTapsLooping({
  			onError: (i, err) => onError(err),
  			onDone,
  			rethrowIfPossible
  		});
  	}
  }

  const factory$6 = new SyncLoopHookCodeFactory();

  const TAP_ASYNC = () => {
  	throw new Error("tapAsync is not supported on a SyncLoopHook");
  };

  const TAP_PROMISE = () => {
  	throw new Error("tapPromise is not supported on a SyncLoopHook");
  };

  const COMPILE$6 = function(options) {
  	factory$6.setup(this, options);
  	return factory$6.create(options);
  };

  function SyncLoopHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = SyncLoopHook;
  	hook.tapAsync = TAP_ASYNC;
  	hook.tapPromise = TAP_PROMISE;
  	hook.compile = COMPILE$6;
  	return hook;
  }

  SyncLoopHook.prototype = null;

  var SyncLoopHook_1 = SyncLoopHook;

  class AsyncParallelHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onDone }) {
  		return this.callTapsParallel({
  			onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
  			onDone
  		});
  	}
  }

  const factory$5 = new AsyncParallelHookCodeFactory();

  const COMPILE$5 = function(options) {
  	factory$5.setup(this, options);
  	return factory$5.create(options);
  };

  function AsyncParallelHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = AsyncParallelHook;
  	hook.compile = COMPILE$5;
  	hook._call = undefined;
  	hook.call = undefined;
  	return hook;
  }

  AsyncParallelHook.prototype = null;

  var AsyncParallelHook_1 = AsyncParallelHook;

  class AsyncParallelBailHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onResult, onDone }) {
  		let code = "";
  		code += `var _results = new Array(${this.options.taps.length});\n`;
  		code += "var _checkDone = function() {\n";
  		code += "for(var i = 0; i < _results.length; i++) {\n";
  		code += "var item = _results[i];\n";
  		code += "if(item === undefined) return false;\n";
  		code += "if(item.result !== undefined) {\n";
  		code += onResult("item.result");
  		code += "return true;\n";
  		code += "}\n";
  		code += "if(item.error) {\n";
  		code += onError("item.error");
  		code += "return true;\n";
  		code += "}\n";
  		code += "}\n";
  		code += "return false;\n";
  		code += "}\n";
  		code += this.callTapsParallel({
  			onError: (i, err, done, doneBreak) => {
  				let code = "";
  				code += `if(${i} < _results.length && ((_results.length = ${i +
					1}), (_results[${i}] = { error: ${err} }), _checkDone())) {\n`;
  				code += doneBreak(true);
  				code += "} else {\n";
  				code += done();
  				code += "}\n";
  				return code;
  			},
  			onResult: (i, result, done, doneBreak) => {
  				let code = "";
  				code += `if(${i} < _results.length && (${result} !== undefined && (_results.length = ${i +
					1}), (_results[${i}] = { result: ${result} }), _checkDone())) {\n`;
  				code += doneBreak(true);
  				code += "} else {\n";
  				code += done();
  				code += "}\n";
  				return code;
  			},
  			onTap: (i, run, done, doneBreak) => {
  				let code = "";
  				if (i > 0) {
  					code += `if(${i} >= _results.length) {\n`;
  					code += done();
  					code += "} else {\n";
  				}
  				code += run();
  				if (i > 0) code += "}\n";
  				return code;
  			},
  			onDone
  		});
  		return code;
  	}
  }

  const factory$4 = new AsyncParallelBailHookCodeFactory();

  const COMPILE$4 = function(options) {
  	factory$4.setup(this, options);
  	return factory$4.create(options);
  };

  function AsyncParallelBailHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = AsyncParallelBailHook;
  	hook.compile = COMPILE$4;
  	hook._call = undefined;
  	hook.call = undefined;
  	return hook;
  }

  AsyncParallelBailHook.prototype = null;

  var AsyncParallelBailHook_1 = AsyncParallelBailHook;

  class AsyncSeriesHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onDone }) {
  		return this.callTapsSeries({
  			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
  			onDone
  		});
  	}
  }

  const factory$3 = new AsyncSeriesHookCodeFactory();

  const COMPILE$3 = function(options) {
  	factory$3.setup(this, options);
  	return factory$3.create(options);
  };

  function AsyncSeriesHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = AsyncSeriesHook;
  	hook.compile = COMPILE$3;
  	hook._call = undefined;
  	hook.call = undefined;
  	return hook;
  }

  AsyncSeriesHook.prototype = null;

  var AsyncSeriesHook_1 = AsyncSeriesHook;

  class AsyncSeriesBailHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onResult, resultReturns, onDone }) {
  		return this.callTapsSeries({
  			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
  			onResult: (i, result, next) =>
  				`if(${result} !== undefined) {\n${onResult(
					result
				)}\n} else {\n${next()}}\n`,
  			resultReturns,
  			onDone
  		});
  	}
  }

  const factory$2 = new AsyncSeriesBailHookCodeFactory();

  const COMPILE$2 = function(options) {
  	factory$2.setup(this, options);
  	return factory$2.create(options);
  };

  function AsyncSeriesBailHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = AsyncSeriesBailHook;
  	hook.compile = COMPILE$2;
  	hook._call = undefined;
  	hook.call = undefined;
  	return hook;
  }

  AsyncSeriesBailHook.prototype = null;

  var AsyncSeriesBailHook_1 = AsyncSeriesBailHook;

  class AsyncSeriesLoopHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onDone }) {
  		return this.callTapsLooping({
  			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
  			onDone
  		});
  	}
  }

  const factory$1 = new AsyncSeriesLoopHookCodeFactory();

  const COMPILE$1 = function(options) {
  	factory$1.setup(this, options);
  	return factory$1.create(options);
  };

  function AsyncSeriesLoopHook(args = [], name = undefined) {
  	const hook = new Hook_1(args, name);
  	hook.constructor = AsyncSeriesLoopHook;
  	hook.compile = COMPILE$1;
  	hook._call = undefined;
  	hook.call = undefined;
  	return hook;
  }

  AsyncSeriesLoopHook.prototype = null;

  var AsyncSeriesLoopHook_1 = AsyncSeriesLoopHook;

  class AsyncSeriesWaterfallHookCodeFactory extends HookCodeFactory_1 {
  	content({ onError, onResult, onDone }) {
  		return this.callTapsSeries({
  			onError: (i, err, next, doneBreak) => onError(err) + doneBreak(true),
  			onResult: (i, result, next) => {
  				let code = "";
  				code += `if(${result} !== undefined) {\n`;
  				code += `${this._args[0]} = ${result};\n`;
  				code += `}\n`;
  				code += next();
  				return code;
  			},
  			onDone: () => onResult(this._args[0])
  		});
  	}
  }

  const factory = new AsyncSeriesWaterfallHookCodeFactory();

  const COMPILE = function(options) {
  	factory.setup(this, options);
  	return factory.create(options);
  };

  function AsyncSeriesWaterfallHook(args = [], name = undefined) {
  	if (args.length < 1)
  		throw new Error("Waterfall hooks must have at least one argument");
  	const hook = new Hook_1(args, name);
  	hook.constructor = AsyncSeriesWaterfallHook;
  	hook.compile = COMPILE;
  	hook._call = undefined;
  	hook.call = undefined;
  	return hook;
  }

  AsyncSeriesWaterfallHook.prototype = null;

  var AsyncSeriesWaterfallHook_1 = AsyncSeriesWaterfallHook;

  const defaultFactory = (key, hook) => hook;

  class HookMap {
  	constructor(factory, name = undefined) {
  		this._map = new Map();
  		this.name = name;
  		this._factory = factory;
  		this._interceptors = [];
  	}

  	get(key) {
  		return this._map.get(key);
  	}

  	for(key) {
  		const hook = this.get(key);
  		if (hook !== undefined) {
  			return hook;
  		}
  		let newHook = this._factory(key);
  		const interceptors = this._interceptors;
  		for (let i = 0; i < interceptors.length; i++) {
  			newHook = interceptors[i].factory(key, newHook);
  		}
  		this._map.set(key, newHook);
  		return newHook;
  	}

  	intercept(interceptor) {
  		this._interceptors.push(
  			Object.assign(
  				{
  					factory: defaultFactory
  				},
  				interceptor
  			)
  		);
  	}
  }

  HookMap.prototype.tap = util.deprecate(function(key, options, fn) {
  	return this.for(key).tap(options, fn);
  }, "HookMap#tap(key,…) is deprecated. Use HookMap#for(key).tap(…) instead.");

  HookMap.prototype.tapAsync = util.deprecate(function(key, options, fn) {
  	return this.for(key).tapAsync(options, fn);
  }, "HookMap#tapAsync(key,…) is deprecated. Use HookMap#for(key).tapAsync(…) instead.");

  HookMap.prototype.tapPromise = util.deprecate(function(key, options, fn) {
  	return this.for(key).tapPromise(options, fn);
  }, "HookMap#tapPromise(key,…) is deprecated. Use HookMap#for(key).tapPromise(…) instead.");

  var HookMap_1 = HookMap;

  class MultiHook {
  	constructor(hooks, name = undefined) {
  		this.hooks = hooks;
  		this.name = name;
  	}

  	tap(options, fn) {
  		for (const hook of this.hooks) {
  			hook.tap(options, fn);
  		}
  	}

  	tapAsync(options, fn) {
  		for (const hook of this.hooks) {
  			hook.tapAsync(options, fn);
  		}
  	}

  	tapPromise(options, fn) {
  		for (const hook of this.hooks) {
  			hook.tapPromise(options, fn);
  		}
  	}

  	isUsed() {
  		for (const hook of this.hooks) {
  			if (hook.isUsed()) return true;
  		}
  		return false;
  	}

  	intercept(interceptor) {
  		for (const hook of this.hooks) {
  			hook.intercept(interceptor);
  		}
  	}

  	withOptions(options) {
  		return new MultiHook(
  			this.hooks.map(h => h.withOptions(options)),
  			this.name
  		);
  	}
  }

  var MultiHook_1 = MultiHook;

  var lib = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.SyncHook = SyncHook_1;
  exports.SyncBailHook = SyncBailHook_1;
  exports.SyncWaterfallHook = SyncWaterfallHook_1;
  exports.SyncLoopHook = SyncLoopHook_1;
  exports.AsyncParallelHook = AsyncParallelHook_1;
  exports.AsyncParallelBailHook = AsyncParallelBailHook_1;
  exports.AsyncSeriesHook = AsyncSeriesHook_1;
  exports.AsyncSeriesBailHook = AsyncSeriesBailHook_1;
  exports.AsyncSeriesLoopHook = AsyncSeriesLoopHook_1;
  exports.AsyncSeriesWaterfallHook = AsyncSeriesWaterfallHook_1;
  exports.HookMap = HookMap_1;
  exports.MultiHook = MultiHook_1;
  });

  /*
   * @description: TapableHookFactory
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-28 16:00:00
   * @lastEditors: brisky
   * @lastEditTime: 2021-05-31 20:18:41
   */
  class TapableHookFactory {
      option;
      constructor(option) {
          ___default.merge(this.option = option);
      }
      /**
       * 根据配置创建hook实例
       * @returns
       */
      createHookInstance() {
          const { option } = this;
          let hook = null;
          let args = [];
          if (!Array.isArray(option.args)) {
              for (let i = 0; i < option.args; i++) {
                  args.push(`args${i}`);
              }
          }
          else {
              args = option.args;
          }
          const name = `${option.prefix}-${option.name}-${option.suffix}`;
          const isAsync = option.name.includes('async.');
          switch (option.hookType) {
              case exports.TapableHookType.Bail:
                  //@ts-ignore
                  hook = isAsync ? new lib.AsyncSeriesBailHook(args, name) : new lib.SyncBailHook(args, name);
                  break;
              case exports.TapableHookType.Waterfall:
                  //@ts-ignore
                  hook = isAsync ? new lib.AsyncSeriesWaterfallHook(args, name) : new lib.SyncWaterfallHook(args, name);
                  break;
              case exports.TapableHookType.Loop:
                  //@ts-ignore
                  hook = isAsync ? new lib.AsyncSeriesLoopHook(args, name) : new lib.SyncLoopHook(args, name);
                  break;
              default:
                  //@ts-ignore
                  hook = isAsync ? new lib.AsyncSeriesHook(args, name) : new lib.SyncHook(args, name);
                  break;
          }
          ___default.merge(hook, {
              isAsync,
              name: option.name,
              key: name,
              matchObject: option.matchObject || {}
          });
          return hook;
      }
      /**
       * 创建钩子
       * @returns
       */
      createHook() {
          const { option } = this;
          const hook = this.createHookInstance();
          const interceptOpt = Object.assign({}, option.interceptOpt || {}, { context: option.context });
          hook.intercept(interceptOpt);
          if (!Array.isArray(option.callBack) && option.callBack) {
              option.callBack = [option.callBack];
          }
          if (!option.callBack) {
              option.callBack = [];
          }
          option.callBack.forEach((_callback) => {
              hook.isAsync ? hook.tapPromise(hook.key, _callback) : hook.tap(hook.key, _callback);
          });
          return hook;
      }
  }

  /*
   * @description: EventBusServcie
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-28 15:59:42
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-10 22:34:31
   */
  class EventBusService {
      $dataCheck;
      baseHookOpt = {
          name: 'event',
          prefix: 'prefix',
          suffix: 'suffix'
      };
      eventStore = {};
      constructor() {
          this.$dataCheck = new DataCheck();
      }
      /**
       * 设置监听
       * @param option
       * @param fn
       */
      $on(option, fn) {
          const { $dataCheck, baseHookOpt } = this;
          if (!fn) {
              console.warn(`[@brisky/evnetbus] $on:至少需要一个回调函数`);
          }
          if ($dataCheck.$isFunction(fn)) {
              fn = [fn];
          }
          let opt;
          if ($dataCheck.$isString(option)) {
              opt = {
                  name: option,
                  prefix: baseHookOpt.prefix,
                  suffix: baseHookOpt.suffix,
                  callBack: fn,
                  args: 10
              };
          }
          else {
              opt = option;
              !opt.name && (opt.name = baseHookOpt.name);
              !opt.prefix && (opt.prefix = baseHookOpt.prefix);
              !opt.suffix && (opt.suffix = baseHookOpt.suffix);
              !opt.args && (opt.args = 10);
              opt.callBack = fn;
          }
          let hook = this.getHook(opt);
          if (hook.length > 0) {
              opt.callBack.forEach(_callback => {
                  hook.forEach(_hook => {
                      this.newTap(_hook, _callback);
                  });
              });
          }
          else {
              hook = new TapableHookFactory(opt).createHook();
              this.setHook(hook);
          }
      }
      /**
       * 触发事件
       */
      async $emit(option, ...params) {
          const { $dataCheck } = this;
          if ($dataCheck.$isString(option)) {
              option = {
                  name: option,
              };
          }
          const hooks = this.getHookByBaseOpt(option);
          const hookCalls = [];
          hooks.forEach((_hook) => {
              const { hook } = _hook;
              const isAsync = hook.isAsync;
              hookCalls.push(!isAsync ? hook.call(...params) : hook.promise(...params));
          });
          return Promise.all(hookCalls);
      }
      /**
      * 新增钩子注册
      * @param isAsync
      * @param hook
      * @param callBack
      * @returns
      */
      newTap(hook, callBack) {
          hook.isAsync ? hook.tapPromise(hook.key, callBack) : hook.tap(hook.key, callBack);
          return hook;
      }
      /**
       * 获取hook,根据key值，注册事件使用
       * @param option
       * @returns
       */
      getHook(option) {
          const { eventStore } = this;
          const { name, prefix, suffix } = option;
          const key = `${prefix}-${name}-${suffix}`;
          const eventStoreArray = Object.values(eventStore).flat() || [];
          return eventStoreArray.filter((i) => {
              return i.key == key;
          }) || [];
      }
      /**
       * 获取hook,根据key值，触发事件使用
       * @param option
       */
      getHookByBaseOpt(option) {
          const { eventStore, $dataCheck } = this;
          const { name, prefix, suffix, matchObject } = option;
          const key = `${prefix}-${name}-${suffix}`;
          const eventStoreArray = Object.values(eventStore).flat() || [];
          const _eventStore = eventStoreArray.filter((s) => {
              let flag = true;
              for (const mKey in matchObject) {
                  let match = matchObject[mKey];
                  if ($dataCheck.$isString(match)) {
                      match = match.split(',');
                      const sValue = (s[mKey] || '').split(',');
                      const idx = match.findIndex((m) => {
                          return sValue.indexOf(m) > -1;
                      });
                      flag = flag && idx > -1;
                  }
                  else {
                      flag = flag && s[mKey] === match;
                  }
              }
              return flag;
          });
          if (!name) {
              return _eventStore;
          }
          return _eventStore.filter((i) => {
              return !(prefix && suffix) ? i.name === name : i.key === key;
          }) || [];
      }
      /**
       * 设置hook
       * @param hook
       * @param option
       */
      setHook(hook) {
          const { eventStore = {} } = this;
          const { name, key, matchObject = {} } = hook;
          if (!eventStore[name]) {
              eventStore[name] = [];
          }
          const len = eventStore[name].filter((i) => { return i.key === key; }).length;
          if (len > 0) {
              return;
          }
          eventStore[name].push({
              name,
              key,
              ...matchObject,
              hook
          });
      }
  }

  exports.EventBusService = EventBusService;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
