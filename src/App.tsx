// npm run dev
import { Avatar, Divider, Typography } from '@mui/material'
import './App.css'
import MenuAppBar from './AppBar'
import MusicCard from './MusicCard';
import { recitalsExpandedContent, sessionWorkDescription } from './assets/descriptions.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import blob1 from './assets/blob1.svg';
// import blob2 from './assets/blob2.svg';
// import blob3 from './assets/blob3.svg';
import blob1 from './assets/blob1.png';
import blob3 from './assets/blob3.png';
import blob4 from './assets/blob3.png';
import Youtube from 'react-youtube';
import SpotifyPlayer from './SpotifyPlayer.tsx';
import Footer from './Footer.tsx';
import { mtExpandedContent, musicalTheaterDescription } from './MusicalTheaterContent.tsx';

function App() {
  return (
    <>
    <div className='app-container'>
      <MenuAppBar />
      {/* <SpotifyPlayer /> */}
      <div className="content-container">
          {/* <div className="avatar-container">
          <Avatar sx={{ width: 100, height: 100 }} src="/src/assets/etan-drums-ww.jpg" />
            <div className='text'>Genres: musical theater, jazz, etc.</div>
            <div className='text'>Skills: Sight-reading, etc.</div>
          </div> */}

          <div className='green-strip-container'>
            <img 
                  className='green-strip'
                  src='./src/assets/green-strip.png'
                  // width='100%'
                  // height={300}
            />
            <div className="videos-container">
              <div className="video-container">
                <Youtube className='youtube-vid' videoId={"QetcQ_k17VM"} opts={{ height: "180", width: "270" }} />
                <span className='vid-text'>Dancing Through Life - Wicked</span>
              </div>
              <div className="video-container">
                <Youtube className='youtube-vid' videoId={"HpSeqORjsks"} opts={{ height: "180", width: "270" }} />
                <span className='vid-text'>Performance at City Winery</span>
              </div>
              <div className="video-container">
                <Youtube className='youtube-vid' videoId={"LB5AzCmnAG4"} opts={{ height: "180", width: "270" }} />
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
        <div className='explore-experience-txt'>
          <Typography className='text explore-experience-txt' variant='h4'>Explore My Experience</Typography>
        </div>

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
            description={musicalTheaterDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
            expandedContent={recitalsExpandedContent}
            expandText='Videos'
          />
          <MusicCard 
            title='Social Media & Other Projects' 
            description={musicalTheaterDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
          />
          <MusicCard 
            title='Bands & Collaborations' 
            description={musicalTheaterDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
          />
          <MusicCard 
            title='Miscellaneous' 
            description={musicalTheaterDescription} 
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
