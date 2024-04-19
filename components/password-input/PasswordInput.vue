<script setup>
import { Eye, EyeOff } from 'lucide-vue-next'

const { ...rest } = useAttrs()
const inputType = ref('password')
</script>

<template>
  <div class="relative">
    <input placeholder="***" v-bind="rest" :type="inputType" class="'flex h-[50px] w-full rounded-md border border-input bg-white focus-visible:outline-none focus:border-primary px-3 py-2 text-sm text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50'">
    <EyeOff v-if="inputType === 'password'" class="text-[#80aed5] absolute right-4 top-3 cursor-pointer" @click="inputType = 'text'" />
    <Eye v-else class="text-primary absolute right-4 top-3 cursor-pointer" @click="inputType = 'password'" />
  </div>
</template>
