import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Experience } from "@/components/sections/Experience";
import { experience, type ExperienceJob } from "@/content/experience";

const jobs: ExperienceJob[] = [
  {
    when: "Oct 2025 – Present",
    title: "Software Engineer",
    company: "Current Co",
    current: true,
    description: "I run the project and test the product.",
  },
  {
    when: "Jul 2022 – Sep 2022",
    where: "Cebu, Philippines · Remote",
    title: "Developer",
    company: "Intern Co",
    internship: true,
  },
];

describe("Experience", () => {
  it("is the #experience section with one job per entry, newest first", () => {
    const { container } = render(
      <Experience jobs={jobs} resumeHref="/resume.pdf" />,
    );

    expect(container.querySelector("section#experience")).toHaveClass(
      "border-t",
      "py-24",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Experience" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(["Software Engineer", "Developer"]);
  });

  it("keeps a long history in one list in the order given", () => {
    const many: ExperienceJob[] = Array.from({ length: 8 }, (_, index) => ({
      when: `${2030 - index}`,
      title: `Role ${index + 1}`,
      company: `Company ${index + 1}`,
      current: index === 0,
    }));
    const { container } = render(
      <Experience jobs={many} resumeHref="/resume.pdf" />,
    );

    expect(
      container.querySelectorAll("section#experience [data-stage] > ol"),
    ).toHaveLength(1);
    expect(
      screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(many.map((job) => job.title));
  });

  it("shows a description only for jobs that have one", () => {
    const { container } = render(
      <Experience jobs={jobs} resumeHref="/resume.pdf" />,
    );

    expect(
      screen.getByText("I run the project and test the product."),
    ).toBeInTheDocument();
    const [, intern] = container.querySelectorAll("li");
    expect(intern.querySelectorAll("p")).toHaveLength(1);
  });

  it("shows the place and labels internships", () => {
    render(<Experience jobs={jobs} resumeHref="/resume.pdf" />);

    expect(screen.getByText("Cebu, Philippines · Remote")).toBeInTheDocument();
    expect(screen.getByText("Intern Co · Internship")).toBeInTheDocument();
    expect(screen.getByText("Current Co")).toBeInTheDocument();
  });

  it("ends with a link to the resume", () => {
    render(<Experience jobs={jobs} resumeHref="/resume.pdf" />);

    expect(
      screen.getByRole("link", { name: "Full history in the resume (PDF) →" }),
    ).toHaveAttribute("href", "/resume.pdf");
  });

  it("opens the real history with the current role at LibC", () => {
    expect(experience[0]).toMatchObject({
      company: "LibC Technologies SA",
      title: "Software Engineer",
      where: "Cebu, Philippines · On-site",
      current: true,
    });
    expect(experience[0].description).toContain(
      "Leads project management and QA",
    );
  });

  it("joins a star for every job with a line hidden from readers", () => {
    const { container } = render(
      <Experience jobs={experience} resumeHref="/resume.pdf" />,
    );

    expect(container.querySelectorAll("[data-star]")).toHaveLength(
      experience.length,
    );
    const line = container.querySelector("svg");
    expect(line).toHaveAttribute("aria-hidden", "true");
    expect(line?.querySelector("path")?.getAttribute("d")).toMatch(/^M.+L/);
  });
});
