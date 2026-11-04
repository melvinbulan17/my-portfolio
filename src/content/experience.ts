export type ExperienceJob = {
  when: string;
  where?: string;
  title: string;
  company: string;
  internship?: boolean;
  current?: boolean;
  description?: string;
};

export const experience: ExperienceJob[] = [
  {
    when: "Oct 2025 – Present",
    where: "Cebu, Philippines · On-site",
    title: "Software Engineer",
    company: "LibC Technologies SA",
    current: true,
    description:
      "Project manager leading QA on a team of 5, working closely with the CEO, CTO and head of marketing. Also contributes bug fixes and feature implementations. Shipped version 1.0.",
  },
  {
    when: "Jun 2023 – Oct 2025",
    where: "Cebu, Philippines · On-site",
    title: "Software Test Engineer",
    company: "Kyocera Document Solutions Development Philippines, Inc.",
    description:
      "Tested software for Kyocera printers, then led testing for version updates of existing products, writing the test plans and running the full test cycle.",
  },
  {
    when: "Jul 2022 – Sep 2022",
    where: "Cebu, Philippines · Remote",
    title: "ServiceNow Developer",
    company: "Rococo Global Technologies Corporation",
    internship: true,
  },
];
