import React from "react";
// A basic Jest test file to ensure Jest is set up correctly

describe("Jest", () => {
  it("should run a basic test", () => {
    expect(true).toBe(true);
  });

  it("should add numbers correctly", () => {
    expect(1 + 2).toBe(3);
  });

  it("should compare strings", () => {
    expect("jest").toBe("jest");
  });

  it("should handle arrays", () => {
    expect([1, 2, 3]).toContain(2);
  });
});
