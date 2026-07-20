
"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Maximize2 } from "lucide-react";
import type { AppWindow } from "@/types/window";
import { cn } from "@/lib/utils";

interface WindowProps {
  window: AppWindow;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
}: WindowProps) {
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const isMaximized = win.state === "maximized";
  const isMinimized = win.state === "minimized";

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isMaximized) dragControls.start(e);
      onFocus(win.id);
    },
    [dragControls, isMaximized, onFocus, win.id]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      if (isMaximized) return;
      onMove(win.id, {
        x: win.position.x + info.offset.x,
        y: win.position.y + info.offset.y,
      });
    },
    [isMaximized, onMove, win.id, win.position]
  );

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        position: "fixed" as const,
        inset: "48px 0 72px 0",
        borderRadius: 0,
        zIndex: win.zIndex,
      }
    : {
        position: "fixed" as const,
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      };

  return (
    <AnimatePresence>
      <motion.div
        key={win.id}
        style={windowStyle}
        className={cn("window flex flex-col", win.isActive && "window-active")}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        drag={!isMaximized}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        onPointerDown={() => onFocus(win.id)}
        whileDrag={{ boxShadow: "0 48px 120px rgba(0,0,0,0.8), 0 0 60px rgba(139, 92, 246,0.15)" }}
        aria-label={`${win.title} window`}
        role="dialog"
        aria-modal="false"
      >
        {/* Window Header */}
        <div
          className="window-header select-none"
          onPointerDown={handlePointerDown}
          onDoubleClick={() => onMaximize(win.id)}
          style={{ touchAction: "none" }}
        >
          {/* Traffic Lights */}
          <div className="traffic-lights" role="group" aria-label="Window controls">
            <button
              className="traffic-light traffic-light-close"
              onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
              aria-label={`Close ${win.title}`}
              title="Close"
            />
            <button
              className="traffic-light traffic-light-minimize"
              onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
              aria-label={`Minimize ${win.title}`}
              title="Minimize"
            />
            <button
              className="traffic-light traffic-light-maximize"
              onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
              aria-label={`${isMaximized ? "Restore" : "Maximize"} ${win.title}`}
              title={isMaximized ? "Restore" : "Maximize"}
            />
          </div>

          {/* Title */}
          <div
            className="flex-1 text-center text-xs font-medium pointer-events-none"
            style={{ color: "#9186b0" }}
          >
            <span style={{ marginRight: "6px" }}>{win.icon}</span>
            {win.title}
          </div>

          {/* Right spacer (equal to traffic lights width) */}
          <div style={{ width: "54px" }} />
        </div>

        {/* Window Content */}
        <div className="window-content" style={{ minHeight: 0, flex: 1 }}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
