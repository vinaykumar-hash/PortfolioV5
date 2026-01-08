import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import SystemFlow1 from './SystemFlow1';

const Project = () => {
    const [hoveredAction, setHoveredAction] = useState(null);
    const [showSystemFlow, setShowSystemFlow] = useState(false);

    return (
        <div className='flex justify-center items-center flex-col w-screen h-full gap-8 pb-6'>
            <div className='w-[60%] h-full bg-primary-dark rounded-lg relative flex justify-center items-end gap-4 overflow-hidden group border border-white/5'>
                <motion.img
                    src="../src/assets/switch.png"
                    className={`z-0 absolute w-full h-full object-cover transition-all duration-500 ${hoveredAction ? 'blur-md scale-105 opacity-50' : 'group-hover:scale-105'} ${showSystemFlow ? 'grayscale opacity-30 blur-sm' : ''}`}
                ></motion.img>

                <AnimatePresence>
                    {showSystemFlow && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 z-10 p-8"
                        >
                            <SystemFlow1 />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {hoveredAction && !showSystemFlow && (
                        <div className='absolute inset-0 flex justify-center items-center z-20 pointer-events-none'>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className='font-fustat text-4xl font-bold text-white uppercase tracking-tighter'
                            >
                                {hoveredAction}
                            </motion.h2>
                        </div>
                    )}
                </AnimatePresence>

                <div
                    onMouseEnter={() => setHoveredAction('Visit')}
                    onMouseLeave={() => setHoveredAction(null)}
                    className={`w-fit rounded-full bg-primary mb-6 px-6 py-2 gap-2 z-30 relative flex justify-center items-center shadow-lg hover:shadow-primary/20 transition-all cursor-pointer hover:scale-105 ${showSystemFlow ? 'opacity-0 pointer-events-none' : ''}`}
                >
                    <a href="https://switchstyle.app" target="_blank" rel="noopener noreferrer" className='font-fustat text-white/95 font-bold tracking-tighter text-sm uppercase'>Try it</a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    <div className='blur-xl h-full w-full bg-primary absolute inset-0 opacity-20 pointer-events-none'></div>
                </div>
                <div
                    onMouseEnter={() => setHoveredAction(showSystemFlow ? null : 'System Flow')}
                    onMouseLeave={() => setHoveredAction(null)}
                    onClick={() => setShowSystemFlow(!showSystemFlow)}
                    className='w-fit rounded-full bg-primary-green mb-6 px-6 py-2 gap-2 z-30 relative flex justify-center items-center shadow-lg hover:shadow-primary-green/20 transition-all cursor-pointer hover:scale-105'
                >
                    <button className='font-fustat text-primary-dark font-bold tracking-tighter text-sm uppercase'>
                        {showSystemFlow ? 'Preview' : 'System Flow'}
                    </button>

                    <div className='blur-xl h-full w-full bg-primary-green absolute inset-0 opacity-20 pointer-events-none'></div>
                </div>
            </div>
            <div className='flex flex-col items-center gap-4 text-center'>
                <h1 className='font-fustat text-5xl text-white/95 font-bold tracking-tighter'>Switch</h1>
                <p className='text-white/70 text-center max-w-[600px] font-fustat text-xl tracking-tight leading-relaxed'>Generate 1000+ clothes with different art styles in seconds. Professional grade AI generation for the modern creative.</p>
            </div>
        </div>
    )
}

export default Project