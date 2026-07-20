"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: number;
  emoji: string;
}

const DEMO_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building a Production RAG Pipeline with LangChain",
    description: "A deep dive into building Retrieval-Augmented Generation systems that actually work in production environments.",
    date: "2024-06-15",
    tags: ["AI", "RAG", "LangChain", "Python"],
    category: "AI/ML",
    readingTime: 8,
    emoji: "🤖",
  },
  {
    id: "2",
    title: "Next.js 15 App Router: Everything You Need to Know",
    description: "Comprehensive guide to Next.js 15's App Router, server components, and the new caching model.",
    date: "2024-05-28",
    tags: ["Next.js", "React", "TypeScript"],
    category: "Frontend",
    readingTime: 12,
    emoji: "⚛️",
  },
  {
    id: "3",
    title: "FastAPI vs Node.js: Which Should You Choose?",
    description: "A comprehensive comparison of FastAPI and Node.js for building high-performance APIs.",
    date: "2024-04-10",
    tags: ["FastAPI", "Node.js", "Backend", "Python"],
    category: "Backend",
    readingTime: 10,
    emoji: "⚡",
  },
  {
    id: "4",
    title: "Deploying LLMs with vLLM: A Production Guide",
    description: "Everything you need to know about running your own LLM inference server with vLLM.",
    date: "2024-03-20",
    tags: ["LLM", "vLLM", "Python", "Inference"],
    category: "AI/ML",
    readingTime: 15,
    emoji: "🧠",
  },
];

const CATEGORIES = ["All", "AI/ML", "Frontend", "Backend"];

export default function BlogApp() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = DEMO_POSTS.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

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
            placeholder="Search articles…"
            className="bg-transparent text-xs outline-none flex-1"
            style={{ color: "#ddd6f3" }}
            aria-label="Search blog posts"
          />
        </div>
        <div className="flex gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs px-2 py-1 rounded transition-all"
              style={{
                background: activeCategory === cat ? "rgba(139, 92, 246,0.15)" : "transparent",
                border: activeCategory === cat ? "1px solid rgba(139, 92, 246,0.3)" : "1px solid transparent",
                color: activeCategory === cat ? "#8b5cf6" : "#4d4270",
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-xs mb-3" style={{ color: "#4d4270" }}>
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-col gap-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              className="glass-card p-4 group cursor-pointer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              role="article"
              tabIndex={0}
              aria-label={`Read ${post.title}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{post.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className="text-sm font-semibold leading-tight group-hover:underline"
                      style={{ color: "#ddd6f3" }}
                    >
                      {post.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                      style={{
                        background: "rgba(139, 92, 246,0.08)",
                        border: "1px solid rgba(139, 92, 246,0.15)",
                        color: "#9186b0",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <p className="text-xs mb-2 line-clamp-2" style={{ color: "#9186b0", lineHeight: "1.5" }}>
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#4d4270" }}>
                      <Clock size={10} aria-hidden="true" />
                      {post.readingTime} min read
                    </span>
                    <span className="text-xs" style={{ color: "#4d4270" }}>
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <div className="flex gap-1 ml-auto">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            background: "rgba(139, 92, 246,0.05)",
                            border: "1px solid rgba(139, 92, 246,0.1)",
                            color: "#4d4270",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
