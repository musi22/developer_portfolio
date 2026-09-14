"use client";

import React from "react";
import { personal } from "@/content/data/personal";
import { ExternalLink, ShieldCheck, Zap, Award, Target } from "lucide-react";

export default function ProofStrip() {
  const icons = [Award, Zap, Target, ShieldCheck];

  return (
    <section
      aria-label="Verified Engineering Proof Points"
      className="border-y border-white/10 bg-[#080B0F]/90 backdrop-blur-xl relative z-20 py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personal.proofMetrics.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0E131A]/80 hover:bg-[#111722] hover:border-[#61F4DE]/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(97,244,222,0.12)] group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight group-hover:text-[#61F4DE] transition-colors">
                      {item.metric}
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#61F4DE] group-hover:bg-[#61F4DE]/10 group-hover:border-[#61F4DE]/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white mb-2">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#989CA5] leading-relaxed font-sans">
                    {item.context}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#61F4DE] hover:text-white transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
