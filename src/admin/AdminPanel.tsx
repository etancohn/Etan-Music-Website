import { ComponentType, useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db } from '../firebase';
import { useContentContext } from '../content';
import { SiteContent } from '../data/content';
import AuthGate, { auth } from './AuthGate';
import { ACCENT, BG, Btn, FAINT, GREEN, MUTED, PANEL_FONT, RED, TEXT } from './fields';
import PreviewPane from './PreviewPane';
import {
    BandsEditor, CoversEditor, HeroEditor, PerformancesEditor, TheaterCreditsEditor,
} from './sections';

type SectionKey = keyof SiteContent;

interface SectionDef {
    id: SectionKey;
    label: string;
    // Editors are typed per-section; the panel dispatches on `id`, so the
    // loose typing here is contained to this table.
    Editor: ComponentType<{ value: unknown; onChange: (next: unknown) => void }>;
}

const asEditor = (c: ComponentType<never>) => c as unknown as SectionDef['Editor'];

const SECTIONS: SectionDef[] = [
    { id: 'hero', label: 'Home page', Editor: asEditor(HeroEditor) },
    { id: 'theaterCredits', label: 'Theater credits', Editor: asEditor(TheaterCreditsEditor) },
    { id: 'bands', label: 'Bands', Editor: asEditor(BandsEditor) },
    { id: 'performances', label: 'Cabarets & recitals', Editor: asEditor(PerformancesEditor) },
    { id: 'covers', label: 'Drum covers', Editor: asEditor(CoversEditor) },
];

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

// The live preview needs real horizontal room next to the form; below this
// it comes out of the layout entirely rather than rendering postage-stamp size.
const PREVIEW_QUERY = '(min-width: 1200px)';

