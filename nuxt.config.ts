export default defineNuxtConfig({
  extends: [
    'nuxt-ignis'
  ],

  devtools: {
    enabled: false,
  },

  css: [
    '@/assets/as.css',
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