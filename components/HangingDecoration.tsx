'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
    { id: 1, emoji: '☕', color: 'from-amber-50 to-orange-100', label: 'Fuel', delay: 0 },
    { id: 2, emoji: '💻', color: 'from-slate-50 to-blue-100', label: 'Craft', delay: 0.2 },
    { id: 3, emoji: '🎨', color: 'from-purple-50 to-pink-100', label: 'Design', delay: 0.1 },
    { id: 4, emoji: '💡', color: 'from-yellow-50 to-amber-100', label: 'Idea', delay: 0.3 },
    { id: 5, emoji: '❤️', color: 'from-rose-50 to-red-100', label: 'Passion', delay: 0.15 },
    { id: 6, emoji: '🚀', color: 'from-emerald-50 to-teal-100', label: 'Launch', delay: 0.25 },
];

export default function HangingDecoration() {
    return (
        <div className="relative w-full py-8 md:py-20 overflow-visible flex items-center justify-center">
            {/* The Hanging Items Container */}
            <div className="w-full max-w-5xl flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-6 md:gap-0 px-4 md:px-[5%]">
                {items.map((item, index) => {
                    // Desktop only vertical spread
                    const t = index / (items.length - 1);
                    const desktopYOffset = 160 * (4 * t * (1 - t));

                    // Swaying physics
                    const swayDuration = 3 + Math.random() * 2;
                    const swayAmount = 3 + Math.random() * 4;

                    return (
                        <motion.div
                            key={item.id}
                            className="relative flex flex-col items-center"
                            initial={{ y: -30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: item.delay,
                                type: "spring",
                                stiffness: 60,
                                damping: 12
                            }}
                        >
                            {/* Decorative Line - only on desktop for that hanging look */}
                            <div
                                className="hidden md:block w-[1px] h-10 bg-gray-200 relative"
                                style={{ marginTop: desktopYOffset }}
                            >
                                <div className="absolute top-0 -left-1 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white shadow-sm" />
                            </div>

                            {/* Card Component */}
                            <motion.div
                                animate={{
                                    rotate: [index % 2 === 0 ? -swayAmount : swayAmount, index % 2 === 0 ? swayAmount : -swayAmount],
                                }}
                                transition={{
                                    rotate: { repeat: Infinity, repeatType: "mirror", duration: swayDuration, ease: "easeInOut" },
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    zIndex: 30,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group cursor-pointer"
                            >
                                {/* Polaroid Card */}
                                <div className={`
                                    w-[70px] h-[85px] sm:w-20 sm:h-24 md:w-24 md:h-28 p-1.5 md:p-2 bg-white 
                                    shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] border border-gray-100/50 rounded-sm 
                                    flex flex-col items-center transition-all duration-300
                                    group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]
                                `}>
                                    {/* Content Box */}
                                    <div className={`
                                        w-full flex-1 rounded-sm bg-gradient-to-br ${item.color}
                                        flex items-center justify-center relative overflow-hidden
                                    `}>
                                        <span className="text-xl sm:text-2xl md:text-3xl select-none z-10 drop-shadow-sm">
                                            {item.emoji}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
                                    </div>

                                    {/* Label Section */}
                                    <div className="h-4 sm:h-6 md:h-8 flex items-center justify-center w-full">
                                        <p className="font-handwriting text-[9px] sm:text-[10px] md:text-sm text-gray-400 tracking-tight opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>

                                {/* Realistic Pin Head */}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-[2px] shadow-sm rotate-[12deg] z-10">
                                    <div className="absolute top-1 left-1.5 w-1 h-1 bg-white/10 rounded-full" />
                                </div>
                            </motion.div>

                            {/* Dynamic Shadow */}
                            <motion.div
                                animate={{
                                    scale: [0.8, 1.1, 0.8],
                                    opacity: [0.03, 0.07, 0.03]
                                }}
                                transition={{ repeat: Infinity, duration: swayDuration, ease: "easeInOut" }}
                                className="w-10 sm:w-12 h-1.5 bg-black/20 blur-md rounded-full mt-3 md:mt-6"
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
