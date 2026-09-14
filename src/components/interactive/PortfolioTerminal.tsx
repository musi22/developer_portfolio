"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { personal } from "@/content/data/personal";
import { projects } from "@/content/data/projects";
import { Terminal, ChevronRight } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

const COMMANDS: Record<string, string> = {
  help: "help",
  about: "about",
  projects: "projects",
  skills: "skills",
  architecture: "architecture",
  github: "github",
  resume: "resume",
  contact: "contact",
  clear: "clear",
  whoami: "whoami",
};

const QUICK_COMMANDS = ["help", "projects", "skills", "whoami"];

export default function PortfolioTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "system",
      content:
        'Welcome to rashmi@portfolio. Type "help" for available commands.',
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  }, []);

  const addLines = useCallback(
    (newLines: TerminalLine[]) => {
      setLines((prev) => [...prev, ...newLines]);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      // Add input line
      addLines([{ type: "input", content: `rashmi@portfolio:~$ ${cmd}` }]);

      // Add to history
      setHistory((prev) => [...prev, cmd]);
      setHistoryIdx(-1);

      if (!trimmed) return;

      // Check for project navigation
      const projectSlugs = projects.map((p) => p.slug);
      const matchedSlug = projectSlugs.find(
        (s) => s === trimmed || s.replace(/-/g, " ") === trimmed
      );
      if (matchedSlug) {
        addLines([
          {
            type: "output",
            content: `Navigating to case study: ${matchedSlug}...`,
          },
        ]);
        setTimeout(() => router.push(`/work/${matchedSlug}`), 500);
        return;
      }

      switch (trimmed) {
        case "help":
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content: "Available commands:",
            },
            {
              type: "output",
              content: "  help          Show this help message",
            },
            {
              type: "output",
              content: "  about         About Rashmi Shaw",
            },
            {
              type: "output",
              content: "  projects      List featured projects",
            },
            {
              type: "output",
              content: "  skills        Core engineering skills",
            },
            {
              type: "output",
              content: "  architecture  System architecture overview",
            },
            {
              type: "output",
              content: "  github        Open GitHub profile",
            },
            {
              type: "output",
              content: "  resume        Download résumé",
            },
            {
              type: "output",
              content: "  contact       Contact information",
            },
            {
              type: "output",
              content: "  clear         Clear terminal",
            },
            {
              type: "output",
              content: "  whoami        ???",
            },
            { type: "output", content: "" },
            {
              type: "output",
              content:
                "  Tip: Type a project slug to navigate to its case study.",
            },
          ]);
          break;

        case "about":
          addLines([
            { type: "output", content: "" },
            { type: "output", content: `  ${personal.name}` },
            { type: "output", content: `  ${personal.title}` },
            { type: "output", content: "" },
            { type: "output", content: `  ${personal.bio}` },
            { type: "output", content: "" },
            {
              type: "output",
              content: `  Education: ${personal.education.degree}`,
            },
            {
              type: "output",
              content: `  Institution: ${personal.education.institution}`,
            },
            {
              type: "output",
              content: `  CGPA: ${personal.education.cgpa}`,
            },
          ]);
          break;

        case "projects":
          addLines([
            { type: "output", content: "" },
            ...projects.map((p) => ({
              type: "output" as const,
              content: `  > ${p.slug}`,
            })),
            { type: "output", content: "" },
            {
              type: "output",
              content:
                "  Enter a project slug to view its case study.",
            },
          ]);
          break;

        case "skills":
          addLines([
            { type: "output", content: "" },
            { type: "output", content: "  Core Engineering Stack:" },
            {
              type: "output",
              content:
                "  ├── Python 3.11+ · FastAPI · LangGraph · Pydantic v2",
            },
            {
              type: "output",
              content:
                "  ├── Apache Kafka · Redpanda · Redis 7 · PostgreSQL 16",
            },
            {
              type: "output",
              content:
                "  ├── WebSockets · Async Programming · Event-Driven Arch",
            },
            {
              type: "output",
              content:
                "  ├── Qdrant · Elasticsearch · Hybrid RAG (RRF)",
            },
            {
              type: "output",
              content:
                "  ├── Docker · GitHub Actions · Prometheus · Grafana",
            },
            {
              type: "output",
              content:
                "  └── Next.js · TypeScript · React · Node.js",
            },
          ]);
          break;

        case "architecture":
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content:
                "  Agent Trust Platform: 9-node LangGraph state machine",
            },
            {
              type: "output",
              content:
                "  ├── Classify → Plan → Authorize → Approve → Execute",
            },
            {
              type: "output",
              content:
                "  └── Validate → Recover → Audit (SHA-256 chained)",
            },
            { type: "output", content: "" },
            {
              type: "output",
              content: "  StreamAlpha: Event-driven streaming pipeline",
            },
            {
              type: "output",
              content:
                "  ├── Producer → Kafka → Stream Processor → Redis/Postgres",
            },
            {
              type: "output",
              content:
                "  └── WebSocket Gateway → WASM Clients (60 FPS)",
            },
          ]);
          break;

        case "github":
          addLines([
            {
              type: "output",
              content: `  Opening ${personal.github}...`,
            },
          ]);
          window.open(personal.github, "_blank");
          break;

        case "resume":
          addLines([
            { type: "output", content: "  Downloading résumé..." },
          ]);
          const a = document.createElement("a");
          a.href = personal.resumeUrl;
          a.download = "";
          a.click();
          break;

        case "contact":
          addLines([
            { type: "output", content: "" },
            {
              type: "output",
              content: `  Email:    ${personal.email}`,
            },
            {
              type: "output",
              content: `  GitHub:   ${personal.github}`,
            },
            {
              type: "output",
              content: `  LinkedIn: ${personal.linkedin}`,
            },
            {
              type: "output",
              content: `  Location: ${personal.location}`,
            },
          ]);
          break;

        case "clear":
          setLines([
            {
              type: "system",
              content: "Terminal cleared. Type \"help\" for commands.",
            },
          ]);
          return;

        case "whoami":
          addLines([
            { type: "output", content: "" },
            { type: "output", content: "  Rashmi Shaw" },
            { type: "output", content: "  AI Systems & Backend Engineer" },
            {
              type: "output",
              content:
                "  Building reliable agents and real-time systems.",
            },
            { type: "output", content: "" },
            {
              type: "output",
              content:
                "  \"The system doesn't care about your demo. It cares about your invariants.\"",
            },
          ]);
          break;

        default:
          addLines([
            {
              type: "error",
              content: `  Command not found: ${trimmed}. Type "help" for available commands.`,
            },
          ]);
      }
    },
    [addLines, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx =
          historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = Math.min(history.length - 1, historyIdx + 1);
        if (newIdx === historyIdx) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#050607] overflow-hidden shadow-2xl max-w-2xl w-full">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0D10] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#61F4DE]" />
          <span className="font-mono text-xs text-white font-semibold">
            rashmi@portfolio
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F87171]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F6C76B]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#6EE7A8]/50" />
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        className="p-4 max-h-64 overflow-y-auto font-mono text-xs leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.type === "input"
                ? "text-[#61F4DE]"
                : line.type === "error"
                ? "text-[#F87171]"
                : line.type === "system"
                ? "text-[#656A74] italic"
                : "text-[#989CA5]"
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[#61F4DE] flex-shrink-0">
            rashmi@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none caret-[#61F4DE] font-mono text-xs min-w-0"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
          />
        </div>
      </div>

      {/* Quick command suggestions (especially for mobile) */}
      <div className="px-4 py-2 border-t border-white/5 flex flex-wrap gap-1.5">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              processCommand(cmd);
              setInput("");
            }}
            className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#989CA5] hover:text-white border border-white/5 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
