import { NextRequest } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "yourusername";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-OS/2.0",
};

if (GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("GitHub profile error:", error);
    return Response.json(
      { error: "Could not fetch GitHub profile" },
      { status: 502 }
    );
  }
}
