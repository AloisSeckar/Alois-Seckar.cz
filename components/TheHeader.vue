<template>
  <div id="header">
    <div id="header-content">
      <img class="logo" src="/as.webp" alt="Face of Alois Sečkár" title="Alois Sečkár">
      <h1>Alois Sečkár</h1>
      <p>Programátor / Sportovec / Krčský patriot</p>
      <div id="social">
        <a href="mailto:alois.seckar@gmail.com">
          <img class="social" src="/em.webp" alt="Envelope icon" title="E-mail">
        </a>
        <a href="https://www.facebook.com/alois.seckar">
          <img class="social" src="/fb.webp" alt="Facebook logo" title="Facebook">
        </a>
        <a href="https://github.com/AloisSeckar">
          <img class="social" src="/gh.webp" alt="GitHub logo" title="GitHub">
        </a>
        <a href="https://www.linkedin.com/in/alois-/">
          <img class="social" src="/ln.webp" alt="LinkedIn logo" title="LinkedIn">
        </a>
      </div>
      <a href="#content"><img class="more" src="/arrow.webp" alt="more" title="Více info..."></a>
    </div>
  </div>
</template>

<style scoped>
#header {
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 98%;
    margin: 0 auto;
    display: table;
}

#header-content {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}

#header-content img.logo {
    border: 2px solid #e1b400;
    border-radius: 50%;
    height: 200px;
    box-shadow:
      0 0 48px 12px #009682;
}

#header-content img.social {
    height: 32px;
    margin: 8px;
    border-radius: 30%;
    box-shadow:
      0 0 6px 2px #009682;
}

#header-content img.more {
    height: 24px;
    width: 96px;
    margin-top: 18px;
}
</style>
