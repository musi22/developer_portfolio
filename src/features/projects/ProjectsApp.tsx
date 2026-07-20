"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, GitBranch, Star, GitFork } from "lucide-react";
import { projects } from "@/content/data/projects";
import type { Project, ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";
import Tilt3D from "@/components/ui/Tilt3D";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "AI/ML",
  "Full Stack",
  "Backend",
  "Frontend",
];

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Tilt3D
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        aria-label={`View ${project.title} project`}
        className="glass-card p-4 cursor-pointer group relative overflow-hidden"
      >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold" style={{ color: "#ddd6f3" }}>
              {project.title}
            </h3>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                background:
                  project.status === "Live"
                    ? "rgba(74,222,128,0.1)"
                    : "rgba(251,191,36,0.1)",
                color: project.status === "Live" ? "#4ade80" : "#fbbf24",
                border: `1px solid ${project.status === "Live" ? "rgba(74,222,128,0.2)" : "rgba(251,191,36,0.2)"}`,
              }}
            >
              {project.status}
            </span>
          </div>
          <p className="text-xs" style={{ color: "#4d4270" }}>
            {project.tagline}
          </p>
        </div>
        {project.featured && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(139, 92, 246,0.1)",
              border: "1px solid rgba(139, 92, 246,0.2)",
              color: "#8b5cf6",
            }}
          >
            Featured
          </span>
        )}
      </div>

      <p className="text-xs mb-3 line-clamp-2" style={{ color: "#9186b0", lineHeight: "1.5" }}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech.name}
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(139, 92, 246,0.06)",
              border: "1px solid rgba(139, 92, 246,0.12)",
              color: "#9186b0",
            }}
          >
            {tech.name}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-xs" style={{ color: "#4d4270" }}>
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: "#4d4270" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4d4270")}
            aria-label={`View ${project.title} on GitHub`}
          >
            <GitBranch size={11} aria-hidden="true" />
            <span>GitHub</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: "#4d4270" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4d4270")}
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink size={11} aria-hidden="true" />
            <span>Live Demo</span>
          </a>
        )}
        <div className="flex-1" />
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{
            background: "rgba(139, 92, 246,0.06)",
            color: "#4d4270",
          }}
        >
          {project.category}
        </span>
      </div>
      </Tilt3D>
    </motion.div>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <motion.div
      className="h-full overflow-y-auto p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs mb-4 transition-colors"
        style={{ color: "#9186b0" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#9186b0")}
        aria-label="Back to projects list"
      >
        ← Back to Projects
      </button>

      <h2
        className="text-xl font-display font-bold mb-1"
        style={{ color: "#8b5cf6" }}
      >
        {project.title}
      </h2>
      <p className="text-sm mb-4" style={{ color: "#22d3ee" }}>
        {project.tagline}
      </p>

      <div className="flex gap-2 mb-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs py-1.5 px-3">
            <GitBranch size={13} aria-hidden="true" /> GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-xs py-1.5 px-3">
            <ExternalLink size={13} aria-hidden="true" /> Live Demo
          </a>
        )}
      </div>

      {project.problem && (
        <div className="glass-card p-4 mb-3">
          <h3 className="text-xs font-semibold mb-2" style={{ color: "#8b5cf6" }}>
            Problem Statement
          </h3>
          <p className="text-sm" style={{ color: "#9186b0" }}>{project.problem}</p>
        </div>
      )}

      {project.solution && (
        <div className="glass-card p-4 mb-3">
          <h3 className="text-xs font-semibold mb-2" style={{ color: "#8b5cf6" }}>
            Solution
          </h3>
          <p className="text-sm" style={{ color: "#9186b0" }}>{project.solution}</p>
        </div>
      )}

      <div className="glass-card p-4 mb-3">
        <h3 className="text-xs font-semibold mb-3" style={{ color: "#8b5cf6" }}>
          Features
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {project.features.map((f) => (
            <div
              key={f.title}
              className="p-2 rounded-lg"
              style={{ background: "rgba(139, 92, 246,0.04)", border: "1px solid rgba(139, 92, 246,0.1)" }}
            >
              <div className="text-base mb-1">{f.icon}</div>
              <div className="text-xs font-medium" style={{ color: "#ddd6f3" }}>{f.title}</div>
              <div className="text-xs mt-0.5" style={{ color: "#4d4270" }}>{f.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-xs font-semibold mb-3" style={{ color: "#8b5cf6" }}>
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: "rgba(139, 92, 246,0.08)",
                border: "1px solid rgba(139, 92, 246,0.15)",
                color: "#22d3ee",
              }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsApp() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === "All" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="h-full flex flex-col" style={{ background: "rgba(8, 5, 15,0.4)" }}>
      {/* Filter bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(139, 92, 246,0.1)" }}
      >
        <div
          className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(139, 92, 246,0.06)", border: "1px solid rgba(139, 92, 246,0.12)" }}
        >
          <Search size={12} style={{ color: "#4d4270" }} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="bg-transparent text-xs outline-none flex-1"
            style={{ color: "#ddd6f3" }}
            aria-label="Search projects"
          />
        </div>
        <div className="flex gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="text-xs px-2 py-1 rounded transition-all"
              style={{
                background: category === cat ? "rgba(139, 92, 246,0.15)" : "transparent",
                border: category === cat ? "1px solid rgba(139, 92, 246,0.3)" : "1px solid transparent",
                color: category === cat ? "#8b5cf6" : "#4d4270",
              }}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs mb-3" style={{ color: "#4d4270" }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </div>
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm" style={{ color: "#4d4270" }}>
              No projects found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
