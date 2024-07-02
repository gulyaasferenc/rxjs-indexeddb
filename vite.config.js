import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      name: 'rxjs-indexeddb',
      // the proper extensions will be added
      fileName: 'rxjs-indexeddb',
    },
    rollupOptions: {
      external: ['rxjs'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          rxjs: 'rxjs',
        },
      },
    },
  },
})
