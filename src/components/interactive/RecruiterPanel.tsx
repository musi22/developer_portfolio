"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { personal } from "@/content/data/personal";
import { projects } from "@/content/data/projects";
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const CORE_STRENGTHS = [
  "Agent orchestration and AI safety",
  "Python and FastAPI backends",
  "Kafka-based event-driven systems",
  "PostgreSQL and Redis",
  "Real-time WebSocket infrastructure",
  "Testing, observability and failure handling",
];

const TOP_PROOF = [
  {
    metric: "100%",
    label: "Guarded task success (from 60%)",
    context: "In controlled 20-scenario benchmark",
  },
  {
    metric: "0%",
    label: "Unauthorized actions (from 5%)",
    context: "In same controlled benchmark",
  },
  {
    metric: "65%",
    label: "API latency reduction",
    context: "JobTaker API via caching & pooling",
  },
  {
    metric: "5K+",
    label: "Concurrent users load tested",
    context: "StreamAlpha streaming platform",
  },
  {
    metric: "500+",
    label: "DSA problems solved",
    context: "LeetCode algorithmic practice",
  },
];

export default function RecruiterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    // Remove query param
    const url = new URL(window.location.href);
    url.searchParams.delete("view");
    window.history.replaceState({}, "", url.toString());
  }, []);

  // Listen for custom event from command palette
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-recruiter-panel", handler);
    return () => window.removeEventListener("open-recruiter-panel", handler);
  }, []);

  // Check URL param on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("view") === "recruiter") {
      setIsOpen(true);
    }
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Recruiter Quick-Scan Overview"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0B0D10]/98 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] print:shadow-none print:border-none print:bg-white print:text-black"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white transition-colors print:hidden z-10"
          aria-label="Close recruiter panel"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#61F4DE] print:text-teal-600" />
            <span className="text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider print:text-teal-600">
              60-Second Overview
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 print:text-black">
            {personal.name}
          </h2>
          <p className="text-base text-[#989CA5] font-mono mb-1 print:text-gray-600">
            {personal.title}
          </p>
          <p className="text-xs text-[#656A74] font-mono mb-6 print:text-gray-500">
            {personal.location} · {personal.workPreference}
          </p>

          {/* Core Strengths */}
          <div className="mb-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#61F4DE] font-semibold mb-3 print:text-teal-600">
              Core Strengths
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CORE_STRENGTHS.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 text-sm text-[#F4F4F5] print:text-black"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7A8] flex-shrink-0 print:text-green-600" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Proof */}
          <div className="mb-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#61F4DE] font-semibold mb-3 print:text-teal-600">
              Top Proof (Benchmark Data)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOP_PROOF.map((p) => (
                <div
                  key={p.label}
                  className="p-2.5 rounded-lg bg-[#050607] border border-white/5 print:border-gray-200"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#61F4DE] font-mono print:text-teal-600">
                      {p.metric}
                    </span>
                    <span className="text-xs text-[#F4F4F5] print:text-black">
                      {p.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#656A74] print:text-gray-500">
                    {p.context}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Projects */}
          <div className="mb-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#61F4DE] font-semibold mb-3 print:text-teal-600">
              Top Projects
            </h3>
            <div className="space-y-2">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#050607] border border-white/5 print:border-gray-200"
                >
                  <div>
                    <span className="text-sm text-white font-semibold font-mono print:text-black">
                      {p.title}
                    </span>
                    <span className="block text-[10px] text-[#989CA5] print:text-gray-500">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 print:hidden">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-white/5 text-[#61F4DE] hover:bg-white/10 transition-colors"
                        aria-label={`View ${p.title} live`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-white/5 text-[#989CA5] hover:text-white hover:bg-white/10 transition-colors"
                      aria-label={`View ${p.title} source`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 print:border-gray-200">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#989CA5] font-semibold mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 print:hidden">
              <a
                href={personal.resumeUrl}
                download
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] font-mono text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Résumé
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#6EE7A8]" />
                    <span className="text-[#6EE7A8]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Email
                  </>
                )}
              </button>
            </div>

            {/* Print-only info */}
            <div className="hidden print:block text-sm text-gray-600 mt-2">
              <p>Email: {personal.email}</p>
              <p>GitHub: {personal.github}</p>
              <p>LinkedIn: {personal.linkedin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
