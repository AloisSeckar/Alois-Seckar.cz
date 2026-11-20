# AgentCreed Backlog

<!-- ↓↓↓ agentcreed ↓↓↓ -->

This file is used to collect tasks for the project codebase discovered during development (e.g. refactoring, duplicated or unused code, bugs, missing tests, missing or outdated documentation, changes out of the current task scope). Findings about agent instructions belong in `SUGGESTIONS.md`.

This file holds pending tasks only, as a numbered list. Resolved items are deleted, never marked as done. When resolved items are deleted, the remaining items are renumbered.

<!-- ↑↑↑ agentcreed ↑↑↑ -->

1. Security: `server/routes/runs-add.post.ts` and `server/routes/run-delete.delete.ts` send `formatNeonError(...)` to the client as `statusMessage`. This exposes DB error details and breaks the `SECURITY.md` rule "return generic error messages to external callers". Log details on the server and return a generic message.
2. Security: `server/routes/runs-add.post.ts` stores form fields (`inputDate`, `inputTrack`, `inputLength`, `inputTime`, `inputDscr`) without server-side validation of type, format or size. `SECURITY.md` requires validation at trust boundaries.
3. Security: `getTrackInfo()` in `app/components/run/Table.vue` builds HTML from DB values (`tmaplink`, `tname`, `rdscr`, `tdscr`) without escaping and renders it with `v-html`. `SECURITY.md` requires context-aware escaping for UI output. Render it with a template or `h()` instead.
4. Security: `app/components/widget/devto.js` puts dev.to API data into `innerHTML` without escaping or sanitizing (`article.url`, `article.cover_image`, `article.user.profile_image_90`, `article.body_html`). `SECURITY.md` treats third-party API data as untrusted.
5. `package.json` script `test:nuxt` runs `vitest --project nuxt`, but `vitest.config.ts` only defines the `e2e` project (the `nuxt` project setup is commented out). Fix or remove the script.
6. Unused code: `sumTimes()` in `shared/utils/runUtils.ts` is not used anywhere.
7. Duplicated code: the run length expression `run.tid > 0 ? run.tlength : run.rlength` appears 4 times in `app/components/run/Stats.vue` and twice in `app/components/run/Table.vue` (`totalLenth`, `getLengthInfo()`). Move it to a shared helper.
8. Bug: `capitalizeDscr()` in `app/components/article/Digest.vue` ends with `/[.!?]$/.test(capitalized) ? capitalized : \`${capitalized}\``, so both branches return the same value. Either add the missing period or remove the ternary.
9. Missing tests: `getAVGSpeed()` in `shared/utils/runUtils.ts` has no unit tests. The admin endpoints `runs-add` and `run-delete` have no tests for the `403` response when the user is not logged in.
10. Security (verify): the `nuxt-ignis` `ready` hook writes the full resolved Nuxt options into `public/_nuxt-config.json`, so the file is probably deployed and publicly served. It holds internal absolute paths and the full config, and `SECURITY.md` says not to expose internal file paths in production. Check `https://alois-seckar.cz/_nuxt-config.json` and exclude the file from the deployment (or fix it upstream in Nuxt Ignis).
