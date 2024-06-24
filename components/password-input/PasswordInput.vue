<script setup>
import { Eye, EyeOff } from 'lucide-vue-next'

const { ...rest } = useAttrs()
const inputType = ref('password')
</script>

<template>
  <div class="relative">
    <input placeholder="***" v-bind="rest" :type="inputType" class="'flex disabled:opacity-50' h-[50px] w-full rounded-[12px] border border-[#ADADAD] bg-white px-3 py-2 text-sm text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary  focus-visible:outline-none disabled:cursor-not-allowed">
    <EyeOff v-if="inputType === 'password'" class="absolute right-4 top-3 cursor-pointer text-primary-foreground" @click="inputType = 'text'" />
    <Eye v-else class="absolute right-4 top-3 cursor-pointer text-primary" @click="inputType = 'password'" />
  </div>
</template>
