import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import html from "@html-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ...html.configs["flat/recommended"],
    files: ["**/*.{js,mjs,cjs,ts,html,css}"],
    rules: {
      ...html.configs["flat/recommended"].rules, // Must be defined. If not, all recommended rules will be lost
      "@html-eslint/indent": "error",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
