
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Cubes from "./Cubes";
import TextCursor from "./TextCursor";
import videoBg from '../assets/night1.mp4'
import videoBg2 from '../assets/sunset.mp4'
import expressIcon from '../assets/Express Js.svg'
import geminiIcon from '../assets/Gemini Ai.svg'
import nodeIcon from '../assets/Node Js.svg'
import redisIcon from '../assets/Redis.svg'
import supabaseIcon from '../assets/Supabase.svg'

// Imports from react-icons
import { FaReact, FaNodeJs, FaEthereum, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFigma, SiAdobeillustrator, SiExpress, SiGraphql, SiFirebase, SiMysql, SiMongodb, SiSupabase, SiLangchain, SiOpenai, SiSolidity, SiWeb3Dotjs, SiPostman, SiRedis } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbApi, TbDatabase } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";

function Intro({ scrollContainerRef, blurLevel, setBlurLevel }) {
    const photoRef = [];
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: scrollContainerRef, // 🔥 THIS FIXES IT
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // 🔍 DEBUG
    // const [randomNumber, setRandomNumber] = useState(0);
    // useEffect(() => {
    //     return scrollYProgress.on("change", (v) => {
    //         console.log("scrollYProgress:", v);
    //         setRandomNumber(v);
    //     });
    // }, [scrollYProgress]);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const boxRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [timeElapsed, setTimeElapsed] = useState("");

    useEffect(() => {
        const startDate = new Date("2026-01-11T00:00:00");

        const updateTimer = () => {
            const now = new Date();
            const diff = now - startDate;

            if (diff < 0) {
                setTimeElapsed("Coming Soon");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeElapsed(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        const timerId = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if (!boxRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });
        resizeObserver.observe(boxRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    // Responsive Transforms
    const height = useTransform(
        scrollYProgress,
        [0, 0.6],
        [isMobile ? '50vh' : '20rem', '100vh']
    )
    const width = useTransform(
        scrollYProgress,
        [0, 0.6],
        [isMobile ? '90vw' : '40vw', '100vw']
    )

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const radius2 = useTransform(scrollYProgress, [0, 0.6], ["0%", "0%"]);
    const bottomContentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

    // Inner Box Transforms
    const innerHeight = useTransform(scrollYProgress, [0.6, 1], [isMobile ? '50vh' : '20rem', '100vh']);
    const innerWidth = useTransform(scrollYProgress, [0.6, 1], [isMobile ? '90vw' : '40vw', '100vw']);
    const innerOpacity = useTransform(scrollYProgress, [0.55, 0.6], [0, 1]);

    const [magicMode, setMagicMode] = useState(false);

    const handleMagic = () => {
        setMagicMode(true);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Skills Animation
    const visitorOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const skillsOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
    const skillsPointerEvents = useTransform(scrollYProgress, (v) => v > 0.5 ? 'auto' : 'none');

    // Skills Data
    const skills = [
        {
            category: "Frontend",
            items: [
                { name: "React.js", Icon: FaReact },
                { name: "Next.js", Icon: SiNextdotjs },
                { name: "Tailwind CSS", Icon: SiTailwindcss },
                { name: "Figma", Icon: SiFigma },
                { name: "Adobe Illustrator", Icon: SiAdobeillustrator }
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", icon: nodeIcon }, // Keeping SVG for Node since imported
                { name: "Express.js", icon: expressIcon }, // Keeping SVG
                { name: "REST APIs", Icon: TbApi },
                { name: "GraphQL", Icon: SiGraphql },
                { name: "Firebase", Icon: SiFirebase },
                { name: "MySQL", Icon: SiMysql },
                { name: "MongoDB", Icon: SiMongodb },
                { name: "Supabase", icon: supabaseIcon } // Keeping SVG
            ]
        },
        {
            category: "AI & LLMs",
            items: [
                { name: "LangChain", Icon: SiLangchain },
                { name: "LangGraph", Icon: SiLangchain }, // Reusing LangChain icon or generic
                { name: "OpenAI API", Icon: SiOpenai },
                { name: "Vector Databases", Icon: TbDatabase },
                { name: "Prompt Engineering", Icon: GiArtificialIntelligence },
                { name: "Gemini AI", icon: geminiIcon } // Keeping SVG
            ]
        },
        {
            category: "Blockchain",
            items: [
                { name: "Solidity", Icon: SiSolidity },
                { name: "Web3.js", Icon: SiWeb3Dotjs },
                { name: "Ethereum", Icon: FaEthereum }
            ]
        },
        {
            category: "Tools",
            items: [
                { name: "Git", Icon: FaGitAlt },
                { name: "Postman", Icon: SiPostman },
                { name: "VS Code", Icon: VscVscode },
                { name: "Redis", icon: redisIcon } // Keeping SVG
            ]
        }
    ];

    return (
        <section ref={containerRef} className="h-[300vh] w-full">
            <motion.div

                className="bg-noise w-full h-screen sticky top-0 flex flex-col items-center justify-center relative overflow-hidden"
            >

                <div className="flex flex-col items-center relative z-10">
                    <motion.div ref={boxRef} style={{ height: height, width: width, borderRadius: radius2 }} className="flex flex-col bg-primary-dark relative overflow-hidden flex justify-center items-center" >
                        {magicMode && <video
                            ref={videoRef}
                            src={videoBg}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className='absolute top-0 left-0 w-full h-full object-cover -z-0 opacity-50'
                        />}


                        <motion.div style={{ opacity: visitorOpacity }} className="flex flex-col items-center z-10 p-4 text-center">
                            <div className="font-fustat text-white text-3xl lg:text-6xl font-bold relative z-10">
                                Your are <a className="font-apple">69</a> Visitor.
                            </div>
                            <p className="text-white/70 font-thin font-fustat text-sm lg:text-base">Site Runtime {timeElapsed}</p>
                            {/* Hidden on very small mobile to save space if needed, or scaled */}
                            <div className="hidden lg:block">
                                <TextCursor
                                    text="69"
                                    spacing={80}
                                    followMouseDirection={true}
                                    randomFloat={true}
                                    exitDuration={0.3}
                                    removalInterval={20}
                                    maxPoints={10}

                                />
                            </div>
                        </motion.div>

                        {/* Skills Section (!magicMode) */}
                        {!magicMode && (
                            <motion.div
                                style={{ opacity: skillsOpacity, pointerEvents: skillsPointerEvents }}
                                className="absolute inset-0 flex flex-col justify-center items-center z-20 p-4 lg:p-10 w-full max-w-6xl mx-auto overflow-y-auto lg:overflow-visible"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full pb-20 lg:pb-0">
                                    {skills.map((cat, i) => (
                                        <div key={i} className="flex flex-col gap-2 lg:gap-3">
                                            <h3 className="font-fustat text-white text-xl lg:text-2xl font-bold border-b border-white/20 pb-2 mb-2">{cat.category}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {cat.items.map((item, j) => {
                                                    const name = typeof item === 'string' ? item : item.name;
                                                    const icon = typeof item === 'object' ? item.icon : null;
                                                    const Icon = typeof item === 'object' ? item.Icon : null;
                                                    return (
                                                        <span key={j} className="flex items-center gap-2 bg-white/10 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-lg text-white/90 text-xs lg:text-sm font-fustat backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors">
                                                            {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" />}
                                                            {icon && <img src={icon} alt={name} className="w-4 h-4 lg:w-5 lg:h-5" />}
                                                            {name}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {/* Nested Box */}
                        {magicMode && <motion.div
                            style={{
                                height: innerHeight,
                                width: innerWidth,
                                opacity: innerOpacity
                            }}
                            className="absolute z-20 overflow-hidden flex flex-col justify-center items-center bg-black"
                        >
                            <p className="font-fustat text-white text-3xl lg:text-6xl font-bold opacity-80 z-40 relative tracking-tighter text-center px-4">hello world?</p>
                            <p className="font-fustat text-white text-lg lg:text-xl font-bold opacity-60 z-40 relative text-center px-4">there is more than that</p>
                            <video
                                src={videoBg2}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className='absolute top-0 left-0 w-full h-full object-cover scale-150 opacity-80'
                            />
                        </motion.div>}
                    </motion.div>
                </div>
                <motion.p style={{ opacity: bottomContentOpacity }} className='text-primary-dark text-center w-[90%] lg:w-[600px] font-fustat text-xl lg:text-2xl tracking-tighter absolute top-[calc(50%+9rem)] left-1/2 -translate-x-1/2 z-0'>I’m a UI/UX designer and full-stack developer who builds clean, user-centric digital experiences with modern web technologies.</motion.p>


                <motion.div style={{ opacity: bottomContentOpacity }} className="absolute bottom-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-white"><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" /></svg>
                    <div className="relative w-40 h-8 flex items-center justify-between px-2">
                        {/* Visual Lines */}
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-0.5 rounded-full transition-all duration-300 ${i < (blurLevel / 60) * 20
                                    ? 'bg-white h-4 opacity-100'
                                    : 'bg-white/30 h-2 opacity-50'
                                    }`}
                            />
                        ))}
                        {/* Interactive Range Input */}
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={blurLevel}
                            onChange={(e) => setBlurLevel(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </motion.div>
                {!magicMode && (
                    <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-4">
                        {/* Resume Button - Sidebar Style */}
                        <a
                            href="/resume.pdf" // Placeholder link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white/5 bg-noise flex items-center gap-2 px-6 py-2 rounded-full text-white border border-white/10 backdrop-blur-xl shadow-2xl hover:bg-white/10 transition-colors"
                        >
                            <div className='absolute w-full h-full bg-gradient-to-b from-white/5 to-white top-0 left-0 blur-xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full'></div>
                            <div
                                className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                                style={{
                                    maskImage: 'linear-gradient(180deg, black, transparent 40%)',
                                    WebkitMaskImage: 'linear-gradient(180deg, black, transparent 40%)'
                                }}
                            ></div>
                            <span className="relative z-10 font-fustat font-bold">Resume</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>

                        {/* Magic Button */}
                        <button onClick={handleMagic} className="cursor-pointer bg-white text-black font-fustat font-bold py-2 px-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                            Personal
                        </button>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

export default Intro;
