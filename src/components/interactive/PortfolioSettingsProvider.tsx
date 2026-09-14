"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface PortfolioSettings {
  architectureMode: boolean;
  toggleArchitectureMode: () => void;
  motionReduced: boolean;
}

const SettingsContext = createContext<PortfolioSettings>({
  architectureMode: false,
  toggleArchitectureMode: () => {},
  motionReduced: false,
});

export function usePortfolioSettings() {
  return useContext(SettingsContext);
}

export function PortfolioSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [architectureMode, setArchitectureMode] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  // Load architecture mode from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("architecture-mode");
      if (stored === "true") setArchitectureMode(true);
    } catch {}
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMotionReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleArchitectureMode = useCallback(() => {
    setArchitectureMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("architecture-mode", String(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        architectureMode,
        toggleArchitectureMode,
        motionReduced,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
