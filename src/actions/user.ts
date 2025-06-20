import { defineAction } from "astro:actions";
import { db, User } from "astro:db";
import { z } from "astro:schema";

export const user = {
  create: defineAction({
    handler: async (input) => {
      await db.insert(User).values({ name: input.name });
    },
    input: z.object({
      name: z.string(),
    }),
  }),
  getAll: defineAction({
    handler: async () => {
      const data = await db.select().from(User);
      return data;
    },
  }),
};
