'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DownloadApkButton from './DownloadApkButton';

const games = [
    { name: '100 Games', image: '/images/100 Games.png' },
    { name: 'Flappy Basket', image: '/images/Flappy basket.png' },
    { name: 'Tic Tac Toe', image: '/images/Tic Tck Toe.png' },
    { name: 'Ping Pong', image: '/images/Ping Pong.png' },
    { name: 'Flying Bird', image: '/images/Flying Bird.png' },
    { name: 'Fruit Cutter', image: '/images/Fruit Cutter.png' },
    { name: 'Basket Ball', image: '/images/Basket Ball.png' },
    { name: 'Bowling', image: '/images/Bowling.png' },
];

export default function GamesSection() {
    return (
        <section className="py-16 md:py-28 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Left Side — Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-[0.6] max-w-md pt-4"
                    >
                        <h2 className="text-sm font-bold tracking-[0.2em] text-black/40 uppercase mb-8">
                            Designer+Builder
                        </h2>

                        <p className="font-handwriting text-3xl md:text-5xl text-slate-500 leading-relaxed mb-10 font-normal">
                            Here are a few games I didn&apos;t just design… I brought them to life.
                        </p>

                        <div className="space-y-4 mb-12">
                            <p className="text-xl md:text-2xl text-slate-600 font-handwriting flex items-center gap-3">
                                <span>👩‍💻</span>
                                <span>Designer? Yes.</span>
                            </p>
                            <p className="text-xl md:text-2xl text-slate-600 font-handwriting flex items-center gap-3">
                                <span>🏗️</span>
                                <span>Builder? Absolutely.</span>
                            </p>
                            <p className="text-xl md:text-2xl text-slate-600 font-handwriting flex items-center gap-3">
                                <span>🤖</span>
                                <span>AI just upgraded my superpowers.</span>
                            </p>
                        </div>

                        <DownloadApkButton />
                    </motion.div>

                    {/* Right Side — Auto-Scrolling Game Marquee */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-[1.4] w-full md:pl-12 relative overflow-hidden"
                    >
                        {/* Gradient Masks for Blur Effect */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none md:ml-12" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                        <div className="flex flex-col py-4">
                            {/* Single Marquee Row */}
                            <div className="flex gap-10 overflow-hidden group">
                                <motion.div
                                    animate={{ x: [0, -1035] }}
                                    transition={{
                                        duration: 35,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="flex gap-10 flex-nowrap"
                                >
                                    {[...games, ...games].map((game, index) => (
                                        <div
                                            key={`${game.name}-${index}`}
                                            className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden transition-all duration-300"
                                        >
                                            <Image
                                                src={game.image}
                                                alt={game.name}
                                                fill
                                                className="object-cover"
                                                sizes="160px"
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
