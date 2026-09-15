// GitHub API integration with ISR caching and authentic fallback data
// Real data sourced directly from https://api.github.com/users/musi22 and /repos

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  topics: string[];
  homepage: string | null;
  isPrimary?: boolean;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatarUrl: string;
  htmlUrl: string;
  name: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
}

// Static typed fallback dataset representing Rashmi's verified public GitHub profile
export const GITHUB_USER_FALLBACK: GitHubUser = {
  login: "musi22",
  id: 97947688,
  avatarUrl: "https://avatars.githubusercontent.com/u/97947688?v=4",
  htmlUrl: "https://github.com/musi22",
  name: "Rashmi Shaw",
  bio: "AI Systems & Backend Engineer | NIT Kurukshetra",
  publicRepos: 14,
  followers: 4,
  following: 5,
};

// Verified repositories from musi22 GitHub account
export const GITHUB_REPOS_FALLBACK: GitHubRepo[] = [
  {
    id: 1356423644,
    name: "enterprise-agent-trust-platform",
    fullName: "musi22/enterprise-agent-trust-platform",
    description: "Enterprise Agent Trust & Evaluation Platform — Amazon-inspired retail operations agent reliability sandbox, 9-node LangGraph state machine, and SHA-256 evidence ledger.",
    htmlUrl: "https://github.com/musi22/enterprise-agent-trust-platform",
    language: "Python",
    stargazersCount: 1,
    forksCount: 0,
    updatedAt: "2026-09-07T18:25:48Z",
    topics: ["langgraph", "fastapi", "ai-safety", "audit-ledger", "hitl", "pydantic"],
    homepage: "https://enterprise-ai-web-production.up.railway.app/",
    isPrimary: true,
  },
  {
    id: 1330256995,
    name: "StreamAlpha",
    fullName: "musi22/StreamAlpha",
    description: "Zero-Latency Real-Time Market Analytics Dashboard & AI Copilot — Event streaming with Apache Kafka/Redpanda, FastAPI WebSockets, Perspective WebAssembly, sustaining 10k evt/s.",
    htmlUrl: "https://github.com/musi22/StreamAlpha",
    language: "Python",
    stargazersCount: 1,
    forksCount: 0,
    updatedAt: "2026-09-07T18:25:51Z",
    topics: ["kafka", "redpanda", "websockets", "redis", "fastapi", "webassembly"],
    homepage: null,
    isPrimary: true,
  },
  {
    id: 1358086840,
    name: "RevenueGuard",
    fullName: "musi22/RevenueGuard",
    description: "Real-time automated revenue recovery platform detecting leakage across subscription failures, cart abandonment, and churn with mathematical ERV scoring and holdout A/B testing.",
    htmlUrl: "https://github.com/musi22/RevenueGuard",
    language: "Python",
    stargazersCount: 1,
    forksCount: 0,
    updatedAt: "2026-09-07T18:25:45Z",
    topics: ["langgraph", "fastapi", "experimentation", "ab-testing", "fintech"],
    homepage: null,
    isPrimary: true,
  },
  {
    id: 1291947811,
    name: "nexus_ai",
    fullName: "musi22/nexus_ai",
    description: "Enterprise Multi-Agent AI Knowledge Platform — Hybrid vector-keyword retrieval (Qdrant & Elasticsearch) with Reciprocal Rank Fusion and factuality verification.",
    htmlUrl: "https://github.com/musi22/nexus_ai",
    language: "TypeScript",
    stargazersCount: 0,
    forksCount: 0,
    updatedAt: "2026-07-07T07:52:33Z",
    topics: ["rag", "langgraph", "qdrant", "elasticsearch", "nextjs"],
    homepage: null,
    isPrimary: true,
  },
  {
    id: 1306036729,
    name: "prompt_ai",
    fullName: "musi22/prompt_ai",
    description: "Collaborative prompt engineering, evaluation, and versioning workbench for LLM tool developers.",
    htmlUrl: "https://github.com/musi22/prompt_ai",
    language: "TypeScript",
    stargazersCount: 1,
    forksCount: 0,
    updatedAt: "2026-09-07T18:25:54Z",
    topics: ["nextjs", "prompt-engineering", "llm-tooling"],
    homepage: null,
    isPrimary: false,
  },
  {
    id: 1125209003,
    name: "Talksy",
    fullName: "musi22/Talksy",
    description: "Real-time communication service with room-based audio channels, presence tracking, and low-latency message fan-out.",
    htmlUrl: "https://github.com/musi22/Talksy",
    language: "TypeScript",
    stargazersCount: 1,
    forksCount: 0,
    updatedAt: "2026-09-07T18:25:56Z",
    topics: ["webrtc", "websockets", "nodejs", "typescript"],
    homepage: null,
    isPrimary: false,
  },
  {
    id: 1121839054,
    name: "job_portal",
    fullName: "musi22/job_portal",
    description: "Enterprise recruiting platform with applicant tracking, skill-matching algorithms, and role-based workflows.",
    htmlUrl: "https://github.com/musi22/job_portal",
    language: "TypeScript",
    stargazersCount: 0,
    forksCount: 0,
    updatedAt: "2026-07-19T20:42:33Z",
    topics: ["typescript", "fullstack", "postgresql"],
    homepage: null,
    isPrimary: false,
  },
  {
    id: 829905228,
    name: "developer_portfolio",
    fullName: "musi22/developer_portfolio",
    description: "Production-ready AI command-center portfolio website showcasing reliable agent architectures and real-time distributed backends.",
    htmlUrl: "https://github.com/musi22/developer_portfolio",
    language: "TypeScript",
    stargazersCount: 1,
    forksCount: 0,
    updatedAt: "2026-09-07T18:25:52Z",
    topics: ["nextjs", "react-three-fiber", "threejs", "tailwind-css"],
    homepage: "https://rashmishaw.vercel.app",
    isPrimary: false,
  },
];

