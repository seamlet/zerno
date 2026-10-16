import process from "node:process";
import node from "@astrojs/node";
import seamlet from "@seamlet/astro";
import { defineConfig } from "astro/config";

/** The CMS where the coffee shop is edited and published. */
const SEAMLET_CMS = "https://cms.seamlet.ru";

// The coffee shop is a site of its own: its pages are built with the content published in the CMS,
// and @seamlet/astro adds what is rendered on request, the preview the CMS's editor frames and the
// photos uploaded there. That is why the site, static as it is, runs on a Node server.
export default defineConfig({
  adapter: node({ mode: "standalone" }),
  server: { port: 4322 },
  integrations: [
    seamlet({
      // Where the content comes from and whose editor may frame the preview. `CMS_ORIGIN` points the
      // site at another CMS, such as one run locally (http://localhost:4321); an empty one is unset,
      // which is how the image is built without it.
      cms: process.env["CMS_ORIGIN"] || SEAMLET_CMS,
      site: "./src/seamlet.ts",
    }),
  ],
  vite: {
    // Keeps every script a file, however small: the site's policy allows scripts only from itself.
    build: { assetsInlineLimit: 0 },
  },
});
