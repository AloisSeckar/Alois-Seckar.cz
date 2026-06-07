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

  vite: {
    optimizeDeps: {
      include: [
        '@tanstack/vue-table',
      ],
    },
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
    headers: {
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'data:', 'https://media2.dev.to'],
      },
    },
  },
})
