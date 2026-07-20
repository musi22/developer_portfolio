// ── Skill Types ───────────────────────────────────────

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "AI/ML"
  | "Databases"
  | "Cloud"
  | "DevOps"
  | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  level: number; // 0-100
  experience: string; // e.g. "3 years"
  projects?: string[]; // project IDs
  description?: string;
  color?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  icon: string;
  skills: Skill[];
}
