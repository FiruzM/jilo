<script setup lang="ts">
import { Minus, Plus, Trash2 } from 'lucide-vue-next'
</script>

<template>
  <div class="mx-auto max-w-[1360px]">
    <div v-if="true" class="mb-44 mt-[100px] flex gap-16">
      <div class="grow">
        <div class="flex items-center justify-between">
          <div class="flex gap-5">
            <h3 class="text-3xl font-semibold">
              Корзина
            </h3>
            <span class="self-end text-sm font-semibold text-[#7A7A7A]">4 товаров</span>
          </div>

          <div class="flex items-center gap-1">
            <Trash2 class="stroke-[#7a7a7a]" />
            <span class="text-sm text-[#7a7a7a]">Очистить корзину</span>
          </div>
        </div>

        <div class="mt-16 flex flex-col">
          <div v-for="i in 4" :key="i" class="flex gap-6 border-b py-8">
            <div class="rounded-xl bg-[#F1F4FA] p-6">
              <img src="/assets/img/box.png" alt="Logo" class="size-[60px]">
            </div>

            <div class="flex grow flex-col gap-6">
              <div class="flex justify-between">
                <p class="max-w-[371px] text-xl font-semibold">
                  Коробка для торта с окном Гофрокартон 30х40х20 см
                </p>
                <span class="self-start text-xl font-semibold text-[#4A5759]">12.00 с.</span>
              </div>

              <div class="flex justify-between">
                <div class="flex items-center gap-2">
                  <div class="rounded-full bg-[#F7F8F9] p-1">
                    <Plus class="stroke-[#64748B]" />
                  </div>
                  <span class="font-semibold">1</span>
                  <div class="rounded-full bg-[#F7F8F9] p-1">
                    <Minus class="stroke-[#64748B]" />
                  </div>
                </div>

                <Trash2 class="stroke-[#7a7a7a]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex basis-[486px] flex-col self-start rounded-3xl bg-[#E2F2F4] px-6 py-7">
        <div class="flex flex-col gap-4">
          <div class="flex">
            <p class="text-[#80979B]">
              Товары (4)
            </p>
            <span class="w-[33%] grow border-b" />
            <span class="text-[#80979B]">108.00 с.</span>
          </div>

          <div class="flex">
            <p class="text-[#80979B]">
              Скидка
            </p>
            <span class="w-[33%] grow border-b" />
            <span class="text-[#80979B]">-60.00 с..</span>
          </div>
        </div>

        <div class="mt-10 flex justify-between">
          <p class="text-xl font-semibold">
            Итого
          </p>
          <span class="text-xl font-semibold">48.00 с.</span>
        </div>

        <Button class="mt-6 font-semibold" @click="$router.push('/order')">
          Перейти к оформлению
        </Button>
      </div>
    </div>

    <div v-else class="mb-44 mt-[100px] flex items-center justify-center">
      <div class="flex flex-col items-center">
        <img src="/assets/img/emptycart.png" alt="Cart" class="size-[300px]">

        <h3 class="mb-6 self-center text-3xl font-semibold">
          Внутри пока нет товаров
        </h3>
        <p class="mb-6 self-center text-base font-semibold">
          Перейдите в раздел с товарами, чтобы оставить заявку
        </p>

        <NuxtLink to="/category" class="rounded-xl bg-primary px-6 py-4">
          Перейти в каталог
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
