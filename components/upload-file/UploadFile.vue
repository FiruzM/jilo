<script setup lang="ts">
defineProps<{
  value: string | undefined
}>()
</script>

<template>
  <div class="relative flex h-[50px] w-full max-w-3xl items-center justify-between rounded-md border border-[#3c83ed] p-1">
    <p class="mx-2 line-clamp-1 text-xs text-[#3c83ed] sm:text-base">
      {{ value }}
    </p>
    <div class="flex h-10 items-center rounded-md border border-[#3c83ed] bg-[#3c83ed] px-7 text-base text-primary focus-within:outline-1 focus-within:outline-offset-2 focus:border-[#10a4e9]">
      <input type="file" class="absolute inset-0 h-full opacity-0" v-bind="$attrs">
      <span class="text-center text-xs text-white sm:text-base">Выбрать файл</span>
    </div>
  </div>
</template>
