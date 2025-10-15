import React from "react";
import { render, screen } from "@testing-library/react";
import MoreStories from "@/app/more-stories";
import type { Post } from "@/lib/types";

describe("Integration: Component data flow and nesting", () => {
  const mockPosts: Post[] = [
    {
      title: "Integration Test Post",
      slug: "integration-post",
      date: "2023-05-20",
      excerpt: "Testing component integration",
      coverImage: { url: "https://example.com/integration.jpg" },
      author: {
        name: "Integration Tester",
        picture: { url: "https://example.com/tester.jpg" },
      },
    },
    {
      title: "Second Integration Post",
      slug: "second-integration",
      date: "2023-06-10",
      excerpt: "More integration testing",
      coverImage: { url: "https://example.com/integration2.jpg" },
      author: {
        name: "Test Author Two",
        picture: { url: "https://example.com/author2.jpg" },
      },
    },
  ];

  it("integrates all nested components (CoverImage, Date, Avatar) correctly", () => {
    render(<MoreStories morePosts={mockPosts} />);

    // CoverImage integration
    expect(
      screen.getByAltText("Cover Image for Integration Test Post"),
    ).toBeInTheDocument();

    // Date integration
    expect(screen.getByText("May 20, 2023")).toBeInTheDocument();
    expect(screen.getByText("June 10, 2023")).toBeInTheDocument();

    // Avatar integration
    expect(screen.getByText("Integration Tester")).toBeInTheDocument();
    expect(screen.getByAltText("Integration Tester")).toBeInTheDocument();
  });

  it("creates proper navigation links across components", () => {
    render(<MoreStories morePosts={mockPosts} />);

    const titleLinks = screen.getAllByRole("link", {
      name: /Integration Test Post/i,
    });
    expect(titleLinks.length).toBeGreaterThan(0);
    titleLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/posts/integration-post");
    });
  });
});
