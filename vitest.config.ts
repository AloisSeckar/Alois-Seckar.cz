import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
// import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [{
      test: {
        name: 'e2e',
        include: ['test/*.{test,spec}.ts'],
        environment: 'node',
        environmentOptions: {
          nuxt: {
            rootDir: fileURLToPath(new URL('.', import.meta.url)),
            domEnvironment: 'happy-dom',
          },
        },
      },
    }],
  },
})
