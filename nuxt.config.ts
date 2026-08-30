const siteUrl = 'https://reseraproject.github.io/Resera/'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-30',
  devtools: { enabled: false },
  ssr: true,
  app: {
    baseURL: '/Resera/',
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#06131d' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: `${siteUrl}og.png` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${siteUrl}og.png` }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/Resera/resera-logo.png' }]
    }
  },
  css: ['~/assets/css/base.css', '~/assets/css/nuxt.css'],
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      routes: ['/', '/partners/']
    }
  },
  typescript: {
    typeCheck: true
  }
})
