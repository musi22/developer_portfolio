import React from "react";
import type { Metadata } from "next";
import { personal } from "@/content/data/personal";
import { fetchGitHubUser } from "@/lib/github";
import CommandNavbar from "@/components/navigation/CommandNavbar";
import HeroSection from "@/components/sections/HeroSection";
import ProofStrip from "@/components/sections/ProofStrip";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import EngineeringSystems from "@/components/sections/EngineeringSystems";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import CommandFooter from "@/components/navigation/CommandFooter";
import InteractiveShell from "@/components/interactive/InteractiveShell";

export const metadata: Metadata = {
  title: `${personal.name} — AI Systems & Backend Engineer`,
  description: personal.ogDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: personal.ogTitle,
    description: personal.ogDescription,
    url: personal.website,
    siteName: `${personal.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
};

export default async function HomePage() {
  // Fetch real GitHub profile data server-side
  const gitHubUser = await fetchGitHubUser(personal.githubUsername);

  return (
    <InteractiveShell>
      <div className="min-h-screen bg-[#050607] text-[#F4F4F5] flex flex-col relative selection:bg-[#61F4DE]/20 selection:text-white z-10">
        {/* Accessible Skip Link */}
        <a href="#main-content" className="skip-to-content font-mono">
          Skip to main content
        </a>

        {/* Floating Translucent Navigation */}
        <CommandNavbar />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {/* Hero Section with 3D Agent Control Core */}
          <HeroSection />

          {/* 4 Verified Proof Points */}
          <ProofStrip />

          {/* Featured Case Studies with Interactive Traces */}
          <FeaturedProjects />

          {/* 5-Tier Interactive Capabilities Architecture */}
          <EngineeringSystems />

          {/* About & Academic Background */}
          <AboutSection />

          {/* Contact & Dispatch Channel */}
          <ContactSection />
        </main>

        {/* Command Center Footer */}
        <CommandFooter />
      </div>
    </InteractiveShell>
  );
}
