'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
    const greetings = ["Hello", "Namaste", "Bonjour", "Hola", "Ciao", "Hallo", "Konnichiwa"];
    const [currentGreeting, setCurrentGreeting] = useState(0);
    const [highlighted, setHighlighted] = useState("");

    // Sync highlights with ghost cursor animation
    useEffect(() => {
        const loop = () => {
            setHighlighted("");
            // Photo: 2s - 3.5s
            setTimeout(() => setHighlighted("photo"), 2000);
            setTimeout(() => setHighlighted(""), 3500);
            // Name: 4.5s - 6s
            setTimeout(() => setHighlighted("name"), 4500);
            setTimeout(() => setHighlighted(""), 6000);
            // Description: 7s - 8.5s
            setTimeout(() => setHighlighted("desc"), 7000);
            setTimeout(() => setHighlighted(""), 8500);
        };

        // Initial delay to sync with the ghost cursor 
        loop(); // Start immediately
        const interval = setInterval(loop, 12000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGreeting((prev) => (prev + 1) % greetings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen w-full bg-white">
            {/* Grid background - more visible */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 md:pt-44 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Rotating Hello Text */}
                        <div className="h-16 mb-4 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentGreeting}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl md:text-5xl text-gray-500 font-handwriting"
                                >
                                    {greetings[currentGreeting]},
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Large Greeting Text */}
                        <motion.h1
                            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] md:leading-none text-black cursor-default transition-all duration-300 p-4 rounded-3xl ${highlighted === 'name' ? 'bg-blue-50/80 scale-[1.02] ring-4 ring-blue-500/10' : ''}`}
                        >
                            <motion.span
                                className="inline-block"
                                whileHover={{ scale: 1.1, y: -10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                I'm
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
                        <div className={`text-xl md:text-3xl text-gray-500 font-handwriting mb-8 transition-all duration-300 p-4 rounded-2xl ${highlighted === 'desc' ? 'bg-blue-50/80 scale-[1.02] ring-4 ring-blue-500/10' : ''}`}>
                            <p>
                                I design digital products that are easy to use and look good. I focus on making things simple, clear, and enjoyable for people.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Side - Polaroid Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`relative w-full max-w-sm mx-auto transition-all duration-300 p-4 rounded-3xl ${highlighted === 'photo' ? 'bg-blue-50/80 scale-[1.02] ring-4 ring-blue-500/10' : ''}`}
                    >
                        {/* Yellow Sticky Note - Scaled for Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="absolute -top-6 left-6 md:-top-8 md:left-12 z-20 bg-yellow-300 p-3 md:p-4 rotate-6 shadow-lg"
                            style={{ width: '100px', height: '100px' }}
                        >
                            <p className="font-handwriting text-sm md:text-lg text-gray-800">
                                Make it<br />simple!
                            </p>
                        </motion.div>

                        {/* Polaroid Frame */}
                        <div className="relative bg-white p-4 pb-16 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden">
                                {/* Placeholder for photo - replace with actual image */}
                                <Image
                                    src="/images/hero-photo.jpg"
                                    alt="Himanshu's Photo"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    priority
                                />
                            </div>

                            {/* Polaroid Caption */}
                            <div className="absolute bottom-4 left-4 right-4 text-center">
                                <p className="font-handwriting text-gray-700 text-lg">me.jpeg</p>
                            </div>
                        </div>


                    </motion.div>
                </div>

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

                {/* Automated Ghost Cursor */}
                <motion.div
                    className="absolute z-50 pointer-events-none hidden md:block"
                    initial={{ left: "50%", top: "120%", opacity: 0 }}
                    animate={{
                        left: ["50%", "75%", "75%", "25%", "25%", "25%", "25%", "50%"],
                        top: ["120%", "40%", "40%", "30%", "30%", "55%", "55%", "120%"],
                        opacity: [0, 1, 1, 1, 1, 1, 1, 0]
                    }}
                    transition={{
                        duration: 10,
                        times: [0, 0.2, 0.35, 0.45, 0.6, 0.7, 0.85, 1],
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                    }}
                >
                    <div className="relative">
                        <svg
                            width="24"
                            height="36"
                            viewBox="0 0 24 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="drop-shadow-md"
                        >
                            <path
                                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19138L11.7841 12.3673H5.65376Z"
                                fill="#3B82F6"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </svg>
                        <div className="absolute left-3 top-3 bg-blue-500 px-2 py-1 rounded-md text-white text-xs font-bold shadow-sm whitespace-nowrap">
                            👀 ✨
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
