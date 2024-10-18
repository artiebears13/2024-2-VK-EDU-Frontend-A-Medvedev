import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ErrorContext = createContext();


export const ErrorProvider = ({children}) => {
    const [error, setError] = useState(null);

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {children}
        </ErrorContext.Provider>
    )
}