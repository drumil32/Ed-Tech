module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
      { usePrettierrc: true },
    ],
    "react/prop-types": "off",
  },
};
