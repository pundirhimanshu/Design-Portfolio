'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Flappy Bird Game Constants ---
const GRAVITY = 0.45; // Reduced from 0.6 for smoother fall
const JUMP_STRENGTH = -7; // Adjusted for better control
const PIPE_SPEED = 3.2; // Slightly slower for easier play
const PIPE_SPAWN_RATE = 1500; // ms
const BIRD_SIZE = 34;
const PIPE_WIDTH = 50;
const GAP_SIZE = 140;

interface Pipe {
    id: number;
    x: number;
    topHeight: number;
}

const FlappyBird = ({ isPlaying, onGameOver, onStart }: { isPlaying: boolean, onGameOver: (score: number) => void, onStart: () => void }) => {
    const [birdY, setBirdY] = useState(150);
    const [velocity, setVelocity] = useState(0);
    const [pipes, setPipes] = useState<Pipe[]>([]);
    const [score, setScore] = useState(0);
    const gameLoopRef = useRef<number>();
    const lastPipeSpawnRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const jump = useCallback(() => {
        if (!isPlaying) return;
        setVelocity(JUMP_STRENGTH);
        // Sound effect
        const jumpSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        jumpSound.volume = 0.2;
        jumpSound.play().catch(() => { });
    }, [isPlaying]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                jump();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [jump]);

    useEffect(() => {
        if (!isPlaying) {
            setPipes([]);
            setBirdY(150);
            setVelocity(0);
            setScore(0);
            return;
        }

        const update = (time: number) => {
            if (!containerRef.current) return;
            const containerHeight = containerRef.current.clientHeight;

            // Update Bird
            setBirdY((prevY) => {
                const newY = prevY + velocity;
                const nextVel = velocity + GRAVITY;
                setVelocity(nextVel);

                // Collision with floor/ceiling
                if (newY <= 0 || newY >= containerHeight - BIRD_SIZE) {
                    onGameOver(score);
                }
                return newY;
            });

            // Spawn Pipes
            if (time - lastPipeSpawnRef.current > PIPE_SPAWN_RATE) {
                const minPipeHeight = 50;
                const maxPipeHeight = containerHeight - GAP_SIZE - minPipeHeight;
                const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

                setPipes((prev) => [
                    ...prev,
                    { id: Date.now(), x: containerRef.current!.clientWidth, topHeight }
                ]);
                lastPipeSpawnRef.current = time;
            }

            // Update Pipes
            setPipes((prevPipes) => {
                const nextPipes = prevPipes
                    .map(p => ({ ...p, x: p.x - PIPE_SPEED }))
                    .filter(p => p.x + PIPE_WIDTH > 0);

                // Score detection & Collision
                nextPipes.forEach(pipe => {
                    // Check collision
                    const birdX = 50; // Fixed X position for bird
                    const birdXEnd = birdX + BIRD_SIZE;
                    const birdYEnd = birdY + BIRD_SIZE;

                    if (
                        birdXEnd > pipe.x &&
                        birdX < pipe.x + PIPE_WIDTH &&
                        (birdY < pipe.topHeight || birdYEnd > pipe.topHeight + GAP_SIZE)
                    ) {
                        onGameOver(score);
                    }

                    // Check score
                    if (!pipe.hasOwnProperty('passed') && birdX > pipe.x + PIPE_WIDTH) {
                        setScore(s => s + 1);
                        (pipe as any).passed = true;
                    }
                });

                return nextPipes;
            });

            gameLoopRef.current = requestAnimationFrame(update);
        };

        gameLoopRef.current = requestAnimationFrame(update);
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [isPlaying, velocity, birdY, score, onGameOver]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-[#fce4ec] overflow-hidden cursor-pointer"
            onClick={() => {
                if (!isPlaying) {
                    onStart();
                } else {
                    jump();
                }
            }}
        >
            {/* Background Clouds/Mountains decor */}
            <div className="absolute bottom-0 w-full h-12 bg-[#8bc34a] border-t-4 border-[#689f38]" />

            <motion.div
                className="absolute left-[50px] z-20 flex items-center justify-center text-3xl select-none"
                style={{
                    top: birdY,
                    width: BIRD_SIZE,
                    height: BIRD_SIZE,
                    rotate: velocity * 3, // More dynamic rotation
                    scaleX: -1 // Flip the emoji to face right
                }}
            >
                🐤
            </motion.div>

            {/* Pipes */}
            {pipes.map((pipe) => (
                <div key={pipe.id}>
                    {/* Top Pipe */}
                    <div
                        className="absolute bg-[#4caf50] border-4 border-[#2e7d32] rounded-b-lg"
                        style={{
                            left: pipe.x,
                            top: 0,
                            width: PIPE_WIDTH,
                            height: pipe.topHeight,
                            transition: 'none'
                        }}
                    >
                        <div className="absolute bottom-0 w-[60px] -left-[5px] h-6 bg-[#4caf50] border-4 border-[#2e7d32] rounded-sm" />
                    </div>
                    {/* Bottom Pipe */}
                    <div
                        className="absolute bg-[#4caf50] border-4 border-[#2e7d32] rounded-t-lg"
                        style={{
                            left: pipe.x,
                            top: pipe.topHeight + GAP_SIZE,
                            width: PIPE_WIDTH,
                            height: '100%',
                            transition: 'none'
                        }}
                    >
                        <div className="absolute top-0 w-[60px] -left-[5px] h-6 bg-[#4caf50] border-4 border-[#2e7d32] rounded-sm" />
                    </div>
                </div>
            ))}

            {/* HUD */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-black text-[#e91e63] drop-shadow-md z-30">
                {score}
            </div>

            {!isPlaying && score === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 z-40 backdrop-blur-[2px]">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="bg-white px-6 py-3 rounded-2xl shadow-xl text-black font-bold text-center"
                    >
                        <p className="text-sm opacity-60 mb-1">READY?</p>
                        <p className="text-xl">TAP TO START</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default function GameConsole() {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const handleGameOver = (finalScore: number) => {
        setScore(finalScore);
        if (finalScore > highScore) setHighScore(finalScore);
        setGameState('gameover');

        // Game over sound
        const deathSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3');
        deathSound.volume = 0.3;
        deathSound.play().catch(() => { });
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
    };

    return (
        <div className="relative group perspective-1000">
            {/* The Console Body */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-[480px] h-[300px] bg-[#3B2B8E] rounded-[4rem] p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-b-[12px] border-[#2A1E66] flex flex-col"
            >
                {/* Top Buttons/Shoulders */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[80%] flex justify-between px-10 pointer-events-none">
                    <div className="w-16 h-4 bg-[#D81159] rounded-t-xl" />
                    <div className="w-16 h-4 bg-[#D81159] rounded-t-xl" />
                </div>

                <div className="flex-1 flex items-center justify-between gap-6 px-4">
                    {/* Left Controls */}
                    <div className="flex flex-col gap-8 items-center">
                        {/* Status Bar */}
                        <div className="w-12 h-6 bg-[#2A1E66] rounded-md flex items-center justify-center">
                            <div className="w-3 h-3 bg-[#e91e63] rounded-full animate-pulse shadow-[0_0_8px_#e91e63]" />
                        </div>

                        {/* D-Pad */}
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-20 bg-[#D81159] rounded-full" />
                                <div className="w-20 h-8 bg-[#D81159] rounded-full absolute" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-[#3B2B8E] rounded-sm rotate-45" />
                            </div>
                        </div>

                        {/* Menu Bars */}
                        <div className="flex flex-col gap-2 w-12">
                            <div className="h-2 w-full bg-[#95D03A] rounded-full shadow-sm" />
                            <div className="h-2 w-full bg-[#FFD700] rounded-full shadow-sm" />
                            <div className="h-2 w-2/3 bg-[#95D03A] rounded-full shadow-sm" />
                        </div>
                    </div>

                    {/* Main Screen Container */}
                    <div className="flex-1 h-full bg-[#1A1A1A] rounded-3xl p-3 border-4 border-[#2A1E66] shadow-inner overflow-hidden">
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                            <FlappyBird
                                isPlaying={gameState === 'playing'}
                                onGameOver={handleGameOver}
                                onStart={startGame}
                            />

                            {/* Overlays */}
                            <AnimatePresence>
                                {gameState === 'gameover' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-[#3B2B8E]/90 z-50 flex flex-col items-center justify-center text-white"
                                    >
                                        <h3 className="text-3xl font-black mb-1 italic text-[#FFD700]">CRASHED!</h3>
                                        <div className="text-center mb-6">
                                            <p className="text-xs opacity-60 uppercase tracking-widest mb-1">Score</p>
                                            <p className="text-5xl font-black text-white leading-none">{score}</p>
                                        </div>

                                        <div className="flex flex-col gap-3 w-full px-8">
                                            <button
                                                onClick={startGame}
                                                className="bg-[#95D03A] text-black font-bold py-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_4px_0_#689f38]"
                                            >
                                                TRY AGAIN
                                            </button>
                                            <p className="text-[10px] text-center opacity-40 uppercase tracking-tighter">
                                                Best: {highScore}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex flex-col gap-10 items-center">
                        <div className="relative flex flex-col gap-6">
                            <motion.button
                                whileTap={{ y: 4, scale: 0.95 }}
                                onClick={startGame}
                                className="w-16 h-16 bg-[#95D03A] rounded-full shadow-[0_8px_0_#689f38] flex items-center justify-center text-black/50"
                            >
                                <div className="w-8 h-8 rounded-full border-4 border-black/20" />
                            </motion.button>
                            <motion.button
                                whileTap={{ y: 4, scale: 0.95 }}
                                className="w-16 h-16 bg-[#FFD700] translate-x-4 rounded-full shadow-[0_8px_0_#c5a500] flex items-center justify-center text-black/50"
                            >
                                <div className="w-8 h-8 rounded-full border-4 border-black/20" />
                            </motion.button>
                        </div>

                        {/* Side Accent */}
                        <div className="w-2 h-20 bg-[#2A1E66] rounded-full" />
                    </div>
                </div>

                {/* Speaker Grills */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#2A1E66] rounded-full" />
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
