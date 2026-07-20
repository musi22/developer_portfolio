import type { Metadata } from "next";
import Desktop from "@/components/desktop/Desktop";

export const metadata: Metadata = {
  title: "Desktop — AI OS Portfolio",
  description: "Interactive desktop OS experience",
  robots: { index: false },
};

export default function DesktopPage() {
  return <Desktop />;
}
