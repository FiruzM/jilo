<script setup lang="ts">
import { Heart, ShoppingCart, ThumbsUp, Truck } from 'lucide-vue-next'
</script>

<template>
  <div class="mt-10">
    <Carousel
      class="relative mt-10 w-full"
      :opts="{
        align: 'center',

      }"
    >
      <CarouselContent class="ml-5 w-[1158px]">
        <CarouselItem v-for="(_, index) in 4" :key="index" class="">
          <div class="rounded-3xl bg-[#4A5759] py-32 pl-16">
            <h3 class="text-4xl font-semibold text-[#FFDCCD]">
              Скидка при заказе на сайте
            </h3>
            <p class="mt-3 max-w-[527px] text-xl text-[#FFDCCD]">
              Мы дарим Вам постоянную скидку при оформлении заказа на сайте
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
  <div class="mt-[100px]">
    <div class="flex gap-11">
      <h2 class="text-3xl font-semibold">
        Все категории
      </h2>
      <span class="self-end text-lg text-[#7A7A7A]">Все категории</span>
    </div>

    <ul class="mt-10 grid grid-cols-5 gap-6">
      <li v-for="(_, index) in 5" :key="index" class="relative h-[253px] overflow-hidden rounded-3xl bg-[#F1F4FA] p-5">
        <p>Подложки/подставки для торта</p>
        <img src="/assets/img/catalog-item.png" class="absolute bottom-0 right-0 size-[220px]" alt="Item">
      </li>
    </ul>
  </div>

  <div class="mt-[100px]">
    <div class="flex gap-11">
      <h2 class="text-3xl font-semibold">
        Товары по акции
      </h2>
      <span class="self-end text-lg text-[#7A7A7A]">Все товары</span>
    </div>

    <div class="mt-10 grid grid-cols-5">
      <CardsItemCard v-for="(_, index) in 5" :key="index" />
    </div>
  </div>

  <div class="mt-[100px]">
    <h2 class="text-3xl font-semibold">
      Наши преимущества
    </h2>

    <ul class="mt-16 flex justify-between">
      <li class="flex max-w-[390px] flex-col gap-10">
        <div class="self-start rounded-xl bg-[#4A5759] p-5">
          <Truck class="size-11 stroke-[#FFDCCD]" />
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="text-xl font-semibold">
            Быстрая доставка
          </h4>
          <p>Гарантированная скорость доставки, чтобы получить свои заказы быстрее и без задержек</p>
        </div>
      </li>

      <li class="flex max-w-[390px] flex-col gap-10">
        <div class="self-start rounded-xl bg-[#4A5759] p-5">
          <ShoppingCart class="size-11 stroke-[#FFDCCD]" />
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="text-xl font-semibold">
            Широкий ассортимент
          </h4>
          <p>Разнообразие товаров для каждого вкуса и потребности, чтобы найти идеальный продукт</p>
        </div>
      </li>

      <li class="flex max-w-[390px] flex-col gap-10">
        <div class="self-start rounded-xl bg-[#4A5759] p-5">
          <ThumbsUp class="size-11 stroke-[#FFDCCD]" />
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="text-xl font-semibold">
            Высокое качество
          </h4>
          <p>Премиум качество на каждом этапе процесса, обеспечивающее ваше доверие и уверенность</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="my-[100px]">
    <h2 class="text-3xl font-semibold">
      Отзывы
    </h2>

    <Carousel class="mt-10">
      <CarouselContent>
        <CarouselItem v-for="(_, index) in 4" :key="index">
          <div class="rounded-3xl bg-[#CCE3DE] px-24 py-20">
            <div class="flex items-center justify-center gap-10">
              <Avatar class="size-[166px] border-4 border-[#4a5759]">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div class="flex flex-col gap-4">
                <p class="text-[40px] font-semibold text-[#4A5759]">
                  Саида Рустамова
                </p>
                <p class="text-xl text-[#4A5759]">
                  Заказывала во многоих кондитерских магазинах, но остановилась именно на Чило Эксклюзив. Отличный магазин с наверно лучшими ценами в Таджикистане. Заказываю всегда доставку и курьер привозят всегда вовремя в договоренный промежуток времени.
                </p>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-10 border-none bg-[#4A5759] stroke-[#FFDCCD]" />
      <CarouselNext class="right-10 border-none bg-[#4A5759]" />
    </Carousel>
  </div>
</template>
