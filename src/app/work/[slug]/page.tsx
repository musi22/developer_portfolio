import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/content/data/projects";
import { personal } from "@/content/data/personal";
import CommandNavbar from "@/components/navigation/CommandNavbar";
import CommandFooter from "@/components/navigation/CommandFooter";
import TrustPlatformTrace from "@/components/diagrams/TrustPlatformTrace";
import StreamAlphaFlow from "@/components/diagrams/StreamAlphaFlow";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Terminal,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Rashmi Shaw",
    };
  }

  return {
    title: `${project.title} — Engineering Case Study | Rashmi Shaw`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — AI Systems Case Study`,
      description: project.summary,
      url: `${personal.website}/work/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next project in line
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-[#050607] text-[#F4F4F5] flex flex-col">
      <CommandNavbar />

      <main className="flex-1 pt-32 pb-24 command-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb back button */}
          <div className="mb-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#989CA5] hover:text-[#61F4DE] transition-colors p-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Command Center</span>
            </Link>
          </div>

          {/* Case Study Header */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#61F4DE] font-semibold">
                CASE STUDY // 0{project.order}
              </span>
              <span className="text-white/20">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#989CA5]">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#989CA5] leading-relaxed mb-8 max-w-3xl">
              {project.summary}
            </p>

            {/* CTAs row */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 font-mono text-xs">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] font-semibold transition-all shadow-[0_0_16px_rgba(97,244,222,0.2)]"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.apiDocsUrl && (
                <a
                  href={project.apiDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#989CA5] hover:text-white border border-white/10 transition-colors"
                >
                  <span>API Docs (Swagger)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Interactive Simulation Slot */}
          {project.interactiveType === "trust-platform-trace" && (
            <div className="mb-14">
              <TrustPlatformTrace />
            </div>
          )}

          {project.interactiveType === "streamalpha-flow" && (
            <div className="mb-14">
              <StreamAlphaFlow />
            </div>
          )}

          {/* Deep Technical Content Sections */}
          <div className="space-y-12">
            {/* Section 1: Problem & Production Motivation */}
            <section className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 shadow-xl">
              <h2 className="font-mono text-base uppercase tracking-wider text-[#61F4DE] font-semibold mb-4">
                01. Problem Statement & Motivation
              </h2>
              <div className="space-y-4 text-[#989CA5] text-sm sm:text-base leading-relaxed font-sans">
                <p>{project.problem}</p>
                <div className="p-4 rounded-xl bg-[#050607] border border-white/5 text-xs sm:text-sm font-mono text-[#F4F4F5]">
                  <strong className="text-[#61F4DE] block mb-1 font-semibold">
                    WHY THIS MATTERS IN PRODUCTION:
                  </strong>
                  {project.whyItMatters}
                </div>
              </div>
            </section>

            {/* Section 2: Architecture & State Machine */}
            <section className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 shadow-xl">
              <h2 className="font-mono text-base uppercase tracking-wider text-[#61F4DE] font-semibold mb-4">
                02. System Architecture Design
              </h2>
              <p className="text-[#989CA5] text-sm sm:text-base leading-relaxed mb-6">
                {project.architectureDescription}
              </p>

              <div className="p-4 rounded-xl bg-[#050607] border border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#61F4DE] font-semibold mb-3">
                  <Terminal className="w-4 h-4" />
                  <span>Enforced Reliability & Security Invariants</span>
                </div>
                <ul className="space-y-2.5">
                  {project.reliabilitySecurityMechanisms.map((mech, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#989CA5] font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#6EE7A8] flex-shrink-0 mt-0.5" />
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3: Engineering Decisions & Tradeoffs */}
            <section className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 shadow-xl">
              <h2 className="font-mono text-base uppercase tracking-wider text-[#61F4DE] font-semibold mb-4">
                03. Architectural Decisions & Tradeoffs
              </h2>
              <div className="grid grid-cols-1 gap-4 font-mono text-xs">
                {project.keyEngineeringDecisions.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#050607] border border-white/5">
                    <h3 className="text-sm font-semibold text-white mb-2">{item.decision}</h3>
                    <p className="text-[#989CA5] font-sans text-xs sm:text-sm leading-relaxed mb-2">
                      {item.rationale}
                    </p>
                    <div className="text-[#F6C76B] font-sans text-xs">
                      <strong className="font-mono text-[11px] text-[#989CA5] uppercase">
                        Tradeoff:{" "}
                      </strong>
                      {item.tradeoff}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Measured Results */}
            <section className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 shadow-xl font-mono text-xs">
              <h2 className="text-base uppercase tracking-wider text-[#61F4DE] font-semibold mb-4">
                04. Verified Empirical Outcomes
              </h2>
              <div className="rounded-xl bg-[#050607] border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-[#989CA5]">
                      <th className="p-3">Metric Dimension</th>
                      {project.measuredResults[0]?.baseline && <th className="p-3">Baseline</th>}
                      <th className="p-3">Guarded Platform</th>
                      <th className="p-3">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {project.measuredResults.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        <td className="p-3 text-white font-medium">{row.metric}</td>
                        {row.baseline && <td className="p-3 text-[#989CA5]">{row.baseline}</td>}
                        <td className="p-3 text-[#6EE7A8] font-semibold">{row.guarded}</td>
                        <td className="p-3 text-[#989CA5] text-[11px]">{row.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: Future Improvements */}
            <section className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 shadow-xl">
              <h2 className="font-mono text-base uppercase tracking-wider text-[#61F4DE] font-semibold mb-4">
                05. Production Roadmap & Next Iterations
              </h2>
              <ul className="space-y-3 font-mono text-xs">
                {project.nextImprovements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[#989CA5]">
                    <span className="text-[#61F4DE] font-bold">&gt;</span>
                    <span className="font-sans text-xs sm:text-sm">{imp}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Next Case Study Navigation */}
          <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/#work"
              className="text-xs font-mono text-[#989CA5] hover:text-white transition-colors"
            >
              ← Back to all systems
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#61F4DE] transition-colors font-semibold"
            >
              <span>Next: {nextProject.shortTitle}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <CommandFooter />
    </div>
  );
}
