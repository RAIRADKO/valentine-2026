"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, X } from "lucide-react";

export default function LoveLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

    const letterContent = `Athalia sayangku,

Di hari Valentine ini, aku cuma ingin kamu tahu satu hal sederhana tapi paling jujur: aku sangat bersyukur punya kamu. Hadirmu bikin hari-hariku lebih hidup, lebih tenang, dan penuh senyum kecil yang kadang bahkan nggak aku sadari.

Cara kamu perhatian, cara kamu tertawa, bahkan caramu diam… semuanya punya tempat spesial di hatiku. Bersamamu, aku merasa dicintai tanpa syarat dan diterima apa adanya. Kamu bukan cuma seseorang yang aku sayangi, tapi juga rumah tempat hatiku pulang.

Terima kasih sudah memilih bertahan, berbagi cerita, dan berjalan bersamaku sejauh ini. Semoga Valentine ini jadi salah satu dari banyak momen indah yang akan kita rayakan bersama.

Aku sayang kamu, Athalia. Hari ini, besok, dan seterusnya. 💖`;

    const handleEnvelopeClick = () => {
        if (!isEnvelopeOpen) {
            setIsEnvelopeOpen(true);
            setTimeout(() => setIsOpen(true), 600);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <section className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2
                    className="text-3xl sm:text-4xl md:text-5xl text-rose-600 mb-4"
                    style={{ fontFamily: "var(--font-dancing)" }}
                >
                    Surat Cinta Untukmu 💌
                </h2>
                <p className="text-rose-500/80 max-w-lg mx-auto">
                    Klik amplop untuk membaca surat dariku...
                </p>
            </motion.div>

            {/* Envelope Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center"
            >
                <motion.div
                    className="relative cursor-pointer"
                    onClick={handleEnvelopeClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Envelope Body */}
                    <div className="relative w-72 h-48 sm:w-80 sm:h-52">
                        {/* Back of envelope */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-rose-300 rounded-lg shadow-xl" />

                        {/* Envelope flap (top) */}
                        <motion.div
                            className="absolute -top-0 left-0 right-0 h-24 origin-bottom"
                            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                            animate={{
                                rotateX: isEnvelopeOpen ? 180 : 0,
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                                    background: "linear-gradient(180deg, #fda4af 0%, #fb7185 100%)",
                                    backfaceVisibility: "hidden",
                                }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                                    background: "linear-gradient(0deg, #ffe4e6 0%, #fecdd3 100%)",
                                    transform: "rotateX(180deg)",
                                    backfaceVisibility: "hidden",
                                }}
                            />
                        </motion.div>

                        {/* Front of envelope */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg overflow-hidden">
                            {/* Bottom triangle */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-32"
                                style={{
                                    clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
                                    background: "linear-gradient(0deg, #fecdd3 0%, #fda4af 100%)",
                                }}
                            />
                        </div>

                        {/* Heart seal */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
                                <Heart size={24} className="text-white" fill="currentColor" />
                            </div>
                        </motion.div>

                        {/* Letter peeking out when envelope is open */}
                        <AnimatePresence>
                            {isEnvelopeOpen && (
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -30 }}
                                    exit={{ y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    className="absolute top-4 left-4 right-4 h-20 bg-white rounded-t-lg shadow-md z-0"
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {!isEnvelopeOpen && (
                        <motion.p
                            className="text-rose-500 mt-4 text-center text-sm"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ✨ Tap untuk membuka ✨
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>

            {/* Letter Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative bg-[#fffef8] rounded-lg shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundImage: `
                                    repeating-linear-gradient(
                                        transparent,
                                        transparent 31px,
                                        #e5e5e5 31px,
                                        #e5e5e5 32px
                                    )
                                `,
                                backgroundPosition: "0 20px",
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
                            >
                                <X size={20} className="text-rose-600" />
                            </button>

                            {/* Red margin line */}
                            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-rose-300 opacity-60" />

                            {/* Letter content */}
                            <div className="p-8 pl-16">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Mail className="text-rose-500 mb-4" size={32} />

                                    <div
                                        className="text-rose-900 leading-8 whitespace-pre-line"
                                        style={{
                                            fontFamily: "var(--font-dancing)",
                                            fontSize: "1.25rem",
                                        }}
                                    >
                                        {letterContent}
                                    </div>

                                    <div className="mt-8 text-right">
                                        <p
                                            className="text-rose-600 text-xl"
                                            style={{ fontFamily: "var(--font-dancing)" }}
                                        >
                                            Dengan penuh cinta,
                                        </p>
                                        <p
                                            className="text-rose-700 text-2xl mt-2"
                                            style={{ fontFamily: "var(--font-dancing)" }}
                                        >
                                            Rahmat Irfan 💕
                                        </p>
                                    </div>

                                    <div className="flex justify-center mt-6">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <Heart
                                                size={32}
                                                className="text-rose-500"
                                                fill="currentColor"
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
