module.exports = {
  extends: ["next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
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
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off", // Turn off base rule as it conflicts with TypeScript rule
  },
};
