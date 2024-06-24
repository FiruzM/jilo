<script setup lang="ts">
definePageMeta({
  middleware: ['user-only'],
})

const selected = ref('')
</script>

<template>
  <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 lg:flex lg:px-10 lg:pb-16 lg:pt-11">
    <ClientOnly>
      <AsidebarProfile class="hidden lg:block" />
    </ClientOnly>

    <div>
      <RadioGroup v-model="selected" default-value="option-one" class="mt-5 flex gap-2 lg:mt-8 lg:gap-4">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="option-one" value="option-one" class="hidden" />
          <Label for="option-one" :class="selected === 'option-one' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
            Все заказы
          </Label>
        </div>

        <div class="flex items-center space-x-2">
          <RadioGroupItem id="option-two" value="option-two" class="hidden" />
          <Label for="option-two" :class="selected === 'option-two' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
            В ожидании
          </Label>
        </div>

        <div class="flex items-center space-x-2">
          <RadioGroupItem id="option-three" value="option-three" class="hidden" />
          <Label for="option-three" :class="selected === 'option-three' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
            Получены
          </Label>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>
