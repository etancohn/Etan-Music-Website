// npm run dev
import { Paper } from '@mui/material'
import './App.css'
import MenuAppBar from './AppBar'
import MusicCard from './MusicCard';
import { recitalsExpandedContent, sessionWorkDescription } from './assets/descriptions.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Youtube from 'react-youtube';
import Footer from './Footer.tsx';
import { mtExpandedContent, musicalTheaterDescription } from './MusicalTheaterContent.tsx';
import { bandsDescription, bandsExpandedContent } from './BandsContent.tsx';
import greenStripPhoto from './assets/green-strip.png';

function App() {
  return (
    <>
    <div className='app-container'>
      <MenuAppBar />
      {/* <SpotifyPlayer /> */}
      <div className="content-container">
          <div className="avatar-container">
          <div className='grow-hover'>
            <Paper 
              elevation={1}
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
          {/* <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <IconButton 
                size='medium'
            >
                <EmailIcon 
                    style={{ color: 'gray', fontSize: '1.5rem', margin: '-0.5rem -0.1rem' }}
                >
                </EmailIcon>
            </IconButton>
            <div style={{ color: 'gray' }}>etan.cohn@gmail.com</div>
          </div> */}

            {/* <div 
              className='text' style={{ marginTop: '1rem' }}
            >
              <span style={{ fontWeight: 'bold' }}>Genres:</span> musical theater, rock latin, funk, jazz, pop, klezmer, hip-hop
            </div>
            <div 
              className='text'
            >
              <span style={{ fontWeight: 'bold' }}>Skills:</span> sight-reading, transcription, improvisation, aux. percussion
            </div> */}
          </div>

          <div className='green-strip-container'>
            <img 
                  className='green-strip'
                  src={greenStripPhoto}
                  // src='/src/assets/green-strip.png'
                  // width='100%'
                  // height={300}
            />
            <div className="videos-container" style={{ marginTop: '0.3rem'}}>
              <div className="video-container">
                <Youtube className='youtube-vid' videoId={"QetcQ_k17VM"} opts={{ height: "155", width: "250" }} />
                <span className='vid-text'>Dancing Through Life - Wicked</span>
              </div>
              <div className="video-container">
                <Youtube className='youtube-vid' videoId={"HpSeqORjsks"} opts={{ height: "155", width: "250" }} />
                <span className='vid-text'>Performance at City Winery</span>
              </div>
              <div className="video-container">
                <Youtube className='youtube-vid' videoId={"LB5AzCmnAG4"} opts={{ height: "155", width: "250" }} />
                <span className='vid-text'>Too Sweet - Hozier</span>
              </div>
            </div>
          </div>

        {/* <div className='videos-container'></div> */}
        {/* <div className="blobs-container">
          <div className='blob-container'>
            <img 
              className='blob'
              src={blob4}
              width={480}
              height={360}
            />
            <Youtube className='youtube-vid' videoId={"gnsulRFrfno"} opts={{ height: "160", width: "220" }} />
            <div className='vid-txt-container'>
              <span className='vid-txt'>Jazz improv at Mad Monkfish</span>
            </div>
          </div>

          <div className="blob-container">
          <img 
              className='blob'
              src={blob3}
              width={480}
              height={360}
            />
            <Youtube className='youtube-vid' videoId={"gnsulRFrfno"} opts={{ height: "160", width: "220" }} />
            <div className='vid-txt-container'>
              <span className='vid-txt'>Jazz improv at Mad Monkfish</span>
            </div>
          </div>
          <div className="blob-container">
          <img 
              className='blob'
              src={blob4}
              width={480}
              height={360}
            />
            <Youtube className='youtube-vid' videoId={"gnsulRFrfno"} opts={{ height: "160", width: "220" }} />
            <div className='vid-txt-container'>
              <span className='vid-txt'>Jazz improv at Mad Monkfish</span>
            </div>
          </div>
        </div> */}

        {/* <Divider /> */}

        {/* <h2 className='text explore-experience-txt'>Explore My Experience</h2> */}
        {/* <div className='explore-experience-txt'>
          <Typography className='text explore-experience-txt' variant='h4'>Explore My Experience</Typography>
        </div> */}

        <div className="cards-container">
          <MusicCard 
            title='Musical Theater' 
            description={musicalTheaterDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
            expandedContent={mtExpandedContent}
            expandText='Notable Shows'
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
          <MusicCard 
            title='Social Media & Other Projects' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
          />
          <MusicCard 
            title='Bands & Collaborations' 
            description={bandsDescription} 
            expandedContent={bandsExpandedContent}
            expandText='Videos'
            // secondDescription={secondMusicalTheaterDescription} 
          />
          <MusicCard 
            title='Miscellaneous' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default App
