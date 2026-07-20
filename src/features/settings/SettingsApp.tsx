"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Palette, Zap, ZapOff, Type, MousePointer } from "lucide-react";
import { useSettings, type AccentColor } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";

const ACCENT_COLORS: { id: AccentColor; label: string; color: string }[] = [
  { id: "pink", label: "Hot Pink", color: "#8b5cf6" },
  { id: "red", label: "Crimson Red", color: "#4f46e5" },
  { id: "rose", label: "Rose", color: "#22d3ee" },
  { id: "crimson", label: "Deep Crimson", color: "#3730a3" },
  { id: "orange", label: "Orange", color: "#f97316" },
  { id: "violet", label: "Violet", color: "#8b5cf6" },
];

const FONT_SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

const CURSOR_EFFECTS = [
  { id: "none", label: "None" },
  { id: "glow", label: "Glow" },
  { id: "trail", label: "Trail" },
] as const;

function Section({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-4 mb-3">
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
        style={{ color: "#8b5cf6" }}
      >
        <Icon size={12} aria-hidden="true" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full"
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span className="text-sm" style={{ color: "#ddd6f3" }}>{label}</span>
      <div
        className="relative w-10 h-5 rounded-full transition-all"
        style={{
          background: checked ? "rgba(139, 92, 246,0.3)" : "rgba(139, 92, 246,0.06)",
          border: checked ? "1px solid rgba(139, 92, 246,0.5)" : "1px solid rgba(139, 92, 246,0.15)",
        }}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 rounded-full"
          style={{
            background: checked ? "#8b5cf6" : "#4d4270",
            boxShadow: checked ? "0 0 8px rgba(139, 92, 246,0.5)" : "none",
          }}
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </div>
    </button>
  );
}

export default function SettingsApp() {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <div
      className="h-full overflow-y-auto p-5"
      style={{ background: "rgba(8, 5, 15,0.4)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-xl font-display font-bold"
          style={{ color: "#8b5cf6" }}
        >
          Settings
        </h2>
        <button
          onClick={resetSettings}
          className="text-xs transition-colors"
          style={{ color: "#4d4270" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4d4270")}
          aria-label="Reset all settings to defaults"
        >
          Reset to defaults
        </button>
      </div>

      {/* Appearance */}
      <Section title="Appearance" icon={Palette}>
        {/* Theme toggle */}
        <div className="mb-4">
          <div className="text-xs mb-2" style={{ color: "#9186b0" }}>
            Color Mode
          </div>
          <div className="flex gap-2">
            {(["dark", "light"] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => updateSetting("theme", theme)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all flex-1"
                style={{
                  background:
                    settings.theme === theme
                      ? "rgba(139, 92, 246,0.15)"
                      : "rgba(139, 92, 246,0.04)",
                  border:
                    settings.theme === theme
                      ? "1px solid rgba(139, 92, 246,0.35)"
                      : "1px solid rgba(139, 92, 246,0.1)",
                  color: settings.theme === theme ? "#8b5cf6" : "#4d4270",
                }}
                aria-pressed={settings.theme === theme}
              >
                {theme === "dark" ? <Moon size={12} aria-hidden="true" /> : <Sun size={12} aria-hidden="true" />}
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Accent colors */}
        <div>
          <div className="text-xs mb-2" style={{ color: "#9186b0" }}>
            Accent Color
          </div>
          <div className="flex flex-wrap gap-2">
            {ACCENT_COLORS.map((ac) => (
              <button
                key={ac.id}
                onClick={() => updateSetting("accentColor", ac.id)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background:
                    settings.accentColor === ac.id
                      ? `${ac.color}20`
                      : "rgba(139, 92, 246,0.04)",
                  border:
                    settings.accentColor === ac.id
                      ? `1.5px solid ${ac.color}`
                      : "1px solid rgba(139, 92, 246,0.1)",
                  color: settings.accentColor === ac.id ? ac.color : "#4d4270",
                }}
                aria-pressed={settings.accentColor === ac.id}
                aria-label={`Set accent color to ${ac.label}`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: ac.color, boxShadow: settings.accentColor === ac.id ? `0 0 6px ${ac.color}` : "none" }}
                  aria-hidden="true"
                />
                {ac.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Animations */}
      <Section title="Animations" icon={Zap}>
        <div className="flex flex-col gap-3">
          <Toggle
            checked={settings.animationsEnabled}
            onChange={(v) => updateSetting("animationsEnabled", v)}
            label="Enable Animations"
          />
          <Toggle
            checked={settings.showParticles}
            onChange={(v) => updateSetting("showParticles", v)}
            label="Show Particles"
          />
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography" icon={Type}>
        <div className="text-xs mb-2" style={{ color: "#9186b0" }}>
          Font Size
        </div>
        <div className="flex gap-2">
          {FONT_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => updateSetting("fontSize", size.id)}
              className="flex-1 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background:
                  settings.fontSize === size.id
                    ? "rgba(139, 92, 246,0.15)"
                    : "rgba(139, 92, 246,0.04)",
                border:
                  settings.fontSize === size.id
                    ? "1px solid rgba(139, 92, 246,0.35)"
                    : "1px solid rgba(139, 92, 246,0.1)",
                color: settings.fontSize === size.id ? "#8b5cf6" : "#4d4270",
              }}
              aria-pressed={settings.fontSize === size.id}
            >
              {size.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Cursor */}
      <Section title="Cursor Effects" icon={MousePointer}>
        <div className="flex gap-2">
          {CURSOR_EFFECTS.map((effect) => (
            <button
              key={effect.id}
              onClick={() => updateSetting("cursorEffect", effect.id)}
              className="flex-1 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background:
                  settings.cursorEffect === effect.id
                    ? "rgba(139, 92, 246,0.15)"
                    : "rgba(139, 92, 246,0.04)",
                border:
                  settings.cursorEffect === effect.id
                    ? "1px solid rgba(139, 92, 246,0.35)"
                    : "1px solid rgba(139, 92, 246,0.1)",
                color: settings.cursorEffect === effect.id ? "#8b5cf6" : "#4d4270",
              }}
              aria-pressed={settings.cursorEffect === effect.id}
            >
              {effect.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Storage note */}
      <p className="text-xs text-center" style={{ color: "#4d4270" }}>
        Settings are saved automatically to localStorage.
      </p>
    </div>
  );
}
