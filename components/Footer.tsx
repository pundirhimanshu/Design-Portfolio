'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Wallet Component
const Wallet = ({ openCard, setOpenCard }: { openCard: string | null, setOpenCard: (id: string | null) => void }) => {
    const [emailCopied, setEmailCopied] = useState(false);
    const [phoneCopied, setPhoneCopied] = useState(false);

    // Initialize sound effect with a more reliable URL
    const playCardSound = () => {
        if (typeof window !== 'undefined') {
            try {
                // Using a high-availability URL for card-like mechanical click
                const audio = new Audio('https://www.soundjay.com/buttons/button-37.mp3');
                audio.crossOrigin = 'anonymous';
                audio.volume = 0.5;
                audio.play().catch(err => {
                    console.warn('Sound play blocked or failed:', err);
                    // Fallback to second source if first fails
                    const fallback = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
                    fallback.volume = 0.4;
                    fallback.play().catch(() => { });
                });
            } catch (e) {
                console.log('Audio init failed:', e);
            }
        }
    };

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText('himanshupundir506@gmail.com');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    const handleCopyPhone = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText('8532871802');
        setPhoneCopied(true);
        setTimeout(() => setPhoneCopied(false), 2000);
    };

    const cards = [
        {
            id: 'mail',
            title: 'Mail',
            color: 'bg-white',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            )
        },
        {
            id: 'contact',
            title: 'Contact',
            color: 'bg-white',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
    ];

    return (
        <div
            className="relative w-[300px] h-full flex items-end justify-center perspective-1000"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Phone Card (Behind) */}
            <motion.div
                layoutId="wallet-phone"
                onClick={(e) => {
                    e.stopPropagation();
                    const nextCard = openCard === 'wallet-phone' ? null : 'wallet-phone';
                    setOpenCard(nextCard);
                    playCardSound();
                }}
                className="absolute w-[240px] cursor-pointer"
                style={{
                    zIndex: openCard === 'wallet-phone' ? 100 : 25,
                    bottom: '116px' // Between network and email
                }}
                animate={{
                    y: openCard === 'wallet-phone' ? -14 : 0,
                    scale: openCard === 'wallet-phone' ? 1.3 : 1,
                }}
                whileHover={{
                    y: openCard === 'wallet-phone' ? -50 : -30,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                <div className="relative group overflow-hidden rounded-xl">
                    <img
                        src="/images/Wallet%20Inside%20image.png"
                        alt="Phone Contact"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />

                    {/* Persistent Phone Icon */}
                    <div className="absolute left-6 top-1 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>

                    {/* Phone Overlay */}
                    <AnimatePresence>
                        {openCard === 'wallet-phone' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-x-0 bottom-20 flex flex-col items-center gap-3 pointer-events-none translate-y-36"
                            >
                                <span className="text-sm font-semibold text-black tracking-tight pointer-events-auto">
                                    8532871802
                                </span>

                                <button
                                    onClick={handleCopyPhone}
                                    className="bg-black text-white px-5 py-2 rounded-full font-medium text-[10px] hover:scale-105 transition-transform active:scale-95 pointer-events-auto shadow-md"
                                >
                                    {phoneCopied ? 'Copied!' : 'Copy'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
            {/* Wallet Inside Image (Main Card) */}
            <motion.div
                layoutId="wallet-inside"
                onClick={(e) => {
                    e.stopPropagation();
                    const nextCard = openCard === 'wallet-inside' ? null : 'wallet-inside';
                    setOpenCard(nextCard);
                    playCardSound();
                }}
                className="absolute w-[240px] cursor-pointer"
                style={{
                    zIndex: openCard === 'wallet-inside' ? 100 : 30,
                    bottom: '80px'
                }}
                animate={{
                    y: openCard === 'wallet-inside' ? -50 : 0,
                    scale: openCard === 'wallet-inside' ? 1.3 : 1,
                }}
                whileHover={{
                    y: openCard === 'wallet-inside' ? -50 : -30,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                <div className="relative group overflow-hidden rounded-xl">
                    <img
                        src="/images/Wallet%20Inside%20image.png"
                        alt="Wallet Contents"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />

                    {/* Persistent Email Icon */}
                    <div className="absolute left-6 top-1 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    {/* Email Overlay - Reference Style */}
                    <AnimatePresence>
                        {openCard === 'wallet-inside' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-x-0 bottom-20 flex flex-col items-center gap-3 pointer-events-none translate-y-36"
                            >
                                <span className="text-sm font-semibold text-black tracking-tight pointer-events-auto">
                                    himanshupundir506@gmail.com
                                </span>

                                <button
                                    onClick={handleCopyEmail}
                                    className="bg-black text-white px-5 py-2 rounded-full font-medium text-[10px] hover:scale-105 transition-transform active:scale-95 pointer-events-auto shadow-md"
                                >
                                    {emailCopied ? 'Copied!' : 'Copy'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Cards Wrapper */}
            <div className="absolute bottom-0 w-full h-[300px] flex items-end justify-center z-10">
                {cards.map((card, index) => {
                    const isOpen = openCard === card.id;
                    return (
                        <motion.div
                            key={card.id}
                            layoutId={card.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenCard(isOpen ? null : card.id);
                            }}
                            className={`absolute w-[240px] h-[140px] rounded-2xl shadow-xl border border-gray-100 cursor-pointer flex items-center p-5 gap-4
                                ${card.color} text-black transform-gpu
                            `}
                            style={{
                                zIndex: isOpen ? 50 : (index + 2) * 10, // Higher than wallet inside but behind wallet front if not open
                                bottom: '60px',
                            }}
                            initial={false}
                            animate={{
                                y: isOpen ? -280 : -10 - ((cards.length - 1 - index) * 35),
                                scale: isOpen ? 1 : 0.95 - ((cards.length - 1 - index) * 0.05),
                            }}
                            whileHover={{
                                y: isOpen ? -280 : -40 - ((cards.length - 1 - index) * 35),
                            }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                            <div className="p-2 bg-black/5 rounded-full">{card.icon}</div>
                            <span className="text-lg font-bold">{card.title}</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Wallet Image - Foreground */}
            <div className="relative z-40 pointer-events-none mb-4">
                <img src="/images/Wallet.png" alt="Wallet" className="w-[300px] object-contain drop-shadow-2xl" />
            </div>
        </div>
    );
};

export default function Footer() {
    const [stars, setStars] = useState<{ top: string, left: string }[]>([]);
    const [openCard, setOpenCard] = useState<string | null>(null);

    useEffect(() => {
        setStars([...Array(100)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        })));
    }, []);

    return (
        <footer
            className="relative bg-black flex flex-col overflow-hidden py-24 px-8 md:px-16 text-white cursor-default"
            onClick={() => setOpenCard(null)}
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
            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Column - Text & Links */}
                <div className="flex flex-col gap-20">
                    {/* Top Section - Heading */}
                    <div className="max-w-xl">


                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
                            Let's connect and chat about{' '}
                            <span className="font-serif italic font-light">design & product</span>
                        </h2>
                    </div>

                    {/* Bottom Section - Links & Copyright */}
                    <div className="flex flex-col gap-12">
                        {/* Social Links Grid */}
                        <div className="flex flex-col gap-8 max-w-2xl">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`group flex items-center justify-between border-b border-white/20 pb-3 text-xl md:text-2xl hover:text-white/80 transition-colors ${(link.name === 'Email' || link.name === 'Phone') ? 'lg:hidden' : 'flex'
                                        }`}
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
                            © 2025 Himanshu. All right reserved.
                        </div>
                    </div>
                </div>

                {/* Interactive Wallet Component */}
                <motion.div
                    className="relative w-full hidden lg:flex items-center justify-center lg:justify-end h-[420px]"
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Wallet openCard={openCard} setOpenCard={setOpenCard} />
                </motion.div>
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
