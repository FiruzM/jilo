<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const customData = props.error?.data as { homeLink?: string }

const handleError = () => clearError({ redirect: customData.homeLink })
</script>

<template>
  <div id="error" class="font-sans antialiased text-white grid min-h-screen place-content-center overflow-hidden">
    <div class="fixed left-0 right-0 spotlight z-10" /><div class="max-w-520px text-center z-20">
      <h1 class="text-8xl sm:text-10xl font-medium mb-8">
        {{ error?.statusCode }}
      </h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight">
        {{ error?.statusMessage }}
      </p><div class="w-full flex items-center justify-center">
        <button class="relative h-12 overflow-hidden rounded bg-primary px-5 py-2.5 text-white transition-all duration-300 hover:bg-secondary-800 hover:ring-2 hover:ring-primary hover:ring-offset-2" @click="handleError">
          <span class="relative">Go back home</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #error {
    background-image: linear-gradient(
  45deg,
  hsl(216deg 83% 12%) 0%,
  hsl(208deg 100% 17%) 11%,
  hsl(205deg 100% 23%) 22%,
  hsl(201deg 100% 27%) 33%,
  hsl(195deg 100% 31%) 44%,
  hsl(188deg 100% 32%) 56%,
  hsl(177deg 100% 33%) 67%,
  hsl(165deg 100% 37%) 78%,
  hsl(154deg 100% 42%) 89%,
  hsl(139deg 86% 50%) 100%
);
  }
</style>
