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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js!./components/chatList/chatList.css":
/*!*********************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./components/chatList/chatList.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#chat-list {\n    padding: 10px;\n}\n\n.chat-item {\n    display: flex;\n    align-items: center;\n    padding: 10px;\n    cursor: pointer;\n    border-bottom: 1px solid #ccc;\n}\n\n.chat-item:hover {\n    background-color: #f5f5f5;\n}\n\n.chat-item-photo {\n    margin-right: 10px;\n}\n\n.chat-item-photo img {\n    border-radius: 50%;\n    width: 50px;\n    height: 50px;\n    object-fit: cover;\n}\n\n/* Chat Item Info */\n.chat-item-info {\n    flex-grow: 1;\n}\n\n.chat-item-name {\n    font-weight: bold;\n    display: flex;\n    align-items: center;\n}\n\n.chat-item-last-message {\n    color: #555;\n    margin-top: 5px;\n}\n\n.chat-item-status {\n    margin-left: auto;\n    display: flex;\n    align-items: center;\n}\n\n.unread-count {\n    background-color: #808080FF;\n    color: white;\n    border-radius: 50%;\n    font-size: 12px;\n    height: 20px;\n    width: 20px;\n    text-align: center;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.material-symbols-outlined {\n    font-size: 18px;\n    vertical-align: middle;\n    margin-left: 5px;\n}\n\n.message-status-icon {\n    align-self: flex-start;\n}\n\n.chat-item-time {\n    font-size: 12px;\n    color: #999;\n    margin-left: 10px;\n    white-space: nowrap;\n    align-self: flex-start;\n}\n\n.create-chat-button {\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    background-color: #007aff;\n    color: #fff;\n    border: none;\n    border-radius: 50%;\n    width: 60px;\n    height: 60px;\n    font-size: 30px;\n    cursor: pointer;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n.plus{\n    margin-left: 0;\n}\n.create-chat-button:hover {\n    background-color: #0051a8;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./components/modal/modal.css":
/*!***************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./components/modal/modal.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".modal {\n    display: none;\n    position: fixed;\n    z-index: 1000;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n.modal-content {\n    background-color: #ffffff;\n    margin: 100px auto;\n    padding: 20px 30px;\n    border-radius: 12px;\n    width: 90%;\n    max-width: 400px;\n    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);\n    position: relative;\n}\n\n.close-button {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    color: #aaa;\n    font-size: 24px;\n    font-weight: bold;\n    cursor: pointer;\n}\n\n.close-button:hover,\n.close-button:focus {\n    color: #000;\n}\n\n.modal-header {\n    font-size: 20px;\n    font-weight: 500;\n    margin-bottom: 20px;\n    color: #000;\n}\n\n#new-person-name {\n    width: 100%;\n    padding: 12px 16px;\n    margin-bottom: 20px;\n    font-size: 16px;\n    border: 1px solid #ced4da;\n    border-radius: 8px;\n    outline: none;\n}\n\n#new-person-name:focus {\n    border-color: #66afe9;\n}\n\n#create-chat-confirm {\n    background-color: #0088cc;\n    color: #fff;\n    border: none;\n    padding: 12px 20px;\n    font-size: 16px;\n    cursor: pointer;\n    border-radius: 8px;\n    width: 100%;\n}\n\n#create-chat-confirm:hover {\n    background-color: #007ab8;\n}\n\n@media screen and (max-width: 480px) {\n    .modal-content {\n        margin: 50px auto;\n        width: 90%;\n    }\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./components/chatList/chatList.css":
/*!******************************************!*\
  !*** ./components/chatList/chatList.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./chatList.css */ "../node_modules/css-loader/dist/cjs.js!./components/chatList/chatList.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/chatList/chatList.js":
/*!*****************************************!*\
  !*** ./components/chatList/chatList.js ***!
  \*****************************************/
/*! exports provided: renderChatList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderChatList", function() { return renderChatList; });
/* harmony import */ var _chatList_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatList.css */ "./components/chatList/chatList.css");
/* harmony import */ var _chatList_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chatList_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/storage.js */ "./utils/storage.js");


