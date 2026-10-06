import { CSSProperties, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Route, routeHref } from './router';
import { setTheme, useTheme } from './theme';
import './Header.css';

const TABS: { route: Route; label: string }[] = [
    { route: 'home', label: 'Home' },
    { route: 'about', label: 'About' },
    { route: 'experience', label: 'Experience' },
    { route: 'media', label: 'Media' },
];

/**
 * Three-bar button that morphs into an X while the mobile menu is open. Only
 * shown below 720px, where the tab row collapses (see Header.css).
 */
function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            className={`site-header__toggle${open ? ' is-open' : ''}`}
            onClick={onClick}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
        >
            <span />
            <span />
            <span />
        </button>
    );
}

function ThemeToggle() {
    const dark = useTheme() === 'dark';
    return (
        <button
            type="button"
            className="site-header__icon site-header__theme"
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
        >
            {dark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
        </button>
    );
}

function Header({ route }: { route: Route }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Publish the header's live height as --header-h so the hero can size its
    // first screen to exactly fill the viewport below it (see Hero.css).
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const setVar = () =>
            document.documentElement.style.setProperty(
                '--header-h',
                `${el.offsetHeight}px`,
            );
        setVar();
        const ro = new ResizeObserver(setVar);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Close the menu whenever the route changes (including re-tapping the
    // current tab, which doesn't fire hashchange — handled by onClick below).
    useEffect(() => {
        setMenuOpen(false);
    }, [route]);

    // Lock body scroll while the overlay covers the page; Escape closes it.
    useEffect(() => {
        if (!menuOpen) return;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        // Widening past the breakpoint hides the overlay via CSS; close it too
        // so the scroll lock doesn't linger on desktop.
        const desktop = window.matchMedia('(min-width: 721px)');
        const onResize = () => desktop.matches && setMenuOpen(false);
        window.addEventListener('keydown', onKey);
        desktop.addEventListener('change', onResize);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
            desktop.removeEventListener('change', onResize);
        };
    }, [menuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
            >
                <div className="site-header__inner">
                    <a
                        className="site-header__brand"
                        href="#/"
                        aria-label="Etan Cohn — home"
                        onClick={() => setMenuOpen(false)}
                    >
                        <img className="site-header__logo" src="/favicon.svg" alt="" />
                    </a>

                    <div className="site-header__right">
                        <nav className="site-header__nav" aria-label="Primary">
                            {TABS.map((tab) => {
                                const active = tab.route === route;
                                return (
                                    <a
                                        key={tab.route}
                                        className={`site-header__tab${active ? ' site-header__tab--active' : ''}`}
                                        href={routeHref(tab.route)}
                                        aria-current={active ? 'page' : undefined}
                                    >
                                        {tab.label}
                                        {active && (
                                            <motion.span
                                                className="site-header__tab-underline"
                                                layoutId="header-tab-underline"
                                                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </nav>

                        <div className="site-header__actions">
                            <ThemeToggle />
                            <a
                                className="site-header__email"
                                href="mailto:etan.cohn@gmail.com"
                                aria-label="Email Etan"
                                title="Email"
                            >
                                <EmailIcon sx={{ fontSize: 18 }} />
                            </a>
                            <MenuToggle open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
                        </div>
                    </div>
                </div>
            </header>

            <nav
                id="site-menu"
                className={`site-menu${menuOpen ? ' is-open' : ''}`}
                aria-label="Primary (mobile)"
                aria-hidden={!menuOpen}
            >
                {TABS.map((tab, i) => {
                    const active = tab.route === route;
                    return (
                        <a
                            key={tab.route}
                            className={`site-menu__link${active ? ' is-active' : ''}`}
                            href={routeHref(tab.route)}
                            aria-current={active ? 'page' : undefined}
                            tabIndex={menuOpen ? undefined : -1}
                            onClick={() => setMenuOpen(false)}
                            style={{ '--stagger': `${0.08 + i * 0.06}s` } as CSSProperties}
                        >
                            {tab.label}
                        </a>
                    );
                })}
            </nav>
        </>
    );
}

export default Header;
