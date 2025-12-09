<template>
  <h3 class="text-[#e1b400] text-2xl text-center mt-8 mb-2">Moje články na dev.to</h3>
  <div class="h-[300px] mb-4 overflow-auto">
    <dev-to 
      id="dev" author="aloisseckar" theme="classic" 
      itemsperpage="5" links="external"
      lang="cs" i18n='{"cs":{"more":"Další články"}}'
      style="width: 100%; margin-top: 20px; background-color: rgb(15, 23, 42);" />
  </div>
</template>
        
<script setup lang="ts">
onMounted(async () => {
  await import('@browser.style/dev-to')
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