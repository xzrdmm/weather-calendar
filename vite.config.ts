import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import fixHtmlPlugin from './fix-html-plugin.mjs'

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), fixHtmlPlugin()],
  base: './',
})
