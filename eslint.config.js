// @ts-check

// import eslint from '@eslint/js';
import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      // "@typescript-eslint": tseslint,
    },
    rules: {
      "max-len": ["error", { code: 80 }],
      indent: ["error", 2],
      "no-console": "off",
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": 
        ["error", { argsIgnorePattern: "^_" }],
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
