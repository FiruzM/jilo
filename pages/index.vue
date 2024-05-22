<script setup lang="ts">
import { ShoppingCart, ThumbsUp, Truck } from 'lucide-vue-next'
</script>

<template>
  <div class="mt-5 px-4 lg:mt-10 lg:px-10 xl:pr-0">
    <Carousel
      class="relative w-full"
      :opts="{
        align: 'center',

      }"
    >
      <CarouselContent class="xl:w-[1158px]">
        <CarouselItem v-for="(_, index) in 4" :key="index">
          <div class="flex h-[200px] flex-col items-center rounded-3xl bg-primary-foreground px-[14px] py-5 lg:h-auto lg:items-start lg:py-32 lg:pl-16">
            <h3 class="text-2xl font-semibold text-[#FFDCCD] sm:text-3xl">
              Скидка при заказе на сайте
            </h3>
            <p class="mt-[6px] max-w-[265px] text-center text-xs text-[#FFDCCD] sm:mt-3 sm:max-w-[527px] sm:text-base md:text-lg lg:text-left lg:text-xl">
              Мы дарим Вам постоянную скидку при оформлении заказа на сайте
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>

  <div class="mx-auto max-w-[1360px] px-4 lg:px-10">
    <div class="mt-10 lg:mt-[100px]">
      <div class="flex gap-11">
        <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
          Все категории
        </h2>
        <span class="hidden self-end text-lg text-[#7A7A7A] xl:inline">Все категории</span>
      </div>

      <ul class="mt-5 flex flex-wrap gap-2.5 lg:mt-10 lg:gap-6 xl:grid xl:grid-cols-5">
        <li v-for="(_, index) in 5" :key="index" class="relative h-[127px] grow overflow-hidden rounded-[12px] bg-[#F1F4FA] p-5 md:h-[253px] lg:rounded-3xl">
          <p class="w-[105px] text-xs font-semibold text-primary-foreground sm:w-[205px] sm:text-base md:text-[18px] xl:w-auto">
            Подложки/подставки для торта
          </p>
          <img src="/assets/img/catalog-item.png" class="absolute bottom-0 right-0 size-[76px] sm:size-[96px] lg:size-[186px]" alt="Item">
        </li>
      </ul>
    </div>

    <div class="mt-10 lg:mt-[100px]">
      <div class="flex gap-11">
        <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
          Товары по акции
        </h2>
        <span class="hidden self-end text-lg text-[#7A7A7A] xl:inline">Все товары</span>
      </div>

      <div class="mt-5 lg:mt-10">
        <Carousel
          class="relative w-full"
          :opts="{
            align: 'center',
          }"
        >
          <CarouselContent>
            <CarouselItem v-for="(_, index) in 5" :key="index" class="basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <CardsItemCard @click="() => $router.push('/category/items')" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>

    <div class="mt-10 lg:mt-[92px]">
      <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
        Наши преимущества
      </h2>

      <ul class="mt-5 grid grid-cols-2 gap-7 sm:grid-cols-3 lg:mt-16">
        <li class="flex flex-col gap-2.5 md:gap-5 lg:max-w-[390px] lg:gap-10">
          <div class="self-start rounded-lg bg-primary-foreground p-2.5 md:rounded-xl md:p-5">
            <Truck class="size-[22px] stroke-[#FFDCCD] md:size-11" />
          </div>
          <div class="flex flex-col gap-1 md:gap-3 lg:gap-4">
            <h4 class="text-xs font-semibold sm:text-sm md:text-base lg:text-xl">
              Быстрая доставка
            </h4>
            <p class="text-[9px] leading-[160%] sm:text-xs  md:text-sm lg:text-base">
              Гарантированная скорость доставки, чтобы получить свои заказы быстрее и без задержек
            </p>
          </div>
        </li>

        <li class="flex max-w-[390px] flex-col gap-2.5 md:gap-5 lg:gap-10">
          <div class="self-start rounded-lg bg-primary-foreground p-2.5 md:rounded-xl md:p-5">
            <ShoppingCart class="size-[22px] stroke-[#FFDCCD] md:size-11" />
          </div>
          <div class="flex flex-col gap-1 md:gap-3 lg:gap-4">
            <h4 class="text-xs font-semibold sm:text-sm md:text-base lg:text-xl">
              Широкий ассортимент
            </h4>
            <p class="text-[9px] leading-[160%] sm:text-xs md:text-sm lg:text-base">
              Разнообразие товаров для каждого вкуса и потребности, чтобы найти идеальный продукт
            </p>
          </div>
        </li>

        <li class="flex max-w-[390px] flex-col gap-2.5 md:gap-5 lg:gap-10">
          <div class="self-start rounded-lg bg-primary-foreground p-2.5 md:rounded-xl md:p-5">
            <ThumbsUp class="size-[22px] stroke-[#FFDCCD] md:size-11" />
          </div>
          <div class="flex flex-col gap-1 md:gap-3 lg:gap-4">
            <h4 class="text-xs font-semibold sm:text-sm md:text-base lg:text-xl">
              Высокое качество
            </h4>
            <p class="xl text-[9px] leading-[160%]  sm:text-xs md:text-sm lg:text-base">
              Премиум качество на каждом этапе процесса, обеспечивающее ваше доверие и уверенность
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="my-10 lg:my-[100px]">
      <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
        Отзывы
      </h2>

      <Carousel class="mt-5 lg:mt-10">
        <CarouselContent>
          <CarouselItem v-for="(_, index) in 4" :key="index">
            <div class="relative rounded-[12px] bg-[#CCE3DE] p-5 lg:rounded-3xl lg:px-24 lg:py-20">
              <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
                <Avatar class="size-[83px] border-4 border-primary-foreground sm:size-[103px] lg:size-[166px]">
                  <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div class="flex flex-col gap-2 md:gap-4">
                  <p class="text-xl font-semibold text-primary-foreground sm:text-3xl lg:text-[40px]">
                    Саида Рустамова
                  </p>
                  <p class="text-sm text-primary-foreground sm:text-base lg:text-xl">
                    Заказывала во многоих кондитерских магазинах, но остановилась именно на Чило Эксклюзив. Отличный магазин с наверно лучшими ценами в Таджикистане. Заказываю всегда доставку и курьер привозят всегда вовремя в договоренный промежуток времени.
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div class="absolute right-20 top-10 flex lg:hidden">
          <CarouselPrevious class="-left-10 border-none bg-primary-foreground stroke-[#FFDCCD]" />
          <CarouselNext class="border-none bg-primary-foreground " />
        </div>

        <CarouselPrevious class="left-10 hidden border-none bg-primary-foreground stroke-[#FFDCCD] lg:flex" />
        <CarouselNext class="right-10 hidden border-none bg-primary-foreground lg:flex" />
      </Carousel>
    </div>
  </div>
</template>
