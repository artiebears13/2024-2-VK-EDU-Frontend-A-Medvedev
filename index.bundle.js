/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/chatList/chatList.js":
/*!*****************************************!*\
  !*** ./components/chatList/chatList.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatList: () => (/* binding */ chatList)
/* harmony export */ });
/* harmony import */ var _chatList_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatList.scss */ "./components/chatList/chatList.scss");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/storage.js */ "./utils/storage.js");
/* harmony import */ var _items_chatItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./items/chatItem */ "./components/chatList/items/chatItem.js");



function chatList() {
  var searchQuery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var people = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.loadPeople)();
  var chatListDiv = document.getElementById('chat-list');
  chatListDiv.innerHTML = '';
  var filteredChats = [];
  if (searchQuery === '') {
    var chatsWithLastMessage = people.map(function (person) {
      var lastMessage = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.getLastMessage)(person.id);
      return {
        person: person,
        message: lastMessage
      };
    });
    filteredChats = chatsWithLastMessage;
  } else {
    var chatsWithAllMessages = people.map(function (person) {
      var allMessages = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.getAllMessages)(person.id);
      return {
        person: person,
        messages: allMessages
      };
    });
    var query = searchQuery.toLowerCase();
    filteredChats = chatsWithAllMessages.map(function (chat) {
      // return last message if matches with name or last matched message or null
      var nameMatch = chat.person.name.toLowerCase().includes(query);
      var matchingMessages = chat.messages.filter(function (message) {
        return message.text.toLowerCase().includes(query);
      });
      if (nameMatch) {
        var lastMessage = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.getLastMessage)(chat.person.id);
        return {
          person: chat.person,
          lastMessage: lastMessage
        };
      } else if (matchingMessages.length > 0) {
        var lastMatchingMessage = matchingMessages.reduce(function (latest, current) {
          return !latest || current.timestamp > latest.timestamp ? current : latest;
        }, null);
        return {
          person: chat.person,
          message: lastMatchingMessage
        };
      } else {
        return null;
      }
    }).filter(function (chat) {
      return chat !== null;
    });
  }

  // sort by time descending
  var sortedChats = filteredChats.sort(function (a, b) {
    var timeA = a.message ? a.message.timestamp : 0;
    var timeB = b.message ? b.message.timestamp : 0;
    return timeB - timeA;
  });
  var fragment = document.createDocumentFragment();
  sortedChats.forEach(function (chat) {
    fragment.appendChild((0,_items_chatItem__WEBPACK_IMPORTED_MODULE_2__.chatItem)(chat));
  });
  chatListDiv.appendChild(fragment);
}

/***/ }),

/***/ "./components/chatList/chatListView.js":
/*!*********************************************!*\
  !*** ./components/chatList/chatListView.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatListView: () => (/* binding */ chatListView)
/* harmony export */ });
/* harmony import */ var _header_chatListHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/chatListHeader */ "./components/chatList/header/chatListHeader.js");
/* harmony import */ var _createChatModal_createChatModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createChatModal/createChatModal */ "./components/chatList/createChatModal/createChatModal.js");
/* harmony import */ var _createChatButton_createChatButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createChatButton/createChatButton */ "./components/chatList/createChatButton/createChatButton.js");
/* harmony import */ var _chatList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chatList */ "./components/chatList/chatList.js");
/* harmony import */ var _modal_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modal/modal */ "./components/modal/modal.js");
/* harmony import */ var _utils_search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/search */ "./utils/search.js");






function chatListView(app) {
  var fragment = document.createDocumentFragment();
  var chatListView = document.createElement('div');
  chatListView.classList.add('chat-list-view');
  var chatListDiv = document.createElement('div');
  chatListDiv.id = 'chat-list';
  var modal = (0,_createChatModal_createChatModal__WEBPACK_IMPORTED_MODULE_1__.createCreateChatModal)();
  var addChatButton = (0,_createChatButton_createChatButton__WEBPACK_IMPORTED_MODULE_2__.createChatButton)();
  chatListView.append(chatListDiv, addChatButton);
  fragment.append((0,_header_chatListHeader__WEBPACK_IMPORTED_MODULE_0__.chatListHeader)(_utils_search__WEBPACK_IMPORTED_MODULE_5__.handleSearch), (0,_createChatModal_createChatModal__WEBPACK_IMPORTED_MODULE_1__.createCreateChatModal)(), chatListView);
  app.appendChild(fragment);
  (0,_chatList__WEBPACK_IMPORTED_MODULE_3__.chatList)();
  (0,_modal_modal__WEBPACK_IMPORTED_MODULE_4__.initializeModal)();
  addChatButton.addEventListener('click', function () {
    modal.style.display = 'block';
  });
}

/***/ }),

/***/ "./components/chatList/createChatButton/createChatButton.js":
/*!******************************************************************!*\
  !*** ./components/chatList/createChatButton/createChatButton.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createChatButton: () => (/* binding */ createChatButton)
/* harmony export */ });
/* harmony import */ var _createChatButton_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createChatButton.scss */ "./components/chatList/createChatButton/createChatButton.scss");

function createChatButton() {
  var chatButton = document.createElement('button');
  chatButton.classList.add('create-chat-button');
  var addIcon = "<span class=\"material-symbols-outlined\" style=\"margin: 0\">add</span>";
  chatButton.insertAdjacentHTML('afterbegin', addIcon);
  return chatButton;
}

/***/ }),

/***/ "./components/chatList/createChatModal/createChatModal.js":
/*!****************************************************************!*\
  !*** ./components/chatList/createChatModal/createChatModal.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCreateChatModal: () => (/* binding */ createCreateChatModal)
/* harmony export */ });
function createCreateChatModal() {
  var modal = document.createElement('div');
  modal.id = 'create-chat-modal';
  modal.classList.add('modal');
  var modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  var closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  var heading = document.createElement('h2');
  heading.textContent = 'Создать новый чат';
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'new-person-name';
  input.placeholder = 'Имя пользователя';
  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'new-person-photo';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none'; // Скрываем поле

  var photoPreview = document.createElement('div');
  photoPreview.id = 'photo-preview';
  photoPreview.classList.add('photo-preview');
  var confirmButton = document.createElement('button');
  confirmButton.id = 'create-chat-confirm';
  confirmButton.textContent = 'OK';
  modalContent.append(closeButton, heading, photoPreview, input, confirmButton, fileInput);
  modal.appendChild(modalContent);
  return modal;
}

/***/ }),

/***/ "./components/chatList/header/chatListHeader.js":
/*!******************************************************!*\
  !*** ./components/chatList/header/chatListHeader.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatListHeader: () => (/* binding */ chatListHeader)
/* harmony export */ });
/* harmony import */ var _menu_Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../menu/Menu */ "./components/chatList/menu/Menu.js");
/* harmony import */ var _chatListHeader_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chatListHeader.scss */ "./components/chatList/header/chatListHeader.scss");


