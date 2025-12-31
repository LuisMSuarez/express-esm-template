/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/"],

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
        diagnostics: {
          ignoreCodes: [151002],
        },
      },
    ],
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  transformIgnorePatterns: ["/node_modules/(?!inversify)/"],
};
