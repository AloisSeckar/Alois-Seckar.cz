export default defineNuxtConfig({
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
