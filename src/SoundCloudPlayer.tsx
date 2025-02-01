import React from "react";
import ReactPlayer from "react-player";

export const SoundCloudPlayer = ({ trackUrl }) => {
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}`;

  return (
    <iframe
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={embedUrl}
    ></iframe>
  );
};

export const SoundCloudPlaylist = ({ playlistUrl }) => {
  return <ReactPlayer url={playlistUrl} width="100%" height="300px" />;
};