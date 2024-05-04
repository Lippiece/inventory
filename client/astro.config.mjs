import alpinejs from "@astrojs/alpinejs"
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import htmx from 'astro-htmx';

// https://astro.build/config
export default defineConfig({
  // base: "./",
  integrations: [
    alpinejs({
      entrypoint: "/alpine.ts",
    }),
    tailwind({
      nesting: true,
    }),
    htmx()
  ],
})

