"use client";

import React from "react";
import { GitHubRepo, GitHubUser } from "@/lib/github";
import { Star, GitFork, ExternalLink, Code2, BookOpen, Sparkles, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function OpenSourceSection({
  repos,
  user,
}: {
  repos: GitHubRepo[];
  user: GitHubUser;
}) {
  // Filter out non-substantive repos
  const substantiveRepos = repos.filter(
    (r) =>
      r.description &&
      r.description.length > 10 &&
      !["aution_app", "bounce_the_ball", "dent", "musi22"].includes(r.name)
  );

  return (
    <section
      id="open-source"
      aria-label="Open Source Contributions & Public Repositories"
      className="py-24 border-t border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Building in Public</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Open-Source Engineering
            </h2>
            <p className="text-base sm:text-lg text-[#989CA5] max-w-2xl leading-relaxed">
              I am actively pursuing meaningful open-source contributions in AI-agent orchestration, LangGraph-style state machines, Python asynchronous backends, reproducible test harnesses, and developer infrastructure.
            </p>
          </div>

          {/* GitHub Profile Stat Pill */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0D10] border border-white/10 font-mono text-xs self-start lg:self-auto">
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{user.name || "musi22"}</span>
                <span className="text-[10px] text-[#989CA5]">@{user.login}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#989CA5] mt-0.5">
                <span>{user.publicRepos} Public Repos</span>
                <span>•</span>
                <a
                  href={user.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#61F4DE] hover:underline flex items-center gap-1"
                >
                  View Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Public Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {substantiveRepos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-xl border border-white/10 bg-[#0B0D10]/80 p-5 flex flex-col justify-between hover:border-white/20 transition-all duration-200 command-panel"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#61F4DE]" />
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-semibold text-white hover:text-[#61F4DE] transition-colors truncate max-w-[200px]"
                    >
                      {repo.name}
                    </a>
                  </div>
                  {repo.isPrimary && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30">
                      FEATURED
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#989CA5] leading-relaxed line-clamp-3 mb-4">
                  {repo.description || "Public repository with source code and documentation."}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 4).map((t: string) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#989CA5]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[11px] text-[#989CA5]">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-white">
                      <span className="w-2 h-2 rounded-full bg-[#8B7CFF]" />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazersCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#F6C76B]" />
                      {repo.stargazersCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#61F4DE] transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    title="View Source"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
