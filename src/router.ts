import { useEffect, useState } from 'react';

// TODO: re-add 'about' before public release
export type Route = 'home' | 'experience' | 'media';

const ROUTES: Route[] = ['home', 'experience', 'media'];

// Old hashes that may still be bookmarked or linked externally.
const LEGACY_ROUTES: Record<string, Route> = { covers: 'media' };

export function parseHash(hash: string): Route {
    const clean = hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
    if (clean in LEGACY_ROUTES) return LEGACY_ROUTES[clean];
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
