// npm run dev
import './App.css'
import { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground.tsx';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ExperiencePage from './pages/ExperiencePage.tsx';
import CoversPage from './pages/CoversPage.tsx';
// TODO: re-enable before public release
// import AboutPage from './pages/AboutPage.tsx';
import { Route, parseHash, useRoute } from './router.ts';
import { ADMIN_PATH } from './adminPath.ts';
import { IS_PREVIEW, PREVIEW_STATE_MSG } from './previewMode.ts';

// Hidden content editor — lazy so admin code (firebase/auth, form UI) stays
// out of the public bundle. The path is deliberately absent from the nav.
const AdminPanel = lazy(() => import('./admin/AdminPanel.tsx'));

const isAdminPath = () => window.location.pathname.replace(/\/+$/, '') === ADMIN_PATH;

const PAGES: Record<Route, () => JSX.Element> = {
    home: HomePage,
    experience: ExperiencePage,
    covers: CoversPage,
    // TODO: re-enable before public release
    // about: AboutPage,
};

function App() {
    // Evaluated once on mount; entering/leaving the editor is a full page load.
    const [isAdmin] = useState(isAdminPath);
    const hashRoute = useRoute();
    // In the preview frame the admin dashboard drives which page is shown (so
    // it can match the section being edited) instead of the URL hash.
    const [previewRoute, setPreviewRoute] = useState<Route | null>(null);
    const route = IS_PREVIEW ? previewRoute ?? hashRoute : hashRoute;
    const Page = PAGES[route];

    useEffect(() => {
        if (!IS_PREVIEW) return undefined;
        const onMsg = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return;
            if (e.data?.type !== PREVIEW_STATE_MSG || !e.data.tab) return;
            setPreviewRoute(parseHash(`#/${e.data.tab}`));
        };
        window.addEventListener('message', onMsg);
        return () => window.removeEventListener('message', onMsg);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [route]);

    if (isAdmin) {
        return (
            <Suspense
                fallback={
                    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, letterSpacing: '.08em', color: '#888' }}>
                        Loading editor…
                    </div>
                }
            >
                <AdminPanel />
            </Suspense>
        );
    }

    return (
        <>
            <div className="app-container">
                <ParticlesBackground />
                <Header route={route} />
                <main className="content-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={route}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                        >
                            <Page />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <Footer />
        </>
    );
}

export default App
