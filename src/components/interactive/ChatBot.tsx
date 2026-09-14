"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Bot } from "lucide-react";
import { personal } from "@/content/data/personal";
import { projects } from "@/content/data/projects";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Predefined FAQ responses — no LLM, keeps it real and fast
const FAQ_RESPONSES: Record<string, string> = {
  // Greetings
  hello: `Hi! I'm Rashmi's portfolio assistant. I can answer questions about her work, skills, and projects. Try asking about her projects, tech stack, or how to contact her.`,
  hi: `Hey! I'm here to help you learn about Rashmi Shaw's engineering work. Ask me about her projects, skills, or experience.`,
  hey: `Hey! I'm here to help you learn about Rashmi Shaw's engineering work. Ask me about her projects, skills, or experience.`,

  // Projects
  projects: `Rashmi has built 4 flagship systems:\n\n• **Enterprise Agent Trust Platform** — AI agent governance with 9-node LangGraph state machine, SHA-256 audit ledger, and HITL approval\n• **StreamAlpha** — Real-time market data streaming at 10K evt/s via Kafka + WebSocket\n• **RevenueGuard** — AI-driven revenue recovery with ERV computation and A/B experimentation\n• **NexusAgent** — Enterprise RAG with hybrid search (Qdrant + Elasticsearch) and fact verification`,

  "trust platform": `The Enterprise Agent Trust Platform is a governance layer for AI agents. It uses a 9-node LangGraph state machine to ensure every agent action passes through classification, authorization, policy checks, and human approval before execution. Results are logged in a SHA-256 hash-chained audit ledger.\n\nKey metric: Guarded task success improved from 60% → 100% in controlled benchmarks.`,

  streamalpha: `StreamAlpha is a real-time distributed market analytics platform. It handles 10,000 events/second through Kafka/Redpanda partitions, manages per-client bounded ring buffers for WebSocket delivery, and uses FINOS Perspective WebAssembly for 60 FPS rendering.\n\nKey metric: Zero dropped events at 10K evt/s with sub-20ms p95 latency.`,

  revenueguard: `RevenueGuard is an event-driven revenue recovery system. It detects leakage, computes Expected Recovery Value (ERV), splits opportunities into treatment/control groups via deterministic salt-hashing, and enforces strict policy caps.\n\nKey metric: +24.8% verified incremental recovery lift with 100% policy compliance.`,

  nexusagent: `NexusAgent is an enterprise knowledge platform using multi-agent RAG. It combines Qdrant semantic search with Elasticsearch BM25 via Reciprocal Rank Fusion (RRF). A verification agent filters hallucinations before generating cited responses.\n\nKey metric: Retrieval precision improved from 64.2% → 91.8%.`,

  // Skills & Tech
  skills: `Rashmi's core engineering stack:\n\n• **AI/Agents**: LangGraph, LangChain, RAG, HITL workflows\n• **Backend**: Python 3.11+, FastAPI, Async SQLAlchemy, Pydantic v2\n• **Streaming**: Apache Kafka, Redpanda, WebSockets, Redis\n• **Data**: PostgreSQL, Qdrant, Elasticsearch, MongoDB\n• **Infra**: Docker, GitHub Actions, Prometheus, OpenTelemetry\n• **Frontend**: Next.js, TypeScript, React`,

  "tech stack": `Python (FastAPI, LangGraph), Kafka, Redis, PostgreSQL, Qdrant, Elasticsearch, Docker, Next.js, TypeScript. She focuses on backend and AI systems engineering.`,

  // Contact
  contact: `You can reach Rashmi at:\n\n• Email: ${personal.email}\n• GitHub: ${personal.github}\n• LinkedIn: ${personal.linkedin}\n\nShe's open to AI systems, backend, and distributed systems roles — in India, remote, or with relocation.`,

  email: `Rashmi's email is ${personal.email}. She's open to opportunities in AI systems and backend engineering.`,

  // About
  about: `Rashmi Shaw is an AI Systems & Backend Engineer. She graduated from NIT Kurukshetra (B.Tech IT, CGPA 8.0). She specializes in building governed AI agents, real-time streaming platforms, and reliable backend services.\n\nShe's solved 500+ DSA problems on LeetCode and led community work with Shiksha NGO impacting 180+ students.`,

  education: `B.Tech in Information Technology from NIT Kurukshetra (2022-2026). CGPA: 8.0/10.0. Core courses in distributed systems, OS, DBMS, networks, and algorithms.`,

  experience: `Rashmi's experience is demonstrated through her 4 production-oriented projects: Enterprise Agent Trust Platform (AI safety), StreamAlpha (real-time streaming), RevenueGuard (revenue recovery), and NexusAgent (enterprise RAG). All are open-source with documented benchmarks.`,

  // Location
  location: `Rashmi is based in Kolkata, India. She's open to opportunities in India, remote global roles, and relocation worldwide.`,

  resume: `You can download Rashmi's résumé from the navigation bar or by clicking the "Download Résumé" button in the hero section.`,

  github: `Rashmi's GitHub: ${personal.github}. Her profile includes 4 flagship projects and additional open-source work.`,
};

function findBestResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Direct match
  if (FAQ_RESPONSES[q]) return FAQ_RESPONSES[q];

  // Keyword matching
  const keywords = Object.keys(FAQ_RESPONSES);
  for (const key of keywords) {
    if (q.includes(key)) return FAQ_RESPONSES[key];
  }

  // Fuzzy matching - check if query words match any key
  const words = q.split(/\s+/);
  for (const key of keywords) {
    for (const word of words) {
      if (word.length > 3 && key.includes(word)) return FAQ_RESPONSES[key];
    }
  }

  return `I can help with questions about Rashmi's projects (Trust Platform, StreamAlpha, RevenueGuard, NexusAgent), skills, tech stack, education, or contact info. What would you like to know?`;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Rashmi's portfolio assistant. Ask me about her projects, skills, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          // Auto-send after voice input
          handleSend(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const message = text || input.trim();
      if (!message) return;

      setMessages((prev) => [...prev, { role: "user", content: message }]);
      setInput("");

      // Simulate typing delay
      setTimeout(() => {
        const response = findBestResponse(message);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response },
        ]);
      }, 300 + Math.random() * 400);
    },
    [input]
  );

  const toggleVoice = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Chat trigger button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 right-4 z-50 p-3 rounded-full bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] shadow-[0_0_24px_rgba(97,244,222,0.3)] hover:shadow-[0_0_32px_rgba(97,244,222,0.5)] transition-all hover:-translate-y-0.5"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-80 sm:w-96 max-h-[70vh] rounded-2xl border border-white/15 bg-[#0B0D10]/98 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0B0D10]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#61F4DE]/10 text-[#61F4DE]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs font-semibold text-white block">
                  Portfolio Assistant
                </span>
                <span className="text-[9px] text-[#656A74] font-mono">
                  Predefined FAQ · No LLM
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#989CA5] hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[400px]"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#61F4DE]/15 text-[#F4F4F5] border border-[#61F4DE]/20"
                      : "bg-[#111418] text-[#989CA5] border border-white/5"
                  }`}
                >
                  {msg.content.split("**").map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-white font-semibold">
                        {part}
                      </strong>
                    ) : (
                      <React.Fragment key={j}>{part}</React.Fragment>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="px-3 py-2.5 border-t border-white/10 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask about projects, skills..."
              className="flex-1 bg-[#050607] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-[#656A74] focus:outline-none focus:border-[#61F4DE]/40"
              spellCheck={false}
            />
            {recognitionRef.current && (
              <button
                type="button"
                onClick={toggleVoice}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? "bg-[#F87171]/20 text-[#F87171]"
                    : "bg-white/5 text-[#989CA5] hover:text-white"
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? (
                  <MicOff className="w-3.5 h-3.5" />
                ) : (
                  <Mic className="w-3.5 h-3.5" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] transition-colors disabled:opacity-30"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
