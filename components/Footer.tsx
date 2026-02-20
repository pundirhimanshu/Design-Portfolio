'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';


const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/himanshu-pundir-8860ba198?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Instagram', url: 'https://www.instagram.com/rajput_himanshu_pundir?igsh=Z3I1NGdwMm1kYmQ3' },
    { name: 'Email', url: 'mailto:himanshupundir506@gmail.com' },
    { name: 'Phone', url: 'tel:8532871802' },
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

export default function Footer() {
    const [stars, setStars] = useState<{ top: string, left: string }[]>([]);

    useEffect(() => {
        setStars([...Array(100)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        })));
    }, []);

    return (
        <footer
            className="relative bg-black flex flex-col overflow-hidden py-24 px-8 md:px-16 text-white cursor-default"
        >
            {/* Cosmic Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep Nebula Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,25,1)_0%,rgba(0,0,0,1)_80%)]" />

                {/* Stars */}
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

                {/* Shooting Stars */}
                {stars.length > 0 && [...Array(3)].map((_, i) => <ShootingStarDirectional key={`shooting-${i}`} />)}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">

                {/* Text & Links */}
                <div className="flex flex-col gap-20">
                    {/* Top Section - Heading */}
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
                            Let&apos;s connect and chat about{' '}
                            <span className="font-serif italic font-light">design & product</span>
                        </h2>
                    </div>

                    {/* Bottom Section - Links & Copyright */}
                    <div className="flex flex-col gap-12">
                        {/* Social Links Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-2xl">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="group flex items-center justify-between border-b border-white/20 pb-3 text-xl md:text-2xl hover:text-white/80 transition-colors flex"
                                    whileHover={{ x: 10 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span>{link.name}</span>
                                    <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">↗</span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <div className="text-left text-sm md:text-base text-gray-400 font-light tracking-wide mt-8">

                        </div>
                    </div>
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
        </footer>
    );
}
