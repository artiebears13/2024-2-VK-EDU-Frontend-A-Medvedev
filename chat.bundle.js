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
/******/ 	return __webpack_require__(__webpack_require__.s = "./chat/chat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js!./components/chatWindow/chatWindow.css":
/*!*************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./components/chatWindow/chatWindow.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/* src/components/chatWindow/chatWindow.css */\n\n/* Chat Container */\n.chat-container {\n    display: flex;\n    flex-direction: column;\n    height: calc(100vh - 60px); /* Adjust based on header height */\n    justify-content: flex-end;\n}\n\n/* Messages Container */\n.messages-container {\n    flex-grow: 1;\n    padding: 20px;\n    overflow-y: auto;\n    background: #93b58b;\n    position: relative;\n}\n\n/* Messages List */\n.messages-list {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-direction: column;\n}\n\n/* Message Item */\n.message-item {\n    background-color: lightblue;\n    max-width: 60%;\n    margin-bottom: 10px;\n    padding: 10px 40px 10px 15px;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    position: relative;\n    word-wrap: break-word;\n    align-self: flex-start;\n    border-radius: 10px 10px 10px 10px;\n    min-width: 60px;\n}\n\n.message-item.sent {\n    align-self: flex-end;\n    background-color: #dcf8c6; /* Light green for sent messages */\n}\n\n.message-item.received {\n    align-self: flex-start;\n    background-color: #fff; /* White for received messages */\n}\n\n/* Message Tails */\n.message-item::after,\n.message-item::before {\n    bottom: -2px;\n    content: \"\";\n    height: 16px;\n    position: absolute;\n}\n\n.message-item.sent::before {\n    border-bottom-left-radius: 12px 11px;\n    border-right: 16px solid #dcf8c6;\n    right: -5px;\n    transform: translate(0, -2px);\n}\n\n.message-item.sent::after {\n    background-color: #93b58b;\n    border-bottom-left-radius: 6px;\n    right: -40px;\n    transform: translate(-30px, -2px);\n    width: 10px;\n}\n\n.message-item.received::before {\n    border-bottom-right-radius: 12px 11px;\n    border-left: 16px solid #fff;\n    left: -5px;\n    transform: translate(0, -1px);\n}\n\n.message-item.received::after {\n    background-color: #93b58b;\n    border-bottom-right-radius: 8px;\n    left: -40px;\n    transform: translate(30px, -2px);\n    width: 10px;\n}\n\n/* Time and Status */\n.message-item .time {\n    font-size: 10px;\n    color: #999;\n    position: absolute;\n    bottom: 5px;\n    right: 10px;\n}\n\n.message-item .material-symbols-outlined {\n    font-size: 16px;\n    vertical-align: middle;\n    margin-left: 5px;\n}\n\n/* Form Container */\n.form-container {\n    width: 100%;\n    height: 60px;\n    padding: 10px;\n    background-color: #f1f1f1;\n    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);\n    display: flex;\n    justify-content: center;\n}\n\n/* Form Styles */\n.form {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    max-width: 800px;\n    border-radius: 25px;\n    padding: 10px;\n    background-color: #f1f1f1;\n    border: 1px solid #ddd;\n}\n\n.form-input {\n    flex-grow: 1;\n    padding: 10px;\n    border: none;\n    outline: none;\n    border-radius: 20px;\n    background-color: transparent;\n    font-size: 14px;\n    word-wrap: break-word;\n    margin-right: 10px;\n    color: #707070;\n}\n\n/* Send Button */\n.send-btn {\n    background-color: #4d8de3;\n    height: 30px;\n    width: 30px;\n    border: none;\n    padding: 10px;\n    border-radius: 50%;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.send-btn .material-symbols-outlined {\n    font-size: 20px;\n    color: white;\n}\n\n.send-btn:hover {\n    background-color: #006bbf;\n}\n\n/* Header Styles */\n.header {\n    padding: 0 10px;\n    width: 100%;\n    height: 60px;\n    background-color: #006bbf;\n    display: flex;\n    align-items: center;\n    position: relative;\n}\n\n.receiver {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n}\n\n.receiver .material-symbols-outlined {\n    margin-right: 10px;\n}\n\n.receiver-name {\n    font-size: 18px;\n    font-weight: 500;\n    color: white;\n    flex-grow: 1;\n    text-align: center;\n}\n\n.receiver-photo {\n    display: flex;\n    align-items: center;\n}\n\n.receiver-photo__image {\n    border-radius: 50%;\n    object-fit: cover;\n    width: 40px;\n    height: 40px;\n}\n", ""]);
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

/***/ "./chat/chat.js":
/*!**********************!*\
  !*** ./chat/chat.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_chatWindow_chatWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/chatWindow/chatWindow.js */ "./components/chatWindow/chatWindow.js");


Object(_components_chatWindow_chatWindow_js__WEBPACK_IMPORTED_MODULE_1__["initializeChatWindow"])();

/***/ }),