function chatListHeader(onSearch) {
  var header = document.createElement('div');
  header.classList.add('header');
  var menuIcon = document.createElement('button');
  menuIcon.classList.add('material-symbols-outlined', 'white', 'menu-button');
  menuIcon.textContent = 'menu';
  var dropdownMenu = (0,_menu_Menu__WEBPACK_IMPORTED_MODULE_0__.Menu)();
  menuIcon.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'none') {
      dropdownMenu.style.display = 'block';
    } else {
      dropdownMenu.style.display = 'none';
    }
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });
  header.appendChild(dropdownMenu);
  var title = document.createElement('h2');
  title.classList.add('white');
  title.textContent = 'Artemgram';
  var searchIcon = document.createElement('button');
  searchIcon.classList.add('search-button', 'material-symbols-outlined', 'white');
  searchIcon.textContent = 'search';
  var searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  searchInput.classList.add('search-input');
  searchInput.style.display = 'none'; // Hidden initially

  searchIcon.addEventListener('click', function () {
    if (searchInput.style.display === 'none') {
      searchInput.classList.add('scale-in-hor-right');
      searchInput.style.display = 'inline-block';
      title.style.display = 'none';
      searchInput.focus();
      searchIcon.style.display = 'none';
    }
  });
  searchInput.addEventListener('input', function (e) {
    var query = e.target.value.trim();
    onSearch(query);
  });
  searchInput.addEventListener('focusout', function (e) {
    hideSearchBar(searchInput, title, searchIcon, onSearch);
  });
  header.append(menuIcon, title, searchIcon, searchInput);
  return header;
}
function hideSearchBar(searchInput, title, searchIcon, onSearch) {
  var _handleAnimationEnd = function handleAnimationEnd() {
    searchInput.style.display = 'none';
    searchInput.classList.remove('scale-out-hor-right');
    title.style.display = 'inline-block';
    searchIcon.style.display = 'inline-block';
    searchInput.value = '';
    onSearch('');
    searchInput.removeEventListener('animationend', _handleAnimationEnd);
  };
  searchInput.classList.remove('scale-in-hor-right');
  searchInput.classList.add('scale-out-hor-right');
  searchInput.addEventListener('animationend', _handleAnimationEnd);
}

/***/ }),

/***/ "./components/chatList/items/chatInfo.js":
/*!***********************************************!*\
  !*** ./components/chatList/items/chatInfo.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatInfo: () => (/* binding */ chatInfo)
/* harmony export */ });
function chatInfo(person, lastMessage) {
  var lastMessageText = lastMessage ? lastMessage.text : '';
  var maxLength = 20;
  var displayText = lastMessageText.length > maxLength ? "".concat(lastMessageText.slice(0, maxLength), "...") : lastMessageText;
  var chatItemInfoDiv = document.createElement('div');
  var content = "\n        <div class=\"chat-item__info\">\n            <div class=\"chat-item__name\">".concat(person.name, "</div>\n        </div>\n        <div class=\"chat-item__last-message\">\n            ").concat(displayText, "\n        </div>\n    ");
  chatItemInfoDiv.insertAdjacentHTML('afterbegin', content);
  return chatItemInfoDiv;
}

/***/ }),

/***/ "./components/chatList/items/chatItem.js":
/*!***********************************************!*\
  !*** ./components/chatList/items/chatItem.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatItem: () => (/* binding */ chatItem)
/* harmony export */ });
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/storage */ "./utils/storage.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../index */ "./index.js");
/* harmony import */ var _statusBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statusBadge */ "./components/chatList/items/statusBadge.js");
/* harmony import */ var _chatStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chatStatus */ "./components/chatList/items/chatStatus.js");
/* harmony import */ var _chatPhoto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chatPhoto */ "./components/chatList/items/chatPhoto.js");
/* harmony import */ var _chatInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chatInfo */ "./components/chatList/items/chatInfo.js");
/* harmony import */ var _chatTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chatTime */ "./components/chatList/items/chatTime.js");
/* harmony import */ var _chatItem_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chatItem.scss */ "./components/chatList/items/chatItem.scss");








function chatItem(_ref) {
  var person = _ref.person,
    message = _ref.message;
  var chatItem = document.createElement('div');
  chatItem.classList.add('chat-item');
  chatItem.append((0,_chatPhoto__WEBPACK_IMPORTED_MODULE_4__.chatPhoto)(person), (0,_chatInfo__WEBPACK_IMPORTED_MODULE_5__.chatInfo)(person, message), (0,_chatStatus__WEBPACK_IMPORTED_MODULE_3__.chatStatus)((0,_statusBadge__WEBPACK_IMPORTED_MODULE_2__.createStatusBadge)(message)), (0,_chatTime__WEBPACK_IMPORTED_MODULE_6__.chatTime)(message));
  chatItem.addEventListener('click', function () {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.markReceivedMessagesAsRead)(person.id);
    (0,_index__WEBPACK_IMPORTED_MODULE_1__.openChat)(person.id, message);
  });
  return chatItem;
}

/***/ }),

/***/ "./components/chatList/items/chatPhoto.js":
/*!************************************************!*\
  !*** ./components/chatList/items/chatPhoto.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatPhoto: () => (/* binding */ chatPhoto)
/* harmony export */ });
function chatPhoto(person) {
  var chatItemPhotoDiv = document.createElement('div');
  chatItemPhotoDiv.classList.add('chat-item__photo');
  var img = "<img src=\"".concat(person.photo, "\" alt=\"").concat(person.name, "\">");
  chatItemPhotoDiv.insertAdjacentHTML('afterbegin', img);
  return chatItemPhotoDiv;
}

/***/ }),

/***/ "./components/chatList/items/chatStatus.js":
/*!*************************************************!*\
  !*** ./components/chatList/items/chatStatus.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatStatus: () => (/* binding */ chatStatus)
/* harmony export */ });
function chatStatus(statusBadge) {
  var chatItemStatusDiv = document.createElement('div');
  chatItemStatusDiv.classList.add('chat-item__status');
  if (statusBadge) {
    chatItemStatusDiv.appendChild(statusBadge);
  }
  return chatItemStatusDiv;
}

/***/ }),

/***/ "./components/chatList/items/chatTime.js":
/*!***********************************************!*\
  !*** ./components/chatList/items/chatTime.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatTime: () => (/* binding */ chatTime)
/* harmony export */ });
function chatTime(lastMessage) {
  var lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }) : '';
  var chatItemTimeDiv = document.createElement('div');
  chatItemTimeDiv.classList.add('chat-item__time');
  chatItemTimeDiv.textContent = lastMessageTime;
  return chatItemTimeDiv;
}

/***/ }),

/***/ "./components/chatList/items/statusBadge.js":
/*!**************************************************!*\
  !*** ./components/chatList/items/statusBadge.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStatusBadge: () => (/* binding */ createStatusBadge)
/* harmony export */ });
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

/***/ }),

/***/ "./components/chatList/menu/Menu.js":
/*!******************************************!*\
  !*** ./components/chatList/menu/Menu.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Menu: () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.scss */ "./components/chatList/menu/menu.scss");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/storage */ "./utils/storage.js");
