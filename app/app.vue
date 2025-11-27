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
  applicationName: 'Alois-Seckar.cz',
  description: 'Alois Sečkár - portfolio',
  creator: 'Alois Sečkár',
  ogType: 'website',
  ogUrl: 'https://alois-seckar.cz/',
  ogTitle: 'Alois-Seckar.cz',
  ogSiteName: 'Alois-Seckar.cz',
  ogDescription: 'Alois Sečkár - portfolio',
  ogImage: 'https://alois-seckar.cz/alois-seckar-cz.jpg',
  ogImageAlt: 'Alois Sečkár - website image',
  ogImageType: 'image/jpeg',
  ogImageWidth: '1000',
  ogImageHeight: '525',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Alois-Seckar.cz',
  twitterDescription: 'Alois Sečkár - portfolio',
  twitterImage: 'https://alois-seckar.cz/alois-seckar-cz.jpg',
  twitterImageAlt: 'Alois Sečkár - website image',
  twitterImageType: 'image/jpeg',
  twitterImageWidth: '1000',
  twitterImageHeight: '525',
})
</script>
