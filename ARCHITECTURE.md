# ARCHITECTURE.md

<!-- ↓↓↓ agentcreed ↓↓↓ -->

This file describes the project tech stack, structure and coding conventions. Rules for handling this file are defined in [AGENTS.md](./AGENTS.md).

<!-- ↑↑↑ agentcreed ↑↑↑ -->

## Overview

Personal website and portfolio of Alois Sečkár, published at <https://alois-seckar.cz/>. It is a server-rendered Nuxt app on Netlify with a homepage, three IT article digests and a running statistics page backed by a Neon PostgreSQL database.

## Tech Stack

| Category        | Technology |
| --------------- | ---------- |
| Language        | TypeScript (plus one plain JS custom element in `app/components/widget/devto.js`) |
| Framework       | Nuxt 4 (Vue 3, Nitro server), extended from the [Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis) layer |
| UI              | Nuxt UI 4, Tailwind CSS 4, global CSS in `app/assets/as.css` |
| Forms           | Vueform (`vueform.config.ts`) |
| Database        | Neon serverless PostgreSQL via `nuxt-neon` |
| Authentication  | GitHub OAuth via `nuxt-auth-utils` (cookie session) |
| Security        | `nuxt-security` (security headers, CSP) |
| Other           | `@nuxt/image`, VueUse, `node-html-parser` (server-side parsing of article lists) |
| Testing         | Vitest + `@nuxt/test-utils` (e2e), Playwright (`playwright-core`) for hydrated pages |
| Linting         | ESLint via `@nuxt/eslint` with stylistic rules |
| Package manager | pnpm (version set in `packageManager` in `package.json`) |
| Hosting         | Netlify, Node 24 (`netlify.toml`), deployment described in [README.md](./README.md) |
| Dependency bot  | Dependabot, monthly grouped npm updates (`.github/dependabot.yml`) |

`package.json` only declares `nuxt-ignis` and `node-html-parser`. All other modules come from Nuxt Ignis. The `ignis.preset` section in `nuxt.config.ts` turns on the `nuxt-ui`, `neon` and `vueform` presets. There are no GitHub Actions workflows.

## Architecture

The project is a single Nuxt app. Pages and components live in `app/`. API endpoints are Nitro routes in `server/routes/` and have no `/api` prefix.

```text
Browser
 ├─ app/pages ── useFetch / $fetch ──> server/routes
 │                                      ├─ runs, tracks, runs-add, run-delete ──> Neon PostgreSQL (nuxt-neon)
 │                                      ├─ get-articles, nuxt-news, java-news, coda-digest ──> Markdown lists on GitHub (allow-list)
 │                                      ├─ article-image ──> og:image of an article page (only links from the lists)
 │                                      └─ auth/github, auth/login ──> GitHub OAuth, session cookie
 └─ <dev-to> custom element ──> dev.to public API (client side)
```

### Pages

- `/` (`index.vue`) - static portfolio sections, links to PDF documents, links to digests and the dev.to articles widget.
- `/digest-java`, `/digest-nuxt`, `/digest-ai`, `/digest-it` - article digests rendered by the `ArticleDigest` component.
- `/run` - running statistics with filter, table, stats and an admin form.
- `/ramecky` - points to the new location of the old "Svobodné rámečky" app. The global middleware `redirect.global.ts` redirects old `/ramecky/index.php` URLs here.

### Article digests

