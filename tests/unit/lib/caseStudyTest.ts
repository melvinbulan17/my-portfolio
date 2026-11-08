import { describe, expect, it } from "vitest";

import { caseStudies } from "@/content/caseStudies";
import { caseStudySections, sectionsOf } from "@/lib/caseStudy";

const [dummio] = caseStudies;

describe("sectionsOf", () => {
  it("returns sections in template order, whatever order they were written in", () => {
    const { outcome, overview } = dummio.sections;
    const study = { ...dummio, sections: { outcome, overview } };

    expect(sectionsOf(study).map(({ title }) => title)).toEqual([
      "Overview",
      "Outcome",
    ]);
  });

  it("leaves out a section with no blocks", () => {
    const study = { ...dummio, sections: { ...dummio.sections, testing: [] } };

    expect(sectionsOf(study).map(({ id }) => id)).not.toContain("testing");
  });

  it.each(caseStudies.map((study) => [study.slug, study] as const))(
    "%s follows the template order",
    (_slug, study) => {
      const order = caseStudySections.map(({ id }) => id);
      const ids = sectionsOf(study).map(({ id }) => id);

      expect(ids).toEqual(order.filter((id) => ids.includes(id)));
      expect(ids[0]).toBe("overview");
      expect(ids.at(-1)).toBe("outcome");
    },
  );
});
