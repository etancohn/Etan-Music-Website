import EmailIcon from '@mui/icons-material/Email';
import Reveal from '../Reveal';
import { theaterCredits } from '../data/theaterCredits';
import aboutPhoto from '../assets/etan-drums-ww.jpeg';
import './pages.css';
import './AboutPage.css';

function resumeStats() {
    const productions = theaterCredits.length;
    const theaters = new Set(theaterCredits.map((c) => c.theater)).size;
    const firstYear = Math.min(...theaterCredits.map((c) => c.year));
    return { productions, theaters, firstYear };
}

// Regional credits, newest first, for the "selected credits" resume block.
function selectedCredits() {
    return theaterCredits
        .filter((c) => c.category === 'regional')
        .sort((a, b) => b.year - a.year)
        .slice(0, 6);
}

function AboutPage() {
    const { productions, theaters, firstYear } = resumeStats();

    return (
        <div className="page">
            <div className="about-hero">
                <Reveal className="about-photo">
                    <div className="about-frame">
                        <img
                            src={aboutPhoto}
                            alt="Etan Cohn behind the drum kit in a pit"
                        />
                        <div className="about-frame__caption">
                            ♪&ensp;behind the kit for Winter Wonderettes at Greater Boston Stage Company
                        </div>
                    </div>
                </Reveal>

                <div className="about-text">
                    <div className="page__eyebrow">About</div>
                    <h1 className="page__title">Hi, I&rsquo;m Etan.</h1>
                    <p className="about-text__para">
                        I&rsquo;m a drummer and percussionist based in Boston, and my
                        favorite seat in any theater is the one behind the kit. Since{' '}
                        {firstYear} I&rsquo;ve played {productions} productions across{' '}
                        {theaters} regional, community, and educational theaters — from{' '}
                        <em>Come From Away</em> and <em>Legally Blonde</em> to student
                        originals that had never been performed before.
                    </p>
                    <p className="about-text__para">
                        I got my start at Carnegie Mellon University, drumming for
                        Scotch&rsquo;n&rsquo;Soda Theater, School of Drama and School of
                        Music productions, and cabarets and senior recitals — and
                        co-founding the rock band Fox and the Cosmic Caravan along the
                        way. These days you&rsquo;ll find me in pits around Greater
                        Boston and playing with the funk/rock band Katie and the Roses.
                    </p>
                    <p className="about-text__para">
                        I read charts, play to click, cover a wide stylistic range, and
                        sub on short notice. When I&rsquo;m not in a pit, I&rsquo;m
                        recording drum covers of the shows and songs I love.
                    </p>
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
