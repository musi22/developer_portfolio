"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { personal } from "@/content/data/personal";
import { Menu, X, ExternalLink, Download, Terminal, ArrowUpRight, Command, Eye, Mic } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const NAV_LINKS = [
  { name: "Work", href: "/#work" },
  { name: "Engineering", href: "/#engineering" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function CommandNavbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "work", "engineering", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 pointer-events-none">
      <nav
        aria-label="Command Center Primary Navigation"
        className={`w-full max-w-6xl rounded-2xl border pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0D10]/85 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl py-2 px-3.5 sm:px-5"
            : "bg-[#0B0D10]/50 border-white/5 backdrop-blur-md py-2.5 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Monogram / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE] rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111418] border border-white/10 flex items-center justify-center font-mono text-sm font-bold text-white group-hover:border-[#61F4DE] group-hover:text-[#61F4DE] transition-colors shadow-inner">
              RS
            </div>
            <div className="hidden sm:block">
              <span className="font-mono text-xs font-semibold text-white tracking-wide block">
                {personal.name}
              </span>
              <span className="text-[10px] text-[#989CA5] block -mt-0.5">
                AI Systems & Backend
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 font-mono text-xs">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE] ${
                    isActive
                      ? "text-[#61F4DE] font-semibold bg-white/5"
                      : "text-[#989CA5] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#61F4DE] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Availability Badge & Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#6EE7A8]/10 border border-[#6EE7A8]/20 font-mono text-[11px] text-[#6EE7A8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7A8] animate-pulse-dot" />
              <span>Available for opportunities</span>
            </div>

            {/* Voice AI Assistant Trigger */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-voice-assistant'))}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#61F4DE]/10 hover:bg-[#61F4DE]/20 text-[#61F4DE] border border-[#61F4DE]/30 transition-all text-[11px] font-mono shadow-[0_0_12px_rgba(97,244,222,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE]"
              aria-label="Talk to Rashmi Voice AI"
            >
              <Mic className="w-3 h-3 animate-pulse text-[#61F4DE]" />
              <span className="font-semibold">Voice AI</span>
            </button>

            {/* Recruiter Overview */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-recruiter-panel'))}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white border border-white/5 transition-colors text-[11px] font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE]"
              aria-label="Open recruiter overview"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden xl:inline">60s Overview</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white border border-white/5 transition-colors text-[11px] font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE]"
              aria-label="Open command palette"
            >
              <Command className="w-3 h-3" />
              <kbd className="px-1 py-0.2 rounded bg-white/5 border border-white/5 text-[9px] text-[#656A74]">⌘K</kbd>
            </button>

            {/* GitHub */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#989CA5] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE]"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Resume button */}
            <a
              href={personal.resumeUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#61F4DE] hover:text-[#050607] text-xs font-mono font-medium text-white transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Résumé</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={personal.resumeUrl}
              download
              className="p-2 rounded-lg bg-white/5 text-white border border-white/10"
              aria-label="Download Résumé"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#61F4DE]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 border-t border-white/10 flex flex-col gap-3 font-mono text-sm animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Availability indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#6EE7A8]/10 border border-[#6EE7A8]/20 text-xs text-[#6EE7A8]">
              <span className="w-2 h-2 rounded-full bg-[#6EE7A8] animate-pulse-dot" />
              <span>Available for opportunities</span>
            </div>

            {/* Voice AI Assistant Trigger Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-voice-assistant'));
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#61F4DE]/10 border border-[#61F4DE]/30 text-[#61F4DE] font-semibold text-xs"
            >
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4 animate-pulse" />
                Talk with Rashmi Voice AI
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#61F4DE]/20 text-[#61F4DE]">LIVE</span>
            </button>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#989CA5]" />
              </Link>
            ))}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-white/5 text-white flex items-center justify-center gap-2 border border-white/5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-white/5 text-white flex items-center justify-center gap-2 border border-white/5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
