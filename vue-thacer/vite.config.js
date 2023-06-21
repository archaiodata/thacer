import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let config = {
    build: {
      sourcemap: true
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }

  if (command === 'serve') {
    // In dev environment, we use a proxy to avoid cors errors :
    config.server = {
      proxy: {
        '/proxys_replacement_key_for_api_path_in_dev': {
          target: 'https://thacer.archaiodata.com/API/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/proxys_replacement_key_for_api_path_in_dev/, '')
        },
        cors: false
      }
    }
  }

  return config
})
