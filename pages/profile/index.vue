<script setup lang="ts">
definePageMeta({
  middleware: ['user-only'],
})

const user = useAuthUser()
</script>

<template>
  <ClientOnly>
    <div class="mx-auto flex max-w-[1360px] flex-col gap-6  px-4 pb-10 pt-8 sm:flex-row lg:gap-10 lg:px-10 lg:pb-16 lg:pt-10 ">
      <div class="flex justify-center overflow-hidden sm:justify-start">
        <img :src="user?.file_path" alt="avatar" class="size-[200px] rounded-md">
      </div>

      <div class="flex flex-col justify-between gap-5">
        <div class="flex items-center gap-10">
          <div class="flex flex-col gap-5">
            <p class="text-lg font-semibold text-[#8CA9AE] md:text-2xl">
              Имя пользователя
            </p>
            <p class="text-lg font-semibold text-[#8CA9AE] md:text-2xl">
              Номер пользователя
            </p>
          </div>
          <div class="flex flex-col gap-5">
            <p class="text-lg font-medium md:text-2xl ">
              {{ user?.full_name }}
            </p>
            <p class="text-lg font-medium md:text-2xl ">
              {{ user?.number_phone }}
            </p>
          </div>
        </div>

        <Button @click="$router.push('/profile/update')">
          Редактировать профиль
        </Button>
      </div>
    </div>
  </ClientOnly>
</template>
