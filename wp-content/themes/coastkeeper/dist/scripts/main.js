/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/coastkeeper/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rtl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetYoDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return transitionend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




// Core Foundation Utilities, utilized in a number of places.

  /**
   * Returns a boolean for RTL support
   */
function rtl() {
  return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').attr('dir') === 'rtl';
}

/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
function GetYoDigits(length, namespace){
  length = length || 6;
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (namespace ? ("-" + namespace) : '');
}

function transitionend($elem){
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  };
  var elem = document.createElement('div'),
      end;

  for (var t in transitions){
    if (typeof elem.style[t] !== 'undefined'){
      end = transitions[t];
    }
  }
  if(end){
    return end;
  }else{
    end = setTimeout(function(){
      $elem.triggerHandler('transitionend', [$elem]);
    }, 1);
    return 'transitionend';
  }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);





// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
var Plugin = function Plugin(element, options) {
  this._setup(element, options);
  var pluginName = getPluginName(this);
  this.uuid = Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* GetYoDigits */])(6, pluginName);

  if(!this.$element.attr(("data-" + pluginName))){ this.$element.attr(("data-" + pluginName), this.uuid); }
  if(!this.$element.data('zfPlugin')){ this.$element.data('zfPlugin', this); }
  /**
   * Fires when the plugin has initialized.
   * @event Plugin#init
   */
  this.$element.trigger(("init.zf." + pluginName));
};

Plugin.prototype.destroy = function destroy () {
    var this$1 = this;

  this._destroy();
  var pluginName = getPluginName(this);
  this.$element.removeAttr(("data-" + pluginName)).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger(("destroyed.zf." + pluginName));
  for(var prop in this$1){
    this$1[prop] = null;//clean up script to prep for garbage collection.
  }
};

// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getPluginName(obj) {
  if(typeof(obj.constructor.name) !== 'undefined') {
    return hyphenate(obj.constructor.name);
  } else {
    return hyphenate(obj.className);
  }
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




// Default set of media queries
var defaultQueries = {
  'default' : 'only screen',
  landscape : 'only screen and (orientation: landscape)',
  portrait : 'only screen and (orientation: portrait)',
  retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
    'only screen and (min--moz-device-pixel-ratio: 2),' +
    'only screen and (-o-min-device-pixel-ratio: 2/1),' +
    'only screen and (min-device-pixel-ratio: 2),' +
    'only screen and (min-resolution: 192dpi),' +
    'only screen and (min-resolution: 2dppx)'
  };


// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
var matchMedia = window.matchMedia || (function() {
  'use strict';

  // For browsers that support matchMedium api such as IE 9 and webkit
  var styleMedia = (window.styleMedia || window.media);

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style   = document.createElement('style'),
    script      = document.getElementsByTagName('script')[0],
    info        = null;

    style.type  = 'text/css';
    style.id    = 'matchmediajs-test';

    script && script.parentNode && script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium: function matchMedium(media) {
        var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    }
  }

  return function(media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  }
})();

var MediaQuery = {
  queries: [],

  current: '',

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init: function _init() {
    var self = this;
    var $meta = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('meta.foundation-mq');
    if(!$meta.length){
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<meta class="foundation-mq">').appendTo(document.head);
    }

    var extractedStyles = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.foundation-mq').css('font-family');
    var namedQueries;

    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      if(namedQueries.hasOwnProperty(key)) {
        self.queries.push({
          name: key,
          value: ("only screen and (min-width: " + (namedQueries[key]) + ")")
        });
      }
    }

    this.current = this._getCurrentSize();

    this._watcher();
  },

  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast: function atLeast(size) {
    var query = this.get(size);

    if (query) {
      return matchMedia(query).matches;
    }

    return false;
  },

  /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
  is: function is(size) {
    size = size.trim().split(' ');
    if(size.length > 1 && size[1] === 'only') {
      if(size[0] === this._getCurrentSize()) { return true; }
    } else {
      return this.atLeast(size[0]);
    }
    return false;
  },

  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get: function get(size) {
    var this$1 = this;

    for (var i in this$1.queries) {
      if(this$1.queries.hasOwnProperty(i)) {
        var query = this$1.queries[i];
        if (size === query.name) { return query.value; }
      }
    }

    return null;
  },

  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize: function _getCurrentSize() {
    var this$1 = this;

    var matched;

    for (var i = 0; i < this.queries.length; i++) {
      var query = this$1.queries[i];

      if (matchMedia(query.value).matches) {
        matched = query;
      }
    }

    if (typeof matched === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },

  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher: function _watcher() {
    var this$1 = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
      var newSize = this$1._getCurrentSize(), currentSize = this$1.current;

      if (newSize !== currentSize) {
        // Change the current media query
        this$1.current = newSize;

        // Broadcast the media query change on the window
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
      }
    });
  }
};



// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str) {
  var styleObject = {};

  if (typeof str !== 'string') {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split('&').reduce(function(ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});

  return styleObject;
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keyboard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/






var keyCodes = {
  9: 'TAB',
  13: 'ENTER',
  27: 'ESCAPE',
  32: 'SPACE',
  35: 'END',
  36: 'HOME',
  37: 'ARROW_LEFT',
  38: 'ARROW_UP',
  39: 'ARROW_RIGHT',
  40: 'ARROW_DOWN'
}

var commands = {}

// Functions pulled out to be referenceable from internals
function findFocusable($element) {
  if(!$element) {return false; }
  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function() {
    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':visible') || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('tabindex') < 0) { return false; } //only have visible elements and those that have a tabindex greater or equal 0
    return true;
  });
}

function parseKey(event) {
  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

  // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
  key = key.replace(/\W+/, '');

  if (event.shiftKey) { key = "SHIFT_" + key; }
  if (event.ctrlKey) { key = "CTRL_" + key; }
  if (event.altKey) { key = "ALT_" + key; }

  // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
  key = key.replace(/_$/, '');

  return key;
}

var Keyboard = {
  keys: getKeyCodes(keyCodes),

  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey: parseKey,

  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey: function handleKey(event, component, functions) {
    var commandList = commands[component],
      keyCode = this.parseKey(event),
      cmds,
      command,
      fn;

    if (!commandList) { return console.warn('Component not defined!'); }

    if (typeof commandList.ltr === 'undefined') { // this component does not differentiate between ltr and rtl
        cmds = commandList; // use plain list
    } else { // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
        if (Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* rtl */])()) { cmds = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, commandList.ltr, commandList.rtl); }

        else { cmds = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, commandList.rtl, commandList.ltr); }
    }
    command = cmds[keyCode];

    fn = functions[command];
    if (fn && typeof fn === 'function') { // execute function  if exists
      var returnValue = fn.apply();
      if (functions.handled || typeof functions.handled === 'function') { // execute function when event was handled
          functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === 'function') { // execute function when event was not handled
          functions.unhandled();
      }
    }
  },

  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */

  findFocusable: findFocusable,

  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */

  register: function register(componentName, cmds) {
    commands[componentName] = cmds;
  },


  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
  //
  /**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
  trapFocus: function trapFocus($element) {
    var $focusable = findFocusable($element),
        $firstFocusable = $focusable.eq(0),
        $lastFocusable = $focusable.eq(-1);

    $element.on('keydown.zf.trapfocus', function(event) {
      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
        event.preventDefault();
        $firstFocusable.focus();
      }
      else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
        event.preventDefault();
        $lastFocusable.focus();
      }
    });
  },
  /**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
  releaseFocus: function releaseFocus($element) {
    $element.off('keydown.zf.trapfocus');
  }
}

/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */
function getKeyCodes(kcs) {
  var k = {};
  for (var kc in kcs) { k[kcs[kc]] = kcs[kc]; }
  return k;
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Triggers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__ = __webpack_require__(6);





var MutationObserver = (function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for (var i=0; i < prefixes.length; i++) {
    if (((prefixes[i]) + "MutationObserver") in window) {
      return window[((prefixes[i]) + "MutationObserver")];
    }
  }
  return false;
}());

var triggers = function (el, type) {
  el.data(type).split(' ').forEach(function (id) {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + id))[ type === 'close' ? 'trigger' : 'triggerHandler']((type + ".zf.trigger"), [el]);
  });
};

var Triggers = {
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
}

Triggers.Listeners.Basic  = {
  openListener: function() {
    triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'open');
  },
  closeListener: function() {
    var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('close');
    if (id) {
      triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'close');
    }
    else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('close.zf.trigger');
    }
  },
  toggleListener: function() {
    var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');
    if (id) {
      triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'toggle');
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('toggle.zf.trigger');
    }
  },
  closeableListener: function(e) {
    e.stopPropagation();
    var animation = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('closable');

    if(animation !== ''){
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateOut(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), animation, function() {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('closed.zf');
      });
    }else{
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).fadeOut().trigger('closed.zf');
    }
  },
  toggleFocusListener: function() {
    var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle-focus');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + id)).triggerHandler('toggle.zf.trigger', [__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)]);
  }
};

// Elements with [data-open] will reveal a plugin that supports it when clicked.
Triggers.Initializers.addOpenListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
}

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
Triggers.Initializers.addCloseListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
}

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
Triggers.Initializers.addToggleListener = function ($elem) {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
}

// Elements with [data-closable] will respond to close.zf.trigger events.
Triggers.Initializers.addCloseableListener = function ($elem) {
  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
}

// Elements with [data-toggle-focus] will respond to coming in and out of focus
Triggers.Initializers.addToggleFocusListener = function ($elem) {
  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
}



// More Global/complex listeners and triggers
Triggers.Listeners.Global  = {
  resizeListener: function($nodes) {
    if(!MutationObserver){//fallback for IE 9
      $nodes.each(function(){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('resizeme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a resize event
    $nodes.attr('data-events', "resize");
  },
  scrollListener: function($nodes) {
    if(!MutationObserver){//fallback for IE 9
      $nodes.each(function(){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('scrollme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a scroll event
    $nodes.attr('data-events', "scroll");
  },
  closeMeListener: function(e, pluginId){
    var plugin = e.namespace.split('.')[0];
    var plugins = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-" + plugin + "]")).not(("[data-yeti-box=\"" + pluginId + "\"]"));

    plugins.each(function(){
      var _this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      _this.triggerHandler('close.zf.trigger', [_this]);
    });
  }
}

// Global, parses whole document.
Triggers.Initializers.addClosemeListener = function(pluginName) {
  var yetiBoxes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-yeti-box]'),
      plugNames = ['dropdown', 'tooltip', 'reveal'];

  if(pluginName){
    if(typeof pluginName === 'string'){
      plugNames.push(pluginName);
    }else if(typeof pluginName === 'object' && typeof pluginName[0] === 'string'){
      plugNames.concat(pluginName);
    }else{
      console.error('Plugin names must be strings');
    }
  }
  if(yetiBoxes.length){
    var listeners = plugNames.map(function (name) {
      return ("closeme.zf." + name);
    }).join(' ');

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
  }
}

function debounceGlobalListener(debounce, trigger, listener) {
  var timer, args = Array.prototype.slice.call(arguments, 3);
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(trigger).on(trigger, function(e) {
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(function(){
      listener.apply(null, args);
    }, debounce || 10);//default time to emit scroll event
  });
}

Triggers.Initializers.addResizeListener = function(debounce){
  var $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-resize]');
  if($nodes.length){
    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
  }
}

Triggers.Initializers.addScrollListener = function(debounce){
  var $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-scroll]');
  if($nodes.length){
    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
  }
}

Triggers.Initializers.addMutationEventsListener = function($elem) {
  if(!MutationObserver){ return false; }
  var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]');

  //element callback
  var listeningElementsMutation = function (mutationRecordsList) {
    var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(mutationRecordsList[0].target);

    //trigger the event handler for the element depending on type
    switch (mutationRecordsList[0].type) {
      case "attributes":
        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
        }
        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('resizeme.zf.trigger', [$target]);
         }
        if (mutationRecordsList[0].attributeName === "style") {
          $target.closest("[data-mutate]").attr("data-events","mutate");
          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        }
        break;

      case "childList":
        $target.closest("[data-mutate]").attr("data-events","mutate");
        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        break;

      default:
        return false;
      //nothing
    }
  };

  if ($nodes.length) {
    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
    for (var i = 0; i <= $nodes.length - 1; i++) {
      var elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
    }
  }
}

Triggers.Initializers.addSimpleListeners = function() {
  var $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);

  Triggers.Initializers.addOpenListener($document);
  Triggers.Initializers.addCloseListener($document);
  Triggers.Initializers.addToggleListener($document);
  Triggers.Initializers.addCloseableListener($document);
  Triggers.Initializers.addToggleFocusListener($document);

}

Triggers.Initializers.addGlobalListeners = function() {
  var $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);
  Triggers.Initializers.addMutationEventsListener($document);
  Triggers.Initializers.addResizeListener();
  Triggers.Initializers.addScrollListener();
  Triggers.Initializers.addClosemeListener();
}


Triggers.init = function($, Foundation) {
  if (typeof($.triggersInitialized) === 'undefined') {
    var $document = $(document);

    if(document.readyState === "complete") {
      Triggers.Initializers.addSimpleListeners();
      Triggers.Initializers.addGlobalListeners();
    } else {
      $(window).on('load', function () {
        Triggers.Initializers.addSimpleListeners();
        Triggers.Initializers.addGlobalListeners();
      });
    }


    $.triggersInitialized = true;
  }

  if(Foundation) {
    Foundation.Triggers = Triggers;
    // Legacy included to be backwards compatible for now.
    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners
  }
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Motion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);





/**
 * Motion module.
 * @module foundation.motion
 */

var initClasses   = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];

var Motion = {
  animateIn: function(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function(element, animation, cb) {
    animate(false, element, animation, cb);
  }
}

function Move(duration, elem, fn){
  var anim, prog, start = null;
  // console.log('called');

  if (duration === 0) {
    fn.apply(elem);
    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    return;
  }

  function move(ts){
    if(!start) { start = ts; }
    // console.log(start, ts);
    prog = ts - start;
    fn.apply(elem);

    if(prog < duration){ anim = window.requestAnimationFrame(move, elem); }
    else{
      window.cancelAnimationFrame(anim);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    }
  }
  anim = window.requestAnimationFrame(move);
}

/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */
function animate(isIn, element, animation, cb) {
  element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).eq(0);

  if (!element.length) { return; }

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();

  element
    .addClass(animation)
    .css('transition', 'none');

  requestAnimationFrame(function () {
    element.addClass(initClass);
    if (isIn) { element.show(); }
  });

  // Start the animation
  requestAnimationFrame(function () {
    element[0].offsetWidth;
    element
      .css('transition', '')
      .addClass(activeClass);
  });

  // Clean up the animation when it finishes
  element.one(Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["c" /* transitionend */])(element), finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) { element.hide(); }
    reset();
    if (cb) { cb.apply(element); }
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass((initClass + " " + activeClass + " " + animation));
  }
}





/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Box; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_util_core__ = __webpack_require__(1);





var Box = {
  ImNotTouchingYou: ImNotTouchingYou,
  OverlapArea: OverlapArea,
  GetDimensions: GetDimensions,
  GetOffsets: GetOffsets,
  GetExplicitOffsets: GetExplicitOffsets
}

/**
 * Compares the dimensions of an element to a container and determines collision events with container.
 * @function
 * @param {jQuery} element - jQuery object to test for collisions.
 * @param {jQuery} parent - jQuery object to use as bounding container.
 * @param {Boolean} lrOnly - set to true to check left and right values only.
 * @param {Boolean} tbOnly - set to true to check top and bottom values only.
 * @default if no parent object passed, detects collisions with `window`.
 * @returns {Boolean} - true if collision free, false if a collision in any direction.
 */
function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
};

function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
  var eleDims = GetDimensions(element),
  topOver, bottomOver, leftOver, rightOver;
  if (parent) {
    var parDims = GetDimensions(parent);

    bottomOver = (parDims.height + parDims.offset.top) - (eleDims.offset.top + eleDims.height);
    topOver    = eleDims.offset.top - parDims.offset.top;
    leftOver   = eleDims.offset.left - parDims.offset.left;
    rightOver  = (parDims.width + parDims.offset.left) - (eleDims.offset.left + eleDims.width);
  }
  else {
    bottomOver = (eleDims.windowDims.height + eleDims.windowDims.offset.top) - (eleDims.offset.top + eleDims.height);
    topOver    = eleDims.offset.top - eleDims.windowDims.offset.top;
    leftOver   = eleDims.offset.left - eleDims.windowDims.offset.left;
    rightOver  = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
  }

  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
  topOver    = Math.min(topOver, 0);
  leftOver   = Math.min(leftOver, 0);
  rightOver  = Math.min(rightOver, 0);

  if (lrOnly) {
    return leftOver + rightOver;
  }
  if (tbOnly) {
    return topOver + bottomOver;
  }

  // use sum of squares b/c we care about overlap area.
  return Math.sqrt((topOver * topOver) + (bottomOver * bottomOver) + (leftOver * leftOver) + (rightOver * rightOver));
}

/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */
function GetDimensions(elem){
  elem = elem.length ? elem[0] : elem;

  if (elem === window || elem === document) {
    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
  }

  var rect = elem.getBoundingClientRect(),
      parRect = elem.parentNode.getBoundingClientRect(),
      winRect = document.body.getBoundingClientRect(),
      winY = window.pageYOffset,
      winX = window.pageXOffset;

  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
        left: winX
      }
    }
  }
}

/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
 * you don't know alignment, but generally from
 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */
function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
  console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");
  switch (position) {
    case 'top':
      return Object(__WEBPACK_IMPORTED_MODULE_0__foundation_util_core__["b" /* rtl */])() ?
        GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) :
        GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);
    case 'bottom':
      return Object(__WEBPACK_IMPORTED_MODULE_0__foundation_util_core__["b" /* rtl */])() ?
        GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) :
        GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    case 'center top':
      return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);
    case 'center bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);
    case 'center left':
      return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);
    case 'center right':
      return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);
    case 'left bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);
    case 'right bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    // Backwards compatibility... this along with the reveal and reveal full
    // classes are the only ones that didn't reference anchor
    case 'center':
      return {
        left: ($eleDims.windowDims.offset.left + ($eleDims.windowDims.width / 2)) - ($eleDims.width / 2) + hOffset,
        top: ($eleDims.windowDims.offset.top + ($eleDims.windowDims.height / 2)) - ($eleDims.height / 2 + vOffset)
      }
    case 'reveal':
      return {
        left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
        top: $eleDims.windowDims.offset.top + vOffset
      }
    case 'reveal full':
      return {
        left: $eleDims.windowDims.offset.left,
        top: $eleDims.windowDims.offset.top
      }
      break;
    default:
      return {
        left: (Object(__WEBPACK_IMPORTED_MODULE_0__foundation_util_core__["b" /* rtl */])() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset: $anchorDims.offset.left + hOffset),
        top: $anchorDims.offset.top + $anchorDims.height + vOffset
      }

  }

}

function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
  var $eleDims = GetDimensions(element),
      $anchorDims = anchor ? GetDimensions(anchor) : null;

      var topVal, leftVal;

  // set position related attribute

  switch (position) {
    case 'top':
      topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
      break;
    case 'bottom':
      topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
      break;
    case 'left':
      leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
      break;
    case 'right':
      leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
      break;
  }


  // set alignment related attribute
  switch (position) {
    case 'top':
    case 'bottom':
      switch (alignment) {
        case 'left':
          leftVal = $anchorDims.offset.left + hOffset;
          break;
        case 'right':
          leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
          break;
        case 'center':
          leftVal = isOverflow ? hOffset : (($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2)) + hOffset;
          break;
      }
      break;
    case 'right':
    case 'left':
      switch (alignment) {
        case 'bottom':
          topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
          break;
        case 'top':
          topVal = $anchorDims.offset.top + vOffset
          break;
        case 'center':
          topVal = ($anchorDims.offset.top + vOffset + ($anchorDims.height / 2)) - ($eleDims.height / 2)
          break;
      }
      break;
  }
  return {top: topVal, left: leftVal};
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onImagesLoaded; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */
function onImagesLoaded(images, callback){
  var self = this,
      unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  images.each(function(){
    // Check if image is loaded
    if (this.complete && this.naturalWidth !== undefined) {
      singleImageLoaded();
    }
    else {
      // If the above check failed, simulate loading on detached element.
      var image = new Image();
      // Still count image as loaded if it finalizes with an error.
      var events = "load.zf.images error.zf.images";
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(image).one(events, function me(event){
        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off(events, me);
        singleImageLoaded();
      });
      image.src = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src');
    }
  });

  function singleImageLoaded() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  }
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Nest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




var Nest = {
  Feather: function Feather(menu, type) {
    if ( type === void 0 ) type = 'zf';

    menu.attr('role', 'menubar');

    var items = menu.find('li').attr({'role': 'menuitem'}),
        subMenuClass = "is-" + type + "-submenu",
        subItemClass = subMenuClass + "-item",
        hasSubClass = "is-" + type + "-submenu-parent",
        applyAria = (type !== 'accordion'); // Accordions handle their own ARIA attriutes.

    items.each(function() {
      var $item = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item.addClass(hasSubClass);
        $sub.addClass(("submenu " + subMenuClass)).attr({'data-submenu': ''});
        if(applyAria) {
          $item.attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
          });
          // Note:  Drilldowns behave differently in how they hide, and so need
          // additional attributes.  We should look if this possibly over-generalized
          // utility (Nest) is appropriate when we rework menus in 6.4
          if(type === 'drilldown') {
            $item.attr({'aria-expanded': false});
          }
        }
        $sub
          .addClass(("submenu " + subMenuClass))
          .attr({
            'data-submenu': '',
            'role': 'menu'
          });
        if(type === 'drilldown') {
          $sub.attr({'aria-hidden': true});
        }
      }

      if ($item.parent('[data-submenu]').length) {
        $item.addClass(("is-submenu-item " + subItemClass));
      }
    });

    return;
  },

  Burn: function Burn(menu, type) {
    var //items = menu.find('li'),
        subMenuClass = "is-" + type + "-submenu",
        subItemClass = subMenuClass + "-item",
        hasSubClass = "is-" + type + "-submenu-parent";

    menu
      .find('>li, .menu, .menu > li')
      .removeClass((subMenuClass + " " + subItemClass + " " + hasSubClass + " is-submenu-item submenu is-active"))
      .removeAttr('data-submenu').css('display', '');

  }
}




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Touch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************



var Touch = {};

var startPosX,
    startPosY,
    startTime,
    elapsedTime,
    isMoving = false;

function onTouchEnd() {
  //  alert(this);
  this.removeEventListener('touchmove', onTouchMove);
  this.removeEventListener('touchend', onTouchEnd);
  isMoving = false;
}

function onTouchMove(e) {
  if (__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.preventDefault) { e.preventDefault(); }
  if(isMoving) {
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    var dx = startPosX - x;
    var dy = startPosY - y;
    var dir;
    elapsedTime = new Date().getTime() - startTime;
    if(Math.abs(dx) >= __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.moveThreshold && elapsedTime <= __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.timeThreshold) {
      dir = dx > 0 ? 'left' : 'right';
    }
    // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
    //   dir = dy > 0 ? 'down' : 'up';
    // }
    if(dir) {
      e.preventDefault();
      onTouchEnd.call(this);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('swipe', dir).trigger(("swipe" + dir));
    }
  }
}

function onTouchStart(e) {
  if (e.touches.length == 1) {
    startPosX = e.touches[0].pageX;
    startPosY = e.touches[0].pageY;
    isMoving = true;
    startTime = new Date().getTime();
    this.addEventListener('touchmove', onTouchMove, false);
    this.addEventListener('touchend', onTouchEnd, false);
  }
}

function init() {
  this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
}

function teardown() {
  this.removeEventListener('touchstart', onTouchStart);
}

var SpotSwipe = function SpotSwipe($) {
  this.version = '1.0.0';
  this.enabled = 'ontouchstart' in document.documentElement;
  this.preventDefault = false;
  this.moveThreshold = 75;
  this.timeThreshold = 200;
  this.$ = $;
  this._init();
};

SpotSwipe.prototype._init = function _init () {
  var $ = this.$;
  $.event.special.swipe = { setup: init };

  $.each(['left', 'up', 'down', 'right'], function () {
    $.event.special[("swipe" + (this))] = { setup: function(){
      $(this).on('swipe', $.noop);
    } };
  });
};

/****************************************************
 * As far as I can tell, both setupSpotSwipe and    *
 * setupTouchHandler should be idempotent,          *
 * because they directly replace functions &        *
 * values, and do not add event handlers directly.  *
 ****************************************************/

Touch.setupSpotSwipe = function($) {
  $.spotSwipe = new SpotSwipe($);
};

/****************************************************
 * Method for adding pseudo drag events to elements *
 ***************************************************/
Touch.setupTouchHandler = function($) {
  $.fn.addTouch = function(){
    this.each(function(i,el){
      $(el).bind('touchstart touchmove touchend touchcancel',function(){
        //we pass the original event object because the jQuery event
        //object is normalized to w3c specs and does not provide the TouchList
        handleTouch(event);
      });
    });

    var handleTouch = function(event){
      var touches = event.changedTouches,
          first = touches[0],
          eventTypes = {
            touchstart: 'mousedown',
            touchmove: 'mousemove',
            touchend: 'mouseup'
          },
          type = eventTypes[event.type],
          simulatedEvent
        ;

      if('MouseEvent' in window && typeof window.MouseEvent === 'function') {
        simulatedEvent = new window.MouseEvent(type, {
          'bubbles': true,
          'cancelable': true,
          'screenX': first.screenX,
          'screenY': first.screenY,
          'clientX': first.clientX,
          'clientY': first.clientY
        });
      } else {
        simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
      }
      first.target.dispatchEvent(simulatedEvent);
    };
  };
};

Touch.init = function($) {
  if(typeof($.spotSwipe) === 'undefined') {
    Touch.setupSpotSwipe($);
    Touch.setupTouchHandler($);
  }
};




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Accordion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);







/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */

