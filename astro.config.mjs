import path from "node:path";
import db from "@astrojs/db";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), react()],

  server: {
    allowedHosts: true,
    host: true,
    port: 80,
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});
