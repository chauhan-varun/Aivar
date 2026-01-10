# Aivar

A modern monorepo project built with Next.js, Convex, and shadcn/ui components. Features voice AI integration via Vapi and authentication through Clerk.

## Project Structure

### Apps
- **web** - Main Next.js web application (port 3000)
  - Clerk authentication
  - Sentry error tracking
  - Built with Next.js 16 and React 19
  
- **widget** - Embeddable widget application (port 3001)
  - Vapi AI voice integration
  - Standalone Next.js app with turbopack

### Packages
- **@workspace/backend** - Convex backend services
- **@workspace/ui** - Shared UI components (shadcn/ui + Radix UI)
- **@workspace/math** - Utility math functions
- **@workspace/eslint-config** - Shared ESLint configuration
- **@workspace/typescript-config** - Shared TypeScript configuration

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Backend**: Convex
- **UI**: shadcn/ui, Radix UI, Tailwind CSS v4
- **Auth**: Clerk
- **Voice AI**: Vapi
- **Monitoring**: Sentry
- **Build**: Turbo (monorepo orchestration)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js >= 20
- pnpm 10.27.0

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Development

```bash
# Run all apps in dev mode
pnpm dev

# Build all packages
pnpm build

# Lint all packages
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

Components are placed in `packages/ui/src/components` and shared across all apps.

### Using Components

Import components from the shared UI package:

```tsx
import { Button } from "@workspace/ui/components/button"
```

### Styling

- Tailwind CSS v4 configured across all apps
- Global styles in `packages/ui/src/styles/globals.css`
- Theme support via `next-themes`

## Backend Development

The Convex backend is located in `packages/backend`:

```bash
# Start Convex dev server
cd packages/backend
pnpm dev

# Setup Convex
pnpm setup
```

## Environment Setup

Each app may require environment variables:
- `apps/web` - Clerk keys, Sentry DSN
- `apps/widget` - Vapi API keys
- `packages/backend` - Convex deployment URL
