<template>
  <div>
    <ThePageHeader subtitle="Nuxt News" />
    <div id="content" class="content-pane">
      <p class="text-left sm:text-justify my-4">
        Sbírka zajímavých článků a&nbsp;aktuálních novinek ze světa frameworku Nuxt a&nbsp;Vue.js spravovaná v&nbsp;repozitáři
        <NuxtLink to="https://github.com/AloisSeckar/demos-nuxt" class="inline-block">
          AloisSeckar/demos-nuxt
        </NuxtLink>.
        Další položky se načítají postupně při scrollování dolů.
      </p>

      <ArticleDigest source="nuxt" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt News | Alois-Seckar.cz',
  description: 'Sbírka zajímavých článků a novinek ze světa frameworku Nuxt a Vue.js.',
})
</script>
