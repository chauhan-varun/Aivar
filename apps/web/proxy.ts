import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isOrgFreeRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/org-selection(.*)'])

export const proxy = clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth()

  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  if (userId && !orgId && !isOrgFreeRoute(req)) {
    const searchParams = new URLSearchParams({
      redirectUrl: req.url,
    })

    const orgSelectionUrl = new URL(`/org-selection?${searchParams.toString()}`, req.url)
    return NextResponse.redirect(orgSelectionUrl)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