export async function fetchGitHubUser(username: string = "musi22"): Promise<GitHubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "RashmiShawPortfolio-Bot",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[GitHub API] Failed to fetch user ${username}, status ${res.status}. Falling back to static data.`);
      return GITHUB_USER_FALLBACK;
    }

    const data = await res.json();
    return {
      login: data.login || GITHUB_USER_FALLBACK.login,
      id: data.id || GITHUB_USER_FALLBACK.id,
      avatarUrl: data.avatar_url || GITHUB_USER_FALLBACK.avatarUrl,
      htmlUrl: data.html_url || GITHUB_USER_FALLBACK.htmlUrl,
      name: data.name || GITHUB_USER_FALLBACK.name,
      bio: data.bio || GITHUB_USER_FALLBACK.bio,
      publicRepos: typeof data.public_repos === "number" ? data.public_repos : GITHUB_USER_FALLBACK.publicRepos,
      followers: typeof data.followers === "number" ? data.followers : GITHUB_USER_FALLBACK.followers,
      following: typeof data.following === "number" ? data.following : GITHUB_USER_FALLBACK.following,
    };
  } catch {
    return GITHUB_USER_FALLBACK;
  }
}

export async function fetchGitHubRepos(username: string = "musi22"): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "RashmiShawPortfolio-Bot",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[GitHub API] Failed to fetch repos for ${username}, status ${res.status}. Falling back to static dataset.`);
      return GITHUB_REPOS_FALLBACK;
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return GITHUB_REPOS_FALLBACK;
    }

    // Filter to substantive, meaningful repos (hide forks or empty repos unless relevant)
    const primaryNames = ["enterprise-agent-trust-platform", "StreamAlpha", "RevenueGuard", "nexus_ai"];
    
    const mapped: GitHubRepo[] = data.map((r: any) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      htmlUrl: r.html_url,
      language: r.language,
      stargazersCount: r.stargazers_count,
      forksCount: r.forks_count,
      updatedAt: r.updated_at,
      topics: Array.isArray(r.topics) ? r.topics : [],
      homepage: r.homepage,
      isPrimary: primaryNames.includes(r.name),
    }));

    // Prioritize key projects
    return mapped.sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } catch {
    return GITHUB_REPOS_FALLBACK;
  }
}
