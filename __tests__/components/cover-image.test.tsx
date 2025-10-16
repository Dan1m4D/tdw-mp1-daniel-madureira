import React from "react";
import { render, screen } from "@testing-library/react";
import CoverImage from "@/app/cover-image";

describe("CoverImage Component", () => {
  it("renders image with correct alt text", () => {
    render(<CoverImage title="Test Post" url="/cover.jpg" />);
    const img = screen.getByAltText("Cover Image for Test Post");
    expect(img).toBeInTheDocument();
  });

  it("renders as a link when slug is provided", () => {
    const { container } = render(
      <CoverImage title="Test Post" url="/cover.jpg" slug="test-slug" />,
    );
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/posts/test-slug");
    expect(link).toHaveAttribute("aria-label", "Test Post");
  });

  it("renders without link when slug is not provided", () => {
    const { container } = render(
      <CoverImage title="Test Post" url="/cover.jpg" />,
    );
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });
});
