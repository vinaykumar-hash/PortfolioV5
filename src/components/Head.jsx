import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react'

function Head({ isPaused, setIsPaused }) {
    const [leftRotation, setLeftRotation] = useState(0);
    const [rightRotation, setRightRotation] = useState(0);
    const [leftEyeRotation, setLeftEyeRotation] = useState(0);
    const [rightEyeRotation, setRightEyeRotation] = useState(0);
    const [browY, setBrowY] = useState(0);

    const headRef = useRef(null);
    const leftEyebrowRef = useRef(null);
    const rightEyebrowRef = useRef(null);
    const leftPupilRef = useRef(null);
    const rightPupilRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isPaused || !headRef.current || !leftEyebrowRef.current || !rightEyebrowRef.current || !leftPupilRef.current || !rightPupilRef.current) return;

            // Calculate Head Center for general references if needed
            const headRect = headRef.current.getBoundingClientRect();
            const headCenterY = headRect.top + headRect.height / 2;

            // --- Left Eyebrow Rotation ---
            const leftRect = leftEyebrowRef.current.getBoundingClientRect();
            const leftCenterX = leftRect.left + leftRect.width / 2;
            const leftCenterY = leftRect.top + leftRect.height / 2;
            const leftDx = event.clientX - leftCenterX;
            const leftDy = event.clientY - leftCenterY;

            let leftAngle = Math.atan2(leftDy, leftDx) * (180 / Math.PI);

            // Normalize clamp for continuity behind the head
            if (Math.abs(leftAngle) > 90) {
                leftAngle = leftAngle > 0 ? 20 : -20;
            } else {
                leftAngle = Math.max(-20, Math.min(20, leftAngle));
            }
            setLeftRotation(leftAngle);

            // --- Right Eyebrow Rotation ---
            const rightRect = rightEyebrowRef.current.getBoundingClientRect();
            const rightCenterX = rightRect.left + rightRect.width / 2;
            const rightCenterY = rightRect.top + rightRect.height / 2;
            const rightDx = event.clientX - rightCenterX;
            const rightDy = event.clientY - rightCenterY;

            // Calculate raw angle + 180 offset (fixes visual orientation)
            let rightAngle = Math.atan2(rightDy, rightDx) * (180 / Math.PI) + 180;

            // Normalize to -180..180 range to fix the 360/0 wrapping specific to +180
            if (rightAngle > 180) rightAngle -= 360;

            // Clamp roughly to -20..20 for natural look (Symmetric to Left)
            // If angle is "behind" (> 90 or < -90), stick to limit
            if (Math.abs(rightAngle) > 90) {
                // Stick to the limit that lines up continuously 
                rightAngle = rightAngle > 0 ? 20 : -20;
            } else {
                rightAngle = Math.max(-20, Math.min(20, rightAngle));
            }

            setRightRotation(rightAngle);

            // --- Eye Rotation (Pupils) ---
            // Calculate Right Pupil Angle (Primary)
            const rightPupilRect = rightPupilRef.current.getBoundingClientRect();
            const rightPupilCx = rightPupilRect.left + rightPupilRect.width / 2;
            const rightPupilCy = rightPupilRect.top + rightPupilRect.height / 2;
            const rightPupilAngle = Math.atan2(event.clientY - rightPupilCy, event.clientX - rightPupilCx) * (180 / Math.PI) + 90;

            // Apply same rotation to both to keep them parallel
            setRightEyeRotation(rightPupilAngle);
            setLeftEyeRotation(rightPupilAngle);

            // --- Vertical Movement (Brow Raise) ---
            // Calculate normalized Y position (-1 to 1) relative to head center
            const yOffset = (event.clientY - headCenterY) / 30; // Scale down for subtle movement
            // Clamp or adjust range: Move up (negative Y) when looking up, down when looking down
            const clampedY = Math.max(-15, Math.min(10, yOffset));
            setBrowY(clampedY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isPaused]);

    return (
        <div className='w-[200px] flex justify-center items-center relative h-[200px] overflow-hidden'>
            <div
                ref={headRef}
                onClick={() => setIsPaused(!isPaused)}
                className='cursor-pointer rounded-full  absolute top-0 flex flex-col justify-start items-center p-20 scale-50 origin-top w-[400px] h-[400px]'
            >
                <div className='flex justify-center items-center gap-12 pt-4'>
                    <div className='flex flex-col items-center gap-6'>
                        <div
                            ref={leftEyebrowRef}
                            className='relative w-12 h-3'
                            style={{
                                transform: `translateY(${browY}px) rotate(${leftRotation}deg)`,
                                transition: 'transform 0.1s ease-out'
                            }}
                        >
                            <div className='bg-[#999999] h-3 w-12 absolute rotate-45 rounded-full -translate-y-3 translate-x-2'></div>
                            <div className='bg-white h-3 w-12 absolute rounded-full'></div>
                        </div>
                        <motion.div
                            animate={{ height: isPaused ? '0.5rem' : '10rem' }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className='w-18 bg-white/80 rounded-full flex justify-center items-start overflow-hidden'
                        >
                            <div className='py-2'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: isPaused ? 0 : 360 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                >
                                    <div
                                        ref={leftPupilRef}
                                        className='h-16 w-16 rounded-full bg-primary-dark relative flex justify-end items-end p-3'
                                        style={{ transform: `rotate(${leftEyeRotation}deg)` }}
                                    >
                                        <div className=' h-6 w-4 bg-white/80 rounded-full rotate-45'></div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <div className='flex flex-col items-center gap-6'>
                        <div
                            ref={rightEyebrowRef}
                            className='relative w-12 h-3'
                            style={{
                                transform: `translateY(${browY}px) rotate(${rightRotation}deg)`,
                                transition: 'transform 0.1s ease-out'
                            }}
                        >
                            <div className='bg-[#999999] h-3 w-12 absolute -rotate-45 rounded-full -translate-y-3 -translate-x-2'></div>
                            <div className='bg-white h-3 w-12 absolute rounded-full'></div>
                        </div>
                        <motion.div
                            animate={{ height: isPaused ? '0.5rem' : '10rem' }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className='w-18 bg-white/80 rounded-full flex justify-center items-start overflow-hidden'
                        >
                            <div className='py-2'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: isPaused ? 0 : 360 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                >
                                    <div
                                        ref={rightPupilRef}
                                        className='h-16 w-16 rounded-full bg-primary-dark relative flex justify-end items-end p-3'
                                        style={{ transform: `rotate(${rightEyeRotation}deg)` }}
                                    >
                                        <div className=' h-6 w-4 bg-white/80 rounded-full rotate-45'></div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Head