var Accordion = (function (Plugin) {
  function Accordion () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Accordion.__proto__ = Plugin;
  Accordion.prototype = Object.create( Plugin && Plugin.prototype );
  Accordion.prototype.constructor = Accordion;

  Accordion.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Accordion.defaults, this.$element.data(), options);

    this.className = 'Accordion'; // ie9 back compat
    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Accordion', {
      'ENTER': 'toggle',
      'SPACE': 'toggle',
      'ARROW_DOWN': 'next',
      'ARROW_UP': 'previous'
    });
  };

  /**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */
  Accordion.prototype._init = function _init () {
    var this$1 = this;

    this.$element.attr('role', 'tablist');
    this.$tabs = this.$element.children('[data-accordion-item]');

    this.$tabs.each(function(idx, el) {
      var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el),
          $content = $el.children('[data-tab-content]'),
          id = $content[0].id || Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* GetYoDigits */])(6, 'accordion'),
          linkId = el.id || (id + "-label");

      $el.find('a:first').attr({
        'aria-controls': id,
        'role': 'tab',
        'id': linkId,
        'aria-expanded': false,
        'aria-selected': false
      });

      $content.attr({'role': 'tabpanel', 'aria-labelledby': linkId, 'aria-hidden': true, 'id': id});
    });
    var $initActive = this.$element.find('.is-active').children('[data-tab-content]');
    this.firstTimeInit = true;
    if($initActive.length){
      this.down($initActive, this.firstTimeInit);
      this.firstTimeInit = false;
    }

    this._checkDeepLink = function () {
      var anchor = window.location.hash;
      //need a hash and a relevant anchor in this tabset
      if(anchor.length) {
        var $link = this$1.$element.find('[href$="'+anchor+'"]'),
        $anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor);

        if ($link.length && $anchor) {
          if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {
            this$1.down($anchor, this$1.firstTimeInit);
            this$1.firstTimeInit = false;
          };

          //roll up a little to show the titles
          if (this$1.options.deepLinkSmudge) {
            var _this = this$1;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).load(function() {
              var offset = _this.$element.offset();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: offset.top }, _this.options.deepLinkSmudgeDelay);
            });
          }

          /**
            * Fires when the zplugin has deeplinked at pageload
            * @event Accordion#deeplink
            */
          this$1.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);
        }
      }
    }

    //use browser to open a tab, if it exists in this tabset
    if (this.options.deepLink) {
      this._checkDeepLink();
    }

    this._events();
  };

  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  Accordion.prototype._events = function _events () {
    var _this = this;

    this.$tabs.each(function() {
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var $tabContent = $elem.children('[data-tab-content]');
      if ($tabContent.length) {
        $elem.children('a').off('click.zf.accordion keydown.zf.accordion')
               .on('click.zf.accordion', function(e) {
          e.preventDefault();
          _this.toggle($tabContent);
        }).on('keydown.zf.accordion', function(e){
          __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Accordion', {
            toggle: function() {
              _this.toggle($tabContent);
            },
            next: function() {
              var $a = $elem.next().find('a').focus();
              if (!_this.options.multiExpand) {
                $a.trigger('click.zf.accordion')
              }
            },
            previous: function() {
              var $a = $elem.prev().find('a').focus();
              if (!_this.options.multiExpand) {
                $a.trigger('click.zf.accordion')
              }
            },
            handled: function() {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        });
      }
    });
    if(this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._checkDeepLink);
    }
  };

  /**
   * Toggles the selected content pane's open/close state.
   * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
   * @function
   */
  Accordion.prototype.toggle = function toggle ($target) {
    if ($target.closest('[data-accordion]').is('[disabled]')) {
      console.info('Cannot toggle an accordion that is disabled.');
      return;
    }
    if($target.parent().hasClass('is-active')) {
      this.up($target);
    } else {
      this.down($target);
    }
    //either replace or update browser history
    if (this.options.deepLink) {
      var anchor = $target.prev('a').attr('href');

      if (this.options.updateHistory) {
        history.pushState({}, '', anchor);
      } else {
        history.replaceState({}, '', anchor);
      }
    }
  };

  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
   * @param {Boolean} firstTime - flag to determine if reflow should happen.
   * @fires Accordion#down
   * @function
   */
  Accordion.prototype.down = function down ($target, firstTime) {
    var this$1 = this;

    /**
     * checking firstTime allows for initial render of the accordion
     * to render preset is-active panes.
     */
    if ($target.closest('[data-accordion]').is('[disabled]') && !firstTime)  {
      console.info('Cannot call down on an accordion that is disabled.');
      return;
    }
    $target
      .attr('aria-hidden', false)
      .parent('[data-tab-content]')
      .addBack()
      .parent().addClass('is-active');

    if (!this.options.multiExpand && !firstTime) {
      var $currentActive = this.$element.children('.is-active').children('[data-tab-content]');
      if ($currentActive.length) {
        this.up($currentActive.not($target));
      }
    }

    $target.slideDown(this.options.slideSpeed, function () {
      /**
       * Fires when the tab is done opening.
       * @event Accordion#down
       */
      this$1.$element.trigger('down.zf.accordion', [$target]);
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + ($target.attr('aria-labelledby')))).attr({
      'aria-expanded': true,
      'aria-selected': true
    });
  };

  /**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   */
  Accordion.prototype.up = function up ($target) {
    if ($target.closest('[data-accordion]').is('[disabled]')) {
      console.info('Cannot call up on an accordion that is disabled.');
      return;
    }

    var $aunts = $target.parent().siblings(),
        _this = this;

    if((!this.options.allowAllClosed && !$aunts.hasClass('is-active')) || !$target.parent().hasClass('is-active')) {
      return;
    }

    $target.slideUp(_this.options.slideSpeed, function () {
      /**
       * Fires when the tab is done collapsing up.
       * @event Accordion#up
       */
      _this.$element.trigger('up.zf.accordion', [$target]);
    });

    $target.attr('aria-hidden', true)
           .parent().removeClass('is-active');

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + ($target.attr('aria-labelledby')))).attr({
     'aria-expanded': false,
     'aria-selected': false
   });
  };

  /**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   * @function
   */
  Accordion.prototype._destroy = function _destroy () {
    this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
    this.$element.find('a').off('.zf.accordion');
    if(this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._checkDeepLink);
    }

  };

  return Accordion;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]));

Accordion.defaults = {
  /**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
  multiExpand: false,
  /**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
  allowAllClosed: false,
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false
};




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);









/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 */

var AccordionMenu = (function (Plugin) {
  function AccordionMenu () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) AccordionMenu.__proto__ = Plugin;
  AccordionMenu.prototype = Object.create( Plugin && Plugin.prototype );
  AccordionMenu.prototype.constructor = AccordionMenu;

  AccordionMenu.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, AccordionMenu.defaults, this.$element.data(), options);
    this.className = 'AccordionMenu'; // ie9 back compat

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('AccordionMenu', {
      'ENTER': 'toggle',
      'SPACE': 'toggle',
      'ARROW_RIGHT': 'open',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'close',
      'ESCAPE': 'closeAll'
    });
  };



  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  AccordionMenu.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Feather(this.$element, 'accordion');

    var _this = this;

    this.$element.find('[data-submenu]').not('.is-active').slideUp(0);//.find('a').css('padding-left', '1rem');
    this.$element.attr({
      'role': 'tree',
      'aria-multiselectable': this.options.multiOpen
    });

    this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
    this.$menuLinks.each(function(){
      var linkId = this.id || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'acc-menu-link'),
          $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $sub = $elem.children('[data-submenu]'),
          subId = $sub[0].id || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'acc-menu'),
          isActive = $sub.hasClass('is-active');


      if(_this.options.submenuToggle) {
        $elem.addClass('has-submenu-toggle');
        $elem.children('a').after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + '</span></button>');
      } else {
        $elem.attr({
          'aria-controls': subId,
          'aria-expanded': isActive,
          'id': linkId
        });
      }
      $sub.attr({
        'aria-labelledby': linkId,
        'aria-hidden': !isActive,
        'role': 'group',
        'id': subId
      });
    });
    this.$element.find('li').attr({
      'role': 'treeitem'
    });
    var initPanes = this.$element.find('.is-active');
    if(initPanes.length){
      var _this = this;
      initPanes.each(function(){
        _this.down(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
    }
    this._events();
  };

  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  AccordionMenu.prototype._events = function _events () {
    var _this = this;

    this.$element.find('li').each(function() {
      var $submenu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('[data-submenu]');

      if ($submenu.length) {
        if(_this.options.submenuToggle) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function(e) {
            _this.toggle($submenu);
          });
        } else {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function(e) {
              e.preventDefault();
              _this.toggle($submenu);
            });
        }
      }
    }).on('keydown.zf.accordionmenu', function(e){
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $elements = $element.parent('ul').children('li'),
          $prevElement,
          $nextElement,
          $target = $element.children('[data-submenu]');

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1)).find('a').first();
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1)).find('a').first();

          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('[data-submenu]:visible').length) { // has open sub menu
            $nextElement = $element.find('li:first-child').find('a').first();
          }
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':first-child')) { // is first element of sub menu
            $prevElement = $element.parents('li').first().find('a').first();
          } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) { // if previous element has open sub menu
            $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
          }
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':last-child')) { // is last element of sub menu
            $nextElement = $element.parents('li').first().next('li').find('a').first();
          }

          return;
        }
      });

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'AccordionMenu', {
        open: function() {
          if ($target.is(':hidden')) {
            _this.down($target);
            $target.find('li').first().find('a').first().focus();
          }
        },
        close: function() {
          if ($target.length && !$target.is(':hidden')) { // close active sub of this item
            _this.up($target);
          } else if ($element.parent('[data-submenu]').length) { // close currently open sub
            _this.up($element.parent('[data-submenu]'));
            $element.parents('li').first().find('a').first().focus();
          }
        },
        up: function() {
          $prevElement.focus();
          return true;
        },
        down: function() {
          $nextElement.focus();
          return true;
        },
        toggle: function() {
          if (_this.options.submenuToggle) {
            return false;
          }
          if ($element.children('[data-submenu]').length) {
            _this.toggle($element.children('[data-submenu]'));
            return true;
          }
        },
        closeAll: function() {
          _this.hideAll();
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
        }
      });
    });//.attr('tabindex', 0);
  };

  /**
   * Closes all panes of the menu.
   * @function
   */
  AccordionMenu.prototype.hideAll = function hideAll () {
    this.up(this.$element.find('[data-submenu]'));
  };

  /**
   * Opens all panes of the menu.
   * @function
   */
  AccordionMenu.prototype.showAll = function showAll () {
    this.down(this.$element.find('[data-submenu]'));
  };

  /**
   * Toggles the open/close state of a submenu.
   * @function
   * @param {jQuery} $target - the submenu to toggle
   */
  AccordionMenu.prototype.toggle = function toggle ($target){
    if(!$target.is(':animated')) {
      if (!$target.is(':hidden')) {
        this.up($target);
      }
      else {
        this.down($target);
      }
    }
  };

  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  AccordionMenu.prototype.down = function down ($target) {
    var _this = this;

    if(!this.options.multiOpen) {
      this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
    }

    $target.addClass('is-active').attr({'aria-hidden': false});

    if(this.options.submenuToggle) {
      $target.prev('.submenu-toggle').attr({'aria-expanded': true});
    }
    else {
      $target.parent('.is-accordion-submenu-parent').attr({'aria-expanded': true});
    }

    $target.slideDown(_this.options.slideSpeed, function () {
      /**
       * Fires when the menu is done opening.
       * @event AccordionMenu#down
       */
      _this.$element.trigger('down.zf.accordionMenu', [$target]);
    });
  };

  /**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */
  AccordionMenu.prototype.up = function up ($target) {
    var _this = this;
    $target.slideUp(_this.options.slideSpeed, function () {
      /**
       * Fires when the menu is done collapsing up.
       * @event AccordionMenu#up
       */
      _this.$element.trigger('up.zf.accordionMenu', [$target]);
    });

    var $menus = $target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden', true);

    if(this.options.submenuToggle) {
      $menus.prev('.submenu-toggle').attr('aria-expanded', false);
    }
    else {
      $menus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
    }
  };

  /**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */
  AccordionMenu.prototype._destroy = function _destroy () {
    this.$element.find('[data-submenu]').slideDown(0).css('display', '');
    this.$element.find('a').off('click.zf.accordionMenu');

    if(this.options.submenuToggle) {
      this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
      this.$element.find('.submenu-toggle').remove();
    }

    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Burn(this.$element, 'accordion');
  };

  return AccordionMenu;
}(__WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */]));

AccordionMenu.defaults = {
  /**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Adds a separate submenu toggle button. This allows the parent item to have a link.
   * @option
   * @example true
   */
  submenuToggle: false,
  /**
   * The text used for the submenu toggle if enabled. This is used for screen readers only.
   * @option
   * @example true
   */
  submenuToggleText: 'Toggle menu',
  /**
   * Allow the menu to have multiple open panes.
   * @option
   * @type {boolean}
   * @default true
   */
  multiOpen: true
};




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Drilldown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_plugin__ = __webpack_require__(2);









/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 * @requires foundation.util.box
 */

var Drilldown = (function (Plugin) {
  function Drilldown () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Drilldown.__proto__ = Plugin;
  Drilldown.prototype = Object.create( Plugin && Plugin.prototype );
  Drilldown.prototype.constructor = Drilldown;

  Drilldown.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Drilldown.defaults, this.$element.data(), options);
    this.className = 'Drilldown'; // ie9 back compat

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Drilldown', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'previous',
      'ESCAPE': 'close',
      'TAB': 'down',
      'SHIFT_TAB': 'up'
    });
  };

  /**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */
  Drilldown.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Feather(this.$element, 'drilldown');

    if(this.options.autoApplyClass) {
      this.$element.addClass('drilldown');
    }

    this.$element.attr({
      'role': 'tree',
      'aria-multiselectable': false
    });
    this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
    this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');
    this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'treeitem').find('a');
    this.$element.attr('data-mutate', (this.$element.attr('data-drilldown') || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'drilldown')));

    this._prepareMenu();
    this._registerEvents();

    this._keyboardEvents();
  };

  /**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */
  Drilldown.prototype._prepareMenu = function _prepareMenu () {
    var _this = this;
    // if(!this.options.holdOpen){
    //   this._menuLinkEvents();
    // }
    this.$submenuAnchors.each(function(){
      var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var $sub = $link.parent();
      if(_this.options.parentLink){
        $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>');
      }
      $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
      $link.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': 0,
            'role': 'group'
          });
      _this._events($link);
    });
    this.$submenus.each(function(){
      var $menu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $back = $menu.find('.js-drilldown-back');
      if(!$back.length){
        switch (_this.options.backButtonPosition) {
          case "bottom":
            $menu.append(_this.options.backButton);
            break;
          case "top":
            $menu.prepend(_this.options.backButton);
            break;
          default:
            console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
        }
      }
      _this._back($menu);
    });

    this.$submenus.addClass('invisible');
    if(!this.options.autoHeight) {
      this.$submenus.addClass('drilldown-submenu-cover-previous');
    }

    // create a wrapper on element if it doesn't exist.
    if(!this.$element.parent().hasClass('is-drilldown')){
      this.$wrapper = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.wrapper).addClass('is-drilldown');
      if(this.options.animateHeight) { this.$wrapper.addClass('animate-height'); }
      this.$element.wrap(this.$wrapper);
    }
    // set wrapper
    this.$wrapper = this.$element.parent();
    this.$wrapper.css(this._getMaxDims());
  };

  Drilldown.prototype._resize = function _resize () {
    this.$wrapper.css({'max-width': 'none', 'min-height': 'none'});
    // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths
    this.$wrapper.css(this._getMaxDims());
  };

  /**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */
  Drilldown.prototype._events = function _events ($elem) {
    var _this = this;

    $elem.off('click.zf.drilldown')
    .on('click.zf.drilldown', function(e){
      if(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')){
        e.stopImmediatePropagation();
        e.preventDefault();
      }

      // if(e.target !== e.currentTarget.firstElementChild){
      //   return false;
      // }
      _this._show($elem.parent('li'));

      if(_this.options.closeOnClick){
        var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body');
        $body.off('.zf.drilldown').on('click.zf.drilldown', function(e){
          if (e.target === _this.$element[0] || __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target)) { return; }
          e.preventDefault();
          _this._hideAll();
          $body.off('.zf.drilldown');
        });
      }
    });
  };

  /**
   * Adds event handlers to the menu element.
   * @function
   * @private
   */
  Drilldown.prototype._registerEvents = function _registerEvents () {
    if(this.options.scrollTop){
      this._bindHandler = this._scrollTop.bind(this);
      this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown',this._bindHandler);
    }
    this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
  };

  /**
   * Scroll to Top of Element or data-scroll-top-element
   * @function
   * @fires Drilldown#scrollme
   */
  Drilldown.prototype._scrollTop = function _scrollTop () {
    var _this = this;
    var $scrollTopElement = _this.options.scrollTopElement!=''?__WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this.options.scrollTopElement):_this.$element,
        scrollPos = parseInt($scrollTopElement.offset().top+_this.options.scrollTopOffset, 10);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').stop(true).animate({ scrollTop: scrollPos }, _this.options.animationDuration, _this.options.animationEasing,function(){
      /**
        * Fires after the menu has scrolled
        * @event Drilldown#scrollme
        */
      if(this===__WEBPACK_IMPORTED_MODULE_0_jquery___default()('html')[0]){ _this.$element.trigger('scrollme.zf.drilldown'); }
    });
  };

  /**
   * Adds keydown event listener to `li`'s in the menu.
   * @private
   */
  Drilldown.prototype._keyboardEvents = function _keyboardEvents () {
    var _this = this;

    this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function(e){
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $elements = $element.parent('li').parent('ul').children('li').children('a'),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1));
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));
          return;
        }
      });

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Drilldown', {
        next: function() {
          if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent('li'));
            $element.parent('li').one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
              $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
            });
            return true;
          }
        },
        previous: function() {
          _this._hide($element.parent('li').parent('ul'));
          $element.parent('li').parent('ul').one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
            setTimeout(function() {
              $element.parent('li').parent('ul').parent('li').children('a').first().focus();
            }, 1);
          });
          return true;
        },
        up: function() {
          $prevElement.focus();
          // Don't tap focus on first element in root ul
          return !$element.is(_this.$element.find('> li:first-child > a'));
        },
        down: function() {
          $nextElement.focus();
          // Don't tap focus on last element in root ul
          return !$element.is(_this.$element.find('> li:last-child > a'));
        },
        close: function() {
          // Don't close on element in root ul
          if (!$element.is(_this.$element.find('> li > a'))) {
            _this._hide($element.parent().parent());
            $element.parent().parent().siblings('a').focus();
          }
        },
        open: function() {
          if (!$element.is(_this.$menuItems)) { // not menu item means back button
            _this._hide($element.parent('li').parent('ul'));
            $element.parent('li').parent('ul').one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
              setTimeout(function() {
                $element.parent('li').parent('ul').parent('li').children('a').first().focus();
              }, 1);
            });
            return true;
          } else if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent('li'));
            $element.parent('li').one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
              $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
            });
            return true;
          }
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
        }
      });
    }); // end keyboardAccess
  };

  /**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#closed
   */
  Drilldown.prototype._hideAll = function _hideAll () {
    var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
    if(this.options.autoHeight) { this.$wrapper.css({height:$elem.parent().closest('ul').data('calcHeight')}); }
    $elem.one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($elem), function(e){
      $elem.removeClass('is-active is-closing');
    });
        /**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */
    this.$element.trigger('closed.zf.drilldown');
  };

  /**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */
  Drilldown.prototype._back = function _back ($elem) {
    var _this = this;
    $elem.off('click.zf.drilldown');
    $elem.children('.js-drilldown-back')
      .on('click.zf.drilldown', function(e){
        e.stopImmediatePropagation();
        // console.log('mouseup on back');
        _this._hide($elem);

        // If there is a parent submenu, call show
        var parentSubMenu = $elem.parent('li').parent('ul').parent('li');
        if (parentSubMenu.length) {
          _this._show(parentSubMenu);
        }
      });
  };

  /**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */
  Drilldown.prototype._menuLinkEvents = function _menuLinkEvents () {
    var _this = this;
    this.$menuItems.not('.is-drilldown-submenu-parent')
        .off('click.zf.drilldown')
        .on('click.zf.drilldown', function(e){
          // e.stopImmediatePropagation();
          setTimeout(function(){
            _this._hideAll();
          }, 0);
      });
  };

  /**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
   */
  Drilldown.prototype._show = function _show ($elem) {
    if(this.options.autoHeight) { this.$wrapper.css({height:$elem.children('[data-submenu]').data('calcHeight')}); }
    $elem.attr('aria-expanded', true);
    $elem.children('[data-submenu]').addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
    /**
     * Fires when the submenu has opened.
     * @event Drilldown#open
     */
    this.$element.trigger('open.zf.drilldown', [$elem]);
  };;

  /**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
   */
  Drilldown.prototype._hide = function _hide ($elem) {
    if(this.options.autoHeight) { this.$wrapper.css({height:$elem.parent().closest('ul').data('calcHeight')}); }
    var _this = this;
    $elem.parent('li').attr('aria-expanded', false);
    $elem.attr('aria-hidden', true).addClass('is-closing')
    $elem.addClass('is-closing')
         .one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($elem), function(){
           $elem.removeClass('is-active is-closing');
           $elem.blur().addClass('invisible');
         });
    /**
     * Fires when the submenu has closed.
     * @event Drilldown#hide
     */
    $elem.trigger('hide.zf.drilldown', [$elem]);
  };

  /**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */
  Drilldown.prototype._getMaxDims = function _getMaxDims () {
    var  maxHeight = 0, result = {}, _this = this;
    this.$submenus.add(this.$element).each(function(){
      var numOfElems = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('li').length;
      var height = __WEBPACK_IMPORTED_MODULE_4__foundation_util_box__["a" /* Box */].GetDimensions(this).height;
      maxHeight = height > maxHeight ? height : maxHeight;
      if(_this.options.autoHeight) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('calcHeight',height);
        if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass('is-drilldown-submenu')) { result['height'] = height; }
      }
    });

    if(!this.options.autoHeight) { result['min-height'] = maxHeight + "px"; }

    result['max-width'] = (this.$element[0].getBoundingClientRect().width) + "px";

    return result;
  };

  /**
   * Destroys the Drilldown Menu
   * @function
   */
  Drilldown.prototype._destroy = function _destroy () {
    if(this.options.scrollTop) { this.$element.off('.zf.drilldown',this._bindHandler); }
    this._hideAll();
	  this.$element.off('mutateme.zf.trigger');
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Burn(this.$element, 'drilldown');
    this.$element.unwrap()
                 .find('.js-drilldown-back, .is-submenu-parent-item').remove()
                 .end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu')
                 .end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
    this.$submenuAnchors.each(function() {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off('.zf.drilldown');
    });

    this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');

    this.$element.find('a').each(function(){
      var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      $link.removeAttr('tabindex');
      if($link.data('savedHref')){
        $link.attr('href', $link.data('savedHref')).removeData('savedHref');
      }else{ return; }
    });
  };

  return Drilldown;
}(__WEBPACK_IMPORTED_MODULE_5__foundation_plugin__["a" /* Plugin */]));

Drilldown.defaults = {
  /**
   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
   * @option
   * @type {boolian}
   * @default true
   */
  autoApplyClass: true,
  /**
   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
   */
  backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
  /**
   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
   * @option
   * @type {string}
   * @default top
   */
  backButtonPosition: 'top',
  /**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<div></div>'
   */
  wrapper: '<div></div>',
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,
  /**
   * Allow the menu to return to root list on body click.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false,
  /**
   * Allow the menu to auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  autoHeight: false,
  /**
   * Animate the auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  animateHeight: false,
  /**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @type {boolean}
   * @default false
   */
  scrollTop: false,
  /**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @type {string}
   * @default ''
   */
  scrollTopElement: '',
  /**
   * ScrollTop offset
   * @option
   * @type {number}
   * @default 0
   */
  scrollTopOffset: 0,
  /**
   * Scroll animation duration
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Scroll animation easing. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @see {@link https://api.jquery.com/animate|JQuery animate}
   * @default 'swing'
   */
  animationEasing: 'swing'
  // holdOpen: false
};




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_plugin__ = __webpack_require__(2);










/**
 * DropdownMenu module.
 * @module foundation.dropdown-menu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 */

var DropdownMenu = (function (Plugin) {
  function DropdownMenu () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) DropdownMenu.__proto__ = Plugin;
  DropdownMenu.prototype = Object.create( Plugin && Plugin.prototype );
  DropdownMenu.prototype.constructor = DropdownMenu;

  DropdownMenu.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, DropdownMenu.defaults, this.$element.data(), options);
    this.className = 'DropdownMenu'; // ie9 back compat

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('DropdownMenu', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'previous',
      'ESCAPE': 'close'
    });
  };

  /**
   * Initializes the plugin, and calls _prepareMenu
   * @private
   * @function
   */
  DropdownMenu.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Feather(this.$element, 'dropdown');

    var subs = this.$element.find('li.is-dropdown-submenu-parent');
    this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

    this.$menuItems = this.$element.find('[role="menuitem"]');
    this.$tabs = this.$element.children('[role="menuitem"]');
    this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

    if (this.options.alignment === 'auto') {
        if (this.$element.hasClass(this.options.rightClass) || Object(__WEBPACK_IMPORTED_MODULE_4__foundation_util_core__["b" /* rtl */])() || this.$element.parents('.top-bar-right').is('*')) {
            this.options.alignment = 'right';
            subs.addClass('opens-left');
        } else {
            this.options.alignment = 'left';
            subs.addClass('opens-right');
        }
    } else {
      if (this.options.alignment === 'right') {
          subs.addClass('opens-left');
      } else {
          subs.addClass('opens-right');
      }
    }
    this.changed = false;
    this._events();
  };;

  DropdownMenu.prototype._isVertical = function _isVertical () {
    return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
  };

  DropdownMenu.prototype._isRtl = function _isRtl () {
    return this.$element.hasClass('align-right') || (Object(__WEBPACK_IMPORTED_MODULE_4__foundation_util_core__["b" /* rtl */])() && !this.$element.hasClass('align-left'));
  };

  /**
   * Adds event listeners to elements within the menu
   * @private
   * @function
   */
  DropdownMenu.prototype._events = function _events () {
    var _this = this,
        hasTouch = 'ontouchstart' in window || (typeof window.ontouchstart !== 'undefined'),
        parClass = 'is-dropdown-submenu-parent';

    // used for onClick and in the keyboard handlers
    var handleClickFn = function(e) {
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', ("." + parClass)),
          hasSub = $elem.hasClass(parClass),
          hasClicked = $elem.attr('data-is-click') === 'true',
          $sub = $elem.children('.is-dropdown-submenu');

      if (hasSub) {
        if (hasClicked) {
          if (!_this.options.closeOnClick || (!_this.options.clickOpen && !hasTouch) || (_this.options.forceFollow && hasTouch)) { return; }
          else {
            e.stopImmediatePropagation();
            e.preventDefault();
            _this._hide($elem);
          }
        } else {
          e.preventDefault();
          e.stopImmediatePropagation();
          _this._show($sub);
          $elem.add($elem.parentsUntil(_this.$element, ("." + parClass))).attr('data-is-click', true);
        }
      }
    };

    if (this.options.clickOpen || hasTouch) {
      this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
    }

    // Handle Leaf element Clicks
    if(_this.options.closeOnClickInside){
      this.$menuItems.on('click.zf.dropdownmenu', function(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            hasSub = $elem.hasClass(parClass);
        if(!hasSub){
          _this._hide();
        }
      });
    }

    if (!this.options.disableHover) {
      this.$menuItems.on('mouseenter.zf.dropdownmenu', function(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            hasSub = $elem.hasClass(parClass);

        if (hasSub) {
          clearTimeout($elem.data('_delay'));
          $elem.data('_delay', setTimeout(function() {
            _this._show($elem.children('.is-dropdown-submenu'));
          }, _this.options.hoverDelay));
        }
      }).on('mouseleave.zf.dropdownmenu', function(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            hasSub = $elem.hasClass(parClass);
        if (hasSub && _this.options.autoclose) {
          if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) { return false; }

          clearTimeout($elem.data('_delay'));
          $elem.data('_delay', setTimeout(function() {
            _this._hide($elem);
          }, _this.options.closingTime));
        }
      });
    }
    this.$menuItems.on('keydown.zf.dropdownmenu', function(e) {
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', '[role="menuitem"]'),
          isTab = _this.$tabs.index($element) > -1,
          $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          $prevElement = $elements.eq(i-1);
          $nextElement = $elements.eq(i+1);
          return;
        }
      });

      var nextSibling = function() {
        $nextElement.children('a:first').focus();
        e.preventDefault();
      }, prevSibling = function() {
        $prevElement.children('a:first').focus();
        e.preventDefault();
      }, openSub = function() {
        var $sub = $element.children('ul.is-dropdown-submenu');
        if ($sub.length) {
          _this._show($sub);
          $element.find('li > a:first').focus();
          e.preventDefault();
        } else { return; }
      }, closeSub = function() {
        //if ($element.is(':first-child')) {
        var close = $element.parent('ul').parent('li');
        close.children('a:first').focus();
        _this._hide(close);
        e.preventDefault();
        //}
      };
      var functions = {
        open: openSub,
        close: function() {
          _this._hide(_this.$element);
          _this.$menuItems.eq(0).children('a').focus(); // focus to first element
          e.preventDefault();
        },
        handled: function() {
          e.stopImmediatePropagation();
        }
      };

      if (isTab) {
        if (_this._isVertical()) { // vertical menu
          if (_this._isRtl()) { // right aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: closeSub,
              previous: openSub
            });
          } else { // left aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: openSub,
              previous: closeSub
            });
          }
        } else { // horizontal menu
          if (_this._isRtl()) { // right aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              next: prevSibling,
              previous: nextSibling,
              down: openSub,
              up: closeSub
            });
          } else { // left aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              next: nextSibling,
              previous: prevSibling,
              down: openSub,
              up: closeSub
            });
          }
        }
      } else { // not tabs -> one sub
        if (_this._isRtl()) { // right aligned
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
            next: closeSub,
            previous: openSub,
            down: nextSibling,
            up: prevSibling
          });
        } else { // left aligned
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
            next: openSub,
            previous: closeSub,
            down: nextSibling,
            up: prevSibling
          });
        }
      }
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'DropdownMenu', functions);

    });
  };

  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  DropdownMenu.prototype._addBodyHandler = function _addBodyHandler () {
    var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body),
        _this = this;
    $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu')
         .on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function(e) {
           var $link = _this.$element.find(e.target);
           if ($link.length) { return; }

           _this._hide();
           $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
         });
  };

  /**
   * Opens a dropdown pane, and checks for collisions first.
   * @param {jQuery} $sub - ul element that is a submenu to show
   * @function
   * @private
   * @fires DropdownMenu#show
   */
  DropdownMenu.prototype._show = function _show ($sub) {
    var idx = this.$tabs.index(this.$tabs.filter(function(i, el) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).find($sub).length > 0;
    }));
    var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
    this._hide($sibs, idx);
    $sub.css('visibility', 'hidden').addClass('js-dropdown-active')
        .parent('li.is-dropdown-submenu-parent').addClass('is-active');
    var clear = __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__["a" /* Box */].ImNotTouchingYou($sub, null, true);
    if (!clear) {
      var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
          $parentLi = $sub.parent('.is-dropdown-submenu-parent');
      $parentLi.removeClass(("opens" + oldClass)).addClass(("opens-" + (this.options.alignment)));
      clear = __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__["a" /* Box */].ImNotTouchingYou($sub, null, true);
      if (!clear) {
        $parentLi.removeClass(("opens-" + (this.options.alignment))).addClass('opens-inner');
      }
      this.changed = true;
    }
    $sub.css('visibility', '');
    if (this.options.closeOnClick) { this._addBodyHandler(); }
    /**
     * Fires when the new dropdown pane is visible.
     * @event DropdownMenu#show
     */
    this.$element.trigger('show.zf.dropdownmenu', [$sub]);
  };

  /**
   * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
   * @function
   * @param {jQuery} $elem - element with a submenu to hide
   * @param {Number} idx - index of the $tabs collection to hide
   * @private
   */
  DropdownMenu.prototype._hide = function _hide ($elem, idx) {
    var $toClose;
    if ($elem && $elem.length) {
      $toClose = $elem;
    } else if (idx !== undefined) {
      $toClose = this.$tabs.not(function(i, el) {
        return i === idx;
      });
    }
    else {
      $toClose = this.$element;
    }
    var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

    if (somethingToClose) {
      $toClose.find('li.is-active').add($toClose).attr({
        'data-is-click': false
      }).removeClass('is-active');

      $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

      if (this.changed || $toClose.find('opens-inner').length) {
        var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
        $toClose.find('li.is-dropdown-submenu-parent').add($toClose)
                .removeClass(("opens-inner opens-" + (this.options.alignment)))
                .addClass(("opens-" + oldClass));
        this.changed = false;
      }
      /**
       * Fires when the open menus are closed.
       * @event DropdownMenu#hide
       */
      this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
    }
  };

  /**
   * Destroys the plugin.
   * @function
   */
  DropdownMenu.prototype._destroy = function _destroy () {
    this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click')
        .removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).off('.zf.dropdownmenu');
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Burn(this.$element, 'dropdown');
  };

  return DropdownMenu;
}(__WEBPACK_IMPORTED_MODULE_5__foundation_plugin__["a" /* Plugin */]));

