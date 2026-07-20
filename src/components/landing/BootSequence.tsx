"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const BOOT_LINES = [
  { text: "Initializing PORTFOLIO_OS v2.0.0...", delay: 0 },
  { text: "Loading kernel modules...", delay: 300 },
  { text: "[OK] UI subsystem ready", delay: 600 },
  { text: "[OK] AI neural engine online", delay: 900 },
  { text: "[OK] Window manager initialized", delay: 1200 },
  { text: "[OK] Terminal emulator mounted", delay: 1500 },
  { text: "[OK] GitHub API connected", delay: 1800 },
  { text: "Starting desktop environment...", delay: 2100 },
  { text: "Welcome.", delay: 2500 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 500);
        }
      }, line.delay);

      return () => clearTimeout(timer);
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: "#08050f", zIndex: 9999 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-2xl px-8 font-mono">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div
                className="text-4xl font-display font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #4f46e5, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                PORTFOLIO OS
              </div>
              <div className="text-xs" style={{ color: "#9186b0" }}>
                Version 2.0.0 — Cyberpunk Edition
              </div>
            </motion.div>

            {/* Boot log */}
            <div
              className="rounded-lg p-6 text-sm"
              style={{
                background: "rgba(139, 92, 246,0.03)",
                border: "1px solid rgba(139, 92, 246,0.12)",
                minHeight: "220px",
              }}
            >
              <AnimatePresence>
                {BOOT_LINES.map(
                  (line, i) =>
                    visibleLines.includes(i) && (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mb-1"
                        style={{
                          color:
                            line.text.startsWith("[OK]")
                              ? "#4ade80"
                              : line.text === "Welcome."
                                ? "#8b5cf6"
                                : "#ddd6f3",
                          textShadow:
                            line.text === "Welcome."
                              ? "0 0 20px rgba(139, 92, 246,0.8)"
                              : "none",
                        }}
                      >
                        {line.text.startsWith("[OK]") ? (
                          <>
                            <span style={{ color: "#4ade80" }}>[OK] </span>
                            <span style={{ color: "#ddd6f3" }}>
                              {line.text.slice(5)}
                            </span>
                          </>
                        ) : (
                          line.text
                        )}
                      </motion.div>
                    )
                )}
              </AnimatePresence>

              {/* Blinking cursor */}
              {visibleLines.length < BOOT_LINES.length && (
                <span className="terminal-cursor" />
              )}
            </div>

            {/* Progress bar */}
            <div
              className="mt-4 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(139, 92, 246,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #4f46e5)",
                  boxShadow: "0 0 8px rgba(139, 92, 246,0.6)",
                }}
                initial={{ width: "0%" }}
                animate={{
                  width: `${(visibleLines.length / BOOT_LINES.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
