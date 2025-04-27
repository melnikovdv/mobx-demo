import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import observerPlugin from "mobx-react-observer/swc-plugin"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        observerPlugin()
      ]
    }),
    tailwindcss()
  ]
})
