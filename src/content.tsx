import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { SiteContent, defaultContent } from './data/content';
import { IS_PREVIEW, PREVIEW_READY_MSG, PREVIEW_STATE_MSG } from './previewMode';

// Site content layer: Firestore `content/*` docs shallow-merged over the
// built-in defaults, per section. Defaults render immediately; Firestore
// (when reachable) overrides them on arrival. `loaded` flips true once the
// first fetch attempt settles — the admin panel waits on it before editing.

interface ContentContextValue {
    content: SiteContent;
    loaded: boolean;
    reload: () => void;
}

const ContentContext = createContext<ContentContextValue>({
    content: defaultContent,
    loaded: false,
    reload: () => {},
});

type SectionKey = keyof SiteContent;

// Shallow-merge a partial map of sections over the defaults. Only sections
// (and fields) that exist in the defaults are honored, so stale docs from an
// older schema can't inject anything the site doesn't render.
function mergeOverDefaults(partial: Record<string, unknown>): SiteContent {
    const merged = { ...defaultContent };
    (Object.keys(defaultContent) as SectionKey[]).forEach((key) => {
        const incoming = partial[key];
        if (incoming && typeof incoming === 'object') {
            merged[key] = { ...defaultContent[key], ...(incoming as object) } as never;
        }
    });
    return merged;
}

// Last-resolved Firestore content, cached in localStorage. Hydrating from it
// on boot means repeat visitors paint the exact content they saw last time —
// no flicker from bundled defaults to live content. A genuine edit swaps
// once, then re-caches. Bundled defaults still cover the first-ever visit.
const CACHE_KEY = 'emw:content:v1';

function readCache(): SiteContent | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? mergeOverDefaults(JSON.parse(raw)) : null;
    } catch {
        return null;
    }
}

function writeCache(content: SiteContent) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(content));
    } catch {
        // Quota/private-mode failures are non-fatal — we just lose the fast path.
    }
}

export function ContentProvider({ children }: { children: ReactNode }) {
    // Preview frames must always start from defaults (their content is driven
    // by the admin dashboard over postMessage, not the live cache).
    const [content, setContent] = useState<SiteContent>(() =>
        IS_PREVIEW ? defaultContent : readCache() || defaultContent,
    );
    const [loaded, setLoaded] = useState(false);

    const reload = useCallback(async () => {
        try {
            // firebase/* is dynamically imported so the SDK stays out of the
            // initial public bundle — the first paint comes from defaults (or
            // the localStorage cache) either way.
            const [{ db }, { collection, getDocs }] = await Promise.all([
                import('./firebase'),
                import('firebase/firestore'),
            ]);
            // Race a timeout: with Firestore unreachable the SDK can retry for
            // a long time, and the defaults are a perfectly good answer.
            const snap = await Promise.race([
                getDocs(collection(db, 'content')),
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error('content load timed out')), 8000),
                ),
            ]);
            const partial: Record<string, unknown> = {};
            snap.forEach((d) => {
                partial[d.id] = d.data();
            });
            const merged = mergeOverDefaults(partial);
            setContent(merged);
            writeCache(merged);
        } catch (err) {
            console.warn('Content load failed — showing built-in defaults.', err);
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!IS_PREVIEW) {
            reload();
            return undefined;
        }
        // Preview frame: content arrives from the admin dashboard instead of
        // Firestore, so the page reflects the draft being edited, unsaved.
        const onMsg = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return;
            if (e.data?.type !== PREVIEW_STATE_MSG || !e.data.content) return;
            setContent(mergeOverDefaults(e.data.content));
        };
        window.addEventListener('message', onMsg);
        setLoaded(true);
        window.parent.postMessage({ type: PREVIEW_READY_MSG }, window.location.origin);
        return () => window.removeEventListener('message', onMsg);
    }, [reload]);

    return (
        <ContentContext.Provider value={{ content, loaded, reload }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent(): SiteContent {
    return useContext(ContentContext).content;
}

export function useContentContext(): ContentContextValue {
    return useContext(ContentContext);
}
