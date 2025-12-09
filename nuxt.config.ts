export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],

  css: [
    '@/assets/as.css',
  ],

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('dev-to'),
    },
  },

  runtimeConfig: {
    public: {
      key: 'a',
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
