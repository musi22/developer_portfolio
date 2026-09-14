"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { PortfolioSettingsProvider } from "@/components/interactive/PortfolioSettingsProvider";

// Lazy load interactive components for performance
const CommandPalette = dynamic(
  () => import("@/components/interactive/CommandPalette"),
  { ssr: false }
);
const RecruiterPanel = dynamic(
  () => import("@/components/interactive/RecruiterPanel"),
  { ssr: false }
);
const ExecutionTrace = dynamic(
  () => import("@/components/interactive/ExecutionTrace"),
  { ssr: false }
);
const StatusPanel = dynamic(
  () => import("@/components/interactive/StatusPanel"),
  { ssr: false }
);
const VoiceAssistant = dynamic(
  () => import("@/components/interactive/VoiceAssistant"),
  { ssr: false }
);
// Client shell wrapping all interactive overlays
// Loaded after primary content is visible
export default function InteractiveShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioSettingsProvider>
      {/* Main content */}
      {children}

      {/* Interactive overlays */}
      <Suspense fallback={null}>
        <CommandPalette />
        <RecruiterPanel />
        <ExecutionTrace />
        <StatusPanel />
        <VoiceAssistant />
      </Suspense>
    </PortfolioSettingsProvider>
  );
}
