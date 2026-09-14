"use client";

import React, { useState } from "react";
import { engineeringSystems, SystemCapability } from "@/content/data/skills";
import { Cpu, Server, Network, Database, ShieldCheck, Check, Layers, Sparkles } from "lucide-react";

export default function EngineeringSystems() {
  const [selectedCategory, setSelectedCategory] = useState<string>(engineeringSystems[0].category);

  const activeSystem = engineeringSystems.find((s) => s.category === selectedCategory) || engineeringSystems[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#61F4DE]" />;
      case "Server":
        return <Server className="w-5 h-5 text-[#8B7CFF]" />;
      case "Network":
        return <Network className="w-5 h-5 text-[#61F4DE]" />;
      case "Database":
        return <Database className="w-5 h-5 text-[#F6C76B]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#6EE7A8]" />;
      default:
        return <Layers className="w-5 h-5 text-[#61F4DE]" />;
    }
  };

  return (
    <section
      id="engineering"
      aria-label="Engineering Capabilities & System Map"
      className="py-24 border-t border-white/10 relative command-grid-subtle"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Systems Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering Capabilities
          </h2>
          <p className="text-base sm:text-lg text-[#989CA5] max-w-3xl leading-relaxed">
            Represented as an interconnected system architecture—not arbitrary percentage bars. Each tier reflects production implementation experience with verifiable failure handling.
          </p>
        </div>

        {/* 5-Tier Layer Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {engineeringSystems.map((system) => {
            const isSelected = selectedCategory === system.category;
            return (
              <button
                key={system.category}
                type="button"
                onClick={() => setSelectedCategory(system.category)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#111418] border-[#61F4DE] text-white shadow-[0_0_20px_rgba(97,244,222,0.15)]"
                    : "bg-[#0B0D10]/80 border-white/5 text-[#989CA5] hover:border-white/15 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getIcon(system.iconName)}
                  <span className="font-mono text-[10px] text-[#656A74]">TIER</span>
                </div>
                <div className="font-mono text-xs font-semibold">{system.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                {getIcon(activeSystem.iconName)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {activeSystem.name}
                </h3>
                <p className="text-xs text-[#989CA5] font-mono mt-0.5">
                  SYSTEM LAYER SPECIFICATION
                </p>
              </div>
            </div>

            <div className="max-w-xl text-xs sm:text-sm text-[#989CA5] leading-relaxed">
              {activeSystem.description}
            </div>
          </div>

          {/* Production Context Banner */}
          <div className="p-4 rounded-xl bg-[#050607] border border-white/10 mb-8 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#61F4DE] font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Production Implementation Context</span>
            </div>
            <p className="text-[#989CA5] font-sans leading-relaxed text-xs sm:text-sm">
              {activeSystem.productionContext}
            </p>
          </div>

          {/* Technologies Grid */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#61F4DE] font-semibold mb-4">
              Core Technologies & Invariants
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeSystem.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#050607]/80 border border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                    <span className="text-white font-semibold">{tech.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        tech.level === "Production"
                          ? "bg-[#6EE7A8]/10 text-[#6EE7A8] border border-[#6EE7A8]/30"
                          : "bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30"
                      }`}
                    >
                      {tech.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#989CA5] leading-relaxed">
                    {tech.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
