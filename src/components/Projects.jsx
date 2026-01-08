import React, { useState } from 'react'
import Project from './Project'
import { motion } from "framer-motion";

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
            <div className='w-full h-full flex flex-col justify-start items-center'>
                <p className='font-fustat text-4xl text-white/95 font-bold tracking-tighter py-12 z-10'>Featured Works</p>

                <div className="relative w-full h-full flex items-center">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevProject}
                        disabled={currentIndex === 0}
                        className={`absolute left-10 z-20 p-4 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-all ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>

                    <button
                        onClick={nextProject}
                        disabled={currentIndex === projects.length - 1}
                        className={`absolute right-10 z-20 p-4 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-all ${currentIndex === projects.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
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