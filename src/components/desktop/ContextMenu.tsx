"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WindowId } from "@/types/window";
import { APP_DEFINITIONS } from "@/utils/constants";
import { cn } from "@/lib/utils";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenApp: (appId: WindowId) => void;
}

export function ContextMenu({ x, y, onClose, onOpenApp }: ContextMenuProps) {
  type MenuItem =
    | { type: "header"; label: string }
    | { type: "divider"; label: string }
    | { type: "item"; label: string; action: () => void };

  const menuItems: MenuItem[] = [
    { label: "Open App", type: "header" },
    ...APP_DEFINITIONS.slice(0, 5).map((app) => ({
      label: `${app.icon} ${app.title}`,
      action: () => { onOpenApp(app.id as WindowId); onClose(); },
      type: "item" as const,
    })),
    { label: "---", type: "divider" },
    {
      label: "🔄 Refresh Desktop",
      action: () => { window.location.reload(); },
      type: "item" as const,
    },
    {
      label: "⚙️ Settings",
      action: () => { onOpenApp("settings"); onClose(); },
      type: "item" as const,
    },
  ];


  return (
    <motion.div
      className="fixed"
      style={{
        left: x,
        top: y,
        zIndex: "var(--z-context-menu)",
        background: "rgba(8, 5, 15,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(139, 92, 246,0.2)",
        borderRadius: "12px",
        minWidth: "200px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(139, 92, 246,0.05)",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.12 }}
      role="menu"
      aria-label="Context menu"
    >
      {menuItems.map((item, i) => {
        if (item.type === "header") {
          return (
            <div
              key={i}
              className="px-3 py-1.5 text-xs font-semibold"
              style={{ color: "#8b5cf6" }}
            >
              {item.label}
            </div>
          );
        }
        if (item.type === "divider") {
          return (
            <div
              key={i}
              style={{ height: "1px", background: "rgba(139, 92, 246,0.1)", margin: "4px 0" }}
            />
          );
        }
        return (
          <button
            key={i}
            onClick={item.action}
            className="w-full text-left px-3 py-2 text-xs transition-colors"
            style={{ color: "#ddd6f3" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(139, 92, 246,0.1)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#ddd6f3";
            }}
            role="menuitem"
          >
            {item.label}
          </button>
        );
      })}
    </motion.div>
  );
}
