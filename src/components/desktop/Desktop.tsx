"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowManager } from "@/hooks/useWindowManager";
import { APP_DEFINITIONS } from "@/utils/constants";
import Window from "./Window";
import Dock from "./Dock";
import Taskbar from "./Taskbar";
import CommandPalette from "./CommandPalette";
import { ContextMenu } from "./ContextMenu";
import type { WindowId } from "@/types/window";

// Lazy-load app components
import dynamic from "next/dynamic";

const AboutApp = dynamic(() => import("@/features/about/AboutApp"), { ssr: false });
const ResumeApp = dynamic(() => import("@/features/resume/ResumeApp"), { ssr: false });
const ProjectsApp = dynamic(() => import("@/features/projects/ProjectsApp"), { ssr: false });
const GitHubApp = dynamic(() => import("@/features/github/GitHubApp"), { ssr: false });
const SkillsApp = dynamic(() => import("@/features/skills/SkillsApp"), { ssr: false });
const BlogApp = dynamic(() => import("@/features/blog/BlogApp"), { ssr: false });
const AIAssistantApp = dynamic(() => import("@/features/ai/AIAssistantApp"), { ssr: false });
const TerminalApp = dynamic(() => import("@/features/terminal/TerminalApp"), { ssr: false });
const ContactApp = dynamic(() => import("@/features/contact/ContactApp"), { ssr: false });
const SettingsApp = dynamic(() => import("@/features/settings/SettingsApp"), { ssr: false });

function getAppComponent(appId: string) {
  const map: Record<string, React.ReactNode> = {
    about: <AboutApp />,
    resume: <ResumeApp />,
    projects: <ProjectsApp />,
    github: <GitHubApp />,
    skills: <SkillsApp />,
    blog: <BlogApp />,
    ai: <AIAssistantApp />,
    terminal: <TerminalApp />,
    contact: <ContactApp />,
    settings: <SettingsApp />,
  };
  return map[appId] ?? <div className="p-8 text-center" style={{ color: "#9186b0" }}>App not found.</div>;
}

export default function Desktop() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    isOpen,
    isMinimized,
  } = useWindowManager();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const openApp = useCallback(
    (appId: WindowId) => openWindow(appId),
    [openWindow]
  );

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    // Only trigger on desktop background — never inside an open window,
    // so users can still right-click to copy text, open links, etc.
    if ((e.target as HTMLElement).closest("[data-no-context], .window")) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  // Desktop icon grid
  const desktopIcons = APP_DEFINITIONS;

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: "var(--color-bg-primary)" }}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
      role="main"
      aria-label="Desktop environment"
    >
      {/* Animated wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(139, 92, 246,0.10) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 75%, rgba(79, 70, 229,0.07) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238,0.03) 0%, transparent 60%),
            #08050f
          `,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246,0.01) 2px, rgba(139, 92, 246,0.01) 4px)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Taskbar */}
      <Taskbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Desktop Icons */}
      <div
        className="absolute top-14 left-4 grid gap-2"
        style={{ zIndex: 1 }}
        data-no-context="true"
      >
        {desktopIcons.slice(0, 5).map((app) => (
          <motion.button
            key={app.id}
            onClick={() => openApp(app.id as WindowId)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl group"
            style={{ width: "72px" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onDoubleClick={() => openApp(app.id as WindowId)}
            aria-label={`Open ${app.title}`}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all"
              style={{
                background: "rgba(139, 92, 246,0.06)",
                border: "1px solid rgba(139, 92, 246,0.1)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
              }}
            >
              {app.icon}
            </div>
            <span
              className="text-xs text-center leading-tight"
              style={{
                color: "#ddd6f3",
                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                fontSize: "10px",
              }}
            >
              {app.title}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) => (
          <Window
            key={win.id}
            window={win}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
          >
            {getAppComponent(win.appId)}
          </Window>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <Dock
        onOpenApp={openApp}
        openApps={windows
          .filter((w) => w.state !== "minimized")
          .map((w) => w.appId as WindowId)}
        minimizedApps={windows
          .filter((w) => w.state === "minimized")
          .map((w) => w.appId as WindowId)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenApp={openApp}
      />

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={closeContextMenu}
            onOpenApp={openApp}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
