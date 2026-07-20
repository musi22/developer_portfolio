"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight } from "lucide-react";
import { APP_DEFINITIONS } from "@/utils/constants";
import { personal } from "@/content/data/personal";
import type { WindowId } from "@/types/window";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: WindowId) => void;
}

interface CommandItem {
  id: string;
  type: "app" | "action" | "link";
  icon: string;
  title: string;
  description?: string;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenApp,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build all commands
  const allCommands: CommandItem[] = [
    ...APP_DEFINITIONS.map((app) => ({
      id: app.id,
      type: "app" as const,
      icon: app.icon,
      title: app.title,
      description: app.description,
      action: () => {
        onOpenApp(app.id as WindowId);
        onClose();
      },
      keywords: [app.title.toLowerCase(), app.id],
    })),
    {
      id: "github-link",
      type: "link",
      icon: "🐙",
      title: "Open GitHub",
      description: "Visit GitHub profile",
      action: () => window.open(personal.github, "_blank"),
      keywords: ["github", "code", "repos"],
    },
  ];

  const filtered = query.trim()
    ? allCommands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
          cmd.keywords?.some((k) => k.includes(query.toLowerCase()))
      )
    : allCommands;

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[selectedIndex]) filtered[selectedIndex].action();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Reset selection when query changes
  useEffect(() => setSelectedIndex(0), [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="command-palette-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Palette */}
          <motion.div
            className="command-palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(139, 92, 246,0.1)" }}
            >
              <Search size={16} style={{ color: "#8b5cf6", flexShrink: 0 }} aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, actions…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{
                  color: "white",
                  fontFamily: "var(--font-sans)",
                }}
                aria-label="Search command palette"
                aria-autocomplete="list"
                aria-controls="command-list"
                autoComplete="off"
              />
              <kbd
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{
                  background: "rgba(139, 92, 246,0.08)",
                  border: "1px solid rgba(139, 92, 246,0.15)",
                  color: "#4d4270",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              id="command-list"
              className="overflow-y-auto"
              style={{ maxHeight: "360px" }}
              role="listbox"
              aria-label="Command results"
            >
              {filtered.length === 0 ? (
                <div
                  className="py-8 text-center text-sm"
                  style={{ color: "#4d4270" }}
                >
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <>
                  {!query && (
                    <div
                      className="px-4 py-2 text-xs font-medium"
                      style={{ color: "#4d4270" }}
                    >
                      All Applications
                    </div>
                  )}
                  {filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                      style={{
                        background:
                          i === selectedIndex
                            ? "rgba(139, 92, 246,0.1)"
                            : "transparent",
                        borderLeft:
                          i === selectedIndex
                            ? "2px solid #8b5cf6"
                            : "2px solid transparent",
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      role="option"
                      aria-selected={i === selectedIndex}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                        style={{
                          background: "rgba(139, 92, 246,0.08)",
                          border: "1px solid rgba(139, 92, 246,0.12)",
                        }}
                      >
                        {cmd.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate" style={{ color: "#ddd6f3" }}>
                          {cmd.title}
                        </div>
                        {cmd.description && (
                          <div className="text-xs truncate mt-0.5" style={{ color: "#4d4270" }}>
                            {cmd.description}
                          </div>
                        )}
                      </div>
                      {i === selectedIndex && (
                        <ArrowRight size={14} style={{ color: "#8b5cf6", flexShrink: 0 }} aria-hidden="true" />
                      )}
                    </motion.button>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2 flex items-center justify-between text-xs"
              style={{
                borderTop: "1px solid rgba(139, 92, 246,0.08)",
                color: "#4d4270",
              }}
            >
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <span>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
