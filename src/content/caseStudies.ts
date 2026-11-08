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
  sections: {
    overview: [
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
    problem: [
      {
        kind: "text",
        text: "I also test forms as part of my work experience: sign-up, checkout, profile and admin pages, over and over. Typing test data by hand is slow, and after the tenth pass everyone falls back on the same few values, like `test@test.com` and `asdf`. Values like that hide bugs, because they never trigger an unusual name, a date in the wrong order or a phone number in the wrong format.",
      },
      {
        kind: "text",
        text: "It's for QA testers running repeated checks or preparing demo data, and developers who need quick data while building a form. I also wanted something I'd use at work.",
      },
    ],
    approach: [
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
        kind: "topic",
        title: "Research",
        text: "I tried the form fillers testers already use. Between them they cover one-click filling, templates and custom rules. What none of them did well was fit the data to the form. They fill in a value, but not always in the shape the field wants. So I decided to cover the basics and stand apart on format matching and believable data.",
      },
      {
        kind: "topic",
        title: "Goals",
        text: "Fill a form in one action with no setup. Only count a value as filled if the form accepts it. Keep the extension private, and ask only for the permissions it truly needs. Start lean and add features one at a time.",
      },
      {
        kind: "topic",
        title: "Format matching",
        text: "The same field takes different shapes on different sites. A birthday might be written in a different order or split into three dropdowns, and a phone number might need a country code or digits only. So Dummio reads the clues on each field first, then shapes the value to fit.",
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
        text: "Generated emails use domains reserved for testing, which can't receive mail.",
      },
      {
        kind: "topic",
        title: "Private by design",
        text: "Dummio only touches a page when you ask it to. That meant no server, no accounts and no tracking in the extension. The website only loads analytics after a visitor chooses Allow.",
      },
      {
        kind: "topic",
        title: "Interface",
        text: "I picked the name, logo and design system before building anything. The logo's placeholder bars, one of them yellow, stand for the moment dummy content turns into real data. The popup shows what Dummio found before filling, and afterwards what happened, including values the form rejected, so a wrong guess is easy to spot. Site presets let you pin a value to a site, like your own test login on staging.",
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
    implementation: [
      {
        kind: "figure",
        title: "How Dummio fills a page",
        src: "/images/dummio/fill-flow.png",
        alt: "Architecture diagram. You click the button, press the shortcut or right-click a field, and only then does Dummio step into the page. It works out what each field wants, creates one made-up person and writes each value in the right shape. If the form accepts it, Dummio reports what was filled. If not, it tries the next likely format and writes again.",
        width: 1440,
        height: 1168,
      },
      {
        kind: "text",
        text: "Here's the main flow, filling a page from the popup:",
      },
      {
        kind: "figure",
        title: "Filling a page from the popup",
        src: "/images/dummio/popup-sequence.png",
        alt: "UML sequence diagram between you, the popup, browser storage and Dummio on the page. You open the popup, which asks the page to find the fields and gets back what it found. You choose Fill page, the popup gets your site settings from browser storage and asks the page to fill with them. Dummio fills and checks each field and reports what happened, and the popup shows each field's result.",
        width: 1440,
        height: 1176,
      },
      {
        kind: "text",
        text: "The extension runs entirely inside the browser. The website is separate, so changes to it can't affect the extension.",
      },
    ],
    challenges: [
      {
        kind: "topic",
        title: "Forms rejected my values",
        text: "Early fills looked right but real forms kept refusing them: a date in the wrong order, a phone number with a country code where the form wanted digits only. Format matching wasn't in my original plan. I added it, and when a form still says no, Dummio now tries the next likely format before reporting the field as not accepted.",
      },
      {
        kind: "topic",
        title: "Addresses that didn't add up",
        text: "When a form had its own province, state or city dropdowns, the made-up address sometimes named a place the dropdown didn't list, so the fields disagreed. Now Dummio picks the person's place from the places those dropdowns can show.",
      },
      {
        kind: "topic",
        title: "A shortcut that wasn't there",
        text: "Chrome quietly skips a suggested keyboard shortcut when it clashes with another one, so some people would have no shortcut at all. The popup now notices this and offers a button to set one.",
      },
    ],
    testing: [
      {
        kind: "list",
        items: [
          "Unit tests cover how fields are recognised, the formats and the generated data. Browser tests fill real sample forms. All of it runs on every pull request.",
          "Hand testing on real forms found bugs the automated tests hadn't. I logged each one, fixed it and added a test so it stays fixed.",
          "My automated tests only ran in one browser, so the worst bug stayed hidden until my final check of the built extension in Firefox, just before release. Settings couldn't be saved there, which would have stopped it working. It was fixed before release, and now I check every browser I ship to.",
        ],
      },
    ],
    outcome: [
      {
        kind: "text",
        text: "Dummio is published on the Chrome Web Store and Firefox Add-ons, with its own website and public code.",
      },
      {
        kind: "points",
        title: "What I learned",
        points: [
          "Writing the requirements first made every later decision faster. When a new idea came up, I checked it against the plan instead of debating it from scratch.",
          "A decisions log meant I always knew why something was done.",
          "Shipping a focused first version and leaving the rest for later kept the scope manageable.",
          "Getting it to work and getting it ready to publish were two different jobs. Each store wanted its own accounts, listing, privacy details and review.",
        ],
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
        title: "Overall",
        text: "It was a fun and good learning experience. Working on this as a passion project taught me a lot and frustrated me at times, and it left me with so many ideas for version ups.",
      },
    ],
  },
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
  sections: {
    overview: [
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
    problem: [
      {
        kind: "text",
        text: "Ever since I was young, I've wanted a site where I could compile all my projects. In this industry, having one also helps recruiters and hiring managers see what I do. It's also for me, since this site is my personal documentation of my whole journey.",
      },
    ],
    approach: [
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
        kind: "topic",
        title: "Research",
        text: "Endless hours of browsing Reddit and GitHub discussions of people sharing their portfolios, and watching YouTube videos for ideas. I kept notes along the way on typography and on what's appealing and what isn't. Those notes became the design system I built from.",
      },
      {
        kind: "topic",
        title: "Goals",
        text: "Put all my projects in one place, with case studies for the main ones. Make it easy to get in touch. Stay light, with no heavy backend. Hold the release until there's real work to show.",
      },
      {
        kind: "topic",
        title: "One design system",
        text: "A navy ground, one magenta accent, Fira Code everywhere, square corners and outline buttons. Every page takes its colours and type from the same tokens, so new sections look like they belong.",
      },
      {
        kind: "topic",
        title: "The moon",
        text: "Bulan means moon in Filipino. The logo is my own sketch of an M with a crescent moon over one leg, and hovering over my surname in the hero brightens the stars and shows what the name means. The stars run down the whole page and fade toward the footer.",
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
        title: "Motion",
        text: "The terminal types once, the marquee drifts, and sections rise in once as they scroll into view. All of it stops for visitors who ask for reduced motion.",
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
    implementation: [
      {
        kind: "figure",
        title: "How the site is put together",
        src: "/images/portfolio/architecture.png",
        alt: "Architecture diagram. The site's text lives in its own files, and page parts turn it into pages. Every merge publishes the site. When a visitor sends the contact form, the site checks the message. If every field is filled in right, an email service sends it to my inbox. If not, the visitor is asked to fix it and the site checks again.",
        width: 1440,
        height: 1168,
      },
      {
        kind: "text",
        text: "Here's the main flow, sending the contact form:",
      },
      {
        kind: "figure",
        title: "Sending the contact form",
        src: "/images/portfolio/contact-sequence.png",
        alt: "UML sequence diagram between you, the contact form, the site and the email service. You fill in the form and press Send, and the form checks each field. It sends the message to the site, which checks it again and passes it to the email service. The email service sends it to my inbox and confirms, the site reports back, and the form clears and says thanks.",
        width: 1440,
        height: 976,
      },
      {
        kind: "text",
        text: "The site's text lives in its own files, so there's no database to look after and a copy change never touches a component.",
      },
    ],
    challenges: [
      {
        kind: "topic",
        title: "The page felt wrong",
        text: "I tried alternating light and dark sections, then two dark shades. The light sections hurt the eyes and the two shades looked patchy. Every section now sits on one dark colour, with a thin line between them. The first star field had the same problem, too busy once I saw it on the real page, so I made it sparser and dimmer.",
      },
      {
        kind: "topic",
        title: "A second page broke the nav",
        text: "Adding case study pages broke the nav, because its links assumed you were on the home page. I fixed the links to work from any page, and now I test what a new page does to the old ones.",
      },
      {
        kind: "topic",
        title: "Animations that never ran",
        text: "Some sections were meant to rise in as you scrolled, but never did. I only caught it when I looked closely at the live page, and fixed it so every reveal runs once.",
      },
      {
        kind: "topic",
        title: "A form that disappeared",
        text: "After sending, the thank-you box replaced the whole form, so you couldn't send another message. The form now stays on screen, and the thank-you sits beside the button.",
      },
    ],
    testing: [
      {
        kind: "text",
        text: "Lint, format, types, unit tests and a build run on every pull request, so a broken change gets caught before it merges. I also check every change in a real browser, on desktop and phone.",
      },
      {
        kind: "figure",
        title: "How a change reaches the site",
        src: "/images/portfolio/change-flow.png",
        alt: "Flowchart. Pick one card from the board, make a branch for it, change the text or the components, open a pull request, then run lint, types, tests and build. If every check passes, it gets reviewed, merged and released. If not, I fix it and push again.",
        width: 1440,
        height: 1168,
      },
    ],
    outcome: [
      {
        kind: "text",
        text: "The site is live, with case studies for my main projects and a working contact form.",
      },
      {
        kind: "points",
        title: "What I learned",
        points: [
          "Some choices only show their problems on the real page, so I look at things in the browser early.",
          "Keeping a list of every change from the design system shows how the design moved and why.",
          "Before going live I checked everything was in place: real work on the page, a connected contact form and no placeholder text.",
        ],
      },
      {
        kind: "topic",
        title: "Overall",
        text: "A very fun and good learning experience. I took my time choosing the right animations and motion, and got to bring my idea to life. I also wanted a place where I can document my journey through the full cycle.",
      },
    ],
  },
};

export const caseStudies = [dummio, portfolio];
