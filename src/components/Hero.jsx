import React from 'react'
import { motion } from "motion/react"

import githubIcon from '../assets/social/GitHub.svg';
import xIcon from '../assets/social/X.svg';
import gmailIcon from '../assets/social/Gmail.svg';
import instagramIcon from '../assets/social/Instagram.svg';
import linkedinIcon from '../assets/social/LinkedIn.svg';
import behanceIcon from '../assets/social/Behance.svg';
import telegramIcon from '../assets/social/Telegram App.svg';
import CurvedLine from '../assets/CurvedLine.svg';

const socialLinks = [
    { name: 'Gmail', icon: gmailIcon, url: 'mailto:vinaykumar7525@gmail.com' },
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com/vinaykumar-hash' },
    { name: 'X', icon: xIcon, url: 'https://x.com/escapevinay' },
    { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/vinay_kumar.0.0/' },
    { name: 'LinkedIn', icon: linkedinIcon, url: 'https://www.linkedin.com/in/vinaychoudhary7525/' },
    { name: 'Behance', icon: behanceIcon, url: 'https://www.behance.net/vinayrokzz' },
    { name: 'Telegram', icon: telegramIcon, url: 'https://t.me' },
];

const Hero = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-10 py-40 relative overflow-hidden h-screen'>


            <div className='relative z-10 flex justify-center items-center gap-2'>
                <h1 className='font-fustat text-4xl lg:text-7xl text-white/95 font-bold tracking-tighter pb-4 lg:pb-6'>Vinay</h1>
                <div className='relative pt-4 lg:pt-6'>
                    <h2 className='relative font-apple text-primary text-3xl lg:text-6xl z-10'>Choudhary</h2>
                    <motion.img
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0 0 0)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className='absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8' src={CurvedLine} alt="" />
                </div>
                {/* <motion.div className=''

                >
                    <motion.img
                        alt="cartoon pop"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                            type: "tween",
                            ease: (t) => Math.floor(t * 18) / 18 // 18 steps for 360deg (20deg each), total 9s (0.5s each)
                        }}
                        className='absolute scale-60 top-0' src="../src/assets/Star.svg" />
                    <motion.img
                        className='absolute scale-60 top-0' src="../src/assets/face.svg" alt="" />

                </motion.div> */}
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 z-20 px-10">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-12 h-12 flex items-center justify-center transition-transform hover:scale-110 hover:-translate-y-1"
                    >
                        <img src={link.icon} alt={link.name} className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Hero