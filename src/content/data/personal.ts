// ── Personal Data ─────────────────────────────────────
// Update these fields with your real information

export const personal = {
  name: "Rashmi Shaw",
  firstName: "Rashmi",
  lastName: "Shaw",
  title: "AI Engineer & Full-Stack Developer",
  roles: [
    "AI Engineer",
    "Full Stack Developer",
    "Data Scientist",
    "Backend Engineer",
  ],
  bio: `Final-year IT student with hands-on experience building AI-powered and data-driven applications. Proficient in Python and deep learning frameworks (PyTorch, TensorFlow), with practical exposure to NLP, LLM integration, and computer vision pipelines. Passionate about predictive modeling, feature engineering, and deriving actionable insights from data.`,
  bioShort: "Building intelligent AI systems and scalable full-stack applications.",

  // Social links
  github: "https://github.com/musi22",
  githubUsername: "musi22",
  linkedin: "https://www.linkedin.com/in/rashmi-shaw-92b444230",
  twitter: "https://leetcode.com/u/rinki_2005/",
  email: "shawrashmi7@gmail.com",
  phone: "+91 9051307659",
  website: "https://rashmishaw.dev",

  // Location
  location: "Kolkata, West Bengal, India",
  timezone: "IST (UTC+5:30)",

  // Availability
  availableForWork: true,
  availabilityNote: "Open to full-time roles (B.Tech 2026)",

  // Resume
  resumeUrl: "/resume.pdf",

  // Avatar
  avatarUrl: "/avatar.jpg",

  // Open Graph / SEO
  ogDescription:
    "Rashmi Shaw — AI Engineer & Full-Stack Developer B.Tech Student at NIT Kurukshetra.",
} as const;

export type Personal = typeof personal;
