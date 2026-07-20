import type { Metadata } from "next";
import { personal } from "@/content/data/personal";
import LandingHero from "@/components/landing/LandingHero";

export const metadata: Metadata = {
  title: `${personal.name} — AI OS Portfolio`,
  description: personal.ogDescription,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <LandingHero />;
}
