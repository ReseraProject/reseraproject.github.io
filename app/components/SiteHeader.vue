<script setup lang="ts">
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const menuOpen = ref(false)
const scrolled = ref(false)
const base = runtimeConfig.app.baseURL

function closeMenu() {
  menuOpen.value = false
}

function updateScroll() {
  scrolled.value = window.scrollY > 36
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScroll))
watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header :class="{ scrolled }">
    <NuxtLink class="brand" to="/" aria-label="RESERA home" @click="closeMenu">
      <span class="brand-mark" :style="{ backgroundImage: `url('${base}resera-logo.png')` }" aria-hidden="true" />
      <span>RESERA</span>
    </NuxtLink>

    <button
      class="menu-button"
      :class="{ open: menuOpen }"
      type="button"
      aria-label="Toggle navigation"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <span /><span />
    </button>

    <nav :class="{ open: menuOpen }" aria-label="Main navigation">
      <NuxtLink to="/#about" @click="closeMenu">About</NuxtLink>
      <NuxtLink to="/#research" @click="closeMenu">Research</NuxtLink>
      <NuxtLink to="/#explore" @click="closeMenu">Explore</NuxtLink>
      <NuxtLink to="/opportunities/" @click="closeMenu">Opportunities</NuxtLink>
      <NuxtLink to="/partners/" @click="closeMenu">Partners</NuxtLink>
    </nav>

    <a class="nav-cta" href="https://discord.gg/kJWRfURJY3" target="_blank" rel="noreferrer">
      Join <span>↗</span>
    </a>
  </header>
</template>
