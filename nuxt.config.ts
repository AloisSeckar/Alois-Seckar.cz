export default defineNuxtConfig({

  compatibilityDate: '2024-09-01',

  devtools: {
    enabled: false,
  },

  css: [
    '@/assets/as.css',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-neon',
    'nuxt-security',
  ],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  security: {
    corsHandler: {
      origin: '*',
    },
  },

})
