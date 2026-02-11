'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextNoteTimeRef = useRef<number>(0);
    const timerIDRef = useRef<number | null>(null);
    const melodyIndexRef = useRef<number>(0);

    // Erik Satie-inspired Gymnopedie scale (approximate sweet notes)
    // Dmaj7 -> Gmaj7 vibes. Gentle, calm notes.
    const melody = [
        { note: 'D4', freq: 293.66, duration: 2.0 }, // Long root
        { note: 'A4', freq: 440.00, duration: 1.0 },
        { note: 'F#4', freq: 369.99, duration: 1.0 },
        { note: 'C#5', freq: 554.37, duration: 2.0 },
        { note: 'A4', freq: 440.00, duration: 1.0 },
        { note: 'F#4', freq: 369.99, duration: 1.0 },
        // Variation
        { note: 'B3', freq: 246.94, duration: 2.0 },
        { note: 'F#4', freq: 369.99, duration: 1.0 },
        { note: 'D4', freq: 293.66, duration: 1.0 },
        { note: 'G4', freq: 392.00, duration: 2.0 },
    ];

    const playNote = (freq: number, time: number, duration: number) => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;

        // Osc 1: The main tone (Sweet Sine)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        // Osc 2: Subtle overtone for "bell" quality
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = freq * 2;

        // Gain (Volume Envelope)
        const gainNode = ctx.createGain();
        const gainNode2 = ctx.createGain();

        // Filter for softness
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        // Connect graph
        osc.connect(gainNode);
        osc2.connect(gainNode2);
        gainNode.connect(filter);
        gainNode2.connect(filter);
        filter.connect(ctx.destination);

        // Gentle Attack
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.3, time + 0.1);
        // Long Release (Sustain pedal effect)
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration + 1.5);

        // Overtone is quieter and fades faster
        gainNode2.gain.setValueAtTime(0, time);
        gainNode2.gain.linearRampToValueAtTime(0.05, time + 0.1);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.start(time);
        osc2.start(time);

        // Cleanup
        osc.stop(time + duration + 2);
        osc2.stop(time + duration + 2);
    };

    const scheduler = useCallback(() => {
        if (!audioContextRef.current) return;

        const lookahead = 25.0;
        const scheduleAheadTime = 0.1;

        while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
            const currentNote = melody[melodyIndexRef.current % melody.length];
            playNote(currentNote.freq, nextNoteTimeRef.current, currentNote.duration);
            nextNoteTimeRef.current += currentNote.duration;
            melodyIndexRef.current++;
        }

        timerIDRef.current = window.setTimeout(scheduler, lookahead);
    }, []);

    // Helper to start the audio engine
    const startAudio = async () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
        melodyIndexRef.current = 0;
        scheduler();
        setIsPlaying(true);
    };

    // Helper to stop the audio engine
    const stopAudio = () => {
        if (timerIDRef.current) clearTimeout(timerIDRef.current);
        if (audioContextRef.current) {
            audioContextRef.current.suspend();
        }
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopAudio();
            localStorage.setItem('music_playing', 'false');
        } else {
            startAudio();
            localStorage.setItem('music_playing', 'true');
        }
    };

    // Auto-play from localStorage preference
    useEffect(() => {
        const shouldPlay = localStorage.getItem('music_playing') === 'true';
        if (shouldPlay) {
            // We attempt to autoplay. Note: Browsers may block this without user interaction.
            // If blocked, we catch the error, and it will just stay in 'false' state visually until clicked.
            startAudio().catch(e => {
                console.log("Autoplay blocked by browser policy until interaction", e);
                setIsPlaying(false); // Revert visual state if blocked
            });
        }
    }, [scheduler]);

    // Handle tab visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isPlaying) {
                stopAudio();
                // Optionally update localStorage if you want the state to persist as 'paused' for next reload
                // but for this specific "pause on toggle" behavior, just stopping the engine is enough.
                // The user requested: "when I comback then i need to prees on it play Again"
                setIsPlaying(false);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isPlaying]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerIDRef.current) clearTimeout(timerIDRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Status Tooltip with Blend Mode for Auto-Theming */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={String(isPlaying)}
                transition={{ duration: 0.5 }}
                className="absolute -top-12 right-0 px-4 py-2 rounded-full text-xs font-bold shadow-lg pointer-events-none whitespace-nowrap backdrop-blur-md mix-blend-difference bg-white text-black"
            >
                {isPlaying ? "Generating Vibes 🎵" : "Play Music? 🎹"}
            </motion.div>

            {/* Turntable Container */}
            <motion.div
                className="relative w-48 h-36 bg-[#8B5A2B] rounded-lg shadow-2xl cursor-pointer overflow-hidden border-b-4 border-r-4 border-[#5C3A18]"
                onClick={togglePlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Click to play/pause"
            >
                {/* Wood Texture */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 12px)`
                    }}
                />

                {/* Platter */}
                <div className="absolute top-3 left-3 w-28 h-28 bg-[#1a1a1a] rounded-full shadow-inner border border-gray-700" />

                {/* Vinyl Record */}
                <motion.div
                    className="absolute top-4 left-4 w-24 h-24 rounded-full flex items-center justify-center shadow-md bg-[#111]"
                    style={{
                        background: 'repeating-radial-gradient(#111, #111 2px, #222 3px, #222 5px)'
                    }}
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                    <div className="w-10 h-10 bg-yellow-500 rounded-full border-2 border-red-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                </motion.div>

                {/* Tone Arm Base */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gray-400 rounded-full shadow-md border border-gray-500 z-10" />

                {/* Tone Arm */}
                <motion.div
                    className="absolute w-24 h-2 bg-gray-300 rounded-full origin-right shadow-lg z-20"
                    // Playing: 0deg (On), Paused: 30deg (Off)
                    animate={{ rotate: isPlaying ? 0 : 30 }}
                    initial={{ rotate: 30 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                        right: '2rem',
                        top: '1.75rem',
                        transformOrigin: '100% 50%'
                    }}
                >
                    <div className="absolute left-0 -top-1 w-5 h-4 bg-gray-700 rounded-sm" />
                </motion.div>

                {/* Controls */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500'}`} />
                    <div className="w-3 h-3 bg-gray-800 rounded-full" />
                    <div className="w-3 h-3 bg-gray-800 rounded-full" />
                </div>

                <div className="absolute bottom-3 left-4 text-[8px] font-bold text-[#5C3A18] opacity-70 tracking-widest uppercase">
                    Vibes
                </div>
            </motion.div>
        </div>
    );
}
