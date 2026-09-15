# rashmishaw.vercel.app ⚡
### Personal Portfolio & Interactive Systems Playground

> **Live Website:** [rashmishaw.vercel.app](https://rashmishaw.vercel.app) · **Resume:** [`public/resume.pdf`](./public/resume.pdf)

Hey! I'm **Rashmi Shaw**, a backend and AI systems engineer from Kolkata, India, graduating from the **National Institute of Technology, Kurukshetra** (Class of 2026).

This repository contains the source code for my personal portfolio. Rather than building a static résumé page, I designed this site as an **interactive computing playground** that demonstrates the distributed systems, agentic state machines, and cryptographic verification patterns I build in real projects.

---

## 💡 Why I Built This

Most developer portfolios are static marketing templates with cards and progress bars. I wanted something that reflects how I actually write software:
- **State machines over black-box prompts** — deterministic gates, approval checkpoints, and rollback strategies.
- **Resilience under load** — backpressure queues, circuit breakers, and bounded buffers.
- **Mathematical proof over assumptions** — cryptographic hash chains for tamper-evident audit trails.
- **Direct interaction** — live interactive diagrams, simulated tamper injection, and an on-device AI voice assistant.

---

## 🛠️ Interactive Engineering Highlights on the Site

### 1. 🎙️ Client-Side AI Voice Assistant
- Powered entirely by the native browser **Web Speech API** (`SpeechRecognition` + `SpeechSynthesis`).
- Zero cloud API latency or third-party audio streaming costs.
- Custom stateful conversation engine with wake triggers, animated digital avatar, and instant answers about my technical stack, project architectures, and contact information.

### 2. 🔐 Chained Cryptographic Evidence Ledger
- Located on the **Enterprise Agent Trust Platform** case study.
- Simulates an append-only SHA-256 blockchain ledger storing immutable agent execution traces.
- Includes a live **Tamper Simulation** button that alters a database record and demonstrates the $O(N)$ hash-verification algorithm detecting and healing the break in real time.

### 3. 🌊 High-Frequency Backpressure Flow Simulator
- Located on the **StreamAlpha** case study.
- Visualizes Kafka partition ingestion, bounded ring-buffer backpressure, and client websocket streaming rendering at 60 FPS via FINOS Perspective WebAssembly.

### 4. 💻 In-Browser Interactive Terminal
- Built into the About section with support for commands like `whoami`, `projects`, `skills`, `metrics`, `contact`, and `clear`.

---

## 🚀 The 4 Flagship Projects

| Project | Core Stack | Key Achievement / Impact | Links |
|---|---|---|---|
| **Enterprise Agent Trust Platform** | Python, FastAPI, LangGraph, PostgreSQL, Docker | 9-node governed agent state machine with RBAC, human-in-the-loop pause gates, and SHA-256 audit ledger. **0.0% unauthorized actions** across 20 synthetic attack scenarios. | [Code](https://github.com/musi22/enterprise-agent-trust-platform) · [Live Demo](https://enterprise-ai-web-production.up.railway.app/) |
| **StreamAlpha** | Go, Kafka, Docker, WebAssembly, FINOS Perspective | High-throughput market data streaming pipeline. Handles **10,000+ events/sec** with zero packet loss under peak market burst. | [Code](https://github.com/musi22/StreamAlpha) |
| **RevenueGuard** | Python, FastAPI, Redis, AsyncIO | Sub-millisecond revenue leakage triage with statistical A/B holdout testing measuring true causal recovery lift. **65% API latency reduction**. | [Code](https://github.com/musi22/RevenueGuard) |
| **NexusAgent (nexus_ai)** | Python, Qdrant, Elasticsearch, FastAPI | Enterprise multi-agent search engine fusing dense vector embeddings and BM25 keywords via Reciprocal Rank Fusion (RRF). | [Code](https://github.com/musi22/nexus_ai) |

> Want to see other open-source projects, experiments, and hackathon prototypes? Explore my complete profile at [github.com/musi22](https://github.com/musi22).

---

## 🏗️ Architecture & Tech Stack

```
developer_portfolio/
├── public/
│   ├── avatar.jpg              # Digital engineer avatar
│   ├── resume.pdf              # Official 1-page engineering resume
│   └── og-image.png            # OpenGraph social share card
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts, metadata & shell
│   │   ├── page.tsx            # Main single-page interactive control center
│   │   └── work/[slug]/        # Deep-dive engineering case study pages
│   ├── components/
│   │   ├── diagrams/           # Interactive architecture & ledger visualizers
│   │   ├── interactive/        # VoiceAssistant, Terminal, CommandPalette, StatusPanel
│   │   ├── navigation/         # CommandNavbar, CommandFooter, MobileDrawer
│   │   ├── sections/           # HeroSection, FeaturedProjects, Capabilities, About, Contact
│   │   └── ui/                 # Reusable buttons, badges, modals & icons
│   └── content/
│       └── data/               # Strongly-typed data: personal, projects, capabilities
```

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: TypeScript (strict type safety enabled across all modules)
- **Styling**: Tailwind CSS v4 & custom CSS variables for dark-mode telemetry aesthetics
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & React Testing Library (100% passing test suite)
- **Deploy Target**: Vercel Edge Network / Railway

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### 1. Clone the repository
```bash
git clone https://github.com/musi22/developer_portfolio.git
cd developer_portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run tests & type checks
```bash
npm run test
npm run lint
```

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 📊 Performance & Accessibility Benchmarks

- **60 FPS Smooth Navigation**: Heavy 3D WebGL rendering replaced with lightweight SVG procedural animations and CSS transforms to eliminate GPU heating and frame drops.
- **Zero CLS (Cumulative Layout Shift)**: Critical image assets have explicit aspect ratios and priority loading.
- **Keyboard & Screen Reader Accessible**: Full ARIA roles, skip links, semantic headings (`h1` through `h4`), and command palette shortcut (`Ctrl + K` / `Cmd + K`).

---

## 📬 Contact & Connect

I am actively looking for **AI Systems Engineer**, **Backend Engineer**, and **Platform Engineering** roles. Open to opportunities across India, worldwide remote roles, and international relocation.

- **Email**: [shawrashmi7@gmail.com](mailto:shawrashmi7@gmail.com)
- **Phone**: +91-9051307659
- **LinkedIn**: [linkedin.com/in/rashmi-shaw-92b444230](https://www.linkedin.com/in/rashmi-shaw-92b444230)
- **GitHub**: [github.com/musi22](https://github.com/musi22)
- **LeetCode**: [leetcode.com/u/rinki_2005](https://leetcode.com/u/rinki_2005/) (500+ problems solved)

---

<p align="center">
  Crafted with ☕, curiosity, and late nights by <strong>Rashmi Shaw</strong>.<br />
  Released under the <a href="./LICENSE">MIT License</a>.
</p>
