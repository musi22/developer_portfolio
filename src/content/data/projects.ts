import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    slug: "basketball-video-analysis",
    title: "Basketball Video Analysis",
    tagline: "Computer Vision & Predictive Modeling pipeline",
    description:
      "An end-to-end ML pipeline built using YOLO and OpenCV, achieving 95% player detection accuracy across real-match footage. Performed feature engineering on player trajectory data for multi-object tracking, team classification, and ball possession prediction.",
    problem:
      "Analyzing player performance and ball possession manually from broadcast match videos is labor-intensive and error-prone.",
    solution:
      "Automated basketball player detection, tracking, and team classification using YOLO with 100x performance optimization through caching. Implemented multi-object tracking with centroid matching, HSV-based team classification, and ball possession detection.",
    category: "AI/ML",
    tags: ["YOLO", "OpenCV", "Python", "Deep Learning", "Computer Vision"],
    tech: [
      { name: "Python", color: "#3776AB" },
      { name: "YOLO", color: "#FF4500" },
      { name: "OpenCV", color: "#5C3EE8" },
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "Seaborn", color: "#4C72B0" },
    ],
    features: [
      {
        title: "95% Detection Accuracy",
        description: "YOLO-powered real-time detection & localization of players and balls",
        icon: "🎯",
      },
      {
        title: "Multi-Object Tracking",
        description: "Centroid matching tracker with velocity prediction to resolve ID swaps",
        icon: "🔄",
      },
      {
        title: "HSV Team Classification",
        description: "Auto-classification based on jersey dominant colors in HSV space",
        icon: "👕",
      },
    ],
    status: "Live",
    featured: true,
    githubUrl: "https://github.com/musi22/bounce_the_ball",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    slug: "vibecode-playground",
    title: "Vibecode Playground",
    tagline: "AI-Powered Online Coding Platform & IDE",
    description:
      "A full-stack online coding playground featuring browser-based code execution (WebContainers), multi-user project files management, OAuth logins, and an integrated local LLM assistant (Ollama).",
    problem:
      "Coding playgrounds often require heavy backend infrastructure for code execution, leading to latency and high cloud costs.",
    solution:
      "Architected WebContainers-based client-side execution, cutting developer onboarding to under 1 minute. Integrated local Ollama LLMs for conversational AI assistance.",
    category: "Full Stack",
    tags: ["Next.js", "React", "PostgreSQL", "Ollama", "WebContainers"],
    tech: [
      { name: "Next.js", color: "#ffffff" },
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Ollama", color: "#BE185D" },
      { name: "PostgreSQL", color: "#336791" },
    ],
    features: [
      {
        title: "WebContainers IDE",
        description: "Execute Node.js and frameworks directly inside the browser sandbox",
        icon: "💻",
      },
      {
        title: "Ollama AI Assistant",
        description: "Local conversational AI inside the IDE for code assistance & automation",
        icon: "🤖",
      },
      {
        title: "User Dashboards",
        description: "Actionable reports, platform insights, and usage statistics",
        icon: "📊",
      },
    ],
    status: "Live",
    featured: true,
    githubUrl: "https://github.com/musi22/codewithvibe",
    createdAt: "2025-02-01",
  },
  {
    id: "3",
    slug: "jobtaker-portal",
    title: "JobTaker",
    tagline: "Distributed Microservices Recruitment Platform",
    description:
      "A distributed microservices-based job portal backend utilizing Kafka, Redis, Node.js, and PostgreSQL. Load-tested up to 5,000+ concurrent users with p95 latency under 200ms.",
    problem:
      "Monolithic job platforms experience downtime and slow database access under high load spikes, such as popular application openings.",
    solution:
      "Designed an event-driven architecture with Kafka for event streaming and Redis caching, scaling services independently. Database query optimizations cut latency by 65%.",
    category: "Backend",
    tags: ["Microservices", "Kafka", "Redis", "Node.js", "PostgreSQL", "k6"],
    tech: [
      { name: "Node.js", color: "#339933" },
      { name: "Kafka", color: "#2F80ED" },
      { name: "Redis", color: "#DC382D" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Docker", color: "#2496ED" },
    ],
    features: [
      {
        title: "Distributed Microservices",
        description: "Event-driven architecture with Apache Kafka message brokers",
        icon: "⚙️",
      },
      {
        title: "High Performance Caching",
        description: "Redis caching with optimized indexes reducing queries by 65%",
        icon: "⚡",
      },
      {
        title: "Robust JWT Auth & RBAC",
        description: "Role-based access control, OTP verification, and retry systems",
        icon: "🔑",
      },
    ],
    status: "Live",
    featured: true,
    githubUrl: "https://github.com/musi22/job_portal",
    createdAt: "2025-03-01",
  },
  {
    id: "4",
    slug: "sketch-to-photo",
    title: "Sketch-to-Photo Translation",
    tagline: "Deep CNN architectures for realism translation",
    description:
      "A deep learning pipeline for translating sketches into high-realism photos using U-Net and ResNet architectures, achieving a 20% increase in SSIM/PSNR over baselines.",
    problem:
      "Translating hand-drawn sketches to realistic photos has historically suffered from blurriness and lack of texture fidelity.",
    solution:
      "Optimized CNN training utilizing extensive data augmentation, cosine LR scheduling, and early stopping. Reduced overall model training time by 70%.",
    category: "AI/ML",
    tags: ["U-Net", "ResNet", "Deep Learning", "CNN", "PyTorch"],
    tech: [
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "OpenCV", color: "#5C3EE8" },
      { name: "Python", color: "#3776AB" },
    ],
    features: [
      {
        title: "U-Net & ResNet Pipeline",
        description: "Advanced deep residual mappings for structural consistency",
        icon: "🎨",
      },
      {
        title: "Efficient Training Loop",
        description: "70% reduction in training duration using cosine learning rates",
        icon: "⚡",
      },
      {
        title: "Broad Applications",
        description: "Supports forensics, digital art recreation, and heritage restoration",
        icon: "🏛️",
      },
    ],
    status: "Live",
    featured: false,
    githubUrl: "https://github.com/musi22",
    createdAt: "2025-04-01",
  },
  {
    id: "5",
    slug: "talksy-chat-platform",
    title: "Talksy",
    tagline: "Microservices Real-Time Chat Platform",
    description:
      "A full-stack real-time messaging platform split into three independently deployable Node.js microservices (user, chat, mail) with passwordless OTP authentication, live WebSocket messaging, and zero-setup local development via automatic in-memory DB fallbacks.",
    problem:
      "Real-time chat apps are commonly built as monoliths that couple auth, messaging, and notifications together, making them hard to scale or deploy independently.",
    solution:
      "Decomposed the system into isolated services with their own databases, connected via RabbitMQ for async OTP delivery and Socket.io for live messaging. Every service auto-detects local/Docker connection strings and swaps to in-memory MongoDB and a custom in-memory Redis mock, so the whole stack runs with zero infrastructure installed.",
    category: "Full Stack",
    tags: ["Microservices", "WebSockets", "Node.js", "Next.js", "TypeScript", "RabbitMQ"],
    tech: [
      { name: "Next.js", color: "#ffffff" },
      { name: "Node.js", color: "#339933" },
      { name: "Socket.io", color: "#010101" },
      { name: "MongoDB", color: "#47A248" },
      { name: "RabbitMQ", color: "#FF6600" },
      { name: "Redis", color: "#DC382D" },
    ],
    features: [
      {
        title: "Passwordless OTP Auth",
        description: "Email OTP login with Redis-backed rate limiting and JWT cross-service authorization",
        icon: "🔐",
      },
      {
        title: "Real-Time Messaging",
        description: "Socket.io gateway with typing indicators, live presence, and per-conversation rooms",
        icon: "💬",
      },
      {
        title: "Zero-Setup Dev Mode",
        description: "Auto in-memory MongoDB & Redis fallbacks — no Docker or DB install required to run locally",
        icon: "⚡",
      },
    ],
    status: "Live",
    featured: true,
    githubUrl: "https://github.com/musi22/Talksy",
    createdAt: "2026-07-20",
  },
  {
    id: "6",
    slug: "promptpilot-ai",
    title: "PromptPilot AI",
    tagline: "Offline Prompt Engineering Chrome Extension",
    description:
      "A Manifest V3 Chrome extension that sits alongside ChatGPT, Claude, and Gemini to score and improve prompts offline via a local heuristic engine, with optional AI rewriting across 5 LLM providers.",
    problem:
      "Prompt engineers constantly switch between LLM chat tabs with no consistent way to check whether a prompt is well-formed, or to reuse effective patterns across providers.",
    solution:
      "Built a zero-network heuristic engine that classifies prompts into 19 domain categories and scores clarity/specificity entirely client-side, plus an optional multi-provider rewriting layer (OpenAI, Anthropic, Gemini, OpenRouter, Ollama) routed through a background-worker relay to bypass page CORS restrictions.",
    category: "Frontend",
    tags: ["Chrome Extension", "TypeScript", "React", "LLM Integration", "Manifest V3"],
    tech: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Vite", color: "#646CFF" },
      { name: "Zustand", color: "#443E38" },
      { name: "Tailwind CSS", color: "#38BDF8" },
    ],
    features: [
      {
        title: "Offline Prompt Doctor",
        description: "Zero-network engine scoring prompt clarity across 19 domain categories",
        icon: "🩺",
      },
      {
        title: "Multi-Provider Rewriting",
        description: "Optional AI rewriting via OpenAI, Anthropic, Gemini, OpenRouter, or local Ollama",
        icon: "🔌",
      },
      {
        title: "Synced Everywhere",
        description: "Popup, side panel & options page state synced instantly via Zustand + chrome.storage",
        icon: "🔄",
      },
    ],
    status: "Live",
    featured: true,
    githubUrl: "https://github.com/musi22/prompt_ai",
    createdAt: "2026-07-20",
  },
  {
    id: "7",
    slug: "nexusagent-rag-platform",
    title: "NexusAgent",
    tagline: "Enterprise Multi-Agent RAG Platform",
    description:
      "A full-stack prototype for an enterprise RAG platform pairing a production-grade FastAPI auth/data backend with a high-fidelity, interactive multi-agent chat dashboard for querying GitHub, Jira, Slack, Confluence, and PDF sources.",
    problem:
      "Enterprise teams have knowledge scattered across code, tickets, chat, and docs, with no single place to ask natural-language questions and get cited answers.",
    solution:
      "Designed an async SQLAlchemy schema (Postgres) already modeling documents, vector/keyword index flags, and versioned agent prompts ahead of the retrieval layer, backed by Clerk auth with Svix-signature-verified webhooks. Paired it with a fully interactive Next.js dashboard prototyping the intended multi-agent RAG chat UX (planning → retrieval → verification → synthesis) and data-connector management screens.",
    category: "Full Stack",
    tags: ["FastAPI", "Next.js", "RAG", "PostgreSQL", "System Design"],
    tech: [
      { name: "Next.js", color: "#ffffff" },
      { name: "FastAPI", color: "#009688" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Qdrant", color: "#DC244C" },
      { name: "Clerk", color: "#6C47FF" },
    ],
    features: [
      {
        title: "RAG-Ready Schema",
        description: "Async SQLAlchemy models with per-store index flags and versioned agent prompts",
        icon: "🗄️",
      },
      {
        title: "Verified Webhook Auth",
        description: "Clerk identity sync via Svix HMAC-signature-verified webhooks into Postgres",
        icon: "🛡️",
      },
      {
        title: "Multi-Agent UX Prototype",
        description: "Interactive dashboard simulating a planner → retrieval → verification → synthesis pipeline",
        icon: "🤖",
      },
    ],
    status: "Live",
    featured: false,
    githubUrl: "https://github.com/musi22/nexus_ai",
    createdAt: "2026-07-07",
  },
  {
    id: "8",
    slug: "instagram-ai-clone",
    title: "Instagram AI Clone",
    tagline: "AI-Powered Social Media Platform",
    description:
      "A full-stack Instagram clone with a real feed, stories, DMs, and profiles, layered with genuine AI features: Google Gemini-powered content moderation and caption generation, Hugging Face embeddings with Qdrant semantic search for Explore, and a heuristic feed-ranking algorithm — every AI feature has a deterministic fallback so the app runs fully free with zero API keys configured.",
    problem:
      "Demonstrating real AI-product engineering needs more than a UI mockup — it requires actual model calls, graceful degradation when providers are unavailable, and a data layer that supports it end-to-end.",
    solution:
      "Built a FastAPI + PostgreSQL backend with a repository-pattern data layer, JWT auth, and an AI service module that calls Gemini for moderation/captions and Hugging Face for embeddings, each with a rule-based fallback so every endpoint works with zero configured API keys. Wired Qdrant for semantic Explore search and a transparent scoring function (follow proximity + engagement) for feed ranking, backed by a real pytest suite with mocked external services.",
    category: "Full Stack",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Qdrant", "Gemini AI", "Redis"],
    tech: [
      { name: "Next.js", color: "#ffffff" },
      { name: "FastAPI", color: "#009688" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Qdrant", color: "#DC244C" },
      { name: "Redis", color: "#DC382D" },
      { name: "Gemini AI", color: "#4285F4" },
    ],
    features: [
      {
        title: "AI Content Moderation",
        description: "Live Gemini toxicity/NSFW scanning on every post, with rule-based fallback if no key is set",
        icon: "🛡️",
      },
      {
        title: "Semantic Explore Search",
        description: "Qdrant vector search over Hugging Face embeddings, falling back to engagement sort",
        icon: "🔍",
      },
      {
        title: "Transparent Feed Ranking",
        description: "Scores posts by follow proximity, engagement, and ownership — real data, real sort",
        icon: "📊",
      },
    ],
    status: "Live",
    featured: true,
    githubUrl: "https://github.com/musi22/instagram-ai-clone/tree/master",
    createdAt: "2026-07-20",
  },
];
