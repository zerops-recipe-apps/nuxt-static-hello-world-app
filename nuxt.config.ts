import { readFileSync } from 'node:fs'

// Read Nuxt's own version to display in the UI.
const { version } = JSON.parse(
  readFileSync('./node_modules/nuxt/package.json', 'utf-8')
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  appConfig: {
    // Nuxt version baked into static output at generate time.
    nuxtVersion: version,
  },

  runtimeConfig: {
    public: {
      // Default value — overridden by NUXT_PUBLIC_APP_ENV at build time.
      // Set in zerops.yaml build.envVariables per environment.
      appEnv: 'development',
    },
  },
})
