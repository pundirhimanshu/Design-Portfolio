'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TransitionBridgeProps {
    children: ReactNode;
}

export default function TransitionBridge({ children }: TransitionBridgeProps) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Interpolate background color from white to black and back to white
    // This creates a smooth 'dip' into the cosmic section
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.15, 0.35, 0.65, 0.85, 1],
        ["#FFFFFF", "#FFFFFF", "#000000", "#000000", "#FFFFFF", "#FFFFFF"]
    );

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor }}
            className="relative"
        >
            {children}
        </motion.div>
    );
}
