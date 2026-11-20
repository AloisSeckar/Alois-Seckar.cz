# AgentCreed Backlog

<!-- ↓↓↓ agentcreed ↓↓↓ -->

This file is used to collect tasks for the project codebase discovered during development (e.g. refactoring, duplicated or unused code, bugs, missing tests, missing or outdated documentation, changes out of the current task scope). Findings about agent instructions belong in `SUGGESTIONS.md`.

This file holds pending tasks only, as a numbered list. Resolved items are deleted, never marked as done. When resolved items are deleted, the remaining items are renumbered.

<!-- ↑↑↑ agentcreed ↑↑↑ -->

1. Security: `server/routes/runs-add.post.ts` and `server/routes/run-delete.delete.ts` send `formatNeonError(...)` to the client as `statusMessage`. This exposes DB error details and breaks the `SECURITY.md` rule "return generic error messages to external callers". Log details on the server and return a generic message.
2. Security: `server/routes/runs-add.post.ts` stores form fields (`inputDate`, `inputTrack`, `inputLength`, `inputTime`, `inputDscr`) without server-side validation of type, format or size. `SECURITY.md` requires validation at trust boundaries.
3. Security: `getTrackInfo()` in `app/components/run/Table.vue` builds HTML from DB values (`tmaplink`, `tname`, `rdscr`, `tdscr`) without escaping and renders it with `v-html`. `SECURITY.md` requires context-aware escaping for UI output. Render it with a template or `h()` instead.
4. Security: `app/components/widget/devto.js` puts dev.to API data into `innerHTML` without escaping or sanitizing (`article.url`, `article.cover_image`, `article.user.profile_image_90`, `article.body_html`). `SECURITY.md` treats third-party API data as untrusted
5. Missing tests: the admin endpoints `runs-add` and `run-delete` have no tests for the `403` response when the user is not logged in.
