(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("duna", [], factory);
	else if(typeof exports === 'object')
		exports["duna"] = factory();
	else
		root["duna"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/base.ts":
/*!*********************!*\
  !*** ./src/base.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = "1.0.0";


/***/ }),

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getSize(element) {
    let hidden = /none/i.test(element.style.display || '');
    if (hidden)
        element.style.display = null;
    let result = { width: element.offsetWidth, height: element.offsetHeight };
    if (hidden)
        element.style.display = "none";
    return result;
}
exports.getSize = getSize;
function isVisible(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
}
exports.isVisible = isVisible;
function addClass(element, className) {
    if (!className)
        return;
    let classes = element.className.split(' ')
        .concat(className.split(' '))
        .reduce((previous, current) => {
        if (previous.indexOf(current) === -1)
            previous.push(current);
        return previous;
    }, []);
    element.className = classes.filter(name => name).join(' ');
}
exports.addClass = addClass;
function removeClass(element, className) {
    if (!className)
        return;
    let names = className.split(' ');
    let classes = element.className.split(' ').filter(name => names.indexOf(name) === -1);
    if (!classes.length)
        element.removeAttribute("class");
    else
        element.className = classes.filter(name => name).join(' ');
}
exports.removeClass = removeClass;
function setStyle(element, styles) {
    for (let name in styles)
        element.style[name] = styles[name];
}
exports.setStyle = setStyle;
function getStyle(element, name) {
    return document.defaultView.getComputedStyle(element).getPropertyValue(name);
}
exports.getStyle = getStyle;
function removeChildren(element) {
    while (element.lastChild)
        element.removeChild(element.lastChild);
}
exports.removeChildren = removeChildren;


/***/ }),

/***/ "./src/http.ts":
/*!*********************!*\
  !*** ./src/http.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function getHeaders(options) {
    const defaultHeaders = {
        "Accept": "text/plain, text/javascript, application/json, application/xml, */*",
        "Content-Type": options.json
            ? "application/json; charset=UTF-8"
            : "application/x-www-form-urlencoded; charset=UTF-8"
    };
    let normalizedHeaders = {};
    let headers = options.headers || {};
    for (var p in headers)
        normalizedHeaders[utils.titleCase(p)] = headers[p];
    if (!options.crossDomain || !defaultHeaders["X-Requested-With"])
        defaultHeaders["X-Requested-With"] = "XMLHttpRequest";
    return Object.assign({}, defaultHeaders, normalizedHeaders);
}
function getResponseConverter(optionsResponseConverter) {
    if (optionsResponseConverter && utils.isFunction(optionsResponseConverter))
        return optionsResponseConverter;
    return (xhr, options) => {
        let responseHeader = xhr.getResponseHeader("Content-Type") || '';
        if (responseHeader.indexOf("application/json") > -1 || utils.isJsonLike(xhr.responseText))
            return JSON.parse(xhr.response);
        return responseHeader.toLowerCase() === "text/xml"
            ? xhr.responseXML
            : xhr.responseText;
    };
}
function startRequest(method, url, options) {
    return new Promise((done, error) => {
        let xhr = new XMLHttpRequest();
        if (options.withCredentials)
            xhr.withCredentials = options.withCredentials;
        xhr.open(method, url, true, options.user, options.password);
        let headers = options.headers || {};
        for (var p in headers)
            xhr.setRequestHeader(p, headers[p]);
        xhr.onload = () => {
            let response = {
                data: getResponseConverter(options.responseConverter)(xhr, options),
                contentType: xhr.getResponseHeader("Content-Type"),
                options,
                status: xhr.status,
                statusText: xhr.statusText
            };
            if (xhr.status >= 200 && xhr.status < 300)
                done(response);
            else
                error(response);
        };
        let data = options.data;
        if (utils.isObject(data))
            data = JSON.stringify(data);
        xhr.send(data);
    });
}
function init(method, url, options) {
    let headers = getHeaders(options);
    if (method.toLowerCase() === "get" && (headers["Content-Type"] || '').indexOf("application/json") === 0) {
        let index = url.indexOf("?");
        let query = utils.fromQuery(url.slice(index + 1));
        if (query) {
            let jsonValue = utils.toQuery(query, encodeURIComponent, JSON.stringify);
            url = `${url.slice(0, index)}${jsonValue}`;
        }
        options.headers = headers;
    }
    return startRequest(method, url, options);
}
exports.init = init;
function get(url, options) {
    return init("get", url, options || {});
}
exports.get = get;
function post(url, data, options) {
    return init("post", url, Object.assign({}, options, { data }));
}
exports.post = post;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const base_1 = __webpack_require__(/*! ./base */ "./src/base.ts");
const utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const dom = __webpack_require__(/*! ./dom */ "./src/dom.ts");
const http = __webpack_require__(/*! ./http */ "./src/http.ts");
const NumericBox_1 = __webpack_require__(/*! ./ui/NumericBox */ "./src/ui/NumericBox.ts");
const SearchBox_1 = __webpack_require__(/*! ./ui/SearchBox */ "./src/ui/SearchBox.ts");
const Limiter_1 = __webpack_require__(/*! ./ui/Limiter */ "./src/ui/Limiter.ts");
const MaskEdit_1 = __webpack_require__(/*! ./ui/MaskEdit */ "./src/ui/MaskEdit.ts");
let duna = {};
Object.defineProperty(duna, "ui", {
    get() {
        return {
            NumericBox: NumericBox_1.default,
            SearchBox: SearchBox_1.default,
            Limiter: Limiter_1.default,
            MaskEdit: MaskEdit_1.default
        };
    }
});
Object.defineProperty(duna, "http", { get() { return http; } });
Object.defineProperty(duna, "dom", { get() { return dom; } });
Object.defineProperty(duna, "utils", { get() { return utils; } });
Object.defineProperty(duna, "version", { get() { return base_1.version; } });
module.exports = duna;


