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

      <ArticleDigest :url="CODA_DIGEST_URL" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
const CODA_DIGEST_URL = 'https://raw.githubusercontent.com/AloisSeckar/master-coda/refs/heads/master/CodaDigest.md'

useSeoMeta({
  title: 'Coda Digest | Alois-Seckar.cz',
  description: 'Sbírka zajímavých článků a novinek ze světa IT.',
})
</script>
