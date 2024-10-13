import './menu.scss'
import {readUserData} from "../../../utils/storage";
import {chatPhoto} from "../items/chatPhoto";
import {ThemeSwitcher} from "../../../utils/themeSwitcher";


export function Menu() {
    const menuBackground = document.createElement('div');
    menuBackground.classList.add('menu-background', 'slide-in-left');
    menuBackground.style.display = 'none';
    menuBackground.addEventListener('click', (e) => {
        console.log(e.target.className);
        if (e.target.classList.contains('menu-background')) {
            menuBackground.style.display = 'none';
        }
    })


    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');

    // Элементы меню как div
    const user = readUserData();

    const userPhotoItem = chatPhoto(user);
    const userDataContainer = document.createElement('div');
    userDataContainer.classList.add('user-data');
    const userNameItem = document.createElement('h2');
    userNameItem.classList.add('userName');
    userNameItem.textContent = user.name;
    userDataContainer.appendChild(userPhotoItem);
    userDataContainer.appendChild(userNameItem);
    dropdownMenu.append(userDataContainer);


    const categories = [
        {name: 'Сменить тему', icon: "contrast"},
        {name: 'Настройки', icon: "settings"},
        {name: 'Друзья', icon: "group"},
        {name: 'Премиум', icon: "workspace_premium"},
    ];


    categories.forEach(category => {

    });

    dropdownMenu.appendChild(createMenuItem(categories[0], ThemeSwitcher));
    dropdownMenu.appendChild(createMenuItem(categories[1], () => {
    }));
    dropdownMenu.appendChild(createMenuItem(categories[2], () => {
    }));
    dropdownMenu.appendChild(createMenuItem(categories[3], () => {
    }));

    menuBackground.appendChild(dropdownMenu);
    return menuBackground;
}

function createMenuItem(category, onClick) {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    const text = document.createElement('span');
    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'white');
    icon.textContent = category.icon;
    text.textContent = category.name;
    menuItem.appendChild(icon);
    menuItem.appendChild(text);
    menuItem.addEventListener('click', (e) => {
        onClick()
    })
    return menuItem;
}

