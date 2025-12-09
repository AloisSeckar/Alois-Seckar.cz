<template>
  <h3 class="text-[#e1b400] text-2xl text-center mt-6 mb-2">
    Moje články na dev.to
  </h3>
  <div class="h-[300px] mb-4 overflow-auto">
    <ClientOnly>
      <dev-to
        v-if="isLoaded"
        id="dev" author="aloisseckar" theme="classic"
        itemsperpage="5" links="external"
        lang="cs" i18n="{&quot;cs&quot;:{&quot;more&quot;:&quot;Další články&quot;}}"
        style="width: 100%; margin-top: 20px; background-color: rgb(15, 23, 42);" />
      <div v-else class="text-slate-400 text-center py-8">
        Načítání článků...
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const isLoaded = ref(false)

onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100))
    await import('./devto.js')
    await customElements.whenDefined('dev-to')
    isLoaded.value = true
  } catch (error) {
    console.error('Failed to load dev-to component:', error)
  }
})
</script>

<style lang="css">
#dev::part(list) {
  margin-top: 0;
  margin-bottom: 10px;
  background-color: rgb(15, 23, 42);
  color: white;
}
#dev::part(more) {
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 9px;
  border: 1px solid black;
}
#dev::part(more):hover {
  background-color: rgb(225, 180, 0);
}
</style>
