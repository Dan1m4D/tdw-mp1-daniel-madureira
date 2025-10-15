import React from "react";
import { render } from "@testing-library/react";
import Avatar from "@/app/avatar";
import CoverImage from "@/app/cover-image";
import MoreStories from "@/app/more-stories";
import type { Post } from "@/lib/types";

describe("Component Snapshots", () => {
  it("Avatar matches snapshot", () => {
    const { container } = render(
      <Avatar
        name="John Doe"
        picture={{ url: "https://example.com/avatar.jpg" }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("CoverImage matches snapshot with link", () => {
    const { container } = render(
      <CoverImage
        title="Blog Post Title"
        url="https://example.com/cover.jpg"
        slug="blog-post-slug"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("MoreStories matches snapshot with posts", () => {
    const mockPosts: Post[] = [
      {
        title: "First Post",
        slug: "first-post",
        date: "2023-01-15",
        excerpt: "This is the first post excerpt",
        coverImage: { url: "https://example.com/post1.jpg" },
        author: {
          name: "Author One",
          picture: { url: "https://example.com/author1.jpg" },
        },
      },
      {
        title: "Second Post",
        slug: "second-post",
        date: "2023-02-20",
        excerpt: "This is the second post excerpt",
        coverImage: { url: "https://example.com/post2.jpg" },
        author: {
          name: "Author Two",
          picture: { url: "https://example.com/author2.jpg" },
        },
      },
    ];

    const { container } = render(<MoreStories morePosts={mockPosts} />);
    expect(container).toMatchSnapshot();
  });
});
