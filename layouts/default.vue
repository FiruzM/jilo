<script setup lang="ts">
import { Heart, Menu, Package, Search, ShoppingCart } from 'lucide-vue-next'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <div class="flex items-center justify-between px-10 py-4">
        <img src="/assets/img/logo.png" alt="Logo" class="ml-[33px]">

        <div class="flex items-center gap-8">
          <Popover>
            <PopoverTrigger as-child>
              <Button class="rounded- px-3 py-6 text-sm font-semibold">
                <Menu class="mr-2" />
                Категории
              </Button>
            </PopoverTrigger>
            <PopoverContent class="mt-5 flex w-screen border-none p-0">
              <div class="bg-[#f9f9f9] py-10 pl-10 pr-5">
                <ul class="flex flex-col gap-2">
                  <li>Красители</li>
                  <li>Спецодежда</li>
                  <li>Коробки и упаковка</li>
                  <li>Шоколады</li>
                  <li>Подложки/подставки</li>
                </ul>
              </div>

              <div class="grow p-10">
                <h4 class="text-3xl font-bold">
                  Красители
                </h4>
              </div>
            </PopoverContent>
          </Popover>

          <div class="relative w-[560px]">
            <Input class="h-12 w-full rounded-3xl" placeholder="Найдите товар здесь" />
            <Search class="absolute right-3 top-3 rounded-full bg-primary p-1" />
          </div>

          <nav>
            <ul class="flex gap-10">
              <li>
                <NuxtLink class="flex flex-col items-center text-sm text-black">
                  <Package />
                  Заказы
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="flex flex-col items-center text-sm text-black">
                  <div class="relative">
                    <Heart />
                    <span class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">2</span>
                  </div>
                  Избранное
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="flex flex-col items-center text-sm text-black">
                  <div class="relative">
                    <ShoppingCart />
                    <span class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">2</span>
                  </div>
                  Корзина
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <Button variant="outline" class="rounded-3xl  py-6 text-sm font-medium ">
            Войти
          </Button>
        </div>
      </div>
    </header>
    <main class="shrink grow basis-auto px-10">
      <slot />
    </main>

    <footer class="bg-[#4A5759]">
      <div class="flex items-center justify-between px-10 py-[99px]">
        <h2 class="text-3xl font-medium text-[#FFDCCD]">
          Ҷило Эксклюзив
        </h2>

        <nav>
          <ul class="flex gap-14">
            <li v-for="(_, index) in 4" :key="index" class="text-[#FFDCCD]">
              About
            </li>
          </ul>
        </nav>
        <p class="text-[#FFDCCD]">
          2024 @ Company
        </p>
      </div>
    </footer>
  </div>
</template>