/**
 * Default settings for plugin
 */
DropdownMenu.defaults = {
  /**
   * Disallows hover events from opening submenus
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
   * @option
   * @type {boolean}
   * @default true
   */
  autoclose: true,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 50
   */
  hoverDelay: 50,
  /**
   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
   * @option
   * @type {boolean}
   * @default false
   */
  clickOpen: false,
  /**
   * Amount of time to delay closing a submenu on a mouseleave event.
   * @option
   * @type {number}
   * @default 500
   */

  closingTime: 500,
  /**
   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow clicks on the body to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allow clicks on leaf anchor links to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClickInside: true,
  /**
   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'vertical'
   */
  verticalClass: 'vertical',
  /**
   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'align-right'
   */
  rightClass: 'align-right',
  /**
   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
   * @option
   * @type {boolean}
   * @default true
   */
  forceFollow: true
};




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmoothScroll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);






/**
 * SmoothScroll module.
 * @module foundation.smooth-scroll
 */
var SmoothScroll = (function (Plugin) {
  function SmoothScroll () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) SmoothScroll.__proto__ = Plugin;
  SmoothScroll.prototype = Object.create( Plugin && Plugin.prototype );
  SmoothScroll.prototype.constructor = SmoothScroll;

  SmoothScroll.prototype._setup = function _setup (element, options) {
        this.$element = element;
        this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, SmoothScroll.defaults, this.$element.data(), options);
        this.className = 'SmoothScroll'; // ie9 back compat

        this._init();
    };

    /**
     * Initialize the SmoothScroll plugin
     * @private
     */
    SmoothScroll.prototype._init = function _init () {
        var id = this.$element[0].id || Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* GetYoDigits */])(6, 'smooth-scroll');
        var _this = this;
        this.$element.attr({
            'id': id
        });

        this._events();
    };

    /**
     * Initializes events for SmoothScroll.
     * @private
     */
    SmoothScroll.prototype._events = function _events () {
        var _this = this;

        // click handler function.
        var handleLinkClick = function(e) {
            // exit function if the event source isn't coming from an anchor with href attribute starts with '#'
            if(!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is('a[href^="#"]'))  {
                return false;
            }

            var arrival = this.getAttribute('href');

            _this._inTransition = true;

            SmoothScroll.scrollToLoc(arrival, _this.options, function() {
                _this._inTransition = false;
            });

            e.preventDefault();
        };

        this.$element.on('click.zf.smoothScroll', handleLinkClick)
        this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', handleLinkClick);
    };

    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
     * @param {Object} options - The options to use.
     * @param {Function} callback - The callback function.
     * @static
     * @function
     */
    SmoothScroll.scrollToLoc = function scrollToLoc (loc, options, callback) {
        if ( options === void 0 ) options = SmoothScroll.defaults;

        // Do nothing if target does not exist to prevent errors
        if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(loc).length) {
            return false;
        }

        var scrollPos = Math.round(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(loc).offset().top - options.threshold / 2 - options.offset);

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').stop(true).animate(
            { scrollTop: scrollPos },
            options.animationDuration,
            options.animationEasing,
            function() {
                if(callback && typeof callback == "function"){
                    callback();
                }
            }
        );
    };

  return SmoothScroll;
}(__WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */]));

/**
 * Default settings for plugin.
 */
SmoothScroll.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
}




/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);






/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */

var Tabs = (function (Plugin) {
  function Tabs () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Tabs.__proto__ = Plugin;
  Tabs.prototype = Object.create( Plugin && Plugin.prototype );
  Tabs.prototype.constructor = Tabs;

  Tabs.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tabs.defaults, this.$element.data(), options);
    this.className = 'Tabs'; // ie9 back compat

    this._init();
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Tabs', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'previous',
      'ARROW_DOWN': 'next',
      'ARROW_LEFT': 'previous'
      // 'TAB': 'next',
      // 'SHIFT_TAB': 'previous'
    });
  };

  /**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */
  Tabs.prototype._init = function _init () {
    var this$1 = this;

    var _this = this;

    this.$element.attr({'role': 'tablist'});
    this.$tabTitles = this.$element.find(("." + (this.options.linkClass)));
    this.$tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-tabs-content=\"" + (this.$element[0].id) + "\"]"));

    this.$tabTitles.each(function(){
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $link = $elem.find('a'),
          isActive = $elem.hasClass(("" + (_this.options.linkActiveClass))),
          hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
          linkId = $link[0].id ? $link[0].id : (hash + "-label"),
          $tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + hash));

      $elem.attr({'role': 'presentation'});

      $link.attr({
        'role': 'tab',
        'aria-controls': hash,
        'aria-selected': isActive,
        'id': linkId,
        'tabindex': isActive ? '0' : '-1'
      });

      $tabContent.attr({
        'role': 'tabpanel',
        'aria-labelledby': linkId
      });

      if(!isActive) {
        $tabContent.attr('aria-hidden', 'true');
      }

      if(isActive && _this.options.autoFocus){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).load(function() {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: $elem.offset().top }, _this.options.deepLinkSmudgeDelay, function () {
            $link.focus();
          });
        });
      }
    });
    if(this.options.matchHeight) {
      var $images = this.$tabContent.find('img');

      if ($images.length) {
        Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__["a" /* onImagesLoaded */])($images, this._setHeight.bind(this));
      } else {
        this._setHeight();
      }
    }

     //current context-bound function to open tabs on page load or history popstate
    this._checkDeepLink = function () {
      var anchor = window.location.hash;
      //need a hash and a relevant anchor in this tabset
      if(anchor.length) {
        var $link = this$1.$element.find('[href$="'+anchor+'"]');
        if ($link.length) {
          this$1.selectTab(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor), true);

          //roll up a little to show the titles
          if (this$1.options.deepLinkSmudge) {
            var offset = this$1.$element.offset();
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: offset.top }, this$1.options.deepLinkSmudgeDelay);
          }

          /**
            * Fires when the zplugin has deeplinked at pageload
            * @event Tabs#deeplink
            */
           this$1.$element.trigger('deeplink.zf.tabs', [$link, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor)]);
         }
       }
     }

    //use browser to open a tab, if it exists in this tabset
    if (this.options.deepLink) {
      this._checkDeepLink();
    }

    this._events();
  };

  /**
   * Adds event handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._events = function _events () {
    this._addKeyHandler();
    this._addClickHandler();
    this._setHeightMqHandler = null;

    if (this.options.matchHeight) {
      this._setHeightMqHandler = this._setHeight.bind(this);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
    }

    if(this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._checkDeepLink);
    }
  };

  /**
   * Adds click handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addClickHandler = function _addClickHandler () {
    var _this = this;

    this.$element
      .off('click.zf.tabs')
      .on('click.zf.tabs', ("." + (this.options.linkClass)), function(e){
        e.preventDefault();
        e.stopPropagation();
        _this._handleTabChange(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
  };

  /**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addKeyHandler = function _addKeyHandler () {
    var _this = this;

    this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function(e){
      if (e.which === 9) { return; }


      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
        $elements = $element.parent('ul').children('li'),
        $prevElement,
        $nextElement;

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          if (_this.options.wrapOnKeys) {
            $prevElement = i === 0 ? $elements.last() : $elements.eq(i-1);
            $nextElement = i === $elements.length -1 ? $elements.first() : $elements.eq(i+1);
          } else {
            $prevElement = $elements.eq(Math.max(0, i-1));
            $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));
          }
          return;
        }
      });

      // handle keyboard event with keyboard util
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Tabs', {
        open: function() {
          $element.find('[role="tab"]').focus();
          _this._handleTabChange($element);
        },
        previous: function() {
          $prevElement.find('[role="tab"]').focus();
          _this._handleTabChange($prevElement);
        },
        next: function() {
          $nextElement.find('[role="tab"]').focus();
          _this._handleTabChange($nextElement);
        },
        handled: function() {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    });
  };

  /**
   * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
   * @param {jQuery} $target - Tab to open.
   * @param {boolean} historyHandled - browser has already handled a history update
   * @fires Tabs#change
   * @function
   */
  Tabs.prototype._handleTabChange = function _handleTabChange ($target, historyHandled) {

    /**
     * Check for active class on target. Collapse if exists.
     */
    if ($target.hasClass(("" + (this.options.linkActiveClass)))) {
        if(this.options.activeCollapse) {
            this._collapseTab($target);

           /**
            * Fires when the zplugin has successfully collapsed tabs.
            * @event Tabs#collapse
            */
            this.$element.trigger('collapse.zf.tabs', [$target]);
        }
        return;
    }

    var $oldTab = this.$element.
          find(("." + (this.options.linkClass) + "." + (this.options.linkActiveClass))),
          $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find(("#" + hash));

    //close old tab
    this._collapseTab($oldTab);

    //open new tab
    this._openTab($target);

    //either replace or update browser history
    if (this.options.deepLink && !historyHandled) {
      var anchor = $target.find('a').attr('href');

      if (this.options.updateHistory) {
        history.pushState({}, '', anchor);
      } else {
        history.replaceState({}, '', anchor);
      }
    }

    /**
     * Fires when the plugin has successfully changed tabs.
     * @event Tabs#change
     */
    this.$element.trigger('change.zf.tabs', [$target, $targetContent]);

    //fire to children a mutation event
    $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
  };

  /**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to Open.
   * @function
   */
  Tabs.prototype._openTab = function _openTab ($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find(("#" + hash));

      $target.addClass(("" + (this.options.linkActiveClass)));

      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });

      $targetContent
        .addClass(("" + (this.options.panelActiveClass))).removeAttr('aria-hidden');
  };

  /**
   * Collapses `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to Open.
   * @function
   */
  Tabs.prototype._collapseTab = function _collapseTab ($target) {
    var $target_anchor = $target
      .removeClass(("" + (this.options.linkActiveClass)))
      .find('[role="tab"]')
      .attr({
        'aria-selected': 'false',
        'tabindex': -1
      });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + ($target_anchor.attr('aria-controls'))))
      .removeClass(("" + (this.options.panelActiveClass)))
      .attr({ 'aria-hidden': 'true' })
  };

  /**
   * Public method for selecting a content pane to display.
   * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
   * @param {boolean} historyHandled - browser has already handled a history update
   * @function
   */
  Tabs.prototype.selectTab = function selectTab (elem, historyHandled) {
    var idStr;

    if (typeof elem === 'object') {
      idStr = elem[0].id;
    } else {
      idStr = elem;
    }

    if (idStr.indexOf('#') < 0) {
      idStr = "#" + idStr;
    }

    var $target = this.$tabTitles.find(("[href$=\"" + idStr + "\"]")).parent(("." + (this.options.linkClass)));

    this._handleTabChange($target, historyHandled);
  };;
  /**
   * Sets the height of each panel to the height of the tallest panel.
   * If enabled in options, gets called on media query change.
   * If loading content via external source, can be called directly or with _reflow.
   * If enabled with `data-match-height="true"`, tabs sets to equal height
   * @function
   * @private
   */
  Tabs.prototype._setHeight = function _setHeight () {
    var max = 0,
        _this = this; // Lock down the `this` value for the root tabs object

    this.$tabContent
      .find(("." + (this.options.panelClass)))
      .css('height', '')
      .each(function() {

        var panel = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            isActive = panel.hasClass(("" + (_this.options.panelActiveClass))); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({'visibility': 'hidden', 'display': 'block'});
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
          });
        }

        max = temp > max ? temp : max;
      })
      .css('height', (max + "px"));
  };

  /**
   * Destroys an instance of an tabs.
   * @fires Tabs#destroyed
   */
  Tabs.prototype._destroy = function _destroy () {
    this.$element
      .find(("." + (this.options.linkClass)))
      .off('.zf.tabs').hide().end()
      .find(("." + (this.options.panelClass)))
      .hide();

    if (this.options.matchHeight) {
      if (this._setHeightMqHandler != null) {
         __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
      }
    }

    if (this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._checkDeepLink);
    }

  };

  return Tabs;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]));

Tabs.defaults = {
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,

  /**
   * Allows the window to scroll to content of active pane on load if set to true.
   * Not recommended if more than one tab panel per page.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,

  /**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @type {boolean}
   * @default true
   */
  wrapOnKeys: true,

  /**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @type {boolean}
   * @default false
   */
  matchHeight: false,

  /**
   * Allows active tabs to collapse when clicked.
   * @option
   * @type {boolean}
   * @default false
   */
  activeCollapse: false,

  /**
   * Class applied to `li`'s in tab link list.
   * @option
   * @type {string}
   * @default 'tabs-title'
   */
  linkClass: 'tabs-title',

  /**
   * Class applied to the active `li` in tab link list.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  linkActiveClass: 'is-active',

  /**
   * Class applied to the content containers.
   * @option
   * @type {string}
   * @default 'tabs-panel'
   */
  panelClass: 'tabs-panel',

  /**
   * Class applied to the active content container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  panelActiveClass: 'is-active'
};




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




function Timer(elem, options, cb) {
  var _this = this,
      duration = options.duration,//options is an object for easily adding features later.
      nameSpace = Object.keys(elem.data())[0] || 'timer',
      remain = -1,
      start,
      timer;

  this.isPaused = false;

  this.restart = function() {
    remain = -1;
    clearTimeout(timer);
    this.start();
  }

  this.start = function() {
    this.isPaused = false;
    // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
    clearTimeout(timer);
    remain = remain <= 0 ? duration : remain;
    elem.data('paused', false);
    start = Date.now();
    timer = setTimeout(function(){
      if(options.infinite){
        _this.restart();//rerun the timer.
      }
      if (cb && typeof cb === 'function') { cb(); }
    }, remain);
    elem.trigger(("timerstart.zf." + nameSpace));
  }

  this.pause = function() {
    this.isPaused = true;
    //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
    clearTimeout(timer);
    elem.data('paused', true);
    var end = Date.now();
    remain = remain - (end - start);
    elem.trigger(("timerpaused.zf." + nameSpace));
  }
}




/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Abide; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_plugin__ = __webpack_require__(2);





/**
 * Abide module.
 * @module foundation.abide
 */

var Abide = (function (Plugin) {
  function Abide () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Abide.__proto__ = Plugin;
  Abide.prototype = Object.create( Plugin && Plugin.prototype );
  Abide.prototype.constructor = Abide;

  Abide.prototype._setup = function _setup (element, options) {
    if ( options === void 0 ) options = {};

    this.$element = element;
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(true, {}, Abide.defaults, this.$element.data(), options);

    this.className = 'Abide'; // ie9 back compat
    this._init();
  };

  /**
   * Initializes the Abide plugin and calls functions to get Abide functioning on load.
   * @private
   */
  Abide.prototype._init = function _init () {
    this.$inputs = this.$element.find('input, textarea, select');

    this._events();
  };

  /**
   * Initializes events for Abide.
   * @private
   */
  Abide.prototype._events = function _events () {
    var this$1 = this;

    this.$element.off('.abide')
      .on('reset.zf.abide', function () {
        this$1.resetForm();
      })
      .on('submit.zf.abide', function () {
        return this$1.validateForm();
      });

    if (this.options.validateOn === 'fieldChange') {
      this.$inputs
        .off('change.zf.abide')
        .on('change.zf.abide', function (e) {
          this$1.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
    }

    if (this.options.liveValidate) {
      this.$inputs
        .off('input.zf.abide')
        .on('input.zf.abide', function (e) {
          this$1.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
    }

    if (this.options.validateOnBlur) {
      this.$inputs
        .off('blur.zf.abide')
        .on('blur.zf.abide', function (e) {
          this$1.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
    }
  };

  /**
   * Calls necessary functions to update Abide upon DOM change
   * @private
   */
  Abide.prototype._reflow = function _reflow () {
    this._init();
  };

  /**
   * Checks whether or not a form element has the required attribute and if it's checked or not
   * @param {Object} element - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  Abide.prototype.requiredCheck = function requiredCheck ($el) {
    if (!$el.attr('required')) { return true; }

    var isGood = true;

    switch ($el[0].type) {
      case 'checkbox':
        isGood = $el[0].checked;
        break;

      case 'select':
      case 'select-one':
      case 'select-multiple':
        var opt = $el.find('option:selected');
        if (!opt.length || !opt.val()) { isGood = false; }
        break;

      default:
        if(!$el.val() || !$el.val().length) { isGood = false; }
    }

    return isGood;
  };

  /**
   * Get:
   * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:
   *   1. The element's direct sibling('s).
   *   2. The element's parent's children.
   * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.
   *
   * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
   *
   * @param {Object} $el - jQuery object to use as reference to find the form error selector.
   * @returns {Object} jQuery object with the selector.
   */
  Abide.prototype.findFormError = function findFormError ($el) {
    var id = $el[0].id;
    var $error = $el.siblings(this.options.formErrorSelector);

    if (!$error.length) {
      $error = $el.parent().find(this.options.formErrorSelector);
    }

    $error = $error.add(this.$element.find(("[data-form-error-for=\"" + id + "\"]")));

    return $error;
  };

  /**
   * Get the first element in this order:
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  Abide.prototype.findLabel = function findLabel ($el) {
    var id = $el[0].id;
    var $label = this.$element.find(("label[for=\"" + id + "\"]"));

    if (!$label.length) {
      return $el.closest('label');
    }

    return $label;
  };

  /**
   * Get the set of labels associated with a set of radio els in this order
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  Abide.prototype.findRadioLabels = function findRadioLabels ($els) {
    var this$1 = this;

    var labels = $els.map(function (i, el) {
      var id = el.id;
      var $label = this$1.$element.find(("label[for=\"" + id + "\"]"));

      if (!$label.length) {
        $label = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).closest('label');
      }
      return $label[0];
    });

    return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(labels);
  };

  /**
   * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
   * @param {Object} $el - jQuery object to add the class to
   */
  Abide.prototype.addErrorClasses = function addErrorClasses ($el) {
    var $label = this.findLabel($el);
    var $formError = this.findFormError($el);

    if ($label.length) {
      $label.addClass(this.options.labelErrorClass);
    }

    if ($formError.length) {
      $formError.addClass(this.options.formErrorClass);
    }

    $el.addClass(this.options.inputErrorClass).attr('data-invalid', '');
  };

  /**
   * Remove CSS error classes etc from an entire radio button group
   * @param {String} groupName - A string that specifies the name of a radio button group
   *
   */

  Abide.prototype.removeRadioErrorClasses = function removeRadioErrorClasses (groupName) {
    var $els = this.$element.find((":radio[name=\"" + groupName + "\"]"));
    var $labels = this.findRadioLabels($els);
    var $formErrors = this.findFormError($els);

    if ($labels.length) {
      $labels.removeClass(this.options.labelErrorClass);
    }

    if ($formErrors.length) {
      $formErrors.removeClass(this.options.formErrorClass);
    }

    $els.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');

  };

  /**
   * Removes CSS error class as specified by the Abide settings from the label, input, and the form
   * @param {Object} $el - jQuery object to remove the class from
   */
  Abide.prototype.removeErrorClasses = function removeErrorClasses ($el) {
    // radios need to clear all of the els
    if($el[0].type == 'radio') {
      return this.removeRadioErrorClasses($el.attr('name'));
    }

    var $label = this.findLabel($el);
    var $formError = this.findFormError($el);

    if ($label.length) {
      $label.removeClass(this.options.labelErrorClass);
    }

    if ($formError.length) {
      $formError.removeClass(this.options.formErrorClass);
    }

    $el.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
  };

  /**
   * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
   * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
   * @fires Abide#invalid
   * @fires Abide#valid
   * @param {Object} element - jQuery object to validate, should be an HTML input
   * @returns {Boolean} goodToGo - If the input is valid or not.
   */
  Abide.prototype.validateInput = function validateInput ($el) {
    var clearRequire = this.requiredCheck($el),
        validated = false,
        customValidator = true,
        validator = $el.attr('data-validator'),
        equalTo = true;

    // don't validate ignored inputs or hidden inputs or disabled inputs
    if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]') || $el.is('[disabled]')) {
      return true;
    }

    switch ($el[0].type) {
      case 'radio':
        validated = this.validateRadio($el.attr('name'));
        break;

      case 'checkbox':
        validated = clearRequire;
        break;

      case 'select':
      case 'select-one':
      case 'select-multiple':
        validated = clearRequire;
        break;

      default:
        validated = this.validateText($el);
    }

    if (validator) {
      customValidator = this.matchValidation($el, validator, $el.attr('required'));
    }

    if ($el.attr('data-equalto')) {
      equalTo = this.options.validators.equalTo($el);
    }


    var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
    var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';

    if (goodToGo) {
      // Re-validate inputs that depend on this one with equalto
      var dependentElements = this.$element.find(("[data-equalto=\"" + ($el.attr('id')) + "\"]"));
      if (dependentElements.length) {
        var _this = this;
        dependentElements.each(function() {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).val()) {
            _this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
          }
        });
      }
    }

    this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);

    /**
     * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
     * Trigger includes the DOM element of the input.
     * @event Abide#valid
     * @event Abide#invalid
     */
    $el.trigger(message, [$el]);

    return goodToGo;
  };

  /**
   * Goes through a form and if there are any invalid inputs, it will display the form error element
   * @returns {Boolean} noError - true if no errors were detected...
   * @fires Abide#formvalid
   * @fires Abide#forminvalid
   */
  Abide.prototype.validateForm = function validateForm () {
    var acc = [];
    var _this = this;

    this.$inputs.each(function() {
      acc.push(_this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)));
    });

    var noError = acc.indexOf(false) === -1;

    this.$element.find('[data-abide-error]').css('display', (noError ? 'none' : 'block'));

    /**
     * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
     * Trigger includes the element of the form.
     * @event Abide#formvalid
     * @event Abide#forminvalid
     */
    this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);

    return noError;
  };

  /**
   * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
   * @param {Object} $el - jQuery object to validate, should be a text input HTML element
   * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
   * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
   */
  Abide.prototype.validateText = function validateText ($el, pattern) {
    // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
    pattern = (pattern || $el.attr('pattern') || $el.attr('type'));
    var inputText = $el.val();
    var valid = false;

    if (inputText.length) {
      // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
      if (this.options.patterns.hasOwnProperty(pattern)) {
        valid = this.options.patterns[pattern].test(inputText);
      }
      // If the pattern name isn't also the type attribute of the field, then test it as a regexp
      else if (pattern !== $el.attr('type')) {
        valid = new RegExp(pattern).test(inputText);
      }
      else {
        valid = true;
      }
    }
    // An empty field is valid if it's not required
    else if (!$el.prop('required')) {
      valid = true;
    }

    return valid;
   };

  /**
   * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
   * @param {String} groupName - A string that specifies the name of a radio button group
   * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
   */
  Abide.prototype.validateRadio = function validateRadio (groupName) {
    // If at least one radio in the group has the `required` attribute, the group is considered required
    // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
    var $group = this.$element.find((":radio[name=\"" + groupName + "\"]"));
    var valid = false, required = false;

    // For the group to be required, at least one radio needs to be required
    $group.each(function (i, e) {
      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e).attr('required')) {
        required = true;
      }
    });
    if(!required) { valid=true; }

    if (!valid) {
      // For the group to be valid, at least one radio needs to be checked
      $group.each(function (i, e) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e).prop('checked')) {
          valid = true;
        }
      });
    };

    return valid;
  };

  /**
   * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
   * @param {Object} $el - jQuery input element.
   * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
   * @param {Boolean} required - self explanatory?
   * @returns {Boolean} - true if validations passed.
   */
  Abide.prototype.matchValidation = function matchValidation ($el, validators, required) {
    var this$1 = this;

    required = required ? true : false;

    var clear = validators.split(' ').map(function (v) {
      return this$1.options.validators[v]($el, required, $el.parent());
    });
    return clear.indexOf(false) === -1;
  };

  /**
   * Resets form inputs and styles
   * @fires Abide#formreset
   */
  Abide.prototype.resetForm = function resetForm () {
    var $form = this.$element,
        opts = this.options;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("." + (opts.labelErrorClass)), $form).not('small').removeClass(opts.labelErrorClass);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("." + (opts.inputErrorClass)), $form).not('small').removeClass(opts.inputErrorClass);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(((opts.formErrorSelector) + "." + (opts.formErrorClass))).removeClass(opts.formErrorClass);
    $form.find('[data-abide-error]').css('display', 'none');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').removeAttr('data-invalid');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input:radio', $form).not('[data-abide-ignore]').prop('checked',false).removeAttr('data-invalid');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked',false).removeAttr('data-invalid');
    /**
     * Fires when the form has been reset.
     * @event Abide#formreset
     */
    $form.trigger('formreset.zf.abide', [$form]);
  };

  /**
   * Destroys an instance of Abide.
   * Removes error styles and classes from elements, without resetting their values.
   */
  Abide.prototype._destroy = function _destroy () {
    var _this = this;
    this.$element
      .off('.abide')
      .find('[data-abide-error]')
        .css('display', 'none');

    this.$inputs
      .off('.abide')
      .each(function() {
        _this.removeErrorClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
  };

  return Abide;
}(__WEBPACK_IMPORTED_MODULE_1__foundation_plugin__["a" /* Plugin */]));