function usePreviewFits() {
    const [fits, setFits] = useState(() => window.matchMedia(PREVIEW_QUERY).matches);
    useEffect(() => {
        const mq = window.matchMedia(PREVIEW_QUERY);
        const onChange = (e: MediaQueryListEvent) => setFits(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return fits;
}

type Status = { kind: 'busy' | 'ok' | 'err'; msg: string } | null;

// The hidden content editor. Holds a draft copy of the merged site content;
// Save publishes one section document to Firestore (full overwrite — the
// draft is always a complete section).
function Panel() {
    const { content, loaded, reload } = useContentContext();
    const [draft, setDraft] = useState<SiteContent | null>(null);
    const [dirty, setDirty] = useState<Partial<Record<SectionKey, boolean>>>({});
    const [active, setActive] = useState<SectionKey>('hero');
    const [status, setStatus] = useState<Status>(null);
    const previewFits = usePreviewFits();

    // Initialize the draft once the first Firestore fetch settles, so the form
    // starts from live content rather than the built-in defaults.
    useEffect(() => {
        if (loaded) setDraft((d) => d ?? clone(content));
    }, [loaded, content]);

    useEffect(() => {
        const hasDirty = Object.values(dirty).some(Boolean);
        if (!hasDirty) return undefined;
        const warn = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);

    useEffect(() => {
        if (status?.kind !== 'ok') return undefined;
        const t = setTimeout(() => setStatus(null), 4000);
        return () => clearTimeout(t);
    }, [status]);

    if (!draft) {
        return (
            <div style={{ minHeight: '100vh', background: BG, color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: PANEL_FONT, fontSize: 14, letterSpacing: '.08em' }}>
                Loading your content…
            </div>
        );
    }

    const section = SECTIONS.find((s) => s.id === active)!;
    const { Editor } = section;

    const setSection = (id: SectionKey, value: SiteContent[SectionKey]) => {
        setDraft((d) => (d ? { ...d, [id]: value } : d));
        setDirty((f) => ({ ...f, [id]: true }));
    };

    const save = async (id: SectionKey) => {
        setStatus({ kind: 'busy', msg: 'Saving…' });
        try {
            // JSON round-trip strips any undefined values, which Firestore
            // rejects. The race matters: when offline, the SDK queues the
            // write and the promise never settles — surface an error instead
            // of spinning forever.
            await Promise.race([
                setDoc(doc(db, 'content', id), clone(draft[id])),
                new Promise((_, reject) => setTimeout(() => reject(new Error('save timed out')), 12000)),
            ]);
            setDirty((f) => ({ ...f, [id]: false }));
            setStatus({ kind: 'ok', msg: 'Saved — your changes are live.' });
            reload();
        } catch (err) {
            console.error(err);
            setStatus({ kind: 'err', msg: 'Couldn’t save — check your internet and try again.' });
        }
    };

    // Discard drops unsaved edits by resetting the draft for this section back
    // to the currently-saved (live) content, which clears the dirty flag.
    const discard = (id: SectionKey) => {
        setDraft((d) => (d ? { ...d, [id]: clone(content[id]) } : d));
        setDirty((f) => ({ ...f, [id]: false }));
    };

    return (
        <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: PANEL_FONT, display: 'flex', alignItems: 'stretch' }}>
            {/* ——— Sidebar ——— */}
            <aside
                style={{
                    width: 240, flex: 'none', position: 'sticky', top: 0, alignSelf: 'flex-start',
                    height: '100vh', boxSizing: 'border-box', padding: '32px 20px',
                    borderRight: '1px solid rgba(237,239,235,.1)', display: 'flex', flexDirection: 'column', gap: 4,
                }}
            >
                <div style={{ fontWeight: 700, fontSize: 24, color: TEXT, marginBottom: 2 }}>
                    Site editor
                </div>
                <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: FAINT, marginBottom: 24 }}>
                    Etan Cohn Drums · content
                </div>
                {SECTIONS.map((s) => (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => setActive(s.id)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                            textAlign: 'left', padding: '11px 14px', borderRadius: 4, cursor: 'pointer',
                            fontFamily: PANEL_FONT, fontSize: 14,
                            background: active === s.id ? 'rgba(123,196,127,.12)' : 'transparent',
                            color: active === s.id ? TEXT : MUTED,
                            border: `1px solid ${active === s.id ? 'rgba(123,196,127,.4)' : 'transparent'}`,
                        }}
                    >
                        {s.label}
                        {dirty[s.id] && <span title="Unsaved changes" style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, flex: 'none' }} />}
                    </button>
                ))}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ fontSize: 12, color: FAINT, lineHeight: 1.6 }}>
                        Changes appear on the live site as soon as you press Save.
                        {' '}
                        <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: MUTED }}>Open the site ↗</a>
                    </div>
                    <Btn small onClick={() => signOut(auth)}>Sign out</Btn>
                </div>
            </aside>

            {/* ——— Main editor column (+ live preview) ——— */}
            <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', minWidth: 0 }}>
                    <div style={{ flex: 1, minWidth: 0, padding: '36px 40px 20px', maxWidth: 860, boxSizing: 'border-box' }}>
                        <h1 style={{ fontWeight: 600, fontSize: 32, margin: '0 0 28px' }}>
                            {section.label}
                        </h1>
                        <Editor
                            value={draft[active]}
                            onChange={(next) => setSection(active, next as SiteContent[SectionKey])}
                        />
                    </div>

                    {/* ——— Live preview ——— */}
                    {previewFits && (
                        <aside
                            style={{
                                flex: 'none', width: 'clamp(420px, 46%, 780px)', boxSizing: 'border-box',
                                position: 'sticky', top: 0, alignSelf: 'flex-start',
                                maxHeight: '100vh', overflowY: 'auto', marginLeft: 'auto',
                                // Bottom padding keeps the preview clear of the sticky save bar.
                                padding: '32px 36px 96px 28px',
                                borderLeft: '1px solid rgba(237,239,235,.08)',
                            }}
                        >
                            <PreviewPane draft={draft} section={active} />
                        </aside>
                    )}
                </div>

                {/* ——— Save bar ——— */}
                <div
                    style={{
                        position: 'sticky', bottom: 0, padding: '14px 40px',
                        background: 'rgba(16,19,18,.96)', borderTop: '1px solid rgba(237,239,235,.12)',
                        display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
                    }}
                >
                    <Btn kind="accent" onClick={() => save(active)} disabled={status?.kind === 'busy' || !dirty[active]}>
                        {status?.kind === 'busy' ? 'Saving…' : `Save ${section.label}`}
                    </Btn>
                    <Btn onClick={() => discard(active)} disabled={status?.kind === 'busy' || !dirty[active]} title="Undo unsaved changes on this page and go back to the saved version">
                        Discard changes
                    </Btn>
                    {status && status.kind !== 'busy' && (
                        <span style={{ fontSize: 13, color: status.kind === 'ok' ? GREEN : RED }}>{status.msg}</span>
                    )}
                    {!status && dirty[active] && (
                        <span style={{ fontSize: 13, color: MUTED }}>You have unsaved changes on this page.</span>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function AdminPanel() {
    return (
        <AuthGate>
            <Panel />
        </AuthGate>
    );
}
