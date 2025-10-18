<template>
  <div class="header">
    <div class="header-content">
      <NuxtImg
        class="logo mx-auto mb-12" src="/as.webp"
        title="Alois Sečkár" alt="Profile photo of Alois Sečkár"
        fetchpriority="high" />
      <h1>Alois Sečkár</h1>
      <p class="mb-4">
        Programátor / Sportovec / Krčský patriot
      </p>
      <div class="social flex flex-row justify-center mt-2">
        <NuxtLink to="mailto:alois.seckar@gmail.com">
          <NuxtImg class="social" src="/em.png" alt="Email ikona" title="E-mail" />
        </NuxtLink>
        <NuxtLink to="https://www.facebook.com/alois.seckar">
          <NuxtImg class="social" src="/fb.png" alt="Facebook logo" title="Facebook" />
        </NuxtLink>
        <NuxtLink to="https://bsky.app/profile/alois-seckar.cz">
          <NuxtImg class="social" src="/bs.png" alt="Bluesky logo" title="Bluesky" />
        </NuxtLink>
        <NuxtLink to="https://github.com/AloisSeckar">
          <NuxtImg class="social" src="/gh.png" alt="GitHub logo" title="GitHub" />
        </NuxtLink>
        <NuxtLink to="https://dev.to/aloisseckar">
          <NuxtImg class="social" src="/dev.png" alt="DEV logo" title="DEV" />
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/alois-seckar/">
          <NuxtImg class="social" src="/ln.png" alt="LinkedIn logo" title="LinkedIn" />
        </NuxtLink>
      </div>
      <NuxtLink to="#content" class="mx-auto">
        <NuxtImg class="more mx-auto" src="/arrow.webp" alt="Více informací" title="Více info..." />
      </NuxtLink>
    </div>
  </div>
</template>
