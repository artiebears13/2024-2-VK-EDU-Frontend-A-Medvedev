import React from 'react';
import './ProfileAbout.scss'

export const ProfileAbout = ({ about, setAbout, isEdit }) => {


    const onChange = (value) => {
        setAbout(value);
    }

    return (
            <div className="profile-about-description profile-page-field">
                <p className="profile-page-key"> О себе: </p>
                {!isEdit ? <p className="profile-about-text">{about}</p> :
                    <textarea
                        className="profile-about-input"
                        rows="10"
                        value={about}
                        placeholder={about}
                        onChange={(e) => onChange(e.target.value)}
                    >
                    </textarea>
                }
            </div>
    );
};
