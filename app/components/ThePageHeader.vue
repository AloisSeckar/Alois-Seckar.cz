<template>
  <header>
    <NuxtLink to="/">
      <h1>
        Alois-Seckar.cz
        <span v-if="subtitle">
          - {{ subtitle }}
        </span>
      </h1>
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  subtitle?: string
}>()
</script>
