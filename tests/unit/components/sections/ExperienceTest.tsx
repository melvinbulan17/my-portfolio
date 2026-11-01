import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Experience } from "@/components/sections/Experience";
import { experience, type ExperienceJob } from "@/content/experience";

const jobs: ExperienceJob[] = [
  {
    when: "Oct 2025 – Present",
    title: "Software Engineer",
    company: "Current Co",
    current: true,
    steps: [
      { title: "Project Manager", current: true },
      { title: "QA Engineer" },
    ],
  },
  {
    when: "Jul 2022 – Sep 2022",
    where: "Cebu, Philippines · Remote",
    title: "Developer",
    company: "Intern Co",
    internship: true,
    steps: [],
  },
];

describe("Experience", () => {
  it("is the #experience section with one job per entry, newest first", () => {
    const { container } = render(
      <Experience jobs={jobs} resumeHref="/resume.pdf" />,
    );

    expect(container.querySelector("section#experience")).not.toBeNull();
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
      steps: [],
    }));
    const { container } = render(
      <Experience jobs={many} resumeHref="/resume.pdf" />,
    );

    expect(
      container.querySelectorAll("section#experience > div > ol"),
    ).toHaveLength(1);
    expect(
      screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(many.map((job) => job.title));
  });

  it("lists the roles held and marks the current one as now", () => {
    render(<Experience jobs={jobs} resumeHref="/resume.pdf" />);

    const current = screen.getByText("Project Manager").closest("li");
    expect(current).not.toBeNull();
    expect(within(current!).getByText("now")).toBeInTheDocument();
    expect(screen.getByText("QA Engineer")).toBeInTheDocument();
    expect(screen.getAllByText("now")).toHaveLength(1);
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
      steps: [
        { title: "Project Manager", current: true },
        { title: "QA Engineer" },
      ],
    });
  });
});
