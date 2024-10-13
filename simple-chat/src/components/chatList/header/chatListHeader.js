import {Menu} from "../menu/Menu";
import './chatListHeader.scss'

export function chatListHeader(onSearch) {
    const header = document.createElement('div');
    header.classList.add('header');

    const menuIcon = document.createElement('button');
    menuIcon.classList.add('material-symbols-outlined', 'white', 'menu-button');
    menuIcon.textContent = 'menu';
    const dropdownMenu = Menu();
    menuIcon.addEventListener('click', () => {

        if (dropdownMenu.style.display === 'none') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
    header.appendChild(dropdownMenu);

    const title = document.createElement('h2');
    title.classList.add('white');
    title.textContent = 'Artemgram';

    const searchIcon = document.createElement('button');
    searchIcon.classList.add('search-button');
    searchIcon.classList.add('material-symbols-outlined', 'white');
    searchIcon.textContent = 'search';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.classList.add('search-input');

    searchInput.style.display = 'none'; // Hidden initially

    searchIcon.addEventListener('click', () => {
        if (searchInput.style.display === 'none') {
            searchInput.classList.add('scale-in-hor-right');
            searchInput.style.display = 'inline-block';
            title.style.display = 'none';
            searchInput.focus();
            searchIcon.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        onSearch(query);
    });

    searchInput.addEventListener('focusout', (e) => {
        hideSearchBar(searchInput, title, searchIcon, onSearch)

    });

    header.appendChild(menuIcon);
    header.appendChild(title);
    header.appendChild(searchIcon);
    header.appendChild(searchInput);

    return header;
}

function hideSearchBar(searchInput, title, searchIcon, onSearch) {
    // Определяем обработчик события анимации
    const handleAnimationEnd = () => {
        searchInput.style.display = 'none';
        searchInput.classList.remove('scale-out-hor-right');
        title.style.display = 'inline-block';
        searchIcon.style.display = 'inline-block';
        searchInput.value = '';
        onSearch('');

        // Удаляем обработчик после завершения анимации
        searchInput.removeEventListener('animationend', handleAnimationEnd);
    };

    // Добавляем классы анимации и обработчик события
    searchInput.classList.remove('scale-in-hor-right');
    searchInput.classList.add('scale-out-hor-right');
    searchInput.addEventListener('animationend', handleAnimationEnd);
}

