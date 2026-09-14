"use client";

import React, { useState, useEffect, useCallback } from "react";

const TRACE_STATES = [
  { id: "hero", label: "BOOT", section: "hero" },
  { id: "proof", label: "PROFILE_LOADED", section: "hero" },
  { id: "work", label: "PROJECTS_INDEXED", section: "work" },
  { id: "engineering", label: "ARCHITECTURE_READY", section: "engineering" },
  { id: "about", label: "ABOUT_LOADED", section: "about" },
  { id: "contact", label: "CONTACT_AVAILABLE", section: "contact" },
];

export default function ExecutionTrace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = TRACE_STATES.findIndex(
              (s) => s.section === entry.target.id
            );
            if (idx !== -1) {
              setActiveIndex(idx);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -40% 0px" }
    );

    // Observe sections
    TRACE_STATES.forEach((state) => {
      const el = document.getElementById(state.section);
      if (el) observer.observe(el);
    });

    // Track overall scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: Vertical execution trace */}
      <div
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-0"
        role="navigation"
        aria-label="Execution trace navigation"
      >
        {TRACE_STATES.map((state, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <React.Fragment key={state.id}>
              {/* Connector line */}
              {i > 0 && (
                <div
                  className={`w-[1px] h-5 transition-colors duration-500 ${
                    isActive ? "bg-[#61F4DE]/40" : "bg-white/8"
                  }`}
                />
              )}

              {/* Node */}
              <button
                type="button"
                onClick={() => scrollToSection(state.section)}
                className="group relative flex items-center"
                aria-label={`Navigate to ${state.label}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {/* Dot */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isCurrent
                      ? "bg-[#61F4DE] shadow-[0_0_8px_rgba(97,244,222,0.6)] scale-125"
                      : isActive
                      ? "bg-[#61F4DE]/50"
                      : "bg-white/15"
                  }`}
                />

                {/* Label (on hover or active) */}
                <span
                  className={`absolute left-5 whitespace-nowrap font-mono text-[9px] tracking-wider transition-all duration-300 ${
                    isCurrent
                      ? "opacity-100 text-[#61F4DE] font-semibold"
                      : "opacity-0 group-hover:opacity-100 text-[#989CA5]"
                  }`}
                >
                  {state.label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: Thin progress bar with section markers */}
      <div
        className="fixed top-0 left-0 right-0 z-30 xl:hidden h-[3px] bg-[#0B0D10]/80"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        {/* Progress fill */}
        <div
          className="h-full bg-gradient-to-r from-[#61F4DE] to-[#8B7CFF] transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        {/* Section markers */}
        {TRACE_STATES.map((state, i) => {
          const position = (i / (TRACE_STATES.length - 1)) * 100;
          const isActive = i <= activeIndex;
          return (
            <button
              key={state.id}
              type="button"
              onClick={() => scrollToSection(state.section)}
              className={`absolute top-0 w-1.5 h-[3px] -translate-x-1/2 transition-colors ${
                isActive ? "bg-[#61F4DE]" : "bg-white/20"
              }`}
              style={{ left: `${position}%` }}
              aria-label={state.label}
            />
          );
        })}
      </div>
    </>
  );
}
