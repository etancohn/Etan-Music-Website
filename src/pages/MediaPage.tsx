import VideoCard from '../VideoCard';
import VideoCarousel from '../VideoCarousel';
import Reveal from '../Reveal';
import SpotifyPlayer from '../SpotifyPlayer';
import { CoverVideo } from '../data/covers';
import { rich } from '../richText';
import { useContent } from '../content.tsx';
import cosmicCaravanPic from '../assets/cosmic-caravan-pic.jpeg';
import './pages.css';
import './MediaPage.css';

const toCarousel = (videos: CoverVideo[]) =>
    videos.map((v) => ({ youtubeId: v.youtubeId, caption: v.title }));

function MediaPage() {
    const { bands, covers } = useContent();

    return (
        <div className="page">
            <h1 className="page__title">Media</h1>

            <VideoCarousel
                title="Musical Theater Drum Covers"
                videos={toCarousel(covers.musicalTheater)}
            />
            <VideoCarousel title="Pop Drum Covers" videos={toCarousel(covers.pop)} />

            <section className="page-section" aria-label={bands.name}>
                <h2 className="page-section__label">{bands.name}</h2>

                <Reveal className="band-block">
                    <img
                        className="band-block__photo"
                        src={bands.photoUrl || cosmicCaravanPic}
                        alt={`${bands.name} performing`}
                    />
                    <div className="band-block__text">
                        <p className="band-block__desc">{rich(bands.description)}</p>
                        <SpotifyPlayer />
                    </div>
                </Reveal>

                <Reveal className="video-grid band-block__videos">
                    {bands.videos.map((v) => (
                        <VideoCard key={v.youtubeId} youtubeId={v.youtubeId} caption={v.caption} />
                    ))}
                </Reveal>
            </section>
        </div>
    );
}

export default MediaPage;