/**
 * Default settings for plugin
 */
Abide.defaults = {
  /**
   * The default event to validate inputs. Checkboxes and radios validate immediately.
   * Remove or change this value for manual validation.
   * @option
   * @type {?string}
   * @default 'fieldChange'
   */
  validateOn: 'fieldChange',

  /**
   * Class to be applied to input labels on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-label'
   */
  labelErrorClass: 'is-invalid-label',

  /**
   * Class to be applied to inputs on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-input'
   */
  inputErrorClass: 'is-invalid-input',

  /**
   * Class selector to use to target Form Errors for show/hide.
   * @option
   * @type {string}
   * @default '.form-error'
   */
  formErrorSelector: '.form-error',

  /**
   * Class added to Form Errors on failed validation.
   * @option
   * @type {string}
   * @default 'is-visible'
   */
  formErrorClass: 'is-visible',

  /**
   * Set to true to validate text inputs on any value change.
   * @option
   * @type {boolean}
   * @default false
   */
  liveValidate: false,

  /**
   * Set to true to validate inputs on blur.
   * @option
   * @type {boolean}
   * @default false
   */
  validateOnBlur: false,

  patterns: {
    alpha : /^[a-zA-Z]+$/,
    alpha_numeric : /^[a-zA-Z0-9]+$/,
    integer : /^[-+]?\d+$/,
    number : /^[-+]?\d*(?:[\.\,]\d+)?$/,

    // amex, visa, diners
    card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvv : /^([0-9]){3,4}$/,

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

    url : /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
    // abc.de
    domain : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

    datetime : /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
    // YYYY-MM-DD
    date : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
    // HH:MM:SS
    time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
    dateISO : /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
    // MM/DD/YYYY
    month_day_year : /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
    // DD/MM/YYYY
    day_month_year : /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

    // #FFF or #FFFFFF
    color : /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,

    // Domain || URL
    website: {
      test: function (text) {
        return Abide.defaults.patterns['domain'].test(text) || Abide.defaults.patterns['url'].test(text);
      }
    }
  },

  /**
   * Optional validation functions to be used. `equalTo` being the only default included function.
   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
   * el : The jQuery element to validate.
   * required : Boolean value of the required attribute be present or not.
   * parent : The direct parent of the input.
   * @option
   */
  validators: {
    equalTo: function (el, required, parent) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + (el.attr('data-equalto')))).val() === el.val();
    }
  }
}




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dropdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_positionable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__ = __webpack_require__(5);










/**
 * Dropdown module.
 * @module foundation.dropdown
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */
var Dropdown = (function (Positionable) {
  function Dropdown () {
    Positionable.apply(this, arguments);
  }

  if ( Positionable ) Dropdown.__proto__ = Positionable;
  Dropdown.prototype = Object.create( Positionable && Positionable.prototype );
  Dropdown.prototype.constructor = Dropdown;

  Dropdown.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Dropdown.defaults, this.$element.data(), options);
    this.className = 'Dropdown'; // ie9 back compat

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Dropdown', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ESCAPE': 'close'
    });
  };

  /**
   * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
   * @function
   * @private
   */
  Dropdown.prototype._init = function _init () {
    var $id = this.$element.attr('id');

    this.$anchors = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-toggle=\"" + $id + "\"]")).length ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-toggle=\"" + $id + "\"]")) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-open=\"" + $id + "\"]"));
    this.$anchors.attr({
      'aria-controls': $id,
      'data-is-focus': false,
      'data-yeti-box': $id,
      'aria-haspopup': true,
      'aria-expanded': false
    });

    this._setCurrentAnchor(this.$anchors.first());

    if(this.options.parentClass){
      this.$parent = this.$element.parents('.' + this.options.parentClass);
    }else{
      this.$parent = null;
    }

    this.$element.attr({
      'aria-hidden': 'true',
      'data-yeti-box': $id,
      'data-resize': $id,
      'aria-labelledby': this.$currentAnchor.id || Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* GetYoDigits */])(6, 'dd-anchor')
    });
    Positionable.prototype._init.call(this);
    this._events();
  };

  Dropdown.prototype._getDefaultPosition = function _getDefaultPosition () {
    // handle legacy classnames
    var position = this.$element[0].className.match(/(top|left|right|bottom)/g);
    if(position) {
      return position[0];
    } else {
      return 'bottom'
    }
  };

  Dropdown.prototype._getDefaultAlignment = function _getDefaultAlignment () {
    // handle legacy float approach
    var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.className);
    if(horizontalPosition) {
      return horizontalPosition[1];
    }

    return Positionable.prototype._getDefaultAlignment.call(this);
  };



  /**
   * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
   * Recursively calls itself if a collision is detected, with a new position class.
   * @function
   * @private
   */
  Dropdown.prototype._setPosition = function _setPosition () {
    Positionable.prototype._setPosition.call(this, this.$currentAnchor, this.$element, this.$parent);
  };

  /**
   * Make it a current anchor.
   * Current anchor as the reference for the position of Dropdown panes.
   * @param {HTML} el - DOM element of the anchor.
   * @function
   * @private
   */
  Dropdown.prototype._setCurrentAnchor = function _setCurrentAnchor (el) {
    this.$currentAnchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el);
  };

  /**
   * Adds event listeners to the element utilizing the triggers utility library.
   * @function
   * @private
   */
  Dropdown.prototype._events = function _events () {
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': this._setPosition.bind(this)
    });

    this.$anchors.off('click.zf.trigger')
      .on('click.zf.trigger', function() { _this._setCurrentAnchor(this); });

    if(this.options.hover){
      this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown')
      .on('mouseenter.zf.dropdown', function(){
        _this._setCurrentAnchor(this);

        var bodyData = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').data();
        if(typeof(bodyData.whatinput) === 'undefined' || bodyData.whatinput === 'mouse') {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function(){
            _this.open();
            _this.$anchors.data('hover', true);
          }, _this.options.hoverDelay);
        }
      }).on('mouseleave.zf.dropdown', function(){
        clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function(){
          _this.close();
          _this.$anchors.data('hover', false);
        }, _this.options.hoverDelay);
      });
      if(this.options.hoverPane){
        this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown')
            .on('mouseenter.zf.dropdown', function(){
              clearTimeout(_this.timeout);
            }).on('mouseleave.zf.dropdown', function(){
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function(){
                _this.close();
                _this.$anchors.data('hover', false);
              }, _this.options.hoverDelay);
            });
      }
    }
    this.$anchors.add(this.$element).on('keydown.zf.dropdown', function(e) {

      var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
        visibleFocusableElements = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(_this.$element);

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Dropdown', {
        open: function() {
          if ($target.is(_this.$anchors)) {
            _this.open();
            _this.$element.attr('tabindex', -1).focus();
            e.preventDefault();
          }
        },
        close: function() {
          _this.close();
          _this.$anchors.focus();
        }
      });
    });
  };

  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  Dropdown.prototype._addBodyHandler = function _addBodyHandler () {
     var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).not(this.$element),
         _this = this;
     $body.off('click.zf.dropdown')
          .on('click.zf.dropdown', function(e){
            if(_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
              return;
            }
            if(_this.$element.find(e.target).length) {
              return;
            }
            _this.close();
            $body.off('click.zf.dropdown');
          });
  };

  /**
   * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
   * @function
   * @fires Dropdown#closeme
   * @fires Dropdown#show
   */
  Dropdown.prototype.open = function open () {
    // var _this = this;
    /**
     * Fires to close other open dropdowns, typically when dropdown is opening
     * @event Dropdown#closeme
     */
    this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
    this.$anchors.addClass('hover')
        .attr({'aria-expanded': true});
    // this.$element/*.show()*/;

    this.$element.addClass('is-opening');
    this._setPosition();
    this.$element.removeClass('is-opening').addClass('is-open')
        .attr({'aria-hidden': false});

    if(this.options.autoFocus){
      var $focusable = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(this.$element);
      if($focusable.length){
        $focusable.eq(0).focus();
      }
    }

    if(this.options.closeOnClick){ this._addBodyHandler(); }

    if (this.options.trapFocus) {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(this.$element);
    }

    /**
     * Fires once the dropdown is visible.
     * @event Dropdown#show
     */
    this.$element.trigger('show.zf.dropdown', [this.$element]);
  };

  /**
   * Closes the open dropdown pane.
   * @function
   * @fires Dropdown#hide
   */
  Dropdown.prototype.close = function close () {
    if(!this.$element.hasClass('is-open')){
      return false;
    }
    this.$element.removeClass('is-open')
        .attr({'aria-hidden': true});

    this.$anchors.removeClass('hover')
        .attr('aria-expanded', false);

    /**
     * Fires once the dropdown is no longer visible.
     * @event Dropdown#hide
     */
    this.$element.trigger('hide.zf.dropdown', [this.$element]);

    if (this.options.trapFocus) {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].releaseFocus(this.$element);
    }
  };

  /**
   * Toggles the dropdown pane's visibility.
   * @function
   */
  Dropdown.prototype.toggle = function toggle () {
    if(this.$element.hasClass('is-open')){
      if(this.$anchors.data('hover')) { return; }
      this.close();
    }else{
      this.open();
    }
  };

  /**
   * Destroys the dropdown.
   * @function
   */
  Dropdown.prototype._destroy = function _destroy () {
    this.$element.off('.zf.trigger').hide();
    this.$anchors.off('.zf.dropdown');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).off('click.zf.dropdown');

  };

  return Dropdown;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_positionable__["a" /* Positionable */]));

Dropdown.defaults = {
  /**
   * Class that designates bounding container of Dropdown (default: window)
   * @option
   * @type {?string}
   * @default null
   */
  parentClass: null,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 250
   */
  hoverDelay: 250,
  /**
   * Allow submenus to open on hover events
   * @option
   * @type {boolean}
   * @default false
   */
  hover: false,
  /**
   * Don't close dropdown when hovering over dropdown pane
   * @option
   * @type {boolean}
   * @default false
   */
  hoverPane: false,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * DEPRECATED: Class applied to adjust open position.
   * @option
   * @type {string}
   * @default ''
   */
  positionClass: '',

  /**
   * Position of dropdown. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false,
  /**
   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,
  /**
   * Allows a click on the body to close the dropdown.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false
}




/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Positionable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);






var POSITIONS = ['left', 'right', 'top', 'bottom'];
var VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
var HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];

var ALIGNMENTS = {
  'left': VERTICAL_ALIGNMENTS,
  'right': VERTICAL_ALIGNMENTS,
  'top': HORIZONTAL_ALIGNMENTS,
  'bottom': HORIZONTAL_ALIGNMENTS
}

function nextItem(item, array) {
  var currentIdx = array.indexOf(item);
  if(currentIdx === array.length - 1) {
    return array[0];
  } else {
    return array[currentIdx + 1];
  }
}


var Positionable = (function (Plugin) {
  function Positionable () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Positionable.__proto__ = Plugin;
  Positionable.prototype = Object.create( Plugin && Plugin.prototype );
  Positionable.prototype.constructor = Positionable;

  Positionable.prototype._init = function _init () {
    this.triedPositions = {};
    this.position  = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
    this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
  };

  Positionable.prototype._getDefaultPosition = function _getDefaultPosition () {
    return 'bottom';
  };

  Positionable.prototype._getDefaultAlignment = function _getDefaultAlignment () {
    switch(this.position) {
      case 'bottom':
      case 'top':
        return Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* rtl */])() ? 'right' : 'left';
      case 'left':
      case 'right':
        return 'bottom';
    }
  };

  /**
   * Adjusts the positionable possible positions by iterating through alignments
   * and positions.
   * @function
   * @private
   */
  Positionable.prototype._reposition = function _reposition () {
    if(this._alignmentsExhausted(this.position)) {
      this.position = nextItem(this.position, POSITIONS);
      this.alignment = ALIGNMENTS[this.position][0];
    } else {
      this._realign();
    }
  };

  /**
   * Adjusts the dropdown pane possible positions by iterating through alignments
   * on the current position.
   * @function
   * @private
   */
  Positionable.prototype._realign = function _realign () {
    this._addTriedPosition(this.position, this.alignment)
    this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position])
  };

  Positionable.prototype._addTriedPosition = function _addTriedPosition (position, alignment) {
    this.triedPositions[position] = this.triedPositions[position] || []
    this.triedPositions[position].push(alignment);
  };

  Positionable.prototype._positionsExhausted = function _positionsExhausted () {
    var this$1 = this;

    var isExhausted = true;
    for(var i = 0; i < POSITIONS.length; i++) {
      isExhausted = isExhausted && this$1._alignmentsExhausted(POSITIONS[i]);
    }
    return isExhausted;
  };

  Positionable.prototype._alignmentsExhausted = function _alignmentsExhausted (position) {
    return this.triedPositions[position] && this.triedPositions[position].length == ALIGNMENTS[position].length;
  };


  // When we're trying to center, we don't want to apply offset that's going to
  // take us just off center, so wrap around to return 0 for the appropriate
  // offset in those alignments.  TODO: Figure out if we want to make this
  // configurable behavior... it feels more intuitive, especially for tooltips, but
  // it's possible someone might actually want to start from center and then nudge
  // slightly off.
  Positionable.prototype._getVOffset = function _getVOffset () {
    return this.options.vOffset;
  };

  Positionable.prototype._getHOffset = function _getHOffset () {
    return this.options.hOffset;
  };


  Positionable.prototype._setPosition = function _setPosition ($anchor, $element, $parent) {
    var this$1 = this;

    if($anchor.attr('aria-expanded') === 'false'){ return false; }
    var $eleDims = __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetDimensions($element),
        $anchorDims = __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetDimensions($anchor);


    $element.offset(__WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

    if(!this.options.allowOverlap) {
      var overlaps = {};
      var minOverlap = 100000000;
      // default coordinates to how we start, in case we can't figure out better
      var minCoordinates = {position: this.position, alignment: this.alignment};
      while(!this._positionsExhausted()) {
        var overlap = __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].OverlapArea($element, $parent, false, false, this$1.options.allowBottomOverlap);
        if(overlap === 0) {
          return;
        }

        if(overlap < minOverlap) {
          minOverlap = overlap;
          minCoordinates = {position: this$1.position, alignment: this$1.alignment};
        }

        this$1._reposition();

        $element.offset(__WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetExplicitOffsets($element, $anchor, this$1.position, this$1.alignment, this$1._getVOffset(), this$1._getHOffset()));
      }
      // If we get through the entire loop, there was no non-overlapping
      // position available. Pick the version with least overlap.
      this.position = minCoordinates.position;
      this.alignment = minCoordinates.alignment;
      $element.offset(__WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
    }
  };

  return Positionable;
}(__WEBPACK_IMPORTED_MODULE_1__foundation_plugin__["a" /* Plugin */]));

Positionable.defaults = {
  /**
   * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, dropdown positionable first
   * try to position as defined by data-position and data-alignment, but
   * reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Number of pixels the positionable should be separated vertically from anchor
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels the positionable should be separated horizontally from anchor
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
}




/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Equalizer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);








/**
 * Equalizer module.
 * @module foundation.equalizer
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.imageLoader if equalizer contains images
 */

var Equalizer = (function (Plugin) {
  function Equalizer () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Equalizer.__proto__ = Plugin;
  Equalizer.prototype = Object.create( Plugin && Plugin.prototype );
  Equalizer.prototype.constructor = Equalizer;

  Equalizer.prototype._setup = function _setup (element, options){
    this.$element = element;
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Equalizer.defaults, this.$element.data(), options);
    this.className = 'Equalizer'; // ie9 back compat

    this._init();
  };

  /**
   * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  Equalizer.prototype._init = function _init () {
    var eqId = this.$element.attr('data-equalizer') || '';
    var $watched = this.$element.find(("[data-equalizer-watch=\"" + eqId + "\"]"));

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
    this.$element.attr('data-resize', (eqId || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'eq')));
    this.$element.attr('data-mutate', (eqId || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'eq')));

    this.hasNested = this.$element.find('[data-equalizer]').length > 0;
    this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
    this.isOn = false;
    this._bindHandler = {
      onResizeMeBound: this._onResizeMe.bind(this),
      onPostEqualizedBound: this._onPostEqualized.bind(this)
    };

    var imgs = this.$element.find('img');
    var tooSmall;
    if(this.options.equalizeOn){
      tooSmall = this._checkMQ();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
    }else{
      this._events();
    }
    if((tooSmall !== undefined && tooSmall === false) || tooSmall === undefined){
      if(imgs.length){
        Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__["a" /* onImagesLoaded */])(imgs, this._reflow.bind(this));
      }else{
        this._reflow();
      }
    }
  };

  /**
   * Removes event listeners if the breakpoint is too small.
   * @private
   */
  Equalizer.prototype._pauseEvents = function _pauseEvents () {
    this.isOn = false;
    this.$element.off({
      '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
      'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
	  'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
    });
  };

  /**
   * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
   * @private
   */
  Equalizer.prototype._onResizeMe = function _onResizeMe (e) {
    this._reflow();
  };

  /**
   * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
   * @private
   */
  Equalizer.prototype._onPostEqualized = function _onPostEqualized (e) {
    if(e.target !== this.$element[0]){ this._reflow(); }
  };

  /**
   * Initializes events for Equalizer.
   * @private
   */
  Equalizer.prototype._events = function _events () {
    var _this = this;
    this._pauseEvents();
    if(this.hasNested){
      this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
    }else{
      this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
	  this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);
    }
    this.isOn = true;
  };

  /**
   * Checks the current breakpoint to the minimum required size.
   * @private
   */
  Equalizer.prototype._checkMQ = function _checkMQ () {
    var tooSmall = !__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].is(this.options.equalizeOn);
    if(tooSmall){
      if(this.isOn){
        this._pauseEvents();
        this.$watched.css('height', 'auto');
      }
    }else{
      if(!this.isOn){
        this._events();
      }
    }
    return tooSmall;
  };

  /**
   * A noop version for the plugin
   * @private
   */
  Equalizer.prototype._killswitch = function _killswitch () {
    return;
  };

  /**
   * Calls necessary functions to update Equalizer upon DOM change
   * @private
   */
  Equalizer.prototype._reflow = function _reflow () {
    if(!this.options.equalizeOnStack){
      if(this._isStacked()){
        this.$watched.css('height', 'auto');
        return false;
      }
    }
    if (this.options.equalizeByRow) {
      this.getHeightsByRow(this.applyHeightByRow.bind(this));
    }else{
      this.getHeights(this.applyHeight.bind(this));
    }
  };

  /**
   * Manually determines if the first 2 elements are *NOT* stacked.
   * @private
   */
  Equalizer.prototype._isStacked = function _isStacked () {
    if (!this.$watched[0] || !this.$watched[1]) {
      return true;
    }
    return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
  };

  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} heights - An array of heights of children within Equalizer container
   */
  Equalizer.prototype.getHeights = function getHeights (cb) {
    var this$1 = this;

    var heights = [];
    for(var i = 0, len = this.$watched.length; i < len; i++){
      this$1.$watched[i].style.height = 'auto';
      heights.push(this$1.$watched[i].offsetHeight);
    }
    cb(heights);
  };

  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   */
  Equalizer.prototype.getHeightsByRow = function getHeightsByRow (cb) {
    var this$1 = this;

    var lastElTopOffset = (this.$watched.length ? this.$watched.first().offset().top : 0),
        groups = [],
        group = 0;
    //group by Row
    groups[group] = [];
    for(var i = 0, len = this.$watched.length; i < len; i++){
      this$1.$watched[i].style.height = 'auto';
      //maybe could use this.$watched[i].offsetTop
      var elOffsetTop = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this$1.$watched[i]).offset().top;
      if (elOffsetTop!=lastElTopOffset) {
        group++;
        groups[group] = [];
        lastElTopOffset=elOffsetTop;
      }
      groups[group].push([this$1.$watched[i],this$1.$watched[i].offsetHeight]);
    }

    for (var j = 0, ln = groups.length; j < ln; j++) {
      var heights = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[j]).map(function(){ return this[1]; }).get();
      var max         = Math.max.apply(null, heights);
      groups[j].push(max);
    }
    cb(groups);
  };

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @param {array} heights - An array of heights of children within Equalizer container
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */
  Equalizer.prototype.applyHeight = function applyHeight (heights) {
    var max = Math.max.apply(null, heights);
    /**
     * Fires before the heights are applied
     * @event Equalizer#preequalized
     */
    this.$element.trigger('preequalized.zf.equalizer');

    this.$watched.css('height', max);

    /**
     * Fires when the heights have been applied
     * @event Equalizer#postequalized
     */
     this.$element.trigger('postequalized.zf.equalizer');
  };

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
   * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   * @fires Equalizer#preequalized
   * @fires Equalizer#preequalizedrow
   * @fires Equalizer#postequalizedrow
   * @fires Equalizer#postequalized
   */
  Equalizer.prototype.applyHeightByRow = function applyHeightByRow (groups) {
    var this$1 = this;

    /**
     * Fires before the heights are applied
     */
    this.$element.trigger('preequalized.zf.equalizer');
    for (var i = 0, len = groups.length; i < len ; i++) {
      var groupsILength = groups[i].length,
          max = groups[i][groupsILength - 1];
      if (groupsILength<=2) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[i][0][0]).css({'height':'auto'});
        continue;
      }
      /**
        * Fires before the heights per row are applied
        * @event Equalizer#preequalizedrow
        */
      this$1.$element.trigger('preequalizedrow.zf.equalizer');
      for (var j = 0, lenJ = (groupsILength-1); j < lenJ ; j++) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[i][j][0]).css({'height':max});
      }
      /**
        * Fires when the heights per row have been applied
        * @event Equalizer#postequalizedrow
        */
      this$1.$element.trigger('postequalizedrow.zf.equalizer');
    }
    /**
     * Fires when the heights have been applied
     */
     this.$element.trigger('postequalized.zf.equalizer');
  };

  /**
   * Destroys an instance of Equalizer.
   * @function
   */
  Equalizer.prototype._destroy = function _destroy () {
    this._pauseEvents();
    this.$watched.css('height', 'auto');
  };

  return Equalizer;
}(__WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */]));

/**
 * Default settings for plugin
 */
Equalizer.defaults = {
  /**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeOnStack: false,
  /**
   * Enable height equalization row by row.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeByRow: false,
  /**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @type {string}
   * @default ''
   */
  equalizeOn: ''
};




/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Interchange; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);








/**
 * Interchange module.
 * @module foundation.interchange
 * @requires foundation.util.mediaQuery
 */

var Interchange = (function (Plugin) {
  function Interchange () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Interchange.__proto__ = Plugin;
  Interchange.prototype = Object.create( Plugin && Plugin.prototype );
  Interchange.prototype.constructor = Interchange;

  Interchange.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Interchange.defaults, options);
    this.rules = [];
    this.currentPath = '';
    this.className = 'Interchange'; // ie9 back compat

    this._init();
    this._events();
  };

  /**
   * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
   * @function
   * @private
   */
  Interchange.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    var id = this.$element[0].id || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'interchange');
    this.$element.attr({
      'data-resize': id,
      'id': id
    });

    this._addBreakpoints();
    this._generateRules();
    this._reflow();
  };

  /**
   * Initializes events for Interchange.
   * @function
   * @private
   */
  Interchange.prototype._events = function _events () {
    var this$1 = this;

    this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function () { return this$1._reflow(); });
  };

  /**
   * Calls necessary functions to update Interchange upon DOM change
   * @function
   * @private
   */
  Interchange.prototype._reflow = function _reflow () {
    var this$1 = this;

    var match;

    // Iterate through each rule, but only save the last match
    for (var i in this$1.rules) {
      if(this$1.rules.hasOwnProperty(i)) {
        var rule = this$1.rules[i];
        if (window.matchMedia(rule.query).matches) {
          match = rule;
        }
      }
    }

    if (match) {
      this.replace(match.path);
    }
  };

  /**
   * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
   * @function
   * @private
   */
  Interchange.prototype._addBreakpoints = function _addBreakpoints () {
    for (var i in __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].queries) {
      if (__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].queries.hasOwnProperty(i)) {
        var query = __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].queries[i];
        Interchange.SPECIAL_QUERIES[query.name] = query.value;
      }
    }
  };

  /**
   * Checks the Interchange element for the provided media query + content pairings
   * @function
   * @private
   * @param {Object} element - jQuery object that is an Interchange instance
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */
  Interchange.prototype._generateRules = function _generateRules (element) {
    var rulesList = [];
    var rules;

    if (this.options.rules) {
      rules = this.options.rules;
    }
    else {
      rules = this.$element.data('interchange');
    }

    rules =  typeof rules === 'string' ? rules.match(/\[.*?\]/g) : rules;

    for (var i in rules) {
      if(rules.hasOwnProperty(i)) {
        var rule = rules[i].slice(1, -1).split(', ');
        var path = rule.slice(0, -1).join('');
        var query = rule[rule.length - 1];

        if (Interchange.SPECIAL_QUERIES[query]) {
          query = Interchange.SPECIAL_QUERIES[query];
        }

        rulesList.push({
          path: path,
          query: query
        });
      }
    }

    this.rules = rulesList;
  };

  /**
   * Update the `src` property of an image, or change the HTML of a container, to the specified path.
   * @function
   * @param {String} path - Path to the image or HTML partial.
   * @fires Interchange#replaced
   */
  Interchange.prototype.replace = function replace (path) {
    if (this.currentPath === path) { return; }

    var _this = this,
        trigger = 'replaced.zf.interchange';

    // Replacing images
    if (this.$element[0].nodeName === 'IMG') {
      this.$element.attr('src', path).on('load', function() {
        _this.currentPath = path;
      })
      .trigger(trigger);
    }
    // Replacing background images
    else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
      path = path.replace(/\(/g, '%28').replace(/\)/g, '%29');
      this.$element.css({ 'background-image': 'url('+path+')' })
          .trigger(trigger);
    }
    // Replacing HTML
    else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.get(path, function(response) {
        _this.$element.html(response)
             .trigger(trigger);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(response).foundation();
        _this.currentPath = path;
      });
    }

    /**
     * Fires when content in an Interchange element is done being loaded.
     * @event Interchange#replaced
     */
    // this.$element.trigger('replaced.zf.interchange');
  };

  /**
   * Destroys an instance of interchange.
   * @function
   */
  Interchange.prototype._destroy = function _destroy () {
    this.$element.off('resizeme.zf.trigger')
  };

  return Interchange;
}(__WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */]));

/**
 * Default settings for plugin
 */
Interchange.defaults = {
  /**
   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
   * @option
   * @type {?array}
   * @default null
   */
  rules: null
};

Interchange.SPECIAL_QUERIES = {
  'landscape': 'screen and (orientation: landscape)',
  'portrait': 'screen and (orientation: portrait)',
  'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
};




/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Magellan; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_smoothScroll__ = __webpack_require__(15);








/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.smoothScroll
 */

