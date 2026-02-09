"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, Heart, SkipBack, SkipForward } from "lucide-react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Local audio file
    const audioSrc = "/sssSpotify.com_downloader_1770624791647.mp3";

    // Auto play on mount (after user interaction with page)
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasAutoPlayed && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasAutoPlayed(true);
                    })
                    .catch(() => {
                        // Autoplay blocked, try on next interaction
                    });
            }
            // Remove listeners after first successful play
            if (hasAutoPlayed) {
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('scroll', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
            }
        };

        // Try to autoplay immediately
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasAutoPlayed(true);
                    })
                    .catch(() => {
                        // Add listeners for user interaction
                        document.addEventListener('click', handleFirstInteraction);
                        document.addEventListener('scroll', handleFirstInteraction);
                        document.addEventListener('touchstart', handleFirstInteraction);
                    });
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [hasAutoPlayed]);

    // Update time
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

    // Handle mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

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

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={audioSrc}
                loop
                preload="auto"
            />

            {/* Floating Music Player - Mini Version */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        // Mini Player Button
                        <motion.button
                            key="mini"
                            onClick={() => setIsExpanded(true)}
                            className="relative p-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-400/50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            {/* Pulsing ring when playing */}
                            {isPlaying && (
                                <>
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-rose-500"
                                        animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-rose-500"
                                        animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                    />
                                </>
                            )}

                            <motion.div
                                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Music size={24} />
                            </motion.div>

                            {/* Audio wave animation */}
                            {isPlaying && (
                                <div className="absolute -top-1 -right-1 flex gap-0.5">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 bg-white rounded-full"
                                            animate={{ height: [4, 12, 4] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.button>
                    ) : (
                        // Expanded Player
                        <motion.div
                            key="expanded"
                            initial={{ scale: 0, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0, opacity: 0, y: 20 }}
                            className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-rose-300/50 w-80"
                        >
                            {/* Close area - click to minimize */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-rose-100 transition-colors text-rose-400"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 15l-6-6-6 6" />
                                </svg>
                            </button>

                            {/* Album Art / Visualizer */}
                            <div className="flex items-center gap-4 mb-4">
                                <motion.div
                                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 flex items-center justify-center shadow-lg"
                                >
                                    {/* Vinyl grooves effect */}
                                    <div className="absolute inset-2 rounded-full border border-rose-300/30" />
                                    <div className="absolute inset-4 rounded-full border border-rose-300/20" />
                                    <div className="w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                    </div>
                                </motion.div>

                                <div className="flex-1">
                                    <h4 className="text-rose-700 font-semibold text-sm mb-0.5">Our Special Song</h4>
                                    <p className="text-rose-500/70 text-xs flex items-center gap-1">
                                        <Heart size={10} fill="currentColor" />
                                        For You, With Love
                                    </p>
                                    {/* Animated equalizer bars */}
                                    {isPlaying && (
                                        <div className="flex gap-0.5 mt-2">
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 bg-gradient-to-t from-rose-500 to-rose-400 rounded-full"
                                                    animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                                                    transition={{
                                                        duration: 0.4 + Math.random() * 0.3,
                                                        repeat: Infinity,
                                                        delay: i * 0.05,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="relative h-1.5 bg-rose-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-rose-500 rounded-full shadow-md"
                                        style={{ left: `calc(${progress}% - 6px)` }}
                                        whileHover={{ scale: 1.3 }}
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="absolute w-full h-4 opacity-0 cursor-pointer"
                                    style={{ marginTop: "-10px" }}
                                />
                                <div className="flex justify-between text-xs text-rose-400 mt-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-4">
                                <motion.button
                                    onClick={() => {
                                        if (audioRef.current) {
                                            audioRef.current.currentTime = Math.max(0, currentTime - 10);
                                        }
                                    }}
                                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <SkipBack size={20} />
                                </motion.button>

                                <motion.button
                                    onClick={togglePlay}
                                    className="p-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                                </motion.button>

                                <motion.button
                                    onClick={() => {
                                        if (audioRef.current) {
                                            audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                                        }
                                    }}
                                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <SkipForward size={20} />
                                </motion.button>

                                <motion.button
                                    onClick={toggleMute}
                                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
