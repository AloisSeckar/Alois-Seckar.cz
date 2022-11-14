<template>
    <div id="header">
        <div id="header-content">
            <img class="logo" src="/as.webp" alt="AS" title="Alois Sečkár" />
            <h1>Alois Sečkár</h1>
            <p>Programátor / Sportovec / Krčský patriot</p>
            <div id="social">
                <a href="https://www.facebook.com/alois.seckar">
                    <img class="social" src="/fb.webp" alt="FB" title="Facebook" />
                </a>
                <a href="https://www.instagram.com/alois.seckar/">
                    <img class="social" src="/ig.webp" alt="IG" title="Instagram" />
                </a>
                <a href="https://twitter.com/AloisSeckar/">
                    <img class="social" src="/tw.webp" alt="TW" title="Twitter" />
                </a>
                <a href="https://www.linkedin.com/in/alois-/">
                    <img class="social" src="/ln.webp" alt="LN" title="LinkedIn" />
                </a>
            </div>
            <a href="#content"><img class="more" src="/arrow.webp" alt="more" title="Více info..." /></a>
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
    border-radius: 50%;
    height: 200px;
}

#header-content img.social {
    height: 32px;
    margin: 4px;
}

#header-content img.more {
    height: 32px;
    margin-top: 10px;
}
</style>
