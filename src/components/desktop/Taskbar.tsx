"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Wifi, Battery, Volume2 } from "lucide-react";

interface TaskbarProps {
  onOpenCommandPalette: () => void;
}

function Clock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right leading-tight">
      <div className="text-xs font-medium" style={{ color: "#ddd6f3" }}>
        {time}
      </div>
      <div className="text-xs" style={{ color: "#4d4270" }}>
        {date}
      </div>
    </div>
  );
}

export default function Taskbar({ onOpenCommandPalette }: TaskbarProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommandPalette]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 h-12"
      style={{
        background: "rgba(8, 5, 15,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246,0.1)",
        zIndex: "var(--z-taskbar)",
      }}
      initial={{ y: -48 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      role="banner"
      aria-label="System taskbar"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <span
          className="text-sm font-display font-bold"
          style={{ color: "#8b5cf6", textShadow: "0 0 15px rgba(139, 92, 246,0.5)" }}
        >
          ⬡ OS
        </span>
        <div style={{ width: "1px", height: "16px", background: "rgba(139, 92, 246,0.2)" }} />
        <span className="text-xs" style={{ color: "#4d4270" }}>
          Portfolio OS v2.0
        </span>
      </div>

      {/* Center: Search / Command Palette trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs transition-all"
        style={{
          background: "rgba(139, 92, 246,0.06)",
          border: "1px solid rgba(139, 92, 246,0.12)",
          color: "#4d4270",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(139, 92, 246,0.1)";
          e.currentTarget.style.borderColor = "rgba(139, 92, 246,0.2)";
          e.currentTarget.style.color = "#9186b0";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(139, 92, 246,0.06)";
          e.currentTarget.style.borderColor = "rgba(139, 92, 246,0.12)";
          e.currentTarget.style.color = "#4d4270";
        }}
        aria-label="Open command palette (Ctrl+K)"
        aria-keyshortcuts="Control+k"
      >
        <Search size={11} aria-hidden="true" />
        <span>Search or open app…</span>
        <kbd
          className="ml-2 px-1.5 py-0.5 rounded text-xs font-mono"
          style={{
            background: "rgba(139, 92, 246,0.08)",
            border: "1px solid rgba(139, 92, 246,0.15)",
            color: "#4d4270",
          }}
        >
          ⌘K
        </kbd>
      </button>

      {/* Right: System tray */}
      <div className="flex items-center gap-3">
        <Wifi size={13} style={{ color: "#4d4270" }} aria-hidden="true" />
        <Volume2 size={13} style={{ color: "#4d4270" }} aria-hidden="true" />
        <Battery size={13} style={{ color: "#4d4270" }} aria-hidden="true" />
        <div style={{ width: "1px", height: "16px", background: "rgba(139, 92, 246,0.2)" }} />
        <Clock />
      </div>
    </motion.header>
  );
}
