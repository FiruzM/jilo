<script setup lang="ts">
import { Box, Heart, LogOut, SquarePen } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col gap-6 rounded-3xl border border-[#D5D5D5] p-4">
    <div class="flex flex-col items-center gap-4 rounded-[8px] bg-[#EBF7F4] px-8 py-4">
      <Avatar class="size-20">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div class="flex flex-col items-center">
        <p class="font-semibold">
          Фарида Рустамова
        </p>

        <span class="mt-[6px] text-xs text-[#8CA9AE]">+992 900 98 76 54</span>

        <NuxtLink class="mt-2 flex items-center gap-1 text-[10px] text-[#8CA9AE]">
          <SquarePen class="size-3" />
          Редактировать профиль
        </NuxtLink>
      </div>
    </div>

    <ul>
      <li class="rounded-[8px] p-4 [&.router-link-active]:bg-primary-foreground">
        <NuxtLink class="flex items-center gap-2 [&.router-link-active]:text-[#FFDCCD]">
          <Box class="[&.router-link-active]:stroke-[#FFDCCD]" />
          Заказы
        </NuxtLink>
      </li>

      <li class="rounded-[8px] p-4 [&.router-link-active]:bg-primary-foreground">
        <NuxtLink to="/favorites" class="flex items-center gap-2 [&.router-link-active]:text-[#FFDCCD]">
          <Heart class="[&.router-link-active]:stroke-[#FFDCCD]" />
          Избранное
        </NuxtLink>
      </li>
    </ul>

    <Button class="flex gap-3 self-start bg-transparent p-0 pl-4 text-[#F76659] hover:bg-transparent">
      <LogOut class="stroke-[#FFB5AE]" />

      Выйти
    </Button>
  </div>
</template>
