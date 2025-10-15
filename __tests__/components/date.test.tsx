import React from "react";
import { render, screen } from "@testing-library/react";
import DateComponent from "@/app/date";

describe("Date Component", () => {
  it("renders formatted date with semantic time element", () => {
    const { container } = render(<DateComponent dateString="2020-01-01" />);
    expect(screen.getByText("January 1, 2020")).toBeInTheDocument();
    const timeElement = container.querySelector("time");
    expect(timeElement).toHaveAttribute("datetime", "2020-01-01");
  });
});
