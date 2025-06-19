import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  myAction: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      console.log(`hello ${input.name}`);
      return { value: 10 };
    },
  }),
};
