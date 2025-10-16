import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "@/app/avatar";

describe("Avatar Component", () => {
  const mockPicture = { url: "https://example.com/avatar.jpg" };

  it("renders author name and image with correct alt text", () => {
    render(<Avatar name="Jane Doe" picture={mockPicture} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    const img = screen.getByAltText("Jane Doe");
    expect(img).toBeInTheDocument();
  });
});
