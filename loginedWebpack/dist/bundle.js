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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjUAAABcCAYAAACWcUQjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRjZCM0NDQkU2MTExMUU3QkU2ODk1Mzk1ODZGMDdDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRjZCM0NDQ0U2MTExMUU3QkU2ODk1Mzk1ODZGMDdDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZGNkIzQ0M5RTYxMTExRTdCRTY4OTUzOTU4NkYwN0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZGNkIzQ0NBRTYxMTExRTdCRTY4OTUzOTU4NkYwN0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+wFV4VQAAOGBJREFUeNrsnVuvLct1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"

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(8);
window.$ = __webpack_require__(3);
window.jQuery = __webpack_require__(3);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./mobase750.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./mobase750.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@charset \"utf-8\";\r\nbody,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button{margin:0;padding:0;}\r\nbody,button,input,select,textarea{font-size:14px;font-family:Sans-Serif;}\r\nhtml,body,form,fieldset,p,div,h1,h2,h3,h4,h5,h6{-webkit-text-size-adjust:none;}\r\ninput,select,textarea{font-size:100%;}\r\ntable{border-collapse:collapse;border-spacing:0;}\r\nth{text-align:inherit;}\r\nfieldset,img,a img{border:0;}\r\niframe{display:block;}\r\nabbr,acronym{border:0;font-variant:normal;}\r\ndel{text-decoration:line-through;}\r\naddress,caption,cite,code,dfn,em,th,var{font-style:normal;}\r\nol,ul{list-style:none;}\r\ncaption,th{text-align:left;}\r\nh1,h2,h3,h4,h5,h6{font-size:100%;}\r\nq:before,q:after{content:'';}\r\nsup{vertical-align:text-top;}\r\nsub{vertical-align:text-bottom;}\r\nins,a{text-decoration:none;}\r\na,input{-webkit-tap-highlight-color: transparent;}\r\na{-webkit-touch-callout:none;}\r\ninput[type=button],input[type=submit],input[type=reset]{-webkit-appearance: none;}\r\n/*input[type=text],input[type=password],input[type=tel]{-webkit-appearance: caret; -moz-appearance: caret;}*/\r\n\r\n*{-webkit-overflow-scrolling: touch;}/*2016-06-12 add by maorf*/\r\n\r\n\r\n.fn-clear:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0;}\r\n.fn-hide{display:none;}\r\n.fn-left,.fn-right{display:inline;}\r\n.fn-left{float:left;}\r\n.fn-right{float:right;}\r\n\r\ninput,textarea{outline: none;}\r\n*{\r\n\t-webkit-box-sizing: border-box;\r\n\t-moz-box-sizing: border-box;\r\n\t-ms-box-sizing: border-box;\r\n\t-o-box-sizing: border-box;\r\n\tbox-sizing: border-box;\r\n}\r\na,input,label,select,span{-webkit-tap-highlight-color: transparent;}\r\n* { -webkit-tap-highlight-color:rgba(0,0,0,0); -webkit-tap-highlight-color: transparent; tap-highlight-color:rgba(0,0,0,0); tap-highlight-color:transparent;}\r\n\r\n\r\n/*弹出层样式开始*/\r\n.ui-wait,.ui-waits{background: rgba(0,0,0,0.3);position:fixed; left: 0; right: 0; top: 0; bottom:0px; z-index:16;}\r\n.ui-wait .content,.ui-waits .content{\r\n\tposition: fixed;\r\n\tborder-radius: 0.8rem;\r\n\tbackground:#fff;\r\n\tcolor:#333;\r\n\tfont-size:1.3rem;\r\n\twidth:25rem;\r\n\tbox-sizing:border-box;\r\n\t top:50%;left:50%;\r\n-webkit-transform:translate(-50%,-50%);\r\n-moz-transform:translate(-50%,-50%);}\r\n\r\n.ui-wait h3{font-size:1.6rem; font-weight:normal; text-align:center; color:#ff621d; border-bottom:0.1rem solid #ff621d; padding:1.2rem 0;}\r\n.ui-wait .icon_bg{width:3.3rem; height:0.9rem; overflow:hidden; margin-left:2rem;/* background:url(../img/icon1.png) no-repeat; background-size:100% 100%;*/}\r\n.ui-wait .content-nr,.ui-waits .content-nr{ text-align:left; padding:2rem; font-size:1.3rem; line-height:2.5rem; color:#7e7878;}\r\n.ui-wait .content-nr p{color:#434343;}\r\n.ui-wait .ui-operation,.ui-waits .ui-operation{ text-align:center; padding:0rem 0 2rem 0;}\r\n.ui-wait .ui-operation a{ height:3.6rem; line-height:3.6rem; font-size:1.8rem; display:inline-block;width:9.5rem;margin:0 0.5rem; border-radius:0.5rem;}\r\n.ui-wait .js_abolish{ background:#aaaaaa;color:#fff;}\r\n.ui-wait .js_confirm{ background:#ff621d;color:#fff;}\r\n.ui-wait .ui-operation a.affirm{background:#1a8ad2;color:#fff;border:0.1rem solid #1a8ad2;width:18rem;}\r\n\r\n\r\n\r\n.ui-waits h3{font-size:1.6rem; font-weight:normal; margin:0 0.5rem; text-align:center; color:#f4725d; border-bottom:0.1rem solid #f4725d; padding:1.2rem 0;}\r\n.ui-waits .icon_bg{width:2.1rem; height:2.1rem; position:absolute;right:10px;top:10px; overflow:hidden; margin-left:2rem; /*background:url(../img/close.png) no-repeat; background-size:100% 100%;*/}\r\n.ui-waits .ui-operation a{ height:3.6rem; line-height:3.6rem; font-size:1.8rem; display:inline-block;width:15.5rem;margin:0 0.5rem; border-radius:0.5rem; background:#ff621d;color:#fff;}\r\n/*弹出层样式结束*/\r\n\r\n/* 菊花弹出框 */\r\n.ui-waitalert{background: rgba(0,0,0,0.5);position:fixed; left: 0; right: 0; top: 0; bottom:0px; z-index:16;}\r\n.ui-waitalert .content{\r\n\tposition: fixed;\r\n\ttext-align: center;\r\n\tborder-radius: 8px;\r\n\tbackground-color: rgba(0,0,0,0.75);\r\n\tcolor:#fff;\r\n\tpadding:20px;\r\n\tbox-sizing:border-box;\r\n\ttop:50%;left:50%;\r\n-webkit-transform:translate(-50%,-50%);\r\n-moz-transform:translate(-50%,-50%);\r\n}\r\n.ui-waitalert .content em.icon{ width:3.2rem; height:3.2rem; display:inline-block; background:url(http://www.zj.10086.cn/find/images/loading.gif) no-repeat; background-size:100% 100%;}\r\n/* 菊花弹出框 */\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./nf_login.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./nf_login.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(10);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "html#login,#login body{width: 100%;height: 100%;overflow: hidden;}\r\nbody{background-image: url(" + escape(__webpack_require__(11)) + ");background-size:100% 100%;background-position:0 0;background-repeat: no-repeat;}\r\n.page-start{position:absolute;top: 3.4rem;bottom:0;right:0;left:0;padding-bottom: .4rem;}\r\n.page-all{width:76%;margin:0 auto 0;}\r\n.formgroup .bluesquare{width:100%;height:0.88rem;border:1px solid #0075A9;border-radius:5px;margin-top:0.13rem;padding:.2rem .7rem .2rem 1.35rem;}\r\n.labetime{float:left;width:1.4rem;height:0.48rem;text-align:center;line-height:0.48rem;color:#a6a4b3;font-size:0.3rem;\r\nmargin-left:-1.3rem;}\r\n.imageright{width:0.3rem;height:0.34rem;}\r\n.bluesquared{width:100%;height:0.88rem;border:1px solid #0075A9;border-radius:5px;margin-top:0.13rem;padding:0.24rem;}\r\n.bluesquared #nv-language{width:100%;height:0.4rem;background-color: rgba(255,255,255,0);border:none;font-size:0.25rem;color:#a6a4b3;}\r\n\r\n.bluesquare1{width:100%;height:0.88rem;border:1px solid #0075A9;border-radius:5px;margin-top:0.13rem;padding:.2rem .7rem .2rem .96rem }\r\n.labeleft{float:left;width:0.96rem;height:0.48rem;text-align:center;line-height:0.48rem;color:#a6a4b3;font-size:0.3rem;margin-left:-.96rem;}\r\n.nv-input1{\r\n    border-width:0;\r\n    width:100%;\r\n    height: .48rem;\r\n    line-height: .48rem;\r\n    font-size:.3rem;\r\n    outline: 0;\r\n    font-family:\"microsoft yahei\";\r\n    color:#a6a4b3;\r\n    background: transparent;\r\n}\r\ni{\r\n    font-style: normal;\r\n}\r\n.nv-input2{\r\n    border-width:0;\r\n    width:97%;\r\n    height: .48rem;\r\n    line-height: .48rem;\r\n    font-size:.3rem;\r\n    outline: 0;\r\n    font-family:\"microsoft yahei\";\r\n    color:#a6a4b3;\r\n    background: transparent;\r\n\r\n}\r\n.right-icon1{\r\n\twidth:.48rem;height:.48rem;\r\n\tfloat: right;\r\n\tmargin-right: -0.55rem;\r\n\tbackground-size:contain;\r\n}\r\n.right-icon1.icon1-name{\r\n\tbackground-image:url(" + escape(__webpack_require__(12)) + ");\r\n}\r\n.right-icon1.icon1-name1{\r\n\tbackground-image:url(" + escape(__webpack_require__(13)) + ");\r\n}\r\n.right-icon1.icon1-name2{\r\n\tbackground-image:url(" + escape(__webpack_require__(14)) + ");\r\n}\r\n.right-icon1.icon1-name3{\r\n\tbackground-image:url(" + escape(__webpack_require__(15)) + ");\r\n}\r\n\r\n#canvas{\r\n    position:absolute;\r\n    top:0;\r\n    left:-100%;\r\n    width:5.6rem;\r\n}\r\n\r\n#canvas img{\r\n    display: block;\r\n    width:100%;\r\n}\r\n\r\n.login{\r\n    position:absolute;\r\n    left:-100%;\r\n    bottom:0;\r\n}\r\n\r\n.btnpic{width:100%;height:0.88rem;margin-top:0.2rem;background-image: url(" + escape(__webpack_require__(2)) + ");background-size:100% 100%;text-align:center;line-height:0.88rem;font-size:0.3rem;font-weight:800;color:#FFFFFF;letter-spacing: 1.2px;position:relative;cursor: pointer;}\r\n.btnpic .btnfile{width:100%;height:0.88rem;position:absolute;top:0px;left:0px;opacity:0;}\r\n.smallpic{position:absolute;width:0.36rem;height:0.36rem;right:0.15rem;top:0.26rem;}\r\n.fontsize{width:100%;line-height:0.3rem;font-size:0.18rem;color:#a6a4b3;margin-top:0.2rem}\r\n.btnsub{width:100%;height:0.88rem;margin-top:0.2rem;background-image: url(" + escape(__webpack_require__(2)) + ");background-size:100% 100%;text-align:center;line-height:0.88rem;font-size:0.3rem;font-weight:800;color:#FFFFFF;cursor: pointer;}\r\n.mb-bv{position:absolute;z-index:666;width:100px;height:100px;background-color: rgba(0,0,0,0.5);left:calc(50% - 50px);top: calc(50% - 50px);color:#FFFFFF;text-align:center;border-radius:6px;display: none;}\r\n/*loading*/\r\n.spinner {\r\n  margin: 30px auto 10px auto;\r\n  width: 20px;\r\n  height: 20px;\r\n  position: relative;\r\n}\r\n \r\n.container1 > div, .container2 > div, .container3 > div {\r\n  width: 6px;\r\n  height: 6px;\r\n  background-color: #FFFFFF;\r\n \r\n  border-radius: 100%;\r\n  position: absolute;\r\n  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;\r\n  animation: bouncedelay 1.2s infinite ease-in-out;\r\n  -webkit-animation-fill-mode: both;\r\n  animation-fill-mode: both;\r\n}\r\n \r\n.spinner .spinner-container {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n \r\n.container2 {\r\n  -webkit-transform: rotateZ(45deg);\r\n  transform: rotateZ(45deg);\r\n}\r\n \r\n.container3 {\r\n  -webkit-transform: rotateZ(90deg);\r\n  transform: rotateZ(90deg);\r\n}\r\n \r\n.circle1 { top: 0; left: 0; }\r\n.circle2 { top: 0; right: 0; }\r\n.circle3 { right: 0; bottom: 0; }\r\n.circle4 { left: 0; bottom: 0; }\r\n \r\n.container2 .circle1 {\r\n  -webkit-animation-delay: -1.1s;\r\n  animation-delay: -1.1s;\r\n}\r\n \r\n.container3 .circle1 {\r\n  -webkit-animation-delay: -1.0s;\r\n  animation-delay: -1.0s;\r\n}\r\n \r\n.container1 .circle2 {\r\n  -webkit-animation-delay: -0.9s;\r\n  animation-delay: -0.9s;\r\n}\r\n \r\n.container2 .circle2 {\r\n  -webkit-animation-delay: -0.8s;\r\n  animation-delay: -0.8s;\r\n}\r\n \r\n.container3 .circle2 {\r\n  -webkit-animation-delay: -0.7s;\r\n  animation-delay: -0.7s;\r\n}\r\n \r\n.container1 .circle3 {\r\n  -webkit-animation-delay: -0.6s;\r\n  animation-delay: -0.6s;\r\n}\r\n \r\n.container2 .circle3 {\r\n  -webkit-animation-delay: -0.5s;\r\n  animation-delay: -0.5s;\r\n}\r\n \r\n.container3 .circle3 {\r\n  -webkit-animation-delay: -0.4s;\r\n  animation-delay: -0.4s;\r\n}\r\n \r\n.container1 .circle4 {\r\n  -webkit-animation-delay: -0.3s;\r\n  animation-delay: -0.3s;\r\n}\r\n \r\n.container2 .circle4 {\r\n  -webkit-animation-delay: -0.2s;\r\n  animation-delay: -0.2s;\r\n}\r\n \r\n.container3 .circle4 {\r\n  -webkit-animation-delay: -0.1s;\r\n  animation-delay: -0.1s;\r\n}\r\n \r\n@-webkit-keyframes bouncedelay {\r\n  0%, 80%, 100% { -webkit-transform: scale(0.0) }\r\n  40% { -webkit-transform: scale(1.0) }\r\n}\r\n \r\n@keyframes bouncedelay {\r\n  0%, 80%, 100% {\r\n    transform: scale(0.0);\r\n    -webkit-transform: scale(0.0);\r\n  } 40% {\r\n    transform: scale(1.0);\r\n    -webkit-transform: scale(1.0);\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA2AAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkY1N0JGRDdFNjFCMTFFNzlCNEE4RjZBNDQzNEE1OTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkY1N0JGRDhFNjFCMTFFNzlCNEE4RjZBNDQzNEE1OTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRjU3QkZENUU2MUIxMUU3OUI0QThGNkE0NDM0QTU5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRjU3QkZENkU2MUIxMUU3OUI0QThGNkE0NDM0QTU5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAcFBQUGBQcGBgcLBwYHCwwJBwcJ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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJMgAgAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmQAAAAABAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACTIAAAAAAAQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkAAAAAAAAACAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkyAAAAAAAAAAAAAIAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASZAAAAAAAAAAAAAACAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJMgAAAAAAAAAAAAAAAAAIAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmQAAAAAAAAAAAAAAAAAAAAAgAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACTIAAAoEAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmQAAAAAAAAAAAAAAAAAAAAAAAAACAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMgAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAFAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAABQAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAKAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAACgAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAKAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAACgAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAoAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAFAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAABQAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAACAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAABIAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAASAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAEgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAABIAAAAAAAAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAAAAAAAACAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAASAAAAAAAAAAAAAAAAAAAAAAAAAIAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAJAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAgFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAACQAAAAAAAAAAAAAAAAAAAAAAACAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAJAAAAAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAkAAAAAAAAAAAAAAAAAAAAACAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAACQAAAAAAAAAAAAAAAAAAAAQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgBIAAAAAAAAAAAAAAAAAAAQAAACAAAAAAAAAAAAAAAAAAA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"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0OThDRkVDMEU1RjkxMUU3QTMxMkFDQTI5QjlERDVBRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0OThDRkVDMUU1RjkxMUU3QTMxMkFDQTI5QjlERDVBRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5OENGRUJFRTVGOTExRTdBMzEyQUNBMjlCOURENUFEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ5OENGRUJGRTVGOTExRTdBMzEyQUNBMjlCOURENUFEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XYE7iQAAAwRJREFUeNrsmFuITVEYx88elJl5mEFyfRkiaXg6Q82DW3hRBjmn0zGFkuZZKUWMWySX8iKklI7LOUk4aXLJTKkhihlTpkTJgymaXDIYl+P31bdrtxu1b2szOV/9+/bas9bav/n22t/61rFKpVJiuFhFYhhZGbYMi40MO4FlWYl8Pl/HZTNaguaisfrnfvQU3UG5dDr90j3ezwduhckGhUJhEu4Qynp4S7/QBbQV6DexwgK6FHfJEUWxx+geeq3wU9BCjXbCEe0MwLdigQV0Be4KGqW3rqIdAPQM1Z9lMhu3H63SW9/RGvoXjcICOgv3CFXrq23hoae9jAV6A+6U/pOfUTKVSvWazAYnFFRss1dQMfqelTHalDlO+vqY/USWqMr6a9fmZaKyVrKBXyPCsmxWanMx87SbiOw6x/WeEBlvp+O62dQyWKD+OdHoDkrKcuiSOVxzRg5bp743Ed6eqZ9mCtZOVZ8igP2ofoQp2LfqJ0cAO1X9O1OwT9TPJzNUB6UkG1ThGrTZZQr2mvpKtDFEVNc7cvV1U7A59EGvW4nuxABRlTG7tSlznTMCS7p6j9ulzXESFR5e4wO0RiM5Xm/tZc5+k9vtcVTU6yS6D0TSA6j0eaBjxG6gY8a2W8e2W6VV13K7LNV2HnWQ9PuAk314gpaIGdQkz9P+N9Fq+g3EVc9KfmxF24Y4cfz4w0lE7h+UcYD+jKueXSa7JmpEM30cjwT2BborhRDAt43BAlmPO4PmRXQGlDW8iY+sJ1JYQJv0DFWptwaQHE269ajixcagObrW7Tz7Rd4SwMVIYAFt1DrWrg2OoH2SygLWs7W47WiLZqRBtIj5OkPBAjoaJ69pul1/MmnOeRQPse1mdKOp0JKxnrkHw+TZrAP0qBM0rPGBXcQd1uYMV3EfGFbsm55Qo7YD6KvrWYFh7R2n08/W6HML73A9KzCsvfe/MvgzVp/62rAfmN3hITpvCDZr17dE2orih7kGR8H8V8zLMmiLkafNSCHzr0a2DFuGLcP+D7C/BRgAya8QvrIHDa0AAAAASUVORK5CYII="

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDBDOTI4NUU1RjkxMUU3QkVGREVEM0ZCQTgwNjI4MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDBDOTI4NkU1RjkxMUU3QkVGREVEM0ZCQTgwNjI4MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJEMEM5MjgzRTVGOTExRTdCRUZERUQzRkJBODA2MjgwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJEMEM5Mjg0RTVGOTExRTdCRUZERUQzRkJBODA2MjgwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ikZ7MAAABB9JREFUeNrsWFtIVFEUdcwMGokI7cPIqCB6jz0o7eGHX1YOZOJQP1E/lVkUSj5IiCh7WWlGH0GYPaAas6dR/UhgD8aKzCj7KUihFxZhFmqhrV3ryuFwzZk71wFhDiz2veecu8+6++6z9z7X0dvbGzFUWmTEEGphsmGyaFHBKqiurh4BkQYsAxYCk4BRHG4H3gI+4DZwx+PxdKnPB7LBHVajAUiOhMgFtgGxfj7WBpQDZSD9MyRkQTQVogoYr3R/A+qBl8An9o0FZgJLgdHK3FZgHQjXDSpZEN0OcUTx98fAQeAmFu82e8br9Q6HcAMFwAJ29wB5WVlZ5YNCFkR3QBzi7Q+6QCVI+qUEpB0Q64EKwMnufBAutZUsiKaL9XgrnzkNizQ6HI6A3QikXRC3gHHsckNXrS1kQXQMRDN9UCy6CMqb/irQyIJIAkQCb1tg9ZZ+CM+GeADEAJ+BadD51Y7QtZNEpW0xiCoLi/+uBcRNpmtjsuEOA2dUd8F1E8ZypJ+6ZY28oCwLq0rMfE8f84FokkkI8wIrgEZGieccdtFHXXSh1UbIUl7mIUQyv1g89LcHY9lVymYoMxk/R6JFEhW0zXYPZCoYBfbzRTza8+Uk6+RaVcGk2zTK78B1zapuLrAHJA+YRQXpkzGZA2SBvFubcoO61bUsk51L+RSfqFMbywY+AiV+6NnHudlqJ3U+0dayTHYi5SuTsRSgVs/3Zg1zOlkfpJgMN2trWSYbpbiB6gJO+llrACFWwpgTrhCj9bf7s4cCKREjtc8nu7dLCWn+tDh5Blbu0PqH2VXPfqCcYjLWIJuCcXagrBXJMrLBZHiqtpZlskYCmI9Pr+fWSmAysNEPPZvok6c0dxKd87S1LJOto5Q8vkQbOws8Ao7Bcpn/sWom46kkgPPasJSP8dpalpPCZUDipINhp17x2x5YJgOXd2UeSNVAngaeccocZrBMZrUM+GuPpn+zcWgALtlRyFyFWEmFySDp61OAQgYkJeUWA1tZmKitgyVhiUmqTWYxI4a4Br0ZdpCdQWtJEf1O/BeK2/SqC4vLeWwx/VjaGyFjFocxN46F+wRAinYXdL62q54toDsYUWA5lH+xWM/Gsp41Tg3F0FViR+gympwQLvJaFrmPF0i0QDSRfm8QrWGRY/uxJhriAosXab+BE8DR/opsrSiX03COsrGvAGtg1e7BOjDK1ygEdgHR7P4lmwuET/ZDdAPEcWW+kNstbiURJRT/DaSg3gukK935IFyqEc3ladhoUoQXy0khZD85FNJJJGD86Chi/SpECxV/lOiRjjFfyP/IaHF2FrNPH2FKlWgqiL7Qnw85WVpRJxwxENFAydr2F5FkUknOL6IBG8YuyyobSixcy9TsHohoSN0glC385ztMNkw2TPZf+yPAAPXBsJstbrQRAAAAAElFTkSuQmCC"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRTM3QzY4REU1RjkxMUU3ODY0QzhERDYzQjk2OTg3QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRTM3QzY4RUU1RjkxMUU3ODY0QzhERDYzQjk2OTg3QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBFMzdDNjhCRTVGOTExRTc4NjRDOERENjNCOTY5ODdDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBFMzdDNjhDRTVGOTExRTc4NjRDOERENjNCOTY5ODdDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+u8CvXgAAA0VJREFUeNrsmHtojWEcx88rWe5ySYZCc83SkltESG4tinNmJNLUqBV/iO2PCYlp9odc/lJLSe1scllikn/MorSIGXNLWJtLYeayZj6/+h69TqecpXfeU+epT7/3PO9zzvm+v+f3/J7f+zgdHR2BRGndAgnUkmKTYhNNbPfODA6Hw3mY/XrIwmAwWOI4zj8J6Ew2cuIdjNDFmMtR3cFQKFTuK7EINU/eh4lwCT5DFnyAdAS/6Qqx8cbsPAn9DjmwGZ7DQDhZVlbm+GmBLY84mThtBPPsevgJS2CLn8TOlr36O1iDwWpMkT4W491xfhGbJnsnqn831EJPOOV1OMQrtq9s0x+pIBhsw6yDbzADZvlBbIpsW4x7jcLaID+I/SLbLyqlTcDcgtHwVdf/XWwkj450CZ0icbawWi3vkm+b/SD2sew0V99WefqFxSpCL/olG9yQnevqGy9bgNB7fsqz12WXMv2RzNAcw9u+EHsbniifrlZfpIDJI79O7Qqxnam6CjF74CFMthoErsF8qDMPEw6tfihkrB1XCrOCJsSGYP+yET7BJCj1egdzOvNkePcgZqcyQDqCW+hb5QqJA3i3INZ3eZCZmEWamQrGdXjpWWuH4C2M0htDgD+twOzV/XxE7Yoh1Kq2ao0Lw2n6Ujz1rLy7BnNGH1cg9oKm38IkV/2HbQa41869AVzXw1B4BSNc6XAls/PeM7ESXGZ1DLRYAYOoOkTZLJWqzg3ojcIW5DbI1i5osb0WjmpWG6xWRnCDl2+3m+AB9IEqhKYh2ArxDbBPY5ZpO87W51zGfIQTXGfqQcdCDQ8/xzPPyrtjJGYwvDZxkZ0M8ZaLj8Aw+AEl3MuPiuMMTCWkakwmHq7y5NyAH36GWQDvYLh5CAFZWnTlKnqsyBkSLVRjalUD34UecMwzz0aVieclLKDFtx0xTfF830JIsWsOcDw9kUFUvTxUqS6L0UeIKILUvwjNcOXop557NnIio/RlC6zY9cZgi+6mtmWrLSxN9VaxbocmC11vIBazV7pErMtbJnSHcm7/OH7C6oochNZ0mWdjTHEvnSlYCpuuXc/Ky3Z4aQsSzsI5hLZ7mrr+R0uezybFJsUmxSag2F8CDAAFfjhIWLWcMgAAAABJRU5ErkJggg=="

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRkVERDBDMUU1RjgxMUU3OEIyN0UwMkJFMjE2RkU3QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRkVERDBDMkU1RjgxMUU3OEIyN0UwMkJFMjE2RkU3QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVGRUREMEJGRTVGODExRTc4QjI3RTAyQkUyMTZGRTdBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRUREMEMwRTVGODExRTc4QjI3RTAyQkUyMTZGRTdBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tIu2UAAAAshJREFUeNrsmEtoFEEQhnfNKio+8BDxIMRD4noSjGguguAjqKCnLARUCBjQiyKIwYMgCBLEk/gIBvEgKMqiqAfx4gNBfOHBW5KNHnygICpKotGo61dQDc2yMztkJ1MK0/DzT89UM3/X1FR1d7ZcLmf+l5ZNxaZi6xBbLBbXQzdBrobpiUKhsCcOsVPqGLsrglBp3UxsRhxicxP0qrx8g3avgDchExLbjeCqiVjaGjAT/ARdfOaRgEm1QJviEjvRMPimPBXMDbFrrLA3EXsfvJMfFGwN8GoeWqHdy2Zi+ey/oUva3R5g5u6/BA+tU1cr9Ey77aBUYXIXLAKHmdwh86KA4AEoX8Msj9ghs9TltVHla+C5d1/SVY9ex1Yi6/XsF2gOWIf3blc8G9X09hSs5vl3swqGmAUqVNpwFRN3TzLCOeyzluW2RXkMvAoR+xZ0goOWYpudKD5xtVgaUJaMcUqyAt7tsBK7WLkU8HzYm9ReIDF9HsHLLMUORRD7R2oJeA2ua7ybhEGQZ10YTJPiQKh8hreA2ZLqEDw9EbH6Z4eKRdwH6KtbgDOmgXuD6uE2ieGkPLtQc2hYGPihIMvEo3q9PMK4WCuY8+oI3nofYieebNVKtw/vynJyBzjDuLNJiy3VsHPPHwCpYN26wNmd5A+2JOKn9DPCNnAMdODV8SQXMlE9O6jcBH4gsseiKDRH9KybTIOubTOWYsdq2I3rptIfk7jYT8on+cObAnKxePOiFgVpH63EyibxF5gPbiBsVhWbXrBZr48Tr0+sNox3IHcktBRc8NerXHdB+7V7S3Ks6fERgvugPu1KzT+iQldB/d76oFN3w+bbmpx6bq3eOqBebNS4XonQF//EHkwFz4MeeUtGlwXaEXovE2OL5XxWT18ee0dJOxHan4m5xXaYjGA56JDDt9P1VqpJF5tES8WmYlOxk9j+CjAAv0j9bkMrFhAAAAAASUVORK5CYII="

