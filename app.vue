<script setup lang="ts">
import ogImage from '~/assets/img/og-image.png'

const runtimeConfig = useRuntimeConfig()
const i18nHead = useLocaleHead({
  addSeoAttributes: {},
})

useHead({
  meta: [
    { name: 'icon', content: '/favicon.ico' },
    { name: 'og:image', content: ogImage },
    { name: 'og:title', content: runtimeConfig.public.websiteTitle },
  ],
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
