"use client";

import React, { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    phase: number;
    color: string; // "255, 255, 255" format
}

export default function StarDustCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // RGB values for the palette to avoid runtime hex conversion
    // '#fff', '#22d3ee', '#fbbf24', '#f472b6', '#a855f7', '#06b6d4', '#6366f1', '#f8fafc'
    const PALETTE = [
        "255, 255, 255", // White
        "34, 211, 238",  // Cyan 400
        "251, 191, 36",  // Amber 400
        "244, 114, 182", // Pink 400
        "168, 85, 247",  // Purple 500
        "6, 182, 212",   // Cyan 500
        "99, 102, 241",  // Indigo 500
        "248, 250, 252"  // Slate 50
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];

        const resizeCanvas = () => {
            const { innerWidth, innerHeight } = window;
            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = innerWidth * dpr;
            canvas.height = innerHeight * dpr;
            canvas.style.width = `${innerWidth}px`;
            canvas.style.height = `${innerHeight}px`;
            ctx.scale(dpr, dpr);

            // Re-initialize stars on resize with responsive count
            // Mobile: 400, Desktop: 1000
            const starCount = innerWidth < 768 ? 400 : 1000;
            initStars(innerWidth, innerHeight, starCount);
        };

        const initStars = (width: number, height: number, count: number) => {
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random(),
                    speed: 0.2 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
                });
            }
        };

        const render = (time: number) => {
            if (!canvas || !ctx) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            ctx.clearRect(0, 0, width, height);

            const timeSec = time * 0.001;

            stars.forEach(star => {
                // Update opacity for twinkling
                const twinkle = Math.sin(timeSec * star.speed + star.phase);
                const currentOpacity = 0.2 + (Math.abs(twinkle) * 0.6); // Range 0.2 to 0.8

                ctx.fillStyle = `rgba(${star.color}, ${currentOpacity * star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Initial setup
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-60"
        />
    );
}
