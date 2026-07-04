// npm run dev
// import { Paper } from '@mui/material'
import './App.css'
import MenuAppBar from './AppBar'
import MusicCard from './MusicCard';
import { recitalsDescription } from './assets/descriptions.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Youtube from 'react-youtube';
import Footer from './Footer.tsx';
import { mtExpandedContent, musicalTheaterDescription } from './MusicalTheaterContent.tsx';
import { bandsExpandedContent } from './BandsContent.tsx';
import ParticlesBackground from './ParticlesBackground.tsx';
// @ts-ignore;
import AOS from 'aos';
import 'aos/dist/aos.css'; // You need to import the CSS too
import { useEffect } from 'react';
import { motion } from "framer-motion";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MusicalTheaterCarousel from './MusicalTheaterCarousel.tsx';
import PopCarousel from './PopCarousel.tsx';
import Hero from './Hero.tsx';

function App() {

  const headerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Adjust duration as needed
  };

  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true,    // whether animation should happen only once
      offset: 100,
    });
  }, []);

  return (
    <>
    <div className='app-container'>
    <ParticlesBackground />
      <MenuAppBar />
      {/* <SpotifyPlayer /> */}
      <div className="content-container">
        
        <Hero />

      <div
          id="experience"
          style={{
            marginTop: 30,
            marginBottom: 20,
            scrollMarginTop: '2rem',
          }}
        >
          <motion.h2
              variants={headerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: false }}
              style={{
                  fontSize: '3rem',
                  color: 'gray',
                  // fontFamily: "Fredoka One",
                  // fontFamily: "'IBM Plex Sans', sans-serif"
              }}
          >
              Experience
          </motion.h2>
        </div>

        <div className="cards-container">
          <MusicCard 
            title='Musical Theater' 
            description={musicalTheaterDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
            expandedContent={mtExpandedContent}
            expandText='Recent Shows'
          />
          <MusicCard 
            title='Fox and the Cosmic Caravan' 
            description={recitalsDescription} 
            // secondDescription={secondMusicalTheaterDescription} 
            expandedContent={bandsExpandedContent}
            // expandedContent={recitalsExpandedContent}
            expandText='Videos'
          />
          {/* <MusicCard 
            title='Social Media & Other Projects' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
          /> */}
          {/* <MusicCard 
            title='Bands & Collaborations' 
            description={bandsDescription} 
            // expandedContent={bandsExpandedContent}
            expandText='Videos'
            // secondDescription={secondMusicalTheaterDescription} 
          /> */}
          {/* <MusicCard 
            title='Miscellaneous' 
            description={<div className='card-middle'></div>} 
            // secondDescription={secondMusicalTheaterDescription} 
          /> */}
        </div>

        <div 
          style={{
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <motion.h2
              variants={headerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: false }}
              style={{
                  fontSize: '2.7rem',
                  color: 'gray',
              }}
          >
              Musical Theater Covers
          </motion.h2>
        </div>

        <div data-aos="fade-left">
          <MusicalTheaterCarousel />
        </div>

        <div 
          style={{
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <motion.h2
              variants={headerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: false }}
              style={{
                  fontSize: '2.7rem',
                  color: 'gray',
                  marginTop: '7rem',
              }}
          >
              Pop Covers
          </motion.h2>
        </div>

        <div data-aos="fade-left">
          <PopCarousel />
        </div>
        


      </div>
    </div>

    <div style={{ height: '5rem'}}></div>
    <Footer />
    </>
  )
}

export default App
