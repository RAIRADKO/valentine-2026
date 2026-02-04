"use client";

import { motion } from "framer-motion";
import { Heart, Camera } from "lucide-react";

const photos = [
    {
        id: 1,
        src: "/photo1.jpg",
        caption: "Momen spesial bersama 💕",
    },
    {
        id: 2,
        src: "/photo2.jpg",
        caption: "Selfie berdua 📸",
    },
    {
        id: 3,
        src: "/photo3.jpg",
        caption: "Setelah KP di Kominfo 🏢",
    },
    {
        id: 4,
        src: "/photo4.jpg",
        caption: "Hujan-hujanan bareng ☔",
    },
    {
        id: 5,
        src: "/photo5.jpg",
        caption: "Genggaman tangan kita 🤝",
    },
    {
        id: 6,
        src: "/photo6.jpg",
        caption: "Manyun bareng 😘",
    },
    {
        id: 7,
        src: "/photo7.jpg",
        caption: "Peace sign ✌️",
    },
    {
        id: 8,
        src: "/photo8.jpg",
        caption: "Nganter kamu ke stasiun 🚂",
    },
    {
        id: 9,
        src: "/photo9.jpg",
        caption: "Coffee date ☕",
    },
    {
        id: 10,
        src: "/photo10.jpg",
        caption: "Senyum manis 😊",
    },
    {
        id: 11,
        src: "/photo11.png",
        caption: "Video call maskeran 💆‍♀️",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function PhotoGallery() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-rose-100/50 to-transparent">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-3 mb-4">
                    <Camera className="text-rose-500" size={32} />
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl text-rose-600"
                        style={{ fontFamily: "var(--font-dancing)" }}
                    >
                        Galeri Kenangan Kita
                    </h2>
                    <Camera className="text-rose-500" size={32} />
                </div>
                <p className="text-rose-500/80 max-w-lg mx-auto">
                    Setiap momen bersamamu adalah kenangan yang tak ternilai 💕
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
                {photos.map((photo) => (
                    <motion.div
                        key={photo.id}
                        variants={itemVariants}
                        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer break-inside-avoid mb-4"
                    >
                        {/* Image - using auto height to preserve aspect ratio */}
                        <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Heart size={14} fill="currentColor" className="text-rose-300" />
                                <span className="text-xs sm:text-sm font-medium drop-shadow-lg">{photo.caption}</span>
                            </div>
                        </div>

                        {/* Corner Heart */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Heart
                                size={20}
                                fill="currentColor"
                                className="text-white drop-shadow-lg"
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
