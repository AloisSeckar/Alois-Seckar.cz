<template>
  <div>
    <ThePageHeader subtitle="Nuxt News" />
    <div id="content" class="content-pane">
      <p class="text-left sm:text-justify my-4">
        Sbírka zajímavých článků a&nbsp;novinek ze světa frameworku Nuxt a&nbsp;Vue.js spravovaná v&nbsp;repozitáři <NuxtLink to="https://github.com/AloisSeckar/demos-nuxt" class="inline-block">AloisSeckar/demos-nuxt</NuxtLink>. Přečíst si můžete i&nbsp;moje <NuxtLink to="/digest-java" class="inline-block">Java News</NuxtLink> a&nbsp;<NuxtLink to="/digest-it" class="inline-block">IT Digest</NuxtLink>.
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
