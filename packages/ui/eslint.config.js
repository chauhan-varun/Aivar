import { config } from '@workspace/eslint-config/react-internal'

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    // Ignore shadcn/ui components - they're third-party generated code
    ignores: ['src/components/ui/**'],
  },
]
