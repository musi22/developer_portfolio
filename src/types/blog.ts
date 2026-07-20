// ── Blog Types ────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  category: string;
  readingTime: number; // minutes
  featured: boolean;
  published: boolean;
  coverImage?: string;
  content?: string; // MDX content
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