/***/ }),

/***/ "./src/ui/ControlBase.ts":
/*!*******************************!*\
  !*** ./src/ui/ControlBase.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DUNA_PROPERTY = "$duna";
class ControlBase {
    constructor(element, options) {
        this.$element = element;
        this.$options = options;
        this.$guid = `dn${Math.random().toString(36).substr(2)}`;
        this._eventsCollection = [];
        this.$initialize();
        this.$invoke(this.$options.onReady, this);
        this.$registerControl();
    }
    dispose() {
        console.log(`duna: ${this.constructor.name} #${this.$guid} was disposed`);
        this._eventsCollection.forEach(e => e.element.removeEventListener(e.type, e.handler, false));
        this._eventsCollection = [];
        for (let prop in this)
            delete this[prop];
    }
    _ensureUniqueInstancePerType() {
        let index = this.$element[DUNA_PROPERTY].findIndex(p => p.constructor.name === this.constructor.name &&
            p.constructor.prototype === this.constructor.prototype);
        if (index === -1)
            return;
        let instance = this.$element[DUNA_PROPERTY][index];
        this.$element[DUNA_PROPERTY].splice(index, 1);
        instance.dispose();
    }
    $registerControl() {
        if (!Array.isArray(this.$element.hasOwnProperty(DUNA_PROPERTY)))
            this.$element[DUNA_PROPERTY] = [];
        this._ensureUniqueInstancePerType();
        this.$element[DUNA_PROPERTY].push(this);
    }
    $invoke(callback, ...args) {
        return typeof callback === "function" ? callback.apply(this, args) : undefined;
    }
    $addEvent(type, handler, element) {
        handler = handler.bind(this);
        element = element || this.$element;
        this._eventsCollection.push({ type, handler, element });
        element.addEventListener(type, handler, false);
    }
    $removeEvent(type, handler, element) {
        handler = handler.bind(this);
        element = element || this.$element;
        let events = this._eventsCollection.filter(p => p.element === element && p.type === type);
        events.forEach(e => {
            let index = this._eventsCollection.indexOf(e);
            this._eventsCollection.splice(index, 1);
            e.element.removeEventListener(type, handler, false);
        });
    }
}
exports.default = ControlBase;


/***/ }),

/***/ "./src/ui/Limiter.ts":
/*!***************************!*\
  !*** ./src/ui/Limiter.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const dom = __webpack_require__(/*! ../dom */ "./src/dom.ts");
const ControlBase_1 = __webpack_require__(/*! ./ControlBase */ "./src/ui/ControlBase.ts");
class Limiter extends ControlBase_1.default {
    constructor(element, options) {
        let defaultOptions = {
            position: "right bottom",
            template: "<small><em>${len} / ${max}</em></small>",
            timeout: 1.5,
            offsetX: 0,
            offsetY: 0,
            preserve: false,
            showOnFocus: false
        };
        super(element, utils.merge(defaultOptions, options));
    }
    $initialize() {
        this._setRoot();
        this._registerEvents();
        this._configPosition();
        this._timer = null;
    }
    dispose() {
        if (this._tooltip)
            this._destroy();
        window.removeEventListener("scroll", this._onWindowScrollOrResize, false);
        super.dispose();
    }
    _setRoot() {
        if (this.$options.root)
            this._root = document.querySelector(this.$options.root);
    }
    _destroy() {
        if (this._tooltip && this._tooltip.parentNode)
            this._tooltip.parentNode.removeChild(this._tooltip);
        this._tooltip = null;
    }
    _getTooltip(onFocus) {
        let visible = this._tooltip && dom.isVisible(this._tooltip);
        if (!this._tooltip) {
            this.$element.insertAdjacentHTML("afterend", this.$options.template);
            this._tooltip = this.$element.nextElementSibling;
            this._templateContent = this._tooltip.innerHTML;
            this._tooltip.style.position = "fixed";
            let rect = this.$element.getBoundingClientRect();
            this._tooltip.style.left = rect.left + 'px'; // set initial position
            this.$invoke(this.$options.onCreate, this, { tooltip: this._tooltip });
            this._tooltip.style.display = "none";
        }
        if (!visible) {
            if (onFocus && !this.$options.showOnFocus)
                return this._tooltip;
            this.$invoke(this.$options.onShow, this, { tooltip: this._tooltip });
            this._tooltip.style.display = "";
        }
        return this._tooltip;
    }
    _registerEvents() {
        this.$addEvent("focus", this._onFocusEvent);
        this.$addEvent("input", this._onInputEvent);
        this.$addEvent("blur", this._onBlurEvent);
        this.$addEvent("scroll", this._onWindowScrollOrResize, window);
        this.$addEvent("resize", this._onWindowScrollOrResize, window);
    }
    _onWindowScrollOrResize() {
        if (this._tooltip && dom.isVisible(this._tooltip))
            this._updatePosition();
    }
    _onFocusEvent(e) {
        if (!this.$options.showOnFocus)
            return;
        this._onInputEvent();
    }
    _onInputEvent() {
        let tooltip = this._getTooltip(true);
        let data = {
            len: this.$element.value.length,
            max: this.$element.maxLength,
            rem: 0
        };
        data.rem = data.max - data.len;
        tooltip.innerHTML = utils.template(this._templateContent, data);
        this._updatePosition();
        window.clearTimeout(this._timer || 0);
        this._timer = window.setTimeout(() => this._onBlurEvent(), this.$options.timeout * 1000);
    }
    _onBlurEvent() {
        if (!this._tooltip || this._tooltip.style.display === "none")
            return;
        if (!this.$options.preserve)
            this._destroy.call(this);
        else
            this._tooltip.style.display = "none";
        this.$invoke(this.$options.onHide, this, { tooltip: this._tooltip });
    }
    _updatePosition() {
        let tooltip = this._getTooltip();
        let rect = this.$element.getBoundingClientRect();
        let position = this.$options.position;
        let size = dom.getSize(tooltip);
        let x = this._position.x(rect, size);
        let y = this._position.y(rect, size);
        x += this.$options.offsetX;
        y += this.$options.offsetY;
        if (this._root) {
            let rootRect = this._root.getBoundingClientRect();
            y -= rootRect.top;
            x -= rootRect.left;
        }
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        this.$invoke(this.$options.onChange, this, { tooltip: this._tooltip });
    }
    _configPosition() {
        let pattern = {
            left: (rect, size) => rect.left,
            right: (rect, size) => rect.right - size.width,
            top: (rect, size) => rect.top - size.height,
            bottom: (rect, size) => rect.bottom
        };
        let position = this.$options.position;
        this._position = {};
        let matches = position.match(/(^| )(left|right)( |$)/);
        if (matches)
            this._position.x = pattern[matches[2]];
        matches = position.match(/(^| )(top|bottom)( |$)/);
        if (matches)
            this._position.y = pattern[matches[2]];
    }
    static from(selector, options) {
        return [...document.querySelectorAll(selector)].map(element => new Limiter(element, options));
    }
}
exports.default = Limiter;


