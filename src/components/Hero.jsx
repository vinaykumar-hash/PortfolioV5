import React from 'react'
import { motion } from "motion/react"


const Hero = () => {
    return (
        <div className='flex justify-center items-center gap-2 py-40 relative overflow-hidden'>


            <div className='relative z-10 flex justify-center items-center gap-2'>
                <h1 className='font-fustat text-7xl text-white/95 font-bold tracking-tighter pb-6'>Vinay</h1>
                <div className='relative pt-6'>
                    <h2 className='relative font-apple text-primary text-6xl z-10'>Choudhary</h2>
                    <motion.img
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0 0 0)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className='absolute -bottom-8 -right-8' src="../src/assets/CurvedLine.svg" alt="" />
                </div>
                <motion.div className=''

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

                </motion.div>
            </div>
        </div>
    )
}

export default Hero