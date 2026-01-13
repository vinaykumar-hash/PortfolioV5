import React from 'react';
import Lanyard from './Lanyard';
import MusicPlayer from './MusicPlayer';
import githubIcon from '../assets/social/GitHub.svg';
import xIcon from '../assets/social/X.svg';
import gmailIcon from '../assets/social/Gmail.svg';
import instagramIcon from '../assets/social/Instagram.svg';
import linkedinIcon from '../assets/social/LinkedIn.svg';
import behanceIcon from '../assets/social/Behance.svg';
import telegramIcon from '../assets/social/Telegram App.svg';

const socialLinks = [
    { name: 'Gmail', icon: gmailIcon, url: 'mailto:contact@example.com' },
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com' },
    { name: 'X', icon: xIcon, url: 'https://twitter.com' },
    { name: 'Instagram', icon: instagramIcon, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: linkedinIcon, url: 'https://linkedin.com' },
    { name: 'Behance', icon: behanceIcon, url: 'https://behance.net' },
    { name: 'Telegram', icon: telegramIcon, url: 'https://t.me' },
];

function Footer() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            {/* Main Container */}
            <div className="w-[90%] md:w-full md:max-w-[70%] mx-auto h-full grid grid-cols-1 md:grid-cols-2 relative z-10">

                {/* Left Section - Lanyard */}
                <div className="w-full h-[50vh] md:h-full absolute flex items-center justify-center md:justify-start">
                    <div className='absolute inset-0 '>
                        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                    </div>
                </div>

                {/* Right Section - Content */}
                <div className="w-full h-full flex flex-col justify-start py-12 md:py-24 px-4 md:px-0 z-20 pointer-events-none">

                    {/* Top Right - Socials */}
                    <div className="flex flex-col items-center md:items-start gap-4 pointer-events-auto font-fustat">
                        <div className="text-center md:text-left">
                            <p className="text-white/60 text-2xl tracking-tight font-bold">Partner in Crime ?</p>
                            <h2 className="text-white/80 text-3xl font-bold tracking-tight">Let's Connect</h2>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-12 h-12 flex items-center justify-center transition-transform hover:scale-110"
                                >
                                    {/* <div className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-sm group-hover:bg-white/10 transition-colors"></div> */}
                                    <img src={link.icon} alt={link.name} className="w-10 h-10 object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Right - Music Player */}
                    {/* <div className="flex justify-center md:justify-start pointer-events-auto mt-12 md:mt-0">
                        <MusicPlayer />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Footer;