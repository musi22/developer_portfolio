"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Bot,
  Square,
  RefreshCw,
  PhoneCall,
  Flame,
  Award,
} from "lucide-react";
import { personal } from "@/content/data/personal";
import { projects } from "@/content/data/projects";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isVoice?: boolean;
}

// Tailored Knowledge Base & Exact Voice Scenario Handlers
const VOICE_SCENARIOS = {
  greeting: {
    voiceText:
      "Hi! I'm doing great, thank you for asking. I am Rashmi's AI Voice Assistant. How can I help you today? You can ask me to introduce Rashmi, explain her best engineering projects, or find out how to contact her!",
    displayText: `**Hi! How are you?** I'm Rashmi's AI Voice Assistant.\n\nHow can I help you today? You can ask me:\n• "Brief me who you are" (Full introduction)\n• "Explain the best project" (Enterprise Agent Trust Platform)\n• "How to contact you?" (Email, LinkedIn & Dispatch)`,
  },
  introduction: {
    voiceText:
      "Hi, I am Rashmi Shaw! I completed my B.Tech in Information Technology from NIT Kurukshetra. Currently, I am actively searching for software engineering and AI systems roles. My best projects include the Enterprise Agent Trust Platform and StreamAlpha. Apart from engineering, I also founded and run an educational NGO initiative that teaches underprivileged students.",
    displayText: `### 👩‍💻 Hi, I am **Rashmi Shaw**!\n\n• **Education**: B.Tech in Information Technology from **NIT Kurukshetra** (CGPA: 8.0/10.0).\n• **Role Positioning**: AI Systems & Backend Engineer.\n• **Status**: Actively looking for full-time software engineering opportunities (India, Global Remote, Worldwide Relocation).\n• **Flagship Projects**: **Enterprise Agent Trust Platform** (AI safety state machine) & **StreamAlpha** (10,000 events/sec Kafka streaming).\n• **Social Impact**: Founder & lead educator at an NGO initiative, mentoring 180+ underprivileged children in logic, mathematics, and computing.`,
  },
  bestProject: {
    voiceText:
      "Rashmi's best project is the Enterprise Agent Trust Platform. It is an enterprise AI governance system built with FastAPI and a 9-node LangGraph state machine. It guarantees that autonomous LLM agents cannot execute unauthorized refunds or cross-tenant actions. It features human-in-the-loop approvals and an immutable SHA-256 cryptographic audit ledger. The platform is live in production on Railway with a 100% guarded task success rate!",
    displayText: `### 🛡️ Best Project: **Enterprise Agent Trust Platform**\n\n• **Core Problem**: Autonomous LLM agents in retail operations make probabilistic errors—unauthorized refunds, cross-tenant data leaks, and unhandled retry storms.\n• **Architecture**: 9-node deterministic **LangGraph** state machine decoupling planning from execution.\n• **Cryptographic Safety**: Every mutation is chained into a **SHA-256 append-only evidence ledger** with HMAC signing.\n• **HITL Enforcement**: Refunds > $50 automatically pause graph execution and dispatch a review ticket to the human approval inbox.\n• **Empirical Outcome**: 100% guarded task success rate, 0% unauthorized actions.\n• **Live Deployment**: Hosted on Railway at [enterprise-ai-web-production.up.railway.app](https://enterprise-ai-web-production.up.railway.app/).`,
  },
  contact: {
    voiceText:
      "You can reach Rashmi directly by email at shawrashmi7@gmail.com, connect with her on LinkedIn, check out her code on GitHub at musi22, or dispatch a message right through the contact console on this website. She is open to opportunities in India, remote global roles, and relocation worldwide!",
    displayText: `### 📬 Contact **Rashmi Shaw**\n\n• **Email**: [${personal.email}](mailto:${personal.email})\n• **LinkedIn**: [linkedin.com/in/rashmi-shaw-92b444230](${personal.linkedin})\n• **GitHub**: [github.com/musi22](${personal.github})\n• **LeetCode**: [leetcode.com/u/rinki_2005](${personal.leetcode})\n• **Dispatch Console**: Jump to the [Contact Section](#contact) below to send a priority message.`,
  },
  streamalpha: {
    voiceText:
      "StreamAlpha is a real-time distributed market analytics engine capable of processing 10,000 events per second. It streams financial tick updates through Apache Kafka and Redpanda partitions, delivers them over FastAPI WebSockets using per-client bounded ring buffers, and renders at 60 frames per second using FINOS Perspective compiled to WebAssembly.",
    displayText: `### ⚡ **StreamAlpha** (Real-Time Distributed Streaming)\n\n• **Throughput**: Sustained **10,000 events/second** burst load with zero dropped events.\n• **Latency**: Sub-17ms p95 delivery.\n• **Tech Stack**: Apache Kafka / Redpanda, FastAPI, Redis 7, WebSockets, FINOS Perspective WebAssembly.\n• **Repository**: [github.com/musi22/StreamAlpha](https://github.com/musi22/StreamAlpha)`,
  },
  revenueguard: {
    voiceText:
      "RevenueGuard is an event-driven revenue recovery system. It intercepts billing failures, calculates Expected Recovery Value, and splits opportunities 50-50 into randomized holdout control groups to prove genuine incremental recovery lift while enforcing strict 10% discount caps.",
    displayText: `### 💳 **RevenueGuard** (Causal Revenue Recovery)\n\n• **Key Achievement**: +24.8% verified causal recovery lift against a 50% holdout control.\n• **Safety Invariants**: Strict 10% maximum discount and 2 touches per 7 days enforced by code.\n• **Repository**: [github.com/musi22/RevenueGuard](https://github.com/musi22/RevenueGuard)`,
  },
  nexusagent: {
    voiceText:
      "NexusAgent is an enterprise multi-agent knowledge platform. It uses Reciprocal Rank Fusion to combine semantic vector search from Qdrant with exact keyword search from Elasticsearch, and runs a dedicated verification agent that audits retrieved citations to eliminate hallucinations.",
    displayText: `### 🧠 **NexusAgent** (Multi-Agent Verified RAG)\n\n• **Precision**: Hybrid Reciprocal Rank Fusion boosted retrieval precision from 64.2% to 91.8%.\n• **Hallucination Rate**: Cut from 14.5% down to under 1.0% with automated citation audit.\n• **Repository**: [github.com/musi22/nexus_ai](https://github.com/musi22/nexus_ai)`,
  },
  ngo: {
    voiceText:
      "Apart from engineering, Rashmi is deeply passionate about social impact. She leads an educational NGO initiative that provides foundational STEM, logic, and digital literacy education to over 180 underprivileged students.",
    displayText: `### 🤝 Community Leadership: **Shiksha NGO Initiative**\n\n• Mentored **180+ underprivileged children** in foundational mathematics, problem-solving, and digital literacy.\n• Designed interactive curriculum bridges helping students transition from basic numeracy to hands-on computer science concepts.`,
  },
};

