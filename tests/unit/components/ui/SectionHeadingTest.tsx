import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "@/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("names the heading by its title only", () => {
    render(<SectionHeading number="01." title="Work" id="work" />);

    const heading = screen.getByRole("heading", { level: 2, name: "Work" });
    expect(heading).toHaveAttribute("id", "work");
  });
});
