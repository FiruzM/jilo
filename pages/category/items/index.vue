<script setup>
import { Box, LucideAlertCircle, Minus, Plus, Truck } from 'lucide-vue-next'
</script>

<template>
  <div class="mx-auto mt-10 max-w-[1360px]">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/category">
            Каталог товаров
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/category/krasitely">
            Красители
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Жирорастворимые красители</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="flex gap-16 pb-36 pt-4">
      <div class="rounded-3xl bg-[#F1F4FA] px-[135px] py-12">
        <img src="/assets/img/glazur.png" alt="Logo" class="size-[450px]">
      </div>

      <div class="flex flex-col gap-6">
        <p class="self-start rounded-full bg-[#4A5759] px-2 py-1 text-sm font-semibold text-[#FFDCCD]">
          New!
        </p>
        <div>
          <h2 class="max-w-[574px] text-4xl font-semibold">
            Глазурь темная Master Martini 200 гр
          </h2>
          <p class="mt-2 text-4xl font-semibold text-[#9AA6AC]">
            12,00 с/шт
          </p>
        </div>

        <p class="text-sm text-[#6E7C87]">
          Артикул 107293
        </p>

        <div class="flex max-w-96 flex-col gap-6">
          <div class="flex gap-6">
            <div class="flex items-center gap-2">
              <div class="rounded-full bg-[#F7F8F9] p-1">
                <Minus />
              </div>
              <span class="font-semibold">1</span>
              <div class="rounded-full bg-[#F7F8F9] p-1">
                <Plus />
              </div>
            </div>
            <Button class="grow rounded-xl">
              Добавить в корзину
            </Button>
          </div>

          <Button class="rounded-xl border border-primary bg-transparent">
            Купить в один клик
          </Button>
        </div>

        <div>
          <ul>
            <li class="flex gap-2 border-b border-[#E5E9EB] py-2 text-sm">
              <Truck class="stroke-[#9AA6AC]" />
              <span class="border-b border-[#242424]">Рассчитать доставку</span>
            </li>

            <li class="flex gap-2 border-b border-[#E5E9EB] py-2 text-sm">
              <Box class="stroke-[#9AA6AC]" />
              <span>Наличие на складе <span class="font-semibold text-[#368C18]">Много</span></span>
            </li>

            <li class="flex gap-2 border-b border-[#E5E9EB] py-2 text-sm">
              <LucideAlertCircle class="stroke-[#9AA6AC]" />
              <span>Самовывоз сегодня - бесплатно <br> Доставка завтра - от 0 ₽</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
