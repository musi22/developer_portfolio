"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/content/data/skills";
import type { SkillGroup, Skill } from "@/types/skill";
import { cn } from "@/lib/utils";

function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{skill.icon}</span>
          <span className="text-xs font-medium" style={{ color: "#ddd6f3" }}>
            {skill.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "#4d4270" }}>
            {skill.experience}
          </span>
          <span className="text-xs font-medium" style={{ color: "#8b5cf6" }}>
            {skill.level}%
          </span>
        </div>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? skill.level / 100 : 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="glass-card p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2"
        style={{ color: "#8b5cf6" }}
      >
        <span>{group.icon}</span>
        {group.category}
        <span
          className="ml-auto text-xs font-normal px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(139, 92, 246,0.08)",
            color: "#9186b0",
            border: "1px solid rgba(139, 92, 246,0.12)",
          }}
        >
          {group.skills.length}
        </span>
      </h3>
      {group.skills.map((skill) => (
        <SkillBar key={skill.id} skill={skill} inView={inView} />
      ))}
    </motion.div>
  );
}

export default function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...skillGroups.map((g) => g.category)];
  const filtered =
    activeCategory === "All"
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeCategory);

  return (
    <div className="h-full flex flex-col" style={{ background: "rgba(8, 5, 15,0.4)" }}>
      {/* Category filter */}
      <div
        className="flex gap-1.5 px-4 py-3 overflow-x-auto flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(139, 92, 246,0.1)" }}
        role="tablist"
        aria-label="Skill categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="text-xs px-3 py-1 rounded-full whitespace-nowrap transition-all flex-shrink-0"
            style={{
              background: activeCategory === cat ? "rgba(139, 92, 246,0.15)" : "transparent",
              border: activeCategory === cat ? "1px solid rgba(139, 92, 246,0.3)" : "1px solid transparent",
              color: activeCategory === cat ? "#8b5cf6" : "#4d4270",
            }}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((group) => (
            <SkillGroupCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}
