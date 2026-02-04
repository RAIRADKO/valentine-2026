"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PartyPopper, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function TheQuestion() {
    const [answered, setAnswered] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const fireConfetti = useCallback(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"],
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"],
            });
        }, 250);
    }, []);

    const handleYesClick = () => {
        setAnswered(true);
        fireConfetti();
    };

    const handleNoHover = () => {
        if (!containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const maxX = container.width - 120; // button width
        const maxY = container.height - 50; // button height

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        setNoButtonPosition({ x: newX, y: newY });
    };

    return (
        <section className="py-20 px-4 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full max-w-2xl mx-auto"
            >
                <AnimatePresence mode="wait">
                    {!answered ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            {/* Decorative hearts */}
                            <div className="flex justify-center gap-4 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 10, -10, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    >
                                        <Heart
                                            size={24}
                                            fill="currentColor"
                                            className="text-rose-400"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.h2
                                className="text-4xl sm:text-5xl md:text-6xl text-rose-600 mb-12"
                                style={{ fontFamily: "var(--font-dancing)" }}
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                Will you be my Valentine? 💕
                            </motion.h2>

                            {/* Buttons Container */}
                            <div
                                ref={containerRef}
                                className="relative h-40 flex items-center justify-center"
                            >
                                {/* Yes Button */}
                                <motion.button
                                    onClick={handleYesClick}
                                    className="px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-xl shadow-rose-300/50 hover:shadow-rose-400/60 transition-shadow z-10"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Yes! 💖
                                </motion.button>

                                {/* No Button - Runaway */}
                                <motion.button
                                    onMouseEnter={handleNoHover}
                                    onTouchStart={handleNoHover}
                                    className="absolute px-8 py-3 text-lg font-medium text-rose-400 bg-white border-2 border-rose-300 rounded-full shadow-lg hover:bg-rose-50 transition-colors"
                                    animate={{
                                        x: noButtonPosition.x,
                                        y: noButtonPosition.y,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    }}
                                    style={{
                                        left: noButtonPosition.x === 0 ? "calc(50% + 100px)" : 0,
                                        top: noButtonPosition.y === 0 ? "50%" : 0,
                                        transform:
                                            noButtonPosition.x === 0 && noButtonPosition.y === 0
                                                ? "translate(0, -50%)"
                                                : "none",
                                    }}
                                >
                                    No 😢
                                </motion.button>
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-8 text-rose-400 text-sm italic"
                            >
                                Hint: Tombol &quot;No&quot; agak susah diklik 😏
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="answer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: 3,
                                }}
                                className="mb-8"
                            >
                                <PartyPopper size={80} className="text-rose-500 mx-auto" />
                            </motion.div>

                            <motion.h2
                                className="text-4xl sm:text-5xl md:text-6xl text-rose-600 mb-6"
                                style={{ fontFamily: "var(--font-dancing)" }}
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            >
                                Yeay! 🎉💕
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl text-rose-500 mb-8"
                            >
                                Aku tahu kamu pasti bilang iya! 😊
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-2xl text-rose-600 font-semibold"
                                style={{ fontFamily: "var(--font-dancing)" }}
                            >
                                I love you more than words can say... 💖
                            </motion.p>

                            {/* Floating hearts celebration */}
                            <div className="flex justify-center gap-3 mt-8">
                                {[...Array(7)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                        }}
                                    >
                                        <Heart
                                            size={28}
                                            fill="currentColor"
                                            className="text-rose-500"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
