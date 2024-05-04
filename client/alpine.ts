import type { Alpine } from "alpinejs"
import mask from "@alpinejs/mask@3.13.10"

export default (Alpine: Alpine) => {
  Alpine.plugin(mask)
}
