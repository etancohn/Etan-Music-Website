import YouTubeIcon from '@mui/icons-material/YouTube';
import TheaterCreditsSection from '../TheaterCreditsSection';
import SpotifyPlayer from '../SpotifyPlayer';
import VideoCard from '../VideoCard';
import Reveal from '../Reveal';
import { Performance } from '../data/performances';
import { useContent } from '../content.tsx';
import cosmicCaravanPic from '../assets/cosmic-caravan-pic.jpeg';
import './pages.css';
import './ExperiencePage.css';

function PerformanceRow({ year, title, venue, youtubeLink }: Performance) {
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
    const { theaterCredits, bands, performances } = useContent();

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
                        {theaterCredits.credits.length} productions
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
                            alt={`${bands.name} performing`}
                        />
                        <div className="band-block__text">
                            <h3 className="band-block__name">{bands.name}</h3>
                            <p className="band-block__desc">{bands.description}</p>
                            <SpotifyPlayer />
                        </div>
                    </div>
                    <div className="video-grid band-block__videos">
                        {bands.videos.map((v) => (
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
                        {performances.items.length} notable performances
                    </span>
                </h2>
                <Reveal>
                    <ul className="perf-list">
                        {performances.items.map((p) => (
                            <PerformanceRow key={`${p.year}-${p.title}`} {...p} />
                        ))}
                    </ul>
                </Reveal>
            </section>
        </div>
    );
}

export default ExperiencePage;
