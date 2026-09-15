"use client";

import React from "react";
import Link from "next/link";
import { personal } from "@/content/data/personal";
import { ExternalLink, ShieldCheck, Terminal, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function CommandFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050607] py-12 relative font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/5">
          {/* Brand & Positioning */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#111418] border border-white/10 flex items-center justify-center font-bold text-white text-[10px]">
                RS
              </div>
              <span className="text-white font-semibold text-sm">{personal.name}</span>
            </div>
            <p className="text-[#989CA5] max-w-sm text-xs font-sans">
              AI Systems & Backend Engineer building reliable agent state machines and real-time distributed platforms.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap gap-6 text-[#989CA5]">
            <a href="#hero" className="hover:text-white transition-colors">Hero</a>
            <a href="#work" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#engineering" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0B0D10] text-[#989CA5] hover:text-white border border-white/10 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0B0D10] text-[#989CA5] hover:text-white border border-white/10 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#0B0D10] text-[#989CA5] hover:text-white border border-white/10 transition-colors text-[11px]"
              aria-label="LeetCode Profile"
            >
              LeetCode
            </a>
          </div>
        </div>

        {/* Bottom Status bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 text-[11px] text-[#656A74]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6EE7A8] animate-pulse-dot" />
            <span className="text-[#989CA5]">All Systems Operational · Built with ☕ by Rashmi Shaw</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Kolkata, India // Worldwide Remote</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} Rashmi Shaw</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
