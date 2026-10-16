# Zerno

The rules of this project for agents and humans. The development process is set by Cyberzavod: stages, roles, and general principles come from its harness, and here is only what belongs to the project. The files for a specific agent (for example, `CLAUDE.md`) are created by `npx cyberzavod sync` on top of this file.

## About the project

The demo site of the Seamlet CMS: «Зерно», a made-up coffee shop whose owner edits its texts, photos, menu and events in the CMS at https://cms.seamlet.ru. It is a site of its own, connected the way every site is: it knows the CMS only through `@seamlet/astro` from npm (source in the public repository seamlet/sdk, where the same coffee shop is the test site of the package). It lives at https://zerno.bysavelii.com, on another server than the CMS. This repository is public.

- TypeScript, strict (`astro/tsconfigs/strict` plus `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`). Astro with `@astrojs/node` in standalone mode; ESLint with `strictTypeChecked` and an exhaustive `switch` over a union; Prettier with `prettier-plugin-astro`; Vitest. Node 24+, npm.
- Everything is in English: code, comments, messages, tests, commits, documentation. Texts a visitor of the site or the CMS's user reads are in Russian (`<html lang="ru">`).

## Architecture

- `src/schema.ts` — what the owner edits, the one description of the content: the CMS builds its form from it, and the pages take the types of their props from it (`CoffeeShopContent`). `src/initial-content.ts` — the content the site shows until the first publication; a test checks that the CMS can save it as it is.
- `src/seamlet.ts` — the site as the CMS knows it (`defineSeamletSite`): its id there (`coffee-shop`), its schema and its pages by address (`/`, `/menu`).
- `src/components` — the pages (`HomePage`, `MenuPage`) and what they share (`CoffeeShopLayout` with the navigation and the contacts, `MenuList`), with their own design. Every element that shows a field or a record carries its marker: `const edit = editable<CoffeeShopContent>()`, then `<h1 {...edit("hero", "title")}>`; a path the content does not have does not compile. Links between the pages are written as on the site (`<a href="/menu">`). `src/format.ts` — prices, dates and phone links the Russian way.
- `src/pages/[...page].astro` — the pages are built once, with the content published in the CMS (`site.loadPublishedContent()`, from `/api/sites/coffee-shop/published`), loaded once for all of them.
- What `@seamlet/astro` adds is rendered on request by the Node server: the preview the CMS's editor frames (`/preview`, `/preview/menu`, framed by the CMS only) and the photos uploaded in the CMS (`/media/coffee-shop/<file>`), taken from it.
- `astro.config.js` — the CMS the site takes its content from and whose editor may frame the preview: https://cms.seamlet.ru, or `CMS_ORIGIN`.

The CMS keeps a copy of the schema, the initial content and the addresses of the pages (seamlet/cms, `src/sites/connected/coffee-shop.ts` and `src/sites/registry.ts`) until sites send them to the CMS themselves: a change of any of them is made there too, and in the test site of seamlet/sdk.

A site never renders content as raw HTML (`set:html`): the CMS's editor acts on what the preview says.

## Commands

- Formatting: `npm run format`
- Development server: `npm run dev` — http://localhost:4322, its preview at `/preview`, the content of https://cms.seamlet.ru; with a CMS run locally: `CMS_ORIGIN=http://localhost:4321 npm run dev`.
- Build into `dist/`: `npm run build` (takes the published content, so the CMS must answer); run it: `npm start` (port from `PORT`, default 4322).
- Checks (`verification.commands` in `.cyberzavod/project.json`):
  - `make check` — formatting check, `astro check`, ESLint, Vitest, the build.

## Tasks

- A task is given as text in a session or as an issue of the GitHub repository seamlet/zerno, read in full by its number: `gh issue view <N> --repo seamlet/zerno --comments`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), entirely in English. A commit that closes an issue writes `Closes #N` in its body.

## Code and tests

- ESLint runs the `strictTypeChecked` rules; `.js` and `.astro` files are linted without type information. Plain TypeScript does not read `.astro` files: `src/env.d.ts` gives ESLint a type for `.astro` imports; `astro check` types them exactly.
- Tests live next to the code as `*.test.ts` and check what can go wrong without a browser: that the initial content is valid for the schema, the formatting of prices and dates, the parameter of each page's address.