/***/ "./components/chatWindow/chatWindow.css":
/*!**********************************************!*\
  !*** ./components/chatWindow/chatWindow.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./chatWindow.css */ "../node_modules/css-loader/dist/cjs.js!./components/chatWindow/chatWindow.css");

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

/***/ "./components/chatWindow/chatWindow.js":
/*!*********************************************!*\
  !*** ./components/chatWindow/chatWindow.js ***!
  \*********************************************/
/*! exports provided: initializeChatWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeChatWindow", function() { return initializeChatWindow; });
/* harmony import */ var _chatWindow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatWindow.css */ "./components/chatWindow/chatWindow.css");
/* harmony import */ var _chatWindow_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chatWindow_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/storage.js */ "./utils/storage.js");


function initializeChatWindow() {
  // парсим URL
  var urlParams = new URLSearchParams(window.location.search);
  var chatId = urlParams.get('id');
  var form = document.querySelector('.form');
  var input = document.querySelector('.form-input');
  var messagesList = document.querySelector('.messages-list');
  fillHeader(chatId);
  document.addEventListener('DOMContentLoaded', function () {
    return loadMessages(chatId, messagesList);
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var messageText = input.value.trim();
    if (messageText) {
      var message = Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["createMessageObject"])(messageText, 'sent');
      Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["saveMessage"])(chatId, message);
      addMessageToUI(message, messagesList);
      input.value = '';
    }
  });
  setTimeout(function () {
    simulateReceivedMessage(chatId, 'Привет) как дела?', messagesList);
  }, 5000);
}

// добавляем в хэдер имя и аватарку
function fillHeader(chatId) {
  var header = document.querySelector('.header');
  var people = Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["loadPeople"])();
  var person = people.find(function (p) {
    return p.id === chatId;
  });
  if (person) {
    header.innerHTML = '';
    var receiverDiv = document.createElement('div');
    receiverDiv.classList.add('receiver');

    // кнопка "назад"
    var backButton = document.createElement('button');
    backButton.classList.add('material-symbols-outlined', 'back-button', 'white');
    // backButton.href = '/';
    backButton.textContent = 'arrow_back_ios';
    backButton.onclick = function () {
      window.history.back();
    };

    // имя
    var receiverNameSpan = document.createElement('span');
    receiverNameSpan.classList.add('receiver-name', 'white');
    receiverNameSpan.textContent = person.name;

    // контейнер аватарки
    var receiverPhotoDiv = document.createElement('div');
    receiverPhotoDiv.classList.add('receiver-photo');

    // аватарка
    var receiverPhotoImg = document.createElement('img');
    receiverPhotoImg.classList.add('receiver-photo__image');
    receiverPhotoImg.src = person.photo;
    receiverPhotoImg.width = 50;
    receiverPhotoImg.height = 50;
    receiverPhotoImg.alt = 'profile photo';
    receiverPhotoDiv.appendChild(receiverPhotoImg);
    receiverDiv.appendChild(backButton);
    receiverDiv.appendChild(receiverNameSpan);
    receiverDiv.appendChild(receiverPhotoDiv);
    header.appendChild(receiverDiv);
  } else {
    console.error('Пользователь не найден для chatId:', chatId);
  }
}
function getMessageId(chatId, id) {
  return "".concat(chatId, ".message_").concat(id);
}

