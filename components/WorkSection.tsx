'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SpaceButton from './SpaceButton';

const projects = [
    {
        id: "01",
        title: "Design an in-app campaign for Zomato centered around the nine days of Navratri.",
        image: "/images/Project 1.png",
        color: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        bgColor: "#006437" // Dark green for button
    },
    {
        id: "02",
        title: "Crafted in-app campaign experiences for Zomato, EazyDiner, and Paytm.",
        image: "/images/Project 2.png",
        color: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        bgColor: "#006437"
    }
];

export default function WorkSection() {
    return (
        <section id="work" className="py-10 md:py-20 bg-white relative overflow-hidden">
            {/* Background Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-none text-black">
                    CASE<br />STUDY
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-4 mb-20 md:mb-32"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-black/40 uppercase">Selected Work</h2>
                </motion.div>

                {/* Projects Column */}
                <div className="flex flex-col gap-40 md:gap-64">
                    {projects.map((project, index) => (
                        <div key={project.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 md:gap-24`}>

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 max-w-md text-center md:text-left"
                            >
                                <span className="text-4xl md:text-6xl font-black text-black mb-4 block">
                                    #{project.id}
                                </span>
                                <h3 className="font-handwriting text-3xl md:text-5xl text-gray-500 mb-8 leading-relaxed font-normal">
                                    {project.title}
                                </h3>
                                <div className="mt-8">
                                    <SpaceButton />
                                </div>
                            </motion.div>

                            {/* Image Mockup */}
                            <motion.div
                                initial={{ opacity: 0, rotate: index % 2 === 0 ? 10 : -10, scale: 0.9 }}
                                whileInView={{ opacity: 1, rotate: index % 2 === 0 ? -2 : 2, scale: 1.1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="flex-1 relative aspect-[4/3] w-full max-w-2xl group"
                            >
                                <div className="absolute inset-0 bg-transparent rounded-[3.5rem] overflow-visible">
                                    <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-[1.02]">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-contain filter brightness-[1.02] drop-shadow-xl"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle Texture/Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1]">
                <svg width="100%" height="100%">
                    <pattern id="grid-pattern-work" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="black" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-work)" />
                </svg>
            </div>
        </section>
    );
}

