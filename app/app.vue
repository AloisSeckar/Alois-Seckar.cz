<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { name: 'description', content: 'Personal page of Alois Sečkár, Prague, Czechia' },
  ],
})
useSeoMeta({
  title: 'Alois-Seckar.cz',
  description: 'Alois Sečkár - portfolio',
  ogType: 'website',
  ogUrl: 'https://alois-seckar.cz/',
  ogTitle: 'Alois-Seckar.cz',
  ogDescription: 'Alois Sečkár - portfolio',
  ogImage: 'https://master-coda.cz/alois-seckar-cz.jpg',
  twitterCard: 'summary_large_image',
})
</script>
