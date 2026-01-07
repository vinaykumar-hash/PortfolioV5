
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Cubes from "./Cubes";
import TextCursor from "./TextCursor";
function Intro({ scrollContainerRef }) {
    const photoRef = [];
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        container: scrollContainerRef, // 🔥 THIS FIXES IT
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // 🔍 DEBUG
    const [randomNumber, setRandomNumber] = useState(0);
    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            console.log("scrollYProgress:", v);
            setRandomNumber(v);
        });
    }, [scrollYProgress]);

    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const height = useTransform(
        scrollYProgress,
        [0, 0.6],
        ['20rem', '100vh']
    )
    const width = useTransform(
        scrollYProgress,
        [0, 0.6],
        ['10rem', '80%']
    )

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale2 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const radius2 = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
    const scale3 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const radius3 = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);
    const scale4 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const radius4 = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

    return (
        <section ref={containerRef} className="h-[300vh] w-full">
            <motion.div

                className="bg-noise w-full h-screen sticky top-0 flex flex-col items-center justify-center gap-10 py-20"
            >
                <motion.div style={{ height: height, width: width, borderRadius: radius2 }} className=" bg-primary-dark relative overflow-hidden flex justify-center items-center" >
                    <div className="font-fustat text-white text-6xl font-bold">
                        Your are <a className="font-apple">69</a> Visitor.
                    </div>
                    <TextCursor
                        text="69"
                        spacing={80}
                        followMouseDirection={true}
                        randomFloat={true}
                        exitDuration={0.3}
                        removalInterval={20}
                        maxPoints={10}

                    />
                    {/* <motion.img src="./src/assets/me/1.jpg" className="absolute w-full h-full object-cover"></motion.img>
                    <motion.img style={{ scale: scale2, borderRadius: radius2 }} src="./src/assets/me/2.jpg" className="absolute w-full h-full object-cover"></motion.img>
                    <motion.img style={{ scale: scale3, borderRadius: radius3 }} src="./src/assets/me/3.jpg" className="absolute w-full h-full object-cover"></motion.img>
                    <motion.img style={{ scale: scale4, borderRadius: radius4 }} src="./src/assets/me/4.jpg" className="absolute w-full h-full object-cover"></motion.img> */}

                </motion.div>
                <p className='text-white/80 text-center w-[600px] font-fustat text-2xl tracking-tighter'>I’m a UI/UX designer and full-stack developer who builds clean, user-centric digital experiences with modern web technologies.</p>
            </motion.div>
        </section>
    );
}

export default Intro;
