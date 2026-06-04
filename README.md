# Alois-Seckar.cz

[![Netlify Status](https://api.netlify.com/api/v1/badges/377497b7-7d0a-4941-9a68-c870114979af/deploy-status)](https://app.netlify.com/projects/alois-seckar/deploys)

Created with [Nuxt 3](https://nuxt.com/)

Auto-deploment from `main` branch to Netlifiy @ [https://alois-seckar.netlify.app/](https://alois-seckar.netlify.app/). The public domain [https://alois-seckar.cz/](https://alois-seckar.cz/) points to this deployment.

## nuxt-ignis

This project uses [Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis) to simplify dependency management.

To make it run locally, you need to provide `.env` file with `nuxt-neon` DB connecton settings:

```.env
# you'll need to set-up your own Neon connection
# see https://github.com/AloisSeckar/nuxt-neon/
NUXT_NEON_HOST=<NeonDB_host>
NUXT_NEON_USER=<NeonDB_user>
NUXT_NEON_PASS=<NeonDB_pass>
NUXT_NEON_DB=<NeonDB_name>
```
