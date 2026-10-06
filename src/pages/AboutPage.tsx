import { ReactNode } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import Reveal from '../Reveal';
import { useContent } from '../content';
import { theaterCredits } from '../data/theaterCredits';
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

// Regional credits, newest first, for the "selected credits" resume block.
function selectedCredits() {
    return theaterCredits
        .filter((c) => c.category === 'regional')
        .sort((a, b) => b.year - a.year)
        .slice(0, 6);
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
                    <div className="about-actions">
                        <a
                            className="about-btn about-btn--primary"
                            href="mailto:etan.cohn@gmail.com?subject=Booking%20inquiry"
                        >
                            <EmailIcon fontSize="small" />
                            Get in Touch
                        </a>
                        <a className="about-btn about-btn--ghost" href="#/experience">
                            Full Experience
                        </a>
                    </div>
                </div>
            </div>

            <section className="page-section" aria-label="Resume at a glance">
                <h2 className="page-section__label">Resume at a Glance</h2>

                <Reveal className="resume-grid">
                    <div className="resume-card">
                        <h3 className="resume-card__title">Selected Credits</h3>
                        <ul className="resume-card__list">
                            {selectedCredits().map((c) => (
                                <li key={`${c.year}-${c.show}-${c.theater}`}>
                                    <span className="resume-card__show">{c.show}</span>
                                    <span className="resume-card__detail">
                                        {c.theater}, {c.year}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="resume-card">
                        <h3 className="resume-card__title">What I Bring</h3>
                        <ul className="resume-card__list resume-card__list--plain">
                            <li>Drum set &amp; auxiliary percussion</li>
                            <li>Sight-reading books &amp; playing to click</li>
                            <li>Subbing on short notice</li>
                            <li>Theater, rock, funk, pop &amp; klezmer</li>
                            <li>Recording &amp; video production for covers</li>
                        </ul>
                    </div>

                    <div className="resume-card">
                        <h3 className="resume-card__title">Education</h3>
                        <ul className="resume-card__list">
                            <li>
                                <span className="resume-card__show">
                                    Carnegie Mellon University
                                </span>
                                <span className="resume-card__detail">
                                    Pittsburgh, PA — pit orchestras, original student
                                    works &amp; recitals
                                </span>
                            </li>
                        </ul>

                        <h3 className="resume-card__title resume-card__title--spaced">
                            Contact
                        </h3>
                        <ul className="resume-card__list resume-card__list--plain">
                            <li>
                                <a href="mailto:etan.cohn@gmail.com">
                                    etan.cohn@gmail.com
                                </a>
                            </li>
                            <li>(972) 310-6503</li>
                            <li>
                                <a
                                    href="https://www.instagram.com/etan_drums/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    @etan_drums
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/etan-cohn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </Reveal>

                <p className="resume-request">
                    Want the full PDF resume?{' '}
                    <a href="mailto:etan.cohn@gmail.com?subject=Resume%20request">
                        Email me
                    </a>{' '}
                    and I&rsquo;ll send it over.
                </p>
            </section>
        </div>
    );
}

export default AboutPage;
