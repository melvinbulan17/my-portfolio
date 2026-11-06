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
      "Leads project management and QA for a PKI web application, working directly with the CEO, CTO and head of marketing. Built the testing process from scratch, runs sprint planning and retrospectives, and owns the test plan and test case specifications. Also contributes bug fixes and features. Preparing the product for its first public release.",
  },
  {
    when: "Jun 2023 – Oct 2025",
    where: "Cebu, Philippines · On-site",
    title: "Software Test Engineer",
    company: "Kyocera Document Solutions Development Philippines, Inc.",
    description:
      "Tested software for new printer models and version updates, then took on the test manager role for existing products, writing the test plans and running the full test cycle. Integrated Selenium and Appium automation for mobile apps, cutting test cycle time by 13%, and worked directly with Japanese counterparts on requirements and test status.",
  },
  {
    when: "Jul 2022 – Sep 2022",
    where: "Cebu, Philippines · Remote",
    title: "ServiceNow Developer",
    company: "Rococo Global Technologies Corporation",
    internship: true,
    description:
      "Built a café management system on ServiceNow for a client, with data visualizations and reports to check data accuracy, and tested it for bugs and data integrity.",
  },
];
