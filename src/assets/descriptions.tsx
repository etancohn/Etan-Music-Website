
// export const musicalTheaterDescription = "\
// Etan has experience in regional, community, and school theaters. \
// Recent shows include Winter Wonderettes at Greater Boston Stage Company, and Cabaret at Vokes Theater.\

import { Typography } from "@mui/material"
import '../App.css'
import SpotifyPlayer from "../SpotifyPlayer"

export const sessionWorkDescription = <div className='card-middle'>
    <span>Etan recorded an album with his band.</span>
    <SpotifyPlayer />
</div>

export const musicalTheaterDescription = <div className='card-middle'>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Etan has experience in <span className="bold">regional</span>, <span className="bold">community</span>, and <span className="bold">school</span> theaters.
    Recent shows include <span className="italic">Winter Wonderettes</span> at Greater Boston Stage Company, and <span className="italic">Cabaret</span> at Vokes Theater.
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Other recent shows include <span className="italic">Kiss of the Spider Woman</span>, <span className="italic">The Prom</span>, <span className="italic">Newsies</span>, <span className="italic">Something Rotten!</span>, and <span className="italic">9 To 5.</span>
    </Typography>
</div>

export const secondMusicalTheaterDescription = <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Other recent shows include <span className="italic">Kiss of the Spider Woman</span>, <span className="italic">The Prom</span>, <span className="italic">Newsies</span>, <span className="italic">Something Rotten!</span>, and <span className="italic">9 To 5.</span>
</Typography>