// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["dist/**", "node_modules/**"],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },

    rules: {
      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Disable rules that conflict with Prettier
      ...eslintConfigPrettier.rules,

      // Run Prettier as an ESLint rule
      "prettier/prettier": "error",
    },
  },

  // ------------------------------------------------------------
  // Jest test overrides — allow `any` and relax strict rules
  // ------------------------------------------------------------
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
