import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("RootLayout Component", () => {
  // Suppress expected console warnings about <html> nesting in tests
  // This is expected behavior for Next.js root layouts
  beforeAll(() => {
    const originalError = console.error;
    jest.spyOn(console, "error").mockImplementation((...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("validateDOMNesting")
      ) {
        return;
      }
      originalError.call(console, ...args);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders children content and footer", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Criado com Next.js.")).toBeInTheDocument();
  });

  it("renders footer links", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>,
    );

    const docsLink = screen.getByRole("link", {
      name: /Saber mais sobre Next.js/i,
    });
    expect(docsLink).toHaveAttribute("href", "https://nextjs.org/docs");
  });
});
