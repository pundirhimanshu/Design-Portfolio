'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const generateRandomStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 50,
        size: Math.random() > 0.5 ? 2 : 1,
        duration: Math.random() * 0.6 + 0.4,
        delay: Math.random() * 0.2
    }));
};

const generateExplosions = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        delay: Math.random() * 2,
        color: Math.random() > 0.5 ? '#ef4444' : '#fb923c'
    }));
};

export default function DownloadApkButton() {
    const stars = useMemo(() => generateRandomStars(20), []);
    const explosions = useMemo(() => generateExplosions(4), []);

    return (
        <motion.a
            href="https://drive.google.com/drive/folders/1lh6hWTCcJKahT4zBdAMeBPpMytzxy9Uu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-black text-white px-8 py-4 rounded-full text-xl font-bold tracking-tight shadow-xl hover:shadow-red-500/30 transition-shadow group isolate inline-block no-underline"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Intensity Shake Effect Container */}
            <motion.div
                variants={{
                    hover: {
                        x: [0, -1, 1, -1, 1, 0],
                        transition: { repeat: Infinity, duration: 0.2 }
                    }
                }}
                className="absolute inset-0 z-0"
            />

            {/* Cosmic Background */}
            <div className="absolute inset-0 -z-10 bg-black w-full h-full overflow-hidden">

                {/* 1. Warp Speed Stars */}
                {stars.map((star) => (
                    <motion.div
                        key={`star-${star.id}`}
                        className="absolute bg-white rounded-full opacity-0"
                        style={{
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                        }}
                        variants={{
                            hover: {
                                x: ['0%', '400%'],
                                opacity: [0, 1, 0],
                                scaleX: [1, 20],
                                transition: {
                                    duration: star.duration,
                                    repeat: Infinity,
                                    delay: star.delay,
                                    ease: "linear"
                                }
                            }
                        }}
                    />
                ))}

                {/* 2. Advanced Laser Battles */}
                {/* Red Laser Barrage */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`laser-red-${i}`}
                        className="absolute h-[2px] w-16 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] opacity-0"
                        style={{ top: `${20 + i * 25}%`, left: -50 }}
                        variants={{
                            hover: {
                                x: ['-100%', '600%'],
                                opacity: [0, 1, 1, 0],
                                transition: {
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 0.15,
                                    repeatDelay: Math.random() * 0.5
                                }
                            }
                        }}
                    />
                ))}

                {/* Green Laser Counter-Fire (Angled) */}
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={`laser-green-${i}`}
                        className="absolute h-[2px] w-12 bg-green-400 rounded-full shadow-[0_0_15px_rgba(74,222,128,1)] opacity-0"
                        style={{ top: `${40 + i * 30}%`, right: -50 }}
                        variants={{
                            hover: {
                                x: ['100%', '-600%'],
                                opacity: [0, 1, 1, 0],
                                transition: {
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: 0.2 + i * 0.2,
                                    repeatDelay: Math.random() * 0.5
                                }
                            }
                        }}
                    />
                ))}

                {/* 3. Tiny Fighter Ship Silhouette */}
                <motion.svg
                    viewBox="0 0 24 24"
                    className="absolute w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    style={{ top: '45%', left: -30 }}
                    variants={{
                        hover: {
                            x: ['-50px', '400px'],
                            y: [0, -10, 10, 0],
                            rotate: [90, 85, 95, 90],
                            transition: {
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 0.5
                            }
                        }
                    }}
                >
                    <path fill="currentColor" d="M12 2L2 22L12 18L22 22L12 2Z" />
                </motion.svg>

                {/* 4. Cinematic Explosions */}
                {explosions.map((exp) => (
                    <motion.div
                        key={`exp-${exp.id}`}
                        className="absolute rounded-full mix-blend-screen"
                        style={{
                            top: `${exp.top}%`,
                            left: `${exp.left}%`,
                            backgroundColor: exp.color,
                            boxShadow: `0 0 20px ${exp.color}`
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        variants={{
                            hover: {
                                scale: [0, 1.5, 2],
                                opacity: [0, 0.8, 0],
                                transition: {
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: exp.delay,
                                    repeatDelay: 2
                                }
                            }
                        }}
                    />
                ))}
            </div>

            <span className="relative z-10 flex items-center justify-center gap-2 mix-blend-lighten">
                Download Apk
                <motion.svg
                    variants={{ hover: { y: 3, scale: 1.2 } }}
                    transition={{ type: "spring", stiffness: 400 }}
                    width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M7 1V11M7 11L2 6M7 11L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
            </span>
        </motion.a>
    );
}