var Magellan = (function (Plugin) {
  function Magellan () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Magellan.__proto__ = Plugin;
  Magellan.prototype = Object.create( Plugin && Plugin.prototype );
  Magellan.prototype.constructor = Magellan;

  Magellan.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Magellan.defaults, this.$element.data(), options);
    this.className = 'Magellan'; // ie9 back compat

    this._init();
    this.calcPoints();
  };

  /**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  Magellan.prototype._init = function _init () {
    var id = this.$element[0].id || Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* GetYoDigits */])(6, 'magellan');
    var _this = this;
    this.$targets = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-magellan-target]');
    this.$links = this.$element.find('a');
    this.$element.attr({
      'data-resize': id,
      'data-scroll': id,
      'id': id
    });
    this.$active = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.scrollPos = parseInt(window.pageYOffset, 10);

    this._events();
  };

  /**
   * Calculates an array of pixel values that are the demarcation lines between locations on the page.
   * Can be invoked if new elements are added or the size of a location changes.
   * @function
   */
  Magellan.prototype.calcPoints = function calcPoints () {
    var _this = this,
        body = document.body,
        html = document.documentElement;

    this.points = [];
    this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
    this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));

    this.$targets.each(function(){
      var $tar = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          pt = Math.round($tar.offset().top - _this.options.threshold);
      $tar.targetPoint = pt;
      _this.points.push(pt);
    });
  };

  /**
   * Initializes events for Magellan.
   * @private
   */
  Magellan.prototype._events = function _events () {
    var _this = this,
        $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body'),
        opts = {
          duration: _this.options.animationDuration,
          easing:   _this.options.animationEasing
        };
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load', function(){
      if(_this.options.deepLinking){
        if(location.hash){
          _this.scrollToLoc(location.hash);
        }
      }
      _this.calcPoints();
      _this._updateActive();
    });

    this.$element.on({
      'resizeme.zf.trigger': this.reflow.bind(this),
      'scrollme.zf.trigger': this._updateActive.bind(this)
    }).on('click.zf.magellan', 'a[href^="#"]', function(e) {
        e.preventDefault();
        var arrival   = this.getAttribute('href');
        _this.scrollToLoc(arrival);
      });

    this._deepLinkScroll = function(e) {
      if(_this.options.deepLinking) {
        _this.scrollToLoc(window.location.hash);
      }
    };

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._deepLinkScroll);
  };

  /**
   * Function to scroll to a given location on the page.
   * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
   * @function
   */
  Magellan.prototype.scrollToLoc = function scrollToLoc (loc) {
    this._inTransition = true;
    var _this = this;

    var options = {
      animationEasing: this.options.animationEasing,
      animationDuration: this.options.animationDuration,
      threshold: this.options.threshold,
      offset: this.options.offset
    };

    __WEBPACK_IMPORTED_MODULE_3__foundation_smoothScroll__["a" /* SmoothScroll */].scrollToLoc(loc, options, function() {
      _this._inTransition = false;
      _this._updateActive();
    })
  };

  /**
   * Calls necessary functions to update Magellan upon DOM change
   * @function
   */
  Magellan.prototype.reflow = function reflow () {
    this.calcPoints();
    this._updateActive();
  };

  /**
   * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
   * @private
   * @function
   * @fires Magellan#update
   */
  Magellan.prototype._updateActive = function _updateActive (/*evt, elem, scrollPos*/) {
    if(this._inTransition) {return;}
    var winPos = /*scrollPos ||*/ parseInt(window.pageYOffset, 10),
        curIdx;

    if(winPos + this.winHeight === this.docHeight){ curIdx = this.points.length - 1; }
    else if(winPos < this.points[0]){ curIdx = undefined; }
    else{
      var isDown = this.scrollPos < winPos,
          _this = this,
          curVisible = this.points.filter(function(p, i){
            return isDown ? p - _this.options.offset <= winPos : p - _this.options.offset - _this.options.threshold <= winPos;
          });
      curIdx = curVisible.length ? curVisible.length - 1 : 0;
    }

    this.$active.removeClass(this.options.activeClass);
    this.$active = this.$links.filter('[href="#' + this.$targets.eq(curIdx).data('magellan-target') + '"]').addClass(this.options.activeClass);

    if(this.options.deepLinking){
      var hash = "";
      if(curIdx != undefined){
        hash = this.$active[0].getAttribute('href');
      }
      if(hash !== window.location.hash) {
        if(window.history.pushState){
          window.history.pushState(null, null, hash);
        }else{
          window.location.hash = hash;
        }
      }
    }

    this.scrollPos = winPos;
    /**
     * Fires when magellan is finished updating to the new active element.
     * @event Magellan#update
     */
    this.$element.trigger('update.zf.magellan', [this.$active]);
  };

  /**
   * Destroys an instance of Magellan and resets the url of the window.
   * @function
   */
  Magellan.prototype._destroy = function _destroy () {
    this.$element.off('.zf.trigger .zf.magellan')
        .find(("." + (this.options.activeClass))).removeClass(this.options.activeClass);

    if(this.options.deepLinking){
      var hash = this.$active[0].getAttribute('href');
      window.location.hash.replace(hash, '');
    }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._deepLinkScroll);
  };

  return Magellan;
}(__WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */]));

/**
 * Default settings for plugin
 */
Magellan.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Class applied to the active locations link on the magellan container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  activeClass: 'is-active',
  /**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinking: false,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
}




/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffCanvas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__ = __webpack_require__(5);










/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

var OffCanvas = (function (Plugin) {
  function OffCanvas () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) OffCanvas.__proto__ = Plugin;
  OffCanvas.prototype = Object.create( Plugin && Plugin.prototype );
  OffCanvas.prototype.constructor = OffCanvas;

  OffCanvas.prototype._setup = function _setup (element, options) {
    var this$1 = this;

    this.className = 'OffCanvas'; // ie9 back compat
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, OffCanvas.defaults, this.$element.data(), options);
    this.contentClasses = { base: [], reveal: [] };
    this.$lastTrigger = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.$triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.position = 'left';
    this.$content = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.nested = !!(this.options.nested);

    // Defines the CSS transition/position classes of the off-canvas content container.
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(['push', 'overlap']).each(function (index, val) {
      this$1.contentClasses.base.push('has-transition-'+val);
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(['left', 'right', 'top', 'bottom']).each(function (index, val) {
      this$1.contentClasses.base.push('has-position-'+val);
      this$1.contentClasses.reveal.push('has-reveal-'+val);
    });

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    this._init();
    this._events();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('OffCanvas', {
      'ESCAPE': 'close'
    });

  };

  /**
   * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
   * @function
   * @private
   */
  OffCanvas.prototype._init = function _init () {
    var id = this.$element.attr('id');

    this.$element.attr('aria-hidden', 'true');

    // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)
    if (this.options.contentId) {
      this.$content = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#'+this.options.contentId);
    } else if (this.$element.siblings('[data-off-canvas-content]').length) {
      this.$content = this.$element.siblings('[data-off-canvas-content]').first();
    } else {
      this.$content = this.$element.closest('[data-off-canvas-content]').first();
    }

    if (!this.options.contentId) {
      // Assume that the off-canvas element is nested if it isn't a sibling of the content
      this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;

    } else if (this.options.contentId && this.options.nested === null) {
      // Warning if using content ID without setting the nested option
      // Once the element is nested it is required to work properly in this case
      console.warn('Remember to use the nested option if using the content ID option!');
    }

    if (this.nested === true) {
      // Force transition overlap if nested
      this.options.transition = 'overlap';
      // Remove appropriate classes if already assigned in markup
      this.$element.removeClass('is-transition-push');
    }

    this.$element.addClass(("is-transition-" + (this.options.transition) + " is-closed"));

    // Find triggers that affect this element and add aria-expanded to them
    this.$triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document)
      .find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]')
      .attr('aria-expanded', 'false')
      .attr('aria-controls', id);

    // Get position by checking for related CSS class
    this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position;

    // Add an overlay over the content if necessary
    if (this.options.contentOverlay === true) {
      var overlay = document.createElement('div');
      var overlayPosition = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
      overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
      this.$overlay = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(overlay);
      if(overlayPosition === 'is-overlay-fixed') {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$overlay).insertAfter(this.$element);
      } else {
        this.$content.append(this.$overlay);
      }
    }

    this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, 'g').test(this.$element[0].className);

    if (this.options.isRevealed === true) {
      this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];
      this._setMQChecker();
    }

    if (this.options.transitionTime) {
      this.$element.css('transition-duration', this.options.transitionTime);
    }

    // Initally remove all transition/position CSS classes from off-canvas content container.
    this._removeContentClasses();
  };

  /**
   * Adds event handlers to the off-canvas wrapper and the exit overlay.
   * @function
   * @private
   */
  OffCanvas.prototype._events = function _events () {
    this.$element.off('.zf.trigger .zf.offcanvas').on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
    });

    if (this.options.closeOnClick === true) {
      var $target = this.options.contentOverlay ? this.$overlay : this.$content;
      $target.on({'click.zf.offcanvas': this.close.bind(this)});
    }
  };

  /**
   * Applies event listener for elements that will reveal at certain breakpoints.
   * @private
   */
  OffCanvas.prototype._setMQChecker = function _setMQChecker () {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function() {
      if (__WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      } else {
        _this.reveal(false);
      }
    }).one('load.zf.offcanvas', function() {
      if (__WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      }
    });
  };

  /**
   * Removes the CSS transition/position classes of the off-canvas content container.
   * Removing the classes is important when another off-canvas gets opened that uses the same content container.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  OffCanvas.prototype._removeContentClasses = function _removeContentClasses (hasReveal) {
    if (typeof hasReveal !== 'boolean') {
      this.$content.removeClass(this.contentClasses.base.join(' '));
    } else if (hasReveal === false) {
      this.$content.removeClass(("has-reveal-" + (this.position)));
    }
  };

  /**
   * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
   * Beforehand any transition/position class gets removed.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  OffCanvas.prototype._addContentClasses = function _addContentClasses (hasReveal) {
    this._removeContentClasses(hasReveal);
    if (typeof hasReveal !== 'boolean') {
      this.$content.addClass(("has-transition-" + (this.options.transition) + " has-position-" + (this.position)));
    } else if (hasReveal === true) {
      this.$content.addClass(("has-reveal-" + (this.position)));
    }
  };

  /**
   * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
   * @param {Boolean} isRevealed - true if element should be revealed.
   * @function
   */
  OffCanvas.prototype.reveal = function reveal (isRevealed) {
    if (isRevealed) {
      this.close();
      this.isRevealed = true;
      this.$element.attr('aria-hidden', 'false');
      this.$element.off('open.zf.trigger toggle.zf.trigger');
      this.$element.removeClass('is-closed');
    } else {
      this.isRevealed = false;
      this.$element.attr('aria-hidden', 'true');
      this.$element.off('open.zf.trigger toggle.zf.trigger').on({
        'open.zf.trigger': this.open.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this)
      });
      this.$element.addClass('is-closed');
    }
    this._addContentClasses(isRevealed);
  };

  /**
   * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
   * @private
   */
  OffCanvas.prototype._stopScrolling = function _stopScrolling (event) {
    return false;
  };

  // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
  // Only really works for y, not sure how to extend to x or if we need to.
  OffCanvas.prototype._recordScrollable = function _recordScrollable (event) {
    var elem = this; // called from event handler context with this as elem

     // If the element is scrollable (content overflows), then...
    if (elem.scrollHeight !== elem.clientHeight) {
      // If we're at the top, scroll down one pixel to allow scrolling up
      if (elem.scrollTop === 0) {
        elem.scrollTop = 1;
      }
      // If we're at the bottom, scroll up one pixel to allow scrolling down
      if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
        elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
      }
    }
    elem.allowUp = elem.scrollTop > 0;
    elem.allowDown = elem.scrollTop < (elem.scrollHeight - elem.clientHeight);
    elem.lastY = event.originalEvent.pageY;
  };

  OffCanvas.prototype._stopScrollPropagation = function _stopScrollPropagation (event) {
    var elem = this; // called from event handler context with this as elem
    var up = event.pageY < elem.lastY;
    var down = !up;
    elem.lastY = event.pageY;

    if((up && elem.allowUp) || (down && elem.allowDown)) {
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
  };

  /**
   * Opens the off-canvas menu.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   * @fires OffCanvas#opened
   */
  OffCanvas.prototype.open = function open (event, trigger) {
    if (this.$element.hasClass('is-open') || this.isRevealed) { return; }
    var _this = this;

    if (trigger) {
      this.$lastTrigger = trigger;
    }

    if (this.options.forceTo === 'top') {
      window.scrollTo(0, 0);
    } else if (this.options.forceTo === 'bottom') {
      window.scrollTo(0,document.body.scrollHeight);
    }

    if (this.options.transitionTime && this.options.transition !== 'overlap') {
      this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
    } else {
      this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
    }

    /**
     * Fires when the off-canvas menu opens.
     * @event OffCanvas#opened
     */
    this.$element.addClass('is-open').removeClass('is-closed');

    this.$triggers.attr('aria-expanded', 'true');
    this.$element.attr('aria-hidden', 'false')
        .trigger('opened.zf.offcanvas');

    this.$content.addClass('is-open-' + this.position);

    // If `contentScroll` is set to false, add class and disable scrolling on touch devices.
    if (this.options.contentScroll === false) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
      this.$element.on('touchstart', this._recordScrollable);
      this.$element.on('touchmove', this._stopScrollPropagation);
    }

    if (this.options.contentOverlay === true) {
      this.$overlay.addClass('is-visible');
    }

    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.addClass('is-closable');
    }

    if (this.options.autoFocus === true) {
      this.$element.one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])(this.$element), function() {
        if (!_this.$element.hasClass('is-open')) {
          return; // exit if prematurely closed
        }
        var canvasFocus = _this.$element.find('[data-autofocus]');
        if (canvasFocus.length) {
            canvasFocus.eq(0).focus();
        } else {
            _this.$element.find('a, button').eq(0).focus();
        }
      });
    }

    if (this.options.trapFocus === true) {
      this.$content.attr('tabindex', '-1');
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(this.$element);
    }

    this._addContentClasses();
  };

  /**
   * Closes the off-canvas menu.
   * @function
   * @param {Function} cb - optional cb to fire after closure.
   * @fires OffCanvas#closed
   */
  OffCanvas.prototype.close = function close (cb) {
    if (!this.$element.hasClass('is-open') || this.isRevealed) { return; }

    var _this = this;

    this.$element.removeClass('is-open');

    this.$element.attr('aria-hidden', 'true')
      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#closed
       */
        .trigger('closed.zf.offcanvas');

    this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');

    // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.
    if (this.options.contentScroll === false) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
      this.$element.off('touchstart', this._recordScrollable);
      this.$element.off('touchmove', this._stopScrollPropagation);
    }

    if (this.options.contentOverlay === true) {
      this.$overlay.removeClass('is-visible');
    }

    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.removeClass('is-closable');
    }

    this.$triggers.attr('aria-expanded', 'false');

    if (this.options.trapFocus === true) {
      this.$content.removeAttr('tabindex');
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].releaseFocus(this.$element);
    }

    // Listen to transitionEnd and add class when done.
    this.$element.one(Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])(this.$element), function(e) {
      _this.$element.addClass('is-closed');
      _this._removeContentClasses();
    });
  };

  /**
   * Toggles the off-canvas menu open or closed.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   */
  OffCanvas.prototype.toggle = function toggle (event, trigger) {
    if (this.$element.hasClass('is-open')) {
      this.close(event, trigger);
    }
    else {
      this.open(event, trigger);
    }
  };

  /**
   * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
   * @function
   * @private
   */
  OffCanvas.prototype._handleKeyboard = function _handleKeyboard (e) {
    var this$1 = this;

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'OffCanvas', {
      close: function () {
        this$1.close();
        this$1.$lastTrigger.focus();
        return true;
      },
      handled: function () {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  };

  /**
   * Destroys the offcanvas plugin.
   * @function
   */
  OffCanvas.prototype._destroy = function _destroy () {
    this.close();
    this.$element.off('.zf.trigger .zf.offcanvas');
    this.$overlay.off('.zf.offcanvas');
  };

  return OffCanvas;
}(__WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */]));

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,

  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,

  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,

  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,

  /**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @type {number}
   * @default null
   */
  transitionTime: null,

  /**
   * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: 'push',

  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,

  /**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,

  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,

  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,

  /**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: 'reveal-for-',

  /**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
}




/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Orbit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__ = __webpack_require__(10);












/**
 * Orbit module.
 * @module foundation.orbit
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.timer
 * @requires foundation.util.imageLoader
 * @requires foundation.util.touch
 */

var Orbit = (function (Plugin) {
  function Orbit () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Orbit.__proto__ = Plugin;
  Orbit.prototype = Object.create( Plugin && Plugin.prototype );
  Orbit.prototype.constructor = Orbit;

  Orbit.prototype._setup = function _setup (element, options){
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Orbit.defaults, this.$element.data(), options);
    this.className = 'Orbit'; // ie9 back compat

    __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__["a" /* Touch */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a); // Touch init is idempotent, we just need to make sure it's initialied.

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Orbit', {
      'ltr': {
        'ARROW_RIGHT': 'next',
        'ARROW_LEFT': 'previous'
      },
      'rtl': {
        'ARROW_LEFT': 'next',
        'ARROW_RIGHT': 'previous'
      }
    });
  };

  /**
  * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
  * @function
  * @private
  */
  Orbit.prototype._init = function _init () {
    // @TODO: consider discussion on PR #9278 about DOM pollution by changeSlide
    this._reset();

    this.$wrapper = this.$element.find(("." + (this.options.containerClass)));
    this.$slides = this.$element.find(("." + (this.options.slideClass)));

    var $images = this.$element.find('img'),
        initActive = this.$slides.filter('.is-active'),
        id = this.$element[0].id || Object(__WEBPACK_IMPORTED_MODULE_5__foundation_util_core__["a" /* GetYoDigits */])(6, 'orbit');

    this.$element.attr({
      'data-resize': id,
      'id': id
    });

    if (!initActive.length) {
      this.$slides.eq(0).addClass('is-active');
    }

    if (!this.options.useMUI) {
      this.$slides.addClass('no-motionui');
    }

    if ($images.length) {
      Object(__WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__["a" /* onImagesLoaded */])($images, this._prepareForOrbit.bind(this));
    } else {
      this._prepareForOrbit();//hehe
    }

    if (this.options.bullets) {
      this._loadBullets();
    }

    this._events();

    if (this.options.autoPlay && this.$slides.length > 1) {
      this.geoSync();
    }

    if (this.options.accessible) { // allow wrapper to be focusable to enable arrow navigation
      this.$wrapper.attr('tabindex', 0);
    }
  };

  /**
  * Creates a jQuery collection of bullets, if they are being used.
  * @function
  * @private
  */
  Orbit.prototype._loadBullets = function _loadBullets () {
    this.$bullets = this.$element.find(("." + (this.options.boxOfBullets))).find('button');
  };

  /**
  * Sets a `timer` object on the orbit, and starts the counter for the next slide.
  * @function
  */
  Orbit.prototype.geoSync = function geoSync () {
    var _this = this;
    this.timer = new __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__["a" /* Timer */](
      this.$element,
      {
        duration: this.options.timerDelay,
        infinite: false
      },
      function() {
        _this.changeSlide(true);
      });
    this.timer.start();
  };

  /**
  * Sets wrapper and slide heights for the orbit.
  * @function
  * @private
  */
  Orbit.prototype._prepareForOrbit = function _prepareForOrbit () {
    var _this = this;
    this._setWrapperHeight();
  };

  /**
  * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
  * @function
  * @private
  * @param {Function} cb - a callback function to fire when complete.
  */
  Orbit.prototype._setWrapperHeight = function _setWrapperHeight (cb) {//rewrite this to `for` loop
    var max = 0, temp, counter = 0, _this = this;

    this.$slides.each(function() {
      temp = this.getBoundingClientRect().height;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('data-slide', counter);

      if (!/mui/g.test(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)[0].className) && _this.$slides.filter('.is-active')[0] !== _this.$slides.eq(counter)[0]) {//if not the active slide, set css position and display property
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css({'position': 'relative', 'display': 'none'});
      }
      max = temp > max ? temp : max;
      counter++;
    });

    if (counter === this.$slides.length) {
      this.$wrapper.css({'height': max}); //only change the wrapper height property once.
      if(cb) {cb(max);} //fire callback with max height dimension.
    }
  };

  /**
  * Sets the max-height of each slide.
  * @function
  * @private
  */
  Orbit.prototype._setSlideHeight = function _setSlideHeight (height) {
    this.$slides.each(function() {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css('max-height', height);
    });
  };

  /**
  * Adds event listeners to basically everything within the element.
  * @function
  * @private
  */
  Orbit.prototype._events = function _events () {
    var _this = this;

    //***************************************
    //**Now using custom event - thanks to:**
    //**      Yohai Ararat of Toronto      **
    //***************************************
    //
    this.$element.off('.resizeme.zf.trigger').on({
      'resizeme.zf.trigger': this._prepareForOrbit.bind(this)
    })
    if (this.$slides.length > 1) {

      if (this.options.swipe) {
        this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit')
        .on('swipeleft.zf.orbit', function(e){
          e.preventDefault();
          _this.changeSlide(true);
        }).on('swiperight.zf.orbit', function(e){
          e.preventDefault();
          _this.changeSlide(false);
        });
      }
      //***************************************

      if (this.options.autoPlay) {
        this.$slides.on('click.zf.orbit', function() {
          _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);
          _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
        });

        if (this.options.pauseOnHover) {
          this.$element.on('mouseenter.zf.orbit', function() {
            _this.timer.pause();
          }).on('mouseleave.zf.orbit', function() {
            if (!_this.$element.data('clickedOn')) {
              _this.timer.start();
            }
          });
        }
      }

      if (this.options.navButtons) {
        var $controls = this.$element.find(("." + (this.options.nextClass) + ", ." + (this.options.prevClass)));
        $controls.attr('tabindex', 0)
        //also need to handle enter/return and spacebar key presses
        .on('click.zf.orbit touchend.zf.orbit', function(e){
	  e.preventDefault();
          _this.changeSlide(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass(_this.options.nextClass));
        });
      }

      if (this.options.bullets) {
        this.$bullets.on('click.zf.orbit touchend.zf.orbit', function() {
          if (/is-active/g.test(this.className)) { return false; }//if this is active, kick out of function.
          var idx = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('slide'),
          ltr = idx > _this.$slides.filter('.is-active').data('slide'),
          $slide = _this.$slides.eq(idx);

          _this.changeSlide(ltr, $slide, idx);
        });
      }

      if (this.options.accessible) {
        this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function(e) {
          // handle keyboard event with keyboard util
          __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Orbit', {
            next: function() {
              _this.changeSlide(true);
            },
            previous: function() {
              _this.changeSlide(false);
            },
            handled: function() { // if bullet is focused, make sure focus moves
              if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is(_this.$bullets)) {
                _this.$bullets.filter('.is-active').focus();
              }
            }
          });
        });
      }
    }
  };

  /**
   * Resets Orbit so it can be reinitialized
   */
  Orbit.prototype._reset = function _reset () {
    // Don't do anything if there are no slides (first run)
    if (typeof this.$slides == 'undefined') {
      return;
    }

    if (this.$slides.length > 1) {
      // Remove old events
      this.$element.off('.zf.orbit').find('*').off('.zf.orbit')

      // Restart timer if autoPlay is enabled
      if (this.options.autoPlay) {
        this.timer.restart();
      }

      // Reset all sliddes
      this.$slides.each(function(el) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).removeClass('is-active is-active is-in')
          .removeAttr('aria-live')
          .hide();
      });

      // Show the first slide
      this.$slides.first().addClass('is-active').show();

      // Triggers when the slide has finished animating
      this.$element.trigger('slidechange.zf.orbit', [this.$slides.first()]);

      // Select first bullet if bullets are present
      if (this.options.bullets) {
        this._updateBullets(0);
      }
    }
  };

  /**
  * Changes the current slide to a new one.
  * @function
  * @param {Boolean} isLTR - flag if the slide should move left to right.
  * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
  * @param {Number} idx - the index of the new slide in its collection, if one chosen.
  * @fires Orbit#slidechange
  */
  Orbit.prototype.changeSlide = function changeSlide (isLTR, chosenSlide, idx) {
    if (!this.$slides) {return; } // Don't freak out if we're in the middle of cleanup
    var $curSlide = this.$slides.filter('.is-active').eq(0);

    if (/mui/g.test($curSlide[0].className)) { return false; } //if the slide is currently animating, kick out of the function

    var $firstSlide = this.$slides.first(),
    $lastSlide = this.$slides.last(),
    dirIn = isLTR ? 'Right' : 'Left',
    dirOut = isLTR ? 'Left' : 'Right',
    _this = this,
    $newSlide;

    if (!chosenSlide) { //most of the time, this will be auto played or clicked from the navButtons.
      $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
      (this.options.infiniteWrap ? $curSlide.next(("." + (this.options.slideClass))).length ? $curSlide.next(("." + (this.options.slideClass))) : $firstSlide : $curSlide.next(("." + (this.options.slideClass))))//pick next slide if moving left to right
      :
      (this.options.infiniteWrap ? $curSlide.prev(("." + (this.options.slideClass))).length ? $curSlide.prev(("." + (this.options.slideClass))) : $lastSlide : $curSlide.prev(("." + (this.options.slideClass))));//pick prev slide if moving right to left
    } else {
      $newSlide = chosenSlide;
    }

    if ($newSlide.length) {
      /**
      * Triggers before the next slide starts animating in and only if a next slide has been found.
      * @event Orbit#beforeslidechange
      */
      this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);

      if (this.options.bullets) {
        idx = idx || this.$slides.index($newSlide); //grab index to update bullets
        this._updateBullets(idx);
      }

      if (this.options.useMUI && !this.$element.is(':hidden')) {
        __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateIn(
          $newSlide.addClass('is-active').css({'position': 'absolute', 'top': 0}),
          this.options[("animInFrom" + dirIn)],
          function(){
            $newSlide.css({'position': 'relative', 'display': 'block'})
            .attr('aria-live', 'polite');
        });

        __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateOut(
          $curSlide.removeClass('is-active'),
          this.options[("animOutTo" + dirOut)],
          function(){
            $curSlide.removeAttr('aria-live');
            if(_this.options.autoPlay && !_this.timer.isPaused){
              _this.timer.restart();
            }
            //do stuff?
          });
      } else {
        $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
        $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();
        if (this.options.autoPlay && !this.timer.isPaused) {
          this.timer.restart();
        }
      }
    /**
    * Triggers when the slide has finished animating in.
    * @event Orbit#slidechange
    */
      this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
    }
  };

  /**
  * Updates the active state of the bullets, if displayed.
  * @function
  * @private
  * @param {Number} idx - the index of the current slide.
  */
  Orbit.prototype._updateBullets = function _updateBullets (idx) {
    var $oldBullet = this.$element.find(("." + (this.options.boxOfBullets)))
    .find('.is-active').removeClass('is-active').blur(),
    span = $oldBullet.find('span:last').detach(),
    $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
  };

  /**
  * Destroys the carousel and hides the element.
  * @function
  */
  Orbit.prototype._destroy = function _destroy () {
    this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
  };

  return Orbit;
}(__WEBPACK_IMPORTED_MODULE_6__foundation_plugin__["a" /* Plugin */]));

