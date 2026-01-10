import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import tsdoc from 'eslint-plugin-tsdoc'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import globals from 'globals'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  // Global ignores - these files/folders are completely skipped
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/docs/**',
      '**/_generated/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
    ],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'off',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    // Only apply TSDoc to TypeScript files (not config files)
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.config.ts', '**/*.d.ts'],
    plugins: {
      tsdoc,
    },
    rules: {
      'tsdoc/syntax': 'warn',
    },
  },
  {
    // Allow unused vars with underscore prefix
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]
