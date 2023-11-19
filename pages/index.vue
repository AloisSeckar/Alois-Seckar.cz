<template>
  <div>
    <TheHeader />
    <div id="content" class="content-pane">
      <div class="content-block">
        <h2>Programátor</h2>
        <p>
          Vystudoval jsem informatiku na VŠE v Praze. Od 1. února 2016 pracuju pro IT společnost
          <a href="https://atos.net/cs/ceska-republika">Atos</a>. Věnuju se převážně světu Java programování +
          vývoji webů pomocí JavaScriptu (Vue.js resp. Nuxt 3). Zajímá mě taky cloud-native, DevOps a moderní
          trendy obecně.
        </p>
        <p class="center">
          <a href="https://github.com/AloisSeckar">
            <img src="/github.webp" alt="GitHub" title="GitHub - moje zdrojové kódy">
          </a>
          <a href="http://ellrohir.mzf.cz/">
            <img
              src="/web.webp"
              alt="Webový koutek"
              title="Webový koutek - kolekce jednoduchých webových programů"
            >
          </a>
        </p>
        <p class="center">
          <strong><u>Dokumenty</u></strong><br>
          <a href="/pdf/cv.pdf">ŽIVOTOPIS</a><br>
          Certifikát - <a href="/pdf/as-java-ocp-8.pdf">Java 8 OCP</a><br>
          Potvrzení - <a href="/pdf/as-vuejs-master-class.pdf">Vue.js Master class</a>
        </p>
      </div>
      <div class="content-block">
        <h2>Sportovec</h2>
        <p>
          Rád chodím běhat a jsem členem <a href="http://www.tjsokolprahakrc.cz/">TJ Sokol Praha-Krč</a>, kde
          od roku 2019 vedu oddíl rekreačního běhu. Zde se můžete podívat na kompletní
          <a href="http://ellrohir.mzf.cz/run.php">přehled mých běžeckých výkonů</a>. Kromě toho rád hraju
          softbal, aktuálně za klub <a href="https://www.facebook.com/pikespraha">Pikes Praha</a>.
          Věnuju se také zapisování softballu a baseballu, v ČR pomáhám udržovat a rozvíjet systém
          zapisovatelů a přes zimu školit nové.
          Od roku 2009 pravidelně jezdím zapisovat mezinárodní turnaje.
        </p>
      </div>
      <div class="content-block">
        <h2>Krčský patriot</h2>
        <p>
          S tátou provozujeme web 'Stará Krč' o historii naší městské části Praha-Krč. Troufnu si tvrdit, že
          ucelenější sbírku informací a fotografií nikdo jiný nemá. Pracujeme na tom, aby naše poznatky mohly
          jednou vyjít i v tištěné podobě.
        </p>
        <p class="center">
          <a href="http://krc-historie.cz/">
            <img src="/krc.webp" alt="Stará Krč" title="Stará Krč - historie městské části Praha-Krč">
          </a>
        </p>
      </div>
      <div class="content-block">
        <div class="center">
          <h2>Ostatní</h2>
          <p>
            Aktuality a zajímavosti z Prahy 4 - <a href="https://www.facebook.com/praha4zive">Praha 4 Živě</a>
          </p>
          <div>Fotografie a pokusy o ně:</div>
          <a href="https://www.deviantart.com/ellrohir">
            <img src="/deviantart.webp" alt="DeviantArt" title="DeviantArt - accidental photography">
          </a>
          <a href="https://www.instagram.com/alois.seckar/">
            <img src="/instagram.webp" alt="Instagram" title="Instagram - accidental photography">
          </a>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.content-pane {
    margin: 0 auto;
    padding: 1em;
    max-width: 1000px;
    text-align: justify;
}

.content-block {
    padding: 1em 1.5em;
    margin-bottom: 3em;
    border: 1px solid black;
    border-radius: 1em;
    box-shadow:
      0 0 12px 3px #009682;
}

.content-block img {
    display: inline;
    margin: 1em;
    height: 160px;
    border: 2px solid #e1b400;
    border-radius: 50%;
}

.content-block .center {
    text-align: center;
}

a:link,
a:hover,
a:active,
a:visited {
    color: #009682;
}
</style>
