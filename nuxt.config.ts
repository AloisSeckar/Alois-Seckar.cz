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
  }
})
