import { mutation } from '../_generated/server.js'
import { v } from 'convex/values'

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.string()),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenresolution: v.optional(v.string()),
        viewportSize: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timeoffset: v.optional(v.number()),
        cookieEnabled: v.optional(v.boolean()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const expiresAt = now + SESSION_DURATION_MS
    const id = await ctx.db.insert('contactSessions', {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      expiresAt,
      metadata: args.metadata,
    })
    return id
  },
})

export const validate = mutation({
  args: {
    contactSessionId: v.id('contactSessions'),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId)
    if (!contactSession) {
      return { valid: false, reason: 'contact session not found' }
    }

    if (contactSession.expiresAt <= Date.now()) {
      return { valid: false, reason: 'contact session expired' }
    }
    return { valid: true, contactSession }
  },
})
