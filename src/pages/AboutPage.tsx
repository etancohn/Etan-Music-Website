import { ReactNode } from 'react';
import Reveal from '../Reveal';
import { useContent } from '../content';
import aboutPhoto from '../assets/etan-drums-ww.jpeg';
import './pages.css';
import './AboutPage.css';

// Bare domains and URLs in bio text ("chrisrenaud.com", "https://…")
// become links, so the bio can be edited as plain text in the dashboard.
const LINK_RE = /\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?/gi;

function linkify(text: string): ReactNode[] {
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(LINK_RE)) {
        // Sentence punctuation right after a URL isn't part of it.
        const url = m[0].replace(/[.,!?;:)]+$/, '');
        const start = m.index!;
        out.push(text.slice(last, start));
        out.push(
            <a
                key={start}
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

function AboutPage() {
    const { heading, paragraphs, photoUrl, photoCaption } = useContent().about;

    return (
        <div className="page">
            <div className="about-hero">
                <Reveal className="about-photo">
                    <div className="about-frame">
                        <img
                            src={photoUrl || aboutPhoto}
                            alt="Etan Cohn behind the drum kit in a pit"
                        />
                        <div className="about-frame__caption">
                            {photoCaption}
                        </div>
                    </div>
                </Reveal>

                <div className="about-text">
                    <div className="page__eyebrow">About</div>
                    <h1 className="page__title">{heading}</h1>
                    {paragraphs.map((p, i) => (
                        <p key={i} className="about-text__para">
                            {linkify(p)}
                        </p>
                    ))}
                    <p className="about-text__site-note">
                        Interested in a site of your own?{' '}
                        <a href="mailto:etan.cohn@gmail.com?subject=Website%20inquiry">
                            Get in touch.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
