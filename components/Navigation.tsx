'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Navigation() {
    const [time, setTime] = useState("");
    const [timeGreeting, setTimeGreeting] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();

    // Sync navbar colors with same transition timing as TransitionBridge
    const navBgColor = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.65, 0.85, 1],
        ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.7)", "rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.7)"]
    );

    const textColor = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.65, 0.85, 1],
        ["#000000", "#000000", "#ffffff", "#ffffff", "#000000", "#000000"]
    );

    const borderColor = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.65, 0.85, 1],
        ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)"]
    );

    const buttonBg = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.65, 0.85, 1],
        ["#000000", "#000000", "#ffffff", "#ffffff", "#000000", "#000000"]
    );

    const buttonText = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.65, 0.85, 1],
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

    const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
    const [isHoveringButton, setIsHoveringButton] = useState(false);

    const buttonStyles = [
        {
            label: "CONTACT_NOW",
            className: "bg-black text-[#00ff00] border border-[#00ff00] font-mono tracking-widest text-[10px]",
            style: {}
        },
        {
            label: "START_MAIL",
            className: "bg-[#ffd700] text-black border-2 border-black font-black uppercase shadow-[3px_3px_0px_#000] text-[10px]",
            style: {}
        },
        {
            label: "Send Mail...",
            className: "bg-[#c0c0c0] text-blue-900 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] font-serif italic text-xs",
            style: { borderStyle: 'outset' }
        },
        {
            label: "CONTACT.EXE",
            className: "bg-[#2b002b] text-[#ff00ff] border border-[#ff00ff] font-bold shadow-[0_0_10px_#ff00ff] text-[10px] tracking-wide",
            style: { textShadow: '2px 0 #00ffff, -2px 0 #ff0000' }
        }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHoveringButton) {
            interval = setInterval(() => {
                setCurrentStyleIndex((prev) => (prev + 1) % buttonStyles.length);
            }, 400); // Fast cycle for a more intense, flicker-free glitch effect
        } else {
            setCurrentStyleIndex(0); // Reset to default when not hovering
        }
        return () => clearInterval(interval);
    }, [isHoveringButton]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hour = now.getHours();
            if (hour < 12) setTimeGreeting("Good Morning");
            else if (hour < 17) setTimeGreeting("Good Afternoon");
            else setTimeGreeting("Good Evening");

            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setTime(`${timeString} IST`);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleScrollTo = (id: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
            <motion.div
                style={{
                    backgroundColor: navBgColor,
                    borderColor: borderColor,
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
                        <motion.span style={{ color: textColor }} className="text-[10px] md:text-xs opacity-70 flex items-center gap-1 sm:gap-2" suppressHydrationWarning>
                            {time || "00:00 IST"} <span className="opacity-50">|</span> {timeGreeting}
                        </motion.span>
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
                        <div
                            className="hidden md:block w-[140px] h-10 relative flex items-center justify-center"
                            onMouseEnter={() => {
                                setIsHoveringButton(true);
                                setCurrentStyleIndex((prev) => (prev + 1) % buttonStyles.length);
                            }}
                            onMouseLeave={() => setIsHoveringButton(false)}
                        >
                            <motion.a
                                key={isHoveringButton ? currentStyleIndex : 'default'}
                                href="mailto:himanshupundir506@gmail.com"
                                animate={{ opacity: 1, scale: 1 }}
                                style={!isHoveringButton ? { backgroundColor: buttonBg, color: buttonText } : buttonStyles[currentStyleIndex].style}
                                className={`
                                    absolute inset-0 flex items-center justify-center transition-all duration-200 cursor-pointer
                                    ${!isHoveringButton
                                        ? "px-6 py-2 text-sm rounded-full font-medium"
                                        : `rounded-none ${buttonStyles[currentStyleIndex].className}`
                                    }
                                `}
                            >
                                {isHoveringButton ? buttonStyles[currentStyleIndex].label : "Get in Touch"}
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
                                        className="text-2xl font-bold tracking-tight py-2"
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                                <div
                                    className="mt-4 w-full h-16 relative flex items-center justify-center"
                                    onMouseEnter={() => {
                                        setIsHoveringButton(true);
                                        setCurrentStyleIndex((prev) => (prev + 1) % buttonStyles.length);
                                    }}
                                    onMouseLeave={() => setIsHoveringButton(false)}
                                >
                                    <motion.a
                                        key={isHoveringButton ? currentStyleIndex : 'mobile-default'}
                                        href="mailto:himanshupundir506@gmail.com"
                                        style={!isHoveringButton ? { backgroundColor: buttonBg, color: buttonText } : buttonStyles[currentStyleIndex].style}
                                        className={`
                                            absolute inset-0 flex items-center justify-center transition-none cursor-pointer
                                            ${!isHoveringButton
                                                ? "px-6 py-4 rounded-2xl font-bold text-lg"
                                                : `rounded-none ${buttonStyles[currentStyleIndex].className} text-xl`
                                            }
                                        `}
                                    >
                                        {isHoveringButton ? buttonStyles[currentStyleIndex].label : "Get in Touch"}
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
