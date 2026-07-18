import { ReactNode, useEffect, useRef } from 'react';

// Shared building blocks for the content editor. Plain React + inline styles,
// tuned for legibility over flourish: the person using this is editing show
// listings, not admiring chrome.

export const ACCENT = '#7BC47F';
export const TEXT = '#EDEfEB';
export const MUTED = '#9AA39B';
export const FAINT = '#6F776F';
export const GREEN = '#7FB069';
export const RED = '#D07B6A';
export const BG = '#101312';
export const PANEL_FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

const INPUT_STYLE: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: '#1A1E1B',
    color: TEXT,
    border: '1px solid rgba(237,239,235,.18)',
    borderRadius: 4,
    padding: '10px 12px',
    fontFamily: PANEL_FONT,
    fontSize: 14,
    lineHeight: 1.5,
    outline: 'none',
};

export function Field({ label, help, children }: { label: string; help?: string; children: ReactNode }) {
    return (
        <label style={{ display: 'block', marginBottom: 18 }}>
            <div style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 6 }}>
                {label}
            </div>
            {children}
            {help && <div style={{ fontSize: 12, color: FAINT, marginTop: 6, lineHeight: 1.5 }}>{help}</div>}
        </label>
    );
}

interface TextProps {
    value: string | undefined;
    onChange: (v: string) => void;
    placeholder?: string;
}

export function TextInput({ value, onChange, placeholder }: TextProps) {
    return (
        <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={INPUT_STYLE}
        />
    );
}

