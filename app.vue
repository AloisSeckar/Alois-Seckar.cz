<template>
  <div>
    <img src="/as.webp" />
    <h1>Alois Sečkár</h1>
    <p>Programátor / Běžec / Politik</p>
    <p>&copy; 2022</p>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Alois-seckar.cz",
  bodyAttrs: {
    style: 'background-color: #009682;'
  }
})
</script>

<style scoped>
@font-face {
  font-family: kaushan;
  src: url('~/assets/KaushanScript-AS.woff2');
}

div {
  text-align: center;
  color: white;
  padding-top: 10%;
}

img {
  border-radius: 50%;
  height: 200px;
}

h1 {
  font-family: kaushan, cursive;
  font-size: 50px;
}
</style>