// подгрузка сообщений
function loadMessages(chatId, messagesList) {
  var lastMessageId = 0;
  if (localStorage.getItem("".concat(chatId, ".lastMessageId")) !== null) {
    lastMessageId = parseInt(localStorage.getItem("".concat(chatId, ".lastMessageId")));
  }
  for (var i = 1; i <= lastMessageId; i++) {
    var messageKey = getMessageId(chatId, i);
    var messageData = localStorage.getItem(messageKey);
    if (messageData) {
      var message = JSON.parse(messageData);
      addMessageToUI(message, messagesList);
    }
  }
  Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["markReceivedMessagesAsRead"])(chatId); // прочитали непрочитанное
}

// добавляем пузырек сообщения
function addMessageToUI(message, messagesList) {
  var messageItem = document.createElement('li');
  messageItem.classList.add('message-item', message.direction);
  var timeSpan = document.createElement('span');
  timeSpan.classList.add('time');
  timeSpan.textContent = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  var statusIcon = null;
  if (message.direction === 'sent') {
    statusIcon = document.createElement('span');
    statusIcon.classList.add('material-symbols-outlined');
    if (message.readStatus === 'unread') {
      statusIcon.textContent = 'check';
    } else if (message.readStatus === 'read') {
      statusIcon.textContent = 'done_all';
    }
  }
  messageItem.textContent = message.text;
  if (statusIcon) messageItem.appendChild(statusIcon);
  messageItem.appendChild(timeSpan);
  messagesList.appendChild(messageItem);
}
function simulateReceivedMessage(chatId, text, messagesList) {
  var message = Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["createMessageObject"])(text, 'received');
  Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__["saveMessage"])(chatId, message);
  addMessageToUI(message, messagesList);
}

/***/ }),

/***/ "./data/people.js":
/*!************************!*\
  !*** ./data/people.js ***!
  \************************/
/*! exports provided: initialPeople */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialPeople", function() { return initialPeople; });
// чтобы в начале не пусто было
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

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
/* harmony import */ var _data_people_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/people.js */ "./data/people.js");


// берем из localStorage чаты
function loadPeople() {
  var storedPeople = JSON.parse(localStorage.getItem('people'));
  if (storedPeople && Array.isArray(storedPeople)) {
    return storedPeople;
  } else {
    localStorage.setItem('people', JSON.stringify(_data_people_js__WEBPACK_IMPORTED_MODULE_0__["initialPeople"]));
    return _data_people_js__WEBPACK_IMPORTED_MODULE_0__["initialPeople"];
  }
}

// последнее сообщение
function getLastMessage(personId) {
  var lastMessageId = localStorage.getItem("".concat(personId, ".lastMessageId"));
  if (lastMessageId) {
    return JSON.parse(localStorage.getItem("".concat(personId, ".message_").concat(lastMessageId)));
  }
  return null;
}

// сделать последнее сообщение прочитанным
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

// создание сообщения
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

// сохранение в localStorage
function saveMessage(chatId, message) {
  var lastMessageId = parseInt(localStorage.getItem("".concat(chatId, ".lastMessageId"))) || 0;
  lastMessageId += 1;
  localStorage.setItem("".concat(chatId, ".message_").concat(lastMessageId), JSON.stringify(message));
  localStorage.setItem("".concat(chatId, ".lastMessageId"), "".concat(lastMessageId));
}

/***/ })

/******/ });
//# sourceMappingURL=chat.bundle.js.map