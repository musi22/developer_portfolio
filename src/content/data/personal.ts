// Personal Data for Rashmi Shaw — AI Systems & Backend Engineer

export const personal = {
  name: "Rashmi Shaw",
  firstName: "Rashmi",
  lastName: "Shaw",
  title: "AI Systems & Backend Engineer",
  roles: [
    "AI Systems Engineer",
    "Backend Engineer",
    "Agent Systems Engineer",
    "Applied AI Engineer",
    "Distributed Systems Builder",
  ],
  tagline: "I build AI systems that can be trusted in production.",
  bio: "I’m a recent B.Tech Information Technology graduate from NIT Kurukshetra who enjoys building systems where AI meets serious backend engineering. My work focuses on agent reliability, distributed services, retrieval systems, authorization, observability and production failure handling.",
  bioSecondary: "I’m especially interested in AI systems engineering, backend/platform engineering, applied AI and open-source infrastructure.",
  
  // Terminal status
  terminalFocus: [
    "reliable agents",
    "real-time infrastructure",
    "open-source engineering",
  ],

  // Location & Work Preference
  location: "Kolkata, India",
  workPreference: "Open to opportunities in India, remote global roles, and relocation worldwide.",
  relocation: "Worldwide",
  remoteReady: true,

  // Contact & Social
  email: "shawrashmi7@gmail.com",
  phone: "+91-9051307659",
  github: "https://github.com/musi22",
  githubUsername: "musi22",
  linkedin: "https://www.linkedin.com/in/rashmi-shaw-92b444230",
  leetcode: "https://leetcode.com/u/rinki_2005/",
  website: "https://rashmishaw.dev",
  resumeUrl: "/resume.pdf",

  // Education
  education: {
    institution: "National Institute of Technology, Kurukshetra",
    shortName: "NIT Kurukshetra",
    degree: "B.Tech in Information Technology",
    period: "2022–2026",
    cgpa: "8.0 / 10.0",
    highlights: [
      "Core courses: Distributed Systems, Operating Systems, Database Management Systems, Computer Networks, Data Structures & Algorithms",
      "500+ DSA algorithmic problems solved on LeetCode with strong focus on graph theory, dynamic programming, and concurrency",
    ],
  },

  // Leadership & Community
  leadership: {
    role: "Core Member",
    organization: "Shiksha NGO",
    summary: "Supported educational initiatives reaching 180+ underprivileged students and helped coordinate 150+ volunteers across educational workshops, logistics, and resource mobilization.",
    studentsImpacted: 180,
    volunteersCoordinated: 150,
  },

  // Verified Proof Metrics
  proofMetrics: [
    {
      id: "dsa",
      metric: "500+",
      label: "DSA problems solved",
      context: "LeetCode algorithmic mastery across trees, graphs, dynamic programming, and concurrency",
      link: "https://leetcode.com/u/rinki_2005/",
      linkText: "View LeetCode profile",
    },
    {
      id: "load-test",
      metric: "5K+",
      label: "Concurrent-user load test",
      context: "Validated on StreamAlpha high-frequency event streaming with zero dropped packets under burst",
      link: "https://github.com/musi22/StreamAlpha",
      linkText: "Inspect load test ADR",
    },
    {
      id: "latency",
      metric: "65%",
      label: "API latency reduction",
      context: "Engineered via Redis caching, async connection pooling, and sub-millisecond leakage detection",
      link: "https://github.com/musi22/RevenueGuard",
      linkText: "View benchmark results",
    },
    {
      id: "guarded-success",
      metric: "100%",
      label: "Guarded task success",
      context: "In 20-scenario synthetic evaluation testbed, eliminating unauthorized actions completely (5% to 0%)",
      link: "https://enterprise-ai-web-production.up.railway.app/",
      linkText: "Live verification console",
    },
  ],

  // Open Graph / Metadata
  ogTitle: "Rashmi Shaw — AI Systems & Backend Engineer",
  ogDescription: "Portfolio of Rashmi Shaw, an AI systems and backend engineer building governed agents, real-time distributed platforms and production AI infrastructure.",
} as const;

export type Personal = typeof personal;
