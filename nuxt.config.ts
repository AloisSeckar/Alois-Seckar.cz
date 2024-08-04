export default defineNuxtConfig({
  
  compatibilityDate: '2024-08-04',

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