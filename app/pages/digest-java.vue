<template>
  <div>
    <ThePageHeader subtitle="Java News" />
    <div id="content" class="content-pane">
      <p class="text-left sm:text-justify my-4">
        Sbírka zajímavých článků a&nbsp;aktuálních novinek ze světa Javy spravovaná v&nbsp;repozitáři <NuxtLink to="https://github.com/AloisSeckar/demos-java" class="inline-block">AloisSeckar/demos-java</NuxtLink>. Přečíst si můžete i&nbsp;moje <NuxtLink to="/digest-nuxt" class="inline-block">Nuxt News</NuxtLink> a&nbsp;<NuxtLink to="/digest-it" class="inline-block">IT Digest</NuxtLink>.
      </p>

      <ArticleDigest source="java" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Java News | Alois-Seckar.cz',
  description: 'Sbírka zajímavých článků a novinek ze světa Javy.',
})
</script>
