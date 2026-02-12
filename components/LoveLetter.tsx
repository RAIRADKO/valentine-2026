"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";

export default function LoveLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

    const letterParagraphs = [
        "Athalia sayangku,",
        "Di hari Valentine ini, aku cuma ingin kamu tahu satu hal sederhana tapi paling jujur: aku sangat bersyukur punya kamu. Hadirmu bikin hari-hariku lebih hidup, lebih tenang, dan penuh senyum kecil yang kadang bahkan nggak aku sadari.",
        "Cara kamu perhatian, cara kamu tertawa, bahkan caramu diam… semuanya punya tempat spesial di hatiku. Bersamamu, aku merasa dicintai tanpa syarat dan diterima apa adanya. Kamu bukan cuma seseorang yang aku sayangi, tapi juga rumah tempat hatiku pulang.",
        "Terima kasih sudah memilih bertahan, berbagi cerita, dan berjalan bersamaku sejauh ini. Semoga Valentine ini jadi salah satu dari banyak momen indah yang akan kita rayakan bersama.",
        "Aku sayang kamu, Athalia. Hari ini, besok, dan seterusnya. 💖",
    ];

    const handleEnvelopeClick = () => {
        if (!isEnvelopeOpen) {
            setIsEnvelopeOpen(true);
            setTimeout(() => setIsOpen(true), 700);
        } else {
            setIsOpen(true);
        }
    };

    // Seeded PRNG to avoid hydration mismatch (Math.random differs server vs client)
    const seededRandom = (seed: number) => {
        let t = (seed + 0x6d2b79f5) | 0;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Floating hearts for the background
    const floatingHearts = useMemo(
        () =>
            Array.from({ length: 8 }, (_, i) => ({
                x: 5 + seededRandom(i * 3 + 100) * 90,
                delay: i * 0.7,
                size: 8 + seededRandom(i * 3 + 101) * 14,
                duration: 4 + seededRandom(i * 3 + 102) * 3,
            })),
        []
    );

    // Sparkle particles for the modal
    const sparkles = useMemo(
        () =>
            Array.from({ length: 12 }, (_, i) => ({
                x: seededRandom(i * 3 + 200) * 100,
                y: seededRandom(i * 3 + 201) * 100,
                size: 3 + seededRandom(i * 3 + 202) * 4,
                delay: i * 0.3,
                duration: 2 + seededRandom(i * 3 + 203) * 2,
            })),
        []
    );

    // Shimmer particles on envelope surface
    const shimmerParticles = useMemo(
        () =>
            Array.from({ length: 15 }, (_, i) => ({
                x: 10 + seededRandom(i * 3 + 300) * 80,
                y: 10 + seededRandom(i * 3 + 301) * 80,
                size: 2 + seededRandom(i * 3 + 302) * 3,
                delay: i * 0.4,
                duration: 1.5 + seededRandom(i * 3 + 303) * 2,
            })),
        []
    );

    return (
        <section className="relative py-28 px-4 overflow-hidden">
            {/* Soft radial background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(251,113,133,0.08) 0%, transparent 70%)",
                }}
            />

            {/* Background floating hearts */}
            {floatingHearts.map((h, i) => (
                <motion.div
                    key={i}
                    className="absolute text-rose-200/30 pointer-events-none"
                    style={{ left: `${h.x}%`, bottom: "-20px" }}
                    animate={{
                        y: [0, -700],
                        opacity: [0, 0.5, 0],
                        rotate: [0, 15, -15, 0],
                        x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                    }}
                    transition={{
                        duration: h.duration,
                        repeat: Infinity,
                        delay: h.delay,
                        ease: "easeOut",
                    }}
                >
                    <Heart size={h.size} fill="currentColor" />
                </motion.div>
            ))}

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rose-100/80 to-pink-100/80 text-rose-500 text-sm mb-6 shadow-sm"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <Sparkles size={14} className="text-rose-400" />
                    <span className="font-medium">Spesial untukmu</span>
                    <Sparkles size={14} className="text-rose-400" />
                </motion.div>
                <h2
                    className="text-4xl sm:text-5xl md:text-6xl text-rose-600 mb-5"
                    style={{ fontFamily: "var(--font-dancing)" }}
                >
                    Surat Cinta Untukmu
                </h2>
                <p className="text-rose-400/80 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Aku punya sesuatu yang ingin kusampaikan…
                    <br />
                    <span className="text-rose-500">Klik amplop</span> di bawah ini 💌
                </p>
            </motion.div>

            {/* Envelope */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex justify-center"
            >
                <motion.div
                    className="relative cursor-pointer"
                    onClick={handleEnvelopeClick}
                    whileHover={{ scale: 1.04, y: -8, rotateZ: -1 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {/* Layered shadow under envelope */}
                    <div
                        className="absolute -bottom-5 left-8 right-8 h-10 rounded-[50%] blur-2xl"
                        style={{ background: "radial-gradient(ellipse, rgba(190,40,90,0.35), transparent 70%)" }}
                    />
                    <div
                        className="absolute -bottom-3 left-14 right-14 h-6 rounded-[50%] blur-xl"
                        style={{ background: "radial-gradient(ellipse, rgba(220,80,120,0.25), transparent 70%)" }}
                    />

                    {/* Envelope body */}
                    <div
                        className="relative w-[320px] h-[220px] sm:w-[380px] sm:h-[250px] rounded-2xl overflow-hidden"
                        style={{
                            boxShadow:
                                "0 25px 60px rgba(160,30,70,0.25), 0 8px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                        }}
                    >
                        {/* Body — rich layered gradient */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(165deg, #fff5f7 0%, #fce4ec 25%, #f8bbd0 55%, #f48fb1 100%)",
                            }}
                        />

                        {/* Paper texture overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: `repeating-linear-gradient(
                                    45deg,
                                    transparent,
                                    transparent 8px,
                                    rgba(180,60,100,0.3) 8px,
                                    rgba(180,60,100,0.3) 9px
                                )`,
                            }}
                        />

                        {/* Satin sheen effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
                            }}
                        />

                        {/* Inner decorative border - double line */}
                        <div
                            className="absolute inset-[5px] rounded-xl pointer-events-none"
                            style={{
                                border: "1px solid rgba(255,255,255,0.45)",
                                boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.08)",
                            }}
                        />

                        {/* Gold accent line at bottom */}
                        <div
                            className="absolute bottom-0 left-8 right-8 h-[2px] pointer-events-none"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(218,165,32,0.3), rgba(218,165,32,0.5), rgba(218,165,32,0.3), transparent)",
                            }}
                        />

                        {/* Shimmer particles on envelope */}
                        {shimmerParticles.map((p, i) => (
                            <motion.div
                                key={`shimmer-${i}`}
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    width: p.size,
                                    height: p.size,
                                    background: "radial-gradient(circle, rgba(255,215,0,0.7), rgba(255,182,193,0.4))",
                                }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scale: [0.5, 1.3, 0.5],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* ── Flap (top triangle) ── */}
                        <div
                            className="absolute top-0 left-0 right-0"
                            style={{
                                height: "55%",
                                perspective: "900px",
                                zIndex: isEnvelopeOpen ? 5 : 20,
                                pointerEvents: isEnvelopeOpen ? "none" : "auto",
                            }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    transformOrigin: "top center",
                                    transformStyle: "preserve-3d",
                                }}
                                animate={{
                                    rotateX: isEnvelopeOpen ? -180 : 0,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                {/* Flap front — V-shape triangle with gradient */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 50% 100%, 100% 0)",
                                        background:
                                            "linear-gradient(180deg, #ec407a 0%, #f06292 35%, #f48fb1 70%, #fce4ec 100%)",
                                        backfaceVisibility: "hidden",
                                    }}
                                >
                                    {/* Flap inner sheen */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                                            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                                        }}
                                    />
                                    {/* Flap edge highlight */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                                            boxShadow: "inset 0 -2px 6px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                </div>
                                {/* Flap back — lining with pattern */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        clipPath:
                                            "polygon(0 0, 50% 100%, 100% 0)",
                                        background: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
                                        transform: "rotateX(180deg)",
                                        backfaceVisibility: "hidden",
                                    }}
                                >
                                    {/* Decorative pattern on back of flap */}
                                    <div
                                        className="absolute inset-0 opacity-[0.06]"
                                        style={{
                                            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                                            backgroundImage: `repeating-linear-gradient(
                                                -45deg,
                                                transparent,
                                                transparent 6px,
                                                rgba(190,40,90,0.5) 6px,
                                                rgba(190,40,90,0.5) 7px
                                            )`,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom V-fold decoration (visible envelope fold lines) */}
                        <div
                            className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
                            style={{ height: "55%" }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
                                    background: "linear-gradient(0deg, rgba(180,50,90,0.08) 0%, transparent 60%)",
                                }}
                            />
                        </div>

                        {/* ── "Untukmu" text on bottom ── */}
                        <div className="absolute bottom-5 left-0 right-0 text-center pointer-events-none z-[2]">
                            <p
                                className="text-rose-400/50 text-lg tracking-[0.2em]"
                                style={{ fontFamily: "var(--font-dancing)", textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}
                            >
                                Untukmu ♡
                            </p>
                        </div>

                        {/* ── Wax Seal ── */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 z-30"
                            style={{ top: "calc(55% - 34px)" }}
                            animate={{
                                scale: isEnvelopeOpen ? [1, 0.6] : [1, 1.08, 1],
                                opacity: isEnvelopeOpen ? 0 : 1,
                                y: isEnvelopeOpen ? -20 : 0,
                            }}
                            transition={{
                                duration: isEnvelopeOpen ? 0.4 : 2.5,
                                repeat: isEnvelopeOpen ? 0 : Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Outer soft glow */}
                            <div className="absolute inset-[-14px] rounded-full bg-rose-400/15 blur-2xl" />
                            <div className="absolute inset-[-8px] rounded-full bg-rose-500/20 blur-lg" />
                            {/* Seal circle with 3D wax effect */}
                            <div
                                className="relative w-[66px] h-[66px] rounded-full flex items-center justify-center"
                                style={{
                                    background:
                                        "radial-gradient(circle at 35% 28%, #f06292, #e91e63 40%, #c2185b 70%, #880e4f 100%)",
                                    boxShadow:
                                        "0 8px 25px rgba(190,20,70,0.5), 0 3px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
                                }}
                            >
                                {/* Wax texture ring */}
                                <div
                                    className="absolute inset-[4px] rounded-full"
                                    style={{
                                        border: "1.5px solid rgba(255,255,255,0.15)",
                                        boxShadow:
                                            "inset 0 1px 3px rgba(255,255,255,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
                                    }}
                                />
                                {/* Shine highlight on wax */}
                                <div
                                    className="absolute top-[6px] left-[10px] w-[18px] h-[10px] rounded-full"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)",
                                        filter: "blur(2px)",
                                    }}
                                />
                                <Heart
                                    size={24}
                                    className="text-white relative z-10"
                                    fill="currentColor"
                                    style={{
                                        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Letter peeking out (outside envelope body to avoid overflow clip) ── */}
                    <AnimatePresence>
                        {isEnvelopeOpen && (
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: -65 }}
                                exit={{ y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                                className="absolute top-3 left-5 right-5 h-36 bg-white rounded-t-xl z-0"
                                style={{
                                    boxShadow: "0 -6px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,220,230,0.5)",
                                }}
                            >
                                <div className="pt-6 px-6 space-y-3">
                                    <div className="h-1.5 bg-rose-100 rounded-full w-3/4" />
                                    <div className="h-1.5 bg-rose-50 rounded-full w-1/2" />
                                    <div className="h-1.5 bg-rose-50 rounded-full w-2/3" />
                                    <div className="h-1.5 bg-rose-50/50 rounded-full w-1/3" />
                                </div>
                                {/* Tap to read hint */}
                                <motion.p
                                    className="text-center text-rose-400/70 text-xs mt-4"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                >
                                    Tap untuk membaca 💌
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tap hint with enhanced animation */}
                    {!isEnvelopeOpen && (
                        <motion.div
                            className="mt-7 text-center"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                            transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <p className="text-rose-400 text-sm tracking-wide">
                                ✨ Tap untuk membuka ✨
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {/* ═══════ Letter Modal ═══════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-md"
                        />

                        {/* Floating sparkles in modal */}
                        {sparkles.map((s, i) => (
                            <motion.div
                                key={i}
                                className="absolute pointer-events-none z-10"
                                style={{
                                    left: `${s.x}%`,
                                    top: `${s.y}%`,
                                    width: s.size,
                                    height: s.size,
                                    borderRadius: "50%",
                                    background: "white",
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.2, 0.5],
                                }}
                                transition={{
                                    duration: s.duration,
                                    repeat: Infinity,
                                    delay: s.delay,
                                }}
                            />
                        ))}

                        {/* Letter card */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotateZ: -3 }}
                            animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotateZ: 3 }}
                            transition={{
                                type: "spring",
                                damping: 22,
                                stiffness: 240,
                            }}
                            className="relative max-w-lg w-full max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl z-20"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                boxShadow:
                                    "0 25px 60px rgba(190,50,80,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
                            }}
                        >
                            {/* ── Top ornamental banner ── */}
                            <div className="relative h-24 overflow-hidden">
                                {/* Gradient background */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #e91e63 0%, #f06292 40%, #ec407a 70%, #ad1457 100%)",
                                    }}
                                />
                                {/* Decorative circles */}
                                <div
                                    className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10"
                                    style={{
                                        background:
                                            "radial-gradient(circle, white 0%, transparent 70%)",
                                    }}
                                />
                                <div
                                    className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10"
                                    style={{
                                        background:
                                            "radial-gradient(circle, white 0%, transparent 70%)",
                                    }}
                                />
                                {/* Floating heart decorations */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute text-white/8"
                                            style={{
                                                left: `${i * 11}%`,
                                                top: `${15 + (i % 4) * 20}%`,
                                            }}
                                            animate={{ rotate: [0, 360] }}
                                            transition={{
                                                duration: 20 + i * 3,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <Heart
                                                size={14 + i * 3}
                                                fill="currentColor"
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Title */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-1">
                                            dari hati terdalam
                                        </p>
                                        <h3
                                            className="text-white text-3xl sm:text-4xl drop-shadow-lg"
                                            style={{
                                                fontFamily: "var(--font-dancing)",
                                            }}
                                        >
                                            Surat Cinta
                                        </h3>
                                    </motion.div>
                                </div>

                                {/* Close */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/15 hover:bg-white/25 transition-all backdrop-blur-sm group"
                                >
                                    <X
                                        size={16}
                                        className="text-white/80 group-hover:text-white transition-colors"
                                    />
                                </button>

                                {/* Bottom wave */}
                                <svg
                                    className="absolute -bottom-px left-0 right-0 w-full"
                                    viewBox="0 0 400 20"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    style={{ height: "16px" }}
                                >
                                    <path
                                        d="M0 20 C100 0 300 0 400 20 L400 20 L0 20 Z"
                                        fill="#fdfbf5"
                                    />
                                </svg>
                            </div>

                            {/* ── Letter body ── */}
                            <div
                                className="overflow-y-auto"
                                style={{
                                    maxHeight: "calc(85vh - 6rem)",
                                    background:
                                        "linear-gradient(180deg, #fdfbf5 0%, #fef7f0 50%, #fdf5f0 100%)",
                                }}
                            >
                                {/* Paper texture */}
                                <div
                                    className="relative px-8 sm:px-12 pt-6 pb-10"
                                    style={{
                                        backgroundImage: `
                                            repeating-linear-gradient(
                                                transparent,
                                                transparent 31px,
                                                rgba(200,160,160,0.18) 31px,
                                                rgba(200,160,160,0.18) 32px
                                            )
                                        `,
                                        backgroundPosition: "0 10px",
                                    }}
                                >
                                    {/* Red margin line */}
                                    <div className="absolute left-6 sm:left-9 top-0 bottom-0 w-[1.5px] bg-rose-300/30" />

                                    {/* Three-hole punch decoration */}
                                    <div className="absolute left-2 sm:left-3 top-0 bottom-0 flex flex-col justify-evenly pointer-events-none">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="w-3 h-3 rounded-full border-2 border-gray-300/30 bg-transparent"
                                            />
                                        ))}
                                    </div>

                                    {/* Date */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="ml-4 sm:ml-6 mb-3 flex items-center gap-2"
                                    >
                                        <div className="h-px w-8 bg-rose-300/50" />
                                        <span className="text-rose-400/70 text-xs tracking-widest uppercase">
                                            14 Februari 2026
                                        </span>
                                        <div className="h-px w-8 bg-rose-300/50" />
                                    </motion.div>

                                    {/* Letter paragraphs with staggered animation */}
                                    <div className="ml-4 sm:ml-6 space-y-0">
                                        {letterParagraphs.map((para, idx) => (
                                            <motion.p
                                                key={idx}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.3 + idx * 0.15,
                                                    duration: 0.5,
                                                }}
                                                className={`text-rose-900/80 ${idx === 0
                                                    ? "text-xl sm:text-2xl text-rose-700 mb-3"
                                                    : "mb-[32px]"
                                                    }`}
                                                style={{
                                                    fontFamily: "var(--font-dancing)",
                                                    fontSize:
                                                        idx === 0 ? undefined : "1.3rem",
                                                    lineHeight: "32px",
                                                }}
                                            >
                                                {para}
                                            </motion.p>
                                        ))}
                                    </div>

                                    {/* Signature */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.1 }}
                                        className="ml-4 sm:ml-6 mt-6 text-right pr-4"
                                    >
                                        <div className="inline-block text-right">
                                            <p
                                                className="text-rose-500 text-lg mb-1"
                                                style={{
                                                    fontFamily: "var(--font-dancing)",
                                                }}
                                            >
                                                Dengan penuh cinta,
                                            </p>
                                            <p
                                                className="text-rose-700 text-2xl sm:text-3xl"
                                                style={{
                                                    fontFamily: "var(--font-dancing)",
                                                }}
                                            >
                                                Rahmat Irfan
                                            </p>
                                            {/* Signature underline */}
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    delay: 1.3,
                                                    duration: 0.5,
                                                }}
                                                className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mt-1 origin-left"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Bottom ornament */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 1.4,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        className="flex items-center justify-center gap-3 mt-10 mb-2"
                                    >
                                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300/60" />
                                        <div className="flex items-center gap-1">
                                            <Heart
                                                size={10}
                                                className="text-rose-300"
                                                fill="currentColor"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.25, 1] }}
                                                transition={{
                                                    duration: 1.2,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                <Heart
                                                    size={18}
                                                    className="text-rose-400"
                                                    fill="currentColor"
                                                />
                                            </motion.div>
                                            <Heart
                                                size={10}
                                                className="text-rose-300"
                                                fill="currentColor"
                                            />
                                        </div>
                                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300/60" />
                                    </motion.div>

                                    {/* PS note */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.6 }}
                                        className="text-center text-rose-400/60 text-xs mt-4"
                                    >
                                        — forever & always —
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
