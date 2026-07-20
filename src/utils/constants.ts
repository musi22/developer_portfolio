import type { AppDefinition } from "@/types/window";

// All available desktop applications
export const APP_DEFINITIONS: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    icon: "👤",
    description: "Learn about who I am",
    defaultSize: { width: 700, height: 500 },
    color: "#8b5cf6",
    shortcut: "A",
  },
  {
    id: "resume",
    title: "Resume",
    icon: "📄",
    description: "View my resume and credentials",
    defaultSize: { width: 750, height: 560 },
    color: "#4f46e5",
    shortcut: "R",
  },
  {
    id: "projects",
    title: "Projects",
    icon: "🚀",
    description: "Browse my portfolio projects",
    defaultSize: { width: 850, height: 600 },
    color: "#22d3ee",
    shortcut: "P",
  },
  {
    id: "github",
    title: "GitHub",
    icon: "🐙",
    description: "GitHub activity and repositories",
    defaultSize: { width: 800, height: 580 },
    color: "#3730a3",
    shortcut: "G",
  },
  {
    id: "skills",
    title: "Skills",
    icon: "⚡",
    description: "Technical skills and proficiency",
    defaultSize: { width: 780, height: 560 },
    color: "#8b5cf6",
    shortcut: "S",
  },
  {
    id: "blog",
    title: "Blog",
    icon: "✍️",
    description: "Articles and technical writing",
    defaultSize: { width: 800, height: 580 },
    color: "#4f46e5",
    shortcut: "B",
  },
  {
    id: "ai",
    title: "AI Assistant",
    icon: "🤖",
    description: "Chat with my AI assistant",
    defaultSize: { width: 680, height: 560 },
    color: "#8b5cf6",
    shortcut: "I",
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "💻",
    description: "Interactive command-line interface",
    defaultSize: { width: 700, height: 480 },
    color: "#3730a3",
    shortcut: "T",
  },
  {
    id: "contact",
    title: "Contact",
    icon: "✉️",
    description: "Get in touch with me",
    defaultSize: { width: 620, height: 520 },
    color: "#22d3ee",
    shortcut: "C",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "⚙️",
    description: "Customize your experience",
    defaultSize: { width: 600, height: 480 },
    color: "#4f46e5",
    shortcut: ",",
  },
];

export const DOCK_APPS = APP_DEFINITIONS;

export function getAppById(id: string): AppDefinition | undefined {
  return APP_DEFINITIONS.find((app) => app.id === id);
}
