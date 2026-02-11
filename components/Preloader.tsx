'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Inspiration", "Conceptualize", "Design", "Craft", "Experience"];

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        const duration = 3000; // Snappier 3-second total duration
        const startTime = Date.now();

        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);

            // Sync word change with progress
            const wordIdx = Math.min(
                Math.floor((progress / 100) * words.length),
                words.length - 1
            );
            setCurrentWordIndex(wordIdx);

            if (progress >= 100) {
                setCount(100);
                clearInterval(timer);

                // Play professional "Welcome to my portfolio" using high-quality Speech Synthesis
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    const playWelcome = () => {
                        // Cancel any ongoing speech first
                        window.speechSynthesis.cancel();

                        const utterance = new SpeechSynthesisUtterance("Welcome to my portfolio");

                        // Try to find a high-quality male voice
                        const voices = window.speechSynthesis.getVoices();
                        // Priority voices: Google UK English Male, Microsoft David, etc.
                        const preferredVoice = voices.find(voice =>
                        (voice.name.includes('Google UK English Male') ||
                            voice.name.includes('Microsoft David') ||
                            (voice.name.includes('Male') && voice.lang.includes('en')))
                        );

                        if (preferredVoice) utterance.voice = preferredVoice;
                        utterance.rate = 0.9; // Slightly slower for more impact
                        utterance.pitch = 1.0;
                        utterance.volume = 0.8;

                        window.speechSynthesis.speak(utterance);
                    };

                    // Some browsers need a slight delay or voices to load
                    if (window.speechSynthesis.getVoices().length === 0) {
                        window.speechSynthesis.onvoiceschanged = () => playWelcome();
                    } else {
                        playWelcome();
                    }
                }

                // Start exit sequence
                setTimeout(() => {
                    setIsLoading(false);
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 500);
                }, 400);
            } else {
                setCount(Math.round(progress));
            }
        }, 16);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = '';
            // Cancel speech on unmount/reload to prevent overlap
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Placeholder for SSR to keep layout consistent but avoid logic run
    if (!mounted) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111] text-[#EAEAEA]">
                {/* Background Noise Texture for consistency */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 invert" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* Placeholder for Rotating Creative Words to prevent layout shift */}
                    <div className="h-24 mb-8" />

                    <h1 className="text-8xl md:text-[12rem] font-bold leading-none tracking-tighter">0%</h1>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111] text-[#EAEAEA]"
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        borderBottomLeftRadius: '100%',
                        borderBottomRightRadius: '100%',
                        transition: {
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1]
                        }
                    }}
                >
                    {/* Background Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 invert" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Rotating Creative Words */}
                        <div className="h-24 overflow-hidden mb-8">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentWordIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-handwriting text-4xl md:text-6xl text-gray-400 font-normal tracking-wide"
                                >
                                    {words[currentWordIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Main Counter */}
                        <div className="relative">
                            <motion.h1
                                className="text-8xl md:text-[12rem] font-bold leading-none tracking-tighter"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                suppressHydrationWarning
                            >
                                {count}%
                            </motion.h1>

                            {/* Decorative Line */}
                            <motion.div
                                className="absolute -bottom-4 left-0 h-[2px] bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: `${count}%` }}
                                transition={{ ease: "linear", duration: 0.1 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
