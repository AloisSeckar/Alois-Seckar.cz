export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],

  devtools: {
    enabled: false,
  },

  css: [
    '@/assets/as.css',
  ],

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

  /*
  security: {
    corsHandler: {
      origin: '*',
    },
  },
  */

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('dev-to'),
    },
  }
})
