import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import metadata from './public/oauth/client-metadata.json' with { type: 'json' }

const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 12520

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => tag.includes('-'),
      //   },
      // },
    }),
    vueDevTools(),
    // injects OAuth-related environment variables
    {
      name: 'oauth',
      config(_conf, { command }) {
        if (command === 'build') {
          process.env.VITE_OAUTH_CLIENT_ID = metadata.client_id
          process.env.VITE_OAUTH_REDIRECT_URI = metadata.redirect_uris[0]
        } else {
          const redirectUri = (() => {
            const url = new URL(metadata.redirect_uris[0])
            return `http://${SERVER_HOST}:${SERVER_PORT}${url.pathname}`
          })()

          const clientId =
            `http://localhost` +
            `?redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(metadata.scope)}`

          process.env.VITE_DEV_SERVER_PORT = '' + SERVER_PORT
          process.env.VITE_OAUTH_CLIENT_ID = clientId
          process.env.VITE_OAUTH_REDIRECT_URI = redirectUri
        }

        // process.env.VITE_CLIENT_URI = metadata.client_uri
        process.env.VITE_OAUTH_SCOPE = metadata.scope
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: SERVER_HOST,
    port: SERVER_PORT,
  },
})
