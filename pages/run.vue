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
      <RunTable
        ref="runTable" :rows :status
        @delete="refresh()" @list="$e => page = $e"
      />
    </div>
    <!-- my personal login -->
    <div v-if="useLoginStore().login">
      <RunForm @add="refresh()" />
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

const { neonClient } = useNeon()
const { data, status, refresh } = await useAsyncData(() => neonClient`SELECT r.id as rId, r.date as rDate, t.id as tId, t.name as tName, t.dscr as tDscr, t.length as tLength, t.map_link as tMapLink, r.dscr as rDscr, r.length as rLength, r.time as rTime, r.speed as rSpeed FROM elrh_run_records r JOIN elrh_run_tracks t ON r.track = t.id ORDER BY r.date DESC`)

const page: Ref<number> = ref(1)
const rows: ComputedRef<RunRecord[]> = computed(() => {
  if (data.value) {
    const pageCount = data.value?.length ? data.value.length / 50 + 1 : 0
    return data.value.slice((page.value - 1) * pageCount, (page.value) * pageCount) as RunRecord[]
  } else {
    return [] as RunRecord[]
  }
})
</script>
