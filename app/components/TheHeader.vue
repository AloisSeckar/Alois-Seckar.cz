<template>
  <div class="header">
    <div class="header-content">
      <NuxtImg
        class="logo mx-auto mb-12" src="/as.webp" preload
        fetch-priority="high" width="200" height="200"
        title="Alois Sečkár" alt="Profile photo of Alois Sečkár" />
      <h1>Alois Sečkár</h1>
      <p class="mb-4">
        Programátor / Sportovec / Krčský patriot
      </p>
      <div class="social flex flex-row justify-center mt-2">
        <NuxtLink to="mailto:alois.seckar@gmail.com">
          <NuxtImg
            class="social" src="/em.png" alt="Email ikona"
            title="E-mail" preload />
        </NuxtLink>
        <NuxtLink to="https://www.facebook.com/alois.seckar">
          <NuxtImg
            class="social" src="/fb.png" alt="Facebook logo"
            title="Facebook" preload />
        </NuxtLink>
        <NuxtLink to="https://bsky.app/profile/alois-seckar.cz">
          <NuxtImg
            class="social" src="/bs.png" alt="Bluesky logo"
            title="Bluesky" preload />
        </NuxtLink>
        <NuxtLink to="https://github.com/AloisSeckar">
          <NuxtImg
            class="social" src="/gh.png" alt="GitHub logo"
            title="GitHub" preload />
        </NuxtLink>
        <NuxtLink to="https://dev.to/aloisseckar">
          <NuxtImg
            class="social" src="/dev.png" alt="DEV logo"
            title="DEV" preload />
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/alois-seckar/">
          <NuxtImg
            class="social" src="/ln.png" alt="LinkedIn logo"
            title="LinkedIn" preload />
        </NuxtLink>
      </div>
      <NuxtLink to="#content" class="mx-auto">
        <NuxtImg
          class="more mx-auto" src="/arrow.webp" alt="Více informací"
          title="Více info... " preload />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'KaushanScript-AS';
  src: url('~/assets/KaushanScript-AS.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

h1 {
  font-family: 'KaushanScript-AS', cursive;
}
</style>
