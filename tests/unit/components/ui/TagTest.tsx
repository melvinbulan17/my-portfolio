import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TagList } from "@/components/ui/Tag";

describe("TagList", () => {
  it("renders each tag as a list item", () => {
    render(<TagList tags={["React", "Playwright", "PKI"]} />);

    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([
      "React",
      "Playwright",
      "PKI",
    ]);
  });
});
