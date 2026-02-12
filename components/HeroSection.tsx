'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Basketball from './Basketball';

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const netRef = useRef<HTMLDivElement>(null);
    const [isNetWobbling, setIsNetWobbling] = useState(false);

    const handleSwish = () => {
        setIsNetWobbling(true);
        setTimeout(() => setIsNetWobbling(false), 1000);
    };

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen w-full bg-white overflow-hidden"
        >
            {/* Grid background - more visible */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Basketball Net (Layered for "Inside" effect) - Hidden on Mobile */}
            <motion.div
                ref={netRef}
                animate={isNetWobbling ? {
                    rotate: [-1, 2, -2, 1, 0],
                    scale: [1, 1.05, 0.98, 1.02, 1],
                    y: [0, 5, -2, 1, 0]
                } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-[20%] right-[2%] md:right-[5%] w-[180px] md:w-[280px] aspect-square hidden lg:block"
            >
                {/* Back Layer of Net */}
                <div className="absolute inset-0 z-10 opacity-80">
                    <Image
                        src="/images/Net.png"
                        alt="Net Back"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Front Layer of Net (Clipped to just show front rim/top) */}
                <div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ clipPath: 'inset(0 0 60% 0)' }} // Shows only the top 40% (the rim area)
                >
                    <Image
                        src="/images/Net.png"
                        alt="Net Front"
                        fill
                        className="object-contain"
                    />
                </div>
            </motion.div>

            {/* Basketball - Hidden on Mobile */}
            <div className="hidden lg:block">
                <Basketball containerRef={sectionRef} netRef={netRef} onSwish={handleSwish} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 md:pt-44 pb-32 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-4xl"
                >
                    {/* Large Greeting Text */}
                    <motion.h1
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] md:leading-none text-black cursor-default transition-all duration-300 p-4 rounded-3xl"
                    >
                        <motion.span
                            className="inline-block"
                            whileHover={{ scale: 1.1, y: -10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            I&apos;m
                        </motion.span>{" "}
                        <motion.span
                            className="inline-block"
                            whileHover={{
                                scale: 1.15,
                                rotate: -2,
                                textShadow: "8px 8px 0px rgba(0,0,0,0.1)",
                                color: "#333"
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            Himanshu.
                        </motion.span>
                    </motion.h1>

                    {/* Introduction */}
                    <div className="text-xl md:text-3xl text-gray-500 font-handwriting mb-8 transition-all duration-300 p-4">
                        <p>
                            I design digital products that are easy to use and look good. I focus on making things simple, clear, and enjoyable for people.
                        </p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
                    >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
