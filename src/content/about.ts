export type StorySegment = string | { strong: string };

export type GlanceItem = {
  label: string;
  value: string;
  placeholder?: boolean;
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
      ", writing test cases. Later I was made ",
      { strong: "test manager" },
      " for a version-up of an existing project.",
    ],
    [
      "I then joined a startup as a software engineer, hired to test. There was no testing process yet, so I wrote one: the documents, test case specifications and templates. A few months in, I became ",
      { strong: "project manager" },
      " of a new ",
      { strong: "PKI (public key infrastructure)" },
      " web application. PKI is the system behind digital certificates, which prove that a website, device or person is who they claim to be.",
    ],
    [
      "I test to ISTQB standards, from planning and test design through to execution and reporting. Now and then I also fix bugs myself.",
    ],
  ],
  glanceTitle: "// at a glance",
  glance: [
    { label: "Role", value: "Project Manager & QA" },
    { label: "Domain", value: "PKI · digital certificates" },
    { label: "Testing", value: "ISTQB lifecycle" },
    { label: "Since", value: "2022" },
    { label: "Based in", value: "Lorem ipsum", placeholder: true },
    { label: "Open to", value: "Lorem ipsum dolor", placeholder: true },
  ],
};
