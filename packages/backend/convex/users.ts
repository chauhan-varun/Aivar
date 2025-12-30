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
    return await ctx.db.insert("users", { name: "Alice" });
  },
});
