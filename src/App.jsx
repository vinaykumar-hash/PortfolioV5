import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Head from './components/Head'
import videoBg from './assets/2025.mp4'
import Intro from './components/Intro'
import Projects from './components/Projects'

function App() {
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

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
    <div ref={scrollRef} className='bg-[#1A1A1A] h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth'>
      <video
        ref={videoRef}
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
        className='fixed top-0 left-0 w-full h-full object-cover -z-0 opacity-20'
      />

      {/* Section 1: Hero & Face */}
      <section className={`min-h-screen w-full snap-start relative flex flex-col items-center justify-between transition-all duration-500 ${isPaused ? 'bg-[#1A1A1A]' : ''}`}>
        <Header />
        <Hero />
        <Head isPaused={isPaused} setIsPaused={setIsPaused} />
      </section>

      {/* Section 2: Intro */}
      <section className=' min-h-screen w-full snap-start flex flex-col justify-start items-center relative backdrop-blur-2xl'>
        <Intro scrollContainerRef={scrollRef} />
      </section>
      <section className=' min-h-screen w-full snap-start flex flex-col justify-start items-center relative backdrop-blur-2xl'>
        <Projects />
      </section>
    </div>
  )
}

export default App