import React, {useEffect, useRef, useState} from 'react';
import styles from './SearchBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({onSearch, isSearchOpen, setSearchOpen}) => {
    const [isAnimating, setIsAnimating] = useState(false); // Для контроля анимации
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);
    const debounceTimer = useRef(null);

    useEffect(() => {
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                hideSearchBar();
            }
        };

        if (isSearchOpen && inputRef.current) {
            inputRef.current.addEventListener('keydown', escapeHandler);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keydown', escapeHandler);
            }
        };
    }, [isSearchOpen]);

    const handleSearchIconClick = () => {
        setSearchOpen(true);
    };

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Очистка предыдущего таймера
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Установка нового таймера
        debounceTimer.current = setTimeout(() => {
            onSearch(query);
        }, 300); // Задержка 300 мс
    };

    const handleSearchInputBlur = () => {
        hideSearchBar();
    };

    const hideSearchBar = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setSearchOpen(false);
            setIsAnimating(false);
            setSearchQuery('');
            onSearch(''); // Сбрасываем результат поиска
        }, 300);
    };

    return (
        <>
            {!isSearchOpen && !isAnimating && (
                <button
                    className={`${styles.searchButton} ${styles.white}`}
                    onClick={handleSearchIconClick}
                >
                    <SearchIcon/>
                </button>
            )}

            {isSearchOpen && (
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Поиск..."
                    className={`${styles.searchInput} ${isSearchOpen ? styles.scaleInHorRight : ''} ${isAnimating ? styles.scaleOutHorRight : ''}`}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onBlur={handleSearchInputBlur}
                    autoFocus
                />
            )}
        </>
    );
};