/***/ }),

/***/ "./src/ui/MaskEdit.ts":
/*!****************************!*\
  !*** ./src/ui/MaskEdit.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const ControlBase_1 = __webpack_require__(/*! ./ControlBase */ "./src/ui/ControlBase.ts");
class MaskEdit extends ControlBase_1.default {
    constructor(element, options) {
        let defaultOptions = {
            format: "",
            placeholder: "",
            allowPartial: false,
            shifter: '_',
            translation: {
                '9': { test: /[0-9]/ },
                'a': { test: /[A-Za-z]/ },
                'A': { test: /[A-Za-z]/, transform: n => n.toUpperCase() }
            }
        };
        super(element, utils.merge(defaultOptions, options));
    }
    update() {
        let value = this.$element.value;
        let buffer = [];
        for (let i = 0, j = 0; i < this._currentFormat.length; i++) {
            let result = this._applyMask(i, j, value);
            if (result.arg !== undefined)
                buffer.push(result.value);
            if (result.ok)
                j++;
            else if (!result.keepRunning || value[j] === undefined)
                break;
        }
        this._setValue(buffer.join(''));
    }
    getRawValue() {
        let buffer = [];
        let value = this.$element.value;
        for (let i = 0; i < value.length; i++) {
            if (this._hasTranslation(i) && value[i] !== this.$options.shifter)
                buffer.push(value[i]);
        }
        return buffer.join('');
    }
    setOptions(options) {
        this._setOptionsInternal(options);
        this._onBlurEvent();
    }
    dispose() {
        if (this._originalMaxLength === -1)
            this.$element.removeAttribute("maxlength");
        else
            this.$element.maxLength = this._originalMaxLength;
        super.dispose();
    }
    $initialize() {
        this._setOptionsInternal(null);
        this._defineFormat(true);
        this._registerEvents();
        this.update();
    }
    _setOptionsInternal(options) {
        utils.merge(this.$options, options);
        this._configOptions();
        this._defineFormat(true);
        this._normalizeTranslations();
        this.$element.value = this.getRawValue();
        this.update();
    }
    _applyMask(i, j, value) {
        let v = value[j];
        let f = this._currentFormat[i];
        let t = this._translations[f];
        let result = {
            isMask: !t && f !== undefined,
            arg: v,
            ok: (!!t && t.test(v || '')) || f === v,
            keepRunning: !t && i < this._currentFormat.length,
            value: ''
        };
        if (result.ok)
            result.value = (t && t.transform ? t.transform : (arg) => arg)(v || '');
        else
            result.value = t ? '' : f;
        return result;
    }
    _replace(e) {
        e.preventDefault();
        let index = this.$element.selectionStart || 0;
        let buffer = this.$element.value.split('');
        buffer[index] = e.key;
        let value = buffer.join('');
        for (let i = index; i < this._currentFormat.length; i++) {
            let result = this._applyMask(i, index, value);
            if (result.ok) {
                buffer[i] = result.value;
                index = i;
                break;
            }
            else if (result.isMask) {
                buffer[i] = result.value;
            }
            else {
                buffer[i] = this.$element.value[i];
                break;
            }
            if (!result.keepRunning || buffer[i] === undefined)
                break;
        }
        this._setValue(buffer.join(''));
        this._setCaretPosition(index + 1);
    }
    _hasTranslation(index) {
        let f = this._currentFormat[index];
        return !!this._translations[f];
    }
    _defineFormat(initialization) {
        if (initialization)
            this._currentFormat = this._formats[0];
        if (!this._originalMaxLength)
            this._originalMaxLength = this.$element.maxLength;
        this.$element.maxLength = this._currentFormat.length;
    }
    _configOptions() {
        this._formats = utils.isString(this.$options.format)
            ? [this.$options.format]
            : [].concat(this.$options.format);
        this.$element.placeholder = this.$options.placeholder || this._formats[0];
    }
    _normalizeTranslations() {
        this._translations = {};
        let translation = this.$options.translation || {};
        for (let t in translation) {
            let testFn = translation[t].test;
            this._translations[t] = {
                test: testFn instanceof RegExp ? (value) => testFn.test(value) : testFn,
                transform: translation[t].transform
            };
        }
    }
    _registerEvents() {
        this.$addEvent("input", this._onInputEvent);
        this.$addEvent("keydown", this._onKeyDownEvent);
        this.$addEvent("blur", this._onBlurEvent);
    }
    _onBlurEvent() {
        let value = this.$element.value;
        let hasShifter = value.indexOf(this.$options.shifter) >= 0;
        if (hasShifter) {
            if (this.$options.allowPartial) {
                value = value.replace(new RegExp(`\\${this.$options.shifter}*$`, ''), '');
                if (value.indexOf(this.$options.shifter) === -1) {
                    this._setValue(value);
                    return;
                }
            }
            this._setValue('');
            return;
        }
        if (value.length === this._currentFormat.length)
            return;
        if (!this.$options.allowPartial)
            this._setValue('');
    }
    _onInputEvent() {
        this.update();
    }
    _onKeyDownEvent(e) {
        if (/^[cvx]$/i.test(e.key) && e.ctrlKey)
            return;
        let caret = this._getCaretPosition();
        if (e.key.length === 1) {
            if (this.$element.value[caret.start])
                this._replace(e);
            return;
        }
        if (e.key === "Backspace") {
            this._backspaceHandler.call(this, e, caret);
            return;
        }
        if (e.key === "Delete") {
            this._deleteHandler.call(this, e, caret);
            return;
        }
    }
    _getMaskWithShifter() {
        if (this._maskWithShifter)
            return this._maskWithShifter;
        let buffer = this._currentFormat.split('');
        for (let i = 0; i < buffer.length; i++) {
            if (this._hasTranslation(i))
                buffer[i] = this.$options.shifter;
        }
        return (this._maskWithShifter = buffer.join(''));
    }
    _default(caret) {
        if (!this.$element.value.length)
            return true;
        if (!caret.areEquals) {
            if (caret.start === 0 && caret.end === this.$element.value.length)
                return true;
        }
        return false;
    }
    _deleteHandler(e, caret) {
        if (this._default(caret))
            return;
        e.preventDefault();
        do {
            caret.end++;
        } while (!this._hasTranslation(caret.end - 1) && caret.end < this._currentFormat.length);
        let buffer = this.$element.value.split('');
        let value = this._getMaskWithShifter().substring(caret.start, caret.end);
        buffer.splice.apply(buffer, [caret.start, caret.end - caret.start].concat(value.split('')));
        this._setValue(buffer.join(''));
        this._setCaretPosition(caret.start, caret.end);
    }
    _backspaceHandler(e, caret) {
        if (this._default(caret))
            return;
        e.preventDefault();
        if (caret.areEquals) {
            do {
                caret.start = Math.max(caret.start - 1, 0);
            } while (!this._hasTranslation(caret.start) && caret.start > 0);
        }
        let buffer = this.$element.value.split('');
        if (caret.end === this.$element.value.length) {
            buffer.splice(caret.start);
        }
        else {
            let value = this._getMaskWithShifter().substring(caret.start, caret.end);
            buffer.splice.apply(buffer, [caret.start, caret.end - caret.start].concat(value.split('')));
        }
        this._setValue(buffer.join(''));
        this._setCaretPosition(caret.start);
    }
    _setCaretPosition(start, end = undefined) {
        this.$element.selectionStart = start;
        this.$element.selectionEnd = end || start;
    }
    _getCaretPosition() {
        let start = this.$element.selectionStart || 0;
        let end = this.$element.selectionEnd || 0;
        return {
            start,
            end,
            areEquals: start === end
        };
    }
    _setValue(value) {
        this.$element.value = value;
        this.$invoke(this.$options.onUpdate, this, { value, rawValue: this.getRawValue() });
    }
    static from(selector, options) {
        return [...document.querySelectorAll(selector)].map(element => new MaskEdit(element, options));
    }
}
exports.default = MaskEdit;


