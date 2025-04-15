// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "prettier/prettier": "off",

      "max-len": ["error", {
        code: 140,
      }],

      "arrow-body-style": ["error", "as-needed"],
      "eol-last": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],

      "comma-spacing": ["error", {
        before: false,
        after: true,
      }],

      "space-in-parens": ["error", "never"],

      "keyword-spacing": ["error", {
        before: true,
        after: true,
      }],

      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "import/no-default-export": "error",
      "import/no-extraneous-dependencies": "off",

      "import/order": ["warn", {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "ignore",
      }],

      "no-console": "warn",

      "no-restricted-syntax": ["error", {
        selector: "TSEnumDeclaration",
        message: "Do not declare enums",
      }],

      curly: "off",

      indent: ["error", 2, {
        SwitchCase: 1,
      }],

      quotes: ["error", "single", {
        avoidEscape: true,
      }],

      semi: ["error", "never"],
      "no-promise-executor-return": ["error"],
      "no-return-await": ["error"],
      "promise/prefer-await-to-then": ["error"],
      "lodash/import-scope": ["error", "member"],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "comma",
          requireLast: true,
        },

        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
      }],

      "@typescript-eslint/ban-ts-comment": "off",

      "@typescript-eslint/no-unused-vars": ["error", {
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
    },
  },
);