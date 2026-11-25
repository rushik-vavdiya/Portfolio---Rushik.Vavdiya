
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { env } from 'node:process'

function optimizePublicImages() {
  return {
    name: 'optimize-public-images',
    async buildStart() {
      const sourceDir = path.resolve('public/TechIcons/optimized')
      const outputDir = path.resolve('public/TechIcons/optimized')

      await mkdir(outputDir, { recursive: true })
      const files = await readdir(sourceDir)

      await Promise.all(
        files.filter((file) => /\.png$/i.test(file)).map(async (file) => {
          const output = path.join(
            outputDir,
            file.replace(/\.png$/i, '.webp')
          )

          await sharp(path.join(sourceDir, file))
            .resize({
              width: 192,
              height: 192,
              fit: 'inside',
              withoutEnlargement: true,
            })
            .webp({ quality: 82, effort: 5 })
            .toFile(output)
        })
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) =>
        url.pathname.includes('/src/assets/')
          ? new URLSearchParams('format=webp&quality=82')
          : new URLSearchParams(),
    }),
    optimizePublicImages(),
  ],

  // Allow access from ngrok
server: {
  host: '0.0.0.0',
  proxy: {
    '/api': {
      target: env.VITE_API_PROXY_TARGET || 'http://localhost:5000',
      changeOrigin: true,
    },
  },
  allowedHosts: [
    'jaydon-unreproachful-straight.ngrok-free.dev'
  ],
},

  build: {
    modulePreload: { polyfill: false },
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id))
            return 'react-vendor'
          if (/node_modules\/(react-router|react-router-dom)\//.test(id))
            return 'router-vendor'
          if (/node_modules\/gsap\//.test(id))
            return 'animation-vendor'
          if (/node_modules\/swiper\//.test(id))
            return 'swiper-vendor'
        },
      },
    },
  },
})
