// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "coverage/**", "license/**", "node_modules/**"],
  },

  // ------------------------------------------------------------
  // TEST FILES FIRST — so they don't inherit main parserOptions
  // ------------------------------------------------------------
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.test.json",
        sourceType: "module",
      },
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // ------------------------------------------------------------
  // MAIN TS CONFIG — explicitly ignores test files
  // ------------------------------------------------------------
  {
    files: ["**/*.ts"],
    ignores: ["**/*.test.ts", "**/*.spec.ts"], // ← prevents overlap
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
      ...tseslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },
];
