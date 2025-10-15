import React from "react";
import { render } from "@testing-library/react";
import type { Post } from "@/lib/types";

// Mock dependencies
jest.mock("next/headers", () => ({
  draftMode: jest.fn(),
}));

jest.mock("../../lib/api", () => ({
  getAllPosts: jest.fn(),
  getPostAndMorePosts: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

import { draftMode } from "next/headers";
import { getAllPosts, getPostAndMorePosts } from "../../lib/api";

describe("Page Snapshots", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Home Page", () => {
    const mockPosts: Post[] = [
      {
        title: "Hero Post",
        slug: "hero-post",
        date: "2023-09-01",
        excerpt: "This is the hero post excerpt",
        coverImage: { url: "https://example.com/hero.jpg" },
        author: {
          name: "Hero Author",
          picture: { url: "https://example.com/hero-author.jpg" },
        },
      },
      {
        title: "More Story One",
        slug: "more-story-one",
        date: "2023-08-15",
        excerpt: "First more story excerpt",
        coverImage: { url: "https://example.com/more1.jpg" },
        author: {
          name: "Author One",
          picture: { url: "https://example.com/author1.jpg" },
        },
      },
      {
        title: "More Story Two",
        slug: "more-story-two",
        date: "2023-08-10",
        excerpt: "Second more story excerpt",
        coverImage: { url: "https://example.com/more2.jpg" },
        author: {
          name: "Author Two",
          picture: { url: "https://example.com/author2.jpg" },
        },
      },
    ];

    it("matches snapshot with posts", async () => {
      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
      (getAllPosts as jest.Mock).mockResolvedValue(mockPosts);

      const Page = (await import("../../app/page")).default;
      const jsx = await Page();
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with no posts", async () => {
      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
      (getAllPosts as jest.Mock).mockResolvedValue([]);

      const Page = (await import("../../app/page")).default;
      const jsx = await Page();
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with single post (no more stories)", async () => {
      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
      (getAllPosts as jest.Mock).mockResolvedValue([mockPosts[0]]);

      const Page = (await import("../../app/page")).default;
      const jsx = await Page();
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with draft mode enabled", async () => {
      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: true });
      (getAllPosts as jest.Mock).mockResolvedValue(mockPosts);

      const Page = (await import("../../app/page")).default;
      const jsx = await Page();
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Post Detail Page", () => {
    const mockPost = {
      title: "Sample Blog Post",
      slug: "sample-post",
      coverImage: { url: "https://example.com/cover.jpg" },
      date: "2023-07-20",
      author: {
        name: "Post Author",
        picture: { url: "https://example.com/author.jpg" },
      },
      content: {
        json: {
          nodeType: "document",
          content: [
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value: "This is sample post content.",
                  marks: [],
                },
              ],
            },
          ],
        },
        links: { assets: { block: [] } },
      },
    };

    const mockMorePosts: Post[] = [
      {
        title: "Related Post One",
        slug: "related-one",
        date: "2023-07-15",
        excerpt: "Related post excerpt",
        coverImage: { url: "https://example.com/related1.jpg" },
        author: {
          name: "Related Author",
          picture: { url: "https://example.com/related-author.jpg" },
        },
      },
    ];

    it("matches snapshot with post and more stories", async () => {
      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
      (getPostAndMorePosts as jest.Mock).mockResolvedValue({
        post: mockPost,
        morePosts: mockMorePosts,
      });

      const Page = (await import("../../app/posts/[slug]/page")).default;
      const jsx = await Page({
        params: Promise.resolve({ slug: "sample-post" }),
      });
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with post and no more stories", async () => {
      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
      (getPostAndMorePosts as jest.Mock).mockResolvedValue({
        post: mockPost,
        morePosts: [],
      });

      const Page = (await import("../../app/posts/[slug]/page")).default;
      const jsx = await Page({
        params: Promise.resolve({ slug: "sample-post" }),
      });
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });

    it("matches snapshot with different post content", async () => {
      const differentPost = {
        ...mockPost,
        title: "Different Post Title",
        slug: "different-post",
        date: "2023-08-01",
        content: {
          json: {
            nodeType: "document",
            content: [
              {
                nodeType: "heading-1",
                content: [
                  {
                    nodeType: "text",
                    value: "Main Heading",
                    marks: [],
                  },
                ],
              },
              {
                nodeType: "paragraph",
                content: [
                  {
                    nodeType: "text",
                    value: "Different content here.",
                    marks: [],
                  },
                ],
              },
            ],
          },
          links: { assets: { block: [] } },
        },
      };

      (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
      (getPostAndMorePosts as jest.Mock).mockResolvedValue({
        post: differentPost,
        morePosts: [],
      });

      const Page = (await import("../../app/posts/[slug]/page")).default;
      const jsx = await Page({
        params: Promise.resolve({ slug: "different-post" }),
      });
      const { container } = render(jsx);

      expect(container).toMatchSnapshot();
    });
  });
});
