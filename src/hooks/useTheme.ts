import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Hook for persisting dark/light mode preference.
 * Reads and writes to localStorage for persistence across sessions.
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem('portfolio-theme') as Theme | null;
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    return { theme, toggleTheme };
}
