<template>
  <div>
    <ThePageHeader subtitle="Java News" />
    <div id="content" class="content-pane">
      <p class="text-left sm:text-justify my-4">
        Sbírka zajímavých článků a&nbsp;aktuálních novinek ze světa Javy spravovaná
        v&nbsp;repozitáři
        <NuxtLink to="https://github.com/AloisSeckar/demos-java" class="inline-block">
          AloisSeckar/demos-java
        </NuxtLink>.
        Další položky se načítají postupně při scrollování dolů.
      </p>

      <ArticleDigest :url="JAVA_NEWS_URL" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
const JAVA_NEWS_URL = 'https://raw.githubusercontent.com/AloisSeckar/demos-java/refs/heads/master/JavaNews.md'

useSeoMeta({
  title: 'Java News | Alois-Seckar.cz',
  description: 'Sbírka zajímavých článků a novinek ze světa Javy.',
})
</script>
