import './menu.scss'
import {readUserData} from "../../../utils/storage";
import {chatPhoto} from "../items/chatPhoto";
import {ThemeSwitcher} from "../../../utils/themeSwitcher";


export function Menu() {
    const menuBackground = document.createElement('div');
    menuBackground.classList.add('menu-background', 'slide-in-left');
    menuBackground.style.display = 'none';
    menuBackground.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu-background')) {
            menuBackground.style.display = 'none';
        }
    })


    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');

    const user = readUserData();

    const userPhotoItem = chatPhoto(user);
    const userDataContainer = document.createElement('div');
    userDataContainer.classList.add('user-data');
    const userNameItem = document.createElement('h2');
    userNameItem.classList.add('userName');
    userNameItem.textContent = user.name;
    userDataContainer.append(userPhotoItem, userNameItem);
    dropdownMenu.append(userDataContainer);


    const categories = [
        {name: 'Сменить тему', icon: "contrast"},
        {name: 'Настройки', icon: "settings"},
        {name: 'Друзья', icon: "group"},
        {name: 'Премиум', icon: "workspace_premium"},
    ];


    categories.forEach(category => {

    });

    dropdownMenu.append(createMenuItem(categories[0], ThemeSwitcher),
        createMenuItem(categories[1], () => {}),
        createMenuItem(categories[2], () => {}),
        createMenuItem(categories[3], () => {})
    );

    menuBackground.appendChild(dropdownMenu);
    return menuBackground;
}

function createMenuItem(category, onClick) {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    const text = `<span>${category.name}</span>`;
    const icon = `<span class="material-symbols-outlined white">${category.icon}</span>`;
    menuItem.insertAdjacentHTML('afterbegin', `${icon} ${text}`);
    menuItem.addEventListener('click', (e) => {
        onClick()
    })
    return menuItem;
}