function renderChatList() {
  var people = Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["loadPeople"])();
  var chatListDiv = document.getElementById('chat-list');
  chatListDiv.innerHTML = '';

  // get last message
  var chatsWithLastMessage = people.map(function (person) {
    var lastMessage = Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["getLastMessage"])(person.id);
    return {
      person: person,
      lastMessage: lastMessage
    };
  });

  // sort by time
  chatsWithLastMessage.sort(function (a, b) {
    var timeA = a.lastMessage ? a.lastMessage.timestamp : 0;
    var timeB = b.lastMessage ? b.lastMessage.timestamp : 0;
    return timeB - timeA;
  });

  // add messages
  chatsWithLastMessage.forEach(function (chat) {
    var chatItem = createChatItem(chat);
    chatListDiv.appendChild(chatItem);
  });
}
function createChatItem(_ref) {
  var person = _ref.person,
    lastMessage = _ref.lastMessage;
  var chatItem = document.createElement('div');
  chatItem.classList.add('chat-item');
  var statusBadge = createStatusBadge(lastMessage);
  var chatItemPhotoDiv = createChatItemPhotoDiv(person);
  var chatItemInfoDiv = createChatItemInfoDiv(person, lastMessage);
  var chatItemStatusDiv = createChatItemStatusDiv(statusBadge);
  var chatItemTimeDiv = createChatItemTimeDiv(lastMessage);
  chatItem.appendChild(chatItemPhotoDiv);
  chatItem.appendChild(chatItemInfoDiv);
  chatItem.appendChild(chatItemStatusDiv);
  chatItem.appendChild(chatItemTimeDiv);
  chatItem.addEventListener('click', function () {
    Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["markReceivedMessagesAsRead"])(person.id);
    window.location.href = "chat.html?id=".concat(person.id); // to be refactored in spa
  });
  return chatItem;
}
function createStatusBadge(lastMessage) {
  var statusBadge = null;
  if (lastMessage) {
    if (lastMessage.direction === 'received' && lastMessage.readStatus === 'unread') {
      var unreadCountDiv = document.createElement('div');
      unreadCountDiv.classList.add('unread-count');
      unreadCountDiv.textContent = '1';
      statusBadge = unreadCountDiv;
    } else if (lastMessage.direction === 'sent') {
      var statusIconSpan = document.createElement('span');
      statusIconSpan.classList.add('material-symbols-outlined');
      if (lastMessage.readStatus === 'unread') {
        statusIconSpan.classList.add('message-status-icon');
        statusIconSpan.textContent = 'check';
      } else if (lastMessage.readStatus === 'read') {
        statusIconSpan.textContent = 'done_all';
      }
      statusBadge = statusIconSpan;
    }
  }
  return statusBadge;
}
function createChatItemPhotoDiv(person) {
  var chatItemPhotoDiv = document.createElement('div');
  chatItemPhotoDiv.classList.add('chat-item-photo');
  var img = document.createElement('img');
  img.src = person.photo;
  img.alt = person.name;
  chatItemPhotoDiv.appendChild(img);
  return chatItemPhotoDiv;
}
function createChatItemInfoDiv(person, lastMessage) {
  var lastMessageText = lastMessage ? lastMessage.text : '';
  var chatItemInfoDiv = document.createElement('div');
  chatItemInfoDiv.classList.add('chat-item-info');
  var chatItemNameDiv = document.createElement('div');
  chatItemNameDiv.classList.add('chat-item-name');
  var nameSpan = document.createElement('span');
  nameSpan.textContent = person.name;
  var chatItemLastMessageDiv = document.createElement('div');
  chatItemLastMessageDiv.classList.add('chat-item-last-message');
  chatItemLastMessageDiv.textContent = lastMessageText;
  chatItemNameDiv.appendChild(nameSpan);
  chatItemInfoDiv.appendChild(chatItemNameDiv);
  chatItemInfoDiv.appendChild(chatItemLastMessageDiv);
  return chatItemInfoDiv;
}
function createChatItemStatusDiv(statusBadge) {
  var chatItemStatusDiv = document.createElement('div');
  chatItemStatusDiv.classList.add('chat-item-status');
  if (statusBadge) {
    chatItemStatusDiv.appendChild(statusBadge);
  }
  return chatItemStatusDiv;
}
function createChatItemTimeDiv(lastMessage) {
  var lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }) : '';
  var chatItemTimeDiv = document.createElement('div');
  chatItemTimeDiv.classList.add('chat-item-time');
  chatItemTimeDiv.textContent = lastMessageTime;
  return chatItemTimeDiv;
}

/***/ }),

/***/ "./components/modal/modal.css":
/*!************************************!*\
  !*** ./components/modal/modal.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./modal.css */ "../node_modules/css-loader/dist/cjs.js!./components/modal/modal.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/modal/modal.js":
/*!***********************************!*\
  !*** ./components/modal/modal.js ***!
  \***********************************/
/*! exports provided: initializeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeModal", function() { return initializeModal; });
/* harmony import */ var _modal_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.css */ "./components/modal/modal.css");
/* harmony import */ var _modal_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/storage.js */ "./utils/storage.js");



