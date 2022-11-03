<template>
  <div>
    <img class="logo" src="/as.webp" alt="AS" title="Alois Sečkár" />
    <h1>Alois Sečkár</h1>
    <p>Programátor / Běžec / Patriot</p>
    <a href="https://www.facebook.com/alois.seckar"><img class="social" src="/fb.webp" alt="FB" title="Facebook" /></a>
    <a href="https://www.instagram.com/alois.seckar/"><img class="social" src="/ig.webp" alt="IG" title="Instagram" /></a>
    <a href="https://twitter.com/AloisSeckar/"><img class="social" src="/tw.webp" alt="TW" title="Twitter" /></a>
    <a href="https://www.linkedin.com/in/alois-/"><img class="social" src="/ln.webp" alt="LN" title="LinkedIn" /></a>
    <div id="footer">
      <hr />
      <p><strong>&copy; 2022 Alois Sečkár</strong> | <a href="https://www.vecteezy.com/free-vector/social-media">Social Media Vectors by Vecteezy</a></p>
    </div>  
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
  padding-top: 5%;
}

img.logo {
  border-radius: 50%;
  height: 200px;
}

img.social {
  height: 32px;
  margin: 4px;
}

h1 {
  font-family: kaushan, cursive;
  font-size: 50px;
}

a:link, a:hover, a:active, a:visited {
  color: white;
}

#footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

</style>