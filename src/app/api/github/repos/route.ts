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
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`,
      {
        headers,
        next: { revalidate: 1800 }, // Cache for 30 min
      }
    );

    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("GitHub repos error:", error);
    return Response.json(
      { error: "Could not fetch GitHub repos" },
      { status: 502 }
    );
  }
}
