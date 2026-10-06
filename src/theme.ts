import { useSyncExternalStore } from 'react';

// Light/dark site theme. Light is always the default (we deliberately ignore
// the OS preference); dark is an opt-in remembered in localStorage. The
// choice lives on <html data-theme>, which index.css keys its tokens off —
// an inline script in index.html applies it before first paint.
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'emw-theme';
const listeners = new Set<() => void>();

const current = (): Theme =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export function setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // private mode etc. — the toggle still works for this visit
    }
    listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
};

export const useTheme = () => useSyncExternalStore(subscribe, current);
