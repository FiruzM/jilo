/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@hebilicious/vue-query-nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/google-fonts',
    'dayjs-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
  ],

  routeRules: {
    '/admin/**': { ssr: false },
    '/ecosystem/**': { ssr: false },
    '/investor/**': { ssr: false },
    '/startupper/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      wsHost: process.env.NUXT_PUBLIC_WS_HOST,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  i18n: {
    locales: [
      {
        code: 'tg',
        name: 'Тҷ',
        file: 'tg.json',
        iso: 'tg-TJ',
      },
      {
        code: 'ru',
        name: 'Ру',
        file: 'ru.json',
        iso: 'ru-RU',
      },
    ],

    defaultLocale: 'ru',
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      Raleway: [400, 500, 600, 700],
    },
  },

  dayjs: {
    locales: ['ru'],
    defaultLocale: 'ru',
    plugins: ['timezone'],
    defaultTimezone: 'Tajikistan/Dushanbe',
  },

  site: {
    url: process.env.NUXT_PUBLIC_WEBSITE_URL,
    name: 'Jilo',
    description: 'Place where you can get your startup ideas',
  },

  robots: {
    disallow: ['/ecosystem/**', '/admin/**', '/investor/**', '/startupper/**'],
  },

  ogImage: {
    enabled: false,
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt 3 app' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