// Textarea that grows with its content so paragraphs are never clipped.
export function TextArea({ value, onChange, placeholder, minRows = 3 }: TextProps & { minRows?: number }) {
    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight + 2}px`;
    }, [value]);
    return (
        <textarea
            ref={ref}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={minRows}
            style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: minRows * 22 + 20 }}
        />
    );
}

// Number field that tolerates a half-typed value ("" or "-") without writing
// NaN into the draft; empty commits the fallback.
export function NumberInput({ value, onChange, fallback }: { value: number; onChange: (v: number) => void; fallback?: number }) {
    return (
        <input
            type="number"
            value={Number.isFinite(value) ? value : ''}
            onChange={(e) => {
                const n = Number(e.target.value);
                onChange(e.target.value === '' || Number.isNaN(n) ? (fallback ?? 0) : n);
            }}
            style={INPUT_STYLE}
        />
    );
}

export function DateInput({ value, onChange }: { value: string | undefined; onChange: (v: string) => void }) {
    return (
        <input
            type="date"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            style={{ ...INPUT_STYLE, colorScheme: 'dark' }}
        />
    );
}

export function Select<T extends string>({ value, onChange, options }: {
    value: T;
    onChange: (v: T) => void;
    options: { value: T; label: string }[];
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            style={{ ...INPUT_STYLE, cursor: 'pointer' }}
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}

export function Checkbox({ checked, onChange, label }: { checked: boolean | undefined; onChange: (v: boolean) => void; label: string }) {
    return (
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: MUTED, cursor: 'pointer' }}>
            <input
                type="checkbox"
                checked={Boolean(checked)}
                onChange={(e) => onChange(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: ACCENT, cursor: 'pointer' }}
            />
            {label}
        </label>
    );
}

// Two-or-more inputs on one row (collapses gracefully on narrow screens).
export function Row({ children, cols }: { children: ReactNode; cols?: string }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: cols || 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {children}
        </div>
    );
}

export function Btn({ onClick, children, kind = 'ghost', disabled, title, small }: {
    onClick: () => void;
    children: ReactNode;
    kind?: 'accent' | 'ghost' | 'danger';
    disabled?: boolean;
    title?: string;
    small?: boolean;
}) {
    const base: React.CSSProperties = {
        fontFamily: PANEL_FONT,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        letterSpacing: '.06em',
        padding: small ? '6px 12px' : '10px 18px',
        borderRadius: 4,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background .2s, border-color .2s, color .2s',
    };
    const kinds: Record<string, React.CSSProperties> = {
        accent: { background: ACCENT, color: '#10221a', border: `1px solid ${ACCENT}` },
        ghost: { background: 'transparent', color: TEXT, border: '1px solid rgba(237,239,235,.25)' },
        danger: { background: 'transparent', color: RED, border: '1px solid rgba(208,123,106,.4)' },
    };
    return (
        <button type="button" onClick={onClick} disabled={disabled} title={title} style={{ ...base, ...kinds[kind] }}>
            {children}
        </button>
    );
}

function IconBtn({ onClick, disabled, title, danger, children }: {
    onClick: () => void;
    disabled?: boolean;
    title: string;
    danger?: boolean;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
            style={{
                width: 26, height: 26, borderRadius: 4, border: '1px solid rgba(237,239,235,.18)',
                background: 'transparent', color: danger ? RED : MUTED, fontSize: 13, lineHeight: 1,
                cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.3 : 1,
            }}
        >
            {children}
        </button>
    );
}

// Generic list-of-things editor: reorder with arrows, remove with confirm,
// append with the button at the bottom. `renderItem(item, setItem, index)`
// renders the fields for one entry. With `addFirst`, the add button moves to
// the top of the list and new entries are inserted first — for long lists
// where additions are usually the newest thing.
export function ListEditor<T>({
    items = [],
    onChange,
    renderItem,
    makeNew,
    addLabel = 'Add item',
    addFirst = false,
    itemTitle,
    confirmText = 'Remove this item? It disappears from the site after you press Save.',
}: {
    items: T[];
    onChange: (items: T[]) => void;
    renderItem: (item: T, setItem: (next: T) => void, index: number) => ReactNode;
    makeNew: () => T;
    addLabel?: string;
    addFirst?: boolean;
    itemTitle?: (item: T, index: number) => string;
    confirmText?: string;
}) {
    const setItem = (i: number, item: T) => {
        const next = items.slice();
        next[i] = item;
        onChange(next);
    };
    const move = (i: number, dir: number) => {
        const j = i + dir;
        if (j < 0 || j >= items.length) return;
        const next = items.slice();
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    const remove = (i: number) => {
        if (!window.confirm(confirmText)) return;
        onChange(items.filter((_, k) => k !== i));
    };
    const addBtn = (
        <div>
            <Btn onClick={() => onChange(addFirst ? [makeNew(), ...items] : [...items, makeNew()])}>
                + {addLabel}
            </Btn>
        </div>
    );
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {addFirst && addBtn}
            {items.map((item, i) => (
                <div key={i} style={{ border: '1px solid rgba(237,239,235,.12)', borderRadius: 4, background: 'rgba(237,239,235,.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 10px', borderBottom: '1px solid rgba(237,239,235,.08)' }}>
                        <span style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: FAINT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {itemTitle ? itemTitle(item, i) : `Item ${i + 1}`}
                        </span>
                        <span style={{ display: 'flex', gap: 6, flex: 'none' }}>
                            <IconBtn onClick={() => move(i, -1)} disabled={i === 0} title="Move up">↑</IconBtn>
                            <IconBtn onClick={() => move(i, 1)} disabled={i === items.length - 1} title="Move down">↓</IconBtn>
                            <IconBtn onClick={() => remove(i)} title="Remove" danger>✕</IconBtn>
                        </span>
                    </div>
                    <div style={{ padding: '14px 14px 2px' }}>{renderItem(item, (next) => setItem(i, next), i)}</div>
                </div>
            ))}
            {!addFirst && addBtn}
        </div>
    );
}

export function SubHeading({ children, first }: { children: ReactNode; first?: boolean }) {
    return (
        <h3
            style={{
                fontFamily: PANEL_FONT, fontWeight: 600, fontSize: 22, color: TEXT,
                margin: first ? '0 0 18px' : '40px 0 18px', paddingBottom: 10,
                borderBottom: '1px solid rgba(237,239,235,.12)',
            }}
        >
            {children}
        </h3>
    );
}