/***/ }),
/* 16 */
/***/ (function(module, exports) {

(function (doc, win) {
        var docEl = doc.documentElement,
                dpr = 1,
                tid,
                scale = 1 / dpr;
        var metaEl = doc.createElement('meta');
        metaEl.name = "viewport";
        metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
        docEl.firstElementChild.appendChild(metaEl);
        var recalc = function () {
            var deviceWidth = docEl.clientWidth;
            if (deviceWidth > 750) deviceWidth = 750;
            docEl.style.fontSize = deviceWidth / 7.5 + 'px';
        };
        recalc();

        win.addEventListener('resize', function() {
            clearTimeout(tid);
            tid = setTimeout(recalc, 300);
        }, false);

    })(document, window);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*! jquery-html5Validate.js 基于HTML5表单验证的jQuery插件
 * Create by zhangxinxu(.com) on 2012-12-05
 * Move to Github ( https://github.com/zhangxinxu/html5Validate ) on 2014-12-17
**/
(function($, undefined) {
	// 全角半角转换
	DBC2SBC = function(str) {
		var result = '', i, code;
		for (i=0 ; i<str.length; i++) {
			code = str.charCodeAt(i);
			if (code >= 65281 && code <= 65373) {
				result += String.fromCharCode(str.charCodeAt(i) - 65248);
			} else if (code == 12288) {
				result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
			} else {
				result += str.charAt(i);
			}
		}
		return result;
	};
	
	// 自定义提示隐藏、绑定事件以及解绑事件
	$.testRemind = (function() {
		var winWidth = $(window).width();
		var fnMouseDown = function(e) {
			if (!e || !e.target) return;
			if (e.target.id !== $.testRemind.id && $(e.target).parents("#" + $.testRemind.id).length === 0) {
				$.testRemind.hide();
			}	
		}, fnKeyDown = function(e) {
			if (!e || !e.target) return;
			if (e.target.tagName.toLowerCase() !== "body") {
				$.testRemind.hide();
			}
		}, funResize = function() {
			if (!$.testRemind.display) return;
			var nowWinWidth = $(window).width();
			if (Math.abs(winWidth - nowWinWidth) > 20) {
				$.testRemind.hide();
				winWidth = nowWinWidth;
			}
		};
		return {
			id: "validateRemind",
			display: false,
			css: {},
			hide: function() {
				$("#" + this.id).remove();
				this.display = false;
				if (this.target) this.target.removeClass("error");
				$(document).unbind({
					mousedown: 	fnMouseDown,
					keydown: fnKeyDown
				});
				$(window).unbind("resize", funResize);
			},
			bind: function() {
				$(document).bind({
					mousedown: 	fnMouseDown,
					keydown: fnKeyDown
				});
				$(window).bind("resize", funResize);
			}
		};		
	})();
	
	// 全局对象，可扩展
	OBJREG = {
		EMAIL:"^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$",
		NUMBER: "^\\-?\\d+(\\.\\d+)?$",
		URL:"^(http|https|ftp)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
		TEL:"^1\\d{10}$",
		ZIPCODE:"^\\d{6}$",
		"prompt": {
			radio: "请选择一个选项",
			checkbox: "如果要继续，请选中此框",
			"select": "请选择列表中的一项",
			email: "请输入电子邮件地址",
			url: "请输入网站地址",
			tel: "请输入手机号码",
			number: "请输入数值",
			date: "请输入日期",
			pattern: "内容格式不符合要求",
			empty: "请填写此字段",
			multiple: "多条数据使用逗号分隔"
		}	
	};
	
	$.html5Attr = function(ele, attr) {
		if (!ele || !attr) return undefined;
		// 为了向下兼容jQuery 1.4
		if (document.querySelector) {
			return $(ele).attr(attr);	
		} else {
			// IE6, 7
			var ret;
			ret = ele.getAttributeNode(attr);
			// Return undefined if nodeValue is empty string
			return ret && ret.nodeValue !== "" ? ret.nodeValue : undefined;	
		}	
	};
	$.html5Validate = (function() {	
		// 验证需要的子集方法 如是否为空，是否正则匹配，是否溢出
		return {
			isSupport: (function() {
				return $('<input type="email">').attr("type") === "email";	
			})(),
			isEmpty: function(ele, value) {
				value = value || $.html5Attr(ele, "placeholder");
				var trimValue = ele.value;
				if (ele.type !== "password") {
					trimValue = $.trim(trimValue);
				}
				if (trimValue === "" || trimValue === value) return true;	
				return false;	
			},
			isRegex: function(ele, regex, params) {
				// 原始值和处理值
				var inputValue = ele.value, dealValue = inputValue, type = ele.getAttribute("type") + "";
				type = type.replace(/\W+$/, "");
				
				if (type !== "password") {
					// 密码不trim前后空格
					dealValue = $.trim(inputValue);
					if (type !== "text" && type !== "null" && ele.tagName.toLowerCase() != "textarea") {
						// 非密码框和文本框进行全半角转换
						dealValue = DBC2SBC(dealValue);
					}
					//  文本框值改变，重新赋值
					if (dealValue !== inputValue) $(ele).val(dealValue);
				}
		
				// 获取正则表达式，pattern属性获取优先，然后通过type类型匹配。注意，不处理为空的情况
				regex = regex || (function() {
					return $.html5Attr(ele, "pattern");
				})() || (function() {
					// 文本框类型处理，可能有管道符——多类型重叠，如手机或邮箱
					return type && $.map(type.split("|"), function(typeSplit) {
						var matchRegex = OBJREG[typeSplit.toUpperCase()];
						if (matchRegex) return matchRegex;
					}).join("|");	
				})();
				
				if (dealValue === "" || !regex) return true;
				
				// multiple多数据的处理
				var isMultiple = $(ele).hasProp("multiple"), newRegExp = new RegExp(regex, params || 'i');
				// number类型下multiple是无效的
				if (isMultiple && !/^number|range$/i.test(type)) {
					var isAllPass = true;
					$.each(dealValue.split(","), function(i, partValue) {
						partValue = $.trim(partValue);
						if (isAllPass && !newRegExp.test(partValue)) {
							isAllPass = false;
						}
					});
					return isAllPass;
				} else {
					return newRegExp.test(dealValue);	
				}
				return true;
			},
			isOverflow: function(ele) {
				if (!ele) return false;
				//  大小限制
				var attrMin = $(ele).attr("min"), attrMax = $(ele).attr("max"), attrStep
					// 长度限制
					, attrDataMin, attrDataMax
					// 值
					, value = ele.value;
					
				if (!attrMin && !attrMax) {
					attrDataMin = $(ele).attr("data-min"), attrDataMax = $(ele).attr("data-max");
					if (attrDataMin && value.length < attrDataMin) {
						$(ele).testRemind("至少输入" + attrDataMin + "个字符");
						ele.focus();
					} else if (attrDataMax && value.length > attrDataMax) {
						$(ele).testRemind("最多输入" + attrDataMax + "个字符");
						$(ele).selectRange(attrDataMax, value.length);
					} else {
						return false;	
					}
				} else {
					// 数值大小限制
					value = Number(value);
					attrStep = Number($(ele).attr("step")) || 1;
					if (attrMin && value < attrMin) {
						$(ele).testRemind("值必须大于或等于" + attrMin);	
					} else if (attrMax && value > attrMax) {
						$(ele).testRemind("值必须小于或等于" + attrMax);	
					} else if (attrStep && !/^\d+(\.0+)?$/.test((Math.abs((value - attrMin || 0)) / attrStep).toFixed(10))) {
						$(ele).testRemind("值无效");	
					} else {
						return false;	
					}
					ele.focus();
					ele.select();
				}
				return true;
			},
			isAllpass: function(elements, options) {
				if (!elements) return true;
				var defaults = {
					// 优先label标签作为提示文字
					labelDrive: true
				};
				params = $.extend({}, defaults, options || {});
				
				if (elements.size && elements.size() == 1 && elements.get(0).tagName.toLowerCase() == "form") {
					elements = elements.find(":input");	
				} else if (elements.tagName && elements.tagName.toLowerCase() == "form") {
					elements = $(elements).find(":input");	
				}
				var self = this;
				var allpass = true
				  , remind = function(control, type, tag) {
					var key = $(control).attr("data-key"), label = $("label[for='"+ control.id +"']"), text= '', placeholder;
					
					if (params.labelDrive) {
						placeholder = $.html5Attr(control, "placeholder");
						label.each(function() {
							var txtLabel = $(this).text();
							if (txtLabel !== placeholder) {
								text += txtLabel.replace(/\*|:|：/g, "");
							}
						});
					}
					
					// 如果元素完全显示
					if ($(control).isVisible()) {
						if (type == "radio" || type == "checkbox") {
							$(control).testRemind(OBJREG.prompt[type], {
								align: "left"	
							});
							control.focus();
						} else if (tag == "select" || tag == "empty") {
							// 下拉值为空或文本框文本域等为空
							$(control).testRemind((tag == "empty" && text)? "您尚未输入"+ text : OBJREG.prompt[tag]);
							control.focus();
						} else if (/^range|number$/i.test(type) && Number(control.value)) {
							// 整数值与数值的特殊提示
							$(control).testRemind("值无效");
							control.focus();
							control.select();
						} else {
							// 文本框文本域格式不准确
							// 提示文字的获取	
							var finalText = OBJREG.prompt[type] || OBJREG.prompt["pattern"];
							if (text) {
								finalText = "您输入的"+ text +"格式不准确";
							}
							if (type != "number" && $(control).hasProp("multiple")) {
								finalText += "，" + OBJREG.prompt["multiple"];
							}
							
							$(control).testRemind(finalText);
							control.focus();
							control.select();	
						}			
					} else {
						// 元素隐藏，寻找关联提示元素, 并走label提示流(radio, checkbox除外)
						var selector = $(control).attr("data-target");
						var target = $("#" + selector);
						if (target.size() == 0) {
							target = $("." + selector);
						}
						var customTxt = "您尚未" + (key || (tag == "empty"? "输入": "选择")) + ((!/^radio|checkbox$/i.test(type) && text) || "该项内容");
						if (target.size()) {
							if (target.offset().top < $(window).scrollTop()) {
								$(window).scrollTop(target.offset().top - 50);
							}
							target.testRemind(customTxt);
						} else {
							alert(customTxt);	
						}
					}
					return false;
				};
				
				elements.each(function(){
					var el = this, type = el.getAttribute("type"), tag = el.tagName.toLowerCase(), isRequired = $(this).hasProp("required");
					// type类型
					if (type) {
						var typeReplace = type.replace(/\W+$/, "");	
						if (!params.hasTypeNormally && $.html5Validate.isSupport && type != typeReplace) {
							// 如果表单元素默认type类型保留，去除某位空格或管道符
							try { el.type = typeReplace; } catch(e) {}
						}
						type = typeReplace;
					}
					
					if (allpass == false || el.disabled || type == 'submit' || type == 'reset' || type == 'file' || type == 'image') return;
					// 需要验证的有
					// input文本框, type, required, pattern, max, min以及自定义个数限制data-min, data-max
					// radio, checkbox
					// select
					// textarea
					// 先从特殊的下手，如单复选框	
					if (type == "radio" && isRequired) {
						// 单选框，只需验证是否必选，同一name单选组只有要一个设置required即可
						var eleRadios = el.name? $("input[type='radio'][name='"+ el.name +"']"): $(el)
							, radiopass = false;
							
						eleRadios.each(function() {
							if (radiopass == false && $(this).is(":checked")) {//20140609 Chvin
								radiopass = true;
							}
						});
						
						if (radiopass == false) {
							allpass = remind(eleRadios.get(0), type, tag);
						}
					} else if (type == "checkbox" && isRequired && !$(el).is(":checked")) {//20140609 zhangxinxu
						// 复选框是，只有要required就验证，木有就不管
						allpass = remind(el, type, tag);
					} else if (tag == "select" && isRequired && !el.value) {
						// 下拉框只要关心值
						allpass = remind(el, type, tag);
					} else if ((isRequired && self.isEmpty(el)) || !(allpass = self.isRegex(el))) {
						// 各种类型文本框以及文本域
						// allpass为true表示是为空，为false表示验证不通过
						allpass? remind(el, type, "empty"): remind(el, type, tag);
						allpass = false;
					} else if (self.isOverflow(el)) {
						// 最大值最小值, 个数是否超出的验证
						allpass = false;
					}
				});
				
				return allpass;
			}
		};
	})();
	
	$.fn.extend({
		isVisible: function() {
			return $(this).attr("type") !== "hidden" && $(this).css("display") !== "none" && $(this).css("visibility") !== "hidden";
		},
		hasProp: function(prop) {
			if (typeof prop !== "string") return undefined;
			var hasProp = false;
			if (document.querySelector) {
				var attrProp = $(this).attr(prop);
				if (attrProp !== undefined && attrProp !== false) {
					hasProp = true;
				}
			} else {
				// IE6, IE7
				var outer = $(this).get(0).outerHTML, part = outer.slice(0, outer.search(/\/?['"]?>(?![^<]*<['"])/));
				hasProp = new RegExp("\\s" + prop + "\\b", "i").test(part);
			}
			return hasProp;
		},
		selectRange: function(start, end) {
			var that = $(this).get(0);
			if (that.createTextRange) {
				var range = that.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			} else {
				that.focus();
				that.setSelectionRange(start, end);
			}
			return this;
		},
		testRemind: function(content, options) {
			var defaults = {
				size: 6,	// 三角的尺寸
				align: "center",	//三角的位置，默认居中
				css: {
					maxWidth: 280,
					backgroundColor: "#FFFFE0",
					borderColor: "#F7CE39",
					color: "#333",
					fontSize: "12px",
					padding: "5px 10px",
					zIndex: 20200000
				}
			};
			
			options = options || {};
			options.css = $.extend({}, defaults.css, options.css || $.testRemind.css);
			
			var params = $.extend({}, defaults, options || {});
			
			// 如果元素不可见，不处理
			if (!content || !$(this).isVisible()) return;
			
			var objAlign = {
				"center": "50%",
				"left": "15%",
				"right": "85%"	
			}, align = objAlign[params.align] || "50%";
			
			params.css.position = "absolute";
			params.css.top = "-99px";
			params.css.border = "1px solid " + params.css.borderColor;
			
			if ($("#" + $.testRemind.id).size()) $.testRemind.hide();
			
			this.remind = $('<div id="'+ $.testRemind.id +'">'+ content +'</div>').css(params.css);
			$(document.body).append(this.remind);
			
			// IE6 max-width的处理
			var maxWidth;
			if (!window.XMLHttpRequest && (maxWidth = parseInt(params.css.maxWidth)) && this.remind.width() > maxWidth) {
				 this.remind.width(maxWidth);	
			}
			
			// 当前元素的位置，提示框的方向
			var offset = $(this).offset(), direction = "top";
			if (!offset) return $(this);
			var remindTop = offset.top - this.remind.outerHeight() - params.size;
			if (remindTop < $(document).scrollTop()) {
				direction = "bottom";
				remindTop = offset.top + $(this).outerHeight() + params.size;
			}	
			
			// 创建三角
			var fnCreateCorner = function(beforeOrAfter) {
				// CSS名称值与变量，主要用来mini后节约文件大小
				var transparent = "transparent", dashed = "dashed", solid = "solid";
				
				// CSS样式对象们
				var cssWithDirection = {}, cssWithoutDirection = {
					// 与方向无关的CSS
					//left: align,
					width: 0,
					height: 0,
					overflow: "hidden",
					//marginLeft: (-1 * params.size) + "px",
					borderWidth: params.size + "px",
					position: "absolute"
				}, cssFinalUsed = {};
				
				// before颜色为边框色
				// after为背景色
				// 方向由direction决定
				if (beforeOrAfter === "before") {
					cssWithDirection = {
						"top": {
							borderColor: [params.css.borderColor, transparent, transparent, transparent].join(" "),
							borderStyle: [solid, dashed, dashed, dashed].join(" "),
							top: 0
						},
						"bottom": {
							borderColor: [transparent, transparent, params.css.borderColor, ""].join(" "),
							borderStyle: [dashed, dashed, solid, dashed].join(" "),
							bottom: 0
						}	
					};	
				} else if (beforeOrAfter === "after") {
					cssWithDirection = {
						"top": {
							borderColor: params.css.backgroundColor + ["", transparent, transparent, transparent].join(" "),
							borderStyle: [solid, dashed, dashed, dashed].join(" "),
							top: -1
						},
						"bottom": {
							borderColor: [transparent, transparent, params.css.backgroundColor, ""].join(" "),
							borderStyle: [dashed, dashed, solid, dashed].join(" "),
							bottom: -1
						}	
					};	
				} else {
					cssWithDirection = null;
					cssWithoutDirection = null;
					cssFinalUsed = null;
					return null;	
				}
				
				cssFinalUsed = $.extend({}, cssWithDirection[direction], cssWithoutDirection);
				
				return $('<'+ beforeOrAfter +'></'+ beforeOrAfter +'>').css(cssFinalUsed);
			};
			
			// 限高
			var cssOuterLimit = {
				width: 2 * params.size,
				left: align,
				marginLeft: (-1 * params.size) + "px",
				height: params.size,
				textIndent: 0,
				overflow: "hidden",
				position: "absolute"
			};
			if (direction == "top") {
				cssOuterLimit["bottom"] = -1 * params.size;
			} else {
				cssOuterLimit["top"] = -1 * params.size;
			}
			
			this.remind.css({
				left: offset.left,
				top: remindTop, 
				// marginLeft: ($(this).outerWidth() - this.remind.outerWidth()) * 0.5 + /*因为三角位置造成的偏移*/ this.remind.outerWidth() * (50 - parseInt(align)) / 100		
				// 等于下面这个：
				marginLeft: $(this).outerWidth() * 0.5 - this.remind.outerWidth() * parseInt(align) / 100
			}).prepend($('<div></div>').css(cssOuterLimit).append(fnCreateCorner("before")).append(fnCreateCorner("after")));
			
			$.testRemind.display = true;
			
			// 绑定消除事件
			$.testRemind.target = $(this).addClass("error");
			$.testRemind.bind();
			
			return $(this);
		},
		html5Validate: function(callback, options) {
			var defaults = {
				// 取消浏览器默认的HTML验证
				novalidate: true,
				// 禁用submit按钮可用
				submitEnabled: true,
				// 额外的其他验证
				validate: function() { return true; }
			};
			var params = $.extend({}, defaults, options || {});
			
			if ($.html5Validate.isSupport) {
				if (params.novalidate) {
					$(this).attr("novalidate", "novalidate");
				} else {					
					params.hasTypeNormally = true;
				}
			}
			
			// disabled的submit按钮还原
			if (params.submitEnabled) {
				$(this).find(":disabled").each(function() {
					if (/^image|submit$/.test(this.type)) {
						$(this).removeAttr("disabled");	
					}
				});
			}
			
			$(this).bind("submit", function(event) {
				var elements = $(this).find(":input");
				//  例如type="email|"此时后面|需要去除
				elements.each(function() {
					var type = this.getAttribute("type") + "", typeReplaced = type.replace(/\W+$/, "");
					if (type != typeReplaced) {
						try { this.type = typeReplaced; } catch(e) {}
					}
				});	
				if ($.html5Validate.isAllpass(elements, params) && params.validate() && $.isFunction(callback)) {
					callback.call(this);	
				}
				event.preventDefault();
				return false;	
			});
			
			return $(this);
		}
	});
})(jQuery);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

$(function(){
	var widthW = window.screen.width;
    var heightW = window.screen.height;
    if(widthW == 768 && heightW == 1024){
    	$(".page-start").css('top','2.8rem');
    }
	$("#btnSubmit").click(function(){
		if ($.html5Validate.isAllpass($(".formgroup"))) {
    		if($("#nv-loca").find("option:selected").text() != ""){
 				$(".mb-bv").show();
	 		}else{
	 				$("#nv-loca").testRemind('请选择大区');
	 				alert("请填写");
	 		}
		}
	})
	$(".nv-input1").focus(function(){
		$(this).parent().find(".labeleft").css('color',"#FFFFFF").parent().siblings().find(".labeleft,.labetime").css('color',"#a6a4b3");
	})
	$(".nv-input2").focus(function(){
		$(this).parent().find(".labetime").css('color',"#FFFFFF").parent().siblings().find(".labeleft").css('color',"#a6a4b3");
	})
})

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "page/8a1af360logined.html";

/***/ })
/******/ ]);