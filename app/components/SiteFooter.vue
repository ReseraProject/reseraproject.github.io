<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const base = runtimeConfig.app.baseURL
</script>

<template>
  <footer>
    <NuxtLink class="brand footer-brand" to="/" aria-label="RESERA home">
      <span class="brand-mark footer-mark" :style="{ backgroundImage: `url('${base}resera-logo.png')` }" aria-hidden="true" />
      <span>RESERA</span>
    </NuxtLink>
    <p>Student-led. Curiosity-driven.<br>Built for discovery.</p>
    <div class="footer-meta">
      <span>© {{ new Date().getFullYear() }} RESERA</span>
      <NuxtLink to="/partners/">Partner with RESERA ↗</NuxtLink>
    </div>
  </footer>
</template>
