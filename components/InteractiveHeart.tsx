"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function InteractiveHeart() {
    const [clicks, setClicks] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    const messages = [
        "💕 I love you!",
        "💖 You're amazing!",
        "💗 You make me happy!",
        "💓 Forever yours!",
        "💘 My heart is yours!",
        "💝 You're my everything!",
        "💞 Together forever!",
        "💟 Kamu yang terbaik!",
    ];

    const handleClick = () => {
        setClicks((prev) => prev + 1);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 1500);
    };

    return (
        <section className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2
                    className="text-3xl sm:text-4xl md:text-5xl text-rose-600 mb-8"
                    style={{ fontFamily: "var(--font-dancing)" }}
                >
                    Klik Hati Ini ❤️
                </h2>

                <div className="relative inline-block">
                    {/* Sparkle effects around heart */}
                    <motion.div
                        className="absolute -top-4 -left-4 text-rose-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles size={24} />
                    </motion.div>
                    <motion.div
                        className="absolute -top-4 -right-4 text-rose-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                        <Sparkles size={24} />
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-rose-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                        <Sparkles size={24} />
                    </motion.div>

                    {/* Main Heart Button */}
                    <motion.button
                        onClick={handleClick}
                        className="relative p-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-2xl shadow-rose-400/50 cursor-pointer group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            scale: {
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                    >
                        <Heart
                            size={100}
                            className="text-white drop-shadow-lg"
                            fill="currentColor"
                        />

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-xl group-hover:blur-2xl transition-all duration-300" />
                    </motion.button>

                    {/* Pop-up message */}
                    {showMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: -20, scale: 1 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg text-rose-600 font-semibold whitespace-nowrap"
                        >
                            {messages[clicks % messages.length]}
                        </motion.div>
                    )}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-rose-500 text-lg"
                >
                    Kamu sudah klik {clicks} kali! 💕
                </motion.p>
            </motion.div>
        </section>
    );
}
