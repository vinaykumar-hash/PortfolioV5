import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import SystemFlow1 from './SystemFlow1';

const Project = () => {
    const [hoveredAction, setHoveredAction] = useState(null);
    const [showSystemFlow, setShowSystemFlow] = useState(false);

    return (
        <div className='w-full h-full relative group overflow-hidden bg-primary-dark'>
            {/* Background Image */}
            <motion.img
                src="../src/assets/switch.png"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${showSystemFlow ? 'grayscale opacity-30 blur-sm' : 'group-hover:scale-105 opacity-60'}`}
            />

            {/* Gradient Overlay for Text Readability */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-500 ${showSystemFlow ? 'opacity-90' : 'opacity-100'}`}></div>

            {/* System Flow Overlay */}
            <AnimatePresence>
                {showSystemFlow && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="absolute inset-0 z-20 p-20 flex justify-center items-center"
                    >
                        <div className='w-full h-full border border-white/10 bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden relative'>
                            <SystemFlow1 />
                            <div
                                onClick={() => setShowSystemFlow(false)}
                                className=' absolute top-10 right-10 z-50 p-1 bg-white/5 hover:bg-white/10 bg-noise backdrop-blur-md border border-white/10 rounded-full cursor-pointer transition-colors group'
                            >
                                {/* Shine effect on border */}
                                {/* <div className='absolute w-full h-full bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity'></div> */}

                                {/* Masked Border */}
                                <div
                                    className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                                    style={{
                                        maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                                        WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                                    }}
                                ></div>
                                <div className='p-3 relative z-10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:rotate-90 transition-transform"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Overlay */}
            <div className={`absolute bottom-0 left-0 w-full px-20 py-10 z-10 flex flex-col items-center gap-8 transition-all duration-500 ${showSystemFlow ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>

                {/* Text Content */}
                <div className='flex flex-col justify-center items-center gap-2 max-w-4xl text-center'>
                    <h1 className='font-fustat text-6xl text-white/80 font-bold tracking-tighter'>Switch</h1>
                    <p className='text-white/60 text-xl font-fustat tracking-wide max-w-2xl'>
                        Generate 1000+ clothes with different art styles in seconds. Professional grade AI generation for the modern creative.
                    </p>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-4'>
                    <div className='relative bg-primary/60 bg-noise flex justify-center items-center p-1 rounded-full text-white border border-primary/20 backdrop-blur-xl pointer-events-auto shadow-2xl shadow-primary/10 group/btn cursor-pointer transition-colors hover:bg-primary/80'>
                        {/* Shine effect on border */}
                        {/* <div className='absolute w-full h-full bg-gradient-to-b from-primary/20 to-primary top-0 left-0 blur-xl opacity-20 group-hover/btn:opacity-40 transition-opacity'></div> */}

                        {/* Masked Border */}
                        <div
                            className="absolute inset-0 rounded-full border border-primary/60 pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                                WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                            }}
                        ></div>

                        <a href="https://switchstyle.app" target="_blank" rel="noopener noreferrer" className='relative z-10 flex items-center gap-2 px-8 py-2'>
                            <span className='font-fustat text-white font-bold tracking-tighter text-lg uppercase'>Try it Live</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </a>
                    </div>

                    <div
                        onClick={() => setShowSystemFlow(!showSystemFlow)}
                        className='relative bg-white/5 bg-noise flex justify-center items-center p-1 rounded-full text-white border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl cursor-pointer transition-colors hover:bg-white/10 group'
                    >
                        {/* Shine effect on border */}
                        {/* <div className='absolute w-full h-full bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity'></div> */}

                        {/* Masked Border */}
                        <div
                            className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                            style={{
                                maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                                WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                            }}
                        ></div>

                        <div className='relative z-10 px-8 py-2'>
                            <span className='font-fustat text-white font-bold tracking-tighter text-lg uppercase'>
                                View System Flow
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project