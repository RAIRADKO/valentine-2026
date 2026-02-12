"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Heart,
    SkipBack,
    SkipForward,
    ChevronDown,
} from "lucide-react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Local audio file
    const audioSrc = "/sssSpotify.com_downloader_1770875450943.mp3";
    const discImage = "/disc-photo.png";

    // Autoplay: try immediately, fallback to first user interaction
    useEffect(() => {
        let played = false;

        const removeListeners = () => {
            document.removeEventListener("click", handleFirstInteraction);
            document.removeEventListener("scroll", handleFirstInteraction);
            document.removeEventListener("touchstart", handleFirstInteraction);
            document.removeEventListener("keydown", handleFirstInteraction);
        };

        const tryPlay = () => {
            if (played || !audioRef.current) return;
            audioRef.current
                .play()
                .then(() => {
                    played = true;
                    setIsPlaying(true);
                    setHasAutoPlayed(true);
                    removeListeners();
                })
                .catch(() => { });
        };

        const handleFirstInteraction = () => {
            tryPlay();
        };

        // Try autoplay immediately
        tryPlay();

        // Also try after a short delay (some browsers allow after slight delay)
        const t1 = setTimeout(tryPlay, 300);
        const t2 = setTimeout(tryPlay, 1000);

        // Fallback: play on first user interaction
        document.addEventListener("click", handleFirstInteraction);
        document.addEventListener("scroll", handleFirstInteraction);
        document.addEventListener("touchstart", handleFirstInteraction);
        document.addEventListener("keydown", handleFirstInteraction);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            removeListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => {
            if (audio.duration && isFinite(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        // If metadata already loaded, grab duration immediately
        if (audio.duration && isFinite(audio.duration)) {
            setDuration(audio.duration);
        }

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("durationchange", updateDuration);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("durationchange", updateDuration);
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

    // Seek via click or drag on progress bar
    const seekFromPosition = useCallback(
        (clientX: number) => {
            if (!progressBarRef.current || !audioRef.current || !duration) return;
            const rect = progressBarRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const pct = Math.max(0, Math.min(1, x / rect.width));
            const newTime = pct * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        },
        [duration]
    );

    // Mouse drag support
    const handleProgressMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            seekFromPosition(e.clientX);
            const onMove = (ev: MouseEvent) => {
                seekFromPosition(ev.clientX);
            };
            const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
        },
        [seekFromPosition]
    );

    // Touch drag support
    const handleProgressTouchStart = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            e.stopPropagation();
            const touch = e.touches[0];
            seekFromPosition(touch.clientX);
            const onMove = (ev: TouchEvent) => {
                ev.preventDefault();
                const t = ev.touches[0];
                seekFromPosition(t.clientX);
            };
            const onEnd = () => {
                window.removeEventListener("touchmove", onMove);
                window.removeEventListener("touchend", onEnd);
                window.removeEventListener("touchcancel", onEnd);
            };
            window.addEventListener("touchmove", onMove, { passive: false });
            window.addEventListener("touchend", onEnd);
            window.addEventListener("touchcancel", onEnd);
        },
        [seekFromPosition]
    );

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    // Clamp progress for thumb to keep it within the track visually
    const clampedThumbPercent = Math.max(0, Math.min(100, progress));

    // Pre-compute stable random heights for equalizer bars
    const eqBarData = useMemo(() => {
        return Array.from({ length: 24 }, () => ({
            h1: Math.random() * 16 + 6,
            h2: Math.random() * 8 + 3,
            h3: Math.random() * 14 + 5,
            speed: 0.6 + Math.random() * 0.5,
        }));
    }, []);

    return (
        <>
            {/* Spin keyframes */}
            <style jsx global>{`
        @keyframes spin-disc {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .disc-spinning {
          animation: spin-disc 4s linear infinite;
        }
        .disc-paused {
          animation: spin-disc 4s linear infinite;
          animation-play-state: paused;
        }
      `}</style>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={audioSrc} loop preload="auto" />

            {/* Floating Music Player */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        /* ─── Mini Player ─── */
                        <motion.button
                            key="mini"
                            onClick={() => setIsExpanded(true)}
                            className="relative group"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            {/* Glow ring when playing */}
                            {isPlaying && (
                                <>
                                    <motion.div
                                        className="absolute inset-[-6px] rounded-full border-2 border-rose-400/60"
                                        animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-[-4px] rounded-full border border-rose-300/40"
                                        animate={{ scale: [1, 1.15], opacity: [0.5, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: 0.4,
                                        }}
                                    />
                                </>
                            )}

                            {/* Mini disc with photo */}
                            <div
                                className={`w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-rose-500/40 border-2 border-white/30 ${isPlaying ? "disc-spinning" : "disc-paused"
                                    }`}
                            >
                                <img
                                    src={discImage}
                                    alt="Disc"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Center hole overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-3 h-3 rounded-full bg-black/70 border border-white/40" />
                            </div>

                            {/* Audio wave bars */}
                            {isPlaying && (
                                <div className="absolute -top-1 -right-1 flex gap-[2px] bg-black/50 rounded-full px-1.5 py-1">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[3px] bg-rose-400 rounded-full"
                                            animate={{ height: [3, 10, 3] }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                delay: i * 0.12,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.button>
                    ) : (
                        /* ─── Expanded Player ─── */
                        <motion.div
                            key="expanded"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-80 rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
                        >
                            {/* Blurred background image */}
                            <div className="absolute inset-0">
                                <img
                                    src={discImage}
                                    alt=""
                                    className="w-full h-full object-cover scale-110 blur-2xl opacity-40"
                                />
                                <div className="absolute inset-0 bg-black/65" />
                            </div>

                            {/* Content */}
                            <div className="relative p-6">
                                {/* Close button */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white z-10"
                                >
                                    <ChevronDown size={18} />
                                </button>

                                {/* ─── Vinyl Disc ─── */}
                                <div className="flex justify-center mb-5">
                                    <div className="relative">
                                        {/* Outer glow */}
                                        {isPlaying && (
                                            <motion.div
                                                className="absolute inset-[-8px] rounded-full"
                                                style={{
                                                    background:
                                                        "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)",
                                                }}
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}

                                        {/* Disc */}
                                        <div
                                            className={`relative w-44 h-44 rounded-full overflow-hidden shadow-xl shadow-black/60 border border-white/10 ${isPlaying ? "disc-spinning" : "disc-paused"
                                                }`}
                                        >
                                            {/* Photo */}
                                            <img
                                                src={discImage}
                                                alt="Album Art"
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Vinyl groove overlay */}
                                            <div className="absolute inset-0 rounded-full">
                                                <div className="absolute inset-[20%] rounded-full border border-white/[0.07]" />
                                                <div className="absolute inset-[28%] rounded-full border border-white/[0.05]" />
                                                <div className="absolute inset-[35%] rounded-full border border-white/[0.07]" />
                                                <div className="absolute inset-[42%] rounded-full border border-white/[0.04]" />
                                            </div>

                                            {/* Center hole */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-7 h-7 rounded-full bg-black/80 border-2 border-white/20 flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-white/40" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Song Info */}
                                <div className="text-center mb-4">
                                    <h4 className="text-white font-semibold text-base tracking-wide">
                                        Valentine
                                    </h4>
                                    <p className="text-white/50 text-sm mt-0.5 flex items-center justify-center gap-1.5">
                                        <Heart size={11} fill="currentColor" className="text-rose-400" />
                                        For You, With Love
                                    </p>
                                </div>

                                {/* Sound Wave / Equalizer */}
                                <div
                                    className={`flex justify-center items-end gap-[2px] mb-5 h-7 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-30"
                                        }`}
                                >
                                    {eqBarData.map((bar, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[3px] rounded-full origin-bottom"
                                            style={{
                                                height: 22,
                                                background:
                                                    "linear-gradient(to top, #f43f5e, #fb7185, #fda4af)",
                                            }}
                                            animate={
                                                isPlaying
                                                    ? {
                                                        scaleY: [
                                                            0.15,
                                                            bar.h1 / 22,
                                                            bar.h2 / 22,
                                                            bar.h3 / 22,
                                                            0.15,
                                                        ],
                                                    }
                                                    : { scaleY: 0.15 }
                                            }
                                            transition={
                                                isPlaying
                                                    ? {
                                                        duration: bar.speed,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }
                                                    : { duration: 0.4 }
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Progress Bar — click, drag & touch */}
                                <div className="mb-4">
                                    {/* Hit area with padding for easy clicking */}
                                    <div
                                        ref={progressBarRef}
                                        onMouseDown={handleProgressMouseDown}
                                        onTouchStart={handleProgressTouchStart}
                                        className="relative py-3 cursor-pointer select-none touch-none"
                                        role="slider"
                                        aria-valuemin={0}
                                        aria-valuemax={duration || 100}
                                        aria-valuenow={currentTime}
                                        tabIndex={0}
                                    >
                                        {/* Track background */}
                                        <div className="relative h-[5px] bg-white/15 rounded-full overflow-visible">
                                            {/* Filled track */}
                                            <div
                                                className="absolute left-0 top-0 h-full rounded-full pointer-events-none"
                                                style={{
                                                    width: `${clampedThumbPercent}%`,
                                                    background: "linear-gradient(to right, #f43f5e, #fb7185)",
                                                }}
                                            />
                                            {/* Thumb — always visible */}
                                            <div
                                                className="absolute top-1/2 w-4 h-4 rounded-full bg-white shadow-lg pointer-events-none"
                                                style={{
                                                    left: `${clampedThumbPercent}%`,
                                                    transform: "translate(-50%, -50%)",
                                                    boxShadow: "0 0 8px rgba(244,63,94,0.6), 0 2px 4px rgba(0,0,0,0.3)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Hidden range for accessibility */}
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 100}
                                        step="0.1"
                                        value={currentTime}
                                        onChange={handleSeek}
                                        className="sr-only"
                                        aria-label="Song progress"
                                    />
                                    <div className="flex justify-between text-[11px] text-white/40 mt-0.5 px-0.5">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-5">
                                    {/* Skip Back */}
                                    <motion.button
                                        onClick={() => {
                                            if (audioRef.current) {
                                                audioRef.current.currentTime = Math.max(
                                                    0,
                                                    currentTime - 10
                                                );
                                            }
                                        }}
                                        className="p-2 text-white/50 hover:text-white transition-colors"
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <SkipBack size={20} />
                                    </motion.button>

                                    {/* Play / Pause */}
                                    <motion.button
                                        onClick={togglePlay}
                                        className="p-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/40"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.93 }}
                                    >
                                        {isPlaying ? (
                                            <Pause size={22} />
                                        ) : (
                                            <Play size={22} fill="currentColor" className="ml-0.5" />
                                        )}
                                    </motion.button>

                                    {/* Skip Forward */}
                                    <motion.button
                                        onClick={() => {
                                            if (audioRef.current) {
                                                audioRef.current.currentTime = Math.min(
                                                    duration,
                                                    currentTime + 10
                                                );
                                            }
                                        }}
                                        className="p-2 text-white/50 hover:text-white transition-colors"
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <SkipForward size={20} />
                                    </motion.button>

                                    {/* Mute */}
                                    <motion.button
                                        onClick={toggleMute}
                                        className="p-2 text-white/50 hover:text-white transition-colors"
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
