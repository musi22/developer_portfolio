"use client";

import React, { useEffect, useRef, useState } from "react";

// A subtle circuit-board grid background using Canvas 2D
// Nearly invisible, with scroll-activated path lighting
export default function CircuitGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    const motionReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width * dpr;
      canvas.height = Math.min(height, 15000) * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${Math.min(height, 15000)}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    const GRID_SIZE = 48;
    const NODE_RADIUS = 1.5;

    // Generate grid nodes
    interface GridNode {
      x: number;
      y: number;
      connected: boolean;
      brightness: number;
    }

    const nodes: GridNode[] = [];
    const cols = Math.ceil(width / GRID_SIZE);
    const rows = Math.ceil(Math.min(height, 15000) / GRID_SIZE);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Only place nodes at ~20% of intersections for subtlety
        if (Math.random() > 0.2) continue;
        nodes.push({
          x: c * GRID_SIZE,
          y: r * GRID_SIZE,
          connected: Math.random() > 0.5,
          brightness: 0,
        });
      }
    }

    // Generate random traces between nearby nodes
    interface Trace {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      brightness: number;
    }

    const traces: Trace[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = Math.abs(nodes[i].x - nodes[j].x);
        const dy = Math.abs(nodes[i].y - nodes[j].y);
        // Only connect adjacent nodes (horizontal or vertical)
        if (
          (dx === GRID_SIZE && dy === 0) ||
          (dx === 0 && dy === GRID_SIZE)
        ) {
          if (Math.random() > 0.5) {
            traces.push({
              x1: nodes[i].x,
              y1: nodes[i].y,
              x2: nodes[j].x,
              y2: nodes[j].y,
              brightness: 0,
            });
          }
        }
      }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Visibility detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Tab visibility
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let time = 0;

    const draw = () => {
      if (!isVisible) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      time += 0.005;
      ctx.clearRect(0, 0, width, Math.min(height, 15000));

      const scrollY = scrollRef.current;
      const viewportCenter = scrollY + window.innerHeight / 2;

      // Draw traces
      traces.forEach((trace) => {
        // Calculate distance to viewport center for activation
        const traceCenter = (trace.y1 + trace.y2) / 2;
        const dist = Math.abs(traceCenter - viewportCenter);
        const activationRadius = window.innerHeight * 0.8;

        // Target brightness based on proximity
        const targetBrightness =
          dist < activationRadius
            ? Math.max(0.03, 0.12 * (1 - dist / activationRadius))
            : 0.02;

        // Smooth brightness transition
        trace.brightness += (targetBrightness - trace.brightness) * 0.05;

        ctx.beginPath();
        ctx.moveTo(trace.x1, trace.y1);
        ctx.lineTo(trace.x2, trace.y2);
        ctx.strokeStyle = `rgba(97, 244, 222, ${trace.brightness})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const dist = Math.abs(node.y - viewportCenter);
        const activationRadius = window.innerHeight * 0.6;

        const targetBrightness =
          dist < activationRadius
            ? Math.max(0.04, 0.2 * (1 - dist / activationRadius))
            : 0.03;

        node.brightness += (targetBrightness - node.brightness) * 0.05;

        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(97, 244, 222, ${node.brightness})`;
        ctx.fill();
      });

      if (!motionReduced) {
        // Animated signal packet traveling along traces
        const packetIdx = Math.floor(time * 3) % traces.length;
        const t = (time * 3) % 1;
        const pTrace = traces[packetIdx];
        if (pTrace) {
          const px = pTrace.x1 + (pTrace.x2 - pTrace.x1) * t;
          const py = pTrace.y1 + (pTrace.y2 - pTrace.y1) * t;

          // Only draw if near viewport
          if (
            Math.abs(py - viewportCenter) < window.innerHeight
          ) {
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(97, 244, 222, 0.25)";
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(97, 244, 222, 0.08)";
            ctx.fill();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const resizeHandler = () => {
      ctx.resetTransform();
      resize();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
