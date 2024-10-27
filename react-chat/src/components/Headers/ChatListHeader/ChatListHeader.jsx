import React, { useState } from 'react';
import { Title } from '../../Title/index.js';
import { SearchBar } from '../../SearchBar/SearchBar.jsx';
import './ChatListHeader.scss';
import {MenuButton} from "../../Buttons/MenuButton/index.js";

export const ChatListHeader = ({handleSearch, onMenuShow}) => {
    const [isSearchOpen, setSearchOpen] = useState(false);


    return (
        <header className="header">
            <MenuButton toggleMenu={onMenuShow} />
            {!isSearchOpen && <Title text={"ArtemGram"} />}
            <SearchBar
                onSearch={handleSearch}
                isSearchOpen={isSearchOpen}
                setSearchOpen={setSearchOpen}
            />
        </header>
    );
};