/* harmony import */ var _items_chatPhoto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../items/chatPhoto */ "./components/chatList/items/chatPhoto.js");
/* harmony import */ var _utils_themeSwitcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/themeSwitcher */ "./utils/themeSwitcher.js");




function Menu() {
  var menuBackground = document.createElement('div');
  menuBackground.classList.add('menu-background', 'slide-in-left');
  menuBackground.style.display = 'none';
  menuBackground.addEventListener('click', function (e) {
    console.log(e.target.className);
    if (e.target.classList.contains('menu-background')) {
      menuBackground.style.display = 'none';
    }
  });
  var dropdownMenu = document.createElement('div');
  dropdownMenu.classList.add('dropdown-menu');
  var user = (0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.readUserData)();
  var userPhotoItem = (0,_items_chatPhoto__WEBPACK_IMPORTED_MODULE_2__.chatPhoto)(user);
  var userDataContainer = document.createElement('div');
  userDataContainer.classList.add('user-data');
  var userNameItem = document.createElement('h2');
  userNameItem.classList.add('userName');
  userNameItem.textContent = user.name;
  userDataContainer.append(userPhotoItem, userNameItem);
  dropdownMenu.append(userDataContainer);
  var categories = [{
    name: 'Сменить тему',
    icon: "contrast"
  }, {
    name: 'Настройки',
    icon: "settings"
  }, {
    name: 'Друзья',
    icon: "group"
  }, {
    name: 'Премиум',
    icon: "workspace_premium"
  }];
  categories.forEach(function (category) {});
  dropdownMenu.append(createMenuItem(categories[0], _utils_themeSwitcher__WEBPACK_IMPORTED_MODULE_3__.ThemeSwitcher), createMenuItem(categories[1], function () {}), createMenuItem(categories[2], function () {}), createMenuItem(categories[3], function () {}));
  menuBackground.appendChild(dropdownMenu);
  return menuBackground;
}
function createMenuItem(category, onClick) {
  var menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  var text = "<span>".concat(category.name, "</span>");
  var icon = "<span class=\"material-symbols-outlined white\">".concat(category.icon, "</span>");
  menuItem.insertAdjacentHTML('afterbegin', "".concat(icon, " ").concat(text));
  menuItem.addEventListener('click', function (e) {
    onClick();
  });
  return menuItem;
}

/***/ }),

/***/ "./components/chatWindow/chatWindow.js":
/*!*********************************************!*\
  !*** ./components/chatWindow/chatWindow.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeChatWindow: () => (/* binding */ initializeChatWindow)
/* harmony export */ });
/* harmony import */ var _chatWindow_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatWindow.scss */ "./components/chatWindow/chatWindow.scss");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/storage.js */ "./utils/storage.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../index.js */ "./index.js");
/* harmony import */ var _mocks_mocks___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mocks/__mocks__ */ "./mocks/__mocks__.js");
// components/chatWindow/chatWindow.js





function initializeChatWindow(chatId, form, input, messagesList) {
  fillHeader(chatId);
  loadMessages(chatId, messagesList);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var messageText = input.value.trim();
    if (messageText) {
      var message = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.createMessageObject)(messageText, 'sent');
      (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.saveMessage)(chatId, message);
      addMessageToUI(message, messagesList, true);
      input.value = '';
      setTimeout(function () {
        var randomMessage = Math.floor(Math.random() * 100 / 10);
        simulateReceivedMessage(chatId, _mocks_mocks___WEBPACK_IMPORTED_MODULE_3__.answerMock[randomMessage], messagesList);
      }, 2000);
    }
  });
}
function fillHeader(chatId) {
  var header = document.querySelector('.header');
  var people = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.loadPeople)();
  var person = people.find(function (p) {
    return p.id === chatId;
  });
  if (person) {
    var receiverDiv = document.createElement('div');
    receiverDiv.classList.add('receiver');
    var backButton = document.createElement('button');
    backButton.classList.add('material-symbols-outlined', 'back-button', 'white');
    backButton.textContent = 'arrow_back_ios';
    backButton.onclick = function () {
      (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.closeChat)();
    };
    var receiverNameSpan = "<span class=\"receiver-name white\">".concat(person.name, "</span>");
    var receiverPhotoDiv = "<div class=\"receiver-photo\"><img \n            class=\"receiver-photo__image\" \n            src=\"".concat(person.photo, "\" \n            width=\"50px\" \n            height=\"50px\" \n            alt=\"profile\"\n        /></div>");
    receiverDiv.appendChild(backButton);
    receiverDiv.insertAdjacentHTML("beforeend", "".concat(receiverNameSpan, " ").concat(receiverPhotoDiv));
    header.appendChild(receiverDiv);
  } else {
    console.error('Пользователь не найден для chatId:', chatId);
  }
}
function getMessageId(chatId, id) {
  return "".concat(chatId, ".message_").concat(id);
}
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
  (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.markReceivedMessagesAsRead)(chatId);
  var element = document.querySelector('.foundMessage');
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}
function addMessageToUI(message, messagesList) {
  var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var messageItem = document.createElement('li');
  messageItem.classList.add('message-item', message.direction);
  if (animate) {
    messageItem.classList.add('scale-in-center');
  }
  if (message.messageId === +localStorage.getItem('to_message')) {
    messageItem.classList.add("foundMessage");
  }
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
  var messageText = document.createElement('span');
  messageText.textContent = message.text;
  messageItem.appendChild(messageText);
  if (statusIcon) messageItem.appendChild(statusIcon);
  messageItem.appendChild(timeSpan);
  messagesList.appendChild(messageItem);
  messagesList.parentElement.scrollTop = messagesList.parentElement.scrollHeight;
}
function simulateReceivedMessage(chatId, text, messagesList) {
  var message = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.createMessageObject)(text, 'received');
  (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.saveMessage)(chatId, message);
  addMessageToUI(message, messagesList, true);
}

/***/ }),

/***/ "./components/chatWindow/chatWindowView.js":
/*!*************************************************!*\
  !*** ./components/chatWindow/chatWindowView.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatWindowView: () => (/* binding */ chatWindowView)
/* harmony export */ });
/* harmony import */ var _chatWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatWindow */ "./components/chatWindow/chatWindow.js");

function chatWindowView(app, chatId) {
  var header = document.createElement('div');
  var fragment = document.createDocumentFragment();
  header.classList.add('header');
  var chatContainer = document.createElement('div');
  chatContainer.classList.add('chat-container');
  var messagesContainer = document.createElement('div');
  messagesContainer.classList.add('messages-container');
  var backgroundImages = document.createElement('div');
  backgroundImages.classList.add('background-images');
  var messagesList = document.createElement('ul');
  messagesList.classList.add('messages-list');
  var formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  var form = document.createElement('form');
  form.classList.add('form');
  form.action = '#';
  var input = document.createElement('input');
  input.classList.add('form-input');
  input.name = 'message-text';
  input.placeholder = 'Введите сообщение';
  input.type = 'text';
  var sendButton = document.createElement('button');
  sendButton.classList.add('send-btn');
  sendButton.type = 'submit';
  var sendIcon = document.createElement('span');
  sendIcon.classList.add('material-symbols-outlined', 'white');
  sendIcon.textContent = 'send';
  sendButton.appendChild(sendIcon);
  form.append(input, sendButton);
  formContainer.appendChild(form);
  messagesContainer.append(backgroundImages, messagesList);
  chatContainer.append(messagesContainer, formContainer);
  fragment.append(header, chatContainer);
  app.appendChild(fragment);
  (0,_chatWindow__WEBPACK_IMPORTED_MODULE_0__.initializeChatWindow)(chatId, form, input, messagesList);
}

