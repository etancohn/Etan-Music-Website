import { useState } from 'react';
import Reveal from '../Reveal';
import { useContent } from '../content';
import { rich } from '../richText';
import aboutPhoto from '../assets/etan-drums-ww.jpeg';
import './pages.css';
import './AboutPage.css';

function AboutPage() {
    const { paragraphs, photoUrl, photoCaption, funFacts = [] } = useContent().about;
    const facts = funFacts.filter((f) => f.label && f.value);
    // Touch screens have no hover, so a tap flips the photo instead. On
    // hover devices CSS handles it and clicks are ignored, so a click can't
    // leave it stuck flipped after the mouse leaves.
    const [flipped, setFlipped] = useState(false);
    const onPhotoTap = () => {
        if (!window.matchMedia('(hover: hover)').matches) setFlipped((f) => !f);
    };

    return (
        <div className="page">
            <div className={`about-hero${facts.length ? ' about-hero--facts' : ''}`}>
                <Reveal className="about-photo">
                    <div
                        className={`about-frame${flipped ? ' is-flipped' : ''}`}
                        tabIndex={photoCaption ? 0 : undefined}
                        onClick={photoCaption ? onPhotoTap : undefined}
                    >
                        <div className="about-frame__face">
                            <img
                                src={photoUrl || aboutPhoto}
                                alt="Etan Cohn behind the drum kit in a pit"
                            />
                        </div>
                        {photoCaption && (
                            <div className="about-frame__face about-frame__face--back">
                                <div className="about-frame__staff" aria-hidden="true">
                                    <span className="about-frame__note">♪</span>
                                </div>
                                <p className="about-frame__caption">{rich(photoCaption)}</p>
                            </div>
                        )}
                    </div>
                </Reveal>

                {facts.length > 0 && (
                    <Reveal className="about-facts">
                        <div className="setlist">
                            <div className="setlist__head">
                                <span className="setlist__title">Fun facts</span>
                            </div>
                            <ol className="setlist__items">
                                {facts.map((f, i) => (
                                    <li key={i} className="setlist__item">
                                        <span className="setlist__num" aria-hidden="true">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="setlist__label">{f.label}</span>
                                        <span className="setlist__value">{rich(f.value)}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </Reveal>
                )}

                <div className="about-text">
                    <h1 className="about-title">About</h1>
                    {paragraphs.map((p, i) => (
                        <p
                            key={i}
                            className={`about-text__para${i === 0 ? ' about-text__para--lede' : ''}`}
                        >
                            {rich(p, { links: true })}
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
