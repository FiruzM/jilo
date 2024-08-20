<script setup lang="ts">
import { SquarePen } from 'lucide-vue-next'

definePageMeta({
  middleware: ['user-only'],
})

const { t } = useI18n()

useHead({
  title: t('profile'),
  meta: [
    { name: 'title', content: t('profile') },
  ],
})

const user = useAuthUser()
</script>

<template>
  <ClientOnly>
    <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 md:flex lg:gap-10 lg:px-10 lg:pb-16 lg:pt-10 ">
      <AsidebarProfile class="hidden md:block" />

      <div>
        <div class="flex items-center gap-3">
          <Avatar class="size-20">
            <AvatarImage :src="user?.file_path!" alt="avatar" />
            <AvatarFallback>{{ user?.full_name!.slice(0, 1) }}</AvatarFallback>
          </Avatar>

          <p class="text-lg font-semibold text-[#4A5759]">
            {{ user?.full_name }}
          </p>
        </div>

        <div class="mt-8 rounded-md border border-[#EFF2F3] md:w-[360px] lg:w-[529px]">
          <div class="flex flex-col border-b border-[#EFF2F3] p-3">
            <p class="text-[10px] text-[#8CA9AE]">
              {{ $t('full_name') }}
            </p>
            <p class="text-sm font-semibold text-[#4A5759]">
              {{ user?.full_name }}
            </p>
          </div>

          <div class="flex flex-col border-b border-[#EFF2F3] p-3">
            <p class="text-[10px] text-[#8CA9AE]">
              {{ $t('phone_number') }}
            </p>
            <p class="text-sm font-semibold text-[#4A5759]">
              {{ user?.number_phone }}
            </p>
          </div>
        </div>

        <NuxtLink to="/profile/update" class="mt-2 flex items-center gap-1 text-[10px] text-[#8CA9AE] md:hidden">
          <SquarePen class="size-3" />
          {{ $t('edit_profile') }}
        </NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>
