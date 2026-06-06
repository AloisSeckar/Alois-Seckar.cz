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
    key: 0,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  ignis: {
    config: {
      html: {
        title: 'Alois-Seckar.cz',
        lang: 'cs',
      },
    },
    preset: {
      ui: 'nuxt-ui',
      db: 'neon',
      forms: 'vueform',
    },
  },

  security: {
    // disabled because of resolution issues on Netlify
    // TODO remove once h3 v2 is usede everywhere
    corsHandler: false,
    //
    headers: {
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'data:', 'https://media2.dev.to'],
      },
    },
  },
})
