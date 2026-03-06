# Nuxt Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
A static [Nuxt](https://nuxt.com) site generated with `nuxi generate` and served by Nginx on [Zerops](https://zerops.io), demonstrating build-time environment variable injection via Nuxt's `runtimeConfig.public` and the `NUXT_PUBLIC_*` convention. Used within [Nuxt Hello World recipe](https://app.zerops.io/recipes/nuxt-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/nuxt-hello-world?environment=small-production)

![nuxt cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-nuxt.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`
The main application configuration file you place at the root of your repository, it tells Zerops how to build, deploy and run your application.

```yaml
# Build with Node.js (npm/npx), serve with Nginx.
# The build container compiles the Nuxt app into a fully
# static site — Node.js is NOT present at runtime.
zerops:
  # Production setup — optimized static build for Nginx.
  - setup: prod
    build:
      base: nodejs@22

      # Static deployments have no runtime process to read
      # env vars — NUXT_PUBLIC_* values are embedded into
      # HTML/JS output at generate time by 'nuxi generate'.
      # Use Zerops RUNTIME_ prefix to inject per-environment
      # values without code changes: set APP_ENV as a runtime
      # var and reference it as NUXT_PUBLIC_APP_ENV here.
      envVariables:
        NUXT_PUBLIC_APP_ENV: production

      buildCommands:
        - npm ci
        # 'nuxt generate' pre-renders all pages to static
        # HTML/CSS/JS in .output/public/ — no server needed
        # at runtime.
        - npm run build

      # Strip '.output/public/' prefix so index.html lands
      # at the Nginx document root ('/'), not at
      # '/.output/public/index.html'.
      deployFiles:
        - .output/public/~

      # node_modules: skips reinstall on repeat builds.
      # .nuxt: caches module resolution and type generation,
      # saving several seconds per generate run.
      cache:
        - node_modules
        - .nuxt

    run:
      # Nginx serves the compiled output — no Node.js at
      # runtime. Built-in SPA fallback serves index.html
      # for all unmatched routes, so client-side routing
      # (Vue Router) works out of the box.
      base: static

  # Dev setup — workspace for SSH-based development.
  # Node.js is available at runtime (run.base: nodejs@22)
  # so developers can run 'npx nuxi dev' interactively.
  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu

      buildCommands:
        # npm install (not ci) — flexible for fresh workspaces
        # where the lock file may not exist yet.
        - npm install

      # Deploy full source tree — developer needs all files
      # to run the dev server and edit code via SSH.
      deployFiles: ./

      cache:
        - node_modules

    run:
      base: nodejs@22
      os: ubuntu
      # Keep the container alive without starting a server.
      # Developer starts their own dev server via SSH:
      #   npx nuxi dev --host 0.0.0.0
      start: zsc noop --silent
```

<!-- #ZEROPS_EXTRACT_END:integration-guide# -->
