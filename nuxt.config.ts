import { readFileSync } from 'node:fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  appConfig: {
    // Baked into static output at generate time from package.json.
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