/***/ }),

/***/ "./components/modal/modal.js":
/*!***********************************!*\
  !*** ./components/modal/modal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeModal: () => (/* binding */ initializeModal)
/* harmony export */ });
/* harmony import */ var _modal_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.scss */ "./components/modal/modal.scss");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/storage.js */ "./utils/storage.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../index */ "./index.js");




// window of creating new chat
function initializeModal() {
  var createChatButton = document.querySelector('.create-chat-button');
  var modal = document.getElementById('create-chat-modal');
  var closeButton = document.querySelector('.close-button');
  var createChatConfirm = document.getElementById('create-chat-confirm');
  var newNameInput = document.getElementById('new-person-name');
  var photoPreview = modal.querySelector('#photo-preview');
  var fileInput = modal.querySelector('#new-person-photo');
  createChatButton.addEventListener('click', function () {
    return openModal(modal);
  });
  closeButton.addEventListener('click', function () {
    return closeModal(modal, newNameInput);
  });
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
  createChatConfirm.addEventListener('click', function () {
    handleCreateChat(newNameInput, modal);
  });
  modal.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      handleCreateChat(newNameInput, modal);
    }
  });
  photoPreview.addEventListener('click', function () {
    fileInput.click();
  });
  fileInput.addEventListener('change', function (event) {
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        photoPreview.style.backgroundImage = "url(".concat(e.target.result, ")");
        photoPreview.classList.add('has-image');
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });
}
function openModal(modal) {
  modal.style.display = 'block';
}
function closeModal(modal) {
  modal.style.display = 'none';
  var inputs = modal.querySelectorAll('input');
  inputs.forEach(function (input) {
    return input.value = '';
  });
  var photoPreview = modal.querySelector('#photo-preview');
  photoPreview.style.backgroundImage = '';
  photoPreview.classList.remove('has-image');
  var fileInput = modal.querySelector('#new-person-photo');
  fileInput.value = '';
}
function handleCreateChat(newNameInput, modal) {
  var newPersonName = newNameInput.value.trim();
  var fileInput = document.getElementById('new-person-photo');
  var selectedFile = fileInput.files[0]; // Получаем выбранный файл
  var people = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_1__.loadPeople)();
  if (newPersonName === '') {
    alert('Пожалуйста, введите имя пользователя.');
    return;
  }
  var existingPerson = people.find(function (person) {
    return person.name.toLowerCase() === newPersonName.toLowerCase();
  });
  if (existingPerson) {
    alert('Пользователь с таким именем уже существует.');
    return;
  }
  var createNewPerson = function createNewPerson(photoUrl) {
    var newPerson = {
      id: Date.now().toString(),
      name: newPersonName,
      photo: photoUrl
    };
    people.push(newPerson);
    try {
      localStorage.setItem('people', JSON.stringify(people));
    } catch (e) {
      if (e.code === 22) {
        alert('Локальное хранилище заполнено. Невозможно сохранить данные.');
        return;
      }
    }
    closeModal(modal, newNameInput);
    (0,_index__WEBPACK_IMPORTED_MODULE_2__.openChat)(newPerson.id);
  };
  if (selectedFile) {
    var reader = new FileReader();
    reader.onload = function (event) {
      createNewPerson(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  } else {
    // default pic
    createNewPerson('https://picsum.photos/50/50?random=2');
  }
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeChat: () => (/* binding */ closeChat),
/* harmony export */   openChat: () => (/* binding */ openChat)
/* harmony export */ });
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./index.scss");
/* harmony import */ var _components_chatList_chatListView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/chatList/chatListView */ "./components/chatList/chatListView.js");
/* harmony import */ var _components_chatWindow_chatWindowView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/chatWindow/chatWindowView */ "./components/chatWindow/chatWindowView.js");



function renderApp() {
  var app = document.getElementById('app');
  var theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  app.innerHTML = '';
  var currentChatId = localStorage.getItem('currentChatId');
  if (currentChatId) {
    (0,_components_chatWindow_chatWindowView__WEBPACK_IMPORTED_MODULE_2__.chatWindowView)(app, currentChatId);
  } else {
    (0,_components_chatList_chatListView__WEBPACK_IMPORTED_MODULE_1__.chatListView)(app);
  }
}
function openChat(chatId) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  localStorage.setItem('currentChatId', chatId);
  if (message) {
    localStorage.setItem('to_message', message.messageId);
  }
  renderApp();
}
function closeChat() {
  localStorage.removeItem('currentChatId');
  renderApp();
  localStorage.setItem('to_message', null);
}
document.addEventListener('DOMContentLoaded', function () {
  renderApp();
});

/***/ }),

/***/ "./mocks/__mocks__.js":
/*!****************************!*\
  !*** ./mocks/__mocks__.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   answerMock: () => (/* binding */ answerMock),
