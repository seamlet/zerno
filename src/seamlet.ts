import { defineSeamletSite } from "@seamlet/astro/site";
import HomePage from "./components/HomePage.astro";
import MenuPage from "./components/MenuPage.astro";
import { coffeeShopSchema } from "./schema";

/**
 * The pages of the coffee shop by their address. The build renders each of them, and the CMS lists
 * the same addresses for its editor.
 */
export const pages = { "/": HomePage, "/menu": MenuPage };

// The coffee shop as the CMS knows it: its address there, its schema and its pages.
export default defineSeamletSite({
  id: "coffee-shop",
  schema: coffeeShopSchema,
  pages,
});
