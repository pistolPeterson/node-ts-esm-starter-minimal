/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn", // 👈 This gives a warning for `any`
    // optionally, enforce no implicit `any` (like `noImplicitAny`)
    "@typescript-eslint/explicit-module-boundary-types": "warn",
  },
  ignorePatterns: ["dist/**/*.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
}
