"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Lightweight Canvas 2D digital signal field with cursor interaction
// Contains binary digits, hex values, signal lines, and data packets
// pointer-events: none ensures no interference with UI

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  opacity: number;
  baseOpacity: number;
  speed: number;
  angle: number;
}

const CHARS = [
  "0", "1", "0", "1", "0", "1",
  "·", "▪", "▫", "□",
  "A", "F", "C", "E",
  "→", "↓", "↑", "←",
  "○", "●",
];

export default function DigitalSignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Particle count based on device capability
    const PARTICLE_COUNT = isMobile ? 40 : Math.min(120, Math.floor((width * height) / 12000));
    const REPULSION_RADIUS = 120;
    const ATTRACTION_RADIUS = 250;
    const RETURN_SPRING = 0.015;
    const DAMPING = 0.92;
    const WAVE_DURATION = 800; // ms

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        size: 8 + Math.random() * 3,
        opacity: 0,
        baseOpacity: 0.04 + Math.random() * 0.06,
        speed: 0.1 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Mouse tracking
    let lastMouseTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastMouseTime, 1);
      lastMouseTime = now;

      const newX = e.clientX;
      const newY = e.clientY;
      mouseRef.current.vx = (newX - mouseRef.current.x) / dt * 16;
      mouseRef.current.vy = (newY - mouseRef.current.y) / dt * 16;
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = newX;
      mouseRef.current.y = newY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Visibility
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let time = 0;

    const draw = () => {
      if (!isVisible || motionReduced) {
        // Static render for reduced motion
        if (motionReduced && time === 0) {
          ctx.clearRect(0, 0, width, height);
          ctx.font = "9px 'JetBrains Mono', monospace";
          particles.forEach((p) => {
            ctx.fillStyle = `rgba(97, 244, 222, ${p.baseOpacity})`;
            ctx.fillText(p.char, p.x, p.y);
          });
          time = 1;
        }
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mvx = mouseRef.current.vx;
      const mvy = mouseRef.current.vy;
      const mouseSpeed = Math.sqrt(mvx * mvx + mvy * mvy);

      particles.forEach((p) => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cursor interaction
        if (dist < REPULSION_RADIUS && mx > 0) {
          // Repulsion for nearby particles
          const force = (1 - dist / REPULSION_RADIUS) * 2;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;

          // Brief velocity boost from cursor speed
          p.vx += mvx * 0.02;
          p.vy += mvy * 0.02;
        } else if (dist < ATTRACTION_RADIUS && dist > REPULSION_RADIUS && mx > 0) {
          // Slight attraction for farther particles
          const force = (1 - dist / ATTRACTION_RADIUS) * 0.15;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Alignment with cursor direction
        if (dist < ATTRACTION_RADIUS && mouseSpeed > 1 && mx > 0) {
          const alignment = 0.005;
          p.vx += mvx * alignment;
          p.vy += mvy * alignment;
        }

        // Spring return to origin
        p.vx += (p.originX - p.x) * RETURN_SPRING;
        p.vy += (p.originY - p.y) * RETURN_SPRING;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Subtle drift
        p.x += p.vx + Math.sin(time * p.speed + p.angle) * 0.15;
        p.y += p.vy + Math.cos(time * p.speed + p.angle * 0.7) * 0.1;

        // Opacity based on displacement from origin
        const displacement = Math.sqrt(
          (p.x - p.originX) ** 2 + (p.y - p.originY) ** 2
        );
        const activeBoost = Math.min(displacement / 50, 0.08);
        p.opacity += (p.baseOpacity + activeBoost - p.opacity) * 0.1;

        // Draw
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(97, 244, 222, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      // Processing wave effect at cursor position
      if (mouseSpeed > 2 && mx > 0) {
        const waveRadius = 30 + mouseSpeed * 2;
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, waveRadius);
        gradient.addColorStop(0, `rgba(97, 244, 222, ${Math.min(mouseSpeed * 0.003, 0.06)})`);
        gradient.addColorStop(1, "rgba(97, 244, 222, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, waveRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
