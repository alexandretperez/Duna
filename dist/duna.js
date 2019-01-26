var duna=function(){"use strict";function t(n){for(var i=[],o=1;o<arguments.length;o++)i[o-1]=arguments[o];return i.forEach(function(i){for(var o in i||{})i.hasOwnProperty(o)&&e(i[o])&&(i[o].constructor===Object?(n[o]=n[o]||{},t(n[o],i[o])):n[o]=Array.isArray(i[o])?i[o].slice(0):i[o])}),n}function e(t){return null!=t}function n(t){var e=t.match(/^\[|^\{(?!\{)/);return!!e&&{"[":/]$/,"{":/}$/}[e[0]].test(t)}function i(t){return"function"==typeof t}function o(t){return"string"==typeof t}function r(t){return null!==t&&"object"==typeof t}function s(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function a(t,n,i,o){void 0===i&&(i="${"),void 0===o&&(o="}");var r=new RegExp("\\"+i+"([^(\\"+o+")]+)\\"+o,"g");return t.toString().replace(r,function(t,i){return e(n[i])?n[i]:""})}function l(t,e,n){void 0===e&&(e=function(t){return encodeURIComponent(t)}),void 0===n&&(n=function(t){return encodeURIComponent(t)});var i=[],o=function(o){t.hasOwnProperty(o)&&(Array.isArray(t[o])?t[o].forEach(function(t){i.push(e(o)+"="+n(t))}):i.push(e(o)+"="+n(t[o])))};for(var r in t)o(r);return i.join("&")}function h(t,e,n){return void 0===e&&(e=function(t){return decodeURIComponent(t).toLowerCase()}),void 0===n&&(n=function(t){return decodeURIComponent(t)}),t?t.split("&").reduce(function(t,i){var o=i.split("="),r=e(o[0]),s=n(o[1]);return t[r]?(Array.isArray(t[r])||(t[r]=[t[r]]),t[r].push(s)):t[r]=s,t},{}):null}function u(t){return t.replace(/(\w+)/g,function(t){return t[0].toUpperCase()+t.slice(1).toLowerCase()})}function p(t){if(!o(t))return t;var e={A:/[\300-\306]/g,a:/[\340-\346]/g,E:/[\310-\313]/g,e:/[\350-\353]/g,I:/[\314-\317]/g,i:/[\354-\357]/g,O:/[\322-\330]/g,o:/[\362-\370]/g,U:/[\331-\334]/g,u:/[\371-\374]/g,N:/[\321]/g,n:/[\361]/g,C:/[\307]/g,c:/[\347]/g};for(var n in e)t=t.replace(e[n],n);return t}var c=Object.freeze({merge:t,isDefined:e,isJsonLike:n,isFunction:i,isString:o,isObject:r,isNumber:s,template:a,toQuery:l,fromQuery:h,titleCase:u,noDiacritics:p});function f(t){var e=/none/i.test(t.style.display||"");e&&(t.style.display=null);var n={width:t.offsetWidth,height:t.offsetHeight};return e&&(t.style.display="none"),n}function d(t){return t.offsetWidth>0&&t.offsetHeight>0}function v(t,e){if(e){var n=t.className.split(" ").concat(e.split(" ")).reduce(function(t,e){return-1===t.indexOf(e)&&t.push(e),t},[]);t.className=n.filter(function(t){return t}).join(" ")}}function _(t,e){if(e){var n=e.split(" "),i=t.className.split(" ").filter(function(t){return-1===n.indexOf(t)});i.length?t.className=i.filter(function(t){return t}).join(" "):t.removeAttribute("class")}}function m(t,e){for(var n in e)t.style[n]=e[n]}function y(t,e){var n=document.defaultView;return n?n.getComputedStyle(t).getPropertyValue(e):""}function g(t){for(;t.lastChild;)t.removeChild(t.lastChild)}var $=Object.freeze({getSize:f,isVisible:d,addClass:v,removeClass:_,setStyle:m,getStyle:y,removeChildren:g});function E(t,e,o){var s=function(t){var e={Accept:"text/plain, text/javascript, application/json, application/xml, */*","Content-Type":t.json?"application/json; charset=UTF-8":"application/x-www-form-urlencoded; charset=UTF-8"},n={},i=t.headers||{};for(var o in i)n[u(o)]=i[o];return t.crossDomain&&e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),Object.assign({},e,n)}(o);if("get"===t.toLowerCase()&&0===(s["Content-Type"]||"").indexOf("application/json")){var a=e.indexOf("?"),p=h(e.slice(a+1));if(p){var c=l(p,encodeURIComponent,JSON.stringify);e=""+e.slice(0,a)+c}o.headers=s}return function(t,e,o){return new Promise(function(s,a){var l=new XMLHttpRequest;o.withCredentials&&(l.withCredentials=o.withCredentials),l.open(t,e,!0,o.user,o.password);var h=o.headers||{};for(var u in h)l.setRequestHeader(u,h[u]);l.onload=function(){var t,e={data:(t=o.responseConverter,t&&i(t)?t:function(t,e){var i=t.getResponseHeader("Content-Type")||"";return i.indexOf("application/json")>-1||n(t.responseText)?JSON.parse(t.response):"text/xml"===i.toLowerCase()?t.responseXML:t.responseText})(l,o),contentType:l.getResponseHeader("Content-Type"),options:o,status:l.status,statusText:l.statusText};l.status>=200&&l.status<300?s(e):a(e)};var p=o.data;r(p)&&(p=JSON.stringify(p)),l.send(p)})}(t,e,o)}function w(t,e){return E("get",t,e||{})}var S=Object.freeze({init:E,get:w,post:function(t,e,n){return E("post",t,Object.assign({},n,{data:e}))}}),C=function(t,e){return(C=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function x(t,e){function n(){this.constructor=t}C(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}function k(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,o,r=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(i=r.next()).done;)s.push(i.value)}catch(t){o={error:t}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return s}function R(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(k(arguments[e]));return t}var b=function(){function t(t,e){this.$element=t,this.$options=e,this.$guid="dn"+Math.random().toString(36).substr(2),this._eventsCollection=[],this.$initialize(),this.$invoke(this.$options.onReady,this),this.$registerControl()}return t.prototype.dispose=function(){for(var t in console.log("duna: "+this.constructor.name+" #"+this.$guid+" was disposed"),this._eventsCollection.forEach(function(t){return t.element.removeEventListener(t.type,t.handler,!1)}),this._eventsCollection=[],this)delete this[t]},t.prototype._ensureUniqueInstancePerType=function(){var t=this,e=this.$element.$duna.findIndex(function(e){return e.constructor.name===t.constructor.name&&e.constructor.prototype===t.constructor.prototype});if(-1!==e){var n=this.$element.$duna[e];this.$element.$duna.splice(e,1),n.dispose()}},t.prototype.$registerControl=function(){Array.isArray(this.$element.hasOwnProperty("$duna"))||(this.$element.$duna=[]),this._ensureUniqueInstancePerType(),this.$element.$duna.push(this)},t.prototype.$invoke=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return"function"==typeof t?t.apply(this,e):void 0},t.prototype.$addEvent=function(t,e,n){e=e.bind(this),n=n||this.$element,this._eventsCollection.push({type:t,handler:e,element:n}),n.addEventListener(t,e,!1)},t.prototype.$removeEvent=function(t,e,n){var i=this;e=e.bind(this),n=n||this.$element,this._eventsCollection.filter(function(e){return e.element===n&&e.type===t}).forEach(function(n){var o=i._eventsCollection.indexOf(n);i._eventsCollection.splice(o,1),n.element.removeEventListener(t,e,!1)})},t}(),T=function(e){function n(n,i){return e.call(this,n,t({scale:0,decimalSeparator:".",groupingSeparator:",",format:["-n","n","n"],placeholder:"n",nullable:!1},i))||this}return x(n,e),n.prototype.$initialize=function(){this._normalizeFormat(),this._registerEvents(),this.format()},n.prototype.format=function(){var t=this.getRawValue()||"",e=this.$options,n={value:0,text:""};if(t||!e.nullable){t=t.replace(e.decimalSeparator||"",".");var i=parseFloat(t);s(i)||(i=0),i=this._ensureRange(i,e.min,e.max);var o=s(e.scale)?e.scale:0,r=i.toFixed(o);if(t=r.replace(".",e.decimalSeparator||""),o>0)for(var a=new RegExp("(\\d)(\\d{3}([\\"+e.groupingSeparator+"\\"+e.decimalSeparator+"]))");a.test(t);)t=t.replace(a,"$1"+e.groupingSeparator+"$2");var l="",h=this._dataFormat,u=e.placeholder||"";l=0===i?h[2].replace(u,t):i>0?h[1].replace(u,t):h[0].replace(u,t.replace("-","")),n.value=parseFloat(r),n.text=l,this.$invoke(e.onFormat,this,n),this.$element.value=l}else this.$invoke(e.onFormat,this,n)},n.prototype.getRawValue=function(){var t=this.$element.value;if(!t)return"";var e=t.match(/[-\d]+/g);if(!e||!e.length)return"";","!==t[0]&&"."!==t[0]||e.unshift("0");var n=e.length;if(1===n)return parseFloat(e[0]).toString();for(var i="",o=this.$options.scale>0?".":"";--n>-1;)i=o+e[n]+i,o="";return i?parseFloat(i).toFixed(this.$options.scale):i},n.prototype._normalizeFormat=function(){var t=this.$options.format;o(t)?t=["-"+t,t,t]:Array.isArray(t)&&2===t.length&&t.push(t[1]),this._dataFormat=t},n.prototype._registerEvents=function(){this.$addEvent("focus",this._onFocusEvent),this.$addEvent("click",this._onFocusEvent),this.$addEvent("keydown",this._onKeyDownEvent),this.$addEvent("change",this._onChangeEvent),this.$addEvent("blur",this.format)},n.prototype._onKeyDownEvent=function(t){var e=this.$element;if("Enter"!==t.key){if(!(t.key.length>1)&&(!/[0-9]/.test(t.key)||t.shiftKey)&&(!("-"===t.key)||e.value&&0!==e.selectionStart&&(document.getSelection()||"").toString()!==e.value)){var n=this.$options.scale;/[.,]/.test(t.key)&&s(n)&&n>0&&(!/[.,]/g.test(e.value)||(document.getSelection()||"").toString()===e.value)||t.preventDefault()}}else e.blur()},n.prototype._onFocusEvent=function(t){var e=this.$element;this.$options.nullable||e.value||this.format(),e.hasAttribute("readonly")||(e.value=this.getRawValue()),e.select(),t.preventDefault()},n.prototype._onChangeEvent=function(t){var e=this.$options,n=parseFloat(this.getRawValue()),i=this._ensureRange(n,e.min,e.max);this.$invoke(this.$options.onChange,this,{value:i,inputValue:n})},n.prototype._ensureRange=function(t,e,n){var i=s(e),o=s(n);if(i&&o&&e>=n)throw new RangeError("min must have a lesser value than max");return i&&t<e?e:o&&t>n?n:t},n.from=function(t,e){return R(document.querySelectorAll(t)).map(function(t){return new n(t,e)})},n}(b),F=function(n){function i(e,i){if(!i)throw new Error("SearchBox.options is required.");if(!i.template)throw new Error("SearchBox.options.template is required.");if(!i.source)throw new Error("SearchBox.source is required.");return n.call(this,e,t({template:"",activeItemClass:"active",delay:500,source:[],matchesTemplate:"<mark>${0}</mark>",fieldTemplate:"${0}",maxResults:10,minLength:2,offsetX:0,offsetY:2,dataRoot:"data",noRecordsTemplate:"<div>No records found</div>",searchFields:[]},i))||this}return x(i,n),i.prototype.$initialize=function(){this._setRoot(),this._createTemplate(),this._defineSourceHandler(),this._registerEvents()},i.prototype._setRoot=function(){this.$options.root&&(this._root=document.querySelector(this.$options.root))},i.prototype._createTemplate=function(){var t=this.$options.template;this.$element.insertAdjacentHTML("afterend",t);var e=this.$element.nextElementSibling,n=parseInt(y(e,"z-index"),10);isNaN(n)&&(n=9999),m(e,{display:"none",position:"fixed",margin:0,overflowY:"auto",height:"auto",zIndex:n});var i=e.querySelector("[dn-item]");if(!i)throw new Error("The container template must also have a child element with 'dn-item' attribute on it");this._container=e,this._containerBody=i.parentElement,this._itemTemplate=i.outerHTML},i.prototype._renderNoRecords=function(){this._noRecords=!0,this._resetContainerBody(),this.$options.noRecordsTemplate?(this._containerBody.insertAdjacentHTML("beforeend",this.$options.noRecordsTemplate),this._container.style.display="",this._updateContainerStyle()):this._containerBody.style.display="none"},i.prototype._staticSourceHandler=function(t){var e=this.$element.value;if(e.length){if(t.length){this._defineDataFilter(t);var n=this._dataFilter({dataSource:t,fields:this._searchFields,search:e.replace(/\\/g,"\\\\")});return n.length?(this._noRecords=!1,void this._render(n,e)):void this._renderNoRecords()}this._renderNoRecords()}},i.prototype._readData=function(t){var e=this.$options.dataRoot;return e?(e.split(".").forEach(function(e){return t.hasOwnProperty(e)&&(t=t[e]),t}),t):t},i.prototype._httpSourceHandler=function(t){var e=this.$element.value.trim();e.length&&(t=t.replace("${query}",encodeURIComponent(e)),this._promiseSourceHandler(function(){return w(t)}))},i.prototype._promiseSourceHandler=function(t){var e=this;window.clearTimeout(this._timer),this._timer=window.setTimeout(function(){e.$invoke(e.$options.onBeforeRequest,e),t(encodeURIComponent(e.$element.value)).then(function(t){var n=e._readData(t);if(!n||!Array.isArray(n))throw new Error("The data source is invalid. Check if the options.dataRoot is correct.");e.$invoke(e.$options.onAfterRequest,e,{container:e._container,data:n}),e._staticSourceHandler(n)},function(t){return console.error(t)})},this.$options.delay)},i.prototype._normalizeValue=function(t){return e(t)?(o(t)||(t=t.toString().trim()),t):""},i.prototype._resetContainerBody=function(){var t=this;Array.from(this._containerBody.children).forEach(function(e){t.$removeEvent("mouseenter",t._onItemMouseEnterEvent,e),t.$removeEvent("click",t._onItemClick,e)}),g(this._containerBody)},i.prototype._render=function(t,e){var n=this;this._resetContainerBody();for(var i=this.$options,o=Math.min(t.length,i.maxResults),r=p(e),s=new RegExp(r,"gi"),l=function(e){var o=Object.assign({},t[e]),r=h._itemTemplate;h._searchFields.forEach(function(t){var e=n._normalizeValue(o[t]);if(e){var a=e.split("");p(e).replace(s,function(t,n){for(var o=i.matchesTemplate.replace("${0}",e.substr(n,t.length)),r=n+t.length-1;r>n;)a.splice(r--,1);return a.splice(n,1,o),""}),r=r.replace(new RegExp("\\${"+t+"\\}","g"),a.join(""))}}),r=a(r,o),h._containerBody.insertAdjacentHTML("beforeend",r),h._containerBody.lastElementChild.dunaSearchBoxDataValue=t[e]},h=this,u=0;u<o;u++)l(u);R(this._containerBody.querySelectorAll("img[dn-src]")).forEach(function(t){var e=t.getAttribute("dn-src");e&&e.length>0&&(t.src=e)}),this._container.style.display=o?"block":"none",this._updateContainerStyle(),this._registerContainerEvents(),this.$invoke(this.$options.onResultsRender,this,{container:this._container})},i.prototype._defineDataFilter=function(t){if(!this._dataFilter)if(o(t[0]))this._dataFilter=this._stringDataFilter,this._searchFields=["0"];else{this._dataFilter=this._objectDataFilter;var e=this.$options.searchFields;Array.isArray(e)&&e.length||(e=Object.keys(t[0])),this._searchFields=e}},i.prototype._stringDataFilter=function(t){return this._objectDataFilter(Object.assign(t,{dataSource:t.dataSource.map(function(t){return{0:t}})}))},i.prototype._objectDataFilter=function(t){var e=p(t.search),n=new RegExp(e,"i"),i=t.fields,o=i.length;return t.dataSource.reduce(function(t,e){for(var r=0;r<o;r++){var s=p(e[i[r]]);if(n.test(s)){t.push(e);break}}return t},[])},i.prototype._defineSourceHandler=function(){Array.isArray(this.$options.source)?this._sourceHandler=this._staticSourceHandler:o(this.$options.source)?this._sourceHandler=this._httpSourceHandler:this._sourceHandler=this._promiseSourceHandler},i.prototype._selectItem=function(t){this._resetContainerBody();var e=t.dunaSearchBoxDataValue,n=a(this.$options.fieldTemplate,e);this.$element.value=n,this.$invoke(this.$options.onItemSelected,this,{data:e,text:t.innerText.trim()}),this.$element.dispatchEvent(new Event("input",{bubbles:!0})),this._container.style.display="none"},i.prototype._registerEvents=function(){this.$addEvent("keydown",this._onKeyDownEvent),this.$addEvent("input",this._onInputEvent),this.$addEvent("blur",this._onBlurEvent),this.$addEvent("scroll",this._onWindowScrollOrResize,window),this.$addEvent("resize",this._onWindowScrollOrResize,window)},i.prototype._keyboardNavigate=function(t){var e="ArrowDown"===t.key;if(e||"ArrowUp"===t.key){var n=this.$options.activeItemClass,i=this._containerBody.querySelector("."+n),o=e?["firstElementChild","nextElementSibling"]:["lastElementChild","previousElementSibling"];i&&(_(i,n),i=i[o[1]]),i||(i=this._containerBody[o[0]]),v(i,n);var r=i.dunaSearchBoxDataValue;this.$invoke(this.$options.onActiveItem,this,{data:r,text:i.innerText.trim()}),this._updateContainerScrollPosition(i,e)}},i.prototype._updateContainerScrollPosition=function(t,e){var n=this._containerBody,i=t===n.firstElementChild?0:t===n.lastElementChild?n.scrollHeight:-1;if(i>-1)n.scrollTop=i;else{var o=n.offsetHeight,r=t.offsetTop+(e?t.offsetHeight:0);if(r>o+n.scrollTop)n.scrollTop=r+(e?.2*t.offsetHeight:t.offsetHeight)-o;else r-n.scrollTop<0&&(n.scrollTop=r-(e?t.offsetHeight:.2*t.offsetHeight))}},i.prototype._onWindowScrollOrResize=function(){d(this._container)&&this._updateContainerStyle()},i.prototype._onKeyDownEvent=function(t){if(d(this._container)&&!this._noRecords){if("Enter"===t.key||"Tab"===t.key){var e=this.$options.activeItemClass,n=this._containerBody.querySelector("."+e);if(!n){if(1!==this._containerBody.children.length)return;n=this._containerBody.firstElementChild}return n&&this._selectItem(n),void("Enter"===t.key&&t.preventDefault())}this._keyboardNavigate(t)}},i.prototype._onInputEvent=function(t){var e=this.$element.value;t.isTrusted&&(e.length&&e.length<this.$options.minLength||(this._sourceHandler(this.$options.source),e.length||(this._container.style.display="none")))},i.prototype._onBlurEvent=function(){this._container.matches(":hover")||(this._container.style.display="none")},i.prototype._updateContainerStyle=function(){var t=this.$element.getBoundingClientRect();this._container.style.minWidth=t.width+"px",this._container.style.height="auto";var e=this.$options.offsetY,n=this.$options.offsetX,i=this._container.offsetHeight+e,o=window.innerHeight-t.bottom,r=Math.max(t.top,o),s=Math.min(i,r);s<i&&(this._container.style.height=s+"px");var a=t.left+n,l=o>=t.top?t.bottom+e:t.top-this._container.offsetHeight-e;if(this._root){var h=this._root.getBoundingClientRect();a-=h.left,l-=h.top}this._container.style.top=l+"px",this._container.style.left=a+"px"},i.prototype._registerContainerEvents=function(){var t=this;Array.from(this._containerBody.children).forEach(function(e){t.$addEvent("mouseenter",t._onItemMouseEnterEvent,e),t.$addEvent("click",t._onItemClick,e)})},i.prototype._onItemMouseEnterEvent=function(t){var e=this.$options.activeItemClass,n=t.target.parentElement.querySelector("."+e);n&&_(n,e),v(t.target,e)},i.prototype._onItemClick=function(t){this._selectItem(t.currentTarget)},i.from=function(t,e){return R(document.querySelectorAll(t)).map(function(t){return new i(t,e)})},i}(b),O=function(e){function n(n,i){return e.call(this,n,t({position:"right bottom",template:"<small><em>${len} / ${max}</em></small>",timeout:1.5,offsetX:0,offsetY:0,preserve:!1,showOnFocus:!1},i))||this}return x(n,e),n.prototype.$initialize=function(){this._setRoot(),this._registerEvents(),this._configPosition(),this._timer=null},n.prototype.dispose=function(){this._tooltip&&this._destroy(),window.removeEventListener("scroll",this._onWindowScrollOrResize,!1),e.prototype.dispose.call(this)},n.prototype._setRoot=function(){this.$options.root&&(this._root=document.querySelector(this.$options.root))},n.prototype._destroy=function(){this._tooltip&&this._tooltip.parentNode&&this._tooltip.parentNode.removeChild(this._tooltip),this._tooltip=null},n.prototype._getTooltip=function(t){var e=this._tooltip&&d(this._tooltip);if(!this._tooltip){this.$element.insertAdjacentHTML("afterend",this.$options.template),this._tooltip=this.$element.nextElementSibling,this._templateContent=this._tooltip.innerHTML,this._tooltip.style.position="fixed";var n=this.$element.getBoundingClientRect();this._tooltip.style.left=n.left+"px",this.$invoke(this.$options.onCreate,this,{tooltip:this._tooltip}),this._tooltip.style.display="none"}if(!e){if(t&&!this.$options.showOnFocus)return this._tooltip;this.$invoke(this.$options.onShow,this,{tooltip:this._tooltip}),this._tooltip.style.display=""}return this._tooltip},n.prototype._registerEvents=function(){this.$addEvent("focus",this._onFocusEvent),this.$addEvent("input",this._onInputEvent),this.$addEvent("blur",this._onBlurEvent),this.$addEvent("scroll",this._onWindowScrollOrResize,window),this.$addEvent("resize",this._onWindowScrollOrResize,window)},n.prototype._onWindowScrollOrResize=function(){this._tooltip&&d(this._tooltip)&&this._updatePosition()},n.prototype._onFocusEvent=function(t){this.$options.showOnFocus&&this._onInputEvent()},n.prototype._onInputEvent=function(){var t=this,e=this._getTooltip(!0),n={len:this.$element.value.length,max:this.$element.maxLength,rem:0};n.rem=n.max-n.len,e.innerHTML=a(this._templateContent,n),this._updatePosition(),window.clearTimeout(this._timer||0),this._timer=window.setTimeout(function(){return t._onBlurEvent()},1e3*this.$options.timeout)},n.prototype._onBlurEvent=function(){this._tooltip&&"none"!==this._tooltip.style.display&&(this.$options.preserve?this._tooltip.style.display="none":this._destroy.call(this),this.$invoke(this.$options.onHide,this,{tooltip:this._tooltip}))},n.prototype._updatePosition=function(){var t=this._getTooltip(),e=this.$element.getBoundingClientRect(),n=(this.$options.position,f(t)),i=this._position.x(e,n),o=this._position.y(e,n);if(i+=this.$options.offsetX,o+=this.$options.offsetY,this._root){var r=this._root.getBoundingClientRect();o-=r.top,i-=r.left}t.style.left=i+"px",t.style.top=o+"px",this.$invoke(this.$options.onChange,this,{tooltip:this._tooltip})},n.prototype._configPosition=function(){var t={left:function(t,e){return t.left},right:function(t,e){return t.right-e.width},top:function(t,e){return t.top-e.height},bottom:function(t,e){return t.bottom}},e=this.$options.position;this._position={};var n=e.match(/(^| )(left|right)( |$)/);n&&(this._position.x=t[n[2]]),(n=e.match(/(^| )(top|bottom)( |$)/))&&(this._position.y=t[n[2]])},n.from=function(t,e){return R(document.querySelectorAll(t)).map(function(t){return new n(t,e)})},n}(b),H=function(e){function n(n,i){return e.call(this,n,t({format:"",placeholder:"",allowPartial:!1,shifter:"_",translation:{9:{test:/[0-9]/},a:{test:/[A-Za-z]/},A:{test:/[A-Za-z]/,transform:function(t){return t.toUpperCase()}}}},i))||this}return x(n,e),n.prototype.update=function(){for(var t=this.$element.value,e=[],n=0,i=0;n<this._currentFormat.length;n++){var o=this._applyMask(n,i,t);if(void 0!==o.arg&&e.push(o.value),o.ok)i++;else if(!o.keepRunning||void 0===t[i])break}this._setValue(e.join(""))},n.prototype.getRawValue=function(){for(var t=[],e=this.$element.value,n=0;n<e.length;n++)this._hasTranslation(n)&&e[n]!==this.$options.shifter&&t.push(e[n]);return t.join("")},n.prototype.setOptions=function(t){this._setOptionsInternal(t),this._onBlurEvent()},n.prototype.dispose=function(){-1===this._originalMaxLength?this.$element.removeAttribute("maxlength"):this.$element.maxLength=this._originalMaxLength,e.prototype.dispose.call(this)},n.prototype.$initialize=function(){this._setOptionsInternal(null),this._defineFormat(!0),this._registerEvents(),this.update()},n.prototype._setOptionsInternal=function(e){t(this.$options,e),this._configOptions(),this._defineFormat(!0),this._normalizeTranslations(),this.$element.value=this.getRawValue(),this.update()},n.prototype._applyMask=function(t,e,n){var i=n[e],o=this._currentFormat[t],r=this._translations[o],s={isMask:!r&&void 0!==o,arg:i,ok:!!r&&r.test(i||"")||o===i,keepRunning:!r&&t<this._currentFormat.length,value:""};return s.ok?s.value=(r&&r.transform?r.transform:function(t){return t})(i||""):s.value=r?"":o,s},n.prototype._replace=function(t){t.preventDefault();var e=this.$element.selectionStart||0,n=this.$element.value.split("");n[e]=t.key;for(var i=n.join(""),o=e;o<this._currentFormat.length;o++){var r=this._applyMask(o,e,i);if(r.ok){n[o]=r.value,e=o;break}if(!r.isMask){n[o]=this.$element.value[o];break}if(n[o]=r.value,!r.keepRunning||void 0===n[o])break}this._setValue(n.join("")),this._setCaretPosition(e+1)},n.prototype._hasTranslation=function(t){var e=this._currentFormat[t];return!!this._translations[e]},n.prototype._defineFormat=function(t){t&&(this._currentFormat=this._formats[0]),this._originalMaxLength||(this._originalMaxLength=this.$element.maxLength),this.$element.maxLength=this._currentFormat.length},n.prototype._configOptions=function(){this._formats=o(this.$options.format)?[this.$options.format]:[].concat(this.$options.format),this.$element.placeholder=this.$options.placeholder||this._formats[0]},n.prototype._normalizeTranslations=function(){this._translations={};var t=this.$options.translation||{},e=function(e){var i=t[e].test;n._translations[e]={test:i instanceof RegExp?function(t){return i.test(t)}:i,transform:t[e].transform}},n=this;for(var i in t)e(i)},n.prototype._registerEvents=function(){this.$addEvent("input",this._onInputEvent),this.$addEvent("keydown",this._onKeyDownEvent),this.$addEvent("blur",this._onBlurEvent)},n.prototype._onBlurEvent=function(){var t=this.$element.value;if(t.indexOf(this.$options.shifter)>=0)return this.$options.allowPartial&&-1===(t=t.replace(new RegExp("\\"+this.$options.shifter+"*$",""),"")).indexOf(this.$options.shifter)?void this._setValue(t):void this._setValue("");t.length!==this._currentFormat.length&&(this.$options.allowPartial||this._setValue(""))},n.prototype._onInputEvent=function(){this.update()},n.prototype._onKeyDownEvent=function(t){if(!/^[cvx]$/i.test(t.key)||!t.ctrlKey){var e=this._getCaretPosition();1!==t.key.length?"Backspace"!==t.key?"Delete"!==t.key||this._deleteHandler.call(this,t,e):this._backspaceHandler.call(this,t,e):this.$element.value[e.start]&&this._replace(t)}},n.prototype._getMaskWithShifter=function(){if(this._maskWithShifter)return this._maskWithShifter;for(var t=this._currentFormat.split(""),e=0;e<t.length;e++)this._hasTranslation(e)&&(t[e]=this.$options.shifter);return this._maskWithShifter=t.join("")},n.prototype._default=function(t){return!this.$element.value.length||!t.areEquals&&0===t.start&&t.end===this.$element.value.length},n.prototype._deleteHandler=function(t,e){if(!this._default(e)){t.preventDefault();do{e.end++}while(!this._hasTranslation(e.end-1)&&e.end<this._currentFormat.length);var n=this.$element.value.split(""),i=this._getMaskWithShifter().substring(e.start,e.end);n.splice.apply(n,R([e.start,e.end-e.start],i.split(""))),this._setValue(n.join("")),this._setCaretPosition(e.start,e.end)}},n.prototype._backspaceHandler=function(t,e){if(!this._default(e)){if(t.preventDefault(),e.areEquals)do{e.start=Math.max(e.start-1,0)}while(!this._hasTranslation(e.start)&&e.start>0);var n=this.$element.value.split("");if(e.end===this.$element.value.length)n.splice(e.start);else{var i=this._getMaskWithShifter().substring(e.start,e.end);n.splice.apply(n,R([e.start,e.end-e.start],i.split("")))}this._setValue(n.join("")),this._setCaretPosition(e.start)}},n.prototype._setCaretPosition=function(t,e){void 0===e&&(e=void 0),this.$element.selectionStart=t,this.$element.selectionEnd=e||t},n.prototype._getCaretPosition=function(){var t=this.$element.selectionStart||0,e=this.$element.selectionEnd||0;return{start:t,end:e,areEquals:t===e}},n.prototype._setValue=function(t){this.$element.value=t,this.$invoke(this.$options.onUpdate,this,{value:t,rawValue:this.getRawValue()})},n.from=function(t,e){return R(document.querySelectorAll(t)).map(function(t){return new n(t,e)})},n}(b);return{get http(){return S},get dom(){return $},get utils(){return c},get version(){return"1.1.5"},get ui(){return{NumericBox:T,SearchBox:F,Limiter:O,MaskEdit:H}}}}();
//# sourceMappingURL=duna.js.map
