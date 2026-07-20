# Rashmi Shaw — Portfolio OS

An interactive, desktop-OS-styled developer portfolio for **Rashmi Shaw**, AI Engineer & Full-Stack Developer (B.Tech IT, NIT Kurukshetra, 2026). Instead of a static one-page resume, the site boots into a simulated desktop with draggable windows for each section — About, Resume, Projects, Skills, Blog, GitHub, an AI assistant, a working terminal, and a contact form.

**Live:** [portfolio-one-black-12.vercel.app](https://portfolio-one-black-12.vercel.app)

---

## Highlights

- **Desktop OS shell** — boot sequence, draggable/resizable windows, dock, taskbar, and command palette (⌘K), built with Framer Motion including custom 3D tilt interactions on project cards.
- **Live GitHub integration** — profile stats and repos pulled directly from the GitHub REST API at request time.
- **AI Assistant** — chat window backed by a real LLM (OpenAI, Groq, or xAI/Grok, auto-selected by whichever key is configured), with a graceful scripted fallback when no key is set.
- **Working terminal emulator** — `about`, `projects`, `skills`, `resume`, `contact`, `whoami`, `neofetch`, and more, with command history and autocomplete.
- **Contact form that actually delivers** — validated with Zod + React Hook Form, sent via [Resend](https://resend.com).
- **Downloadable resume** — real PDF served from `/resume.pdf`.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling / Motion | Tailwind CSS 4, Framer Motion, GSAP |
| Forms & Validation | React Hook Form, Zod |
| AI | OpenAI / Groq / xAI (OpenAI-compatible chat completions) |
| Email | Resend |
| Rate Limiting | Upstash Redis + Ratelimit |
| Content | MDX (next-mdx-remote) for blog posts |

## Project Structure

```
src/
├── app/                  # Routes + API endpoints (chat, contact, GitHub proxy)
├── components/
│   ├── desktop/           # Window manager, dock, taskbar, command palette
│   ├── landing/            # Boot sequence + hero
│   └── ui/                # Shared UI primitives (e.g. 3D tilt cards)
├── features/               # One folder per desktop app (about, projects, ai, terminal, ...)
├── content/data/           # Portfolio content (personal info, projects, skills)
└── hooks/                  # Window manager & settings state
```

## Running Locally

```bash
npm install
npm run dev
```

Copy `.env.local` and fill in the values you need — the app runs and degrades gracefully with zero keys configured (AI Assistant and GitHub app show scripted fallbacks):

```env
GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_OWNER_NAME="Your Name"

# Any one enables the AI Assistant:
# GROQ_API_KEY=gsk_...
# OPENAI_API_KEY=sk-...
# XAI_API_KEY=xai-...

# Enables the contact form:
RESEND_API_KEY=re_...
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` or run:

```bash
vercel --prod
```
