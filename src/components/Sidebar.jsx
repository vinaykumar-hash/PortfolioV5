import React, { useState } from 'react'
import { motion } from "framer-motion";

function Sidebar({ setCurrentView, toggleAudio, scrollToSection }) {
    const [hovered, setHovered] = useState(null);

    const navItems = [
        {
            id: 'home',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
            action: () => scrollToSection('hero')
        },
        {
            id: 'party',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" /></svg>,
            action: () => { toggleAudio(); scrollToSection('intro'); }
        },
        {
            id: 'connect',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
            action: () => scrollToSection('footer')
        }
    ];

    return (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 md:left-10 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 z-50 pointer-events-none flex flex-row md:flex-col gap-4 items-center'>
            <div
                onMouseLeave={() => setHovered(null)}
                className='relative bg-white/5 bg-noise flex flex-row md:flex-col gap-2 justify-center items-center p-1 rounded-full text-white border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl'
            >
                {/* Shine effect on border */}
                <div className='absolute w-20 h-full md:w-full md:h-20 bg-gradient-to-r md:bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-20'></div>

                <div
                    className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                        WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                    }}
                ></div>

                {navItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setHovered(item.id)}
                        className={`relative cursor-pointer p-3 rounded-full transition-colors duration-300 z-10 ${hovered === item.id ? 'text-white' : 'text-white'}`}
                    >
                        {hovered === item.id && (
                            <motion.div
                                layoutId="sidebar-pill"
                                className="absolute inset-0 bg-white/10 rounded-full -z-10 mix-blend-normal"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className='relative z-20 flex items-center justify-center'>
                            {item.icon}
                        </span>
                    </div>
                ))}
            </div>

            {/* Projects Pill - Hidden on mobile for now to save space, or moved to end */}
            <div
                className='relative bg-white/5 bg-noise flex md:flex-col gap-2 justify-center items-center p-1 rounded-full text-white border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl cursor-pointer group hover:bg-white/10 transition-colors'
                onClick={() => setCurrentView('projects')}
                onMouseEnter={() => setHovered('projects')}
                onMouseLeave={() => setHovered(null)}
            >
                <div className='absolute w-full h-full bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-10 group-hover:opacity-20 transition-opacity'></div>
                <div
                    className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                        WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                    }}
                ></div>
                <div className='p-3 flex md:flex-col items-center gap-0 md:gap-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-4" /><path d="M8 18v-2" /><path d="M16 18v-6" /></svg>

                    <motion.div
                        initial={{ height: 0, opacity: 0, width: 0 }}
                        animate={{
                            height: hovered === 'projects' ? 'auto' : 0,
                            width: hovered === 'projects' ? 'auto' : 0, // Animate width for horizontal layout on mobile/desktop hybrid if needed, but primarily vertical on desktop
                            opacity: hovered === 'projects' ? 1 : 0
                        }}
                        className='overflow-hidden'
                    >
                        {/* Desktop Vertical Text */}
                        <p className='hidden md:block font-fustat tracking-tight text-sm uppercase text-white/70' style={{ writingMode: 'vertical-rl' }}>Projects</p>
                        {/* Mobile Horizontal Text - technically keeping it simple for now, might just hide text on mobile */}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
