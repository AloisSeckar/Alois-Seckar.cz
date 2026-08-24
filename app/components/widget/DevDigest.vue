<template>
  <h3 class="text-[#e1b400] text-2xl text-center mt-6 mb-4">
    Přehledy novinek a článků
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
    <NuxtLink
      v-for="digest in digests"
      :key="digest.to"
      :to="digest.to"
      class="group bg-slate-800/50 hover:bg-slate-700/70 rounded-lg border border-slate-700 hover:border-[#e1b400]/50 transition-all duration-300 p-4 block">
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#e1b400]/20 text-[#e1b400] border border-[#e1b400]/30">
          {{ digest.type }}
        </span>
        <svg class="w-4 h-4 text-slate-400 group-hover:text-[#e1b400] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      <div class="mt-3">
        <span class="text-white group-hover:text-teal-400 transition-colors duration-200 font-medium text-sm leading-relaxed block">
          {{ digest.title }}
        </span>
        <span class="text-slate-400 text-xs text-left leading-relaxed block mt-1">
          {{ digest.dscr }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const digests = [
  {
    to: '/digest-java',
    type: 'Java',
    title: 'Java News',
    dscr: 'Co je nového v Java ekosystému',
  },
  {
    to: '/digest-nuxt',
    type: 'Nuxt',
    title: 'Nuxt News',
    dscr: 'Novinky ze světa Nuxt frameworku a Vue.js',
  },
  {
    to: '/digest-it',
    type: 'IT',
    title: 'IT Digest',
    dscr: 'Další zajímavosti a texty z IT branže',
  },
]
</script>
