<template>
  <h3 class="text-[#e1b400] text-2xl text-center mt-6 mb-4">
    Dokumenty
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
    <div
      v-for="doc in documents"
      :key="doc.id"
      class="group bg-slate-800/50 hover:bg-slate-700/70 rounded-lg border border-slate-700 hover:border-[#e1b400]/50 transition-all duration-300 p-4">
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#e1b400]/20 text-[#e1b400] border border-[#e1b400]/30">
          {{ doc.type }}
        </span>
        <svg class="w-4 h-4 text-slate-400 group-hover:text-[#e1b400] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="mt-3">
        <NuxtLink
          :to="`/pdf/${doc.id}.pdf`"
          external
          no-prefetch
          class="text-white hover:text-teal-400 transition-colors duration-200 font-medium text-sm leading-relaxed block">
          {{ doc.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const documents = [
  {
    id: 'CV',
    type: 'CV',
    title: 'ŽIVOTOPIS',
  },
  {
    id: 'as-java-ocp-8',
    type: 'Certifikace',
    title: 'Java 8 OCP',
  },
  {
    id: 'as-vuejs-dev',
    type: 'Certifikace',
    title: 'Vue.js Developer Level I',
  },
  {
    id: 'as-mastering-nuxt',
    type: 'Certifikace',
    title: 'Certified Nuxt Master',
  },
  {
    id: 'as-mastering-pinia',
    type: 'Certifikace',
    title: 'Certified Pinia Master',
  },
  {
    id: 'as-vuejs-master-class',
    type: 'Kurz',
    title: 'Vue.js Master class',
  },
  {
    id: 'as-es6-gopas',
    type: 'Kurz',
    title: 'Pokročilé techniky ES6 (Gopas)',
  },
  {
    id: 'as-rust',
    type: 'Kurz',
    title: 'Rust pro začátečníky (CZ.NIC)',
  },
]
</script>
