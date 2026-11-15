<template>
  <div>
    <ThePageHeader subtitle="AI News" />
    <div id="content" class="content-pane">
      <p class="text-left sm:text-justify my-4">
        Sbírka zajímavých článků a&nbsp;novinek ze světa umělé inteligence spravovaná v&nbsp;repozitáři <NuxtLink to="https://github.com/AloisSeckar/master-coda" class="inline-block">AloisSeckar/master-coda</NuxtLink>. Přečíst si můžete i&nbsp;moje <NuxtLink to="/digest-java" class="inline-block">Java News</NuxtLink>, <NuxtLink to="/digest-nuxt" class="inline-block">Nuxt News</NuxtLink> a&nbsp;<NuxtLink to="/digest-it" class="inline-block">IT Digest</NuxtLink>.
      </p>

      <ArticleDigest source="ai" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'AI News | Alois-Seckar.cz',
  description: 'Sbírka zajímavých článků a novinek ze světa umělé inteligence.',
})
</script>