Orbit.defaults = {
  /**
  * Tells the JS to look for and loadBullets.
  * @option
   * @type {boolean}
  * @default true
  */
  bullets: true,
  /**
  * Tells the JS to apply event listeners to nav buttons
  * @option
   * @type {boolean}
  * @default true
  */
  navButtons: true,
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-right'
  */
  animInFromRight: 'slide-in-right',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-right'
  */
  animOutToRight: 'slide-out-right',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-left'
  *
  */
  animInFromLeft: 'slide-in-left',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-left'
  */
  animOutToLeft: 'slide-out-left',
  /**
  * Allows Orbit to automatically animate on page load.
  * @option
   * @type {boolean}
  * @default true
  */
  autoPlay: true,
  /**
  * Amount of time, in ms, between slide transitions
  * @option
   * @type {number}
  * @default 5000
  */
  timerDelay: 5000,
  /**
  * Allows Orbit to infinitely loop through the slides
  * @option
   * @type {boolean}
  * @default true
  */
  infiniteWrap: true,
  /**
  * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
  * @option
   * @type {boolean}
  * @default true
  */
  swipe: true,
  /**
  * Allows the timing function to pause animation on hover.
  * @option
   * @type {boolean}
  * @default true
  */
  pauseOnHover: true,
  /**
  * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
  * @option
   * @type {boolean}
  * @default true
  */
  accessible: true,
  /**
  * Class applied to the container of Orbit
  * @option
   * @type {string}
  * @default 'orbit-container'
  */
  containerClass: 'orbit-container',
  /**
  * Class applied to individual slides.
  * @option
   * @type {string}
  * @default 'orbit-slide'
  */
  slideClass: 'orbit-slide',
  /**
  * Class applied to the bullet container. You're welcome.
  * @option
   * @type {string}
  * @default 'orbit-bullets'
  */
  boxOfBullets: 'orbit-bullets',
  /**
  * Class applied to the `next` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-next'
  */
  nextClass: 'orbit-next',
  /**
  * Class applied to the `previous` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-previous'
  */
  prevClass: 'orbit-previous',
  /**
  * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatability.
  * @option
   * @type {boolean}
  * @default true
  */
  useMUI: true
};




/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_dropdownMenu__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_drilldown__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_accordionMenu__ = __webpack_require__(12);












var MenuPlugins = {
  dropdown: {
    cssClass: 'dropdown',
    plugin: __WEBPACK_IMPORTED_MODULE_4__foundation_dropdownMenu__["a" /* DropdownMenu */]
  },
 drilldown: {
    cssClass: 'drilldown',
    plugin: __WEBPACK_IMPORTED_MODULE_5__foundation_drilldown__["a" /* Drilldown */]
  },
  accordion: {
    cssClass: 'accordion-menu',
    plugin: __WEBPACK_IMPORTED_MODULE_6__foundation_accordionMenu__["a" /* AccordionMenu */]
  }
};

  // import "foundation.util.triggers.js";


/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

var ResponsiveMenu = (function (Plugin) {
  function ResponsiveMenu () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) ResponsiveMenu.__proto__ = Plugin;
  ResponsiveMenu.prototype = Object.create( Plugin && Plugin.prototype );
  ResponsiveMenu.prototype.constructor = ResponsiveMenu;

  ResponsiveMenu.prototype._setup = function _setup (element, options) {
    this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
    this.rules = this.$element.data('responsive-menu');
    this.currentMq = null;
    this.currentPlugin = null;
    this.className = 'ResponsiveMenu'; // ie9 back compat

    this._init();
    this._events();
  };

  /**
   * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
   * @function
   * @private
   */
  ResponsiveMenu.prototype._init = function _init () {

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
    if (typeof this.rules === 'string') {
      var rulesTree = {};

      // Parse rules from "classes" pulled from data attribute
      var rules = this.rules.split(' ');

      // Iterate through every rule found
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i].split('-');
        var ruleSize = rule.length > 1 ? rule[0] : 'small';
        var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

        if (MenuPlugins[rulePlugin] !== null) {
          rulesTree[ruleSize] = MenuPlugins[rulePlugin];
        }
      }

      this.rules = rulesTree;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isEmptyObject(this.rules)) {
      this._checkMediaQueries();
    }
    // Add data-mutate since children may need it.
    this.$element.attr('data-mutate', (this.$element.attr('data-mutate') || Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* GetYoDigits */])(6, 'responsive-menu')));
  };

  /**
   * Initializes events for the Menu.
   * @function
   * @private
   */
  ResponsiveMenu.prototype._events = function _events () {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function() {
      _this._checkMediaQueries();
    });
    // $(window).on('resize.zf.ResponsiveMenu', function() {
    //   _this._checkMediaQueries();
    // });
  };

  /**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */
  ResponsiveMenu.prototype._checkMediaQueries = function _checkMediaQueries () {
    var matchedMq, _this = this;
    // Iterate through each rule and find the last matching rule
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(this.rules, function(key) {
      if (__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(key)) {
        matchedMq = key;
      }
    });

    // No match? No dice
    if (!matchedMq) { return; }

    // Plugin already initialized? We good
    if (this.currentPlugin instanceof this.rules[matchedMq].plugin) { return; }

    // Remove existing plugin-specific CSS classes
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(MenuPlugins, function(key, value) {
      _this.$element.removeClass(value.cssClass);
    });

    // Add the CSS class for the new plugin
    this.$element.addClass(this.rules[matchedMq].cssClass);

    // Create an instance of the new plugin
    if (this.currentPlugin) { this.currentPlugin.destroy(); }
    this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
  };

  /**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */
  ResponsiveMenu.prototype._destroy = function _destroy () {
    this.currentPlugin.destroy();
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('.zf.ResponsiveMenu');
  };

  return ResponsiveMenu;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]));

ResponsiveMenu.defaults = {};




/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveToggle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);








/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */

var ResponsiveToggle = (function (Plugin) {
  function ResponsiveToggle () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) ResponsiveToggle.__proto__ = Plugin;
  ResponsiveToggle.prototype = Object.create( Plugin && Plugin.prototype );
  ResponsiveToggle.prototype.constructor = ResponsiveToggle;

  ResponsiveToggle.prototype._setup = function _setup (element, options) {
    this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
    this.className = 'ResponsiveToggle'; // ie9 back compat

    this._init();
    this._events();
  };

  /**
   * Initializes the tab bar by finding the target element, toggling element, and running update().
   * @function
   * @private
   */
  ResponsiveToggle.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    var targetID = this.$element.data('responsive-toggle');
    if (!targetID) {
      console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
    }

    this.$targetMenu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + targetID));
    this.$toggler = this.$element.find('[data-toggle]').filter(function() {
      var target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');
      return (target === targetID || target === "");
    });
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, this.options, this.$targetMenu.data());

    // If they were set, parse the animation classes
    if(this.options.animate) {
      var input = this.options.animate.split(' ');

      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }

    this._update();
  };

  /**
   * Adds necessary event handlers for the tab bar to work.
   * @function
   * @private
   */
  ResponsiveToggle.prototype._events = function _events () {
    var _this = this;

    this._updateMqHandler = this._update.bind(this);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._updateMqHandler);

    this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
  };

  /**
   * Checks the current media query to determine if the tab bar should be visible or hidden.
   * @function
   * @private
   */
  ResponsiveToggle.prototype._update = function _update () {
    // Mobile
    if (!__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(this.options.hideFor)) {
      this.$element.show();
      this.$targetMenu.hide();
    }

    // Desktop
    else {
      this.$element.hide();
      this.$targetMenu.show();
    }
  };

  /**
   * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
   * @function
   * @fires ResponsiveToggle#toggled
   */
  ResponsiveToggle.prototype.toggleMenu = function toggleMenu () {
    var this$1 = this;

    if (!__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(this.options.hideFor)) {
      /**
       * Fires when the element attached to the tab bar toggles.
       * @event ResponsiveToggle#toggled
       */
      if(this.options.animate) {
        if (this.$targetMenu.is(':hidden')) {
          __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateIn(this.$targetMenu, this.animationIn, function () {
            this$1.$element.trigger('toggled.zf.responsiveToggle');
            this$1.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
          });
        }
        else {
          __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateOut(this.$targetMenu, this.animationOut, function () {
            this$1.$element.trigger('toggled.zf.responsiveToggle');
          });
        }
      }
      else {
        this.$targetMenu.toggle(0);
        this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
        this.$element.trigger('toggled.zf.responsiveToggle');
      }
    }
  };;

  ResponsiveToggle.prototype._destroy = function _destroy () {
    this.$element.off('.zf.responsiveToggle');
    this.$toggler.off('.zf.responsiveToggle');

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._updateMqHandler);
  };

  return ResponsiveToggle;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]));

ResponsiveToggle.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
  hideFor: 'medium',

  /**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};




/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Reveal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__ = __webpack_require__(5);









/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */

var Reveal = (function (Plugin) {
  function Reveal () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Reveal.__proto__ = Plugin;
  Reveal.prototype = Object.create( Plugin && Plugin.prototype );
  Reveal.prototype.constructor = Reveal;

  Reveal.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Reveal.defaults, this.$element.data(), options);
    this.className = 'Reveal'; // ie9 back compat
    this._init();

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Reveal', {
      'ESCAPE': 'close',
    });
  };

  /**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */
  Reveal.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    this.id = this.$element.attr('id');
    this.isActive = false;
    this.cached = {mq: __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].current};
    this.isMobile = mobileSniff();

    this.$anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-open=\"" + (this.id) + "\"]")).length ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-open=\"" + (this.id) + "\"]")) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-toggle=\"" + (this.id) + "\"]"));
    this.$anchor.attr({
      'aria-controls': this.id,
      'aria-haspopup': true,
      'tabindex': 0
    });

    if (this.options.fullScreen || this.$element.hasClass('full')) {
      this.options.fullScreen = true;
      this.options.overlay = false;
    }
    if (this.options.overlay && !this.$overlay) {
      this.$overlay = this._makeOverlay(this.id);
    }

    this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'data-yeti-box': this.id,
        'data-resize': this.id
    });

    if(this.$overlay) {
      this.$element.detach().appendTo(this.$overlay);
    } else {
      this.$element.detach().appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.appendTo));
      this.$element.addClass('without-overlay');
    }
    this._events();
    if (this.options.deepLink && window.location.hash === ( ("#" + (this.id)))) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load.zf.reveal', this.open.bind(this));
    }
  };

  /**
   * Creates an overlay div to display behind the modal.
   * @private
   */
  Reveal.prototype._makeOverlay = function _makeOverlay () {
    var additionalOverlayClasses = '';

    if (this.options.additionalOverlayClasses) {
      additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
    }

    return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div></div>')
      .addClass('reveal-overlay' + additionalOverlayClasses)
      .appendTo(this.options.appendTo);
  };

  /**
   * Updates position of modal
   * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
   * @private
   */
  Reveal.prototype._updatePosition = function _updatePosition () {
    var width = this.$element.outerWidth();
    var outerWidth = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).width();
    var height = this.$element.outerHeight();
    var outerHeight = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height();
    var left, top;
    if (this.options.hOffset === 'auto') {
      left = parseInt((outerWidth - width) / 2, 10);
    } else {
      left = parseInt(this.options.hOffset, 10);
    }
    if (this.options.vOffset === 'auto') {
      if (height > outerHeight) {
        top = parseInt(Math.min(100, outerHeight / 10), 10);
      } else {
        top = parseInt((outerHeight - height) / 4, 10);
      }
    } else {
      top = parseInt(this.options.vOffset, 10);
    }
    this.$element.css({top: top + 'px'});
    // only worry about left if we don't have an overlay or we havea  horizontal offset,
    // otherwise we're perfectly in the middle
    if(!this.$overlay || (this.options.hOffset !== 'auto')) {
      this.$element.css({left: left + 'px'});
      this.$element.css({margin: '0px'});
    }

  };

  /**
   * Adds event handlers for the modal.
   * @private
   */
  Reveal.prototype._events = function _events () {
    var this$1 = this;

    var _this = this;

    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': function (event, $element) {
        if ((event.target === _this.$element[0]) ||
            (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.target).parents('[data-closable]')[0] === $element)) { // only close reveal when it's explicitly called
          return this$1.close.apply(this$1);
        }
      },
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': function() {
        _this._updatePosition();
      }
    });

    if (this.options.closeOnClick && this.options.overlay) {
      this.$overlay.off('.zf.reveal').on('click.zf.reveal', function(e) {
        if (e.target === _this.$element[0] ||
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target) ||
            !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(document, e.target)) {
              return;
        }
        _this.close();
      });
    }
    if (this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on(("popstate.zf.reveal:" + (this.id)), this._handleState.bind(this));
    }
  };

  /**
   * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
   * @private
   */
  Reveal.prototype._handleState = function _handleState (e) {
    if(window.location.hash === ( '#' + this.id) && !this.isActive){ this.open(); }
    else{ this.close(); }
  };


  /**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @function
   * @fires Reveal#closeme
   * @fires Reveal#open
   */
  Reveal.prototype.open = function open () {
    var this$1 = this;

    // either update or replace browser history
    if (this.options.deepLink) {
      var hash = "#" + (this.id);

      if (window.history.pushState) {
        if (this.options.updateHistory) {
          window.history.pushState({}, '', hash);
        } else {
          window.history.replaceState({}, '', hash);
        }
      } else {
        window.location.hash = hash;
      }
    }

    this.isActive = true;

    // Make elements invisible, but remove display: none so we can get size and positioning
    this.$element
        .css({ 'visibility': 'hidden' })
        .show()
        .scrollTop(0);
    if (this.options.overlay) {
      this.$overlay.css({'visibility': 'hidden'}).show();
    }

    this._updatePosition();

    this.$element
      .hide()
      .css({ 'visibility': '' });

    if(this.$overlay) {
      this.$overlay.css({'visibility': ''}).hide();
      if(this.$element.hasClass('fast')) {
        this.$overlay.addClass('fast');
      } else if (this.$element.hasClass('slow')) {
        this.$overlay.addClass('slow');
      }
    }


    if (!this.options.multipleOpened) {
      /**
       * Fires immediately before the modal opens.
       * Closes any other modals that are currently open
       * @event Reveal#closeme
       */
      this.$element.trigger('closeme.zf.reveal', this.id);
    }

    var _this = this;

    function addRevealOpenClasses() {
      if (_this.isMobile) {
        if(!_this.originalScrollPos) {
          _this.originalScrollPos = window.pageYOffset;
        }
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').addClass('is-reveal-open');
      }
      else {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').addClass('is-reveal-open');
      }
    }
    // Motion UI method of reveal
    if (this.options.animationIn) {
      function afterAnimation(){
        _this.$element
          .attr({
            'aria-hidden': false,
            'tabindex': -1
          })
          .focus();
        addRevealOpenClasses();
        __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(_this.$element);
      }
      if (this.options.overlay) {
        __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateIn(this.$overlay, 'fade-in');
      }
      __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateIn(this.$element, this.options.animationIn, function () {
        if(this$1.$element) { // protect against object having been removed
          this$1.focusableElements = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(this$1.$element);
          afterAnimation();
        }
      });
    }
    // jQuery method of reveal
    else {
      if (this.options.overlay) {
        this.$overlay.show(0);
      }
      this.$element.show(this.options.showDelay);
    }

    // handle accessibility
    this.$element
      .attr({
        'aria-hidden': false,
        'tabindex': -1
      })
      .focus();
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(this.$element);

    addRevealOpenClasses();

    this._extraHandlers();

    /**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */
    this.$element.trigger('open.zf.reveal');
  };

  /**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */
  Reveal.prototype._extraHandlers = function _extraHandlers () {
    var _this = this;
    if(!this.$element) { return; } // If we're in the middle of cleanup, don't freak out
    this.focusableElements = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(this.$element);

    if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').on('click.zf.reveal', function(e) {
        if (e.target === _this.$element[0] ||
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target) ||
            !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(document, e.target)) { return; }
        _this.close();
      });
    }

    if (this.options.closeOnEsc) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('keydown.zf.reveal', function(e) {
        __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Reveal', {
          close: function() {
            if (_this.options.closeOnEsc) {
              _this.close();
            }
          }
        });
      });
    }
  };

  /**
   * Closes the modal.
   * @function
   * @fires Reveal#closed
   */
  Reveal.prototype.close = function close () {
    if (!this.isActive || !this.$element.is(':visible')) {
      return false;
    }
    var _this = this;

    // Motion UI method of hiding
    if (this.options.animationOut) {
      if (this.options.overlay) {
        __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateOut(this.$overlay, 'fade-out');
      }

      __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateOut(this.$element, this.options.animationOut, finishUp);
    }
    // jQuery method of hiding
    else {
      this.$element.hide(this.options.hideDelay);

      if (this.options.overlay) {
        this.$overlay.hide(0, finishUp);
      }
      else {
        finishUp();
      }
    }

    // Conditionals to remove extra event listeners added on open
    if (this.options.closeOnEsc) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('keydown.zf.reveal');
    }

    if (!this.options.overlay && this.options.closeOnClick) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').off('click.zf.reveal');
    }

    this.$element.off('keydown.zf.reveal');

    function finishUp() {
      if (_this.isMobile) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.reveal:visible').length === 0) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').removeClass('is-reveal-open');
        }
        if(_this.originalScrollPos) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').scrollTop(_this.originalScrollPos);
          _this.originalScrollPos = null;
        }
      }
      else {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.reveal:visible').length  === 0) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').removeClass('is-reveal-open');
        }
      }


      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].releaseFocus(_this.$element);

      _this.$element.attr('aria-hidden', true);

      /**
      * Fires when the modal is done closing.
      * @event Reveal#closed
      */
      _this.$element.trigger('closed.zf.reveal');
    }

    /**
    * Resets the modal content
    * This prevents a running video to keep going in the background
    */
    if (this.options.resetOnClose) {
      this.$element.html(this.$element.html());
    }

    this.isActive = false;
     if (_this.options.deepLink) {
       if (window.history.replaceState) {
         window.history.replaceState('', document.title, window.location.href.replace(("#" + (this.id)), ''));
       } else {
         window.location.hash = '';
       }
     }

    this.$anchor.focus();
  };

  /**
   * Toggles the open/closed state of a modal.
   * @function
   */
  Reveal.prototype.toggle = function toggle () {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  };;

  /**
   * Destroys an instance of a modal.
   * @function
   */
  Reveal.prototype._destroy = function _destroy () {
    if (this.options.overlay) {
      this.$element.appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()
      this.$overlay.hide().off().remove();
    }
    this.$element.hide().off();
    this.$anchor.off('.zf');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off((".zf.reveal:" + (this.id)));
  };

  return Reveal;
}(__WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */]));

Reveal.defaults = {
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationIn: '',
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationOut: '',
  /**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  showDelay: 0,
  /**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  hideDelay: 0,
  /**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnEsc: true,
  /**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @type {boolean}
   * @default false
   */
  multipleOpened: false,
  /**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  vOffset: 'auto',
  /**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  hOffset: 'auto',
  /**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @type {boolean}
   * @default false
   */
  fullScreen: false,
  /**
   * Percentage of screen height the modal should push up from the bottom of the view.
   * @option
   * @type {number}
   * @default 10
   */
  btmOffsetPct: 10,
  /**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @type {boolean}
   * @default true
   */
  overlay: true,
  /**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @type {boolean}
   * @default false
   */
  resetOnClose: false,
  /**
   * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,
  /**
   * Update the browser history with the open modal
   * @option
   * @default false
   */
  updateHistory: false,
    /**
   * Allows the modal to append to custom div.
   * @option
   * @type {string}
   * @default "body"
   */
  appendTo: "body",
  /**
   * Allows adding additional class names to the reveal overlay.
   * @option
   * @type {string}
   * @default ''
   */
  additionalOverlayClasses: ''
};

function iPhoneSniff() {
  return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent);
}

function androidSniff() {
  return /Android/.test(window.navigator.userAgent);
}

function mobileSniff() {
  return iPhoneSniff() || androidSniff();
}




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Slider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_touch__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_util_triggers__ = __webpack_require__(5);












/**
 * Slider module.
 * @module foundation.slider
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 */

var Slider = (function (Plugin) {
  function Slider () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Slider.__proto__ = Plugin;
  Slider.prototype = Object.create( Plugin && Plugin.prototype );
  Slider.prototype.constructor = Slider;

  Slider.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Slider.defaults, this.$element.data(), options);
    this.className = 'Slider'; // ie9 back compat

  // Touch and Triggers inits are idempotent, we just need to make sure it's initialied.
    __WEBPACK_IMPORTED_MODULE_5__foundation_util_touch__["a" /* Touch */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
    __WEBPACK_IMPORTED_MODULE_6__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Slider', {
      'ltr': {
        'ARROW_RIGHT': 'increase',
        'ARROW_UP': 'increase',
        'ARROW_DOWN': 'decrease',
        'ARROW_LEFT': 'decrease',
        'SHIFT_ARROW_RIGHT': 'increase_fast',
        'SHIFT_ARROW_UP': 'increase_fast',
        'SHIFT_ARROW_DOWN': 'decrease_fast',
        'SHIFT_ARROW_LEFT': 'decrease_fast',
        'HOME': 'min',
        'END': 'max'
      },
      'rtl': {
        'ARROW_LEFT': 'increase',
        'ARROW_RIGHT': 'decrease',
        'SHIFT_ARROW_LEFT': 'increase_fast',
        'SHIFT_ARROW_RIGHT': 'decrease_fast'
      }
    });
  };

  /**
   * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
   * @function
   * @private
   */
  Slider.prototype._init = function _init () {
    this.inputs = this.$element.find('input');
    this.handles = this.$element.find('[data-slider-handle]');

    this.$handle = this.handles.eq(0);
    this.$input = this.inputs.length ? this.inputs.eq(0) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + (this.$handle.attr('aria-controls'))));
    this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

    var isDbl = false,
        _this = this;
    if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
      this.options.disabled = true;
      this.$element.addClass(this.options.disabledClass);
    }
    if (!this.inputs.length) {
      this.inputs = __WEBPACK_IMPORTED_MODULE_0_jquery___default()().add(this.$input);
      this.options.binding = true;
    }

    this._setInitAttr(0);

    if (this.handles[1]) {
      this.options.doubleSided = true;
      this.$handle2 = this.handles.eq(1);
      this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + (this.$handle2.attr('aria-controls'))));

      if (!this.inputs[1]) {
        this.inputs = this.inputs.add(this.$input2);
      }
      isDbl = true;

      // this.$handle.triggerHandler('click.zf.slider');
      this._setInitAttr(1);
    }

    // Set handle positions
    this.setHandles();

    this._events();
  };

  Slider.prototype.setHandles = function setHandles () {
    var this$1 = this;

    if(this.handles[1]) {
      this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true, function () {
        this$1._setHandlePos(this$1.$handle2, this$1.inputs.eq(1).val(), true);
      });
    } else {
      this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true);
    }
  };

  Slider.prototype._reflow = function _reflow () {
    this.setHandles();
  };
  /**
  * @function
  * @private
  * @param {Number} value - floating point (the value) to be transformed using to a relative position on the slider (the inverse of _value)
  */
  Slider.prototype._pctOfBar = function _pctOfBar (value) {
    var pctOfBar = percent(value - this.options.start, this.options.end - this.options.start)

    switch(this.options.positionValueFunction) {
    case "pow":
      pctOfBar = this._logTransform(pctOfBar);
      break;
    case "log":
      pctOfBar = this._powTransform(pctOfBar);
      break;
    }

    return pctOfBar.toFixed(2)
  };

  /**
  * @function
  * @private
  * @param {Number} pctOfBar - floating point, the relative position of the slider (typically between 0-1) to be transformed to a value
  */
  Slider.prototype._value = function _value (pctOfBar) {
    switch(this.options.positionValueFunction) {
    case "pow":
      pctOfBar = this._powTransform(pctOfBar);
      break;
    case "log":
      pctOfBar = this._logTransform(pctOfBar);
      break;
    }
    var value = (this.options.end - this.options.start) * pctOfBar + this.options.start;

    return value
  };

  /**
  * @function
  * @private
  * @param {Number} value - floating point (typically between 0-1) to be transformed using the log function
  */
  Slider.prototype._logTransform = function _logTransform (value) {
    return baseLog(this.options.nonLinearBase, ((value*(this.options.nonLinearBase-1))+1))
  };

  /**
  * @function
  * @private
  * @param {Number} value - floating point (typically between 0-1) to be transformed using the power function
  */
  Slider.prototype._powTransform = function _powTransform (value) {
    return (Math.pow(this.options.nonLinearBase, value) - 1) / (this.options.nonLinearBase - 1)
  };

  /**
   * Sets the position of the selected handle and fill bar.
   * @function
   * @private
   * @param {jQuery} $hndl - the selected handle to move.
   * @param {Number} location - floating point between the start and end values of the slider bar.
   * @param {Function} cb - callback function to fire on completion.
   * @fires Slider#moved
   * @fires Slider#changed
   */
  Slider.prototype._setHandlePos = function _setHandlePos ($hndl, location, noInvert, cb) {
    // don't move if the slider has been disabled since its initialization
    if (this.$element.hasClass(this.options.disabledClass)) {
      return;
    }
    //might need to alter that slightly for bars that will have odd number selections.
    location = parseFloat(location);//on input change events, convert string to number...grumble.

    // prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max
    if (location < this.options.start) { location = this.options.start; }
    else if (location > this.options.end) { location = this.options.end; }

    var isDbl = this.options.doubleSided;

    //this is for single-handled vertical sliders, it adjusts the value to account for the slider being "upside-down"
    //for click and drag events, it's weird due to the scale(-1, 1) css property
    if (this.options.vertical && !noInvert) {
      location = this.options.end - location;
    }

    if (isDbl) { //this block is to prevent 2 handles from crossing eachother. Could/should be improved.
      if (this.handles.index($hndl) === 0) {
        var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
        location = location >= h2Val ? h2Val - this.options.step : location;
      } else {
        var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
        location = location <= h1Val ? h1Val + this.options.step : location;
      }
    }

    var _this = this,
        vert = this.options.vertical,
        hOrW = vert ? 'height' : 'width',
        lOrT = vert ? 'top' : 'left',
        handleDim = $hndl[0].getBoundingClientRect()[hOrW],
        elemDim = this.$element[0].getBoundingClientRect()[hOrW],
        //percentage of bar min/max value based on click or drag point
        pctOfBar = this._pctOfBar(location),
        //number of actual pixels to shift the handle, based on the percentage obtained above
        pxToMove = (elemDim - handleDim) * pctOfBar,
        //percentage of bar to shift the handle
        movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal);
        //fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value
        location = parseFloat(location.toFixed(this.options.decimal));
        // declare empty object for css adjustments, only used with 2 handled-sliders
    var css = {};

    this._setValues($hndl, location);

    // TODO update to calculate based on values set to respective inputs??
    if (isDbl) {
      var isLeftHndl = this.handles.index($hndl) === 0,
          //empty variable, will be used for min-height/width for fill bar
          dim,
          //percentage w/h of the handle compared to the slider bar
          handlePct =  ~~(percent(handleDim, elemDim) * 100);
      //if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar
      if (isLeftHndl) {
        //left or top percentage value to apply to the fill bar.
        css[lOrT] = movement + "%";
        //calculate the new min-height/width for the fill bar.
        dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct;
        //this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider
        //plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.
        if (cb && typeof cb === 'function') { cb(); }//this is only needed for the initialization of 2 handled sliders
      } else {
        //just caching the value of the left/bottom handle's left/top property
        var handlePos = parseFloat(this.$handle[0].style[lOrT]);
        //calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0
        //based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself
        dim = movement - (isNaN(handlePos) ? (this.options.initialStart - this.options.start)/((this.options.end-this.options.start)/100) : handlePos) + handlePct;
      }
      // assign the min-height/width to our css object
      css[("min-" + hOrW)] = dim + "%";
    }

    this.$element.one('finished.zf.animate', function() {
                    /**
                     * Fires when the handle is done moving.
                     * @event Slider#moved
                     */
                    _this.$element.trigger('moved.zf.slider', [$hndl]);
                });

    //because we don't know exactly how the handle will be moved, check the amount of time it should take to move.
    var moveTime = this.$element.data('dragging') ? 1000/60 : this.options.moveTime;

    Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["b" /* Move */])(moveTime, $hndl, function() {
      // adjusting the left/top property of the handle, based on the percentage calculated above
      // if movement isNaN, that is because the slider is hidden and we cannot determine handle width,
      // fall back to next best guess.
      if (isNaN(movement)) {
        $hndl.css(lOrT, ((pctOfBar * 100) + "%"));
      }
      else {
        $hndl.css(lOrT, (movement + "%"));
      }

      if (!_this.options.doubleSided) {
        //if single-handled, a simple method to expand the fill bar
        _this.$fill.css(hOrW, ((pctOfBar * 100) + "%"));
      } else {
        //otherwise, use the css object we created above
        _this.$fill.css(css);
      }
    });


    /**
     * Fires when the value has not been change for a given time.
     * @event Slider#changed
     */
    clearTimeout(_this.timeout);
    _this.timeout = setTimeout(function(){
      _this.$element.trigger('changed.zf.slider', [$hndl]);
    }, _this.options.changedDelay);
  };

  /**
   * Sets the initial attribute for the slider element.
   * @function
   * @private
   * @param {Number} idx - index of the current handle/input to use.
   */
  Slider.prototype._setInitAttr = function _setInitAttr (idx) {
    var initVal = (idx === 0 ? this.options.initialStart : this.options.initialEnd)
    var id = this.inputs.eq(idx).attr('id') || Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* GetYoDigits */])(6, 'slider');
    this.inputs.eq(idx).attr({
      'id': id,
      'max': this.options.end,
      'min': this.options.start,
      'step': this.options.step
    });
    this.inputs.eq(idx).val(initVal);
    this.handles.eq(idx).attr({
      'role': 'slider',
      'aria-controls': id,
      'aria-valuemax': this.options.end,
      'aria-valuemin': this.options.start,
      'aria-valuenow': initVal,
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
      'tabindex': 0
    });
  };

  /**
   * Sets the input and `aria-valuenow` values for the slider element.
   * @function
   * @private
   * @param {jQuery} $handle - the currently selected handle.
   * @param {Number} val - floating point of the new value.
   */
  Slider.prototype._setValues = function _setValues ($handle, val) {
    var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
    this.inputs.eq(idx).val(val);
    $handle.attr('aria-valuenow', val);
  };

  /**
   * Handles events on the slider element.
   * Calculates the new location of the current handle.
   * If there are two handles and the bar was clicked, it determines which handle to move.
   * @function
   * @private
   * @param {Object} e - the `event` object passed from the listener.
   * @param {jQuery} $handle - the current handle to calculate for, if selected.
   * @param {Number} val - floating point number for the new value of the slider.
   * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
   */
  Slider.prototype._handleEvent = function _handleEvent (e, $handle, val) {
    var value, hasVal;
    if (!val) {//click or drag events
      e.preventDefault();
      var _this = this,
          vertical = this.options.vertical,
          param = vertical ? 'height' : 'width',
          direction = vertical ? 'top' : 'left',
          eventOffset = vertical ? e.pageY : e.pageX,
          halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
          barDim = this.$element[0].getBoundingClientRect()[param],
          windowScroll = vertical ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollLeft();


      var elemOffset = this.$element.offset()[direction];

      // touch events emulated by the touch util give position relative to screen, add window.scroll to event coordinates...
      // best way to guess this is simulated is if clientY == pageY
      if (e.clientY === e.pageY) { eventOffset = eventOffset + windowScroll; }
      var eventFromBar = eventOffset - elemOffset;
      var barXY;
      if (eventFromBar < 0) {
        barXY = 0;
      } else if (eventFromBar > barDim) {
        barXY = barDim;
      } else {
        barXY = eventFromBar;
      }
      var offsetPct = percent(barXY, barDim);

      value = this._value(offsetPct);

      // turn everything around for RTL, yay math!
      if (Object(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* rtl */])() && !this.options.vertical) {value = this.options.end - value;}

      value = _this._adjustValue(null, value);
      //boolean flag for the setHandlePos fn, specifically for vertical sliders
      hasVal = false;

      if (!$handle) {//figure out which handle it is, pass it to the next function.
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
      }

    } else {//change event on input
      value = this._adjustValue(null, val);
      hasVal = true;
    }

    this._setHandlePos($handle, value, hasVal);
  };

  /**
   * Adjustes value for handle in regard to step value. returns adjusted value
   * @function
   * @private
   * @param {jQuery} $handle - the selected handle.
   * @param {Number} value - value to adjust. used if $handle is falsy
   */
  Slider.prototype._adjustValue = function _adjustValue ($handle, value) {
    var val,
      step = this.options.step,
      div = parseFloat(step/2),
      left, prev_val, next_val;
    if (!!$handle) {
      val = parseFloat($handle.attr('aria-valuenow'));
    }
    else {
      val = value;
    }
    left = val % step;
    prev_val = val - left;
    next_val = prev_val + step;
    if (left === 0) {
      return val;
    }
    val = val >= prev_val + div ? next_val : prev_val;
    return val;
  };

  /**
   * Adds event listeners to the slider elements.
   * @function
   * @private
   */
  Slider.prototype._events = function _events () {
    this._eventsForHandle(this.$handle);
    if(this.handles[1]) {
      this._eventsForHandle(this.$handle2);
    }
  };


  /**
   * Adds event listeners a particular handle
   * @function
   * @private
   * @param {jQuery} $handle - the current handle to apply listeners to.
   */
  Slider.prototype._eventsForHandle = function _eventsForHandle ($handle) {
    var _this = this,
        curHandle,
        timer;

      this.inputs.off('change.zf.slider').on('change.zf.slider', function(e) {
        var idx = _this.inputs.index(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
        _this._handleEvent(e, _this.handles.eq(idx), __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).val());
      });

      if (this.options.clickSelect) {
        this.$element.off('click.zf.slider').on('click.zf.slider', function(e) {
          if (_this.$element.data('dragging')) { return false; }

          if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is('[data-slider-handle]')) {
            if (_this.options.doubleSided) {
              _this._handleEvent(e);
            } else {
              _this._handleEvent(e, _this.$handle);
            }
          }
        });
      }

    if (this.options.draggable) {
      this.handles.addTouch();

      var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body');
      $handle
        .off('mousedown.zf.slider')
        .on('mousedown.zf.slider', function(e) {
          $handle.addClass('is-dragging');
          _this.$fill.addClass('is-dragging');//
          _this.$element.data('dragging', true);

          curHandle = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.currentTarget);

          $body.on('mousemove.zf.slider', function(e) {
            e.preventDefault();
            _this._handleEvent(e, curHandle);

          }).on('mouseup.zf.slider', function(e) {
            _this._handleEvent(e, curHandle);

            $handle.removeClass('is-dragging');
            _this.$fill.removeClass('is-dragging');
            _this.$element.data('dragging', false);

            $body.off('mousemove.zf.slider mouseup.zf.slider');
          });
      })
      // prevent events triggered by touch
      .on('selectstart.zf.slider touchmove.zf.slider', function(e) {
        e.preventDefault();
      });
    }

    $handle.off('keydown.zf.slider').on('keydown.zf.slider', function(e) {
      var _$handle = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
          oldValue = parseFloat(_this.inputs.eq(idx).val()),
          newValue;

      // handle keyboard event with keyboard util
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Slider', {
        decrease: function() {
          newValue = oldValue - _this.options.step;
        },
        increase: function() {
          newValue = oldValue + _this.options.step;
        },
        decrease_fast: function() {
          newValue = oldValue - _this.options.step * 10;
        },
        increase_fast: function() {
          newValue = oldValue + _this.options.step * 10;
        },
        min: function() {
          newValue = _this.options.start;
        },
        max: function() {
          newValue = _this.options.end;
        },
        handled: function() { // only set handle pos when event was handled specially
          e.preventDefault();
          _this._setHandlePos(_$handle, newValue, true);
        }
      });
      /*if (newValue) { // if pressed key has special function, update value
        e.preventDefault();
        _this._setHandlePos(_$handle, newValue);
      }*/
    });
  };

  /**
   * Destroys the slider plugin.
   */
  Slider.prototype._destroy = function _destroy () {
    this.handles.off('.zf.slider');
    this.inputs.off('.zf.slider');
    this.$element.off('.zf.slider');

    clearTimeout(this.timeout);
  };

  return Slider;
}(__WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */]));

