<script setup lang="ts">
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
} from 'radix-vue'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupItemProps & { class?: string }>()
</script>

<template>
  <RadioGroupItem
    v-bind="props"
    :class="
      cn(
        'aspect-square h-4 w-4 rounded-full cursor-pointer flex justify-center items-center border border-input disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      :class="cn('flex items-center justify-center', props.class)"
    >
      <Circle class="size-full stroke-[5px] text-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
