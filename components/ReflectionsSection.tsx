'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reflections = [
    {
        title: "Structure first.",
        description: "Design is more than just looks. It needs a strong system. I build a solid foundation so new ideas can grow easily."
    },
    {
        title: "Keep it simple.",
        description: "I remove clutter to focus on what matters. Making things simple is hard work, but it makes the best experience for you."
    },
    {
        title: "Design with meaning.",
        description: "Everything should have a purpose. If a detail doesn't solve a problem or make things better, I don't use it."
    }
];

const TwinkleStar = () => {
    const style = useMemo(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
    }), []);

    return (
        <div
            className="absolute rounded-full bg-white animate-twinkle shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={style}
        />
    );
};

const ShootingStarDirectional = () => {
    const style = useMemo(() => {
        const startX = Math.random() * 80;
        const startY = Math.random() * 40;
        const duration = Math.random() * 2 + 3;
        const delay = Math.random() * 15;

        return {
            left: `${startX}%`,
            top: `${startY}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
        };
    }, []);

    return (
        <div
            className="absolute h-[1px] w-[120px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 shooting-star-directional"
            style={style}
        />
    );
};

export default function ReflectionsSection() {
    const [index, setIndex] = useState(0);
    const [stars, setStars] = useState<{ top: string, left: string }[]>([]);

    useEffect(() => {
        // Generate stars only on the client to avoid hydration mismatch
        setStars([...Array(100)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        })));

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % reflections.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="thoughts" className="relative min-h-screen bg-transparent flex items-center justify-center overflow-hidden py-32">
            {/* Seamless Bridge from Above */}
            <div className="absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />

            {/* Seamless Bridge to Below */}
            <div className="absolute bottom-0 left-0 right-0 h-[15vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

            {/* Realistic Space Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep Nebula Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,25,1)_0%,rgba(0,0,0,1)_80%)]" />

                {/* 100 Small Deep Stars */}
                {stars.map((star, i) => (
                    <div
                        key={`static-${i}`}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: '1px',
                            height: '1px',
                        }}
                    />
                ))}

                {/* Twinkling Stars */}
                {stars.length > 0 && [...Array(40)].map((_, i) => <TwinkleStar key={`twinkle-${i}`} />)}

                {/* Directional Shooting Stars (Top-Left to Bottom-Right) */}
                {stars.length > 0 && [...Array(3)].map((_, i) => <ShootingStarDirectional key={`shooting-${i}`} />)}
            </div>

            <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="space-y-12"
                    >
                        <h2 className="text-4xl md:text-8xl font-serif italic text-white/95 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] leading-tight selection:bg-white/20">
                            {reflections[index].title}
                        </h2>
                        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light tracking-wide italic">
                            {reflections[index].description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="mt-24 flex justify-center gap-4">
                    {reflections.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-700 ${i === index ? 'w-12 bg-white' : 'w-2 bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .animate-twinkle {
                    animation: twinkle infinite ease-in-out;
                }
                @keyframes shoot-directional {
                    0% { transform: translateX(-100px) translateY(-100px) rotate(45deg) scaleX(0); opacity: 0; }
                    10% { opacity: 1; transform: translateX(0) translateY(0) rotate(45deg) scaleX(1); }
                    30% { opacity: 1; transform: translateX(200px) translateY(200px) rotate(45deg) scaleX(1); }
                    100% { transform: translateX(600px) translateY(600px) rotate(45deg) scaleX(1); opacity: 0; }
                }
                .shooting-star-directional {
                    animation: shoot-directional infinite linear;
                }
            `}</style>
        </section>
    );
}
