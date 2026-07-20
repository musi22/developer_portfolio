"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WindowId } from "@/types/window";
import type { AppDefinition } from "@/types/window";
import { APP_DEFINITIONS } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface DockProps {
  onOpenApp: (appId: WindowId) => void;
  openApps: WindowId[];
  minimizedApps: WindowId[];
}

function DockItem({
  app,
  isOpen,
  isMinimized,
  onOpen,
}: {
  app: AppDefinition;
  isOpen: boolean;
  isMinimized: boolean;
  onOpen: () => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
    onOpen();
  };

  return (
    <div
      className="dock-item"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="dock-tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
          >
            {app.title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.button
        className="dock-icon"
        onClick={handleClick}
        animate={
          bouncing
            ? { y: [0, -14, 0, -8, 0] }
            : { y: 0 }
        }
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.22, y: -8 }}
        style={{
          background: `linear-gradient(135deg, ${app.color ?? "#8b5cf6"}22, ${app.color ?? "#8b5cf6"}11)`,
          border: `1px solid ${app.color ?? "#8b5cf6"}30`,
          boxShadow: isOpen
            ? `0 4px 20px ${app.color ?? "#8b5cf6"}30, 0 0 0 1px ${app.color ?? "#8b5cf6"}20`
            : "none",
        }}
        aria-label={`Open ${app.title}`}
        title={app.title}
      >
        <span style={{ fontSize: "22px" }}>{app.icon}</span>
      </motion.button>

      {/* Running indicator dot */}
      {(isOpen || isMinimized) && (
        <motion.div
          className="dock-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </div>
  );
}

export default function Dock({ onOpenApp, openApps, minimizedApps }: DockProps) {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 dock"
      style={{ zIndex: "var(--z-dock)" }}
      role="navigation"
      aria-label="Application dock"
    >
      {APP_DEFINITIONS.map((app) => (
        <DockItem
          key={app.id}
          app={app}
          isOpen={openApps.includes(app.id)}
          isMinimized={minimizedApps.includes(app.id)}
          onOpen={() => onOpenApp(app.id)}
        />
      ))}
    </div>
  );
}
