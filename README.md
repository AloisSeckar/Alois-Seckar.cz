# Alois-Seckar.cz

Created with [Nuxt 3](https://nuxt.com/)

Auto-deploment from `main` to Netlifiy - [https://alois-seckar.netlify.app/](https://alois-seckar.netlify.app/)

## nuxt-ignis
This project uses [Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis) to simplify dependency management.

To make it run locally, you need to provide `.env` file with following settings:

```
# enable Neon DB (for /runs)
NUXT_PUBLIC_IGNIS_PRESET_DB=neon

# you will need to set-up your own Neon connection
# see https://github.com/AloisSeckar/nuxt-neon/

# enable Nuxt UI
NUXT_PUBLIC_IGNIS_PRESET_UI=nuxt-ui
```
