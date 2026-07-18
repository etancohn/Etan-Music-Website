import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import ercLogo from './assets/erc.png';
import { Route, routeHref } from './router';
import './Header.css';

const TABS: { route: Route; label: string }[] = [
    { route: 'home', label: 'Home' },
    { route: 'experience', label: 'Experience' },
    { route: 'media', label: 'Media' },
    // TODO: re-enable before public release
    // { route: 'about', label: 'About' },
];

function Header({ route }: { route: Route }) {
    const [scrolled, setScrolled] = useState(false);
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

    return (
        <header
            ref={headerRef}
            className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
        >
            <div className="site-header__inner">
                <a className="site-header__brand" href="#/" aria-label="Etan Cohn — home">
                    <img className="site-header__logo" src={ercLogo} alt="" />
                    <span>Etan Cohn</span>
                </a>

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

                <div className="site-header__social">
                    <a
                        className="site-header__icon"
                        href="https://www.instagram.com/etan_drums/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram — @etan_drums"
                    >
                        <InstagramIcon fontSize="small" />
                    </a>
                    <a
                        className="site-header__icon"
                        href="mailto:etan.cohn@gmail.com"
                        aria-label="Email Etan"
                    >
                        <EmailIcon fontSize="small" />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
