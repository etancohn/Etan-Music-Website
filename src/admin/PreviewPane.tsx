import { useEffect, useRef, useState } from 'react';
import { SiteContent } from '../data/content';
import { PREVIEW_READY_MSG, PREVIEW_STATE_MSG } from '../previewMode';
import { FAINT, MUTED } from './fields';

// The preview is the real site in an iframe, laid out at a fixed laptop
// viewport and scaled down to fit the pane — so type ramps, media queries,
// and full-height sections all match what visitors actually see.
const VIEW_W = 1280;
const VIEW_H = 800;

// Which public page shows each editor section.
const TAB_FOR_SECTION: Record<string, string> = {
    hero: 'home',
    theaterCredits: 'experience',
    bands: 'experience',
    performances: 'experience',
    covers: 'covers',
};

export default function PreviewPane({ draft, section }: { draft: SiteContent; section: string }) {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);
    const [ready, setReady] = useState(false);

    // Fit the 1280px-wide viewport to whatever width the pane gives the screen.
    useEffect(() => {
        const el = screenRef.current;
        if (!el) return undefined;
        const fit = () => setScale(el.clientWidth / VIEW_W);
        const ro = new ResizeObserver(fit);
        ro.observe(el);
        fit();
        return () => ro.disconnect();
    }, []);

    const post = (msg: Record<string, unknown>) => {
        frameRef.current?.contentWindow?.postMessage(
            { type: PREVIEW_STATE_MSG, ...msg },
            window.location.origin,
        );
    };

    // The frame announces when its listeners are attached; anything posted
    // earlier would be dropped, so all sends wait on `ready`.
    useEffect(() => {
        const onMsg = (e: MessageEvent) => {
            if (e.origin !== window.location.origin) return;
            if (e.source !== frameRef.current?.contentWindow) return;
            if (e.data?.type === PREVIEW_READY_MSG) setReady(true);
        };
        window.addEventListener('message', onMsg);
        return () => window.removeEventListener('message', onMsg);
    }, []);

    useEffect(() => {
        if (ready) post({ content: draft });
    }, [ready, draft]);

    useEffect(() => {
        if (ready) post({ tab: TAB_FOR_SECTION[section] ?? 'home' });
    }, [ready, section]);

    return (
        <div>
            <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: FAINT, marginBottom: 16 }}>
                Live preview
            </div>

            <div
                style={{
                    position: 'relative',
                    borderRadius: 10,
                    border: '1px solid rgba(237,239,235,.16)',
                    background: '#0A0C0B',
                    padding: 10,
                    boxShadow: '0 30px 70px rgba(0,0,0,.55)',
                }}
            >
                <div
                    ref={screenRef}
                    style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, height: Math.round(VIEW_H * scale), background: '#0A0C0B' }}
                >
                    {scale > 0 && (
                        <iframe
                            ref={frameRef}
                            title="Site preview"
                            src="/?preview=1"
                            style={{
                                width: VIEW_W, height: VIEW_H, border: 'none', display: 'block',
                                background: '#0A0C0B', transform: `scale(${scale})`, transformOrigin: 'top left',
                            }}
                        />
                    )}
                    <div
                        style={{
                            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: '#0A0C0B', color: FAINT, fontSize: 13, letterSpacing: '.08em',
                            opacity: ready ? 0 : 1, pointerEvents: 'none', transition: 'opacity .5s',
                        }}
                    >
                        Starting the preview…
                    </div>
                </div>
            </div>

            <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, margin: '18px 4px 0' }}>
                This is your site with the edits you’ve made — it updates as you type,
                before you save. Scroll and click around in it like a visitor would.
            </p>
        </div>
    );
}