- Sources are an allow-list in `shared/utils/articleSources.ts` (`ARTICLE_SOURCES`). Each source is a Markdown file on `raw.githubusercontent.com`. The server never fetches client-supplied list URLs.
- `server/utils/articles.ts` downloads a list, keeps table rows that start with ``| **` `` and parses them into `ArticleItem` objects. Results are cached with `defineCachedFunction` (lists for 1 hour with stale-while-revalidate for 1 day, `og:image` lookups for 30 days).
- `GET /get-articles?source=&count=&offset=` returns a page of items. `count` is clamped to 1-50.
- `GET /article-image?source=&link=` redirects to the article `og:image` or to `/article-placeholder.svg`. It only fetches links that are in the given source list and only returns `https:` images.
- `GET /nuxt-news`, `/java-news`, `/coda-digest` are legacy endpoints that return the last 5 items as `Last5Articles`. <https://master-coda.cz/> links to them.
- `ArticleDigest.vue` fetches on the client only, loads 10 items per page with infinite scroll and keeps loaded items in `useState` for 10 minutes.
- Netlify CDN caching is set by `routeRules` headers in `nuxt.config.ts` and by headers in `article-image.get.ts`.

### Running statistics

- Data lives in the `elrh_run_records` and `elrh_run_tracks` tables. Runs on a regular track take the length from the track. One-off runs (track id `-1`) store their own length.
- Reads are public: `POST /runs` (filter and sort in the JSON body) and `GET /tracks`.
- Writes need a login: `POST /runs-add` (form data from `RunForm`) and `DELETE /run-delete?id=`. `checkLogin` in `server/utils/login.ts` allows only the session whose GitHub user id equals `runtimeConfig.key`.
- `GET /auth/github` runs the GitHub OAuth flow and stores `githubId` in the session. `GET /auth/login` tells the client whether the current user may edit.
- The interactive part of `/run` renders on the client only (`ClientOnly`).

### State management

There are no Pinia stores in the project code. State uses `ref`, `useState`, `useFetch` and `useAsyncData`.

### Configuration

Runtime settings come from environment variables (`.env` locally):

- `NUXT_NEON_HOST`, `NUXT_NEON_USER`, `NUXT_NEON_PASS`, `NUXT_NEON_DB` - Neon connection, see [README.md](./README.md).
- `NUXT_OAUTH_GITHUB_CLIENT_ID`, `NUXT_OAUTH_GITHUB_CLIENT_SECRET` - GitHub OAuth app (`runtimeConfig.oauth.github`).
- `NUXT_KEY` - GitHub user id allowed to add and delete runs (`runtimeConfig.key`).
- `NUXT_SESSION_PASSWORD` - session encryption key required by `nuxt-auth-utils` in production.

## Key Directories

- `app/pages/` - routes (file-based routing).
- `app/components/` - Vue components. Subfolders give the name prefix: `article/` (`ArticleDigest`), `run/` (`RunFilter`, `RunForm`, `RunStats`, `RunTable`), `widget/` (`WidgetDevDigest`, `WidgetDevDocuments`, `WidgetDevTo`). `The*` components are page headers and footers.
- `app/middleware/` - global route middleware.
- `app/assets/` - global CSS and the header font.
- `app/utils/` - type declarations for untyped modules.
- `server/routes/` - API endpoints. `server/routes/auth/` holds the login endpoints.
- `server/utils/` - article fetching, parsing and caching, and the login check.
- `shared/utils/` - types and helpers auto-imported in both app and server code.
- `public/` - static files: images, `pdf/` (CV and certificates linked from the homepage), `css/devto.style` (styles for the dev.to widget), and `pragvue-2025-*.pdf` (talk slides shared via direct links from outside the site).
- `test/` - e2e tests.
- `.agents/`, `.creed/` - AgentCreed skills and backlog files.

Nuxt Ignis writes `public/_ignis-config.json` and `public/_nuxt-config.json` each time Nuxt starts (`ready` hook, in both dev and build). Both files are git-ignored.

## Entry Points

- App root: `app/app.vue` (global SEO meta and `<NuxtPage />`).
- Config: `nuxt.config.ts`, `app/app.config.ts` (Nuxt UI theme overrides).
- API: `server/routes/`.
- Tests: `test/` (`pnpm test`).

## Conventions

- Standard Nuxt 4 layout with `app/`, `server/` and `shared/`. Utilities and types are auto-imported, so code rarely imports from `shared/utils/`.
- Server route files carry the HTTP method suffix (`.get.ts`, `.post.ts`, `.delete.ts`).
- Shared types are `type` aliases in `shared/utils/*Types.ts`.
- Server handlers usually report failures with `createError({ statusCode, statusMessage })` and log with `console.*`. Client code logs with `log` (consola from Nuxt Ignis).
- UI text is Czech. Code and comments are English. Some local variable names in `RunStats` are Czech.
- ESLint stylistic rules: no semicolons, single quotes, 2-space indent, `} else {` on one line, up to 4 attributes per line on single-line tags and 3 on multi-line tags, and no newline before a closing bracket (`eslint.config.mjs`).
- Styling uses Tailwind utilities in templates. Nuxt Ignis loads unlayered global CSS that beats Tailwind layers, so some utilities need the `!` important modifier (e.g. `m-0!`).

## Quick Commands

| Action  | Command |
| ------- | ------- |
| Install | `pnpm install` |
| Dev     | `pnpm dev` |
| Lint    | `pnpm eslint` |
| Test    | `pnpm test` |
| Build   | `pnpm build` |

Tests are e2e. They build and start the app and need network access to GitHub. The `/run` page test also needs a working Neon connection. `pnpm test:watch` runs Vitest in watch mode. Netlify deploys the output of `pnpm build`. `pnpm generate` exists, but the deploy does not use it.
