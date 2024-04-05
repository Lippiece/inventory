import alpinejs from "@astrojs/alpinejs"
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  // base: "./",
  integrations: [
    alpinejs({ entrypoint: "./alpine" }),
    tailwind({
      nesting: true,
    }),
  ],
})
