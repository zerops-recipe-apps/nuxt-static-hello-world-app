# nuxt-static-hello-world-app

Nuxt 4 static site via `nuxt generate` (SSG) — static build served by nginx in prod; dev container runs the Nuxt dev server over SSH.

## Zerops service facts

- HTTP port: dev `3000` (nuxt dev) / prod `80` (nginx)
- Siblings: —
- Runtime base: dev `nodejs@22` / prod `static`

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm run dev`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- `npm run build` is aliased to `nuxt generate` — pre-renders pages to static HTML/CSS/JS in `.output/public/`. Prod `deployFiles: .output/public/~` strips the prefix so `index.html` lands at the nginx document root.
- Uses `npm install` (not `npm ci`) because Nuxt 4 transitive deps have a peer-dep conflict `npm ci` rejects; lock file still guarantees reproducibility.
- `NUXT_PUBLIC_*` vars are embedded at generate time via `build.envVariables` — not readable at runtime in static mode.
- Build cache includes `.nuxt` (module resolution + type generation state) alongside `node_modules`.
