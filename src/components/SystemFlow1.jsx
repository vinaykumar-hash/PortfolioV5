import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";

// Importing Assets
import NodeJs from '../assets/Node Js.svg';
import ExpressJs from '../assets/Express Js.svg';
import Settings from '../assets/Settings.svg';
import Supabase from '../assets/Supabase.svg';
import Postgres from '../assets/PostgreSQL.svg';
import Redis from '../assets/Redis.svg';
import Gemini from '../assets/Gemini Ai.svg';

const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const lineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
};

function SystemFlow1() {
    const [zoom, setZoom] = useState(1);
    const [activeHighlight, setActiveHighlight] = useState('client'); // client, server, google, supabase, redis
    const [dotState, setDotState] = useState({ path: '', duration: 0, id: 0, visible: true });

    // Paths Definition
    const paths = {
        client_server: "M 160,100 C 240,100 240,110 320,110",
        server_google: "M 755,200 C 755,230 800,230 800,260",
        google_server: "M 800,260 C 800,230 755,230 755,200", // Reverse
        server_supabase: "M 465,200 C 465,230 420,230 420,260",
        supabase_server: "M 420,260 C 420,230 465,230 465,200", // Reverse
        server_redis: "M 610,200 L 610,260",
        redis_server: "M 610,260 L 610,200", // Reverse
        server_client: "M 320,110 C 240,110 240,100 160,100" // Reverse
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

    useEffect(() => {
        let timer;
        let stepCount = 0;
        const sequence = async () => {
            // Helper for steps
            const animateStep = async (path, duration, targetNode) => {
                // 1. Move
                setDotState({ path, duration, id: stepCount++, visible: true });
                await new Promise(r => setTimeout(r, duration * 1000));

                // 2. Hide (Enter Box) & Highlight Target
                setDotState(prev => ({ ...prev, visible: false }));
                setActiveHighlight(targetNode);
                await new Promise(r => setTimeout(r, 600)); // 0.6s Hold
            };

            while (true) {
                // Initial Client Highlight
                setActiveHighlight('client');

                // 1. Client -> Server
                await animateStep(paths.client_server, 1, 'server');

                // 2. Server -> Google
                await animateStep(paths.server_google, 1, 'google');

                // 3. Google -> Server
                await animateStep(paths.google_server, 1, 'server');

                // 4. Server -> Supabase
                await animateStep(paths.server_supabase, 1, 'supabase');

                // 5. Supabase -> Server
                // await animateStep(paths.supabase_server, 1.5, 'server');

                // 6. Server -> Redis
                await animateStep(paths.server_redis, 1.0, 'redis');

                // 7. Redis -> Server
                // await animateStep(paths.redis_server, 1.0, 'server');

                // 8. Server -> Client
                await animateStep(paths.server_client, 1, 'client');
            }
        };

        sequence();
        return () => clearTimeout(timer); // Basic cleanup
    }, []);

    // Glow Styles
    const getGlow = (id) => "border-white/20";

    return (
        <div className='h-full w-full bg-primary-dark/95 backdrop-blur-md absolute top-0 left-0 z-20 flex justify-center items-center overflow-hidden'>

            {/* Zoom Controls */}
            <div className="absolute bottom-10 left-10 flex gap-4 z-30">
                <button
                    onClick={handleZoomOut}
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                    aria-label="Zoom Out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                </button>
                <button
                    onClick={handleZoomIn}
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                    aria-label="Zoom In"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </button>
            </div>

            {/* Manual Zoom Wrapper */}
            <div
                className="transition-transform duration-300 ease-out flex justify-center items-center"
                style={{ transform: `scale(${zoom})` }}
            >
                {/* Scalable Container */}
                <div className="relative w-[1000px] h-[600px] flex-shrink-0 bg-transparent transform scale-[0.25] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.7] 2xl:scale-[0.8] origin-center transition-transform duration-500">

                    {/* SVG Connections Layer */}
                    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                        {/* Client to Server - Smooth horizontal S-curve adjusting for slight Y diff */}
                        <motion.path d="M 160,100 C 240,100 240,110 320,110" stroke="#555" strokeWidth="2" fill="none" variants={lineDraw} initial="hidden" animate="visible" />

                        {/* Express Server to Supabase - Smooth Branch */}
                        <motion.path d="M 465,200 C 465,230 420,230 420,260" stroke="#555" strokeWidth="2" fill="none" variants={lineDraw} initial="hidden" animate="visible" />

                        {/* Server Complex to Redis - Straight Vertical */}
                        <motion.path d="M 610,200 L 610,260" stroke="#555" strokeWidth="2" fill="none" variants={lineDraw} initial="hidden" animate="visible" />

                        {/* Engine to Google - Smooth Branch */}
                        <motion.path d="M 755,200 C 755,230 800,230 800,260" stroke="#555" strokeWidth="2" fill="none" variants={lineDraw} initial="hidden" animate="visible" />
                    </svg>

                    {/* Animated Dot */}
                    <div
                        key={dotState.id}
                        className={`absolute w-3 h-3 bg-primary-dark rounded-full border-2 border-white/70 z-20 top-0 left-0 transition-opacity duration-300 ${dotState.visible ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            offsetPath: `path('${dotState.path}')`,
                            animation: `moveDot ${dotState.duration}s linear forwards`
                        }}
                    >
                    </div>

                    {/* Nodes Layer */}

                    {/* Client Node */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className={`absolute top-[75px] left-[20px] w-[140px] h-[50px] border rounded-full bg-primary-dark transition-all duration-300 flex justify-center items-center z-10 ${getGlow('client')}`}
                    >
                        <span className="font-fustat text-white font-bold tracking-tight text-lg">Client</span>
                    </motion.div>

                    {/* Server Complex Node */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className={`absolute top-[20px] left-[320px] w-[580px] h-[180px] border rounded-xl bg-primary-dark transition-all duration-300 flex z-10 ${getGlow('server')}`}
                    >
                        {/* Express Server Section */}
                        <div className="flex-1 border-r border-white/20 flex flex-col justify-center items-center gap-4 relative">
                            <div className="flex gap-4 items-center">
                                <img src={NodeJs} alt="Node JS" className="w-12 h-12 object-contain" />
                                <img src={ExpressJs} alt="Express" className="w-20 h-12 object-contain" />
                            </div>
                            <span className="font-fustat text-white font-medium text-lg">Express Server</span>
                        </div>

                        {/* CG Pill */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-dark border border-white/20 rounded-full px-4 py-1 z-20 flex justify-center items-center">
                            <span className="font-fustat text-xl text-white/70">CG</span>
                        </div>

                        {/* Prompt Engine Section */}
                        <div className="flex-1 flex flex-col justify-center items-center gap-4">
                            <img src={Settings} alt="Settings" className="w-12 h-12 object-contain" />
                            <div className="text-center">
                                <span className="font-fustat text-white font-medium text-lg block">Prompt Sensitization</span>
                                <span className="font-fustat text-white font-bold text-lg block">Engine</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Supabase */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className={`absolute top-[260px] left-[320px] w-[200px] h-[150px] border rounded-xl bg-primary-dark transition-all duration-300 flex flex-col items-center justify-center gap-4 z-10 ${getGlow('supabase')}`}
                    >
                        <div className="flex gap-3">
                            <img src={Supabase} alt="Supabase" className="w-10 h-10 object-contain" />
                            <img src={Postgres} alt="Postgres" className="w-10 h-10 object-contain" />
                        </div>
                        <span className="font-fustat text-white font-medium text-lg">Supabase</span>
                    </motion.div>

                    {/* Redis */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className={`absolute top-[260px] left-[540px] w-[140px] h-[150px] border rounded-xl bg-primary-dark transition-all duration-300 flex flex-col items-center justify-center gap-4 z-10 ${getGlow('redis')}`}
                    >
                        <img src={Redis} alt="Redis" className="w-12 h-12 object-contain" />
                        <span className="font-fustat text-white font-medium text-lg">Redis</span>
                    </motion.div>

                    {/* Google NanoBanana */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className={`absolute top-[260px] left-[700px] w-[200px] h-[150px] border rounded-xl bg-primary-dark transition-all duration-300 flex flex-col items-center justify-center gap-4 z-10 ${getGlow('google')}`}
                    >
                        <img src={Gemini} alt="Gemini" className="w-14 h-14 object-contain" />
                        <div className="text-center">
                            <span className="font-fustat text-white font-medium text-lg block">Google</span>
                            <span className="font-fustat text-white font-medium text-lg block">NanoBanana</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default SystemFlow1