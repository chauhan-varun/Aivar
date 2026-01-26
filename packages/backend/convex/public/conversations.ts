import { mutation, query } from '../_generated/server'
import { ConvexError, v } from 'convex/values'

export const getOne = query({
  args: {
    conversationId: v.id('conversations'),
    contactSessionId: v.id('contactSessions'),
  },
  handler: async (ctx, args) => {
    if (!args.contactSessionId) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Contact session ID is required',
      })
    }
    const conversation = await ctx.db.get(args.conversationId)

    if (!conversation) return null

    return {
      _id: conversation._id,
      threadId: conversation.threadId,
      status: conversation.status,
    }
  },
})

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id('contactSessions'),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId)

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Contact session is invalid or has expired',
      })
    }

    // TODO: change the threadId with one functional for the app
    const conversationId = await ctx.db.insert('conversations', {
      threadId: crypto.randomUUID(),
      organizationId: args.organizationId,
      contactSessionId: session._id,
      status: 'unresolved',
    })

    return conversationId
  },
})
