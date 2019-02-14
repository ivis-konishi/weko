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
/******/ 		"14-toolbox": 0
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
/******/ 	deferredModules.push(["./test/examples/14-toolbox.jsx","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./test/examples/14-toolbox.jsx":
/*!**************************************!*\
  !*** ./test/examples/14-toolbox.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === \"function\" && Symbol.for && Symbol.for(\"react.element\") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _lodash = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n\nvar _lodash2 = _interopRequireDefault(_lodash);\n\nvar _reactGridLayout = __webpack_require__(/*! react-grid-layout */ \"./index-dev.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);\n\nvar ToolBoxItem = function (_React$Component) {\n  _inherits(ToolBoxItem, _React$Component);\n\n  function ToolBoxItem() {\n    _classCallCheck(this, ToolBoxItem);\n\n    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));\n  }\n\n  ToolBoxItem.prototype.render = function render() {\n    return _jsx(\"div\", {\n      className: \"toolbox__items__item\",\n      onClick: this.props.onTakeItem.bind(undefined, this.props.item)\n    }, void 0, this.props.item.i);\n  };\n\n  return ToolBoxItem;\n}(_react2.default.Component);\n\nvar ToolBox = function (_React$Component2) {\n  _inherits(ToolBox, _React$Component2);\n\n  function ToolBox() {\n    _classCallCheck(this, ToolBox);\n\n    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));\n  }\n\n  ToolBox.prototype.render = function render() {\n    var _this3 = this;\n\n    return _jsx(\"div\", {\n      className: \"toolbox\"\n    }, void 0, _jsx(\"span\", {\n      className: \"toolbox__title\"\n    }, void 0, \"Toolbox\"), _jsx(\"div\", {\n      className: \"toolbox__items\"\n    }, void 0, this.props.items.map(function (item) {\n      return _jsx(ToolBoxItem, {\n        item: item,\n        onTakeItem: _this3.props.onTakeItem\n      }, item.i);\n    })));\n  };\n\n  return ToolBox;\n}(_react2.default.Component);\n\nvar ShowcaseLayout = function (_React$Component3) {\n  _inherits(ShowcaseLayout, _React$Component3);\n\n  function ShowcaseLayout() {\n    var _temp, _this4, _ret;\n\n    _classCallCheck(this, ShowcaseLayout);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this4 = _possibleConstructorReturn(this, _React$Component3.call.apply(_React$Component3, [this].concat(args))), _this4), _this4.state = {\n      currentBreakpoint: \"lg\",\n      compactType: \"vertical\",\n      mounted: false,\n      layouts: { lg: _this4.props.initialLayout },\n      toolbox: { lg: [] }\n    }, _this4.onBreakpointChange = function (breakpoint) {\n      _this4.setState(function (prevState) {\n        var _extends2;\n\n        return {\n          currentBreakpoint: breakpoint,\n          toolbox: _extends({}, prevState.toolbox, (_extends2 = {}, _extends2[breakpoint] = prevState.toolbox[breakpoint] || prevState.toolbox[prevState.currentBreakpoint] || [], _extends2))\n        };\n      });\n    }, _this4.onCompactTypeChange = function () {\n      var oldCompactType = _this4.state.compactType;\n\n      var compactType = oldCompactType === \"horizontal\" ? \"vertical\" : oldCompactType === \"vertical\" ? null : \"horizontal\";\n      _this4.setState({ compactType: compactType });\n    }, _this4.onTakeItem = function (item) {\n      _this4.setState(function (prevState) {\n        var _extends3, _extends4;\n\n        return {\n          toolbox: _extends({}, prevState.toolbox, (_extends3 = {}, _extends3[prevState.currentBreakpoint] = prevState.toolbox[prevState.currentBreakpoint].filter(function (_ref) {\n            var i = _ref.i;\n            return i !== item.i;\n          }), _extends3)),\n          layouts: _extends({}, prevState.layouts, (_extends4 = {}, _extends4[prevState.currentBreakpoint] = [].concat(prevState.layouts[prevState.currentBreakpoint], [item]), _extends4))\n        };\n      });\n    }, _this4.onPutItem = function (item) {\n      _this4.setState(function (prevState) {\n        var _extends5, _extends6;\n\n        return {\n          toolbox: _extends({}, prevState.toolbox, (_extends5 = {}, _extends5[prevState.currentBreakpoint] = [].concat(prevState.toolbox[prevState.currentBreakpoint] || [], [item]), _extends5)),\n          layouts: _extends({}, prevState.layouts, (_extends6 = {}, _extends6[prevState.currentBreakpoint] = prevState.layouts[prevState.currentBreakpoint].filter(function (_ref2) {\n            var i = _ref2.i;\n            return i !== item.i;\n          }), _extends6))\n        };\n      });\n    }, _this4.onLayoutChange = function (layout, layouts) {\n      _this4.props.onLayoutChange(layout, layouts);\n      _this4.setState({ layouts: layouts });\n    }, _this4.onNewLayout = function () {\n      _this4.setState({\n        layouts: { lg: generateLayout() }\n      });\n    }, _temp), _possibleConstructorReturn(_this4, _ret);\n  }\n\n  ShowcaseLayout.prototype.componentDidMount = function componentDidMount() {\n    this.setState({ mounted: true });\n  };\n\n  ShowcaseLayout.prototype.generateDOM = function generateDOM() {\n    var _this5 = this;\n\n    return _lodash2.default.map(this.state.layouts[this.state.currentBreakpoint], function (l) {\n      return _jsx(\"div\", {\n        className: l.static ? \"static\" : \"\"\n      }, l.i, _jsx(\"div\", {\n        className: \"hide-button\",\n        onClick: _this5.onPutItem.bind(_this5, l)\n      }, void 0, \"\\xD7\"), l.static ? _jsx(\"span\", {\n        className: \"text\",\n        title: \"This item is static and cannot be removed or resized.\"\n      }, void 0, \"Static - \", l.i) : _jsx(\"span\", {\n        className: \"text\"\n      }, void 0, l.i));\n    });\n  };\n\n  ShowcaseLayout.prototype.render = function render() {\n    return _jsx(\"div\", {}, void 0, _jsx(\"div\", {}, void 0, \"Current Breakpoint: \", this.state.currentBreakpoint, \" (\", this.props.cols[this.state.currentBreakpoint], \" \", \"columns)\"), _jsx(\"div\", {}, void 0, \"Compaction type:\", \" \", _lodash2.default.capitalize(this.state.compactType) || \"No Compaction\"), _jsx(\"button\", {\n      onClick: this.onNewLayout\n    }, void 0, \"Generate New Layout\"), _jsx(\"button\", {\n      onClick: this.onCompactTypeChange\n    }, void 0, \"Change Compaction Type\"), _jsx(ToolBox, {\n      items: this.state.toolbox[this.state.currentBreakpoint] || [],\n      onTakeItem: this.onTakeItem\n    }), _react2.default.createElement(\n      ResponsiveReactGridLayout,\n      _extends({}, this.props, {\n        layouts: this.state.layouts,\n        onBreakpointChange: this.onBreakpointChange,\n        onLayoutChange: this.onLayoutChange\n        // WidthProvider option\n        , measureBeforeMount: false\n        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)\n        // and set `measureBeforeMount={true}`.\n        , useCSSTransforms: this.state.mounted,\n        compactType: this.state.compactType,\n        preventCollision: !this.state.compactType\n      }),\n      this.generateDOM()\n    ));\n  };\n\n  return ShowcaseLayout;\n}(_react2.default.Component);\n\nShowcaseLayout.defaultProps = {\n  className: \"layout\",\n  rowHeight: 30,\n  onLayoutChange: function onLayoutChange() {},\n  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },\n  initialLayout: generateLayout()\n};\n\n\nmodule.exports = ShowcaseLayout;\n\nfunction generateLayout() {\n  return _lodash2.default.map(_lodash2.default.range(0, 25), function (item, i) {\n    var y = Math.ceil(Math.random() * 4) + 1;\n    return {\n      x: _lodash2.default.random(0, 5) * 2 % 12,\n      y: Math.floor(i / 6) * y,\n      w: 2,\n      h: y,\n      i: i.toString(),\n      static: Math.random() < 0.05\n    };\n  });\n}\n\nif (__webpack_require__.c[__webpack_require__.s] === module) {\n  __webpack_require__(/*! ../test-hook.jsx */ \"./test/test-hook.jsx\")(module.exports);\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./test/examples/14-toolbox.jsx?");

/***/ })

/******/ });