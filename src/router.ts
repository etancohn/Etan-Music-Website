import { useEffect, useState } from 'react';

export type Route = 'home' | 'experience' | 'covers' | 'about';

const ROUTES: Route[] = ['home', 'experience', 'covers', 'about'];

export function parseHash(hash: string): Route {
    const clean = hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
    return (ROUTES as string[]).includes(clean) ? (clean as Route) : 'home';
}

export function routeHref(route: Route): string {
    return route === 'home' ? '#/' : `#/${route}`;
}

export function useRoute(): Route {
    const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

    useEffect(() => {
        const onHashChange = () => setRoute(parseHash(window.location.hash));
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return route;
}
