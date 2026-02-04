"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Coffee, Music, Smile, Sun } from "lucide-react";

const reasons = [
    {
        id: 1,
        icon: Heart,
        front: "Senyummu",
        back: "Senyummu adalah hal pertama yang membuatku jatuh cinta. Setiap kali kamu tersenyum, duniaku terasa lebih indah.",
    },
    {
        id: 2,
        icon: Sparkles,
        front: "Kebaikanmu",
        back: "Hatimu yang baik membuatku kagum. Cara kamu memperlakukan orang lain dengan penuh kasih sayang itu luar biasa.",
    },
    {
        id: 3,
        icon: Star,
        front: "Kecerdasanmu",
        back: "Pikiranmu yang cerdas selalu membuatku terpesona. Diskusi denganmu adalah hal favorit yang aku nantikan.",
    },
    {
        id: 4,
        icon: Coffee,
        front: "Kebersamaan",
        back: "Momen-momen sederhana bersamamu, seperti ngopi pagi atau nonton film, terasa spesial dan tak tergantikan.",
    },
    {
        id: 5,
        icon: Music,
        front: "Tawamu",
        back: "Suara tawamu adalah melodi terindah yang pernah kudengar. Tertawa bersamamu adalah kebahagiaan tersendiri.",
    },
    {
        id: 6,
        icon: Smile,
        front: "Supportmu",
        back: "Kamu selalu ada di saat aku butuh. Dukunganmu membuatku percaya bahwa aku bisa melewati apapun.",
    },
    {
        id: 7,
        icon: Sun,
        front: "Energimu",
        back: "Semangatmu yang positif selalu menular padaku. Kamu adalah matahari dalam hidupku yang menerangi hari-hariku.",
    },
    {
        id: 8,
        icon: Heart,
        front: "Semuanya",
        back: "Aku mencintai setiap bagian dari dirimu - kelebihan dan kekuranganmu. Kamu sempurna untukku.",
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

const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateY: -15 },
    visible: {
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function WhyILoveYou() {
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
                    Mengapa Aku Mencintaimu? 💕
                </h2>
                <p className="text-rose-500/80 max-w-lg mx-auto">
                    Hover atau tap kartunya untuk membaca alasannya...
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {reasons.map((reason) => {
                    const IconComponent = reason.icon;
                    return (
                        <motion.div
                            key={reason.id}
                            variants={cardVariants}
                            className="flip-card h-64 cursor-pointer"
                        >
                            <div className="flip-card-inner relative w-full h-full">
                                {/* Front of Card */}
                                <div className="flip-card-front absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-xl shadow-rose-300/30">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="mb-4"
                                    >
                                        <IconComponent size={48} />
                                    </motion.div>
                                    <h3
                                        className="text-2xl font-bold"
                                        style={{ fontFamily: "var(--font-dancing)" }}
                                    >
                                        {reason.front}
                                    </h3>
                                    <p className="text-rose-100 text-sm mt-2">Hover untuk baca</p>
                                </div>

                                {/* Back of Card */}
                                <div className="flip-card-back absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-2 border-rose-300 shadow-xl">
                                    <IconComponent size={32} className="text-rose-500 mb-4" />
                                    <p className="text-rose-700 text-center text-sm leading-relaxed">
                                        {reason.back}
                                    </p>
                                    <Heart
                                        size={20}
                                        fill="currentColor"
                                        className="text-rose-400 mt-4"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
