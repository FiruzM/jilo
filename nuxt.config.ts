/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@hebilicious/vue-query-nuxt',
    '@nuxtjs/google-fonts',
    'dayjs-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'vue-yandex-maps/nuxt',
    'nuxt-rating',
  ],

  yandexMaps: {
    apikey: '6d6ca20e-5fc8-4ef3-9e02-797d2aeda8c0',
  },

  routeRules: {
    '/admin/**': { ssr: false },
    '/order/**': { ssr: false },

  },

  runtimeConfig: {
    public: {
      wsHost: process.env.NUXT_PUBLIC_WS_HOST,
      apiBase: process.env.NUXT_PUBLIC_API_URL,
      websiteTitle: process.env.NUXT_PUBLIC_WEBSITE_NAME,
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
  },

  robots: {
    disallow: ['/admin/**'],
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
        { name: 'description', content: 'Добро пожаловать в Jilo Exclusive, ваш эксклюзивный интернет-магазин для кондитеров! Мы предлагаем широкий ассортимент высококачественных ингредиентов, инструментов и аксессуаров для кондитерского искусства. От натуральных ароматизаторов и пищевых красителей до профессиональных форм для выпечки и декора, наш ассортимент имеет все, что нужно для создания уникальных и вкусных кондитерских изделий. Мы сотрудничаем только с проверенными поставщиками, чтобы обеспечить вам доступ к лучшим продуктам по конкурентоспособным ценам. Благодаря быстрой доставке и безопасным способам оплаты, покупки в нашем магазине - это простая и приятная процедура. Создавайте свои шедевры с Jilo Exclusive!' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