/* harmony export */   initialPeople: () => (/* binding */ initialPeople),
/* harmony export */   userData: () => (/* binding */ userData)
/* harmony export */ });
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
var answerMock = ["\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u2014 \u044D\u0442\u043E \u0433\u043E\u043D\u043A\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u0432 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C, \u0441\u0442\u0440\u0435\u043C\u044F\u0449\u0438\u0445\u0441\u044F \u043F\u0438\u0441\u0430\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0441 \u0431\u043E\u043B\u044C\u0448\u0435\u0439 \u0438 \u043B\u0443\u0447\u0448\u0435\u0439 \n    \u0438\u0434\u0438\u043E\u0442\u043E\u0443\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u043E\u0441\u0442\u044C\u044E, \u0438 \u0432\u0441\u0435\u043B\u0435\u043D\u043D\u043E\u0439, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u044B\u0442\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0442\u0431\u043E\u0440\u043D\u044B\u0445 \u0438\u0434\u0438\u043E\u0442\u043E\u0432. \u041F\u043E\u043A\u0430 \u0432\u0441\u0435\u043B\u0435\u043D\u043D\u0430\u044F \u043F\u043E\u0431\u0435\u0436\u0434\u0430\u0435\u0442\n     (c) Rick Cook", "\u041D\u0438\u0437\u043A\u043E\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u044B\u0439 \u044F\u0437\u044B\u043A \u2014 \u044D\u0442\u043E \u043A\u043E\u0433\u0434\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u043A \u0432\u0435\u0449\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0438\u043A\u0430\u043A \u043D\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u044B \u0441 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430\u043C\u0438 \u043D\u0430 \u044D\u0442\u043E\u043C \u044F\u0437\u044B\u043A\u0435.\n     (c) Alan J. Perlis", "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0430 \u0421 \u043F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u0431\u044B\u0441\u0442\u0440\u044B\u0435 \u0442\u0430\u043D\u0446\u044B \u043D\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E \u043E\u0442\u043F\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u043C \u043F\u043E\u043B\u0443 \u043B\u044E\u0434\u0435\u0439 \u0441 \u043E\u0441\u0442\u0440\u044B\u043C\u0438 \u0431\u0440\u0438\u0442\u0432\u0430\u043C\u0438 \u0432 \u0440\u0443\u043A\u0430\u0445.\n     (c) Waldi Ravens", "\u041D\u0435 \u0432\u043E\u043B\u043D\u0443\u0439\u0442\u0435\u0441\u044C, \u0435\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442. \u0415\u0441\u043B\u0438 \u0431\u044B \u0432\u0441\u0451 \u0440\u0430\u0431\u043E\u0442\u0430\u043B\u043E, \u0432\u0430\u0441 \u0431\u044B \u0443\u0432\u043E\u043B\u0438\u043B\u0438.\n     (c) Mosher\u2019s Law of Software Engineering", "\u0412 \u0445\u043E\u0440\u043E\u0448\u0435\u043C \u0434\u0438\u0437\u0430\u0439\u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0447\u0435\u0433\u043E-\u0442\u043E \u0441\u0442\u043E\u0438\u0442 \u0434\u0435\u0448\u0435\u0432\u043B\u0435, \u0447\u0435\u043C \u0441\u0430\u043C\u0430 \u044D\u0442\u0430 \u0432\u0435\u0449\u044C.\n     (c) Thomas C. Gale", "\u0412 \u0442\u0435\u043E\u0440\u0438\u0438, \u0442\u0435\u043E\u0440\u0438\u044F \u0438 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \u043D\u0435\u0440\u0430\u0437\u0434\u0435\u043B\u0438\u043C\u044B. \u041D\u0430 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0435 \u044D\u0442\u043E \u043D\u0435 \u0442\u0430\u043A.\n    (c) Yoggi Berra", "\u0418\u043D\u043E\u0433\u0434\u0430 \u043B\u0443\u0447\u0448\u0435 \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u0441\u043F\u0430\u0442\u044C \u0434\u043E\u043C\u0430 \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A, \u0447\u0435\u043C \u043F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 \u0432\u0441\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0432 \u043E\u0442\u043B\u0430\u0434\u043A\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043D\u043E\u0433\u043E \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043A\u043E\u0434\u0430.\n    (c) Christopher Thompson", "\u0412\u0441\u0435\u0433\u0434\u0430 \u043F\u0438\u0448\u0438\u0442\u0435 \u043A\u043E\u0434 \u0442\u0430\u043A, \u0431\u0443\u0434\u0442\u043E \u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0430\u0442\u044C \u0435\u0433\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u043A\u043B\u043E\u043D\u043D\u044B\u0439 \u043A \u043D\u0430\u0441\u0438\u043B\u0438\u044E \u043F\u0441\u0438\u0445\u043E\u043F\u0430\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0437\u043D\u0430\u0435\u0442, \u0433\u0434\u0435 \u0432\u044B \u0436\u0438\u0432\u0435\u0442\u0435.\n    (c) Martin Golding", "\u042F\u0437\u044B\u043A, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043D\u0435 \u043C\u0435\u043D\u044F\u0435\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043D\u0435\u0434\u043E\u0441\u0442\u043E\u0438\u043D \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044F.\n    (c) Alan J. Perlis", "\u041F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 5\n    (c) \u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C"];
function userData() {
  return {
    id: 'me',
    name: 'Super User',
    photo: 'https://picsum.photos/50/50?random=3'
  };
}

/***/ }),

/***/ "./utils/search.js":
/*!*************************!*\
  !*** ./utils/search.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleSearch: () => (/* binding */ handleSearch)
/* harmony export */ });
/* harmony import */ var _components_chatList_chatList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/chatList/chatList */ "./components/chatList/chatList.js");

var searchTimeout = null;
function handleSearch(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(function () {
    (0,_components_chatList_chatList__WEBPACK_IMPORTED_MODULE_0__.chatList)(query);
  }, 300);
}

/***/ }),

/***/ "./utils/storage.js":
/*!**************************!*\
  !*** ./utils/storage.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMessageObject: () => (/* binding */ createMessageObject),
/* harmony export */   getAllMessages: () => (/* binding */ getAllMessages),
/* harmony export */   getLastMessage: () => (/* binding */ getLastMessage),
/* harmony export */   loadPeople: () => (/* binding */ loadPeople),
/* harmony export */   markReceivedMessagesAsRead: () => (/* binding */ markReceivedMessagesAsRead),
/* harmony export */   readUserData: () => (/* binding */ readUserData),
/* harmony export */   saveMessage: () => (/* binding */ saveMessage)
/* harmony export */ });
/* harmony import */ var _mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mocks/__mocks__.js */ "./mocks/__mocks__.js");

function loadPeople() {
  var storedPeople = JSON.parse(localStorage.getItem('people'));
  if (storedPeople && Array.isArray(storedPeople)) {
    return storedPeople;
  } else {
    localStorage.setItem('people', JSON.stringify(_mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__.initialPeople));
    return _mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__.initialPeople;
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

// to localStorage
function saveMessage(chatId, message) {
  var lastMessageId = parseInt(localStorage.getItem("".concat(chatId, ".lastMessageId"))) || 0;
  lastMessageId += 1;
  message.messageId = lastMessageId;
  localStorage.setItem("".concat(chatId, ".message_").concat(lastMessageId), JSON.stringify(message));
  localStorage.setItem("".concat(chatId, ".lastMessageId"), "".concat(lastMessageId));
}

// all messages from chat with personId
function getAllMessages(personId) {
  var messages = [];
  var prefix = "".concat(personId, ".message_");
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      var message = JSON.parse(localStorage.getItem(key));
      messages.push(message);
    }
  }
  return messages;
}
function readUserData() {
  return (0,_mocks_mocks_js__WEBPACK_IMPORTED_MODULE_0__.userData)();
}

/***/ }),

/***/ "./utils/themeSwitcher.js":
/*!********************************!*\
  !*** ./utils/themeSwitcher.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeSwitcher: () => (/* binding */ ThemeSwitcher)
