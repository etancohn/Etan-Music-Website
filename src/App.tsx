// npm run dev
// import { Paper } from '@mui/material'
import './App.css'
import MenuAppBar from './AppBar'
import MusicCard from './MusicCard';
import { recitalsExpandedContent, sessionWorkDescription } from './assets/descriptions.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Youtube from 'react-youtube';
import Footer from './Footer.tsx';
import { mtExpandedContent, musicalTheaterDescription } from './MusicalTheaterContent.tsx';
import { bandsDescription, bandsExpandedContent } from './BandsContent.tsx';
import ParticlesBackground from './ParticlesBackground.tsx';
import ReactPlayer from 'react-player/youtube';
import { Paper, Box, Grid, Typography } from '@mui/material';

function App() {
  return (
    <>
    <div className='app-container'>
    <ParticlesBackground />
      <MenuAppBar />
      {/* <SpotifyPlayer /> */}
      <div className="content-container">
        
        <div className="avatar-container">
          <div className='grow-hover'>
            <Paper 
              elevation={2}
              style={{ 
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: '#f3f4f5', paddingLeft: '50px', paddingRight: '50px', marginBottom: '1rem'
                }}
              >
              <div style={{ marginBottom: '0rem', fontSize: '2rem', fontWeight: 900, color: 'gray' }}>Etan Cohn</div>
              <div style={{ color: 'gray', marginBottom: '0.5rem' }}>Drummer based in Cambridge, MA</div>
              {/* <Avatar sx={{ width: 80, height: 80, boxShadow: 0, marginBottom: '1rem' }} src="/src/assets/etan-drums-ww.jpeg" /> */}
            </Paper>
          </div>
        </div>

          <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
          mt: 4,
          mb: 6,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, md: 4 },
            width: '100%',
            maxWidth: 960,
            borderRadius: 2,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Section Title with Green Accent */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 2, md: 3 },
              fontWeight: 700,
              color: 'black',
              letterSpacing: '-0.02em',
              position: 'relative', // Needed for pseudo-element
              pb: 0.5, // Padding at the bottom for the underline
              '&::after': { // The green underline
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px', // Length of the underline
                height: '4px', // Thickness of the underline
                bgcolor: "darkGreen", // Your dark green color
                borderRadius: '2px', // Slightly rounded ends
              },
            }}
          >
            Videos
          </Typography>

    {/* Video Grid */}
    <Grid container spacing={4} justifyContent="center">
      {/* Video 1 */}
      <Grid item xs={12} sm={6} md={4}> {/* Responsive sizing for each video */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 1.5, // Padding around video and text
          // Optional: If you want each video to have its own subtle card-like look within the Paper
          // border: '1px solid #e0e0e0', // Light border
          // borderRadius: 1, // Slight rounding
          // bgcolor: '#f9f9f9', // Very subtle background
        }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=QetcQ_k17VM" // **USE YOUR ACTUAL YOUTUBE URLS HERE**
            light={true} // Only loads iframe after click for performance
            width="100%" // Important for responsiveness within the Grid item
            height={180} // Adjust this height or use aspect ratio settings if preferred
            controls
          />
          <Typography
            variant="body1" // Standard body text size
            sx={{
              mt: 1.5, // Margin top for space between video and text
              fontWeight: 500, // Medium boldness
              color: 'text.secondary', // Muted text color
              lineHeight: 1.4, // Good line spacing
            }}
          >
            Dancing Through Life - Wicked
          </Typography>
        </Box>
      </Grid>

      {/* Video 2 */}
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 1.5,
        }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=HpSeqORjsks" // **USE YOUR ACTUAL YOUTUBE URLS HERE**
            light={true}
            width="100%"
            height={180}
            controls={true}
          />
          <Typography
            variant="body1"
            sx={{
              mt: 1.5,
              fontWeight: 500,
              color: 'text.secondary',
              lineHeight: 1.4,
            }}
          >
            Performance at City Winery
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Paper>
</Box>

        <div className="cards-container">
          <MusicCard 
            title='Musical Theater' 
            description={musicalTheaterDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
            expandedContent={mtExpandedContent}
            expandText='Recent Shows'
          />
          <MusicCard 
            title='Session Work & Recordings' 
            description={sessionWorkDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
          />
          <MusicCard 
            title='Recitals & Live Performances' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
            expandedContent={recitalsExpandedContent}
            expandText='Videos'
          />
          {/* <MusicCard 
            title='Social Media & Other Projects' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
          /> */}
          <MusicCard 
            title='Bands & Collaborations' 
            description={bandsDescription} 
            expandedContent={bandsExpandedContent}
            expandText='Videos'
            // secondDescription={secondMusicalTheaterDescription} 
          />
          {/* <MusicCard 
            title='Miscellaneous' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
          /> */}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default App
