# Aivar

A modern monorepo project built with Next.js, Convex, and shadcn/ui components. Features voice AI integration via Vapi and authentication through Clerk.

## Project Structure

This project uses [Turbo](https://turbo.build/) for monorepo management and follows a modular architecture.

### Apps

- **web** (`apps/web`) - Main Next.js application
  - Runs on `localhost:3000`
  - Features a Dashboard and Clerk authentication
  - Uses `modules` directory pattern for feature isolation (`auth`, `dashboard`)
  - Integrated with Sentry for error tracking
- **widget** (`apps/widget`) - Embeddable AI Voice Widget
  - Runs on `localhost:3001`
  - Powered by Vapi for voice AI
  - Standalone Next.js app optimized with Turbopack

### Packages

- **@workspace/backend** (`packages/backend`) - Convex backend functions and schema
- **@workspace/ui** (`packages/ui`) - Shared UI component library (shadcn/ui + Radix UI)
- **@workspace/math** (`packages/math`) - Shared utility functions
- **@workspace/eslint-config** - Shared ESLint configuration
- **@workspace/typescript-config** - Shared TypeScript configuration

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Backend**: Convex
- **UI System**: Tailwind CSS v4, shadcn/ui, Radix UI
- **Authentication**: Clerk
- **Voice AI**: Vapi
- **Monitoring**: Sentry
- **Package Manager**: pnpm (v10.27.0)

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 10.27.0

### Installation

```bash
# Install dependencies
pnpm install

# Setup Convex backend
cd packages/backend
pnpm dev
# In a new terminal, run setup if needed
pnpm setup
```

### Environment Setup

Create `.env.local` files in the respective application directories.

#### `apps/web/.env.local`

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Sentry (Optional for dev)
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

#### `apps/widget/.env.local`

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=

# Vapi AI
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_VAPI_AGENT_ID=
```

#### `packages/backend/.env.local`

```bash
# Convex
CONVEX_DEPLOYMENT=
CONVEX_URL=

# Clerk Integration
CLERK_JWT_ISSUER_DOMAIN=
```

### Development

```bash
# Run all apps and packages in dev mode
pnpm dev

# Build all apps
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format
```

## Working with UI Components

### Adding Components

Add shadcn/ui components to the shared UI package:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components are placed in `packages/ui/src/components` and exported for use across all apps.

### Using Components

Import components from the shared UI package:

```tsx
import { Button } from '@workspace/ui/components/button'
```

## Documentation

Documentation is generated using Typedoc and located in `docs/`. To generate:

```bash
pnpm generate-docs
```
