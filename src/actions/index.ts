import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, SensorData } from "astro:db";

export const server = {
  myAction: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      const data = await db.select().from(SensorData);

      return { data };
    },
  }),
};
