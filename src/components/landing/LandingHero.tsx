"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  GitBranch,
  Link2,
  Mail,
  FileText,
  Terminal,
  ChevronRight,
  Cpu,
} from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import BootSequence from "./BootSequence";
import { personal } from "@/content/data/personal";

const TYPING_SPEED = 80; // ms per character
const ROLE_PAUSE = 2000; // ms to hold each role

function useTypingAnimation(roles: string[]) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), ROLE_PAUSE);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? TYPING_SPEED / 2 : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  return displayText;
}

export default function LandingHero() {
  const router = useRouter();
  const [showBoot, setShowBoot] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const typedRole = useTypingAnimation([...personal.roles]);

  const handleBootComplete = useCallback(() => {
    setShowBoot(false);
    setHeroVisible(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  }, []);

  const enterDesktop = () => {
    router.push("/desktop");
  };

  // Stagger variants for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      <ParticleBackground />

      <AnimatePresence>
        {heroVisible && (
          <motion.main
            className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
            style={{ zIndex: 1 }}
            onMouseMove={handleMouseMove}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            role="main"
            aria-label="Portfolio hero section"
          >
            {/* Ambient glow orbs */}
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(139, 92, 246,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                transition: "transform 0.3s ease-out",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(79, 70, 229,0.08) 0%, transparent 70%)",
                filter: "blur(40px)",
                transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
                transition: "transform 0.3s ease-out",
              }}
              aria-hidden="true"
            />

            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(139, 92, 246,0.08)",
                  border: "1px solid rgba(139, 92, 246,0.2)",
                  color: "#22d3ee",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                  style={{ boxShadow: "0 0 6px #4ade80" }}
                  aria-hidden="true"
                />
                {personal.availabilityNote}
              </div>
            </motion.div>

            {/* Main hero card */}
            <motion.div
              variants={itemVariants}
              className="relative text-center max-w-4xl mx-auto"
              style={{
                transform: `perspective(1000px) rotateX(${-mousePos.y * 0.02}deg) rotateY(${mousePos.x * 0.02}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Glassmorphism card */}
              <div
                className="relative p-10 rounded-3xl"
                style={{
                  background: "rgba(8, 5, 15,0.5)",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                  border: "1px solid rgba(139, 92, 246,0.15)",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Gradient top border */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #8b5cf6, #4f46e5, transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-6"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246,0.15), rgba(79, 70, 229,0.08))",
                      border: "1px solid rgba(139, 92, 246,0.25)",
                      boxShadow: "0 0 30px rgba(139, 92, 246,0.15)",
                    }}
                  >
                    <Cpu
                      size={36}
                      style={{ color: "#8b5cf6" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                  variants={itemVariants}
                  className="font-display text-5xl md:text-7xl font-black mb-4 leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #8b5cf6 50%, #4f46e5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 30px rgba(139, 92, 246,0.3))",
                  }}
                >
                  {personal.name}
                </motion.h1>

                {/* Typing role */}
                <motion.div
                  variants={itemVariants}
                  className="h-10 flex items-center justify-center mb-6"
                >
                  <span
                    className="text-xl md:text-2xl font-medium font-mono"
                    style={{ color: "#22d3ee" }}
                    aria-live="polite"
                    aria-label={`Current role: ${typedRole}`}
                  >
                    {typedRole}
                    <span
                      className="inline-block w-0.5 h-6 ml-1 align-middle"
                      style={{
                        background: "#8b5cf6",
                        animation: "blink 1s step-end infinite",
                      }}
                      aria-hidden="true"
                    />
                  </span>
                </motion.div>

                {/* Bio */}
                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
                  style={{ color: "#9186b0" }}
                >
                  {personal.bioShort}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3 justify-center mb-6"
                >
                  <motion.a
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Download resume"
                  >
                    <FileText size={16} aria-hidden="true" />
                    Resume
                  </motion.a>

                  <motion.a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Visit GitHub profile"
                  >
                    <GitBranch size={16} aria-hidden="true" />
                    GitHub
                  </motion.a>

                  <motion.a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Visit LinkedIn profile"
                  >
                    <Link2 size={16} aria-hidden="true" />
                    LinkedIn
                  </motion.a>

                  <motion.a
                    href={`mailto:${personal.email}`}
                    className="btn btn-ghost"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Send email"
                  >
                    <Mail size={16} aria-hidden="true" />
                    Contact
                  </motion.a>
                </motion.div>

                {/* Bottom gradient border */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(139, 92, 246,0.4), transparent)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Enter Desktop CTA */}
            <motion.div variants={itemVariants} className="mt-10">
              <motion.button
                onClick={enterDesktop}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3730a3)",
                  color: "white",
                  boxShadow: "0 8px 40px rgba(139, 92, 246,0.35)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 50px rgba(139, 92, 246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                aria-label="Enter the desktop OS experience"
              >
                <Terminal size={20} aria-hidden="true" />
                <span>Enter OS Experience</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <ChevronRight size={18} />
                </motion.span>

                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </motion.button>

              <p
                className="mt-3 text-center text-xs"
                style={{ color: "#4d4270" }}
              >
                Press <kbd className="font-mono px-1 py-0.5 rounded text-xs" style={{ border: "1px solid rgba(139, 92, 246,0.3)", color: "#9186b0" }}>Enter</kbd> or click to launch
              </p>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              {[
                { label: "Projects Built", value: "10+" },
                { label: "Years Coding", value: "4+" },
                { label: "AI Models Used", value: "20+" },
                { label: "Coffee Cups", value: "∞" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-black font-display"
                    style={{ color: "#8b5cf6" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#4d4270" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
