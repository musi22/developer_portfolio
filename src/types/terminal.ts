// ── Terminal Types ────────────────────────────────────

export type TerminalOutputType =
  | "input"
  | "output"
  | "error"
  | "success"
  | "info"
  | "system"
  | "component";

export interface TerminalLine {
  id: string;
  type: TerminalOutputType;
  content: string | React.ReactNode;
  timestamp: Date;
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (args: string[]) => string | React.ReactNode;
}

export interface TerminalHistoryEntry {
  command: string;
  timestamp: Date;
}