function resolveIntent(query: string): { voiceText: string; displayText: string } {
  const q = query.toLowerCase().trim();

  // 1. Greeting scenario ("Hi hello Rashmi, how are you?")
  if (
    q.includes("how are you") ||
    q.includes("how r u") ||
    q.includes("how are u") ||
    q.match(/^(hi|hello|hey|greetings|hola)\b/)
  ) {
    if (q.includes("how are you") || q.includes("how r u")) {
      return VOICE_SCENARIOS.greeting;
    }
    // Simple hi/hello
    return VOICE_SCENARIOS.greeting;
  }

  // 2. Introduction scenario ("Please brief me who you are")
  if (
    q.includes("brief") ||
    q.includes("who you are") ||
    q.includes("who are you") ||
    q.includes("tell me about yourself") ||
    q.includes("introduce") ||
    q.includes("who is rashmi") ||
    q.includes("background") ||
    q.includes("profile")
  ) {
    return VOICE_SCENARIOS.introduction;
  }

  // 3. Best project scenario ("Explain the best project")
  if (
    q.includes("best project") ||
    q.includes("top project") ||
    q.includes("flagship") ||
    q.includes("trust platform") ||
    q.includes("enterprise") ||
    (q.includes("explain") && (q.includes("project") || q.includes("work")))
  ) {
    return VOICE_SCENARIOS.bestProject;
  }

  // 4. Contact scenario ("How to contact with you?")
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("hire") ||
    q.includes("linkedin") ||
    q.includes("phone") ||
    q.includes("call")
  ) {
    return VOICE_SCENARIOS.contact;
  }

  // Other specific inquiries
  if (q.includes("streamalpha") || q.includes("kafka") || q.includes("streaming")) {
    return VOICE_SCENARIOS.streamalpha;
  }
  if (q.includes("revenueguard") || q.includes("revenue") || q.includes("recovery")) {
    return VOICE_SCENARIOS.revenueguard;
  }
  if (q.includes("nexus") || q.includes("rag") || q.includes("qdrant") || q.includes("search")) {
    return VOICE_SCENARIOS.nexusagent;
  }
  if (q.includes("ngo") || q.includes("social") || q.includes("teach") || q.includes("shiksha")) {
    return VOICE_SCENARIOS.ngo;
  }
  if (q.includes("education") || q.includes("college") || q.includes("nit") || q.includes("degree")) {
    return {
      voiceText:
        "Rashmi graduated from NIT Kurukshetra with a B.Tech in Information Technology and a CGPA of 8.0 out of 10. She focused heavily on distributed systems, operating systems, and computer networks.",
      displayText: `### 🎓 Education\n\n• **Institution**: National Institute of Technology (NIT) Kurukshetra\n• **Degree**: B.Tech in Information Technology (2022–2026)\n• **Academic Score**: CGPA 8.0 / 10.0\n• **Core Coursework**: Distributed Systems, Operating Systems, Computer Networks, Database Management Systems, Algorithm Design.`,
    };
  }
  if (q.includes("skill") || q.includes("stack") || q.includes("technolog") || q.includes("python")) {
    return {
      voiceText:
        "Rashmi's core technical stack includes Python, FastAPI, LangGraph, Apache Kafka, Redpanda, Redis, PostgreSQL, Qdrant, Docker, and Next.js. She specializes in building deterministic AI agent workflows and real-time streaming backends.",
      displayText: `### 🛠️ Technical Stack\n\n• **AI & Agent Systems**: LangGraph, LangChain, Multi-Agent State Machines, RAG, HITL Policies\n• **Backend & Distributed**: Python 3.11+, FastAPI, Apache Kafka, Redpanda, Redis 7, Async SQLAlchemy\n• **Databases & Vector**: PostgreSQL 16, Qdrant, Elasticsearch\n• **Infrastructure & Observability**: Docker, Prometheus, Grafana, OpenTelemetry\n• **Frontend**: Next.js 15, TypeScript, React, WebAssembly`,
    };
  }

  // Default fallback
  return {
    voiceText:
      "I can answer anything about Rashmi! Ask me to introduce her, explain her best project the Enterprise Agent Trust Platform, her StreamAlpha streaming platform, her education at NIT Kurukshetra, or how to contact her directly.",
    displayText: `I can help you explore Rashmi's engineering work:\n\n• 🎙️ *"Brief me who you are"*\n• 🛡️ *"Explain the best project"*\n• ⚡ *"Tell me about StreamAlpha"*\n• 📬 *"How to contact you?"*\n\nFeel free to speak via the microphone or type any question!`,
  };
}

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeSpeechSnippet, setActiveSpeechSnippet] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "Hi! I am Rashmi's AI Voice Assistant. You can speak to me or type. Try saying: \"Hi Rashmi, how are you?\" or \"Please brief me who you are!\"",
      timestamp: "Ready",
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Web Speech APIs
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");
          setInput(transcript);

          // If final result, send immediately
          if (event.results[0].isFinal) {
            handleSend(transcript, true);
          }
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

  // Global listener to open voice assistant from navbar or other buttons
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener("open-voice-assistant", handleOpen);
    return () => window.removeEventListener("open-voice-assistant", handleOpen);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Stop speech when assistant closes
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setActiveSpeechSnippet("");
    }
  }, []);

  // Speech synthesis speaker
  const speakText = useCallback(
    (text: string) => {
      if (!voiceEnabled || !synthRef.current) return;

      synthRef.current.cancel(); // Stop ongoing speech

      const cleanText = text.replace(/[\*\#\_\[\]\(\)]/g, " ");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = synthRef.current.getVoices();
      const naturalVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Samantha") ||
            v.name.includes("Zira") ||
            v.name.includes("Female"))
      );
      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setActiveSpeechSnippet(cleanText.slice(0, 75) + "...");
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveSpeechSnippet("");
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveSpeechSnippet("");
      };

      synthRef.current.speak(utterance);
    },
    [voiceEnabled]
  );

  // Send query & generate response
  const handleSend = useCallback(
    (textToSend?: string, isVoice: boolean = false) => {
      const query = (textToSend || input).trim();
      if (!query) return;

      const userMsg: Message = {
        id: "msg-" + Date.now(),
        role: "user",
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isVoice,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsListening(false);

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Resolve intent
      setTimeout(() => {
        const { voiceText, displayText } = resolveIntent(query);

        const assistantMsg: Message = {
          id: "msg-" + (Date.now() + 1),
          role: "assistant",
          content: displayText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Speak aloud
        speakText(voiceText);
      }, 250);
    },
    [input, speakText]
  );

  // Toggle voice recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. You can type in your query below!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Recognition error:", err);
      }
    }
  };

  const samplePrompts = [
    { label: '🎙️ "Hi Rashmi, how are you?"', prompt: "Hi Rashmi, how are you?" },
    { label: '🎙️ "Brief me who you are"', prompt: "Please brief me who you are" },
    { label: '🎙️ "Explain the best project"', prompt: "Explain the best project" },
    { label: '🎙️ "How to contact you?"', prompt: "How to contact with you?" },
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Quick hint badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B0D10]/90 border border-[#61F4DE]/30 text-white font-mono text-xs shadow-lg backdrop-blur-md animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#61F4DE] animate-ping" />
            <span className="text-[#61F4DE] font-semibold">Talk with Rashmi AI</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#050607] via-[#0E1318] to-[#121B24] border-2 border-[#61F4DE] shadow-[0_0_25px_rgba(97,244,222,0.35)] hover:shadow-[0_0_35px_rgba(97,244,222,0.6)] hover:scale-105 transition-all duration-300"
            aria-label="Open AI Voice Assistant"
          >
            {/* Avatar image */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/avatar.jpg"
                alt="Rashmi Shaw Digital Avatar"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>

            {/* Glowing mic badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#61F4DE] text-[#050607] flex items-center justify-center shadow-md">
              <Mic className="w-3 h-3" />
            </div>
          </button>
        </div>
      )}

      {/* Main Voice Assistant Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? "bottom-6 right-6 w-80 rounded-2xl"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[440px] max-h-[86vh] rounded-2xl"
          } border border-[#61F4DE]/30 bg-[#07090C]/98 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-[#0B0F14]">
            <div className="flex items-center gap-3">
              {/* Avatar with speaking pulse halo */}
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                    isSpeaking
                      ? "border-[#61F4DE] shadow-[0_0_15px_rgba(97,244,222,0.6)] animate-pulse"
                      : isListening
                      ? "border-[#F87171] shadow-[0_0_15px_rgba(248,113,113,0.6)] animate-pulse"
                      : "border-white/20"
                  }`}
                >
                  <Image
                    src="/avatar.jpg"
                    alt="Rashmi Shaw AI Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Status Dot */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0B0F14] ${
                    isSpeaking
                      ? "bg-[#61F4DE]"
                      : isListening
                      ? "bg-[#F87171]"
                      : "bg-[#6EE7A8]"
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white text-sm">Rashmi AI Voice</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-[#989CA5] font-mono">
                  {isSpeaking
                    ? "Speaking answer..."
                    : isListening
                    ? "Listening to you..."
                    : "NIT Kurukshetra · AI Systems"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 text-[#989CA5]">
              {/* Mute/Unmute speech */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setVoiceEnabled(!voiceEnabled);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  voiceEnabled
                    ? "text-[#61F4DE] hover:bg-white/10"
                    : "text-[#656A74] hover:bg-white/10"
                }`}
                title={voiceEnabled ? "Voice audio enabled (Click to mute)" : "Voice audio muted (Click to enable)"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  if (recognitionRef.current) recognitionRef.current.stop();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close voice assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Audio Waveform Bar (When Speaking or Listening) */}
          {(isSpeaking || isListening) && (
            <div className="px-4 py-2 bg-gradient-to-r from-[#61F4DE]/10 via-[#8B7CFF]/10 to-[#61F4DE]/10 border-b border-[#61F4DE]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Visualizer bars */}
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-[#61F4DE] rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1 h-5 bg-[#61F4DE] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1 h-2 bg-[#61F4DE] rounded-full animate-bounce [animation-delay:300ms]" />
                  <span className="w-1 h-6 bg-[#61F4DE] rounded-full animate-bounce [animation-delay:200ms]" />
                  <span className="w-1 h-4 bg-[#61F4DE] rounded-full animate-bounce [animation-delay:100ms]" />
                </div>
                <span className="text-xs font-mono text-[#61F4DE]">
                  {isSpeaking ? "Voice Synthesis Active" : "Capturing Microphone Audio..."}
                </span>
              </div>

              {isSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono transition-colors"
                >
                  <Square className="w-2.5 h-2.5 fill-current" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          )}

          {/* Chat / Transcript Stream */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[220px] max-h-[380px] font-sans"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-white/20 mt-1">
                    <Image
                      src="/avatar.jpg"
                      alt="Avatar"
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#61F4DE]/15 text-white border border-[#61F4DE]/30 rounded-tr-sm"
                      : "bg-[#11161D] text-[#E4E4E7] border border-white/10 rounded-tl-sm shadow-md"
                  }`}
                >
                  {/* Rich markdown rendering helper */}
                  <div className="whitespace-pre-wrap font-sans space-y-1">
                    {msg.content.split("\n\n").map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph.split("**").map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? (
                            <strong key={cIdx} className="text-white font-semibold">
                              {chunk}
                            </strong>
                          ) : (
                            <React.Fragment key={cIdx}>{chunk}</React.Fragment>
                          )
                        )}
                      </p>
                    ))}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-[#656A74] font-mono">
                    <span>{msg.timestamp}</span>
                    {msg.isVoice && (
                      <span className="flex items-center gap-1 text-[#61F4DE]">
                        <Mic className="w-2.5 h-2.5" /> Spoken
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Voice Prompt Pills */}
          <div className="px-3 py-2 border-t border-white/10 bg-[#080B0F]/90 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 w-max">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.prompt)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#61F4DE]/15 hover:border-[#61F4DE]/40 border border-white/10 text-[11px] font-mono text-[#989CA5] hover:text-[#61F4DE] transition-all whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Controls */}
          <div className="p-3 border-t border-white/10 bg-[#0B0F14] flex items-center gap-2">
            {/* Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`relative p-2.5 rounded-xl border font-mono text-xs transition-all flex items-center justify-center ${
                isListening
                  ? "bg-[#F87171] border-[#F87171] text-white shadow-[0_0_20px_rgba(248,113,113,0.5)] animate-pulse"
                  : "bg-[#61F4DE]/15 hover:bg-[#61F4DE]/25 border-[#61F4DE]/40 text-[#61F4DE]"
              }`}
              title={isListening ? "Listening... click to send" : "Click to speak using your microphone"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={isListening ? "Listening... speak now" : "Ask or speak anything..."}
              className="flex-1 bg-[#050607] border border-white/10 focus:border-[#61F4DE]/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#656A74] font-mono focus:outline-none transition-colors"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] font-semibold transition-all disabled:opacity-30 disabled:hover:bg-[#61F4DE]"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
