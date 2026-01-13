import React, { useState, useRef, useEffect } from 'react';


const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Using a copyright-free track from a reliable source (e.g., conflicting with no-cors might be an issue, best to use local or standard accessible URL)
    // Using a sample MP3 URL
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    // Fallback/Alternative: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // The Head component expects isPaused and setIsPaused. 
    // We map isPlaying (true) -> isPaused (false) for the Head to be "awake" when music plays.
    // However, the user might want to interact with the Head independently? 
    // The request said "initially keep it in pause". I'll link music state to Head state for cohesive effect.

    return (
        <div className="relative w-1/2 h-full bg-black/80 rounded-lg overflow-hidden border border-primary-dark/40 flex flex-col justify-between group">
            {/* Background Album Art (Blurred) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
                    alt="Album Art"
                    className="w-full h-full object-cover opacity-40 blur-xl scale-110"
                />
            </div>



            {/* Controls & Info Layer */}
            <div
                className="relative z-10 bg-black/60 backdrop-blur-md py-4 px-4 transform transition-transform duration-300 font-fustat overflow-hidden"
                onClick={togglePlay}
            >
                <div className="flex flex-col text-center cursor-pointer">
                    <h3 className="text-white/70 font-bold text-xl tracking-wide drop-shadow-md">
                        {isPlaying ? "SoundHelix Song 1" : "Music Paused"}
                    </h3>
                    <p className="text-white/40 text-sm font-thin tracking-wider uppercase">
                        {isPlaying ? "Now Playing" : "Tap to Play"}
                    </p>
                </div>

                {/* Progress Bar (Visual only for now) */}
                <div className="w-full h-full bg-white/20 rounded-full overflow-hidden blur-2xl absolute top-0 left-0">
                    <div
                        className="h-full bg-primary-dark rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    ></div>
                </div>

                <audio ref={audioRef} src={audioUrl} loop />
            </div>
        </div>
    );
};

export default MusicPlayer;
