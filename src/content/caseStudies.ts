import type { CaseStudy } from "@/types/site";

const dummio: CaseStudy = {
  slug: "dummio",
  title: "Dummio",
  tagline: "Realistic test data for any form, in one click.",
  description:
    "How I planned, built, tested and released Dummio, a browser extension that fills web forms with realistic test data.",
  liveHref: "https://dummio.vercel.app/",
  codeHref: "https://github.com/melvinbulan17/dummio",
  heroImage: {
    src: "/images/dummio/popup-after-fill.png",
    alt: "The Dummio popup after a fill, showing 10 of 10 fields filled with a made-up person's details",
    width: 816,
    height: 1272,
  },
  sections: [
    {
      id: "summary",
      title: "Summary",
      blocks: [
        {
          kind: "facts",
          facts: [
            {
              label: "What",
              value:
                "A browser extension that fills web forms with realistic test data, with its own website",
            },
            {
              label: "My role",
              value:
                "Solo: product, project management, design, development, testing and release",
            },
            {
              label: "Scope",
              value: "The full cycle, from idea to public release",
            },
            {
              label: "Built with",
              value:
                "TypeScript, React and Tailwind CSS, with automated tests and CI",
            },
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "Problem Statement",
      blocks: [
        {
          kind: "text",
          text: "I also test forms as part of my work experience: sign-up, checkout, profile and admin pages, over and over. Typing test data by hand is slow, and after the tenth pass everyone falls back on the same few values, like `test@test.com` and `asdf`. Values like that hide bugs, because they never trigger an unusual name, a date in the wrong order or a phone number in the wrong format.",
        },
      ],
    },
    {
      id: "audience",
      title: "Target Audience",
      blocks: [
        {
          kind: "text",
          text: "QA testers running repeated checks or preparing demo data, and developers who need quick data while building a form. I also wanted something I'd use at work.",
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      blocks: [
        {
          kind: "text",
          text: "I tried the form fillers testers already use. Between them they cover one-click filling, templates and custom rules. What none of them did well was fit the data to the form. They fill in a value, but not always in the shape the field wants.",
        },
        {
          kind: "text",
          text: "So I decided to cover the basics and stand apart on format matching and believable data.",
        },
      ],
    },
    {
      id: "goals",
      title: "Goals",
      blocks: [
        {
          kind: "list",
          items: [
            "Fill a form in one action, with no setup.",
            "Only count a value as filled if the form accepts it.",
            "Keep the extension private: no accounts, no tracking and nothing sent anywhere.",
            "See how people find the website, only with their consent.",
            "Ask only for the permissions it truly needs.",
            "Start lean, and add features one at a time.",
          ],
        },
      ],
    },
    {
      id: "system-design",
      title: "System Design",
      blocks: [
        {
          kind: "topic",
          title: "Format matching",
          text: "The same field takes different shapes on different sites. A birthday might be written in a different order or split into three dropdowns, and a phone number might need a country code or digits only. So Dummio reads the clues on each field first, then shapes the value to fit. If the form still rejects it, Dummio tries the next likely format before reporting the field as not accepted.",
        },
        {
          kind: "shots",
          crop: true,
          shots: [
            {
              src: "/images/dummio/filled-form.png",
              alt: "A sign-up form filled by Dummio with matching details: the name Sheila Tolentino, a matching email, a mobile number and a birthday",
              width: 1520,
              height: 2386,
            },
          ],
        },
        {
          kind: "topic",
          title: "One made-up person per fill",
          text: "Every fill starts by creating one fake person and builds each field from them. The email matches the name and the address details belong together, so the data looks real.",
        },
        {
          kind: "topic",
          title: "Safe by default",
          text: "Generated emails use domains reserved for testing, which can't receive mail. Where generated details could look real, the listing says so.",
        },
        {
          kind: "topic",
          title: "Private by design",
          text: "Dummio only touches a page when you ask it to. That meant no server and no accounts.",
        },
        {
          kind: "topic",
          title: "Analytics",
          text: "The extension tracks nothing. The website uses Google Analytics to show how people find it and what they click, like downloads, and it only loads after a visitor chooses Allow. Search Console shows how the site appears on Google.",
        },
        {
          kind: "topic",
          title: "Interface",
          text: "The logo's placeholder bars, one of them yellow, stand for the moment dummy content turns into real data. The popup shows what Dummio found before filling, and afterwards what happened, including values the form rejected, so a wrong guess is easy to spot. Settings stay short, and site presets let you pin a value to a site, like your own test login on staging.",
        },
        {
          kind: "shots",
          shots: [
            {
              src: "/images/dummio/popup-before-fill.png",
              alt: "The popup before filling, listing the fields Dummio found on the page",
              width: 816,
              height: 1272,
            },
            {
              src: "/images/dummio/settings.png",
              alt: "The settings page, with fill settings and site presets",
              width: 1436,
              height: 1598,
            },
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          kind: "figure",
          title: "How a fill works",
          src: "/images/dummio/fill-flow.png",
          alt: "Flowchart. You ask Dummio to fill, it finds the form fields, works out what each one wants, creates one fake person, shapes each value to fit and writes the values to the page. If the form accepts a value, Dummio shows the result. If not, it tries the next likely format and writes again.",
          width: 1440,
          height: 1320,
        },
        {
          kind: "text",
          text: "Here's the same fill from the popup, step by step:",
        },
        {
          kind: "figure",
          title: "The same fill from the popup",
          src: "/images/dummio/popup-sequence.png",
          alt: "UML sequence diagram between you, the popup, browser storage and the page. You open the popup, which asks the page to find the fields and gets back what it found. You choose fill, the popup gets the settings for this site from browser storage and asks the page to fill with them. The page creates the person, writes the values and reports what happened, and the popup shows you the result.",
          width: 1440,
          height: 1176,
        },
        {
          kind: "text",
          text: "The extension runs entirely inside the browser. The website is separate, so changes to it can't affect the extension.",
        },
      ],
    },
    {
      id: "learnings",
      title: "Learnings",
      blocks: [
        {
          kind: "text",
          text: "Dummio is a small passion project and I was the only person on it, but I still ran it the way I'd run a project at work:",
        },
        {
          kind: "figure",
          title: "How I ran the project",
          src: "/images/dummio/workflow.png",
          alt: "Workflow diagram: idea, PRD, system design, build, testing, release planning, release and learnings. A dashed arrow goes from testing back to build when a bug is found.",
          width: 1440,
          height: 552,
        },
        {
          kind: "points",
          title: "Managing the project",
          points: [
            "Writing the requirements first made every later decision faster. When a new idea came up, I checked it against the plan instead of debating it from scratch.",
            "I tracked every milestone and fix on a kanban board, which made progress easy to follow and problems easy to trace.",
            "Keeping a decisions log meant I always knew why something was done.",
            "It was tempting to build every feature at once. Shipping a focused first version and leaving the rest for later kept the scope manageable.",
          ],
        },
        {
          kind: "points",
          title: "Design and development",
          points: [
            "I picked the name, logo and design system before building anything, so the screens came together quickly and looked like they belonged together.",
            "Format matching wasn't in my original plan. I added it after real forms kept rejecting my values, and now I try things on real pages much earlier.",
          ],
        },
        {
          kind: "points",
          title: "Testing",
          points: [
            "Hand testing on real forms found bugs that automated tests hadn't. I logged each one, fixed it and added a test so it stays fixed.",
            "My automated tests only ran in one browser, so the worst bug stayed hidden until I tried the build in another just before release. It would have stopped the extension working there.",
          ],
        },
        {
          kind: "topic",
          title: "Publishing",
          text: "Publishing was a learning curve of its own. Getting Dummio to work was one job. Getting it ready for production was another: learning what each store wants, setting up the accounts and tools, and making sure all of it was in place before anyone could install it.",
        },
        {
          kind: "figure",
          title: "Everything publishing took",
          src: "/images/dummio/publishing.png",
          alt: "Workflow diagram of a release. Prepare the release and test the built zips in both browsers. Then three checklists. Chrome Web Store: $5 developer account, publisher name, trader declaration, listing and screenshots, a reason for each permission and a data use statement, then submit and wait for review. Firefox Add-ons: free developer account, add-on ID, data permissions, listing and screenshots, privacy policy and source code zip, then submit and wait for review. Website: hosting on Vercel, privacy policy page, analytics after Allow, Search Console, sitemap and the site name on Google, then merge and it deploys itself. All three end with checking the live version myself and pointing the site's buttons at the store listings.",
          width: 1440,
          height: 1132,
        },
        {
          kind: "topic",
          title: "Results",
          text: "Dummio is published on the Chrome Web Store and Firefox Add-ons, with its own website and public code.",
        },
        {
          kind: "topic",
          title: "Overall",
          text: "It was a fun and good learning experience. Working on this as a passion project taught me a lot and frustrated me at times, and it left me with so many ideas for version ups.",
        },
      ],
    },
  ],
};

const portfolio: CaseStudy = {
  slug: "portfolio",
  title: "My Digital Portfolio",
  tagline: "My own site, from first idea to release.",
  description:
    "How I imagined, designed, built and released my digital portfolio, from the first idea to the live site.",
  codeHref: "https://github.com/melvinbulan17/my-portfolio",
  heroImage: {
    src: "/images/portfolio/hero.png",
    alt: "The first screen of this portfolio: my name, the line Make it work. Make it right., and a terminal card, on a navy ground with stars",
    width: 2160,
    height: 1350,
  },
  sections: [
    {
      id: "summary",
      title: "Summary",
      blocks: [
        {
          kind: "facts",
          facts: [
            {
              label: "What",
              value:
                "A personal site that compiles my projects, shows what I do and gets people to contact me",
            },
            {
              label: "My role",
              value:
                "Solo: product, project management, design, development, testing and release",
            },
            {
              label: "Scope",
              value: "The full cycle, from idea to release",
            },
            {
              label: "Built with",
              value:
                "Next.js, TypeScript, Tailwind CSS and Motion, with automated tests and CI",
            },
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "Problem Statement",
      blocks: [
        {
          kind: "text",
          text: "Ever since I was young, I've wanted a site where I could compile all my projects. In this industry, having one also helps recruiters and hiring managers see what I do.",
        },
      ],
    },
    {
      id: "audience",
      title: "Target Audience",
      blocks: [
        {
          kind: "text",
          text: "Recruiters, hiring managers and people I might work with. It's also for me, since this site is my personal documentation of my whole journey.",
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      blocks: [
        {
          kind: "text",
          text: "Endless hours of browsing Reddit and GitHub discussions of people sharing their portfolios, and watching YouTube videos for ideas.",
        },
        {
          kind: "text",
          text: "I kept personal notes along the way on typography, on what's appealing and on what isn't. Those notes became the design system I built from.",
        },
      ],
    },
    {
      id: "goals",
      title: "Goals",
      blocks: [
        {
          kind: "list",
          items: [
            "Put all my projects in one place, with case studies for the main ones.",
            "Make it easy to get in touch, with a working contact form.",
            "Keep the text out of the components, so copy changes never touch them.",
            "Stay light: no heavy backend and no custom analytics dashboard.",
            "Hold the release until there's real work to show.",
          ],
        },
      ],
    },
    {
      id: "system-design",
      title: "System Design",
      blocks: [
        {
          kind: "topic",
          title: "One design system",
          text: "A navy ground, one magenta accent, Fira Code everywhere, square corners and 1px outline buttons. Every page takes its colours and type from the same tokens, so new sections look like they belong.",
        },
        {
          kind: "topic",
          title: "The moon",
          text: "Bulan means moon in Filipino. The logo is my own sketch of an M with a crescent moon over one leg, and hovering over my surname in the hero brightens the stars and shows what the name means.",
        },
        {
          kind: "shots",
          shots: [
            {
              src: "/images/portfolio/moon.png",
              alt: "The hero while hovering over Bulan: an arrow points to a note saying it means moon in Filipino",
              width: 1350,
              height: 840,
            },
          ],
        },
        {
          kind: "topic",
          title: "One dark ground",
          text: "I tried alternating light and dark sections, then two dark shades. The light sections hurt the eyes and the two shades looked patchy. So every section now sits on one dark colour, with a thin line between them.",
        },
        {
          kind: "topic",
          title: "Stars",
          text: "A little add-on, since the moon and stars go together. They run down the whole page and fade toward the footer. The first version felt too busy, so I made them sparser and dimmer.",
        },
        {
          kind: "topic",
          title: "Motion",
          text: "The terminal types once, the marquee drifts, and cards rise in once as they scroll into view. All of it stops for visitors who ask for reduced motion.",
        },
        {
          kind: "shots",
          shots: [
            {
              src: "/images/portfolio/work.png",
              alt: "The Selected Work section, with the Dummio card and its screenshot",
              width: 1584,
              height: 1062,
            },
            {
              src: "/images/portfolio/phone.png",
              alt: "The first screen on a phone, where the links fold into a menu toggle",
              width: 780,
              height: 1688,
            },
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          kind: "figure",
          title: "How a change reaches the site",
          src: "/images/portfolio/change-flow.png",
          alt: "Flowchart. Pick one card from the board, make a branch for it, change the text or the components, open a pull request, then run lint, types, tests and build. If every check passes, it gets reviewed, merged and released. If not, I fix it and push again.",
          width: 1440,
          height: 1168,
        },
        {
          kind: "text",
          text: "The site's text lives in its own files, so there's no database to look after and a copy change never touches a component.",
        },
      ],
    },
    {
      id: "learnings",
      title: "Learnings",
      blocks: [
        {
          kind: "text",
          text: "It's a personal site and I was the only person on it, but I still took it through the same stages as a project at work:",
        },
        {
          kind: "figure",
          title: "How I ran the project",
          src: "/images/portfolio/workflow.png",
          alt: "Workflow diagram: idea, PRD, system design, build, testing, release planning, release and learnings. A dashed arrow goes from testing back to build when a bug is found.",
          width: 1440,
          height: 552,
        },
        {
          kind: "points",
          title: "Managing the project",
          points: ["I tracked every section and fix on a kanban board."],
        },
        {
          kind: "points",
          title: "Design and development",
          points: [
            "Some choices only showed their problems on the real page. The light sections and the first star field both changed once I saw them in the browser.",
            "I kept a list of every change from the design system, so I can see how the design moved and why.",
            "Adding a second page broke the nav, because its links assumed you were on the home page. It's a good reminder to test what a new page does to the old ones.",
          ],
        },
        {
          kind: "points",
          title: "Testing",
          points: [
            "Lint, format, types, unit tests and a build run on every pull request, so a broken change gets caught before it merges.",
          ],
        },
        {
          kind: "points",
          title: "Release",
          points: [
            "Before going live I ran pre-checks to make sure everything was in place: real work on the page, a connected contact form and no placeholder text.",
          ],
        },
        {
          kind: "topic",
          title: "Overall",
          text: "A very fun and good learning experience. I took my time choosing the right animations and motion, and got to bring my idea to life. I also wanted a place where I can document my journey through the full cycle.",
        },
      ],
    },
  ],
};

export const caseStudies = [dummio, portfolio];
