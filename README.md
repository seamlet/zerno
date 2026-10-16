# Зерно

The coffee shop «Зерно», a made-up café: the demo site of the [Seamlet CMS](https://cms.seamlet.ru). Its owner edits the texts, photos, menu and events right on the pages in the CMS, while the site keeps its own design and code. It lives at https://zerno.bysavelii.com.

The site is connected the way every site is: with [`@seamlet/astro`](https://www.npmjs.com/package/@seamlet/astro) from npm ([source](https://github.com/seamlet/sdk)).

- `src/schema.ts` describes what the owner edits; the CMS builds its form from it.
- The pages (`src/components`) mark the elements that show the content: `<h1 {...edit("hero", "title")}>`.
- `src/seamlet.ts` names the site in the CMS (`coffee-shop`) and its pages (`/`, `/menu`).
- The pages are built with the content published in the CMS. `@seamlet/astro` adds what is rendered on request: the preview the CMS's editor frames (`/preview`) and the photos uploaded in the CMS (`/media/…`).

## Development

```bash
npm install
npm run dev     # http://localhost:4322, its preview at /preview
make check      # formatting, types, linter, tests and the build
```

The content comes from https://cms.seamlet.ru; `CMS_ORIGIN` points the site at another CMS, such as one run locally: `CMS_ORIGIN=http://localhost:4321 npm run dev`. The build takes the published content, so the CMS must answer.

## Deployment

«Опубликовать» in the CMS runs [`deploy.yml`](.github/workflows/deploy.yml), and so does every push to `main`: the image `ghcr.io/seamlet/zerno:<sha>` is built with the content published at that moment and deployed over SSH. The server side lives in a repository of its own; this one holds no addresses, keys or tokens. Pull requests get the checks only.
