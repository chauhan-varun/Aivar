'use client'

import * as React from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export function Providers({ children }: { children: React.ReactNode }) {
  if (!convex) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
