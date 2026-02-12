'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();

    // Sync navbar colors with same transition timing as TransitionBridge
    const navBgColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        [
            "rgba(255, 255, 255, 0.85)",
            "rgba(255, 255, 255, 0.85)",
            "rgba(10, 10, 10, 0.85)",
            "rgba(10, 10, 10, 0.85)",
            "rgba(255, 255, 255, 0.85)",
            "rgba(255, 255, 255, 0.85)"
        ]
    );

    const textColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        ["#000000", "#000000", "#ffffff", "#ffffff", "#000000", "#000000"]
    );

    const borderColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        [
            "rgba(0, 0, 0, 0.08)",
            "rgba(0, 0, 0, 0.08)",
            "rgba(255, 255, 255, 0.15)",
            "rgba(255, 255, 255, 0.15)",
            "rgba(0, 0, 0, 0.08)",
            "rgba(0, 0, 0, 0.08)"
        ]
    );

    const navShadow = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        [
            "0 4px 20px -2px rgba(0,0,0,0.05)",
            "0 4px 20px -2px rgba(0,0,0,0.05)",
            "0 4px 30px -2px rgba(0,0,0,0.3)",
            "0 4px 30px -2px rgba(0,0,0,0.3)",
            "0 15px 40px -10px rgba(0,0,0,0.1)",
            "0 15px 40px -10px rgba(0,0,0,0.15)"
        ]
    );

    const buttonBg = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        ["#000000", "#000000", "#ffffff", "#ffffff", "#000000", "#000000"]
    );

    const buttonText = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        ["#ffffff", "#ffffff", "#000000", "#000000", "#ffffff", "#ffffff"]
    );

    const logoNames = ["Himanshu Pundir", "हिमांशु पुंडीर"];
    const [currentNameIndex, setCurrentNameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNameIndex((prev) => (prev + 1) % logoNames.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const navWidth = useTransform(scrollYProgress, [0, 0.05], ["100%", "90%"]);

    const handleScrollTo = (id: string) => {
        setIsMenuOpen(false);
        // Small timeout to allow menu close animation to start/layout to stabilize
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[60] pt-6 px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
            <motion.div
                style={{
                    backgroundColor: navBgColor,
                    borderColor: borderColor,
                    boxShadow: navShadow,
                    width: navWidth
                }}
                className={`backdrop-blur-md border rounded-3xl md:rounded-full shadow-lg px-6 py-3 pointer-events-auto transition-all duration-300 mx-auto ${isMenuOpen ? 'rounded-[2rem]' : ''}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-6 -ml-4">
                        <div className="h-10 overflow-hidden flex items-center min-w-[150px] md:min-w-[220px]">
                            <AnimatePresence mode="wait">
                                <motion.a
                                    key={currentNameIndex}
                                    href="#hero"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleScrollTo('hero');
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ color: textColor }}
                                    className={`font-handwriting cursor-pointer transition-transform hover:scale-105 whitespace-nowrap ${currentNameIndex === 1
                                        ? "text-xl md:text-2xl"
                                        : "text-2xl md:text-3xl"
                                        }`}
                                >
                                    {logoNames[currentNameIndex]}
                                </motion.a>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Center - Menu Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        {['About', 'Thoughts', 'Work', 'Resume'].map((item) => (
                            <motion.a
                                key={item}
                                href={item === 'Resume' ? '#' : `#${item.toLowerCase()}`}
                                onClick={(e) => {
                                    if (item !== 'Resume') {
                                        e.preventDefault();
                                        handleScrollTo(item.toLowerCase());
                                    }
                                }}
                                style={{ color: textColor }}
                                className="text-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer font-medium"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block w-fit">
                            <motion.a
                                href="mailto:himanshupundir506@gmail.com"
                                style={{
                                    backgroundColor: buttonBg,
                                    color: buttonText
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 text-sm rounded-full font-medium flex items-center justify-center transition-all duration-200 cursor-pointer whitespace-nowrap"
                            >
                                Get in Touch
                            </motion.a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ color: textColor }}
                            className="md:hidden p-2 flex flex-col gap-1.5 items-center justify-center w-10 h-10"
                        >
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="w-6 h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-current rounded-full"
                            />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden md:hidden"
                        >
                            <div className="flex flex-col gap-4 py-6 mt-4 border-t border-white/10">
                                {['About', 'Thoughts', 'Work', 'Resume'].map((item, index) => (
                                    <motion.a
                                        key={item}
                                        href={item === 'Resume' ? '#' : `#${item.toLowerCase()}`}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 * (index + 1) }}
                                        onClick={(e) => {
                                            if (item !== 'Resume') {
                                                e.preventDefault();
                                                handleScrollTo(item.toLowerCase());
                                            } else {
                                                setIsMenuOpen(false);
                                            }
                                        }}
                                        style={{ color: textColor }}
                                        className="text-2xl font-bold tracking-tight py-2 block w-full"
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                                <div className="mt-4 w-full">
                                    <motion.a
                                        href="mailto:himanshupundir506@gmail.com"
                                        style={{
                                            backgroundColor: buttonBg,
                                            color: buttonText
                                        }}
                                        className="px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center cursor-pointer"
                                    >
                                        Get in Touch
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </nav>
    );
}
