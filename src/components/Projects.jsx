import React, { useState } from 'react'
import Project from './Project'
import { motion } from "framer-motion";
import CircuitBackground from './CircuitBackground';

function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const projects = [0, 1]; // Placeholder for project data indices

    const nextProject = () => {
        if (currentIndex < projects.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevProject = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <section className="h-screen w-full relative overflow-hidden bg-primary-dark">
            <CircuitBackground />
            <div className='w-full h-full flex flex-col justify-start items-center relative z-10'>
                <p className='absolute top-10 left-0 w-full text-center font-fustat text-xl text-white/50 font-bold tracking-[0.2em] uppercase z-20 pointer-events-none mix-blend-overlay'>Featured Works</p>

                <div className="relative w-full h-full flex items-center">
                    {/* Navigation Buttons */}
                    {/* Navigation Buttons */}
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevProject}
                        disabled={currentIndex === 0}
                        className={`absolute left-2 lg:left-10 z-20 bg-white/5 bg-noise backdrop-blur-md border border-white/10 rounded-full transition-all group p-1 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white/10'}`}
                    >
                        {/* Shine effect on border */}
                        <div className='absolute w-full h-full bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity'></div>

                        {/* Masked Border */}
                        <div
                            className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                                WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                            }}
                        ></div>
                        <div className='p-2 lg:p-3 relative z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </div>
                    </button>

                    <button
                        onClick={nextProject}
                        disabled={currentIndex === projects.length - 1}
                        className={`absolute right-2 lg:right-10 z-20 bg-white/5 bg-noise backdrop-blur-md border border-white/10 rounded-full transition-all group p-1 ${currentIndex === projects.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white/10'}`}
                    >
                        {/* Shine effect on border */}
                        <div className='absolute w-full h-full bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity'></div>

                        {/* Masked Border */}
                        <div
                            className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                                WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                            }}
                        ></div>
                        <div className='p-2 lg:p-3 relative z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </div>
                    </button>

                    {/* Works Carousel */}
                    <div className='w-full h-full overflow-hidden'>
                        <motion.div
                            className='flex h-full'
                            animate={{ x: `calc(-100vw * ${currentIndex})` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className='min-w-[100vw] h-full flex justify-center items-center'>
                                <Project />
                            </div>
                            <div className='min-w-[100vw] h-full flex justify-center items-center'>
                                <Project />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* Background Noise/Overlay if needed, retained from original structure */}
            <div className='absolute inset-0 bg-noise opacity-30 pointer-events-none'></div>
        </section>
    )
}

export default Projects