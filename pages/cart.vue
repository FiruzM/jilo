<script setup lang="ts">
import { Minus, Plus, Trash2 } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()

const cart: any = useLocalStorage('cart', [])

function decrement(id: number) {
  cart.value.forEach((item: any) => {
    if (item.id === id) {
      item.count -= 1
    }
  })
}

function increment(id: number) {
  cart.value.forEach((item: any) => {
    if (item.id === id) {
      item.count += 1
    }
  })
}

function remove(id: number) {
  cart.value = cart.value.filter((item: any) => item.id !== id)
  toast({
    title: 'Товар удален',
    description: 'Товар был удален из корзины',
  })
}

const total = computed(() => {
  return cart.value.reduce((acc: any, item: any) => acc + (item.price * item.count), 0)
})
</script>

<template>
  <div class="mx-auto max-w-[1360px] px-4 pb-20 pt-8 lg:px-10 lg:pb-16 lg:pt-[100px]">
    <div v-if="cart.length > 0" class="flex flex-col gap-11 lg:flex-row lg:gap-16">
      <div class="grow">
        <div class="hidden items-center justify-between lg:flex">
          <div class="flex gap-5">
            <h3 class="text-xl font-semibold md:text-2xl lg:text-3xl">
              Корзина
            </h3>
            <span class="self-end text-sm font-semibold text-[#7A7A7A]">{{ cart.length }} товаров</span>
          </div>

          <button class="flex items-center gap-1" @click="cart = []">
            <Trash2 class="stroke-[#7a7a7a]" />
            <span class="text-sm text-[#7a7a7a]">Очистить корзину</span>
          </button>
        </div>

        <div class="flex flex-col lg:mt-5 xl:mt-16">
          <div v-for="item in cart" :key="item.id" class="flex gap-6 border-b py-4 lg:py-8">
            <div class="self-start rounded-[24px] bg-[#F1F4FA] p-6 lg:self-stretch">
              <img :src="item.file_paths[0]" alt="Logo" class="size-[60px]">
            </div>

            <div class="flex grow flex-col gap-6">
              <div class="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <p class="max-w-[371px]  font-semibold lg:text-xl">
                  {{ item.name }}
                </p>
                <span v-if="item.price" class="self-start text-sm font-semibold text-primary-foreground lg:text-xl">{{ item.price }} с.</span>
                <span v-else class="self-start text-sm font-semibold text-primary-foreground lg:text-xl">{{ item.old_price }} с.</span>
              </div>

              <div class="flex justify-between">
                <div class="flex items-center gap-2">
                  <div class="rounded-full bg-[#F7F8F9] p-1">
                    <Plus class="size-4 stroke-[#64748B] hover:cursor-pointer sm:size-6" @click="increment(item.id)" />
                  </div>
                  <span class="font-semibold">{{ item.count }}</span>
                  <div class="rounded-full bg-[#F7F8F9] p-1">
                    <Minus class="size-4 stroke-[#64748B] hover:cursor-pointer sm:size-6" @click="decrement(item.id)" />
                  </div>
                </div>

                <Trash2 class="stroke-[#7a7a7a] hover:cursor-pointer" @click="remove(item.id)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full flex-col self-start rounded-3xl bg-[#E2F2F4] px-6 py-7 pb-[100px] lg:mt-20 lg:basis-[486px] lg:pb-7 xl:mt-24">
        <div class="flex flex-col gap-4">
          <div class="flex">
            <p class="text-[#80979B]">
              Товары ({{ cart.length }})
            </p>
            <span class="w-[33%] grow border-b" />
            <span class="text-[#80979B]"> {{ total }} с.</span>
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
        <Button class="mt-6 hidden font-semibold lg:flex" @click="$router.push('/formalization')">
          Перейти к оформлению
        </Button>
      </div>
      <Button class="sticky bottom-24 mx-auto -mt-28 w-[296px] font-semibold sm:w-[90%] lg:hidden" @click="$router.push('/formalization')">
        Перейти к оформлению
      </Button>
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
