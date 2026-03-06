<script setup lang="ts">
const config = useRuntimeConfig()
const appConfig = useAppConfig()

// useState serializes the server-computed timestamp into the page
// payload — client hydrates with the same value, no mismatch.
// The timestamp is captured once at 'nuxi generate' time.
const buildTime = useState('buildTime', () => new Date().toUTCString())
</script>

<template>
  <main>
    <h1>Hello from Zerops!</h1>
    <section>
      <dl>
        <dt>Framework</dt>
        <dd>Nuxt v{{ appConfig.nuxtVersion }}</dd>

        <dt>Environment</dt>
        <dd>{{ config.public.appEnv }}</dd>

        <dt>Built at</dt>
        <dd>{{ buildTime }}</dd>
      </dl>
    </section>
  </main>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f0f0f;
  color: #e0e0e0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  width: 100%;
  max-width: 480px;
  padding: 48px 32px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}

h1 {
  margin: 0 0 32px;
  font-size: 1.75rem;
  color: #00DC82;
}

section {
  background: #111;
  border-radius: 8px;
  padding: 24px;
}

dl {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 24px;
  align-items: baseline;
}

dt {
  color: #888;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

dd {
  margin: 0;
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.9rem;
  color: #e0e0e0;
  word-break: break-all;
}
</style>
