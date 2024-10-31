import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.scss';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({ onSearch, isSearchOpen, setSearchOpen }) => {
    const [isAnimating, setIsAnimating] = useState(false); // Для контроля анимации
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

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
        onSearch(query);
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
            onSearch('');
        }, 300);
    };

    return (
        <>
            {!isSearchOpen && !isAnimating && (
                <button
                    className="search-button white"
                    onClick={handleSearchIconClick}
                >
                    <SearchIcon />
                </button>
            )}

            {isSearchOpen && (
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Поиск..."
                    className={`search-input ${isSearchOpen ? 'scale-in-hor-right' : ''} ${isAnimating ? 'scale-out-hor-right' : ''}`}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onBlur={handleSearchInputBlur}
                    autoFocus
                />
            )}
        </>
    );
};
