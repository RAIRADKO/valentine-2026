"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface HeroSectionProps {
    name?: string;
}

// Pre-defined positions and sizes to avoid hydration mismatch
const floatingHearts = [
    { id: 1, x: 10, y: 20, size: 35, delay: 0.1 },
    { id: 2, x: 85, y: 15, size: 28, delay: 0.3 },
    { id: 3, x: 25, y: 70, size: 42, delay: 0.5 },
    { id: 4, x: 75, y: 60, size: 32, delay: 0.7 },
    { id: 5, x: 50, y: 35, size: 38, delay: 0.2 },
    { id: 6, x: 15, y: 50, size: 45, delay: 0.4 },
    { id: 7, x: 90, y: 80, size: 30, delay: 0.6 },
    { id: 8, x: 60, y: 10, size: 36, delay: 0.8 },
    { id: 9, x: 35, y: 85, size: 40, delay: 0.15 },
    { id: 10, x: 70, y: 40, size: 33, delay: 0.45 },
    { id: 11, x: 5, y: 90, size: 48, delay: 0.25 },
    { id: 12, x: 45, y: 55, size: 29, delay: 0.55 },
    { id: 13, x: 80, y: 25, size: 44, delay: 0.35 },
    { id: 14, x: 20, y: 5, size: 37, delay: 0.65 },
    { id: 15, x: 55, y: 75, size: 41, delay: 0.85 },
];

const sparklePositions = [
    { id: 1, left: 10, top: 15, size: 16, delay: 0.2 },
    { id: 2, left: 85, top: 25, size: 14, delay: 0.4 },
    { id: 3, left: 25, top: 80, size: 18, delay: 0.6 },
    { id: 4, left: 70, top: 45, size: 15, delay: 0.8 },
    { id: 5, left: 45, top: 10, size: 20, delay: 0.3 },
    { id: 6, left: 90, top: 70, size: 13, delay: 0.5 },
    { id: 7, left: 15, top: 55, size: 17, delay: 0.7 },
    { id: 8, left: 60, top: 90, size: 19, delay: 0.1 },
    { id: 9, left: 35, top: 35, size: 14, delay: 0.9 },
    { id: 10, left: 80, top: 5, size: 16, delay: 0.25 },
    { id: 11, left: 5, top: 65, size: 21, delay: 0.45 },
    { id: 12, left: 50, top: 50, size: 15, delay: 0.65 },
    { id: 13, left: 95, top: 40, size: 18, delay: 0.85 },
    { id: 14, left: 30, top: 95, size: 22, delay: 0.15 },
    { id: 15, left: 75, top: 20, size: 13, delay: 0.35 },
    { id: 16, left: 20, top: 30, size: 17, delay: 0.55 },
    { id: 17, left: 65, top: 85, size: 14, delay: 0.75 },
    { id: 18, left: 40, top: 60, size: 19, delay: 0.95 },
    { id: 19, left: 55, top: 5, size: 16, delay: 0.05 },
    { id: 20, left: 8, top: 45, size: 20, delay: 0.5 },
];

export default function HeroSection({ name = "Sayang" }: HeroSectionProps) {
    const [displayedText, setDisplayedText] = useState("");
    const fullText = `Happy Valentine's Day, ${name}!`;
    const [isComplete, setIsComplete] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
            }
        }, 80);

        return () => clearInterval(timer);
    }, [fullText]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Floating Hearts Background */}
            {mounted && (
                <div className="absolute inset-0 pointer-events-none">
                    {floatingHearts.map((heart) => (
                        <motion.div
                            key={heart.id}
                            className="absolute text-rose-300/40"
                            style={{
                                left: `${heart.x}%`,
                                top: `${heart.y}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 4 + heart.delay,
                                repeat: Infinity,
                                delay: heart.delay,
                            }}
                        >
                            <Heart
                                size={heart.size}
                                fill="currentColor"
                                className="opacity-60"
                            />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Sparkles */}
            {mounted && (
                <div className="absolute inset-0 pointer-events-none">
                    {sparklePositions.map((sparkle) => (
                        <motion.div
                            key={`sparkle-${sparkle.id}`}
                            className="absolute text-rose-400/30"
                            style={{
                                left: `${sparkle.left}%`,
                                top: `${sparkle.top}%`,
                            }}
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 2 + sparkle.delay,
                                repeat: Infinity,
                                delay: sparkle.delay,
                            }}
                        >
                            <Sparkles size={sparkle.size} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <Heart
                        size={60}
                        className="mx-auto text-rose-500 animate-pulse-heart"
                        fill="currentColor"
                    />
                </motion.div>

                <h1
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                    style={{ fontFamily: "var(--font-dancing)" }}
                >
                    <span className="text-gradient">{displayedText}</span>
                    {!isComplete && <span className="animate-blink text-rose-500">|</span>}
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isComplete ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl text-rose-600/80 max-w-2xl mx-auto"
                >
                    Scroll down untuk melihat perjalanan cinta kita... 💕
                </motion.p>
            </motion.div>
        </section>
    );
}
