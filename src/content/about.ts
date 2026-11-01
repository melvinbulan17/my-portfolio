export type StorySegment = string | { strong: string };

export type GlanceItem = {
  label: string;
  value: string;
};

export type AboutContent = {
  story: StorySegment[][];
  glanceTitle: string;
  glance: GlanceItem[];
};

export const about: AboutContent = {
  story: [
    [
      "I started out as a ",
      { strong: "software test engineer" },
      ", testing software for Kyocera printers. Later I became ",
      { strong: "test manager" },
      " for version-ups of existing products, writing the test plans and running the full test cycle.",
    ],
    [
      "I then joined a startup as a software engineer, hired as its main tester. There was no testing process yet, so I built one that follows ISTQB standards: the documents, test case specifications, templates and reports. A few months in, I became ",
      { strong: "project manager" },
      " of a new ",
      { strong: "PKI (public key infrastructure)" },
      " web application. PKI is the system behind digital certificates, which prove that a website, device or person is who they claim to be. I set up the project's structure, YouTrack boards and knowledge bases, run sprint meetings and retros, and keep stakeholders updated. I still test, mostly manually with some automation, and help with the code from time to time, so I've seen every step from planning to release.",
    ],
  ],
  glanceTitle: "// right now",
  glance: [
    { label: "Role", value: "Software Engineer (PM & QA)" },
    { label: "Domain", value: "PKI · Digital Certificates" },
    { label: "Since", value: "Oct 2025" },
    { label: "Company", value: "LibC Technologies SA" },
    { label: "Based in", value: "Cebu, Philippines" },
  ],
};
