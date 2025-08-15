module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-unused-vars": "off", // Turn off base rule as it conflicts with TypeScript rule
  },
};
