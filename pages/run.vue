<template>
  <div class="m-4 md:mx-auto w-full md:w-5/6 lg:w-3/4">
    <h2>Alois Sečkár - Běžecké statistiky</h2>
    <div class="text-left sm:text-justify">
      Přehled mých běžeckých výkonů. Uchovává se datum, vzdálenost, čas a&nbsp;průměrná rychlost.
      Je tu vidět kompletní historie od roku 2013, kdy jsem s&nbsp;běháním začal.
      Tato stránka je zároveň hlavní referenční implementací mého integračního modulu
      <NuxtLink to="https://www.npmjs.com/package/nuxt-neon">
        nuxt-neon
      </NuxtLink>
      poskytovaného jako volitelný DB modul v&nbsp;projektu
      <NuxtLink to="https://www.npmjs.com/package/nuxt-ignis">
        Nuxt Ignis
      </NuxtLink>
    </div>
    <div class="mb-2">
      <RunTable ref="runTable" />
    </div>
    <!-- my personal login -->
    <div v-if="useLoginStore().login">
      <RunForm @add="runTable?.updateRuns()" />
    </div>
    <div v-else>
      <div class="w-16 h-12 m-auto text-gray-800 cursor-pointer" @click="loginForm?.openDialog">
        A
      </div>
      <RunLogin ref="loginForm" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type RunLogin from '~/components/run/Login.vue'
import type RunTable from '~/components/run/Table.vue'

const loginForm = useTemplateRef<ComponentExposed<typeof RunLogin>>('loginForm')
const runTable = useTemplateRef<ComponentExposed<typeof RunTable>>('runTable')
</script>
