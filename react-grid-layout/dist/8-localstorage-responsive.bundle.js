/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"8-localstorage-responsive": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./test/examples/8-localstorage-responsive.jsx","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./test/examples/8-localstorage-responsive.jsx":
/*!*****************************************************!*\
  !*** ./test/examples/8-localstorage-responsive.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global, module) {\n\nvar _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === \"function\" && Symbol.for && Symbol.for(\"react.element\") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactGridLayout = __webpack_require__(/*! react-grid-layout */ \"./index-dev.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);\nvar originalLayouts = getFromLS(\"layouts\") || {};\n\n/**\n * This layout demonstrates how to sync multiple responsive layouts to localstorage.\n */\n\nvar ResponsiveLocalStorageLayout = function (_React$PureComponent) {\n  _inherits(ResponsiveLocalStorageLayout, _React$PureComponent);\n\n  function ResponsiveLocalStorageLayout(props) {\n    _classCallCheck(this, ResponsiveLocalStorageLayout);\n\n    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));\n\n    _this.state = {\n      layouts: JSON.parse(JSON.stringify(originalLayouts))\n    };\n    return _this;\n  }\n\n  ResponsiveLocalStorageLayout.prototype.resetLayout = function resetLayout() {\n    this.setState({ layouts: {} });\n  };\n\n  ResponsiveLocalStorageLayout.prototype.onLayoutChange = function onLayoutChange(layout, layouts) {\n    saveToLS(\"layouts\", layouts);\n    this.setState({ layouts: layouts });\n  };\n\n  ResponsiveLocalStorageLayout.prototype.render = function render() {\n    var _this2 = this;\n\n    return _jsx(\"div\", {}, void 0, _jsx(\"button\", {\n      onClick: function onClick() {\n        return _this2.resetLayout();\n      }\n    }, void 0, \"Reset Layout\"), _jsx(ResponsiveReactGridLayout, {\n      className: \"layout\",\n      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },\n      rowHeight: 30,\n      layouts: this.state.layouts,\n      onLayoutChange: function onLayoutChange(layout, layouts) {\n        return _this2.onLayoutChange(layout, layouts);\n      }\n    }, void 0, _jsx(\"div\", {\n      \"data-grid\": { w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }\n    }, \"1\", _jsx(\"span\", {\n      className: \"text\"\n    }, void 0, \"1\")), _jsx(\"div\", {\n      \"data-grid\": { w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }\n    }, \"2\", _jsx(\"span\", {\n      className: \"text\"\n    }, void 0, \"2\")), _jsx(\"div\", {\n      \"data-grid\": { w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }\n    }, \"3\", _jsx(\"span\", {\n      className: \"text\"\n    }, void 0, \"3\")), _jsx(\"div\", {\n      \"data-grid\": { w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }\n    }, \"4\", _jsx(\"span\", {\n      className: \"text\"\n    }, void 0, \"4\")), _jsx(\"div\", {\n      \"data-grid\": { w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }\n    }, \"5\", _jsx(\"span\", {\n      className: \"text\"\n    }, void 0, \"5\"))));\n  };\n\n  _createClass(ResponsiveLocalStorageLayout, null, [{\n    key: \"defaultProps\",\n    get: function get() {\n      return {\n        className: \"layout\",\n        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },\n        rowHeight: 30\n      };\n    }\n  }]);\n\n  return ResponsiveLocalStorageLayout;\n}(_react2.default.PureComponent);\n\nmodule.exports = ResponsiveLocalStorageLayout;\n\nfunction getFromLS(key) {\n  var ls = {};\n  if (global.localStorage) {\n    try {\n      ls = JSON.parse(global.localStorage.getItem(\"rgl-8\")) || {};\n    } catch (e) {\n      /*Ignore*/\n    }\n  }\n  return ls[key];\n}\n\nfunction saveToLS(key, value) {\n  if (global.localStorage) {\n    var _JSON$stringify;\n\n    global.localStorage.setItem(\"rgl-8\", JSON.stringify((_JSON$stringify = {}, _JSON$stringify[key] = value, _JSON$stringify)));\n  }\n}\n\nif (__webpack_require__.c[__webpack_require__.s] === module) {\n  __webpack_require__(/*! ../test-hook.jsx */ \"./test/test-hook.jsx\")(module.exports);\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./test/examples/8-localstorage-responsive.jsx?");

/***/ })

/******/ });