/* harmony export */ });
function ThemeSwitcher() {
  var theme = localStorage.getItem('theme') || 'light';
  var newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/chatList.scss":
/*!**************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/chatList.scss ***!
  \**************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#chat-list {
  padding: 10px;
  height: 100%;
}

.chat-list-view {
  background-color: var(--color-background);
}

.material-symbols-outlined {
  font-size: 18px;
  vertical-align: middle;
  margin-left: 5px;
}

.plus {
  margin-left: 0;
}`, "",{"version":3,"sources":["webpack://./components/chatList/chatList.scss","webpack://./variables.scss"],"names":[],"mappings":"AAGA;EACE,aAAA;EACA,YAAA;AAFF;;AAKA;EACE,yCCNiB;ADInB;;AAKA;EACE,eAAA;EACA,sBAAA;EACA,gBAAA;AAFF;;AAKA;EACE,cAAA;AAFF","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/createChatButton/createChatButton.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/createChatButton/createChatButton.scss ***!
  \***************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.create-chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007aff;
  color: var(--color-light);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(var(--color-dark), 0.1);
  transition: background-color 0.2s ease;
}
.create-chat-button:hover {
  background-color: #0051a8;
}`, "",{"version":3,"sources":["webpack://./components/chatList/createChatButton/createChatButton.scss","webpack://./variables.scss","webpack://./mixins.scss"],"names":[],"mappings":"AAGA;EACE,eAAA;EACA,YAAA;EACA,WAAA;EACA,yBAAA;EACA,yBCFY;EDGZ,YAAA;EEMA,kBDMmB;EDVnB,WAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;EEKA,kDAAA;EAIA,sCAAA;AFTF;AAIE;EACE,yBAAA;AAFJ","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/header/chatListHeader.scss":
/*!***************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/header/chatListHeader.scss ***!
  \***************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.menu-button {
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.search-button {
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.search-button:hover {
  transform: scale(1.2);
}

.search-input {
  width: 80%;
  height: 40px;
  border: 1px solid var(--color-gray);
  outline: none;
  border-radius: 15px;
  padding-left: 10px;
  background-color: transparent;
  color: #fff;
}
.search-input::placeholder {
  color: var(--color-gray);
}

.scale-in-hor-right {
  animation: scale-in-hor-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes scale-in-hor-right {
  0% {
    transform: scaleX(0);
    transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    transform-origin: 100% 100%;
    opacity: 1;
  }
}
.scale-out-hor-right {
  animation: scale-out-hor-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes scale-out-hor-right {
  0% {
    transform: scaleX(1);
    transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    transform-origin: 100% 100%;
    opacity: 1;
  }
}`, "",{"version":3,"sources":["webpack://./components/chatList/header/chatListHeader.scss","webpack://./mixins.scss","webpack://./variables.scss"],"names":[],"mappings":"AAGA;ECKE,aAAA;EACA,YAAA;EACA,6BAAA;EACA,eAAA;ADNF;;AAEA;ECCE,aAAA;EACA,YAAA;EACA,6BAAA;EACA,eAAA;EAYA,+BAAA;ADVF;AAFE;EACE,qBAAA;AAIJ;;AAAA;EACE,UAAA;EACA,YAAA;EACA,mCAAA;EACA,aAAA;ECLA,mBDMuB;EACvB,kBAAA;EACA,6BAAA;EACA,WAAA;AAGF;AADE;EACE,wBEnBS;AFsBb;;AACA;ECJE,4EAAA;ADOF;;ACHE;EDKA;IACE,oBAAA;IACA,2BAAA;IACA,UAAA;EAEF;EAAA;IACE,oBAAA;IACA,2BAAA;IACA,UAAA;EAEF;AACF;AACA;ECrBE,6EAAA;ADuBF;;ACnBE;EDsBA;IACE,oBAAA;IACA,2BAAA;IACA,UAAA;EACF;EACA;IACE,oBAAA;IACA,2BAAA;IACA,UAAA;EACF;AACF","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/items/chatItem.scss":
/*!********************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/items/chatItem.scss ***!
  \********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.chat-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid var(--color-gray);
  background-color: var(--color-background);
}
.chat-item:hover {
  background-color: var(--color-background-darken);
}
.chat-item__photo {
  margin-right: 10px;
}
.chat-item__photo img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.chat-item__info {
  flex-grow: 1;
}
.chat-item__name {
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.chat-item__last-message {
  color: var(--color-text);
  margin-top: 5px;
}
.chat-item__status {
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.chat-item__time {
  font-size: 12px;
  color: var(--color-gray);
  margin-left: 10px;
  white-space: nowrap;
  align-self: flex-start;
}

.unread-count {
  background-color: gray;
  color: var(--color-light);
  border-radius: 50%;
  font-size: 12px;
  height: 20px;
  width: 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.message-status-icon {
  align-self: flex-start;
}`, "",{"version":3,"sources":["webpack://./components/chatList/items/chatItem.scss","webpack://./mixins.scss","webpack://./variables.scss"],"names":[],"mappings":"AAGA;ECFE,aAAA;EACA,mBAF6B;EAG7B,2BDC+B;ECA/B,mBAJ4D;EDK5D,mBAAA;EACA,aAAA;EACA,eAAA;EACA,0CAAA;EACA,yCENiB;AFOnB;AAEE;EACE,gDETsB;AFS1B;AAGE;EACE,kBAAA;AADJ;AAGI;ECJF,kBCMmB;EFAf,WAAA;EACA,YAAA;EACA,iBAAA;AADN;AAKE;EACE,YAAA;AAHJ;AAME;EACE,iBAAA;EC/BF,aAAA;EACA,mBAF6B;EAG7B,2BD8BiC;EC7BjC,mBAJ4D;ADgC9D;AAIE;EACE,wBEhCS;EFiCT,eAAA;AAFJ;AAKE;EACE,iBAAA;ECzCF,aAAA;EACA,mBAF6B;EAG7B,uBAH4C;EAI5C,mBAJ4D;AD2C9D;AAGE;EACE,eAAA;EACA,wBExCS;EFyCT,iBAAA;EACA,mBAAA;EACA,sBAAA;AADJ;;AAKA;EACE,sBAAA;EACA,yBEnDY;EDSZ,kBCMmB;EFsCnB,eAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EC7DA,aAAA;EACA,mBAF6B;EAG7B,uBAH4C;EAI5C,mBAJ4D;ADgE9D;;AAEA;EACE,sBAAA;AACF","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/menu/menu.scss":
/*!***************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/menu/menu.scss ***!
  \***************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: none;
}

.dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-primary);
  border-radius: 0 5px 5px 0;
  box-shadow: 0 4px 8px rgba(var(--color-dark), 0.2);
  z-index: 10;
  width: 200px;
  height: 100vh;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.user-data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.userName {
  color: var(--color-light);
}

.menu-item {
  width: 100%;
  text-align: start;
  padding: 10px;
  color: var(--color-light);
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-primary-darken);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.menu-item:hover {
  background-color: var(--color-primary-darken);
}

.slide-in-left {
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}`, "",{"version":3,"sources":["webpack://./components/chatList/menu/menu.scss","webpack://./variables.scss","webpack://./mixins.scss"],"names":[],"mappings":"AAIA;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,6BAAA;EACA,aAAA;AAHF;;AAMA;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,sCClBc;ECed,0BFIuB;EEAvB,kDAAA;EFEA,WAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;EEvBA,aAAA;EACA,sBFuBqB;EEtBrB,2BFsB6B;EErB7B,mBFqByC;AAA3C;;AAGA;EE3BE,aAAA;EACA,sBF2BqB;EE1BrB,2BF0B6B;EEzB7B,mBFyByC;AAG3C;;AAAA;EACE,yBC3BY;AD8Bd;;AAAA;EACE,WAAA;EACA,iBAAA;EACA,aAAA;EACA,yBClCY;EDmCZ,eAAA;EACA,6BAAA;EACA,YAAA;EACA,oDAAA;EE3CA,aAAA;EACA,mBF2CqB;EE1CrB,2BF0C0B;EEzC1B,mBFyCsC;EACtC,SAAA;AAMF;AAJE;EACE,6CChDmB;ADsDvB;;AAFA;EE1BE,uEAAA;AFgCF;;AE5BE;EF2BA;IACE,8BAAA;IACA,UAAA;EAKF;EAHA;IACE,wBAAA;IACA,UAAA;EAKF;AACF","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatWindow/chatWindow.scss":
/*!******************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatWindow/chatWindow.scss ***!
  \******************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --color-primary: #006bbf;
  --color-primary-darken: #015da4;
  --color-secondary: #93b58b;
  --color-background: #ffffff;
  --color-background-darken: #f1f1f1;
  --color-text: #333;
  --color-light: #fff;
  --color-dark: #000;
  --color-gray: #999;
  --color-gray-darken: #858585;
  --color-received: #fff;
  --color-sent: #dcf8c6;
}

[data-theme=dark] {
  --color-primary: #1a1a1a;
  --color-primary-darken: #151515;
  --color-secondary: #333;
  --color-background: #1e1f22;
  --color-background-darken: #17181a;
  --color-text: #e0e0e0;
  --color-light: #ccc;
  --color-dark: #fff;
  --color-gray: #666;
  --color-gray-darken: #5d5c5c;
  --color-received: #1e1f22;
  --color-sent: #214182;
}

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: calc(100vh - 60px);
}

.messages-container {
  width: 100%;
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background: var(--color-secondary);
  position: relative;
}

.messages-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.message-item {
  background-color: lightblue;
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px 40px 10px 15px;
  box-shadow: 0 1px 3px rgba(var(--color-dark), 0.1);
  position: relative;
  word-wrap: break-word;
  align-self: flex-start;
  border-radius: 10px;
  min-width: 60px;
}
.message-item.sent {
  align-self: flex-end;
  background-color: var(--color-sent);
  color: var(--color-text);
}
.message-item.sent::before {
  border-bottom-left-radius: 12px 11px;
  border-right: 16px solid var(--color-sent);
  right: -5px;
  transform: translate(0, -2px);
}
.message-item.sent::after {
  background-color: var(--color-secondary);
  border-bottom-left-radius: 6px;
  right: -40px;
  transform: translate(-30px, -2px);
  width: 10px;
}
.message-item.received {
  align-self: flex-start;
  background-color: var(--color-received);
}
.message-item.received::after {
  background-color: var(--color-secondary);
  border-bottom-right-radius: 8px;
  left: -40px;
  transform: translate(30px, -2px);
  width: 10px;
}
.message-item.received::before {
  border-bottom-right-radius: 12px 11px;
  border-left: 16px solid var(--color-received);
  left: -5px;
  transform: translate(0, -1px);
}
.message-item .time {
  font-size: 10px;
  color: var(--color-gray);
  position: absolute;
  bottom: 5px;
  right: 10px;
}
.message-item .material-symbols-outlined {
  font-size: 16px;
  vertical-align: middle;
  margin-left: 5px;
}

.message-item::after,
.message-item::before {
  bottom: -2px;
  content: "";
  height: 16px;
  position: absolute;
}

.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  border-radius: 25px;
  padding: 0 10px;
  background-color: var(--color-background);
  border: 1px solid var(--color-gray);
}
.form-container {
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.form-input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: transparent;
  font-size: 14px;
  word-wrap: break-word;
  margin-right: 10px;
  color: var(--color-text);
}

.send-btn {
  background-color: #4d8de3;
  height: 30px;
  width: 30px;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}
.send-btn:hover {
  background-color: var(--color-primary);
}
.send-btn .material-symbols-outlined {
  font-size: 20px;
  color: var(--color-light);
}

.receiver {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.receiver .material-symbols-outlined {
  margin-right: 10px;
}
.receiver-name {
  font-size: 18px;
  font-weight: 500;
  color: var(--color-light);
  flex-grow: 1;
  text-align: center;
}
.receiver-photo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.receiver-photo__image {
  border-radius: 50%;
  object-fit: cover;
  width: 40px;
  height: 40px;
}

.scale-in-center {
  animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes scale-in-center {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}`, "",{"version":3,"sources":["webpack://./themes.scss","webpack://./components/chatWindow/chatWindow.scss","webpack://./mixins.scss","webpack://./variables.scss"],"names":[],"mappings":"AACA;EACE,wBAAA;EACA,+BAAA;EACA,0BAAA;EACA,2BAAA;EACA,kCAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,4BAAA;EACA,sBAAA;EACA,qBAAA;ACAF;;ADGA;EACE,wBAAA;EACA,+BAAA;EACA,uBAAA;EACA,2BAAA;EACA,kCAAA;EACA,qBAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,4BAAA;EACA,yBAAA;EACA,qBAAA;ACAF;;AAxBA;ECHE,aAAA;EACA,sBDGqB;ECFrB,yBDE6B;ECD7B,mBAJ4D;EDM5D,0BAAA;AA8BF;;AA3BA;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,kCEZgB;EFahB,kBAAA;AA8BF;;AA3BA;EACE,qBAAA;EACA,UAAA;EACA,SAAA;ECpBA,aAAA;EACA,sBDoBqB;ECnBrB,uBAH4C;EAI5C,mBAJ4D;ADuD9D;;AA9BA;EACE,2BAAA;EACA,cAAA;EACA,mBAAA;EACA,4BAAA;ECVA,kDAAA;EDYA,kBAAA;EACA,qBAAA;EACA,sBAAA;EClBA,mBCIqB;EFgBrB,eAAA;AAiCF;AA/BE;EACE,oBAAA;EACA,mCE5BS;EF6BT,wBEnCS;AFoEb;AA/BI;EACE,oCAAA;EACA,0CAAA;EACA,WAAA;EACA,6BAAA;AAiCN;AA9BI;EACE,wCEhDY;EFiDZ,8BAAA;EACA,YAAA;EACA,iCAAA;EACA,WAAA;AAgCN;AA5BE;EACE,sBAAA;EACA,uCElDa;AFgFjB;AA5BI;EACE,wCE7DY;EF8DZ,+BAAA;EACA,WAAA;EACA,gCAAA;EACA,WAAA;AA8BN;AA3BI;EACE,qCAAA;EACA,6CAAA;EACA,UAAA;EACA,6BAAA;AA6BN;AAzBE;EACE,eEhEc;EFiEd,wBExES;EFyET,kBAAA;EACA,WAAA;EACA,WAAA;AA2BJ;AAxBE;EACE,eAAA;EACA,sBAAA;EACA,gBAAA;AA0BJ;;AArBA;;EAEE,YAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;AAwBF;;AArBA;ECrGE,aAAA;EACA,mBAF6B;EAG7B,uBAH4C;EAI5C,mBAJ4D;EDwG5D,WAAA;EACA,gBAAA;EC1FA,mBCKoB;EFuFpB,eAAA;EACA,yCEzGiB;EF0GjB,mCAAA;AA2BF;AAzBE;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,yCEhHe;EDFjB,aAAA;EACA,mBAF6B;EAG7B,uBAH4C;EAI5C,mBAJ4D;ADkJ9D;AA3BE;EACE,YAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EC5GF,mBD6GyB;EACvB,6BAAA;EACA,eAAA;EACA,qBAAA;EACA,kBAAA;EACA,wBE5HS;AFyJb;;AAzBA;EACE,yBAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EC3HA,kBCMmB;EFuHnB,eAAA;EC3IA,aAAA;EACA,mBAF6B;EAG7B,uBAH4C;EAI5C,mBAJ4D;EAuB5D,sCAAA;ADsJF;AA7BE;EACE,sCEjJY;AFgLhB;AA5BE;EACE,eAAA;EACA,yBEhJU;AF8Kd;;AAzBA;EC1JE,aAAA;EACA,mBAF6B;EAG7B,8BDyJ+B;ECxJ/B,mBAJ4D;ED6J5D,WAAA;AA+BF;AA7BE;EACE,kBAAA;AA+BJ;AA5BE;EACE,eEpJc;EFqJd,gBAAA;EACA,yBEhKU;EFiKV,YAAA;EACA,kBAAA;AA8BJ;AA3BE;EC1KA,aAAA;EACA,mBAF6B;EAG7B,uBAH4C;EAI5C,mBAJ4D;AD4M9D;AA9BI;EC/JF,kBCMmB;EF2Jf,iBAAA;EACA,WAAA;EACA,YAAA;AAgCN;;AA1BA;EC7JE,yEAAA;AD2LF;;ACvLE;ED8JA;IACE,mBAAA;IACA,UAAA;EA6BF;EA3BA;IACE,mBAAA;IACA,UAAA;EA6BF;AACF","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/modal/modal.scss":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/modal/modal.scss ***!
  \********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal-content {
  background-color: var(--color-background);
  margin: 100px auto;
  padding: 20px 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #000;
}

.photo-preview {
  color: var(--color-text);
  width: 100px;
  height: 100px;
  background-color: var(--color-gray-darken);
  border-radius: 50%;
  margin: 0 auto 20px auto;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.photo-preview:hover {
  opacity: 1;
}

.photo-preview::after {
  content: "Выберите фото";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.photo-preview.has-image::after {
  content: "";
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #aaa;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: #000;
}

#new-person-name {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  outline: none;
  color: var(--color-text);
  background-color: var(--color-background);
}

#new-person-name:focus {
  border-color: #66afe9;
}

#create-chat-confirm {
  background-color: #0088cc;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
}

#create-chat-confirm:hover {
  background-color: #007ab8;
}

@media screen and (max-width: 480px) {
  .modal-content {
    margin: 50px auto;
    width: 90%;
  }
}`, "",{"version":3,"sources":["webpack://./components/modal/modal.scss","webpack://./variables.scss","webpack://./mixins.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAGhB;EACE,aAAA;EACA,eAAA;EACA,aAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,oCAAA;AADF;AAGE;EACE,yCCZe;EDaf,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,UAAA;EACA,gBAAA;EACA,yCAAA;EACA,kBAAA;EErBF,aAAA;EACA,sBFqBuB;EEpBvB,uBAH4C;EAI5C,mBAJ4D;AFyB9D;AACE;EEzBA,aAAA;EACA,mBFyBuB;EExBvB,uBAH4C;EAI5C,mBAJ4D;EF4B1D,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,WAAA;AAIJ;;AAAA;EACE,wBChCW;EDiCX,YAAA;EACA,aAAA;EACA,0CC/BkB;EDgClB,kBAAA;EACA,wBAAA;EACA,sBAAA;EACA,2BAAA;EACA,eAAA;EACA,YAAA;EACA,wBAAA;AAGF;;AAAA;EACE,UAAA;AAGF;;AACA;EACE,wBAAA;EEvDA,aAAA;EACA,sBFuDqB;EEtDrB,uBAH4C;EAI5C,mBAJ4D;EF0D5D,YAAA;EACA,kBAAA;AAKF;;AAFA;EACE,WAAA;AAKF;;AAFA;EACE,kBAAA;EACA,SAAA;EACA,WAAA;EACA,WAAA;EACA,eAAA;EACA,iBAAA;EACA,eAAA;AAKF;;AAFA;;EAEE,WAAA;AAKF;;AADA;EACE,WAAA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,yBAAA;EACA,kBAAA;EACA,aAAA;EACA,wBCrFW;EDsFX,yCCxFiB;AD4FnB;;AADA;EACE,qBAAA;AAIF;;AADA;EACE,yBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,eAAA;EACA,kBAAA;EACA,WAAA;AAIF;;AADA;EACE,yBAAA;AAIF;;AADA;EACE;IACE,iBAAA;IACA,UAAA;EAIF;AACF","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./index.scss":
/*!********************!*\
  !*** ./index.scss ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./components/chatList/chatList.scss":
/*!*******************************************!*\
  !*** ./components/chatList/chatList.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatList_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./chatList.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/chatList.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatList_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatList_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatList_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatList_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./components/chatList/createChatButton/createChatButton.scss":
/*!********************************************************************!*\
  !*** ./components/chatList/createChatButton/createChatButton.scss ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_createChatButton_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./createChatButton.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/createChatButton/createChatButton.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_createChatButton_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_createChatButton_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_createChatButton_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_createChatButton_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./components/chatList/header/chatListHeader.scss":
/*!********************************************************!*\
  !*** ./components/chatList/header/chatListHeader.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatListHeader_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./chatListHeader.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/header/chatListHeader.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatListHeader_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatListHeader_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatListHeader_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatListHeader_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./components/chatList/items/chatItem.scss":
/*!*************************************************!*\
  !*** ./components/chatList/items/chatItem.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatItem_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./chatItem.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/items/chatItem.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatItem_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatItem_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatItem_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatItem_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./components/chatList/menu/menu.scss":
/*!********************************************!*\
  !*** ./components/chatList/menu/menu.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_menu_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./menu.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatList/menu/menu.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_menu_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_menu_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_menu_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_menu_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./components/chatWindow/chatWindow.scss":
/*!***********************************************!*\
  !*** ./components/chatWindow/chatWindow.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatWindow_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./chatWindow.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/chatWindow/chatWindow.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatWindow_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatWindow_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatWindow_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chatWindow_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./components/modal/modal.scss":
/*!*************************************!*\
  !*** ./components/modal/modal.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_modal_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./modal.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./components/modal/modal.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_modal_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_modal_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_modal_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_modal_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map