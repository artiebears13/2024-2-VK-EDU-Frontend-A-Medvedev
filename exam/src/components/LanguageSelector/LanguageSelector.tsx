import React from 'react';
import styles from './LanguageSelector.module.scss';
import languages from '../../utils/languages.json';
import {getLanguageName} from "../../utils/getLanguageName";

interface LanguageSelectorProps {
    selectedLanguage: string;
    onChange: (language: string) => void;
    isSource: boolean;
    recentLanguages?: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
                                                               selectedLanguage,
                                                               onChange,
                                                               isSource,
                                                               recentLanguages = [],
                                                           }) => {
    const renderRecentLanguages = () => {
        return recentLanguages.map((lang) => (
            <div
                key={lang}
                className={`${styles.recentLanguage} ${selectedLanguage === lang ? styles.selected : ''}`}
                onClick={() => onChange(lang)}
            >
                {getLanguageName(lang)}
            </div>
        ));
    };

    const renderSelectOptions = (): JSX.Element[] => {
        const options: JSX.Element[] = [];

        Object.entries(languages).forEach(([key, value]) => {
            if (key !== "Autodetect") {
                options.push(
                    <option key={key} value={key}>
                        {value}
                    </option>
                );
            }
        });

        return options;
    };

    return (
        <div className={styles.languageSelector}>
            {isSource && (
                <div
                    className={`${styles.recentLanguage} ${selectedLanguage === 'Autodetect' ? styles.selected : ''}`}
                    onClick={() => onChange('Autodetect')}
                >
                    Авто
                </div>
            )}

            {renderRecentLanguages()}

            <select
                value={selectedLanguage}
                onChange={(e) => onChange(e.target.value)}
                className={styles.select}
            >
                {renderSelectOptions()}
            </select>
        </div>
    );
};

export default LanguageSelector;
