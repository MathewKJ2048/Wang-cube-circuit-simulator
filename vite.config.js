import { defineConfig } from 'vite'
// import eleventy from '@11ty/11ty-plugin-vite'

export default defineConfig({
	base: "./", // used to ensure the github page loads properly
	build: {
	  outDir: 'dist',
	  assetsInlineLimit: 0 // avoids inlining svg, for dynamic button changes
	}
  })

