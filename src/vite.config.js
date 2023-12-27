import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/v2fe-eindopdracht-v2c_team_stan/',
  build: {
    lib: {
      entry: 'app.module.js',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
