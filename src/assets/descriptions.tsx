
// export const musicalTheaterDescription = "\
// Etan has experience in regional, community, and school theaters. \
// Recent shows include Winter Wonderettes at Greater Boston Stage Company, and Cabaret at Vokes Theater.\

import { Divider, Typography } from "@mui/material"
import '../App.css'
import SpotifyPlayer from "../SpotifyPlayer"
import ResumeLine from "../ResumeLine"

export const recitalsExpandedContent = <div>
    <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', }}>Notable Shows (* = upcoming)</Typography>
    <div style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
        <ResumeLine 
            year="2023"
            show="Matthew Zwiebel's MT Cabaret"
            theater="CMU School of Music"
        />
        <ResumeLine 
            year="2023"
            show="Josiah Handelman Senior Recital"
            theater="CMU School of Music (congas)"
            youtubeLink="https://youtu.be/acaWBXm6aZM?t=676"
        />
        <ResumeLine 
            year="2022"
            show="Everything In Its Time: A Musical Cabaret"
            theater="CMU School of Music"
            youtubeLink="https://www.youtube.com/watch?v=ZG-V3VFSMrI&list=PLKIyoBAAgcNAxqKOVSolkEsEEs_b1mo4A&index=5"
        />
        <ResumeLine 
            year="2022"
            show="Annalise Rogers Senior Recital"
            theater="CMU School of Music"
            youtubeLink="https://youtu.be/LrmZbuuFCTg?t=3853"
        />
        <ResumeLine 
            year="2021"
            show="Matthew Rygelski Junior Recital"
            theater="CMU School of Music"
            youtubeLink="https://www.youtube.com/watch?v=EoweI1uCsw8"
        />
        <ResumeLine 
            year="2021"
            show="Hanukkah 2021 Performance"
            theater="CMU Klezmer Band"
            youtubeLink="https://www.youtube.com/watch?v=I10UBhVukP0&list=PLfbyNxCSa0lWJYpVAN1bar75ZicY5Cl97"
        />
        <ResumeLine 
            year="2021"
            show="2021 Annual Benefit Cabaret"
            theater="Scotch'n'Soda Theater"
        />
        <ResumeLine 
            year="2019"
            show="Low Standards Cabaret"
            theater="CMU School of Drama"
            youtubeLink="https://www.youtube.com/watch?v=_sXI-I73skk&list=PLfbyNxCSa0lXjuMn2gkFwE81_rnxJ7NsH&index=1"
        />
        <ResumeLine 
            year="2019"
            show="2019 Annual Benefit Cabaret"
            theater="Scotch'n'Soda Theater"
        />
    </div>
</div>

export const sessionWorkDescription = <div className='card-middle'>
    <span>Etan recorded an album with his band.</span>
    <SpotifyPlayer />
</div>

export const recitalsDescription = <div className='card-middle'>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Etan did a lot of recitals through Carnegie Mellon's School of Music.
    </Typography>
</div>