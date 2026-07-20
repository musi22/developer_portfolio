"use client";

import { useState, useCallback, useRef } from "react";
import type { AppWindow, WindowId, WindowState, WindowSize, WindowPosition } from "@/types/window";
import { getAppById, APP_DEFINITIONS } from "@/utils/constants";
import { generateId } from "@/lib/utils";

const BASE_OFFSET_X = 60;
const BASE_OFFSET_Y = 60;
const STAGGER = 28;

function getDefaultPosition(openCount: number): WindowPosition {
  return {
    x: BASE_OFFSET_X + (openCount % 6) * STAGGER,
    y: BASE_OFFSET_Y + (openCount % 4) * STAGGER,
  };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  // Derived from `windows` (the single source of truth for isActive) rather
  // than tracked in parallel state, which previously could desync — e.g. a
  // freshly opened window's id was never reflected here.
  const activeWindowId = windows.find((w) => w.isActive)?.id ?? null;
  const zCounter = useRef(10);
  const openCountRef = useRef(0);

  const openWindow = useCallback((appId: WindowId) => {
    const appDef = getAppById(appId);
    if (!appDef) return;

    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        // Restore if minimized, then focus
        const newZ = ++zCounter.current;
        return prev.map((w) =>
          w.id === existing.id
            ? { ...w, state: "normal" as WindowState, zIndex: newZ, isActive: true }
            : { ...w, isActive: false }
        );
      }

      // Create new window
      const newZ = ++zCounter.current;
      openCountRef.current++;
      const position = getDefaultPosition(openCountRef.current);

      const newWindow: AppWindow = {
        id: generateId(),
        appId,
        title: appDef.title,
        icon: appDef.icon,
        position,
        size: appDef.defaultSize,
        state: "normal",
        zIndex: newZ,
        isActive: true,
      };

      return [...prev.map((w) => ({ ...w, isActive: false })), newWindow];
    });
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, state: "minimized" as WindowState, isActive: false } : w
      )
    );
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? {
              ...w,
              state: (w.state === "maximized" ? "normal" : "maximized") as WindowState,
            }
          : w
      )
    );
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    const newZ = ++zCounter.current;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, zIndex: newZ, isActive: true, state: w.state === "minimized" ? "normal" : w.state }
          : { ...w, isActive: false }
      )
    );
  }, []);

  const moveWindow = useCallback((windowId: string, position: WindowPosition) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, position } : w))
    );
  }, []);

  const resizeWindow = useCallback((windowId: string, size: WindowSize) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, size } : w))
    );
  }, []);

  const isOpen = useCallback(
    (appId: WindowId) => windows.some((w) => w.appId === appId && w.state !== "minimized"),
    [windows]
  );

  const isMinimized = useCallback(
    (appId: WindowId) => windows.some((w) => w.appId === appId && w.state === "minimized"),
    [windows]
  );

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    isOpen,
    isMinimized,
  };
}
