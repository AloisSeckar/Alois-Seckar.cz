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
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
    public: {
      key: 0,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
