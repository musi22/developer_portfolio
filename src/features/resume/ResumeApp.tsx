"use client";

import { motion } from "framer-motion";
import { Download, FileText, Mail, GitBranch, Link2, ExternalLink } from "lucide-react";
import { personal } from "@/content/data/personal";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
} as const;
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
} as const;

const education = [
  {
    degree: "Bachelor of Technology",
    field: "Information Technology",
    institution: "National Institute of Technology, Kurukshetra",
    location: "Kurushetra, Haryana, India",
    period: "2022 – 2026",
    gpa: "8.0 / 10",
    icon: "🎓",
  },
];

const coursework = [
  "Data Structures & Algorithms (DSA)",
  "Object Oriented Programming (OOPS)",
  "Database Management Systems (DBMS)",
  "Computer Networks",
  "Operating Systems",
  "Software Engineering",
  "Deep Learning",
  "Machine Learning",
];

const leadership = [
  {
    role: "Core Member",
    organization: "Shiksha (NGO)",
    period: "2023 - Present",
    bullets: [
      "Led educational initiatives and managed Shiksha Club operations, providing support to 180+ underprivileged children.",
      "Coordinated a team of 150+ volunteers managing scheduling and execution of teaching programs.",
      "Organized large-scale social impact events such as 'Make a Wish' and 'Shikshagan', enhancing student outcomes.",
    ],
  },
  {
    role: "Volunteer",
    organization: "National Service Scheme (NSS)",
    period: "2022 - 2024",
    bullets: [
      "Actively contributed to community service initiatives, awareness programs, and social outreach activities.",
      "Coordinated volunteer teams during cleanliness drives, blood donation camps, and welfare initiatives.",
    ],
  },
];

export default function ResumeApp() {
  return (
    <motion.div
      className="h-full overflow-y-auto p-6"
      style={{ background: "rgba(8, 5, 15,0.4)" }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-xl font-display font-bold"
            style={{ color: "#8b5cf6" }}
          >
            {personal.name}
          </h2>
          <p className="text-sm" style={{ color: "#9186b0" }}>{personal.title}</p>
          <p className="text-xs mt-1" style={{ color: "#4d4270" }}>
            {personal.email} · {personal.phone} · {personal.location}
          </p>
        </div>
        <a
          href={personal.resumeUrl}
          download
          className="btn btn-primary text-xs"
          aria-label="Download resume PDF"
        >
          <Download size={14} aria-hidden="true" />
          Download PDF
        </a>
      </motion.div>

      {/* Education */}
      <motion.div variants={fadeUp} className="mb-5">
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#8b5cf6" }}
        >
          <span>🎓</span> Education
        </h3>
        {education.map((edu, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold" style={{ color: "#ddd6f3" }}>
                  {edu.degree}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#22d3ee" }}>
                  {edu.field}
                </div>
                <div className="text-xs mt-1" style={{ color: "#4d4270" }}>
                  {edu.institution}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5" style={{ color: "#4d4270" }}>
                  {edu.location}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(139, 92, 246,0.08)", color: "#22d3ee", border: "1px solid rgba(139, 92, 246,0.2)" }}
                >
                  {edu.period}
                </div>
                <div className="text-xs mt-1" style={{ color: "#4ade80" }}>
                  CGPA: {edu.gpa}
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Coursework */}
      <motion.div variants={fadeUp} className="mb-5">
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#8b5cf6" }}
        >
          <span>📚</span> Coursework & Core Subjects
        </h3>
        <div className="glass-card p-4">
          <div className="grid grid-cols-2 gap-2">
            {coursework.map((course) => (
              <div
                key={course}
                className="text-xs p-2 rounded"
                style={{ background: "rgba(139, 92, 246,0.03)", border: "1px solid rgba(139, 92, 246,0.08)", color: "#ddd6f3" }}
              >
                • {course}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills summary */}
      <motion.div variants={fadeUp} className="mb-5">
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#8b5cf6" }}
        >
          <span>⚡</span> Technical Skills
        </h3>
        <div className="glass-card p-4">
          {[
            { category: "Languages & Data Tools", items: ["Python", "SQL", "C++", "Java", "JavaScript (ES6+)", "Pandas", "NumPy", "Matplotlib", "Seaborn"] },
            { category: "ML / AI / NLP", items: ["PyTorch", "TensorFlow", "OpenCV", "YOLO", "LLM integration (Ollama)", "Generative AI", "NLP pipelines", "feature engineering", "predictive modeling"] },
            { category: "Backend & Infra", items: ["Node.js", "Express.js", "REST APIs", "Kafka", "Redis", "PostgreSQL", "MongoDB", "Docker", "Git"] },
            { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
            { category: "DSA Mastery", items: ["Graphs", "Dynamic Programming (DP)", "Trees", "Heaps", "Tries", "Greedy", "Sliding Window"] },
          ].map((group) => (
            <div key={group.category} className="mb-3 last:mb-0">
              <span className="text-xs font-medium" style={{ color: "#8b5cf6" }}>
                {group.category}:{" "}
              </span>
              <span className="text-xs" style={{ color: "#ddd6f3" }}>
                {group.items.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leadership */}
      <motion.div variants={fadeUp} className="mb-5">
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#8b5cf6" }}
        >
          <span>👥</span> Leadership & Activities
        </h3>
        <div className="flex flex-col gap-3">
          {leadership.map((item, idx) => (
            <div key={idx} className="glass-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#ddd6f3" }}>
                    {item.role}
                  </div>
                  <div className="text-xs" style={{ color: "#22d3ee" }}>
                    {item.organization}
                  </div>
                </div>
                <div
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(139, 92, 246,0.08)", color: "#22d3ee", border: "1px solid rgba(139, 92, 246,0.2)" }}
                >
                  {item.period}
                </div>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1" style={{ color: "#9186b0" }}>
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div variants={fadeUp} className="glass-card p-4">
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "#8b5cf6" }}
        >
          Links & Portals
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { Icon: GitBranch, url: personal.github, label: "GitHub" },
            { Icon: Link2, url: personal.linkedin, label: "LinkedIn" },
            { Icon: Mail, url: `mailto:${personal.email}`, label: "Email" },
            { Icon: ExternalLink, url: "https://leetcode.com/u/rinki_2005/", label: "LeetCode" },
          ].map(({ Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs py-1.5 px-3"
              aria-label={label}
            >
              <Icon size={13} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

