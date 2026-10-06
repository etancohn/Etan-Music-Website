import { ReactNode } from 'react';

// Light markup for dashboard-edited text, so it can stay plain strings:
//   *Legally Blonde*  → an italic title of a work (show, album)
//   chrisrenaud.com   → a link (only where `links` is on, e.g. the bio)
// Titles render as <cite>, the element for titles of works; inside an
// already-italic caption, CSS sets them upright instead (reverse italics).

const TITLE_RE = /\*([^*]+)\*/g;

// Bare domains and URLs ("chrisrenaud.com", "https://…").
const LINK_RE = /\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s*]*)?/gi;

function linkify(text: string, keyBase: string): ReactNode[] {
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(LINK_RE)) {
        // Sentence punctuation right after a URL isn't part of it.
        const url = m[0].replace(/[.,!?;:)]+$/, '');
        const start = m.index!;
        out.push(text.slice(last, start));
        out.push(
            <a
                key={`${keyBase}-${start}`}
                href={/^https?:\/\//i.test(url) ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {url.replace(/^https?:\/\//i, '')}
            </a>,
        );
        last = start + url.length;
    }
    out.push(text.slice(last));
    return out;
}

export function rich(text: string, { links = false } = {}): ReactNode[] {
    const plain = (s: string, key: string) => (links ? linkify(s, key) : [s]);
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(TITLE_RE)) {
        out.push(...plain(text.slice(last, m.index), `t${last}`));
        out.push(
            <cite key={m.index} className="work-title">
                {m[1]}
            </cite>,
        );
        last = m.index! + m[0].length;
    }
    out.push(...plain(text.slice(last), `t${last}`));
    return out;
}

// For places that need plain text (alt text, aria labels, admin list titles).
export function stripMarkup(text: string): string {
    return text.replace(TITLE_RE, '$1');
}
