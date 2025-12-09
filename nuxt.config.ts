export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],

  devtools: {
    enabled: false,
  },

  // solution for 'adoptedStyleSheets' issue on Netlify
  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/construct-style-sheets-polyfill',
          defer: true,
        },
      ],
    },
  },

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
