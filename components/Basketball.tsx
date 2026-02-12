'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BasketballProps {
    containerRef: React.RefObject<HTMLDivElement>;
    netRef: React.RefObject<HTMLDivElement>;
    onSwish?: () => void;
}

export default function Basketball({ containerRef, netRef, onSwish }: BasketballProps) {
    const x = useMotionValue(-200);
    const y = useMotionValue(300);
    const rotate = useMotionValue(0);
    const scaleY = useMotionValue(1);
    const scaleX = useMotionValue(1);
    const ballZIndex = useMotionValue(50);

    const velocity = useRef({ x: 12, y: -4 });
    const isDragging = useRef(false);
    const requestRef = useRef<number>();
    const lastCelebration = useRef<number>(0);
    const [isGoal, setIsGoal] = useState(false);

    const ballSize = 320;
    const bounce = 0.8;
    const friction = 0.995;
    const floatingStrength = 0.15; // Gentle upward force to keep it "floating"

    const playCelebration = () => {
        const now = Date.now();
        if (now - lastCelebration.current < 2000) return; // Cooldown

        lastCelebration.current = now;
        setIsGoal(true);
        if (onSwish) onSwish();
        setTimeout(() => setIsGoal(false), 2000);

        // Play sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2012/2012-preview.mp3'); // Basketball swish sound
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play blocked", e));

        // Cheer sound
        const cheer = new Audio('https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3'); // Small cheer/celebration
        cheer.volume = 0.3;
        setTimeout(() => cheer.play().catch(e => { }), 100);
    };

    const update = () => {
        if (!isDragging.current && containerRef.current) {
            const container = containerRef.current.getBoundingClientRect();

            let currentX = x.get();
            let currentY = y.get();
            let velX = velocity.current.x;
            let velY = velocity.current.y;

            // Light gravity
            velY += 0.2;

            // Floating cushion at the bottom
            if (currentY > container.height * 0.7) {
                velY -= floatingStrength;
            }

            currentX += velX;
            currentY += velY;

            // Boundaries
            if (currentY >= container.height - ballSize) {
                currentY = container.height - ballSize;
                velY = -Math.abs(velY) * bounce;
                // Add some squash on impact
                scaleY.set(0.8);
                scaleX.set(1.2);
                setTimeout(() => { scaleY.set(1); scaleX.set(1); }, 150);
            } else if (currentY <= 0) {
                currentY = 0;
                velY = Math.abs(velY) * bounce;
            }

            if (currentX >= container.width - ballSize) {
                currentX = container.width - ballSize;
                velX = -Math.abs(velX) * bounce;
            } else if (currentX <= 0) {
                currentX = 0;
                velX = Math.abs(velX) * bounce;
            }

            // Detection for Net
            if (netRef.current) {
                const netRect = netRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();

                const netX = netRect.left - containerRect.left;
                const netY = netRect.top - containerRect.top;

                const ballCenterX = currentX + ballSize / 2;
                const ballCenterY = currentY + ballSize / 2;

                // Rim Collision Logic (The top edge of the hoop)
                const rimY = netY + 20;
                const leftRimX = netX + 40;
                const rightRimX = netX + netRect.width - 40;

                // Bottom of the ball hitting the rim
                const ballBottomY = currentY + ballSize;

                // If ball hits left rim
                if (Math.abs(ballCenterX - leftRimX) < 40 && Math.abs(currentY + ballSize - rimY) < 30) {
                    velY = -Math.abs(velY) * 0.6;
                    velX = -Math.abs(velX) * 0.8;
                }
                // If ball hits right rim
                if (Math.abs(ballCenterX - rightRimX) < 40 && Math.abs(currentY + ballSize - rimY) < 30) {
                    velY = -Math.abs(velY) * 0.6;
                    velX = Math.abs(velX) * 0.8;
                }

                // Swish Detection (Center area)
                const withinX = ballCenterX > netX + 60 && ballCenterX < netX + netRect.width - 60;
                const withinY = ballCenterY > netY && ballCenterY < netY + 150;

                if (withinX && withinY) {
                    ballZIndex.set(15);
                    // Net resistance: slow down the ball as it passes through
                    velX *= 0.95;
                    velY *= 0.95;

                    if (Math.abs(velY) > 0.5 && !isGoal) {
                        playCelebration();
                    }
                } else {
                    ballZIndex.set(50);
                }
            }

            velX *= friction;
            velY *= friction;

            rotate.set(rotate.get() + velX * 1.5);

            x.set(currentX);
            y.set(currentY);
            velocity.current = { x: velX, y: velY };
        }
        requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            y.set(containerRef.current.clientHeight * 0.4);
            x.set(containerRef.current.clientWidth * 0.2);
        }
    }, [containerRef]);

    return (
        <>
            <motion.div
                drag
                dragMomentum={false}
                onDragStart={() => {
                    isDragging.current = true;
                    ballZIndex.set(50);
                    scaleX.set(1.05);
                    scaleY.set(1.05);
                }}
                onDragEnd={(_, info) => {
                    isDragging.current = false;
                    scaleX.set(1);
                    scaleY.set(1);
                    velocity.current = {
                        x: info.velocity.x * 0.04,
                        y: info.velocity.y * 0.04
                    };
                }}
                style={{
                    x,
                    y,
                    rotate,
                    scaleX,
                    scaleY,
                    position: 'absolute',
                    zIndex: ballZIndex,
                    cursor: 'grab',
                    width: ballSize,
                    height: ballSize,
                    touchAction: 'none',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none'
                }}
                whileTap={{ cursor: 'grabbing' }}
            >
                <div className="relative w-full h-full outline-none group">
                    <Image
                        src="/images/Basketball.png"
                        alt="Basketball"
                        fill
                        className="select-none pointer-events-none object-contain transition-transform duration-300"
                        priority
                    />
                    {/* Inner glow effect when dragging */}
                    <div className="absolute inset-0 rounded-full bg-orange-500/10 opacity-0 group-active:opacity-100 transition-opacity blur-xl" />
                </div>
            </motion.div>

            {/* Goal feedback */}
            <AnimatePresence>
                {isGoal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 0, rotate: -10 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1.5, 1.2, 1],
                            y: -200,
                            rotate: [-10, 5, -5, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-none z-[100] flex flex-col items-center"
                    >
                        <h2 className="text-7xl md:text-9xl font-black text-orange-500 italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                            SWISH!
                        </h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-4xl mt-4"
                        >
                            🏀🔥💎
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
