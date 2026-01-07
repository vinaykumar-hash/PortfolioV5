import React from 'react'

function Header() {
    return (
        <div className='flex justify-center items-center py-5 w-full relative'>

            <div className='relative bg-white/5 bg-noise flex gap-10 justify-center items-center font-fustat text-2xl px-20 py-4 rounded-full text-white border border-white/10 backdrop-blur-xl'>
                {/* Shine effect on border */}
                <div className='absolute h-1 w-40 bg-gradient-to-r from-white/5 to-white right-0 top-0 blur-xl'></div>
                {/* <div className='absolute h-20 w-1 bg-gradient-to-b from-white to-white/5 right-0 top-0 blur-xl'></div> */}
                <div
                    className="absolute inset-0 rounded-full border border-white/60 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(225deg, black, transparent 40%)',
                        WebkitMaskImage: 'linear-gradient(225deg, black, transparent 40%)'
                    }}
                ></div>
                <p>Skills</p>
                <p>Projects</p>
                <p>Connect</p>
            </div>
        </div>
    )
}

export default Header