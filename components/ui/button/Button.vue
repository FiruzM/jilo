<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { Loader } from 'lucide-vue-next'
import { buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    :disabled="isLoading"
  >
    <Loader v-if="isLoading" class="mr-2.5 size-5 animate-spin" />
    <slot />
  </Primitive>
</template>
