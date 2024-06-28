import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        return localTheme ? localTheme : 'classic';
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--foreground-rgb', theme === 'paper' ? '0, 0, 0' : '255, 255, 255');
        document.documentElement.style.setProperty('--background-rgb', theme === 'paper' ? '243, 232, 213' : '0, 0, 0');
        if (window !== undefined) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const value = {
        theme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);