import React from 'react'
import './App.css'

function SpotifyPlayer() {
  return (
    <div className='spotify-player'>
        <iframe 
          src="https://open.spotify.com/embed/album/6qpXymrH8rOpX813rRFgzn?utm_source=generator&theme=0" 
          width="270" 
          height="152" 
          frameBorder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
    </div>
  )
}

export default SpotifyPlayer
