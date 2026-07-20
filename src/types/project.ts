// ── Project Types ─────────────────────────────────────

export type ProjectCategory =
  | "AI/ML"
  | "Full Stack"
  | "Backend"
  | "Frontend"
  | "DevOps"
  | "Open Source"
  | "Mobile";

export interface ProjectTech {
  name: string;
  icon?: string;
  color?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  category: ProjectCategory;
  tags: string[];
  tech: ProjectTech[];
  features: ProjectFeature[];
  screenshots?: string[];
  architectureDiagram?: string;
  folderStructure?: string;
  liveUrl?: string;
  githubUrl?: string;
  challenges?: string;
  learnings?: string;
  futureImprovements?: string;
  apiDocumentation?: string;
  databaseSchema?: string;
  deploymentGuide?: string;
  stars?: number;
  forks?: number;
  status: "Live" | "In Progress" | "Archived";
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
}
