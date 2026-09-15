import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CommandNavbar from "@/components/navigation/CommandNavbar";

describe("CommandNavbar Component", () => {
  it("renders the RS monogram brand link pointing to root", () => {
    render(<CommandNavbar />);
    const brandLink = screen.getByText("RS").closest("a");
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders primary navigation links", () => {
    render(<CommandNavbar />);
    expect(screen.getByText("Work")).toHaveAttribute("href", "/#work");
    expect(screen.getByText("Engineering")).toHaveAttribute("href", "/#engineering");
    expect(screen.getByText("About")).toHaveAttribute("href", "/#about");
    expect(screen.getByText("Contact")).toHaveAttribute("href", "/#contact");
  });

  it("includes the resume download action with download attribute", () => {
    render(<CommandNavbar />);
    const resumeLinks = screen.getAllByRole("link", { name: /résumé/i });
    expect(resumeLinks.length).toBeGreaterThan(0);
    expect(resumeLinks[0]).toHaveAttribute("href", "/resume.pdf");
    expect(resumeLinks[0]).toHaveAttribute("download");
  });

  it("toggles mobile menu on button click", () => {
    render(<CommandNavbar />);
    const toggleButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
  });
});