/***/ }),

/***/ "./src/ui/NumericBox.ts":
/*!******************************!*\
  !*** ./src/ui/NumericBox.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const ControlBase_1 = __webpack_require__(/*! ./ControlBase */ "./src/ui/ControlBase.ts");
class NumericBox extends ControlBase_1.default {
    constructor(element, options) {
        let defaultOptions = {
            scale: 0,
            decimalSeparator: '.',
            groupingSeparator: ',',
            format: ['-n', 'n', 'n'],
            placeholder: 'n',
            nullable: false
        };
        super(element, utils.merge(defaultOptions, options));
    }
    $initialize() {
        this._normalizeFormat();
        this._registerEvents();
        this.format();
    }
    format() {
        let text = this.getRawValue() || "";
        let o = this.$options;
        let ev = { value: 0, text: "" };
        if (!text && o.nullable) {
            this.$invoke(o.onFormat, this, ev);
            return;
        }
        text = text.replace(o.decimalSeparator || '', ".");
        let n = parseFloat(text);
        if (!utils.isNumber(n))
            n = 0;
        n = this._ensureRange(n, o.min, o.max);
        let scale = utils.isNumber(o.scale) ? o.scale : 0;
        let ns = n.toFixed(scale);
        text = ns.replace(".", o.decimalSeparator || '');
        if (scale > 0) {
            let expr = new RegExp(`(\\d)(\\d{3}([\\${o.groupingSeparator}\\${o.decimalSeparator}]))`);
            while (expr.test(text))
                text = text.replace(expr, `$1${o.groupingSeparator}$2`);
        }
        let formatted = "";
        let f = this._dataFormat;
        let placeholder = o.placeholder || '';
        if (n === 0)
            formatted = f[2].replace(placeholder, text);
        else {
            formatted = (n > 0)
                ? (f[1]).replace(placeholder, text)
                : f[0].replace(placeholder, text.replace('-', ''));
        }
        ev.value = parseFloat(ns);
        ev.text = formatted;
        this.$invoke(o.onFormat, this, ev);
        this.$element.value = formatted;
    }
    getRawValue() {
        let value = this.$element.value;
        if (!value)
            return "";
        let matches = value.match(/[-\d]+/g);
        if (!matches || !matches.length)
            return "";
        if (value[0] === ',' || value[0] === '.')
            matches.unshift('0');
        let len = matches.length;
        if (len === 1)
            return parseFloat(matches[0]).toString();
        let result = "";
        let separator = this.$options.scale > 0 ? "." : "";
        while (--len > -1) {
            result = separator + matches[len] + result;
            separator = "";
        }
        if (!result)
            return result;
        return parseFloat(result).toFixed(this.$options.scale);
    }
    _normalizeFormat() {
        let format = this.$options.format;
        if (utils.isString(format)) {
            format = ['-' + format, format, format];
        }
        else if (Array.isArray(format) && format.length === 2)
            format.push(format[1]);
        this._dataFormat = format;
    }
    _registerEvents() {
        this.$addEvent("focus", this._onFocusEvent);
        this.$addEvent("click", this._onFocusEvent);
        this.$addEvent("keydown", this._onKeyDownEvent);
        this.$addEvent("change", this._onChangeEvent);
        this.$addEvent("blur", this.format);
    }
    _onKeyDownEvent(e) {
        let el = this.$element;
        if (e.key === "Enter") {
            el.blur();
            return;
        }
        if (e.key.length > 1)
            return;
        if ((/[0-9]/.test(e.key) && !e.shiftKey))
            return;
        let negSign = (e.key === "-");
        if (negSign && (!el.value || (el.selectionStart === 0 || document.getSelection().toString() === el.value)))
            return;
        let scale = this.$options.scale;
        if (/[.,]/.test(e.key) && utils.isNumber(scale) && scale > 0 && (!/[.,]/g.test(el.value) || document.getSelection().toString() === el.value))
            return;
        e.preventDefault();
    }
    _onFocusEvent(e) {
        let el = this.$element;
        if (!this.$options.nullable && !el.value)
            this.format();
        if (!el.hasAttribute("readonly"))
            el.value = this.getRawValue();
        el.select();
        e.preventDefault();
    }
    _onChangeEvent(e) {
        let o = this.$options;
        let inputValue = parseFloat(this.getRawValue());
        let value = this._ensureRange(inputValue, o.min, o.max);
        this.$invoke(this.$options.onChange, this, { value, inputValue });
    }
    _ensureRange(n, min, max) {
        let hasMin = utils.isNumber(min);
        let hasMax = utils.isNumber(max);
        if (hasMin && hasMax && min >= max)
            throw new RangeError("min must have a lesser value than max");
        if (hasMin && n < min)
            return min;
        if (hasMax && n > max)
            return max;
        return n;
    }
    static from(selector, options) {
        return [...document.querySelectorAll(selector)].map(element => new NumericBox(element, options));
    }
}
exports.default = NumericBox;


