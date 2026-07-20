"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Wifi, Code2, Brain, Globe } from "lucide-react";
import { personal } from "@/content/data/personal";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
} as const;

const stats = [
  { label: "Projects", value: "10+", icon: Code2 },
  { label: "Years Coding", value: "4+", icon: Calendar },
  { label: "AI Models", value: "20+", icon: Brain },
  { label: "Countries", value: "5+", icon: Globe },
];

export default function AboutApp() {
  return (
    <motion.div
      className="h-full overflow-y-auto p-6"
      style={{ background: "rgba(8, 5, 15,0.4)" }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Profile header */}
      <motion.div variants={fadeUp} className="flex items-start gap-5 mb-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246,0.2), rgba(79, 70, 229,0.1))",
            border: "2px solid rgba(139, 92, 246,0.25)",
            boxShadow: "0 0 30px rgba(139, 92, 246,0.15)",
          }}
          aria-hidden="true"
        >
          👤
        </div>

        <div>
          <h2
            className="text-2xl font-display font-bold mb-1"
            style={{ color: "#8b5cf6", textShadow: "0 0 20px rgba(139, 92, 246,0.3)" }}
          >
            {personal.name}
          </h2>
          <p className="text-sm font-medium mb-2" style={{ color: "#22d3ee" }}>
            {personal.title}
          </p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#4d4270" }}>
            <MapPin size={11} aria-hidden="true" />
            <span>{personal.location}</span>
            <span className="mx-1">·</span>
            <Wifi size={11} aria-hidden="true" />
            <span>{personal.timezone}</span>
          </div>

          {/* Availability badge */}
          {personal.availableForWork && (
            <div
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
                color: "#4ade80",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ boxShadow: "0 0 4px #4ade80" }}
                aria-hidden="true"
              />
              {personal.availabilityNote}
            </div>
          )}
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
        <h3 className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#8b5cf6" }}>
          About
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#9186b0" }}>
          {personal.bio}
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-4 text-center"
          >
            <stat.icon
              size={18}
              className="mx-auto mb-2"
              style={{ color: "#8b5cf6" }}
              aria-hidden="true"
            />
            <div className="text-xl font-black font-display" style={{ color: "#8b5cf6" }}>
              {stat.value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#4d4270" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Roles */}
      <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
        <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#8b5cf6" }}>
          Roles
        </h3>
        <div className="flex flex-wrap gap-2">
          {personal.roles.map((role) => (
            <span
              key={role}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(139, 92, 246,0.08)",
                border: "1px solid rgba(139, 92, 246,0.2)",
                color: "#22d3ee",
              }}
            >
              {role}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div variants={fadeUp} className="glass-card p-4">
        <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#8b5cf6" }}>
          Connect
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "GitHub", url: personal.github, icon: "🐙" },
            { label: "LinkedIn", url: personal.linkedin, icon: "💼" },
            { label: "Email", url: `mailto:${personal.email}`, icon: "✉️" },
            { label: "Phone", url: `tel:${personal.phone.replace(/\s+/g, "")}`, icon: "📞" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors group"
              style={{ color: "#9186b0" }}
              aria-label={`Visit ${link.label}`}
            >
              <span>{link.icon}</span>
              <span className="group-hover:underline" style={{ color: "#22d3ee" }}>
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
