import ReactPlayer from "react-player";

interface SoundCloudProps {
  trackUrl: string;
}

export const SoundCloudPlayer = (props: SoundCloudProps) => {
  const { trackUrl } = props;
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}`;

  return (
    <iframe
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      loading="lazy"
      allow="autoplay"
      src={embedUrl}
    ></iframe>
  );
};

interface SoundCloudPlaylistProps {
  playlistUrl: string;
}

export const SoundCloudPlaylist = (props: SoundCloudPlaylistProps) => {
  const { playlistUrl } = props;
  return <ReactPlayer url={playlistUrl} width="100%" height="300px" />;
};