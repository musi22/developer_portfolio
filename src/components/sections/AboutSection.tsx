"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { personal } from "@/content/data/personal";
import { GraduationCap, HeartHandshake, User, ArrowRight, ShieldCheck, Award, Mic } from "lucide-react";

const PortfolioTerminal = dynamic(
  () => import("@/components/interactive/PortfolioTerminal"),
  { ssr: false, loading: () => null }
);

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Rashmi Shaw & Academic Background"
      className="py-24 border-t border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Background & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider mb-4">
              <User className="w-3.5 h-3.5" />
              <span>Background & Principles</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Engineering AI Systems That Survive the Demo
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#989CA5] leading-relaxed">
              <p>
                {personal.bio}
              </p>
              <p>
                {personal.bioSecondary}
              </p>
            </div>

            {/* Core Working Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#0B0D10] border border-white/10">
                <div className="text-[#61F4DE] font-semibold mb-1">
                  DETERMINISTIC BOUNDARIES
                </div>
                <p className="text-[#989CA5] font-sans text-xs leading-relaxed">
                  Probabilistic models are brilliant at synthesis and reasoning, but must never be allowed unvalidated write access to production databases.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D10] border border-white/10">
                <div className="text-[#8B7CFF] font-semibold mb-1">
                  BACKPRESSURE & FAULT TOLERANCE
                </div>
                <p className="text-[#989CA5] font-sans text-xs leading-relaxed">
                  High-frequency streams must withstand downstream lag gracefully through bounded ring buffers and proactive backoff rather than silent memory death.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Credentials & Leadership */}
          <div className="lg:col-span-5 space-y-6">
            {/* Engineer Avatar & Voice AI Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-5 shadow-xl relative overflow-hidden command-panel flex items-center gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#61F4DE]/40 shadow-[0_0_20px_rgba(97,244,222,0.2)] flex-shrink-0">
                <Image
                  src="/avatar.jpg"
                  alt="Rashmi Shaw - AI Systems Engineer"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-base">{personal.name}</span>
                  <span className="w-2 h-2 rounded-full bg-[#6EE7A8] animate-pulse-dot" />
                </div>
                <p className="text-xs text-[#989CA5] font-mono leading-tight">
                  NIT Kurukshetra · AI Systems & Backend
                </p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-voice-assistant'))}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#61F4DE]/10 hover:bg-[#61F4DE]/20 text-[#61F4DE] border border-[#61F4DE]/30 text-xs font-mono transition-all"
                >
                  <Mic className="w-3.5 h-3.5 animate-pulse" />
                  <span>Talk with My Voice AI</span>
                </button>
              </div>
            </div>

            {/* Education Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-6 shadow-xl relative overflow-hidden command-panel">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#61F4DE]/10 border border-[#61F4DE]/20 text-[#61F4DE]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-white">
                    Education & Credentials
                  </h3>
                  <span className="text-[11px] font-mono text-[#989CA5]">
                    {personal.education.period}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">
                  {personal.education.institution}
                </h4>
                <div className="flex items-center justify-between font-mono text-xs text-[#989CA5] pb-2 border-b border-white/5">
                  <span>{personal.education.degree}</span>
                  <span className="text-[#6EE7A8] font-semibold">
                    CGPA: {personal.education.cgpa}
                  </span>
                </div>
                <p className="text-xs text-[#989CA5] leading-relaxed pt-1">
                  {personal.education.highlights[0]}
                </p>
                <p className="text-xs text-[#989CA5] leading-relaxed">
                  {personal.education.highlights[1]}
                </p>
              </div>
            </div>

            {/* Leadership & Social Impact Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0B0D10] p-6 shadow-xl relative overflow-hidden command-panel">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#8B7CFF]/10 border border-[#8B7CFF]/20 text-[#8B7CFF]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-white">
                    Leadership & Community Impact
                  </h3>
                  <span className="text-[11px] font-mono text-[#989CA5]">
                    {personal.leadership.role}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  {personal.leadership.organization}
                </h4>
                <p className="text-xs text-[#989CA5] leading-relaxed mb-4">
                  {personal.leadership.summary}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-[#050607] border border-white/5">
                    <span className="text-lg font-bold text-[#61F4DE] block">
                      {personal.leadership.studentsImpacted}+
                    </span>
                    <span className="text-[10px] text-[#989CA5]">Students Reached</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050607] border border-white/5">
                    <span className="text-lg font-bold text-[#8B7CFF] block">
                      {personal.leadership.volunteersCoordinated}+
                    </span>
                    <span className="text-[10px] text-[#989CA5]">Volunteers Coordinated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal */}
            <PortfolioTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
