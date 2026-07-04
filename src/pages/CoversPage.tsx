import VideoCard from '../VideoCard';
import Reveal from '../Reveal';
import { musicalTheaterCovers, popCovers } from '../data/covers';
import './pages.css';

function CoversPage() {
    return (
        <div className="page">
            <div className="page__eyebrow">Drum Covers</div>
            <h1 className="page__title">Drum Covers</h1>
            <p className="page__lede">
                Check out some drum covers I recorded across different styles.
            </p>

            <section className="page-section" aria-label="Musical theater covers">
                <h2 className="page-section__label">
                    Musical Theater
                    <span className="page-section__count">
                        {musicalTheaterCovers.length} covers
                    </span>
                </h2>
                <Reveal className="video-grid">
                    {musicalTheaterCovers.map((v) => (
                        <VideoCard
                            key={v.youtubeId}
                            youtubeId={v.youtubeId}
                            caption={v.title}
                        />
                    ))}
                </Reveal>
            </section>

            <section className="page-section" aria-label="Pop covers">
                <h2 className="page-section__label">
                    Pop
                    <span className="page-section__count">{popCovers.length} covers</span>
                </h2>
                <Reveal className="video-grid">
                    {popCovers.map((v) => (
                        <VideoCard
                            key={v.youtubeId}
                            youtubeId={v.youtubeId}
                            caption={v.title}
                        />
                    ))}
                </Reveal>
            </section>
        </div>
    );
}

export default CoversPage;
