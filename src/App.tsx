// npm run dev
import './App.css'
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground.tsx';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ExperiencePage from './pages/ExperiencePage.tsx';
import CoversPage from './pages/CoversPage.tsx';
// TODO: re-enable before public release
// import AboutPage from './pages/AboutPage.tsx';
import { Route, useRoute } from './router.ts';

const PAGES: Record<Route, () => JSX.Element> = {
    home: HomePage,
    experience: ExperiencePage,
    covers: CoversPage,
    // TODO: re-enable before public release
    // about: AboutPage,
};

function App() {
    const route = useRoute();
    const Page = PAGES[route];

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [route]);

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

            <div style={{ height: '4rem' }}></div>
            <Footer />
        </>
    );
}

export default App