/***/ }),

/***/ "./src/ui/SearchBox.ts":
/*!*****************************!*\
  !*** ./src/ui/SearchBox.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const dom = __webpack_require__(/*! ../dom */ "./src/dom.ts");
const http = __webpack_require__(/*! ../http */ "./src/http.ts");
const ControlBase_1 = __webpack_require__(/*! ./ControlBase */ "./src/ui/ControlBase.ts");
const SEARCH_BOX_DATA_VALUE = "dunaSearchBoxDataValue";
class SearchBox extends ControlBase_1.default {
    constructor(element, options) {
        if (!options)
            throw new Error("SearchBox.options is required.");
        if (!options.template)
            throw new Error("SearchBox.options.template is required.");
        if (!options.source)
            throw new Error("SearchBox.source is required.");
        const defaultOptions = {
            template: '',
            activeItemClass: "active",
            delay: 500,
            source: [],
            matchesTemplate: "<mark>${0}</mark>",
            fieldTemplate: "${0}",
            maxResults: 10,
            minLength: 2,
            offsetX: 0,
            offsetY: 2,
            dataRoot: "data",
            noRecordsTemplate: "<div>No records found</div>",
            searchFields: []
        };
        super(element, utils.merge(defaultOptions, options));
    }
    $initialize() {
        this._setRoot();
        this._createTemplate();
        this._defineSourceHandler();
        this._registerEvents();
    }
    _setRoot() {
        if (this.$options.root)
            this._root = document.querySelector(this.$options.root);
    }
    _createTemplate() {
        let template = this.$options.template;
        this.$element.insertAdjacentHTML("afterend", template);
        let container = this.$element.nextElementSibling;
        let zIndex = parseInt(dom.getStyle(container, "z-index"), 10);
        if (isNaN(zIndex))
            zIndex = 9999;
        dom.setStyle(container, {
            display: "none",
            position: "fixed",
            margin: 0,
            overflowY: "auto",
            height: "auto",
            zIndex
        });
        let item = container.querySelector("[dn-item]");
        if (!item)
            throw new Error("The container template must also have a child element with 'dn-item' attribute on it");
        this._container = container;
        this._containerBody = item.parentElement;
        this._itemTemplate = item.outerHTML;
    }
    _renderNoRecords() {
        this._noRecords = true;
        this._resetContainerBody();
        if (this.$options.noRecordsTemplate) {
            this._containerBody.insertAdjacentHTML("beforeend", this.$options.noRecordsTemplate);
            this._container.style.display = "";
            this._updateContainerStyle();
        }
        else
            this._containerBody.style.display = "none";
    }
    _staticSourceHandler(dataSource) {
        let value = this.$element.value;
        if (!value.length)
            return;
        if (dataSource.length) {
            this._defineDataFilter(dataSource);
            let items = this._dataFilter({
                dataSource,
                fields: this._searchFields,
                search: value.replace(/\\/g, '\\\\')
            });
            if (!items.length) {
                this._renderNoRecords();
                return;
            }
            this._noRecords = false;
            this._render(items, value);
            return;
        }
        this._renderNoRecords();
    }
    _readData(data) {
        let root = this.$options.dataRoot;
        if (!root)
            return data;
        root.split('.').forEach(property => {
            if (data.hasOwnProperty(property))
                data = data[property];
            return data;
        });
        return data;
    }
    _httpSourceHandler(url) {
        let value = this.$element.value.trim();
        if (!value.length)
            return;
        url = url.replace("${query}", encodeURIComponent(value));
        this._promiseSourceHandler(() => {
            return http.get(url);
        });
    }
    _promiseSourceHandler(promise) {
        window.clearTimeout(this._timer);
        this._timer = window.setTimeout(() => {
            this.$invoke(this.$options.onBeforeRequest, this);
            promise(encodeURIComponent(this.$element.value)).then(response => {
                let data = this._readData(response);
                if (!data || !Array.isArray(data))
                    throw new Error("The data source is invalid. Check if the options.dataRoot is correct.");
                this.$invoke(this.$options.onAfterRequest, this, { container: this._container, data });
                this._staticSourceHandler(data);
            }, error => console.error(error));
        }, this.$options.delay);
    }
    _normalizeValue(value) {
        if (!utils.isDefined(value))
            return '';
        if (!utils.isString(value))
            value = value.toString().trim();
        return value;
    }
    _resetContainerBody() {
        Array.from(this._containerBody.children).forEach(child => {
            this.$removeEvent("mouseenter", this._onItemMouseEnterEvent, child);
            this.$removeEvent("click", this._onItemClick, child);
        });
        dom.removeChildren(this._containerBody);
    }
    _render(dataSource, value) {
        this._resetContainerBody();
        let options = this.$options;
        let len = Math.min(dataSource.length, options.maxResults);
        let rawValue = utils.noDiacritics(value);
        let expr = new RegExp(rawValue, 'gi');
        for (let i = 0; i < len; i++) {
            let item = Object.assign({}, dataSource[i]);
            let content = this._itemTemplate;
            this._searchFields.forEach(field => {
                let fieldValue = this._normalizeValue(item[field]);
                if (!fieldValue)
                    return;
                let result = fieldValue.split('');
                utils.noDiacritics(fieldValue).replace(expr, (match, index) => {
                    let matchesTemplate = options.matchesTemplate.replace("${0}", fieldValue.substr(index, match.length));
                    let strIndex = index + match.length - 1;
                    while (strIndex > index)
                        result.splice(strIndex--, 1);
                    result.splice(index, 1, matchesTemplate);
                    return '';
                });
                content = content.replace(new RegExp(`\\\${${field}\\}`, 'g'), result.join(''));
            });
            content = utils.template(content, item);
            this._containerBody.insertAdjacentHTML("beforeend", content);
            this._containerBody.lastElementChild[SEARCH_BOX_DATA_VALUE] = dataSource[i];
        }
        [...this._containerBody.querySelectorAll("img[dn-src]")].forEach(img => {
            let value = img.getAttribute("dn-src");
            if (value && value.length > 0)
                img.src = value;
        });
        this._container.style.display = len ? "block" : "none";
        this._updateContainerStyle();
        this._registerContainerEvents();
        this.$invoke(this.$options.onResultsRender, this, { container: this._container });
    }
    _defineDataFilter(dataSource) {
        if (this._dataFilter)
            return;
        if (utils.isString(dataSource[0])) {
            this._dataFilter = this._stringDataFilter;
            this._searchFields = ["0"];
        }
        else {
            this._dataFilter = this._objectDataFilter;
            let fields = this.$options.searchFields;
            if (!Array.isArray(fields) || !fields.length)
                fields = Object.keys(dataSource[0]);
            this._searchFields = fields;
        }
    }
    _stringDataFilter(filter) {
        return this._objectDataFilter(Object.assign(filter, {
            dataSource: filter.dataSource.map(p => { return { 0: p }; })
        }));
    }
    _objectDataFilter(filter) {
        let value = utils.noDiacritics(filter.search);
        let expr = new RegExp(value, 'i');
        let fields = filter.fields;
        let len = fields.length;
        return filter.dataSource.reduce((previous, current) => {
            for (let i = 0; i < len; i++) {
                let raw = utils.noDiacritics(current[fields[i]]);
                if (expr.test(raw)) {
                    previous.push(current);
                    break;
                }
            }
            return previous;
        }, []);
    }
    _defineSourceHandler() {
        if (Array.isArray(this.$options.source)) {
            this._sourceHandler = this._staticSourceHandler;
        }
        else if (utils.isString(this.$options.source)) {
            this._sourceHandler = this._httpSourceHandler;
        }
        else {
            this._sourceHandler = this._promiseSourceHandler;
        }
    }
    _selectItem(item) {
        this._resetContainerBody();
        let data = item[SEARCH_BOX_DATA_VALUE];
        let field = utils.template(this.$options.fieldTemplate, data);
        this.$element.value = field;
        this.$invoke(this.$options.onItemSelected, this, {
            data,
            text: item.innerText.trim()
        });
        this.$element.dispatchEvent(new Event("input", { bubbles: true }));
        this._container.style.display = "none";
    }
    _registerEvents() {
        this.$addEvent("keydown", this._onKeyDownEvent);
        this.$addEvent("input", this._onInputEvent);
        this.$addEvent("blur", this._onBlurEvent);
        this.$addEvent("scroll", this._onWindowScrollOrResize, window);
        this.$addEvent("resize", this._onWindowScrollOrResize, window);
    }
    _keyboardNavigate(e) {
        let isGoingDown = e.key === "ArrowDown";
        if (!isGoingDown && e.key !== "ArrowUp")
            return;
        let active = this.$options.activeItemClass;
        let item = this._containerBody.querySelector('.' + active);
        let action = isGoingDown ? ["firstElementChild", "nextElementSibling"] : ["lastElementChild", "previousElementSibling"];
        if (item) {
            dom.removeClass(item, active);
            item = item[action[1]];
        }
        if (!item)
            item = this._containerBody[action[0]];
        dom.addClass(item, active);
        let data = item[SEARCH_BOX_DATA_VALUE];
        this.$invoke(this.$options.onActiveItem, this, {
            data,
            text: item.innerText.trim()
        });
        this._updateContainerScrollPosition(item, isGoingDown);
    }
    _updateContainerScrollPosition(item, isGoingDown) {
        let body = this._containerBody;
        let value = (item === body.firstElementChild)
            ? 0
            : (item === body.lastElementChild)
                ? body.scrollHeight
                : -1;
        if (value > -1) {
            body.scrollTop = value;
            return;
        }
        let max = body.offsetHeight;
        let top = item.offsetTop + (isGoingDown ? item.offsetHeight : 0);
        if (top > (max + body.scrollTop)) {
            body.scrollTop = (top + (isGoingDown ? item.offsetHeight * 0.2 : item.offsetHeight)) - max;
            return;
        }
        let diff = top - body.scrollTop;
        if (diff < 0)
            body.scrollTop = top - (isGoingDown ? item.offsetHeight : item.offsetHeight * 0.2);
    }
    _onWindowScrollOrResize() {
        if (dom.isVisible(this._container))
            this._updateContainerStyle();
    }
    _onKeyDownEvent(e) {
        if (!dom.isVisible(this._container) || this._noRecords)
            return;
        if (e.key === "Enter" || e.key === "Tab") {
            let active = this.$options.activeItemClass;
            let item = this._containerBody.querySelector('.' + active);
            if (!item) {
                if (this._containerBody.children.length === 1)
                    item = this._containerBody.firstElementChild;
                else
                    return;
            }
            if (item)
                this._selectItem(item);
            if (e.key === "Enter")
                e.preventDefault();
            return;
        }
        this._keyboardNavigate(e);
    }
    _onInputEvent(e) {
        let value = this.$element.value;
        if (!e.isTrusted)
            return;
        if (value.length && value.length < this.$options.minLength)
            return;
        this._sourceHandler(this.$options.source);
        if (!value.length)
            this._container.style.display = "none";
    }
    _onBlurEvent() {
        if (!this._container.matches(":hover"))
            this._container.style.display = "none";
    }
    _updateContainerStyle() {
        let rect = this.$element.getBoundingClientRect();
        this._container.style.minWidth = rect.width + 'px';
        this._container.style.height = "auto";
        let offsetY = this.$options.offsetY;
        let offsetX = this.$options.offsetX;
        let containerHeight = this._container.offsetHeight + offsetY;
        let bottomSize = window.innerHeight - rect.bottom;
        let maxSize = Math.max(rect.top, bottomSize);
        let newContainerHeight = Math.min(containerHeight, maxSize);
        if (newContainerHeight < containerHeight)
            this._container.style.height = newContainerHeight + 'px';
        let x = rect.left + offsetX;
        let y = bottomSize >= rect.top
            ? rect.bottom + offsetY
            : rect.top - this._container.offsetHeight - offsetY;
        if (this._root) {
            let rootRect = this._root.getBoundingClientRect();
            x -= rootRect.left;
            y -= rootRect.top;
        }
        this._container.style.top = y + 'px';
        this._container.style.left = x + 'px';
    }
    _registerContainerEvents() {
        Array.from(this._containerBody.children).forEach(child => {
            this.$addEvent("mouseenter", this._onItemMouseEnterEvent, child);
            this.$addEvent("click", this._onItemClick, child);
        });
    }
    _onItemMouseEnterEvent(e) {
        let className = this.$options.activeItemClass;
        let currentItem = e.target.parentElement.querySelector('.' + className);
        if (currentItem)
            dom.removeClass(currentItem, className);
        dom.addClass(e.target, className);
    }
    _onItemClick(e) {
        this._selectItem(e.currentTarget);
    }
    static from(selector, options) {
        return [...document.querySelectorAll(selector)].map(element => new SearchBox(element, options));
    }
}
exports.default = SearchBox;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function merge(target, ...sources) {
    sources.forEach(source => {
        for (let p in source || {}) {
            if (source.hasOwnProperty(p) && isDefined(source[p])) {
                if (source[p].constructor === Object) {
                    target[p] = target[p] || {};
                    merge(target[p], source[p]);
                }
                else {
                    target[p] = source[p];
                }
            }
        }
    });
    return target;
}
exports.merge = merge;
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function isJsonLike(value) {
    let start = /^\[|^\{(?!\{)/;
    let ends = { '[': /]$/, '{': /}$/ };
    let m = value.match(start);
    return !!m && ends[m[0]].test(value);
}
exports.isJsonLike = isJsonLike;
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
;
function isString(value) {
    return typeof value === "string";
}
exports.isString = isString;
/**
 * Determines whether a reference is an object.
 * Unlike the `typeof` in javascript, `null` values are not considered objects.
 * @param value
 */
function isObject(value) {
    return value !== null && typeof value === "object";
}
exports.isObject = isObject;
/**
 * Determines whether a reference is a valid number.
 *
 * Unlike the `typeof` in JavaScript, the special numeric values `NaN`, `Inifity` and `-Infinity` are not considered as valid numbers.
 * @param value Reference to check.
 */
function isNumber(value) {
    return typeof value === "number" && !isNaN(value) && isFinite(value);
}
exports.isNumber = isNumber;
function template(format, data, prefix = '${', suffix = '}') {
    let regex = new RegExp(`\\${prefix}([^(\\${suffix})]+)\\${suffix}`, 'g');
    let result = format.toString().replace(regex, (expr, key) => {
        return isDefined(data[key]) ? data[key] : '';
    });
    return result;
}
exports.template = template;
function toQuery(obj, keyEncoding = (v) => encodeURIComponent(v), valueEncoding = (v) => encodeURIComponent(v)) {
    let query = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (Array.isArray(obj[p])) {
                obj[p].forEach(item => {
                    query.push(`${keyEncoding(p)}=${valueEncoding(item)}`);
                });
            }
            else {
                query.push(`${keyEncoding(p)}=${valueEncoding(obj[p])}`);
            }
        }
    }
    return query.join("&");
}
exports.toQuery = toQuery;
function fromQuery(query, keyEncoding = (v) => decodeURIComponent(v).toLowerCase(), valueEncoding = (v) => decodeURIComponent(v)) {
    if (!query)
        return null;
    return query.split('&').reduce((previous, current) => {
        let item = current.split('=');
        let key = keyEncoding(item[0]);
        let value = valueEncoding(item[1]);
        if (previous[key]) {
            if (!Array.isArray(previous[key]))
                previous[key] = [previous[key]];
            previous[key].push(value);
        }
        else {
            previous[key] = value;
        }
        return previous;
    }, {});
}
exports.fromQuery = fromQuery;
function titleCase(value) {
    return value.replace(/(\w+)/g, v => v[0].toUpperCase() + v.slice(1).toLowerCase());
}
exports.titleCase = titleCase;
function noDiacritics(value) {
    if (!isString(value))
        return value;
    let patterns = {
        'A': /[\300-\306]/g,
        'a': /[\340-\346]/g,
        'E': /[\310-\313]/g,
        'e': /[\350-\353]/g,
        'I': /[\314-\317]/g,
        'i': /[\354-\357]/g,
        'O': /[\322-\330]/g,
        'o': /[\362-\370]/g,
        'U': /[\331-\334]/g,
        'u': /[\371-\374]/g,
        'N': /[\321]/g,
        'n': /[\361]/g,
        'C': /[\307]/g,
        'c': /[\347]/g
    };
    for (let key in patterns)
        value = value.replace(patterns[key], key);
    return value;
}
exports.noDiacritics = noDiacritics;


/***/ })

/******/ });
});
//# sourceMappingURL=duna.js.map