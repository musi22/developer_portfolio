"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Eye, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { personal } from "@/content/data/personal";
import { formatNumber } from "@/lib/utils";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Rust: "#DEA584",
  Go: "#00ADD8",
  "C++": "#f34b7d",
  Java: "#b07219",
  default: "#8b5cf6",
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function GitHubApp() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch("/api/github/profile"),
        fetch("/api/github/repos"),
      ]);

      if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API error");

      const profileData = await profileRes.json();
      const reposData = await reposRes.json();
      setProfile(profileData);
      setRepos(reposData.filter((r: GitHubRepo) => !r.fork).slice(0, 10));
    } catch (err) {
      setError("Could not load GitHub data. Check your GITHUB_USERNAME env variable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ color: "#4d4270" }}>
        <div className="text-center">
          <motion.div
            className="w-8 h-8 rounded-full border-2 mx-auto mb-3"
            style={{ borderColor: "#8b5cf6", borderTopColor: "transparent" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm">Loading GitHub data…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center max-w-xs">
          <AlertCircle size={32} className="mx-auto mb-3" style={{ color: "#8b5cf6" }} aria-hidden="true" />
          <p className="text-sm mb-4" style={{ color: "#9186b0" }}>{error}</p>
          <button onClick={fetchData} className="btn btn-secondary text-xs">
            <RefreshCw size={12} aria-hidden="true" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full overflow-y-auto p-5"
      style={{ background: "rgba(8, 5, 15,0.4)" }}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Profile card */}
      {profile && (
        <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
              style={{ border: "2px solid rgba(139, 92, 246,0.3)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm" style={{ color: "#ddd6f3" }}>{profile.name}</div>
              <div className="text-xs mb-1" style={{ color: "#4d4270" }}>@{profile.login}</div>
              {profile.bio && <div className="text-xs" style={{ color: "#9186b0" }}>{profile.bio}</div>}
            </div>
            <a
              href={`https://github.com/${profile.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs py-1.5 px-3"
              aria-label="View GitHub profile"
            >
              <ExternalLink size={11} aria-hidden="true" /> Profile
            </a>
          </div>

          <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: "1px solid rgba(139, 92, 246,0.08)" }}>
            {[
              { label: "Repos", value: profile.public_repos },
              { label: "Followers", value: profile.followers },
              { label: "Following", value: profile.following },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-sm font-bold" style={{ color: "#8b5cf6" }}>
                  {formatNumber(stat.value)}
                </div>
                <div className="text-xs" style={{ color: "#4d4270" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Repos */}
      <motion.div variants={fadeUp}>
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "#8b5cf6" }}
        >
          Top Repositories
        </h3>
        <div className="flex flex-col gap-2">
          {repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 block group"
              whileHover={{ x: 3 }}
              aria-label={`View ${repo.name} on GitHub`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-medium truncate group-hover:underline"
                    style={{ color: "#22d3ee" }}
                  >
                    {repo.name}
                  </div>
                  {repo.description && (
                    <div
                      className="text-xs mt-0.5 line-clamp-1"
                      style={{ color: "#4d4270" }}
                    >
                      {repo.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs flex-shrink-0" style={{ color: "#4d4270" }}>
                  <span className="flex items-center gap-0.5">
                    <Star size={10} aria-hidden="true" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <GitFork size={10} aria-hidden="true" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: LANG_COLORS[repo.language] || LANG_COLORS.default }}
                      aria-hidden="true"
                    />
                    <span className="text-xs" style={{ color: "#9186b0" }}>{repo.language}</span>
                  </div>
                )}
                {repo.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(139, 92, 246,0.06)",
                      border: "1px solid rgba(139, 92, 246,0.1)",
                      color: "#4d4270",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
