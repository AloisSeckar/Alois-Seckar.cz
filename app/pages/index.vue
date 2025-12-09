<template>
  <div>
    <TheHeader />
    <div id="content" class="content-pane">
      <section class="content-block">
        <h2>Programátor</h2>
        <p class="text-left sm:text-justify mb-2">
          Vystudoval jsem informatiku na VŠE v&nbsp;Praze. Věnuju se převážně světu Java programování +
          vývoji webů pomocí JavaScriptu (framework Nuxt nad Vue.js). Zajímá mě taky cloud-native vývoj,
          DevOps a&nbsp;moderní trendy obecně.
        </p>
        <div class="center">
          <NuxtLink to="https://github.com/AloisSeckar">
            <NuxtImg src="/github.webp" alt="GitHub - moje zdrojové kódy" title="GitHub - moje zdrojové kódy" loading="lazy" />
          </NuxtLink>
          <NuxtLink to="https://master-coda.cz/">
            <NuxtImg src="/coda.webp" alt="Master Coda - nepravidelný blog o programování" title="Master Coda - nepravidelný blog o programování" loading="lazy" />
          </NuxtLink>
          <NuxtLink to="https://github.com/AloisSeckar/nuxt-ignis">
            <NuxtImg src="/ignis.webp" alt="Nuxt Ignis - template starter pro Nuxt" title="Nuxt Ignis - template starter pro Nuxt" loading="lazy" />
          </NuxtLink>
          <NuxtLink to="https://elven-ipsum.netlify.app/">
            <NuxtImg src="/ipsum.webp" alt="Elven Ipsum - generátor lorem ipsum v Elfštině" title="Elven Ipsum - generátor lorem ipsum v Elfštině" loading="lazy" />
          </NuxtLink>
        </div>
        <WidgetDevDocuments />
        <WidgetDevTo />
      </section>
      <section class="content-block">
        <h2>Sportovec</h2>
        <p class="text-left sm:text-justify mb-2">
          Rád chodím běhat a&nbsp;jsem členem
          <NuxtLink to="http://tjsokolprahakrc.cz/">TJ Sokol Praha-Krč</NuxtLink>,
          kde od roku 2019 vedu oddíl rekreačního běhu. Zde se můžete podívat na kompletní
          <NuxtLink to="/run">přehled mých běžeckých výkonů</NuxtLink>.
          Kromě toho rád hraju softbal, aktuálně za klub
          <NuxtLink to="https://www.facebook.com/pikespraha">Pikes Praha</NuxtLink>.
        </p>
        <p class="text-left sm:text-justify mb-2">
          Věnuju se také zapisování softballu a&nbsp;baseballu. Od roku 2009 pravidelně jezdím zapisovat mezinárodní
          turnaje. v&nbsp;ČR pomáhám udržovat a&nbsp;rozvíjet systém zapisovatelů a&nbsp;přes zimu školit nové.
        </p>
        <p class="text-left sm:text-justify mb-2">
          Na pomoc s&nbsp;výukou jsem vytvořil nástroj na vizualizaci systému zápisu organizace WBSC:
        </p>
        <div class="center">
          <NuxtLink to="https://wbsc-scoring.netlify.app/">
            <NuxtImg src="/wbsc.webp" alt="WBSC Scoring Creator - aplikace pro zapisovatele" title="WBSC Scoring Creator - aplikace pro zapisovatele" loading="lazy" />
          </NuxtLink>
        </div>
      </section>
      <section class="content-block">
        <h2>Krčský patriot</h2>
        <p class="text-left sm:text-justify mb-2">
          S tátou provozujeme web 'Stará Krč' o&nbsp;historii naší městské části Praha-Krč. Troufnu si tvrdit,
          že ucelenější sbírku informací a&nbsp;fotografií nikdo jiný nemá. Pracujeme na tom, aby naše poznatky
          mohly jednou vyjít i&nbsp;v&nbsp;tištěné podobě.
        </p>
        <p class="center">
          <NuxtLink to="http://krc-historie.cz/">
            <NuxtImg src="/krc.webp" alt="Stará Krč - historie městské části Praha-Krč" title="Stará Krč - historie městské části Praha-Krč" loading="lazy" />
          </NuxtLink>
        </p>
      </section>
      <section class="content-block">
        <div class="center">
          <h2>Ostatní</h2>
          <p class="mb-2">
            Aktuality a zajímavosti z Prahy 4 -
            <NuxtLink to="https://www.facebook.com/praha4zive">
              Praha 4 Živě
            </NuxtLink>
          </p>
          <div>Fotografie a pokusy o ně:</div>
          <NuxtLink to="https://www.deviantart.com/ellrohir">
            <NuxtImg src="/deviantart.webp" alt="DeviantArt - moje fotografické pokusy" title="DeviantArt - accidental photography" loading="lazy" />
          </NuxtLink>
          <NuxtLink to="https://www.instagram.com/alois.seckar/">
            <NuxtImg src="/instagram.webp" alt="Instagram - moje fotografické pokusy" title="Instagram - accidental photography" loading="lazy" />
          </NuxtLink>
        </div>
      </section>
    </div>
    <TheFooter />
  </div>
</template>
