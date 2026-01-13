import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

function Header({ setCurrentView }) {
    const [hovered, setHovered] = useState(null);

    const navItems = [
        { id: 'home', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, action: 'home' },
        { id: 'skills', label: 'Skills', action: 'home' }, // Assuming Skills links to home for now
        { id: 'projects', label: 'Projects', action: 'projects' },
        { id: 'connect', label: 'Connect', action: 'home' } // Assuming Connect links to home for now
    ];

    return (
        <div className='flex justify-center items-center py-5 w-full fixed top-0 z-50 pointer-events-none'>
            <div
                onMouseLeave={() => setHovered(null)}
                className='relative bg-white/5 bg-noise flex gap-2 justify-center items-center font-fustat text-xl p-2 rounded-full text-white border border-white/10 backdrop-blur-xl pointer-events-auto shadow-lg'
            >
                {/* Shine effect on border */}
                <div className='absolute h-1 w-40 bg-gradient-to-r from-white/5 to-white right-0 top-0 blur-xl'></div>

                <div
                    className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(225deg, black, transparent 40%)',
                        WebkitMaskImage: 'linear-gradient(225deg, black, transparent 40%)'
                    }}
                ></div>

                {navItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setCurrentView(item.action)}
                        onMouseEnter={() => setHovered(item.id)}
                        className={`relative cursor-pointer px-6 py-2 rounded-full transition-colors duration-300 z-10 ${hovered === item.id ? 'text-black' : 'text-white'}`}
                    >
                        {hovered === item.id && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white/10 rounded-full -z-10 mix-blend-normal"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className='relative z-20 flex items-center justify-center'>
                            {item.icon ? item.icon : item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Header