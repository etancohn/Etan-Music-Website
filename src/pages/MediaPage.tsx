import VideoCard from '../VideoCard';
import Reveal from '../Reveal';
import SpotifyPlayer from '../SpotifyPlayer';
import { CoverVideo } from '../data/covers';
import { useContent } from '../content.tsx';
import cosmicCaravanPic from '../assets/cosmic-caravan-pic.jpeg';
import './pages.css';
import './MediaPage.css';

function CoverGroup({ label, videos }: { label: string; videos: CoverVideo[] }) {
    return (
        <div className="cover-group">
            <h3 className="cover-group__label">
                {label}
                <span className="cover-group__count">{videos.length} covers</span>
            </h3>
            <Reveal className="video-grid">
                {videos.map((v) => (
                    <VideoCard
                        key={v.youtubeId}
                        youtubeId={v.youtubeId}
                        caption={v.title}
                    />
                ))}
            </Reveal>
        </div>
    );
}

function MediaPage() {
    const { bands, covers } = useContent();

    return (
        <div className="page">
            <div className="page__eyebrow">Media</div>
            <h1 className="page__title">Videos &amp; Recordings</h1>
            <p className="page__lede">
                Watch and listen — recordings and live videos with my bands, plus
                drum covers across styles.
            </p>

            <section className="page-section" aria-label="Recordings">
                <h2 className="page-section__label">Recordings</h2>

                <Reveal className="band-block">
                    <div className="band-block__intro">
                        <img
                            className="band-block__photo"
                            src={bands.photoUrl || cosmicCaravanPic}
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

            <section className="page-section" aria-label="Drum covers">
                <h2 className="page-section__label">
                    Drum Covers
                    <span className="page-section__count">
                        {covers.musicalTheater.length + covers.pop.length} covers
                    </span>
                </h2>
                <CoverGroup label="Musical Theater" videos={covers.musicalTheater} />
                <CoverGroup label="Pop" videos={covers.pop} />
            </section>
        </div>
    );
}

export default MediaPage;
