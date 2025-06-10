
// export const musicalTheaterDescription = "\
// Etan has experience in regional, community, and school theaters. \
// Recent shows include Winter Wonderettes at Greater Boston Stage Company, and Cabaret at Vokes Theater.\

import { Typography } from "@mui/material"
import '../App.css'
import SpotifyPlayer from "../SpotifyPlayer"
import ResumeLine from "../ResumeLine"
import YouTube from "react-youtube"

export const recitalsExpandedContent = <div>
    <YouTube videoId={"yjH9kFUOr14"} opts={{ height: "170", width: "250" }} />
    <YouTube videoId={"4NQ0k0Pyisg"} opts={{ height: "170", width: "250" }} />
    
    <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', }}>Notable Performances</Typography>
    <div style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
        <ResumeLine 
            year="2023"
            show="Matthew Zwiebel's MT Cabaret"
            theater="CMU School of Music"
            youtubeLink="https://drive.google.com/drive/u/0/folders/1-2KTO7OUhAk_OIyjkZJznCCLnD7-TZug"
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
    {/* <span> an album with his band.</span> */}
    {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <SpotifyPlayer />
    </div> */}
    {/* <SoundCloudPlaylist playlistUrl='https://soundcloud.com/joshua-fried-599198325/sets/desdemona' /> */}
    {/* <SoundCloudPlayer trackUrl='https://soundcloud.com/joshua-fried-599198325/sets/desdemona' /> */}
</div>

export const recitalsDescription = <div className='card-middle'>
        <Typography 
            style={{
                marginBottom: '1rem',
                width: '90%',
            }}>Rock band in college. Gigged around Carnegie Mellon and Pittsburgh, and created an album.</Typography>
            <span
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <SpotifyPlayer />
    </span>
    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}> */}
    {/* Etan did a lot of recitals through Carnegie Mellon's School of Music. */}
    {/* </Typography> */}
</div>