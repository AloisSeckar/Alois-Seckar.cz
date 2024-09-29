<template>
  <div class="header">
    <div class="header-content">
      <img class="logo mx-auto mb-12" src="/as.webp" alt="Face of Alois Sečkár" title="Alois Sečkár">
      <h1>Alois Sečkár</h1>
      <p>Programátor / Sportovec / Krčský patriot</p>
      <div class="social flex flex-row justify-center mt-2">
        <NuxtLink to="mailto:alois.seckar@gmail.com">
          <img class="social" src="/em.webp" alt="Email ikona" title="E-mail">
        </NuxtLink>
        <NuxtLink to="https://www.facebook.com/alois.seckar">
          <img class="social" src="/fb.webp" alt="Facebook logo" title="Facebook">
        </NuxtLink>
        <NuxtLink to="https://github.com/AloisSeckar">
          <img class="social" src="/gh.webp" alt="GitHub logo" title="GitHub">
        </NuxtLink>
        <NuxtLink to="https://dev.to/aloisseckar">
          <img class="social" src="/dev.webp" alt="DEV logo" title="DEV">
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/alois-seckar/">
          <img class="social" src="/ln.webp" alt="LinkedIn logo" title="LinkedIn">
        </NuxtLink>
      </div>
      <NuxtLink to="#content" class="mx-auto">
        <img class="more mx-auto" src="/arrow.webp" alt="Více informací" title="Více info...">
      </NuxtLink>
    </div>
  </div>
</template>
