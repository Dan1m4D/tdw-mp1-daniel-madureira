import React from "react";
import { render, screen } from "@testing-library/react";
import MoreStories from "@/app/more-stories";
import type { Post } from "@/lib/types";

describe("MoreStories Component", () => {
  const mockPosts: Post[] = [
    {
      title: "First Post",
      slug: "first-post",
      date: "2023-01-01",
      excerpt: "This is the first post excerpt",
      coverImage: { url: "https://example.com/image1.jpg" },
      author: {
        name: "Author One",
        picture: { url: "https://example.com/author1.jpg" },
      },
    },
    {
      title: "Second Post",
      slug: "second-post",
      date: "2023-02-01",
      excerpt: "This is the second post excerpt",
      coverImage: { url: "https://example.com/image2.jpg" },
      author: {
        name: "Author Two",
        picture: { url: "https://example.com/author2.jpg" },
      },
    },
  ];

  it("renders heading and all posts with metadata", () => {
    render(<MoreStories morePosts={mockPosts} />);
    expect(screen.getByText("More Stories")).toBeInTheDocument();
    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
    expect(screen.getByText("Author One")).toBeInTheDocument();
  });

  it("renders links to individual posts", () => {
    render(<MoreStories morePosts={mockPosts} />);
    const firstLink = screen.getAllByRole("link", { name: /First Post/i })[0];
    expect(firstLink).toHaveAttribute("href", "/posts/first-post");
  });

  it("handles empty posts array", () => {
    const { container } = render(<MoreStories morePosts={[]} />);
    expect(screen.getByText("More Stories")).toBeInTheDocument();
    const grid = container.querySelector(".grid");
    expect(grid?.children.length).toBe(0);
  });
});
