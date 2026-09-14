"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { projects, EngineeringCaseStudy } from "@/content/data/projects";
import TrustPlatformTrace from "@/components/diagrams/TrustPlatformTrace";
import StreamAlphaFlow from "@/components/diagrams/StreamAlphaFlow";
import { usePortfolioSettings } from "@/components/interactive/PortfolioSettingsProvider";
import {
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Terminal,
  ChevronRight,
  Zap,
  ZapOff,
  Mic,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

const ArchitectureDiagram = dynamic(
  () => import("@/components/diagrams/ArchitectureDiagram"),
  { ssr: false, loading: () => null }
);

export default function FeaturedProjects() {
  const { architectureMode, toggleArchitectureMode } = usePortfolioSettings();

  return (
    <section id="work" aria-label="Featured Systems & Case Studies" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Production-Oriented Systems
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-base sm:text-lg text-[#989CA5] max-w-3xl leading-relaxed">
              Architectural decisions, reliability invariants, and empirical benchmarks from systems built to operate under real-world fault conditions.
            </p>
            {/* Architecture Mode Toggle */}
            <button
              type="button"
              onClick={toggleArchitectureMode}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono transition-all flex-shrink-0 ${
                architectureMode
                  ? "bg-[#8B7CFF]/15 border-[#8B7CFF]/40 text-[#8B7CFF] shadow-[0_0_12px_rgba(139,124,255,0.2)]"
                  : "bg-white/5 border-white/10 text-[#989CA5] hover:text-white hover:border-white/20"
              }`}
              aria-pressed={architectureMode}
              aria-label={architectureMode ? "Disable architecture mode" : "Enable architecture mode"}
            >
              {architectureMode ? (
                <ZapOff className="w-3.5 h-3.5" />
              ) : (
                <Zap className="w-3.5 h-3.5" />
              )}
              <span>{architectureMode ? "Exit Architecture" : "Architecture Mode"}</span>
            </button>
          </div>
        </div>

        {/* Projects Stack - Max 4 Flagship Case Studies */}
        <div className="space-y-20">
          {projects.slice(0, 4).map((project, index) => (
            <article
              key={project.slug}
              className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden command-panel-elevated"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-[#61F4DE] font-semibold tracking-wider">
                    0{index + 1} // CASE STUDY
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#989CA5]">
                    {project.category}
                  </span>
                </div>

                {/* External Actions */}
                <div className="flex items-center gap-3 font-mono text-xs">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#61F4DE]/10 hover:bg-[#61F4DE] text-[#61F4DE] hover:text-[#050607] border border-[#61F4DE]/30 font-semibold transition-all shadow-[0_0_12px_rgba(97,244,222,0.15)]"
                    >
                      <span>Live Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.apiDocsUrl && (
                    <a
                      href={project.apiDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white border border-white/10 transition-colors"
                    >
                      <span>API Swagger</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    <span>Full Spec</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Interactive Trace or Architecture Diagram */}
                <div className="lg:col-span-7">
                  {architectureMode ? (
                    <ArchitectureDiagram projectSlug={project.slug} />
                  ) : (
                    <>
                      {project.interactiveType === "trust-platform-trace" && (
                        <TrustPlatformTrace />
                      )}
                      {project.interactiveType === "streamalpha-flow" && (
                        <StreamAlphaFlow />
                      )}
                      {project.interactiveType !== "trust-platform-trace" &&
                        project.interactiveType !== "streamalpha-flow" && (
                          <div className="rounded-xl bg-[#050607] border border-white/10 p-6 font-mono text-xs text-[#989CA5] space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <span className="text-white font-semibold flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-[#61F4DE]" />
                                Architecture Topology
                              </span>
                              <span className="text-[#6EE7A8] text-[11px]">VERIFIED IN PROD</span>
                            </div>
                            <p className="leading-relaxed font-sans text-xs text-[#E4E4E7]">
                              {project.architectureDescription}
                            </p>
                            <div className="pt-2">
                              <div className="text-[11px] text-[#989CA5] uppercase tracking-wider mb-2 font-semibold">
                                Security & Reliability Guardrails
                              </div>
                              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-[#989CA5] font-sans">
                                {project.reliabilitySecurityMechanisms.slice(0, 3).map((mech, mIdx) => (
                                  <li key={mIdx}>{mech}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </div>

                {/* Right Column: Title, Problem, Key Engineering Decisions, Outcomes */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#61F4DE] mb-3">{project.role}</p>
                    <p className="text-sm text-[#989CA5] leading-relaxed font-sans">
                      {project.summary}
                    </p>
                  </div>

                  {/* The Critical Problem Solved */}
                  <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4 font-mono text-xs">
                    <div className="text-[#F87171] uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">
                      <span>Problem Space</span>
                    </div>
                    <p className="text-xs text-[#989CA5] font-sans leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* Key Engineering Decisions (First 2) */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#989CA5]">
                      Key Architectural Decisions
                    </h4>
                    {project.keyEngineeringDecisions.slice(0, 2).map((dec, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-lg bg-[#050607] border border-white/10 font-mono text-xs"
                      >
                        <div className="text-white font-semibold mb-1 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#61F4DE] flex-shrink-0 mt-0.5" />
                          <span>{dec.decision}</span>
                        </div>
                        <p className="text-[11px] text-[#989CA5] font-sans pl-5 leading-relaxed">
                          {dec.rationale}
                        </p>
                        <div className="mt-1.5 pl-5 text-[10px] text-[#656A74] font-mono">
                          <span className="text-[#FBBF24]">Tradeoff:</span> {dec.tradeoff}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empirical Measured Results Table */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#61F4DE] font-semibold mb-2.5">
                      Measured Production Outcomes
                    </h4>
                    <div className="rounded-lg bg-[#050607] border border-white/10 overflow-hidden font-mono text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/5 text-[#989CA5] text-[11px]">
                            <th className="p-2.5 font-medium">Metric</th>
                            <th className="p-2.5 font-medium">Result</th>
                            <th className="p-2.5 font-medium">Delta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {project.measuredResults.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02]">
                              <td className="p-2.5 text-white font-medium">{row.metric}</td>
                              <td className="p-2.5 text-[#6EE7A8]">{row.guarded}</td>
                              <td className="p-2.5 text-[#989CA5] text-[11px]">{row.delta}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#989CA5] mb-2">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#F4F4F5]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* GitHub Repository Hub — All Other Projects & Codebases */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0B0D10] via-[#0E1318] to-[#0B0D10] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider mb-2">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Full Repository Catalog</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Explore All Other Projects on GitHub
            </h3>
            <p className="text-sm text-[#989CA5] leading-relaxed font-sans">
              Beyond these 4 production case studies, all additional experimental prototypes, algorithm benchmarks, utility libraries, and engineering repositories are maintained publicly on GitHub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto flex-shrink-0">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-voice-assistant"))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs text-white transition-all"
            >
              <Mic className="w-3.5 h-3.5 text-[#61F4DE] animate-pulse" />
              <span>Ask Voice AI</span>
            </button>
            <a
              href="https://github.com/musi22"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] font-semibold font-mono text-xs transition-all shadow-[0_0_20px_rgba(97,244,222,0.25)] hover:shadow-[0_0_30px_rgba(97,244,222,0.4)]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View All on GitHub (@musi22)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
