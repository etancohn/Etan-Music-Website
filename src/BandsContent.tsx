import { CardMedia, Divider, Paper, Typography } from "@mui/material";
import './BandsContent.css';
import './App.css';

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
                    image="/src/assets/cosmic-caravan-pic.jpeg"
                    alt='Cosmic Caravan band'
                />
            </Paper>
            <Typography><span style={{ fontWeight: 'bold' }}>Fox and the Cosmic Caravan: </span>Did gigs around Carnegie Mellon and Pittsburgh.</Typography>
        </div>

        {/* <Divider /> */}

        <div className="klezmer-band-container">
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
                    image="/src/assets/klezmer-pic.jpg"
                    alt='Cosmic Caravan band'
                />
            </Paper>
        </div>
    </div>
</div>