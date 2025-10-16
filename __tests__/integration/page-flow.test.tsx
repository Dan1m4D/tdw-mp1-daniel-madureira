import React from "react";
import { render, screen } from "@testing-library/react";
import type { Post } from "@/lib/types";

// Mock dependencies
jest.mock("next/headers", () => ({
  draftMode: jest.fn(),
}));

jest.mock("../../lib/api", () => ({
  getAllPosts: jest.fn(),
}));

import { draftMode } from "next/headers";
import { getAllPosts } from "../../lib/api";

describe("Integration: Full page rendering flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fullMockPosts: Post[] = [
    {
      title: "Hero Post Title",
      slug: "hero-post",
      date: "2023-09-01",
      excerpt: "This is the hero post that appears first",
      coverImage: { url: "https://example.com/hero.jpg" },
      author: {
        name: "Hero Author",
        picture: { url: "https://example.com/hero-author.jpg" },
      },
    },
    {
      title: "Second Post",
      slug: "second-post",
      date: "2023-09-02",
      excerpt: "This appears in more stories",
      coverImage: { url: "https://example.com/second.jpg" },
      author: {
        name: "Second Author",
        picture: { url: "https://example.com/second-author.jpg" },
      },
    },
  ];

  it("renders complete home page with hero post, more stories, and all nested components", async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
    (getAllPosts as jest.Mock).mockResolvedValue(fullMockPosts);

    const Page = (await import("@/app/page")).default;
    const jsx = await Page();
    render(jsx);

    // Hero post section
    expect(screen.getByText("Hero Post Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is the hero post that appears first"),
    ).toBeInTheDocument();
    expect(screen.getByText("Hero Author")).toBeInTheDocument();
    expect(screen.getByText("September 1, 2023")).toBeInTheDocument();

    // More stories section
    expect(screen.getByText("More Stories")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("September 2, 2023")).toBeInTheDocument();

    // Navigation links
    const heroLinks = screen.getAllByRole("link", { name: /Hero Post Title/i });
    expect(heroLinks[0]).toHaveAttribute("href", "/posts/hero-post");
  });

  it("handles empty posts array", async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
    (getAllPosts as jest.Mock).mockResolvedValue([]);

    const Page = (await import("@/app/page")).default;
    const jsx = await Page();
    render(jsx);

    expect(screen.getByText(/No posts found/i)).toBeInTheDocument();
  });
});
