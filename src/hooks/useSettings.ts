"use client";

import { useState, useEffect, useCallback } from "react";

export type AccentColor = "pink" | "red" | "rose" | "crimson" | "orange" | "violet";
export type FontSize = "sm" | "md" | "lg";
export type CursorEffect = "none" | "glow" | "trail";

export interface Settings {
  theme: "dark" | "light";
  accentColor: AccentColor;
  animationsEnabled: boolean;
  fontSize: FontSize;
  cursorEffect: CursorEffect;
  showParticles: boolean;
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  accentColor: "pink",
  animationsEnabled: true,
  fontSize: "md",
  cursorEffect: "glow",
  showParticles: true,
  soundEnabled: false,
};

const STORAGE_KEY = "portfolio-os-settings";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Settings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }
  }, [settings, isLoaded]);

  const updateSetting = useCallback(<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, updateSetting, resetSettings, isLoaded };
}
