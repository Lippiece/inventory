import alpinejs from "@astrojs/alpinejs"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  base: "/inventory",
  integrations: [alpinejs({ entrypoint: "./alpine" })],
})
