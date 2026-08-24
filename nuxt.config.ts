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
    plugins: [
      // mitigate https://github.com/AloisSeckar/nuxt-ignis/issues/142
      // TODO remove when upstream fix available in nuxt-ignis
      {
        name: 'stub-vueform-types-dts',
        enforce: 'pre',
        resolveId(id: string) {
          return id.replace(/\\/g, '/').endsWith('@vueform/vueform/types/index.d.ts')
            ? '\0stub-vueform-types-dts'
            : null
        },
        load(id: string) {
          return id === '\0stub-vueform-types-dts' ? 'export {}' : null
        },
      },
    ],
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
        // 'https:' required to display article og:meta thumbnails
        'img-src': ['\'self\'', 'data:', 'https:'],
      },
    },
  },
})