Slider.defaults = {
  /**
   * Minimum value for the slider scale.
   * @option
   * @type {number}
   * @default 0
   */
  start: 0,
  /**
   * Maximum value for the slider scale.
   * @option
   * @type {number}
   * @default 100
   */
  end: 100,
  /**
   * Minimum value change per change event.
   * @option
   * @type {number}
   * @default 1
   */
  step: 1,
  /**
   * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
   * @option
   * @type {number}
   * @default 0
   */
  initialStart: 0,
  /**
   * Value at which the right handle/second input should be set to on initialization.
   * @option
   * @type {number}
   * @default 100
   */
  initialEnd: 100,
  /**
   * Allows the input to be located outside the container and visible. Set to by the JS
   * @option
   * @type {boolean}
   * @default false
   */
  binding: false,
  /**
   * Allows the user to click/tap on the slider bar to select a value.
   * @option
   * @type {boolean}
   * @default true
   */
  clickSelect: true,
  /**
   * Set to true and use the `vertical` class to change alignment to vertical.
   * @option
   * @type {boolean}
   * @default false
   */
  vertical: false,
  /**
   * Allows the user to drag the slider handle(s) to select a value.
   * @option
   * @type {boolean}
   * @default true
   */
  draggable: true,
  /**
   * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
   * @option
   * @type {boolean}
   * @default false
   */
  disabled: false,
  /**
   * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
   * @option
   * @type {boolean}
   * @default false
   */
  doubleSided: false,
  /**
   * Potential future feature.
   */
  // steps: 100,
  /**
   * Number of decimal places the plugin should go to for floating point precision.
   * @option
   * @type {number}
   * @default 2
   */
  decimal: 2,
  /**
   * Time delay for dragged elements.
   */
  // dragDelay: 0,
  /**
   * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
   * @option
   * @type {number}
   * @default 200
   */
  moveTime: 200,//update this if changing the transition time in the sass
  /**
   * Class applied to disabled sliders.
   * @option
   * @type {string}
   * @default 'disabled'
   */
  disabledClass: 'disabled',
  /**
   * Will invert the default layout for a vertical<span data-tooltip title="who would do this???"> </span>slider.
   * @option
   * @type {boolean}
   * @default false
   */
  invertVertical: false,
  /**
   * Milliseconds before the `changed.zf-slider` event is triggered after value change.
   * @option
   * @type {number}
   * @default 500
   */
  changedDelay: 500,
  /**
  * Basevalue for non-linear sliders
  * @option
  * @type {number}
  * @default 5
  */
  nonLinearBase: 5,
  /**
  * Basevalue for non-linear sliders, possible values are: `'linear'`, `'pow'` & `'log'`. Pow and Log use the nonLinearBase setting.
  * @option
  * @type {string}
  * @default 'linear'
  */
  positionValueFunction: 'linear',
};

function percent(frac, num) {
  return (frac / num);
}
function absPosition($handle, dir, clickPos, param) {
  return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
}
function baseLog(base, value) {
  return Math.log(value)/Math.log(base)
}




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sticky; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__ = __webpack_require__(5);








/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

var Sticky = (function (Plugin) {
  function Sticky () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Sticky.__proto__ = Plugin;
  Sticky.prototype = Object.create( Plugin && Plugin.prototype );
  Sticky.prototype.constructor = Sticky;

  Sticky.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Sticky.defaults, this.$element.data(), options);
    this.className = 'Sticky'; // ie9 back compat

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();
  };

  /**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @function
   * @private
   */
  Sticky.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    var $parent = this.$element.parent('[data-sticky-container]'),
        id = this.$element[0].id || Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* GetYoDigits */])(6, 'sticky'),
        _this = this;

    if($parent.length){
      this.$container = $parent;
    } else {
      this.wasWrapped = true;
      this.$element.wrap(this.options.container);
      this.$container = this.$element.parent();
    }
    this.$container.addClass(this.options.containerClass);

    this.$element.addClass(this.options.stickyClass).attr({ 'data-resize': id, 'data-mutate': id });
    if (this.options.anchor !== '') {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + _this.options.anchor).attr({ 'data-mutate': id });
    }

    this.scrollCount = this.options.checkEvery;
    this.isStuck = false;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load.zf.sticky', function(){
      //We calculate the container height to have correct values for anchor points offset calculation.
      _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;
      _this.$container.css('height', _this.containerHeight);
      _this.elemHeight = _this.containerHeight;
      if(_this.options.anchor !== ''){
        _this.$anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + _this.options.anchor);
      }else{
        _this._parsePoints();
      }

      _this._setSizes(function(){
        var scroll = window.pageYOffset;
        _this._calc(false, scroll);
        //Unstick the element will ensure that proper classes are set.
        if (!_this.isStuck) {
          _this._removeSticky((scroll >= _this.topPoint) ? false : true);
        }
      });
      _this._events(id.split('-').reverse().join('-'));
    });
  };

  /**
   * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
   * @function
   * @private
   */
  Sticky.prototype._parsePoints = function _parsePoints () {
    var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
        btm = this.options.btmAnchor== "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
        pts = [top, btm],
        breaks = {};
    for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
      var pt;
      if (typeof pts[i] === 'number') {
        pt = pts[i];
      } else {
        var place = pts[i].split(':'),
            anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("#" + (place[0])));

        pt = anchor.offset().top;
        if (place[1] && place[1].toLowerCase() === 'bottom') {
          pt += anchor[0].getBoundingClientRect().height;
        }
      }
      breaks[i] = pt;
    }


    this.points = breaks;
    return;
  };

  /**
   * Adds event handlers for the scrolling element.
   * @private
   * @param {String} id - pseudo-random id for unique scroll event listener.
   */
  Sticky.prototype._events = function _events (id) {
    var _this = this,
        scrollListener = this.scrollListener = "scroll.zf." + id;
    if (this.isOn) { return; }
    if (this.canStick) {
      this.isOn = true;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(scrollListener)
               .on(scrollListener, function(e) {
                 if (_this.scrollCount === 0) {
                   _this.scrollCount = _this.options.checkEvery;
                   _this._setSizes(function() {
                     _this._calc(false, window.pageYOffset);
                   });
                 } else {
                   _this.scrollCount--;
                   _this._calc(false, window.pageYOffset);
                 }
              });
    }

    this.$element.off('resizeme.zf.trigger')
                 .on('resizeme.zf.trigger', function(e, el) {
                    _this._eventsHandler(id);
    });

    this.$element.on('mutateme.zf.trigger', function (e, el) {
        _this._eventsHandler(id);
    });

    if(this.$anchor) {
      this.$anchor.on('mutateme.zf.trigger', function (e, el) {
          _this._eventsHandler(id);
      });
    }
  };

  /**
   * Handler for events.
   * @private
   * @param {String} id - pseudo-random id for unique scroll event listener.
   */
  Sticky.prototype._eventsHandler = function _eventsHandler (id) {
       var _this = this,
        scrollListener = this.scrollListener = "scroll.zf." + id;

       _this._setSizes(function() {
       _this._calc(false);
       if (_this.canStick) {
         if (!_this.isOn) {
           _this._events(id);
         }
       } else if (_this.isOn) {
         _this._pauseListeners(scrollListener);
       }
     });
  };

  /**
   * Removes event handlers for scroll and change events on anchor.
   * @fires Sticky#pause
   * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
   */
  Sticky.prototype._pauseListeners = function _pauseListeners (scrollListener) {
    this.isOn = false;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(scrollListener);

    /**
     * Fires when the plugin is paused due to resize event shrinking the view.
     * @event Sticky#pause
     * @private
     */
     this.$element.trigger('pause.zf.sticky');
  };

  /**
   * Called on every `scroll` event and on `_init`
   * fires functions based on booleans and cached values
   * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
   * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
   */
  Sticky.prototype._calc = function _calc (checkSizes, scroll) {
    if (checkSizes) { this._setSizes(); }

    if (!this.canStick) {
      if (this.isStuck) {
        this._removeSticky(true);
      }
      return false;
    }

    if (!scroll) { scroll = window.pageYOffset; }

    if (scroll >= this.topPoint) {
      if (scroll <= this.bottomPoint) {
        if (!this.isStuck) {
          this._setSticky();
        }
      } else {
        if (this.isStuck) {
          this._removeSticky(false);
        }
      }
    } else {
      if (this.isStuck) {
        this._removeSticky(true);
      }
    }
  };

  /**
   * Causes the $element to become stuck.
   * Adds `position: fixed;`, and helper classes.
   * @fires Sticky#stuckto
   * @function
   * @private
   */
  Sticky.prototype._setSticky = function _setSticky () {
    var _this = this,
        stickTo = this.options.stickTo,
        mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
        notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
        css = {};

    css[mrgn] = (this.options[mrgn]) + "em";
    css[stickTo] = 0;
    css[notStuckTo] = 'auto';
    this.isStuck = true;
    this.$element.removeClass(("is-anchored is-at-" + notStuckTo))
                 .addClass(("is-stuck is-at-" + stickTo))
                 .css(css)
                 /**
                  * Fires when the $element has become `position: fixed;`
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
                  * @event Sticky#stuckto
                  */
                 .trigger(("sticky.zf.stuckto:" + stickTo));
    this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
      _this._setSizes();
    });
  };

  /**
   * Causes the $element to become unstuck.
   * Removes `position: fixed;`, and helper classes.
   * Adds other helper classes.
   * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
   * @fires Sticky#unstuckfrom
   * @private
   */
  Sticky.prototype._removeSticky = function _removeSticky (isTop) {
    var stickTo = this.options.stickTo,
        stickToTop = stickTo === 'top',
        css = {},
        anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
        mrgn = stickToTop ? 'marginTop' : 'marginBottom',
        notStuckTo = stickToTop ? 'bottom' : 'top',
        topOrBottom = isTop ? 'top' : 'bottom';

    css[mrgn] = 0;

    css['bottom'] = 'auto';
    if(isTop) {
      css['top'] = 0;
    } else {
      css['top'] = anchorPt;
    }

    this.isStuck = false;
    this.$element.removeClass(("is-stuck is-at-" + stickTo))
                 .addClass(("is-anchored is-at-" + topOrBottom))
                 .css(css)
                 /**
                  * Fires when the $element has become anchored.
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
                  * @event Sticky#unstuckfrom
                  */
                 .trigger(("sticky.zf.unstuckfrom:" + topOrBottom));
  };

  /**
   * Sets the $element and $container sizes for plugin.
   * Calls `_setBreakPoints`.
   * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
   * @private
   */
  Sticky.prototype._setSizes = function _setSizes (cb) {
    this.canStick = __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].is(this.options.stickyOn);
    if (!this.canStick) {
      if (cb && typeof cb === 'function') { cb(); }
    }
    var _this = this,
        newElemWidth = this.$container[0].getBoundingClientRect().width,
        comp = window.getComputedStyle(this.$container[0]),
        pdngl = parseInt(comp['padding-left'], 10),
        pdngr = parseInt(comp['padding-right'], 10);

    if (this.$anchor && this.$anchor.length) {
      this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
    } else {
      this._parsePoints();
    }

    this.$element.css({
      'max-width': ((newElemWidth - pdngl - pdngr) + "px")
    });

    var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
    if (this.$element.css("display") == "none") {
      newContainerHeight = 0;
    }
    this.containerHeight = newContainerHeight;
    this.$container.css({
      height: newContainerHeight
    });
    this.elemHeight = newContainerHeight;

    if (!this.isStuck) {
      if (this.$element.hasClass('is-at-bottom')) {
        var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
        this.$element.css('top', anchorPt);
      }
    }

    this._setBreakPoints(newContainerHeight, function() {
      if (cb && typeof cb === 'function') { cb(); }
    });
  };

  /**
   * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
   * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
   * @param {Function} cb - optional callback function to be called on completion.
   * @private
   */
  Sticky.prototype._setBreakPoints = function _setBreakPoints (elemHeight, cb) {
    if (!this.canStick) {
      if (cb && typeof cb === 'function') { cb(); }
      else { return false; }
    }
    var mTop = emCalc(this.options.marginTop),
        mBtm = emCalc(this.options.marginBottom),
        topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
        bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,
        // topPoint = this.$anchor.offset().top || this.points[0],
        // bottomPoint = topPoint + this.anchorHeight || this.points[1],
        winHeight = window.innerHeight;

    if (this.options.stickTo === 'top') {
      topPoint -= mTop;
      bottomPoint -= (elemHeight + mTop);
    } else if (this.options.stickTo === 'bottom') {
      topPoint -= (winHeight - (elemHeight + mBtm));
      bottomPoint -= (winHeight - mBtm);
    } else {
      //this would be the stickTo: both option... tricky
    }

    this.topPoint = topPoint;
    this.bottomPoint = bottomPoint;

    if (cb && typeof cb === 'function') { cb(); }
  };

  /**
   * Destroys the current sticky element.
   * Resets the element to the top position first.
   * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
   * @function
   */
  Sticky.prototype._destroy = function _destroy () {
    this._removeSticky(true);

    this.$element.removeClass(((this.options.stickyClass) + " is-anchored is-at-top"))
                 .css({
                   height: '',
                   top: '',
                   bottom: '',
                   'max-width': ''
                 })
                 .off('resizeme.zf.trigger')
                 .off('mutateme.zf.trigger');
    if (this.$anchor && this.$anchor.length) {
      this.$anchor.off('change.zf.sticky');
    }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.scrollListener);

    if (this.wasWrapped) {
      this.$element.unwrap();
    } else {
      this.$container.removeClass(this.options.containerClass)
                     .css({
                       height: ''
                     });
    }
  };

  return Sticky;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]));

Sticky.defaults = {
  /**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @type {string}
   * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'
   */
  container: '<div data-sticky-container></div>',
  /**
   * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.
   * @option
   * @type {string}
   * @default 'top'
   */
  stickTo: 'top',
  /**
   * If anchored to a single element, the id of that element.
   * @option
   * @type {string}
   * @default ''
   */
  anchor: '',
  /**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @type {string}
   * @default ''
   */
  topAnchor: '',
  /**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @type {string}
   * @default ''
   */
  btmAnchor: '',
  /**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginTop: 1,
  /**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginBottom: 1,
  /**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @type {string}
   * @default 'medium'
   */
  stickyOn: 'medium',
  /**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @type {string}
   * @default 'sticky'
   */
  stickyClass: 'sticky',
  /**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @type {string}
   * @default 'sticky-container'
   */
  containerClass: 'sticky-container',
  /**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @type {number}
   * @default -1
   */
  checkEvery: -1
};

/**
 * Helper function to calculate em values
 * @param Number {em} - number of em's to calculate into pixels
 */
function emCalc(em) {
  return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
}




/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toggler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__ = __webpack_require__(5);







/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */

var Toggler = (function (Plugin) {
  function Toggler () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) Toggler.__proto__ = Plugin;
  Toggler.prototype = Object.create( Plugin && Plugin.prototype );
  Toggler.prototype.constructor = Toggler;

  Toggler.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Toggler.defaults, element.data(), options);
    this.className = '';
    this.className = 'Toggler'; // ie9 back compat

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();
    this._events();
  };

  /**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */
  Toggler.prototype._init = function _init () {
    var input;
    // Parse animation classes if they were set
    if (this.options.animate) {
      input = this.options.animate.split(' ');

      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }
    // Otherwise, parse toggle class
    else {
      input = this.$element.data('toggler');
      // Allow for a . at the beginning of the string
      this.className = input[0] === '.' ? input.slice(1) : input;
    }

    // Add ARIA attributes to triggers
    var id = this.$element[0].id;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(("[data-open=\"" + id + "\"], [data-close=\"" + id + "\"], [data-toggle=\"" + id + "\"]"))
      .attr('aria-controls', id);
    // If the target is hidden, add aria-hidden
    this.$element.attr('aria-expanded', this.$element.is(':hidden') ? false : true);
  };

  /**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */
  Toggler.prototype._events = function _events () {
    this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
  };

  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */
  Toggler.prototype.toggle = function toggle () {
    this[ this.options.animate ? '_toggleAnimate' : '_toggleClass']();
  };

  Toggler.prototype._toggleClass = function _toggleClass () {
    this.$element.toggleClass(this.className);

    var isOn = this.$element.hasClass(this.className);
    if (isOn) {
      /**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */
      this.$element.trigger('on.zf.toggler');
    }
    else {
      /**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
      this.$element.trigger('off.zf.toggler');
    }

    this._updateARIA(isOn);
    this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
  };

  Toggler.prototype._toggleAnimate = function _toggleAnimate () {
    var _this = this;

    if (this.$element.is(':hidden')) {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateIn(this.$element, this.animationIn, function() {
        _this._updateARIA(true);
        this.trigger('on.zf.toggler');
        this.find('[data-mutate]').trigger('mutateme.zf.trigger');
      });
    }
    else {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateOut(this.$element, this.animationOut, function() {
        _this._updateARIA(false);
        this.trigger('off.zf.toggler');
        this.find('[data-mutate]').trigger('mutateme.zf.trigger');
      });
    }
  };

  Toggler.prototype._updateARIA = function _updateARIA (isOn) {
    this.$element.attr('aria-expanded', isOn ? true : false);
  };

  /**
   * Destroys the instance of Toggler on the element.
   * @function
   */
  Toggler.prototype._destroy = function _destroy () {
    this.$element.off('.zf.toggler');
  };

  return Toggler;
}(__WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */]));

