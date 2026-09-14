"use client";

import React from "react";
import Image from "next/image";
import { personal } from "@/content/data/personal";
import { ArrowDown, Download, Terminal, MapPin, Mic, ShieldCheck, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import AgentControlCoreFallback from "@/components/three/AgentControlCoreFallback";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction & Production Agent Architecture Console"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden command-grid"
    >
      {/* Subtle radial ambient background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unified Professional Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white mb-6 shadow-sm w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#6EE7A8] animate-pulse-dot" />
              <span className="text-white font-semibold">AI Systems &amp; Backend Engineer</span>
              <span className="text-white/20">•</span>
              <span className="text-[#989CA5]">NIT Kurukshetra</span>
              <span className="text-white/20">•</span>
              <span className="text-[#6EE7A8]">Available for Roles</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              I build AI systems that can be{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61F4DE] via-[#8B7CFF] to-white">
                trusted in production.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-[#989CA5] leading-relaxed max-w-2xl mb-8 font-sans">
              I’m <strong className="text-white font-medium">Rashmi Shaw</strong>, an AI systems and backend engineer building governed agents, real-time platforms, and event-driven services with Python, FastAPI, LangGraph, Kafka, Redis, and PostgreSQL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {/* Voice AI Primary Action */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-voice-assistant'))}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#61F4DE] to-[#4ee6ce] hover:brightness-110 text-[#050607] font-mono text-sm font-semibold transition-all duration-200 shadow-[0_0_24px_rgba(97,244,222,0.25)] hover:shadow-[0_0_32px_rgba(97,244,222,0.45)] hover:-translate-y-0.5 flex items-center gap-2"
                aria-label="Talk to Rashmi Voice AI"
              >
                <Mic className="w-4 h-4" />
                <span>Talk with Voice AI</span>
              </button>

              {/* Primary Systems CTA */}
              <a
                href="#work"
                className="px-5 py-3 rounded-xl bg-[#0B0D10] hover:bg-[#161A20] text-white border border-white/15 hover:border-white/30 font-mono text-sm font-medium transition-all duration-200 flex items-center gap-2"
              >
                <span>Explore Systems</span>
                <ArrowDown className="w-4 h-4 text-[#61F4DE]" />
              </a>

              {/* Secondary CTA */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-[#0B0D10] hover:bg-[#161A20] text-white border border-white/10 hover:border-white/20 font-mono text-sm font-medium transition-all duration-200 flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              {/* Resume Action */}
              <a
                href={personal.resumeUrl}
                download
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white border border-white/5 font-mono text-xs transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Résumé</span>
              </a>
            </div>

            {/* Terminal-Style Status Component */}
            <div className="rounded-xl bg-[#0B0D10]/95 border border-white/10 p-3.5 max-w-lg shadow-xl font-mono text-xs mb-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-[#989CA5]">
                <Terminal className="w-3.5 h-3.5 text-[#61F4DE]" />
                <span className="text-[11px] text-[#61F4DE]">$ current_focus</span>
              </div>
              <div className="space-y-1 text-[#989CA5] text-[11px]">
                {personal.terminalFocus.map((focus, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#61F4DE]">&gt;</span>
                    <span className="text-[#F4F4F5]">{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Relocation note */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#989CA5]">
              <MapPin className="w-3.5 h-3.5 text-[#61F4DE]" />
              <span>Kolkata, India · Open to remote work and relocation worldwide</span>
            </div>
          </div>

          {/* Right Column: Rock-Solid Interactive Agent Architecture Console */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <div className="w-full relative">
              <AgentControlCoreFallback />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
