import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/headers and lib/api before importing the page
jest.mock("next/headers", () => ({
  draftMode: jest.fn(),
}));

jest.mock("../../lib/api", () => ({
  getAllPosts: jest.fn(),
}));

// Import after mocking
import { draftMode } from "next/headers";
import { getAllPosts } from "../../lib/api";
import type { Post } from "@/lib/types";

describe("HomePage (server component)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPost: Post = {
    title: "Test Post",
    slug: "test-post",
    date: "2023-01-15",
    excerpt: "This is a test excerpt for the post",
    coverImage: { url: "https://example.com/cover.jpg" },
    author: {
      name: "Test Author",
      picture: { url: "https://example.com/author.jpg" },
    },
  };

  it('shows "No posts found" when API returns empty array', async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
    (getAllPosts as jest.Mock).mockResolvedValue([]);

    const Page = (await import("@/app/page")).default;
    const jsx = await Page();
    render(jsx);

    expect(screen.getByText(/No posts found/i)).toBeInTheDocument();
  });

  it("renders hero post when posts exist", async () => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
    (getAllPosts as jest.Mock).mockResolvedValue([mockPost]);

    const Page = (await import("@/app/page")).default;
    const jsx = await Page();
    render(jsx);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test excerpt for the post"),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders additional posts in MoreStories section", async () => {
    const secondPost: Post = {
      title: "Second Post",
      slug: "second-post",
      date: "2023-02-01",
      excerpt: "Second post excerpt",
      coverImage: { url: "https://example.com/cover2.jpg" },
      author: {
        name: "Second Author",
        picture: { url: "https://example.com/author2.jpg" },
      },
    };

    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
    (getAllPosts as jest.Mock).mockResolvedValue([mockPost, secondPost]);

    const Page = (await import("@/app/page")).default;
    const jsx = await Page();
    render(jsx);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("More Stories")).toBeInTheDocument();
  });
});
