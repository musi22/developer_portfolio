"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Layers,
  Eye,
  Download,
  Mail,
  Copy,
  Sun,
  Moon,
  Zap,
  ZapOff,
  Command,
  CornerDownLeft,
  ArrowUp,
  ArrowDown as ArrowDownIcon,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personal } from "@/content/data/personal";

interface PaletteCommand {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  keywords: string[];
  action: () => void;
}

interface CommandPaletteProps {
  onToggleArchitectureMode?: () => void;
  architectureMode?: boolean;
}

export default function CommandPalette({
  onToggleArchitectureMode,
  architectureMode,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load recent commands from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cmd-palette-recent");
      if (stored) setRecentIds(JSON.parse(stored));
    } catch {}
  }, []);

  const saveRecent = useCallback(
    (id: string) => {
      const updated = [id, ...recentIds.filter((r) => r !== id)].slice(0, 5);
      setRecentIds(updated);
      try {
        localStorage.setItem("cmd-palette-recent", JSON.stringify(updated));
      } catch {}
    },
    [recentIds]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      close();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    [close]
  );

  // Define all commands
  const commands: PaletteCommand[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-work",
        label: "View Featured Work",
        group: "Navigation",
        icon: <Layers className="w-4 h-4" />,
        keywords: ["projects", "case studies", "work", "portfolio"],
        action: () => scrollToSection("work"),
      },
      {
        id: "nav-engineering",
        label: "View Engineering Capabilities",
        group: "Navigation",
        icon: <Zap className="w-4 h-4" />,
        keywords: ["skills", "tech", "engineering", "stack"],
        action: () => scrollToSection("engineering"),
      },
      {
        id: "nav-about",
        label: "View About & Background",
        group: "Navigation",
        icon: <Eye className="w-4 h-4" />,
        keywords: ["about", "background", "education", "bio"],
        action: () => scrollToSection("about"),
      },
      {
        id: "nav-contact",
        label: "Go to Contact",
        group: "Navigation",
        icon: <Mail className="w-4 h-4" />,
        keywords: ["contact", "email", "message", "hire"],
        action: () => scrollToSection("contact"),
      },
      // Projects
      {
        id: "proj-trust",
        label: "Open Enterprise Agent Trust Platform",
        group: "Projects",
        icon: <ArrowRight className="w-4 h-4" />,
        keywords: ["enterprise", "agent", "trust", "platform", "langgraph"],
        action: () => {
          close();
          router.push("/work/enterprise-agent-trust-platform");
        },
      },
      {
        id: "proj-stream",
        label: "Open StreamAlpha",
        group: "Projects",
        icon: <ArrowRight className="w-4 h-4" />,
        keywords: ["stream", "alpha", "kafka", "realtime", "websocket"],
        action: () => {
          close();
          router.push("/work/streamalpha");
        },
      },
      {
        id: "proj-revenue",
        label: "Open RevenueGuard",
        group: "Projects",
        icon: <ArrowRight className="w-4 h-4" />,
        keywords: ["revenue", "guard", "leakage", "recovery"],
        action: () => {
          close();
          router.push("/work/revenueguard");
        },
      },
      {
        id: "proj-nexus",
        label: "Open NexusAgent",
        group: "Projects",
        icon: <ArrowRight className="w-4 h-4" />,
        keywords: ["nexus", "agent", "rag", "search", "knowledge"],
        action: () => {
          close();
          router.push("/work/nexusagent");
        },
      },
      // Modes
      {
        id: "mode-architecture",
        label: architectureMode
          ? "Disable Architecture Mode"
          : "Enable Architecture Mode",
        group: "Modes",
        icon: architectureMode ? (
          <ZapOff className="w-4 h-4" />
        ) : (
          <Zap className="w-4 h-4" />
        ),
        keywords: ["architecture", "mode", "technical", "diagram"],
        action: () => {
          onToggleArchitectureMode?.();
          close();
        },
      },
      {
        id: "mode-recruiter",
        label: "Open Recruiter Overview",
        group: "Modes",
        icon: <Eye className="w-4 h-4" />,
        keywords: ["recruiter", "overview", "scan", "60", "quick"],
        action: () => {
          close();
          window.dispatchEvent(new CustomEvent("open-recruiter-panel"));
        },
      },
      // Actions
      {
        id: "act-resume",
        label: "Download Résumé",
        group: "Actions",
        icon: <Download className="w-4 h-4" />,
        keywords: ["resume", "cv", "download", "pdf"],
        action: () => {
          close();
          const a = document.createElement("a");
          a.href = personal.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "act-github",
        label: "Open GitHub",
        group: "Actions",
        icon: <GithubIcon className="w-4 h-4" />,
        keywords: ["github", "code", "source", "repo"],
        action: () => {
          close();
          window.open(personal.github, "_blank");
        },
      },
      {
        id: "act-linkedin",
        label: "Open LinkedIn",
        group: "Actions",
        icon: <LinkedinIcon className="w-4 h-4" />,
        keywords: ["linkedin", "profile", "social"],
        action: () => {
          close();
          window.open(personal.linkedin, "_blank");
        },
      },
      {
        id: "act-email",
        label: "Copy Email Address",
        group: "Actions",
        icon: <Copy className="w-4 h-4" />,
        keywords: ["email", "copy", "clipboard", "contact"],
        action: () => {
          close();
          navigator.clipboard.writeText(personal.email);
        },
      },
    ],
    [architectureMode, close, onToggleArchitectureMode, router, scrollToSection]
  );

  // Fuzzy search
  const filteredCommands = useMemo(() => {
    if (!query.trim()) {
      // Show recent first, then all
      const recent = recentIds
        .map((id) => commands.find((c) => c.id === id))
        .filter(Boolean) as PaletteCommand[];
      const rest = commands.filter((c) => !recentIds.includes(c.id));
      return [...recent, ...rest];
    }
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.keywords.some((k) => k.includes(q)) ||
        cmd.group.toLowerCase().includes(q)
    );
  }, [query, commands, recentIds]);

  // Group commands for display
  const groupedCommands = useMemo(() => {
    const groups: Record<string, PaletteCommand[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.group]) groups[cmd.group] = [];
      groups[cmd.group].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index on filter change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filteredCommands[selectedIndex];
      if (cmd) {
        saveRecent(cmd.id);
        cmd.action();
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const executeCommand = (cmd: PaletteCommand) => {
    saveRecent(cmd.id);
    cmd.action();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Palette */}
      <div
        className="relative w-full max-w-xl mx-4 rounded-2xl border border-white/15 bg-[#0B0D10]/95 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-4.5 h-4.5 text-[#989CA5] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-white text-sm font-mono placeholder-[#656A74] focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#656A74]">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          className="max-h-[50vh] overflow-y-auto py-2 scroll-smooth"
        >
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[#656A74] font-mono">
              No commands match "{query}"
            </div>
          ) : (
            Object.entries(groupedCommands).map(([group, cmds]) => (
              <div key={group}>
                <div className="px-4 pt-2 pb-1 text-[10px] font-mono text-[#656A74] uppercase tracking-wider">
                  {group}
                </div>
                {cmds.map((cmd) => {
                  const globalIdx = filteredCommands.indexOf(cmd);
                  const isSelected = globalIdx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      data-index={globalIdx}
                      type="button"
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-mono transition-colors ${
                        isSelected
                          ? "bg-[#61F4DE]/10 text-white"
                          : "text-[#989CA5] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className={
                          isSelected ? "text-[#61F4DE]" : "text-[#656A74]"
                        }
                      >
                        {cmd.icon}
                      </span>
                      <span className="flex-1 truncate">{cmd.label}</span>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#61F4DE]" />
                      )}
                      {recentIds.includes(cmd.id) && !query && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#656A74] border border-white/5">
                          recent
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="px-4 py-2.5 border-t border-white/10 flex items-center gap-4 text-[10px] font-mono text-[#656A74]">
          <span className="flex items-center gap-1">
            <ArrowDownIcon className="w-3 h-3" />
            <ArrowUp className="w-3 h-3" />
            navigate
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" />
            select
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1 rounded bg-white/5 border border-white/10">
              esc
            </span>
            close
          </span>
        </div>
      </div>
    </div>
  );
}

// Export a trigger button for the navbar
export function CommandPaletteTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white border border-white/10 transition-colors text-xs font-mono"
      aria-label="Open command palette (Ctrl+K)"
    >
      <Command className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:flex items-center gap-0.5 px-1 py-0.2 rounded bg-white/5 border border-white/5 text-[9px] text-[#656A74]">
        ⌘K
      </kbd>
    </button>
  );
}
