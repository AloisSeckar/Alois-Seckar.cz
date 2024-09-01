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
