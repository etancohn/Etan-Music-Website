import VideoCard from '../VideoCard';
import Reveal from '../Reveal';
import { useContent } from '../content.tsx';
import './pages.css';

function CoversPage() {
    const { musicalTheater, pop } = useContent().covers;

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
                        {musicalTheater.length} covers
                    </span>
                </h2>
                <Reveal className="video-grid">
                    {musicalTheater.map((v) => (
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
                    <span className="page-section__count">{pop.length} covers</span>
                </h2>
                <Reveal className="video-grid">
                    {pop.map((v) => (
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
