export type ExperienceStep = {
  title: string;
  current?: boolean;
};

export type ExperienceJob = {
  when: string;
  where?: string;
  title: string;
  company: string;
  internship?: boolean;
  current?: boolean;
  steps: ExperienceStep[];
};

export const experience: ExperienceJob[] = [
  {
    when: "Oct 2025 – Present",
    title: "Software Engineer",
    company: "libC Technologies",
    current: true,
    steps: [
      { title: "Project Manager", current: true },
      { title: "Software Testing" },
    ],
  },
  {
    when: "Jun 2023 – Oct 2025",
    where: "Cebu, Philippines · On-site",
    title: "Software Test Engineer",
    company: "Kyocera Document Solutions Development Philippines, Inc.",
    steps: [{ title: "Test Manager" }, { title: "Test Engineer" }],
  },
  {
    when: "Jul 2022 – Sep 2022",
    where: "Cebu, Philippines · Remote",
    title: "ServiceNow Developer",
    company: "Rococo Global Technologies Corporation",
    internship: true,
    steps: [],
  },
];
