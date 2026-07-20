"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/content/data/personal";
import { skills } from "@/content/data/skills";
import { projects } from "@/content/data/projects";
import { generateId } from "@/lib/utils";
import type { TerminalLine } from "@/types/terminal";

type OutputType = "input" | "output" | "error" | "success" | "info" | "system";

interface Line {
  id: string;
  type: OutputType;
  content: string;
}

const NEOFETCH_ART = `
   ██████╗  ███████╗
   ██╔══██╗ ██╔════╝
   ██║  ██║ ███████╗
   ██║  ██║ ╚════██║
   ██████╔╝ ███████║
   ╚═════╝  ╚══════╝
`;

const COMMANDS: Record<string, (args: string[]) => Line[]> = {
  help: () => [
    { id: generateId(), type: "info", content: "Available commands:" },
    { id: generateId(), type: "output", content: "  about       — About me" },
    { id: generateId(), type: "output", content: "  projects     — List projects" },
    { id: generateId(), type: "output", content: "  skills       — View skills" },
    { id: generateId(), type: "output", content: "  resume       — View resume info" },
    { id: generateId(), type: "output", content: "  contact      — Contact info" },
    { id: generateId(), type: "output", content: "  github       — GitHub profile link" },
    { id: generateId(), type: "output", content: "  linkedin     — LinkedIn profile link" },
    { id: generateId(), type: "output", content: "  blog         — Blog info" },
    { id: generateId(), type: "output", content: "  ai           — AI assistant info" },
    { id: generateId(), type: "output", content: "  whoami       — Who am I?" },
    { id: generateId(), type: "output", content: "  neofetch     — System info" },
    { id: generateId(), type: "output", content: "  theme        — Toggle theme" },
    { id: generateId(), type: "output", content: "  clear        — Clear terminal" },
    { id: generateId(), type: "info", content: "Use Tab for autocomplete, ↑↓ for history" },
  ],

  about: () => [
    { id: generateId(), type: "info", content: `=== ${personal.name} ===` },
    { id: generateId(), type: "output", content: `Title: ${personal.title}` },
    { id: generateId(), type: "output", content: `Location: ${personal.location}` },
    { id: generateId(), type: "output", content: "" },
    { id: generateId(), type: "output", content: personal.bio },
  ],

  whoami: () => [
    { id: generateId(), type: "success", content: personal.name },
    { id: generateId(), type: "output", content: personal.title },
    { id: generateId(), type: "output", content: `Location: ${personal.location}` },
    { id: generateId(), type: "output", content: `Available: ${personal.availableForWork ? "Yes — " + personal.availabilityNote : "Not available"}` },
  ],

  projects: () => [
    { id: generateId(), type: "info", content: `=== Projects (${projects.length} total) ===` },
    ...projects.map((p) => ({
      id: generateId(),
      type: "output" as OutputType,
      content: `  [${p.status}] ${p.title} — ${p.tagline}`,
    })),
  ],

  skills: () => {
    const topSkills = skills.sort((a, b) => b.level - a.level).slice(0, 10);
    return [
      { id: generateId(), type: "info", content: "=== Top Skills ===" },
      ...topSkills.map((s) => ({
        id: generateId(),
        type: "output" as OutputType,
        content: `  ${s.icon} ${s.name.padEnd(20)} ${s.level}% (${s.experience})`,
      })),
    ];
  },

  resume: () => [
    { id: generateId(), type: "info", content: "=== Resume ===" },
    { id: generateId(), type: "output", content: `Name: ${personal.name}` },
    { id: generateId(), type: "output", content: `Role: ${personal.title}` },
    { id: generateId(), type: "output", content: `Download: ${personal.website}${personal.resumeUrl}` },
  ],

  contact: () => [
    { id: generateId(), type: "info", content: "=== Contact ===" },
    { id: generateId(), type: "output", content: `Email: ${personal.email}` },
    { id: generateId(), type: "output", content: `GitHub: ${personal.github}` },
    { id: generateId(), type: "output", content: `LinkedIn: ${personal.linkedin}` },
    { id: generateId(), type: "output", content: `Website: ${personal.website}` },
  ],

  github: () => [
    { id: generateId(), type: "success", content: `Opening GitHub: ${personal.github}` },
    { id: generateId(), type: "output", content: `Username: @${personal.githubUsername}` },
  ],

  linkedin: () => [
    { id: generateId(), type: "success", content: `Opening LinkedIn: ${personal.linkedin}` },
  ],

  blog: () => [
    { id: generateId(), type: "info", content: "=== Blog ===" },
    { id: generateId(), type: "output", content: "Technical articles on AI, backend engineering, and web development." },
    { id: generateId(), type: "output", content: `Visit: ${personal.website}/blog` },
  ],

  ai: () => [
    { id: generateId(), type: "info", content: "=== AI Assistant ===" },
    { id: generateId(), type: "output", content: "I have an AI chatbot trained on my portfolio data." },
    { id: generateId(), type: "output", content: "Open the AI Assistant app from the dock to chat!" },
  ],

  theme: () => [
    { id: generateId(), type: "success", content: "Theme: Cyberpunk Pink/Red (Dark Mode)" },
    { id: generateId(), type: "output", content: "Use the Settings app to change theme preferences." },
  ],

  neofetch: () => [
    { id: generateId(), type: "success", content: NEOFETCH_ART },
    { id: generateId(), type: "output", content: `${personal.name}@portfolio-os` },
    { id: generateId(), type: "output", content: "----------------------------" },
    { id: generateId(), type: "output", content: `OS: Portfolio OS v2.0.0 Cyberpunk` },
    { id: generateId(), type: "output", content: `Host: ${personal.name}'s Brain` },
    { id: generateId(), type: "output", content: `Shell: zsh 5.9` },
    { id: generateId(), type: "output", content: `DE: Next.js + Framer Motion` },
    { id: generateId(), type: "output", content: `WM: Custom Window Manager` },
    { id: generateId(), type: "output", content: `Theme: Cyberpunk Pink/Red` },
    { id: generateId(), type: "output", content: `Terminal: Portfolio Terminal v1.0` },
    { id: generateId(), type: "output", content: `CPU: ${personal.title}` },
    { id: generateId(), type: "output", content: `Memory: ∞ Coffee Cups` },
  ],
};

