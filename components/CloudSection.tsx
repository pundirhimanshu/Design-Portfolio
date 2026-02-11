'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { DotLottiePlayer } from '@dotlottie/react-player';

export default function CloudSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id="process"
            ref={containerRef}
            className="relative py-12 md:py-24 min-h-[500px] md:min-h-[700px] w-full overflow-hidden flex items-center justify-center bg-white"
        >

            {/* Pronounced White Emergence - Stronger Blend */}
            <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[60vh] bg-gradient-to-b from-white via-white via-white/80 to-transparent pointer-events-none z-20" />

            <motion.div
                style={{ opacity }}
                className="relative w-full h-full max-w-[1800px] px-4 md:px-8"
            >
                <div className="relative w-full h-[60vh] md:h-[85vh] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden mt-16 md:mt-32">
                    <motion.div
                        style={{ y, scale }}
                        className="absolute inset-0 z-10"
                    >
                        <Image
                            src="/images/Cloud.avif"
                            alt="Cloud Detail"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Lottie Animation Accent - Responsive Size */}
                    <div className="absolute top-0 left-0 w-full h-full z-20 opacity-80 pointer-events-none scale-[1.2] md:scale-150 transform">
                        <DotLottiePlayer
                            src="https://lottie.host/31bb8616-0aea-4f0f-afc7-317448d2f76d/VAhwVDSoLx.lottie"
                            autoplay
                            loop
                        />
                    </div>

                    {/* Premium Typographic Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8 z-30">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-3xl md:text-7xl font-bold text-black tracking-tight mb-4 md:mb-6 leading-[1.1]">
                                I iterated on the concept, <br className="hidden md:block" />
                                <span className="text-black/60">eliminating friction</span>
                            </h2>
                            <p className="font-handwriting text-2xl md:text-5xl text-black/80 italic">
                                and aligning it with a more focused, <br className="hidden md:block" />
                                user-centered direction.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
