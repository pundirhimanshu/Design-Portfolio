"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for fluid movement
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Use event delegation for hover states to be much more efficient
        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, input, textarea, [role='button']")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        window.addEventListener("mouseover", handleOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // Define the cursor color - similar to Figma's red 'You' cursor
    const cursorColor = "#E04F47";

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99999]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="relative">
                {/* SVG Arrow Cursor */}
                <svg
                    width="24"
                    height="36"
                    viewBox="0 0 24 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-sm"
                >
                    <path
                        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19138L11.7841 12.3673H5.65376Z"
                        fill={cursorColor}
                        stroke="white"
                        strokeWidth="1"
                    />
                </svg>

                {/* 'You' Label Container */}
                <motion.div
                    className="absolute left-3 top-3 px-2 py-1 rounded-md text-white text-xs font-bold shadow-sm"
                    style={{
                        backgroundColor: cursorColor,
                    }}
                    animate={{
                        scale: isHovering ? 1.1 : 1,
                    }}
                >
                    You
                </motion.div>
            </div>
        </motion.div>
    );
}