const ALL_COMMANDS = Object.keys(COMMANDS);

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    {
      id: "0",
      type: "system",
      content: `Welcome to Portfolio OS Terminal. Type 'help' for available commands.`,
    },
    {
      id: "1",
      type: "system",
      content: `${personal.name}@portfolio-os ~ $`,
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const execCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Echo the command
      const promptLine: Line = {
        id: generateId(),
        type: "input",
        content: `${personal.name}@portfolio-os ~ $ ${trimmed}`,
      };
      setLines((prev) => [...prev, promptLine]);
      setHistory((prev) => [trimmed, ...prev].slice(0, 50));
      setHistoryIndex(-1);

      const [cmd, ...args] = trimmed.toLowerCase().split(" ");

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      if (cmd === "github") {
        window.open(personal.github, "_blank");
      }
      if (cmd === "linkedin") {
        window.open(personal.linkedin, "_blank");
      }

      if (COMMANDS[cmd]) {
        addLines(COMMANDS[cmd](args));
      } else {
        addLines([
          {
            id: generateId(),
            type: "error",
            content: `Command not found: ${cmd}. Type 'help' for available commands.`,
          },
        ]);
      }
    },
    [addLines]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete
      const match = ALL_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      if (history[nextIndex]) setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex >= 0 ? history[nextIndex] : "");
    }
  };

  const getLineColor = (type: OutputType) => {
    switch (type) {
      case "input": return "#8b5cf6";
      case "success": return "#4ade80";
      case "error": return "#f87171";
      case "info": return "#22d3ee";
      case "system": return "#4d4270";
      default: return "#ddd6f3";
    }
  };

  return (
    <div
      className="h-full flex flex-col terminal-bg text-sm"
      onClick={() => inputRef.current?.focus()}
      role="application"
      aria-label="Terminal emulator"
    >
      <div
        className="flex-1 overflow-y-auto p-4 font-mono"
        style={{ fontSize: "12px", lineHeight: "1.6" }}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              color: getLineColor(line.type),
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {line.content}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center">
          <span style={{ color: "#8b5cf6", marginRight: "6px" }}>
            {personal.name}@portfolio-os ~ $
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            style={{
              color: "#ddd6f3",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              caretColor: "#8b5cf6",
            }}
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Hint bar */}
      <div
        className="px-4 py-1.5 text-xs flex items-center gap-4 flex-shrink-0"
        style={{
          borderTop: "1px solid rgba(139, 92, 246,0.08)",
          color: "#4d4270",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>↑↓ History</span>
        <span>Tab Autocomplete</span>
        <span>↵ Execute</span>
        <span style={{ marginLeft: "auto" }}>
          {ALL_COMMANDS.length} commands available
        </span>
      </div>
    </div>
  );
}