// init new chat modal
function initializeModal() {
  var createChatButton = document.querySelector('.create-chat-button');
  var modal = document.getElementById('create-chat-modal');
  var closeButton = document.querySelector('.close-button');
  var createChatConfirm = document.getElementById('create-chat-confirm');
  var newNameInput = document.getElementById('new-person-name');
  createChatButton.addEventListener('click', function () {
    return openModal(modal);
  });
  closeButton.addEventListener('click', function () {
    return closeModal(modal, newNameInput);
  });
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal(modal, newNameInput);
    }
  });
  createChatConfirm.addEventListener('click', function () {
    handleCreateChat(newNameInput, modal);
  });
}
function openModal(modal) {
  modal.style.display = 'block';
}
function closeModal(modal, inputField) {
  modal.style.display = 'none';
  inputField.value = '';
}
function handleCreateChat(newNameInput, modal) {
  var newPersonName = newNameInput.value.trim();
  var people = Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["loadPeople"])();
  if (newPersonName !== '') {
    var existingPerson = people.find(function (person) {
      return person.name.toLowerCase() === newPersonName.toLowerCase();
    });
    if (existingPerson) {
      alert('Пользователь с таким именем уже существует.');
      return;
    }
    var newPerson = {
      id: Date.now().toString(),
      name: newPersonName,
      photo: 'https://picsum.photos/50/50'
    };
    people.push(newPerson);
    localStorage.setItem('people', JSON.stringify(people));
    closeModal(modal, newNameInput);
    location.reload();
    window.location.href = "chat.html?id=".concat(newPerson.id); // to be refactored in spa
  } else {
    alert('Пожалуйста, введите имя пользователя.');
  }
}

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_chatList_chatList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/chatList/chatList.js */ "./components/chatList/chatList.js");
/* harmony import */ var _components_modal_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/modal/modal.js */ "./components/modal/modal.js");
// src/index.js




document.addEventListener('DOMContentLoaded', function () {
  Object(_components_chatList_chatList_js__WEBPACK_IMPORTED_MODULE_1__["renderChatList"])();
  Object(_components_modal_modal_js__WEBPACK_IMPORTED_MODULE_2__["initializeModal"])();
});

/***/ }),

/***/ "./mocks/__mocks__.js":
/*!****************************!*\
  !*** ./mocks/__mocks__.js ***!
  \****************************/
/*! exports provided: initialPeople */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialPeople", function() { return initialPeople; });
// init placeholder people
var initialPeople = [{
  id: '1',
  name: 'John Doe',
  photo: 'https://picsum.photos/50/50?random=1'
}, {
  id: '2',
  name: 'Jane Smith',
  photo: 'https://picsum.photos/50/50?random=2'
}];

/***/ }),

/***/ "./utils/storage.js":
/*!**************************!*\
  !*** ./utils/storage.js ***!
  \**************************/
/*! exports provided: loadPeople, getLastMessage, markReceivedMessagesAsRead, createMessageObject, saveMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPeople", function() { return loadPeople; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLastMessage", function() { return getLastMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markReceivedMessagesAsRead", function() { return markReceivedMessagesAsRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessageObject", function() { return createMessageObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveMessage", function() { return saveMessage; });
/* harmony import */ var _mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mocks/__mocks__.js */ "./mocks/__mocks__.js");


// load from localStorage
function loadPeople() {
  var storedPeople = JSON.parse(localStorage.getItem('people'));
  if (storedPeople && Array.isArray(storedPeople)) {
    return storedPeople;
  } else {
    localStorage.setItem('people', JSON.stringify(_mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__["initialPeople"]));
    return _mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__["initialPeople"];
  }
}
function getLastMessage(personId) {
  var lastMessageId = localStorage.getItem("".concat(personId, ".lastMessageId"));
  if (lastMessageId) {
    return JSON.parse(localStorage.getItem("".concat(personId, ".message_").concat(lastMessageId)));
  }
  return null;
}
function markReceivedMessagesAsRead(personId) {
  var lastMessageId = parseInt(localStorage.getItem("".concat(personId, ".lastMessageId")));
  if (lastMessageId) {
    var messageKey = "".concat(personId, ".message_").concat(lastMessageId);
    var message = JSON.parse(localStorage.getItem(messageKey));
    if (message && message.direction === 'received' && message.readStatus === 'unread') {
      message.readStatus = 'read';
      localStorage.setItem(messageKey, JSON.stringify(message));
    }
  }
}
function createMessageObject(text, direction) {
  var timeStamp = new Date();
  return {
    id: Date.now().toString(),
    text: text,
    timestamp: timeStamp.getTime(),
    direction: direction,
    readStatus: 'unread'
  };
}
function saveMessage(chatId, message) {
  var lastMessageId = parseInt(localStorage.getItem("".concat(chatId, ".lastMessageId"))) || 0;
  lastMessageId += 1;
  localStorage.setItem("".concat(chatId, ".message_").concat(lastMessageId), JSON.stringify(message));
  localStorage.setItem("".concat(chatId, ".lastMessageId"), "".concat(lastMessageId));
}

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map