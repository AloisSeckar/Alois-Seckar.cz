<template>
  <div>
    <ThePageHeader subtitle="IT Digest" />
    <div id="content" class="content-pane">
      <p class="text-left sm:text-justify my-4">
        Sbírka zajímavých článků a&nbsp;aktuálních novinek ze světa IT spravovaná v&nbsp;repozitáři
        <NuxtLink to="https://github.com/AloisSeckar/master-coda" class="inline-block">
          AloisSeckar/master-coda
        </NuxtLink>.
        Další položky se načítají postupně při scrollování dolů.
      </p>

      <ArticleDigest source="coda" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Coda Digest | Alois-Seckar.cz',
  description: 'Sbírka zajímavých článků a novinek ze světa IT.',
})
</script>
