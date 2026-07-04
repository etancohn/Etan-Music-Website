import ReactPlayer from 'react-player/youtube';
import './VideoCard.css';

function PlayBadge() {
    return (
        <span className="video-card__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
        </span>
    );
}

interface VideoCardProps {
    youtubeId: string;
    caption: string;
}

function VideoCard({ youtubeId, caption }: VideoCardProps) {
    return (
        <div className="video-card">
            <div className="video-card__media">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${youtubeId}`}
                    light={true}
                    controls
                    width="100%"
                    height="100%"
                    playIcon={<PlayBadge />}
                />
            </div>
            <div className="video-card__caption">{caption}</div>
        </div>
    );
}

export default VideoCard;
