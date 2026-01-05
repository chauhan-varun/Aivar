import { mutation, query } from "./_generated/server.js";
export const getMany = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const ad = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity == null) throw new Error("Unauthorized");

    const ordId = identity.orgId as string;

    if (!ordId) throw new Error("Organization ID is required");

    return await ctx.db.insert("users", { name: "Alice" });
  },
});
