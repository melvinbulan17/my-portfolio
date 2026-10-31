# my-portfolio

Personal portfolio site for myself.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4. Animation uses Motion; icons come from Lucide and Simple Icons.

## Requirements

- Node.js 26 (see `.nvmrc`)
- pnpm 12

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The site runs at http://localhost:3000.

## Scripts

| Script           | What it does                      |
| ---------------- | --------------------------------- |
| `pnpm dev`       | Start the dev server              |
| `pnpm build`     | Build for production              |
| `pnpm start`     | Serve the production build        |
| `pnpm lint`      | Run ESLint                        |
| `pnpm typecheck` | Type-check with TypeScript        |
| `pnpm format`    | Format all files with Prettier    |
| `pnpm test`      | Run unit tests (Vitest)           |
| `pnpm test:e2e`  | Run end-to-end tests (Playwright) |

A pre-commit hook runs ESLint and Prettier on staged files.

## Project structure

```
src/
  app/                 Routes, root layout, global styles and design tokens
  components/
    ui/                Small building blocks: Button, Tag
    layout/            Nav, Footer, SocialRail
    sections/          Page sections: Hero, Work, About, Experience, Skills, Contact
  content/             Site copy and data (projects, experience, skills)
  lib/                 Shared helpers and motion constants
  types/               Shared TypeScript types
public/
  images/              Project screenshots and photos
  logos/               M mark for dark and light backgrounds
tests/
  e2e/                 Playwright tests
  unit/                Vitest tests, mirroring the src/ folders
```

Unit tests live in `tests/unit/`, in the same folders as the code they test, with a `Test` suffix: `src/components/ui/Button.tsx` is tested by `tests/unit/components/ui/ButtonTest.tsx`.

## Design tokens

Colours, type sizes, radii and easing live in `src/app/globals.css` as a Tailwind v4 `@theme`. The default Tailwind palette is switched off, so only the site's own colours are available (`bg-surface-900`, `text-accent`, and so on). The single typeface is Fira Code.

## Commits

Commit messages are short and imperative, starting with a capital letter and no trailing period: `Add hero section`, `Fix nav overlap on mobile`. Each feature is built on its own branch and squash-merged into `main` through a pull request.
