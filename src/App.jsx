import React, { useState, useEffect, useRef } from 'react'
import './App.css'
// import Header from './components/Header' // Replaced by Sidebar
import Sidebar from './components/Sidebar' // Import Sidebar
import Hero from './components/Hero'
import videoBg from './assets/sky.mp4'
import Intro from './components/Intro'
import Projects from './components/Projects'
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")); // Sample audio
  const [isPaused, setIsPaused] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'projects'
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [blurLevel, setBlurLevel] = useState(40);

  useEffect(() => {
    // Audio setup
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const scrollToSection = (sectionId) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div ref={scrollRef} className='bg-[#1A1A1A] h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative'>
      <video
        ref={videoRef}
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
        className='fixed top-0 left-0 w-full h-full object-cover -z-0 '
      />

      <Sidebar setCurrentView={setCurrentView} toggleAudio={toggleAudio} scrollToSection={scrollToSection} />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full'
          >
            {/* Section 1: Hero & Face */}
            <section id="hero" className={`min-h-screen w-full snap-start relative flex flex-col items-center justify-between transition-all duration-500 ${isPaused ? 'bg-[#1A1A1A]' : ''}`}>
              <Hero />
            </section>

            {/* Section 2: Intro */}
            <section id="intro" style={{ backdropFilter: `blur(${blurLevel}px)` }} className=' min-h-screen w-full snap-start flex flex-col justify-start items-center relative'>
              <Intro scrollContainerRef={scrollRef} blurLevel={blurLevel} setBlurLevel={setBlurLevel} />
            </section>
          </motion.div>
        )}

        {currentView === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-screen w-full fixed inset-0 z-40'
          >
            <Projects />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App