Toggler.defaults = {
  /**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};




/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tooltip; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_positionable__ = __webpack_require__(20);









/**
 * Tooltip module.
 * @module foundation.tooltip
 * @requires foundation.util.box
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

var Tooltip = (function (Positionable) {
  function Tooltip () {
    Positionable.apply(this, arguments);
  }

  if ( Positionable ) Tooltip.__proto__ = Positionable;
  Tooltip.prototype = Object.create( Positionable && Positionable.prototype );
  Tooltip.prototype.constructor = Tooltip;

  Tooltip.prototype._setup = function _setup (element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tooltip.defaults, this.$element.data(), options);
    this.className = 'Tooltip'; // ie9 back compat

    this.isActive = false;
    this.isClick = false;

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();
  };

  /**
   * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
   * @private
   */
  Tooltip.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    var elemId = this.$element.attr('aria-describedby') || Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* GetYoDigits */])(6, 'tooltip');

    this.options.tipText = this.options.tipText || this.$element.attr('title');
    this.template = this.options.template ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.template) : this._buildTemplate(elemId);

    if (this.options.allowHtml) {
      this.template.appendTo(document.body)
        .html(this.options.tipText)
        .hide();
    } else {
      this.template.appendTo(document.body)
        .text(this.options.tipText)
        .hide();
    }

    this.$element.attr({
      'title': '',
      'aria-describedby': elemId,
      'data-yeti-box': elemId,
      'data-toggle': elemId,
      'data-resize': elemId
    }).addClass(this.options.triggerClass);

    Positionable.prototype._init.call(this);
    this._events();
  };

  Tooltip.prototype._getDefaultPosition = function _getDefaultPosition () {
    // handle legacy classnames
    var position = this.$element[0].className.match(/\b(top|left|right|bottom)\b/g);
    return position ? position[0] : 'top';
  };

  Tooltip.prototype._getDefaultAlignment = function _getDefaultAlignment () {
    return 'center';
  };

  Tooltip.prototype._getHOffset = function _getHOffset () {
    if(this.position === 'left' || this.position === 'right') {
      return this.options.hOffset + this.options.tooltipWidth;
    } else {
      return this.options.hOffset
    }
  };

  Tooltip.prototype._getVOffset = function _getVOffset () {
    if(this.position === 'top' || this.position === 'bottom') {
      return this.options.vOffset + this.options.tooltipHeight;
    } else {
      return this.options.vOffset
    }
  };

  /**
   * builds the tooltip element, adds attributes, and returns the template.
   * @private
   */
  Tooltip.prototype._buildTemplate = function _buildTemplate (id) {
    var templateClasses = (((this.options.tooltipClass) + " " + (this.options.positionClass) + " " + (this.options.templateClasses))).trim();
    var $template =  __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div></div>').addClass(templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false,
      'data-is-focus': false,
      'id': id
    });
    return $template;
  };

  /**
   * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
   * if the tooltip is larger than the screen width, default to full width - any user selected margin
   * @private
   */
  Tooltip.prototype._setPosition = function _setPosition () {
    Positionable.prototype._setPosition.call(this, this.$element, this.template);
  };

  /**
   * reveals the tooltip, and fires an event to close any other open tooltips on the page
   * @fires Tooltip#closeme
   * @fires Tooltip#show
   * @function
   */
  Tooltip.prototype.show = function show () {
    if (this.options.showOn !== 'all' && !__WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].is(this.options.showOn)) {
      // console.error('The screen is too small to display this tooltip');
      return false;
    }

    var _this = this;
    this.template.css('visibility', 'hidden').show();
    this._setPosition();
    this.template.removeClass('top bottom left right').addClass(this.position)
    this.template.removeClass('align-top align-bottom align-left align-right align-center').addClass('align-' + this.alignment);

    /**
     * Fires to close all other open tooltips on the page
     * @event Closeme#tooltip
     */
    this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));


    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    _this.isActive = true;
    // console.log(this.template);
    this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function() {
      //maybe do stuff?
    });
    /**
     * Fires when the tooltip is shown
     * @event Tooltip#show
     */
    this.$element.trigger('show.zf.tooltip');
  };

  /**
   * Hides the current tooltip, and resets the positioning class if it was changed due to collision
   * @fires Tooltip#hide
   * @function
   */
  Tooltip.prototype.hide = function hide () {
    // console.log('hiding', this.$element.data('yeti-box'));
    var _this = this;
    this.template.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(this.options.fadeOutDuration, function() {
      _this.isActive = false;
      _this.isClick = false;
    });
    /**
     * fires when the tooltip is hidden
     * @event Tooltip#hide
     */
    this.$element.trigger('hide.zf.tooltip');
  };

  /**
   * adds event listeners for the tooltip and its anchor
   * TODO combine some of the listeners like focus and mouseenter, etc.
   * @private
   */
  Tooltip.prototype._events = function _events () {
    var _this = this;
    var $template = this.template;
    var isFocus = false;

    if (!this.options.disableHover) {

      this.$element
      .on('mouseenter.zf.tooltip', function(e) {
        if (!_this.isActive) {
          _this.timeout = setTimeout(function() {
            _this.show();
          }, _this.options.hoverDelay);
        }
      })
      .on('mouseleave.zf.tooltip', function(e) {
        clearTimeout(_this.timeout);
        if (!isFocus || (_this.isClick && !_this.options.clickOpen)) {
          _this.hide();
        }
      });
    }

    if (this.options.clickOpen) {
      this.$element.on('mousedown.zf.tooltip', function(e) {
        e.stopImmediatePropagation();
        if (_this.isClick) {
          //_this.hide();
          // _this.isClick = false;
        } else {
          _this.isClick = true;
          if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
            _this.show();
          }
        }
      });
    } else {
      this.$element.on('mousedown.zf.tooltip', function(e) {
        e.stopImmediatePropagation();
        _this.isClick = true;
      });
    }

    if (!this.options.disableForTouch) {
      this.$element
      .on('tap.zf.tooltip touchend.zf.tooltip', function(e) {
        _this.isActive ? _this.hide() : _this.show();
      });
    }

    this.$element.on({
      // 'toggle.zf.trigger': this.toggle.bind(this),
      // 'close.zf.trigger': this.hide.bind(this)
      'close.zf.trigger': this.hide.bind(this)
    });

    this.$element
      .on('focus.zf.tooltip', function(e) {
        isFocus = true;
        if (_this.isClick) {
          // If we're not showing open on clicks, we need to pretend a click-launched focus isn't
          // a real focus, otherwise on hover and come back we get bad behavior
          if(!_this.options.clickOpen) { isFocus = false; }
          return false;
        } else {
          _this.show();
        }
      })

      .on('focusout.zf.tooltip', function(e) {
        isFocus = false;
        _this.isClick = false;
        _this.hide();
      })

      .on('resizeme.zf.trigger', function() {
        if (_this.isActive) {
          _this._setPosition();
        }
      });
  };

  /**
   * adds a toggle method, in addition to the static show() & hide() functions
   * @function
   */
  Tooltip.prototype.toggle = function toggle () {
    if (this.isActive) {
      this.hide();
    } else {
      this.show();
    }
  };

  /**
   * Destroys an instance of tooltip, removes template element from the view.
   * @function
   */
  Tooltip.prototype._destroy = function _destroy () {
    this.$element.attr('title', this.template.text())
                 .off('.zf.trigger .zf.tooltip')
                 .removeClass('has-tip top right left')
                 .removeAttr('aria-describedby aria-haspopup data-disable-hover data-resize data-toggle data-tooltip data-yeti-box');

    this.template.remove();
  };

  return Tooltip;
}(__WEBPACK_IMPORTED_MODULE_4__foundation_positionable__["a" /* Positionable */]));

Tooltip.defaults = {
  disableForTouch: false,
  /**
   * Time, in ms, before a tooltip should open on hover.
   * @option
   * @type {number}
   * @default 200
   */
  hoverDelay: 200,
  /**
   * Time, in ms, a tooltip should take to fade into view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeInDuration: 150,
  /**
   * Time, in ms, a tooltip should take to fade out of view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeOutDuration: 150,
  /**
   * Disables hover events from opening the tooltip if set to true
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Optional addtional classes to apply to the tooltip template on init.
   * @option
   * @type {string}
   * @default ''
   */
  templateClasses: '',
  /**
   * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
   * @option
   * @type {string}
   * @default 'tooltip'
   */
  tooltipClass: 'tooltip',
  /**
   * Class applied to the tooltip anchor element.
   * @option
   * @type {string}
   * @default 'has-tip'
   */
  triggerClass: 'has-tip',
  /**
   * Minimum breakpoint size at which to open the tooltip.
   * @option
   * @type {string}
   * @default 'small'
   */
  showOn: 'small',
  /**
   * Custom template to be used to generate markup for tooltip.
   * @option
   * @type {string}
   * @default ''
   */
  template: '',
  /**
   * Text displayed in the tooltip template on open.
   * @option
   * @type {string}
   * @default ''
   */
  tipText: '',
  touchCloseText: 'Tap to close.',
  /**
   * Allows the tooltip to remain open if triggered with a click or touch event.
   * @option
   * @type {boolean}
   * @default true
   */
  clickOpen: true,
  /**
   * DEPRECATED Additional positioning classes, set by the JS
   * @option
   * @type {string}
   * @default ''
   */
  positionClass: '',
  /**
   * Position of tooltip. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, tooltip will first try to
   * position as defined by data-position and data-alignment, but reposition if
   * it would cause an overflow.  @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * Less common for tooltips.
   * @option
   * @type {boolean}
   * @default false
   */
  allowBottomOverlap: false,
  /**
   * Distance, in pixels, the template should push away from the anchor on the Y axis.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Distance, in pixels, the template should push away from the anchor on the X axis
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip
   * @option
   * @type {number}
   * @default 14
   */
  tooltipHeight: 14,
  /**
   * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip
   * @option
   * @type {number}
   * @default 12
   */
  tooltipWidth: 12,
    /**
   * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,
   * allowing HTML may open yourself up to XSS attacks.
   * @option
   * @type {boolean}
   * @default false
   */
  allowHtml: false
};

/**
 * TODO utilize resize event trigger
 */




/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveAccordionTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_accordion__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_tabs__ = __webpack_require__(16);










// The plugin matches the plugin classes with these plugin instances.
var MenuPlugins = {
  tabs: {
    cssClass: 'tabs',
    plugin: __WEBPACK_IMPORTED_MODULE_5__foundation_tabs__["a" /* Tabs */]
  },
  accordion: {
    cssClass: 'accordion',
    plugin: __WEBPACK_IMPORTED_MODULE_4__foundation_accordion__["a" /* Accordion */]
  }
};


/**
 * ResponsiveAccordionTabs module.
 * @module foundation.responsiveAccordionTabs
 * @requires foundation.util.motion
 * @requires foundation.accordion
 * @requires foundation.tabs
 */

var ResponsiveAccordionTabs = (function (Plugin) {
  function ResponsiveAccordionTabs () {
    Plugin.apply(this, arguments);
  }

  if ( Plugin ) ResponsiveAccordionTabs.__proto__ = Plugin;
  ResponsiveAccordionTabs.prototype = Object.create( Plugin && Plugin.prototype );
  ResponsiveAccordionTabs.prototype.constructor = ResponsiveAccordionTabs;

  ResponsiveAccordionTabs.prototype._setup = function _setup (element, options) {
    this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, this.$element.data(), options);
    this.rules = this.$element.data('responsive-accordion-tabs');
    this.currentMq = null;
    this.currentPlugin = null;
    this.className = 'ResponsiveAccordionTabs'; // ie9 back compat
    if (!this.$element.attr('id')) {
      this.$element.attr('id',Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* GetYoDigits */])(6, 'responsiveaccordiontabs'));
    };

    this._init();
    this._events();
  };

  /**
   * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.
   * @function
   * @private
   */
  ResponsiveAccordionTabs.prototype._init = function _init () {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
    if (typeof this.rules === 'string') {
      var rulesTree = {};

      // Parse rules from "classes" pulled from data attribute
      var rules = this.rules.split(' ');

      // Iterate through every rule found
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i].split('-');
        var ruleSize = rule.length > 1 ? rule[0] : 'small';
        var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

        if (MenuPlugins[rulePlugin] !== null) {
          rulesTree[ruleSize] = MenuPlugins[rulePlugin];
        }
      }

      this.rules = rulesTree;
    }

    this._getAllOptions();

    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isEmptyObject(this.rules)) {
      this._checkMediaQueries();
    }
  };

  ResponsiveAccordionTabs.prototype._getAllOptions = function _getAllOptions () {
    //get all defaults and options
    var _this = this;
    _this.allOptions = {};
    for (var key in MenuPlugins) {
      if (MenuPlugins.hasOwnProperty(key)) {
        var obj = MenuPlugins[key];
        try {
          var dummyPlugin = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<ul></ul>');
          var tmpPlugin = new obj.plugin(dummyPlugin,_this.options);
          for (var keyKey in tmpPlugin.options) {
            if (tmpPlugin.options.hasOwnProperty(keyKey) && keyKey !== 'zfPlugin') {
              var objObj = tmpPlugin.options[keyKey];
              _this.allOptions[keyKey] = objObj;
            }
          }
          tmpPlugin.destroy();
        }
        catch(e) {
        }
      }
    }
  };

  /**
   * Initializes events for the Menu.
   * @function
   * @private
   */
  ResponsiveAccordionTabs.prototype._events = function _events () {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function() {
      _this._checkMediaQueries();
    });
  };

  /**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */
  ResponsiveAccordionTabs.prototype._checkMediaQueries = function _checkMediaQueries () {
    var matchedMq, _this = this;
    // Iterate through each rule and find the last matching rule
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(this.rules, function(key) {
      if (__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(key)) {
        matchedMq = key;
      }
    });

    // No match? No dice
    if (!matchedMq) { return; }

    // Plugin already initialized? We good
    if (this.currentPlugin instanceof this.rules[matchedMq].plugin) { return; }

    // Remove existing plugin-specific CSS classes
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(MenuPlugins, function(key, value) {
      _this.$element.removeClass(value.cssClass);
    });

    // Add the CSS class for the new plugin
    this.$element.addClass(this.rules[matchedMq].cssClass);

    // Create an instance of the new plugin
    if (this.currentPlugin) {
      //don't know why but on nested elements data zfPlugin get's lost
      if (!this.currentPlugin.$element.data('zfPlugin') && this.storezfData) { this.currentPlugin.$element.data('zfPlugin',this.storezfData); }
      this.currentPlugin.destroy();
    }
    this._handleMarkup(this.rules[matchedMq].cssClass);
    this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
    this.storezfData = this.currentPlugin.$element.data('zfPlugin');

  };

  ResponsiveAccordionTabs.prototype._handleMarkup = function _handleMarkup (toSet){
    var _this = this, fromString = 'accordion';
    var $panels = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content='+this.$element.attr('id')+']');
    if ($panels.length) { fromString = 'tabs'; }
    if (fromString === toSet) {
      return;
    };

    var tabsTitle = _this.allOptions.linkClass?_this.allOptions.linkClass:'tabs-title';
    var tabsPanel = _this.allOptions.panelClass?_this.allOptions.panelClass:'tabs-panel';

    this.$element.removeAttr('role');
    var $liHeads = this.$element.children('.'+tabsTitle+',[data-accordion-item]').removeClass(tabsTitle).removeClass('accordion-item').removeAttr('data-accordion-item');
    var $liHeadsA = $liHeads.children('a').removeClass('accordion-title');

    if (fromString === 'tabs') {
      $panels = $panels.children('.'+tabsPanel).removeClass(tabsPanel).removeAttr('role').removeAttr('aria-hidden').removeAttr('aria-labelledby');
      $panels.children('a').removeAttr('role').removeAttr('aria-controls').removeAttr('aria-selected');
    }else{
      $panels = $liHeads.children('[data-tab-content]').removeClass('accordion-content');
    };

    $panels.css({display:'',visibility:''});
    $liHeads.css({display:'',visibility:''});
    if (toSet === 'accordion') {
      $panels.each(function(key,value){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).appendTo($liHeads.get(key)).addClass('accordion-content').attr('data-tab-content','').removeClass('is-active').css({height:''});
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content='+_this.$element.attr('id')+']').after('<div id="tabs-placeholder-'+_this.$element.attr('id')+'"></div>').detach();
        $liHeads.addClass('accordion-item').attr('data-accordion-item','');
        $liHeadsA.addClass('accordion-title');
      });
    }else if (toSet === 'tabs'){
      var $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content='+_this.$element.attr('id')+']');
      var $placeholder = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#tabs-placeholder-'+_this.$element.attr('id'));
      if ($placeholder.length) {
        $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="tabs-content"></div>').insertAfter($placeholder).attr('data-tabs-content',_this.$element.attr('id'));
        $placeholder.remove();
      }else{
        $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="tabs-content"></div>').insertAfter(_this.$element).attr('data-tabs-content',_this.$element.attr('id'));
      };
      $panels.each(function(key,value){
        var tempValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).appendTo($tabsContent).addClass(tabsPanel);
        var hash = $liHeadsA.get(key).hash.slice(1);
        var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id') || Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* GetYoDigits */])(6, 'accordion');
        if (hash !== id) {
          if (hash !== '') {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id',hash);
          }else{
            hash = id;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id',hash);
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeadsA.get(key)).attr('href',__WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeadsA.get(key)).attr('href').replace('#','')+'#'+hash);
          };
        };
        var isActive = __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeads.get(key)).hasClass('is-active');
        if (isActive) {
          tempValue.addClass('is-active');
        };
      });
      $liHeads.addClass(tabsTitle);
    };
  };

  /**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */
  ResponsiveAccordionTabs.prototype._destroy = function _destroy () {
    if (this.currentPlugin) { this.currentPlugin.destroy(); }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('.zf.ResponsiveAccordionTabs');
  };

  return ResponsiveAccordionTabs;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]));

ResponsiveAccordionTabs.defaults = {};




/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
module.exports = __webpack_require__(46);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autoload_foundation_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_slick_carousel_slick_slick_min__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_slick_carousel_slick_slick_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_slick_carousel_slick_slick_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_Router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes_common__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes_home__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes_about__ = __webpack_require__(45);
// import external dependencies


// Import everything from autoload


//Import yarn packages


// import local dependencies





/** Populate Router instance with DOM routes */
var routes = new __WEBPACK_IMPORTED_MODULE_3__util_Router__["a" /* default */]({
  // All pages
  common: __WEBPACK_IMPORTED_MODULE_4__routes_common__["a" /* default */],
  // Home page
  home: __WEBPACK_IMPORTED_MODULE_5__routes_home__["a" /* default */],
  // About Us page, note the change from about-us to aboutUs.
  aboutUs: __WEBPACK_IMPORTED_MODULE_6__routes_about__["a" /* default */],
});

// Load Events
jQuery(document).ready(function () { return routes.loadEvents(); });

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_foundation_sites_js_entries_foundation__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_foundation_sites_js_entries_foundation_plugins__ = __webpack_require__(39);
// `sage preset` installed this file automatically.
// Running `sage preset` again could result in automatic deletion of this file.
// Because of this, we do not recommend editing this file.



jQuery(document).ready(function ($) { return ($(document).foundation()); });

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_keyboard__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_util_mediaQuery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__foundation_util_timer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__foundation_util_touch__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__foundation_util_triggers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__foundation_abide__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__foundation_accordion__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__foundation_accordionMenu__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__foundation_drilldown__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__foundation_dropdown__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__foundation_dropdownMenu__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__foundation_equalizer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__foundation_interchange__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__foundation_magellan__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__foundation_offcanvas__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__foundation_orbit__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__foundation_responsiveMenu__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__foundation_responsiveToggle__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__foundation_reveal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__foundation_slider__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__foundation_smoothScroll__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__foundation_sticky__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__foundation_tabs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__foundation_toggler__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__foundation_tooltip__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__foundation_responsiveAccordionTabs__ = __webpack_require__(33);



__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].addToJquery(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].rtl = __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* rtl */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].GetYoDigits = __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* GetYoDigits */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].transitionend = __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["c" /* transitionend */];









__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].Box = __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__["a" /* Box */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].onImagesLoaded = __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__["a" /* onImagesLoaded */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].Keyboard = __WEBPACK_IMPORTED_MODULE_5__foundation_util_keyboard__["a" /* Keyboard */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].MediaQuery = __WEBPACK_IMPORTED_MODULE_6__foundation_util_mediaQuery__["a" /* MediaQuery */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].Motion = __WEBPACK_IMPORTED_MODULE_7__foundation_util_motion__["a" /* Motion */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].Move = __WEBPACK_IMPORTED_MODULE_7__foundation_util_motion__["b" /* Move */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].Nest = __WEBPACK_IMPORTED_MODULE_8__foundation_util_nest__["a" /* Nest */];
__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].Timer = __WEBPACK_IMPORTED_MODULE_9__foundation_util_timer__["a" /* Timer */];

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.


__WEBPACK_IMPORTED_MODULE_10__foundation_util_touch__["a" /* Touch */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);


__WEBPACK_IMPORTED_MODULE_11__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a, __WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */]);


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_12__foundation_abide__["a" /* Abide */], 'Abide');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_13__foundation_accordion__["a" /* Accordion */], 'Accordion');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_14__foundation_accordionMenu__["a" /* AccordionMenu */], 'AccordionMenu');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_15__foundation_drilldown__["a" /* Drilldown */], 'Drilldown');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_16__foundation_dropdown__["a" /* Dropdown */], 'Dropdown');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_17__foundation_dropdownMenu__["a" /* DropdownMenu */], 'DropdownMenu');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_18__foundation_equalizer__["a" /* Equalizer */], 'Equalizer');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_19__foundation_interchange__["a" /* Interchange */], 'Interchange');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_20__foundation_magellan__["a" /* Magellan */], 'Magellan');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_21__foundation_offcanvas__["a" /* OffCanvas */], 'OffCanvas');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_22__foundation_orbit__["a" /* Orbit */], 'Orbit');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_23__foundation_responsiveMenu__["a" /* ResponsiveMenu */], 'ResponsiveMenu');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_24__foundation_responsiveToggle__["a" /* ResponsiveToggle */], 'ResponsiveToggle');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_25__foundation_reveal__["a" /* Reveal */], 'Reveal');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_26__foundation_slider__["a" /* Slider */], 'Slider');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_27__foundation_smoothScroll__["a" /* SmoothScroll */], 'SmoothScroll');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_28__foundation_sticky__["a" /* Sticky */], 'Sticky');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_29__foundation_tabs__["a" /* Tabs */], 'Tabs');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_30__foundation_toggler__["a" /* Toggler */], 'Toggler');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_31__foundation_tooltip__["a" /* Tooltip */], 'Tooltip');


__WEBPACK_IMPORTED_MODULE_1__foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_32__foundation_responsiveAccordionTabs__["a" /* ResponsiveAccordionTabs */], 'ResponsiveAccordionTabs');


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Foundation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(3);






var FOUNDATION_VERSION = '6.4.3';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function(plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = (name || functionName(plugin));
    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName  = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function(plugin, name){
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = Object(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* GetYoDigits */])(6, pluginName);

    if(!plugin.$element.attr(("data-" + pluginName))){ plugin.$element.attr(("data-" + pluginName), plugin.uuid); }
    if(!plugin.$element.data('zfPlugin')){ plugin.$element.data('zfPlugin', plugin); }
          /**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */
    plugin.$element.trigger(("init.zf." + pluginName));

    this._uuids.push(plugin.uuid);

    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function(plugin){
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr(("data-" + pluginName)).removeData('zfPlugin')
          /**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */
          .trigger(("destroyed.zf." + pluginName));
    for(var prop in plugin){
      plugin[prop] = null;//clean up script to prep for garbage collection.
    }
    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
   reInit: function(plugins){
     var isJQ = plugins instanceof __WEBPACK_IMPORTED_MODULE_0_jquery___default.a;
     try{
       if(isJQ){
         plugins.each(function(){
           __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('zfPlugin')._init();
         });
       }else{
         var type = typeof plugins,
         _this = this,
         fns = {
           'object': function(plgs){
             plgs.forEach(function(p){
               p = hyphenate(p);
               __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-'+ p +']').foundation('_init');
             });
           },
           'string': function(){
             plugins = hyphenate(plugins);
             __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-'+ plugins +']').foundation('_init');
           },
           'undefined': function(){
             this['object'](Object.keys(_this._plugins));
           }
         };
         fns[type](plugins);
       }
     }catch(err){
       console.error(err);
     }finally{
       return plugins;
     }
   },

  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function(elem, plugins) {

    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    var _this = this;

    // Iterate through each plugin
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(plugins, function(i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(elem).find('[data-'+name+']').addBack('[data-'+name+']');

      // For each plugin found, initialize it
      $elem.each(function() {
        var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            opts = {};
        // Don't double-dip on plugins
        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");
          return;
        }

        if($el.attr('data-options')){
          var thing = $el.attr('data-options').split(';').forEach(function(e, i){
            var opt = e.split(':').map(function(el){ return el.trim(); });
            if(opt[0]) { opts[opt[0]] = parseValue(opt[1]); }
          });
        }
        try{
          $el.data('zfPlugin', new plugin(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), opts));
        }catch(er){
          console.error(er);
        }finally{
          return;
        }
      });
    });
  },
  getFnName: functionName,

  addToJquery: function($) {
    // TODO: consider not making this a jQuery function
    // TODO: need way to reflow vs. re-initialize
    /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
    var foundation = function(method) {
      var type = typeof method,
          $noJS = $('.no-js');

      if($noJS.length){
        $noJS.removeClass('no-js');
      }

      if(type === 'undefined'){//needs to initialize the Foundation object, or an individual plugin.
        __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
        Foundation.reflow(this);
      }else if(type === 'string'){//an individual method to invoke on a plugin or group of plugins
        var args = Array.prototype.slice.call(arguments, 1);//collect all the arguments, if necessary
        var plugClass = this.data('zfPlugin');//determine the class of plugin

        if(plugClass !== undefined && plugClass[method] !== undefined){//make sure both the class and method exist
          if(this.length === 1){//if there's only one, call it directly.
              plugClass[method].apply(plugClass, args);
          }else{
            this.each(function(i, el){//otherwise loop through the jQuery collection and invoke the method on each
              plugClass[method].apply($(el).data('zfPlugin'), args);
            });
          }
        }else{//error for no class or no method
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
        }
      }else{//error for invalid argument type
        throw new TypeError(("We're sorry, " + type + " is not a valid parameter. You must use a string representing the method you wish to invoke."));
      }
      return this;
    };
    $.fn.foundation = foundation;
    return $;
  }
};

Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function (func, delay) {
    var timer = null;

    return function () {
      var context = this, args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};

window.Foundation = Foundation;

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now || !window.Date.now)
    { window.Date.now = Date.now = function() { return new Date().getTime(); }; }

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */
  if(!window.performance || !window.performance.now){
    window.performance = {
      start: Date.now(),
      now: function(){ return Date.now() - this.start; }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = (funcNameRegex).exec((fn).toString());
    return (results && results.length > 1) ? results[1].trim() : "";
  }
  else if (fn.prototype === undefined) {
    return fn.constructor.name;
  }
  else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str){
  if ('true' === str) { return true; }
  else if ('false' === str) { return false; }
  else if (!isNaN(str * 1)) { return parseFloat(str); }
  return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}




/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_abide__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_accordion__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_accordionMenu__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_drilldown__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_dropdown__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_dropdownMenu__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_equalizer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__foundation_interchange__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__foundation_magellan__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__foundation_offcanvas__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__foundation_orbit__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__foundation_responsiveMenu__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__foundation_responsiveToggle__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__foundation_reveal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__foundation_slider__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__foundation_smoothScroll__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__foundation_sticky__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__foundation_tabs__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__foundation_toggler__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__foundation_tooltip__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__foundation_responsiveAccordionTabs__ = __webpack_require__(33);
/* unused harmony reexport Abide */
/* unused harmony reexport Accordion */
/* unused harmony reexport AccordionMenu */
/* unused harmony reexport Drilldown */
/* unused harmony reexport Dropdown */
/* unused harmony reexport DropdownMenu */
/* unused harmony reexport Equalizer */
/* unused harmony reexport Interchange */
/* unused harmony reexport Magellan */
/* unused harmony reexport OffCanvas */
/* unused harmony reexport Orbit */
/* unused harmony reexport ResponsiveMenu */
/* unused harmony reexport ResponsiveToggle */
/* unused harmony reexport Reveal */
/* unused harmony reexport Slider */
/* unused harmony reexport SmoothScroll */
/* unused harmony reexport Sticky */
/* unused harmony reexport Tabs */
/* unused harmony reexport Toggler */
/* unused harmony reexport Tooltip */
/* unused harmony reexport ResponsiveAccordionTabs */

























/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(i){"use strict"; true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (i),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__camelCase__ = __webpack_require__(42);


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(__WEBPACK_IMPORTED_MODULE_0__camelCase__["a" /* default */])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["a"] = (Router);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ __webpack_exports__["a"] = (function (str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); });;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on all pages
    // Prevent small screen page refresh sticky bug
    $(window).on('sticky.zf.unstuckfrom:bottom', function(e) {
      if (!Foundation.MediaQuery.atLeast('large')) {
        $(e.target).removeClass('is-anchored is-at-bottom').attr('style', '');
      }
    });
    //Dropdown Slideout
    /*
    $(window).on('show.zf.dropdownmenu', function(e) {
      if (Foundation.MediaQuery.atLeast('large')) {
        var i = 0;
        $(e.target).find('.submenu.js-dropdown-active .menu-item').each(function( ) {
          i += $(this).outerHeight();
        });

        var height = i + 'px';
        $(e.target).find('.submenu.js-dropdown-active').css( 'height', height);
      }
    });

    $(window).on('hide.zf.dropdownmenu', function(e) {
      if (Foundation.MediaQuery.atLeast('large')) {
        $(e.target).find('.submenu').css( 'height', '0');
      }
    });
    */

    //Toggle off canvas search
    $('.menu-item.search-icon').on('click', function (e) {
      e.preventDefault();
      $('#off-canvas-search').foundation('toggle');
    });


  },
  finalize: function finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired

    //launch slick slider
    $('.full-screen-slider').slick();

    //launch category slider
    var count = parseInt($('.category-slider').data('slide-count'));
    if(count > 5) {
      count = 5;
    }

    $('.category-slider').slick({
      slidesToShow: count,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      centerMode: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });
  },
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the home page

  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS

  },
});


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init: function init() {
    // JavaScript to be fired on the about us page
  },
});


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map