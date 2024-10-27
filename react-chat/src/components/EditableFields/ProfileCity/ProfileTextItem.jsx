import React from 'react';
import './ProfileTextItem.scss'

export const ProfileTextItem = ( {title, text, setText, isEdit} ) => {

    console.log({text});
    const onChange = (value) => {
        setText(value);
    }

    return (
        <div className="profile-text-item profile-page-field">
            <p className="profile-page-key">{title}:</p>
            {!isEdit? <>{text}</> :
            <input
                className="profile-text-item-input"
                type="text"
                value={text}
                onChange={(e) => onChange(e.target.value)}
            >
            </input>
            }
        </div>
);
};
