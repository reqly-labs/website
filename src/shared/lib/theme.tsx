import { defaultThemeName } from '@/shared/lib/design-system';
import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './theme-context';

const STORAGE_KEY = 'reqly:theme';

function storageGet(key: string): string | null {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function storageSet(key: string, value: string): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(defaultThemeName);

    useEffect(() => {
        const stored = storageGet(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.classList.toggle('light', theme === 'light');
        storageSet(STORAGE_KEY, theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
