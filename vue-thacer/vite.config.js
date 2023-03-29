import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  let config = {
    build: {
      sourcemap: true
    },
    plugins: [
      vue(),
      sentryVitePlugin({
        org: 'archaiodata',
        project: 'thacer',
        include: './dist',
        authToken: env.SENTRY_AUTH_TOKEN,
        release: env.RELEASE
      })
    ],
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
          target: 'http://thacer.archaiodata.com/API/',
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