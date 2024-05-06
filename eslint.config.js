import js from "@eslint/js";

export default [

  {
    env: {
      "browser": true,
      "es2021": true,
      "jest": true,
      "node": true
    },
    extends: ["airbnb-base", "prettier"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-console": "off",
      "func-names": [
        "warn",
        "as-needed",
        {
          generators: "named",
          expressions: "as-needed"
        }
      ]
    }
  }
];
