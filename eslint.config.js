import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".astro", ".cyberzavod", ".claude"] },
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettierConfig,
);
