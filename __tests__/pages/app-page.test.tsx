import React from "react";
import { render, screen } from "@testing-library/react";

// Mock Contentful API functions and Next draftMode
jest.mock("../../lib/api", () => ({
  getPostAndMorePosts: jest.fn(),
  getAllPosts: jest.fn(),
}));

jest.mock("next/headers", () => ({
  draftMode: jest.fn(async () => ({ isEnabled: false })),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

import { getPostAndMorePosts } from "../../lib/api";
import { notFound } from "next/navigation";

describe("PostPage (server component)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPost = {
    title: "Test Blog Post",
    slug: "test-slug",
    coverImage: { url: "https://example.com/cover.jpg" },
    date: "2023-03-15",
    author: {
      name: "John Doe",
      picture: { url: "https://example.com/author.jpg" },
    },
    content: {
      json: {
        nodeType: "document",
        content: [
          {
            nodeType: "paragraph",
            content: [{ nodeType: "text", value: "Test content", marks: [] }],
          },
        ],
      },
      links: { assets: { block: [] } },
    },
  };

  it("calls notFound when post does not exist", async () => {
    (getPostAndMorePosts as jest.Mock).mockResolvedValue({
      post: null,
      morePosts: [],
    });

    (notFound as unknown as jest.Mock).mockImplementation(() => {
      throw new Error("NEXT_NOT_FOUND");
    });

    const Page = (await import("../../app/posts/[slug]/page")).default;

    await expect(
      Page({ params: Promise.resolve({ slug: "non-existent" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalled();
  });

  it("renders post with title, content, author, and formatted date", async () => {
    (getPostAndMorePosts as jest.Mock).mockResolvedValue({
      post: mockPost,
      morePosts: [],
    });

    const Page = (await import("../../app/posts/[slug]/page")).default;
    const jsx = await Page({ params: Promise.resolve({ slug: "test-slug" }) });
    render(jsx);

    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
    expect(screen.getByText("March 15, 2023")).toBeInTheDocument();
    expect(
      screen.getByAltText("Cover Image for Test Blog Post"),
    ).toBeInTheDocument();
  });

  it('renders "More Stories" section when more posts exist', async () => {
    const morePosts = [
      {
        title: "Another Post",
        slug: "another-post",
        date: "2023-04-01",
        excerpt: "Another excerpt",
        coverImage: { url: "https://example.com/cover2.jpg" },
        author: { name: "Jane Smith" },
      },
    ];

    (getPostAndMorePosts as jest.Mock).mockResolvedValue({
      post: mockPost,
      morePosts,
    });

    const Page = (await import("../../app/posts/[slug]/page")).default;
    const jsx = await Page({ params: Promise.resolve({ slug: "test-slug" }) });
    render(jsx);

    expect(screen.getByText("More Stories")).toBeInTheDocument();
    expect(screen.getByText("Another Post")).toBeInTheDocument();
  });
});
