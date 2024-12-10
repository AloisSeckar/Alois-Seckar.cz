<template>
  <div>
    <TheHeader />
    <div id="content" class="content-pane">
      <div class="content-block">
        <h2>Programátor</h2>
        <p>
          Vystudoval jsem informatiku na VŠE v&nbsp;Praze. Věnuju se převážně světu Java programování +
          vývoji webů pomocí JavaScriptu (framework Nuxt nad Vue.js). Zajímá mě taky cloud-native vývoj,
          DevOps a&nbsp;moderní trendy obecně.
        </p>
        <div class="center">
          <NuxtLink to="https://github.com/AloisSeckar">
            <img src="/github.webp" alt="GitHub - moje zdrojové kódy" title="GitHub - moje zdrojové kódy">
          </NuxtLink>
          <NuxtLink to="https://master-coda.cz/">
            <img src="/coda.webp" alt="Master Coda - nepravidelný blog o programování" title="Master Coda - nepravidelný blog o programování">
          </NuxtLink>
          <NuxtLink to="https://elven-ipsum.netlify.app/">
            <img src="/ipsum.webp" alt="Elven Ipsum - generátor lorem ipsum v Elfštině" title="Elven Ipsum - generátor lorem ipsum v Elfštině">
          </NuxtLink>
          <h3>Dokumenty</h3>
          <ul class="doc-list">
            <li>
              <NuxtLink to="/pdf/CV.pdf" external no-prefetch>
                ŽIVOTOPIS
              </NuxtLink>
            </li>
            <li>
              Certifikace -
              <NuxtLink to="/pdf/as-java-ocp-8.pdf" external no-prefetch>
                Java 8 OCP
              </NuxtLink>
            </li>
            <li>
              Certifikace -
              <NuxtLink to="/pdf/as-vuejs-dev.pdf" external no-prefetch>
                Vue.js Developer Level I
              </NuxtLink>
            </li>
            <li>
              Kurz -
              <NuxtLink to="/pdf/as-vuejs-master-class.pdf" external no-prefetch>
                Vue.js Master class
              </NuxtLink>
            </li>
            <li>
              Kurz -
              <NuxtLink to="/pdf/as-es6-gopas.pdf" external no-prefetch>
                Pokročilé techniky ES6 (Gopas)
              </NuxtLink>
            </li>
            <li>
              Kurz -
              <NuxtLink to="/pdf/as-rust.pdf" external no-prefetch>
                Rust pro začátečníky (CZ.NIC)
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-block">
        <h2>Sportovec</h2>
        <p>
          Rád chodím běhat a&nbsp;jsem členem
          <NuxtLink to="http://tjsokolprahakrc.cz/">
            TJ Sokol Praha-Krč
          </NuxtLink>,
          kde od roku 2019 vedu oddíl rekreačního běhu. Zde se můžete podívat na kompletní
          <NuxtLink to="http://ellrohir.mzf.cz/run.php">
            přehled mých běžeckých výkonů
          </NuxtLink>.
          Kromě toho rád hraju softbal, aktuálně za klub
          <NuxtLink to="https://www.facebook.com/pikespraha">
            Pikes Praha
          </NuxtLink>.
        </p>
        <p>
          Věnuju se také zapisování softballu a baseballu. Od roku 2009 pravidelně jezdím zapisovat mezinárodní
          turnaje. v&nbsp;ČR pomáhám udržovat a&nbsp;rozvíjet systém zapisovatelů a&nbsp;přes zimu školit nové.
        </p>
        <p>
          Na pomoc s&nbsp;výukou jsem vytvořil nástroj na vizualizaci systému zápisu organizace WBSC:
        </p>
        <div class="center">
          <NuxtLink to="https://wbsc-scoring.netlify.app/">
            <img src="/wbsc.webp" alt="WBSC Scoring Creator - aplikace pro zapisovatele" title="WBSC Scoring Creator - aplikace pro zapisovatele">
          </NuxtLink>
        </div>
      </div>
      <div class="content-block">
        <h2>Krčský patriot</h2>
        <p>
          S tátou provozujeme web 'Stará Krč' o&nbsp;historii naší městské části Praha-Krč. Troufnu si tvrdit,
          že ucelenější sbírku informací a&nbsp;fotografií nikdo jiný nemá. Pracujeme na tom, aby naše poznatky
          mohly jednou vyjít i&nbsp;v&nbsp;tištěné podobě.
        </p>
        <p class="center">
          <NuxtLink to="http://krc-historie.cz/">
            <img src="/krc.webp" alt="Stará Krč - historie městské části Praha-Krč" title="Stará Krč - historie městské části Praha-Krč">
          </NuxtLink>
        </p>
      </div>
      <div class="content-block">
        <div class="center">
          <h2>Ostatní</h2>
          <p>
            Aktuality a zajímavosti z Prahy 4 -
            <NuxtLink to="https://www.facebook.com/praha4zive">
              Praha 4 Živě
            </NuxtLink>
          </p>
          <div>Fotografie a pokusy o ně:</div>
          <NuxtLink to="https://www.deviantart.com/ellrohir">
            <img src="/deviantart.webp" alt="DeviantArt - moje fotografické pokusy" title="DeviantArt - accidental photography">
          </NuxtLink>
          <NuxtLink to="https://www.instagram.com/alois.seckar/">
            <img src="/instagram.webp" alt="Instagram - moje fotografické pokusy" title="Instagram - accidental photography">
          </NuxtLink>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
