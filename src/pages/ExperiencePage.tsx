import YouTubeIcon from '@mui/icons-material/YouTube';
import TheaterCreditsSection from '../TheaterCreditsSection';
import SpotifyPlayer from '../SpotifyPlayer';
import VideoCard from '../VideoCard';
import Reveal from '../Reveal';
import { theaterCredits } from '../data/theaterCredits';
import { cosmicCaravanVideos } from '../data/bands';
import { notablePerformances } from '../data/performances';
import cosmicCaravanPic from '../assets/cosmic-caravan-pic.jpeg';
import './pages.css';
import './ExperiencePage.css';

function PerformanceRow({ year, title, venue, youtubeLink }: (typeof notablePerformances)[number]) {
    return (
        <li className="perf-row">
            {year} · <span className="perf-row__title">{title}</span> · {venue}
            {youtubeLink && (
                <a
                    className="perf-row__yt"
                    href={youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${title}`}
                >
                    <YouTubeIcon />
                </a>
            )}
        </li>
    );
}

function ExperiencePage() {
    return (
        <div className="page">
            <div className="page__eyebrow">Experience</div>
            <h1 className="page__title">Pit and Band Experience</h1>
            <p className="page__lede">
                Take a look at my recent experience across pit gigs and bands.
            </p>

            <section className="page-section" aria-label="Musical theater credits">
                <h2 className="page-section__label">
                    Musical Theater
                    <span className="page-section__count">
                        {theaterCredits.length} productions
                    </span>
                </h2>
                <TheaterCreditsSection />
            </section>

            <section className="page-section" aria-label="Bands">
                <h2 className="page-section__label">Bands</h2>

                <Reveal className="band-block">
                    <div className="band-block__intro">
                        <img
                            className="band-block__photo"
                            src={cosmicCaravanPic}
                            alt="Fox and the Cosmic Caravan performing"
                        />
                        <div className="band-block__text">
                            <h3 className="band-block__name">Fox and the Cosmic Caravan</h3>
                            <p className="band-block__desc">
                                Rock band that gigged around Carnegie Mellon and
                                Pittsburgh. Wrote and recorded the album{' '}
                                <em>Cosmic Caravan</em>, released in 2023.
                            </p>
                            <SpotifyPlayer />
                        </div>
                    </div>
                    <div className="video-grid band-block__videos">
                        {cosmicCaravanVideos.map((v) => (
                            <VideoCard
                                key={v.youtubeId}
                                youtubeId={v.youtubeId}
                                caption={v.caption}
                            />
                        ))}
                    </div>
                </Reveal>
            </section>

            <section className="page-section" aria-label="Cabarets and recitals">
                <h2 className="page-section__label">
                    Cabarets &amp; Recitals
                    <span className="page-section__count">
                        {notablePerformances.length} notable performances
                    </span>
                </h2>
                <Reveal>
                    <ul className="perf-list">
                        {notablePerformances.map((p) => (
                            <PerformanceRow key={`${p.year}-${p.title}`} {...p} />
                        ))}
                    </ul>
                </Reveal>
            </section>
        </div>
    );
}

export default ExperiencePage;
