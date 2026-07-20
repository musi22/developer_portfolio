// ── Window Manager Types ──────────────────────────────

export type WindowId =
  | "about"
  | "resume"
  | "projects"
  | "github"
  | "skills"
  | "blog"
  | "ai"
  | "terminal"
  | "contact"
  | "settings"
  | string;

export type WindowState = "normal" | "minimized" | "maximized";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface AppWindow {
  id: string;
  appId: WindowId;
  title: string;
  icon: string;
  position: WindowPosition;
  size: WindowSize;
  state: WindowState;
  zIndex: number;
  isActive: boolean;
}

export interface AppDefinition {
  id: WindowId;
  title: string;
  icon: string;
  description: string;
  defaultSize: WindowSize;
  defaultPosition?: WindowPosition;
  minSize?: WindowSize;
  color?: string;
  shortcut?: string;
}
