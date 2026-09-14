"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Monitor,
  Zap,
  ZapOff,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";

interface StatusItem {
  label: string;
  value: string;
  status: "ok" | "warn" | "error" | "neutral";
}

export default function StatusPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [motionReduced, setMotionReduced] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [githubStatus, setGithubStatus] = useState<"ok" | "error">("ok");
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>("");

  // Check WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglAvailable(!!gl);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMotionReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track current section
  useEffect(() => {
    const sections = [
      "hero",
      "work",
      "engineering",
      "open-source",
      "about",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Check GitHub API
  useEffect(() => {
    const checkGithub = async () => {
      try {
        const res = await fetch("https://api.github.com/users/musi22", {
          method: "HEAD",
        });
        setGithubStatus(res.ok ? "ok" : "error");
        if (res.ok) {
          setLastRefresh(new Date().toLocaleTimeString());
        }
      } catch {
        setGithubStatus("error");
      }
    };

    checkGithub();

    // Count repos from DOM
    const repoCards = document.querySelectorAll('[data-repo-card]');
    if (repoCards.length > 0) {
      setRepoCount(repoCards.length);
    }
  }, []);

  const items: StatusItem[] = [
    {
      label: "GitHub API",
      value: githubStatus === "ok" ? "Available" : "Unavailable",
      status: githubStatus === "ok" ? "ok" : "error",
    },
    {
      label: "WebGL",
      value: webglAvailable ? "Enabled" : "Fallback",
      status: webglAvailable ? "ok" : "warn",
    },
    {
      label: "Motion",
      value: motionReduced ? "Reduced" : "Full",
      status: "neutral",
    },
    {
      label: "Theme",
      value: "Dark",
      status: "neutral",
    },
    {
      label: "Section",
      value: currentSection.replace(/-/g, " ").toUpperCase(),
      status: "neutral",
    },
    {
      label: "Last Refresh",
      value: lastRefresh || "—",
      status: "neutral",
    },
  ];

  if (repoCount !== null) {
    items.push({
      label: "Public Repos",
      value: `${repoCount}`,
      status: "neutral",
    });
  }

  const statusColor = (s: StatusItem["status"]) => {
    switch (s) {
      case "ok":
        return "text-[#6EE7A8]";
      case "warn":
        return "text-[#F6C76B]";
      case "error":
        return "text-[#F87171]";
      default:
        return "text-[#989CA5]";
    }
  };

  const statusDot = (s: StatusItem["status"]) => {
    switch (s) {
      case "ok":
        return "bg-[#6EE7A8]";
      case "warn":
        return "bg-[#F6C76B]";
      case "error":
        return "bg-[#F87171]";
      default:
        return "bg-[#656A74]";
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 font-mono text-[10px]">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-200 ${
          isExpanded
            ? "bg-[#0B0D10] border-white/15 text-white"
            : "bg-[#0B0D10]/80 border-white/8 text-[#656A74] hover:text-[#989CA5] hover:border-white/12"
        }`}
        aria-label={isExpanded ? "Collapse status panel" : "Expand status panel"}
        aria-expanded={isExpanded}
      >
        <Activity className="w-3 h-3 text-[#61F4DE]" />
        <span className="hidden sm:inline">STATUS</span>
        {isExpanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronUp className="w-3 h-3" />
        )}
      </button>

      {/* Expanded panel */}
      {isExpanded && (
        <div className="absolute bottom-9 left-0 w-56 rounded-xl border border-white/10 bg-[#0B0D10]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-[#61F4DE] font-semibold uppercase tracking-wider text-[9px]">
              System Status
            </span>
            <Eye className="w-3 h-3 text-[#656A74]" />
          </div>

          <div className="p-2.5 space-y-1.5">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-0.5"
              >
                <span className="text-[#656A74]">{item.label}</span>
                <span className={`flex items-center gap-1 ${statusColor(item.status)}`}>
                  <span
                    className={`w-1 h-1 rounded-full ${statusDot(item.status)}`}
                  />
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="px-3 py-1.5 border-t border-white/5 text-[8px] text-[#656A74]">
            Portfolio diagnostic panel · Real state only
          </div>
        </div>
      )}
    </div>
  );
}
