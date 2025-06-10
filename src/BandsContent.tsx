import { CardMedia, Paper, Typography } from "@mui/material";
import './BandsContent.css';
import './App.css';
import Youtube from 'react-youtube';
import cosmicCaravanPic from '/src/assets/cosmic-caravan-pic.jpeg';
import klezmerPic from "/src/assets/klezmer-pic.jpeg";

interface BandVideoProps {
    videoId: string;
    description?: string;
}

function BandVideo(props: BandVideoProps) {
    const { videoId, description } = props;
    return (
        <div className="band-vid-container">
            <Youtube className='youtube-vid' videoId={videoId} opts={{ height: "110", width: "180" }} />
            <p className='band-vid-text'>{ description }</p>
        </div>
    )
}

export const bandsExpandedContent = <div>
    <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Fox and the Cosmic Caravan</div>

    <div className="band-vids-container">
        <BandVideo 
            videoId="g6IVQ7syANc" 
            description="'Big Head' at S'n'Formal"
        />
        <BandVideo
            videoId="3GYBfs4etzU"
            description="'Black Sheep' at Black Forge"
        />
        <BandVideo
            videoId="QtavZNgWiWc"
            description="'I Wanna Be Your Dog' at The Underground"
        />
        <BandVideo
            videoId="9DV_7Co1G8s"
            description="'Space Cowboy' at graduation concert"
        />
    </div>

    {/* <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginTop: '1.3rem' }}>CMU Klezmer Band</div>
    <div className="band-vids-container">
        <BandVideo 
            videoId="I10UBhVukP0" 
            description="'Kadatchka' at Hanukkah party"
        />
        <BandVideo
            videoId="EoweI1uCsw8"
            description="'Bessarabia' at Matthew Rygelski's Junior CMU Recital"
        />
    </div> */}
</div>

export const bandsDescription = <div className='card-middle'>
    <div className='bands-content-container'>
        <div className="cosmic-caravan-container">
            <Paper 
                className='cosmic-caravan-photo'
                elevation={3}
                square={false}
                // sx={{ width: 150 }}
            >
                <CardMedia
                    component="img"
                    sx={{ borderRadius: 1 }}
                    image={cosmicCaravanPic}
                    // image="/src/assets/cosmic-caravan-pic.jpeg"
                    alt='Cosmic Caravan band'
                />
            </Paper>
            <Typography><span style={{ fontWeight: 'bold' }}>Fox and the Cosmic Caravan: </span>Did gigs around Carnegie Mellon and Pittsburgh.</Typography>
        </div>

        {/* <Divider /> */}

        {/* <div className="klezmer-band-container">
            <Typography><span style={{ fontWeight: 'bold' }}>CMU Klezmer Band: </span>Founded and played drums.</Typography>
            <Paper 
                className='klezmer-band-photo'
                elevation={3}
                square={false}
                // sx={{ width: 100 }}
            >
                <CardMedia
                    component="img"
                    sx={{ borderRadius: 1 }}
                    image={klezmerPic}
                    // image="/src/assets/klezmer-pic.jpg"
                    alt='Cosmic Caravan band'
                />
            </Paper>
        </div> */}
    </div>
</div>