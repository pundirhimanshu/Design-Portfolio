'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HangingDecoration from './HangingDecoration';

const initialImages = [
    { id: 1, src: '/images/at-home.jpg', alt: 'At home', rotate: 2, caption: 'At home' },
    { id: 2, src: '/images/gym-boii.jpg', alt: 'Gym boii', rotate: -2, caption: 'Gym Boii' },
    { id: 3, src: '/images/hero-photo.jpg', alt: 'Selfie with mirror', rotate: 4, caption: 'Selfie with mirror' },
];

export default function AboutSection() {
    const [images, setImages] = useState(initialImages);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const fullText = "My journey into product design began during my third year of BCA when I was exploring career transitions and came across a video by Ansh Mehra about design. That video sparked my curiosity and introduced me to the world of product design. As I explored the field further, I realized that design aligned more closely with my strengths and long-term aspirations. I made the intentional decision to shift from a coding-focused career path to product design, driven by the desire to solve meaningful problems through structure, creativity, and systems thinking. Since then, I’ve approached every project with a systems mindset — thinking in flows, mapping user journeys, and prioritizing user needs before implementing solutions. For me, design goes beyond visuals; it’s about building thoughtful, scalable experiences that create real impact.";

    const toggleSpeech = () => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                const utterance = new SpeechSynthesisUtterance(fullText);

                // Try to find an Indian English voice
                const voices = window.speechSynthesis.getVoices();
                const indianVoice = voices.find(voice => voice.lang === 'en-IN' || voice.lang.includes('IN'));
                if (indianVoice) {
                    utterance.voice = indianVoice;
                }

                utterance.onend = () => setIsSpeaking(false);
                utterance.rate = 0.9; // Slightly slower for better clarity
                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setImages(prevImages => {
                const newImages = [...prevImages];
                // Fisher-Yates shuffle
                for (let i = newImages.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newImages[i], newImages[j]] = [newImages[j], newImages[i]];
                }
                return newImages;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="py-24 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">About</h2>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto mb-24 space-y-8 text-lg md:text-xl leading-relaxed text-gray-800 relative">
                    {/* Audio Button */}
                    <motion.button
                        onClick={toggleSpeech}
                        className={`absolute -top-12 left-0 p-2 rounded-full transition-colors ${isSpeaking ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={isSpeaking ? "Stop reading" : "Read aloud"}
                    >
                        {isSpeaking ? (
                            <div className="flex gap-1 px-1 h-4 items-center">
                                <motion.div
                                    className="w-1 bg-white rounded-full"
                                    animate={{ height: [4, 12, 4] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                />
                                <motion.div
                                    className="w-1 bg-white rounded-full"
                                    animate={{ height: [4, 16, 4] }}
                                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                                />
                                <motion.div
                                    className="w-1 bg-white rounded-full"
                                    animate={{ height: [4, 10, 4] }}
                                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                                />
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                        )}
                    </motion.button>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        My journey into product design began during my third year of BCA when I was exploring career transitions and came across a video by <span className="bg-yellow-200 px-1 rounded hover:bg-yellow-300 transition-colors cursor-pointer">Ansh Mehra</span> about design. That video sparked my curiosity and introduced me to the world of <span className="bg-yellow-200 px-1 rounded hover:bg-yellow-300 transition-colors cursor-pointer">product design</span>.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        As I explored the field further, I realized that design aligned more closely with my strengths and long-term aspirations. I made the intentional decision to shift from a coding-focused career path to product design, driven by the desire to solve meaningful problems through structure, creativity, and systems thinking.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Since then, I’ve approached every project with a <span className="bg-yellow-200 px-1 rounded hover:bg-yellow-300 transition-colors cursor-pointer">systems mindset</span> — thinking in flows, mapping user journeys, and prioritizing user needs before implementing solutions. For me, design goes beyond visuals; it’s about building thoughtful, scalable experiences that create real impact.
                    </motion.p>
                </div>

                {/* Decoration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-6xl mx-auto mb-16 flex flex-col items-center"
                >
                    <div className="flex flex-col items-center justify-center -mb-12 md:-mb-24 relative z-10">
                        <p className="font-handwriting text-4xl md:text-6xl text-rose-500 -mb-2 md:-mb-4 rotate-[-6deg] z-10">Enjoy</p>
                        <p className="text-4xl md:text-6xl font-black text-black tracking-tight uppercase">EVERY MOMENT</p>
                    </div>
                    <div className="relative w-full h-[180px] md:h-[320px]">
                        <HangingDecoration />
                    </div>
                </motion.div>

                {/* Image Grid */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {images.map((img) => (
                            <motion.div
                                layout
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, layout: { duration: 0.8, type: "spring" } }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="relative aspect-[3/4] bg-white p-3 pb-16 shadow-xl"
                                style={{ rotate: img.rotate }}
                            >
                                <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>

                                {/* Caption */}
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <p className="font-handwriting text-gray-700 text-xl">{img.caption}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Liquid Blend Bridge - Fades into Cosmic Section */}
            <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-transparent via-black/5 to-black pointer-events-none z-10" />
        </section>
    );
}
