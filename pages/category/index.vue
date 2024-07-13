<script setup lang="ts">
</script>

<template>
  <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-11">
    <div class="grow">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div class="flex gap-5">
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            Все категории
          </h2>
        </div>

        <div class="flex items-center gap-4">
          <div>
            <p class="text-sm">
              Сортировать по:
            </p>
          </div>

          <div>
            <Select>
              <SelectTrigger class="h-9 w-[180px] rounded-[12px] border-[#D5D5D5] text-black">
                <SelectValue placeholder="Выберите параметр" />
              </SelectTrigger>
              <SelectContent class="w-[180px] rounded-[12px] border-[#D5D5D5]">
                <SelectGroup>
                  <SelectItem value="popular">
                    Популярные
                  </SelectItem>

                  <SelectItem value="cheap">
                    Сначала дешевле
                  </SelectItem>

                  <SelectItem value="expensive">
                    Сначала дороже
                  </SelectItem>

                  <SelectItem value="new">
                    Новинки
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ul class="mt-6 flex flex-wrap gap-2.5 lg:mt-14 xl:grid xl:grid-cols-4 xl:gap-6 xl:[&>*:nth-child(2)]:col-span-2">
        <li v-for="(_, index) in 5" :key="index" class="relative h-[127px] grow overflow-hidden rounded-3xl bg-[#F1F4FA] p-5 first:col-span-2 md:h-[253px] ">
          <p class="w-[105px] text-xs font-semibold text-primary-foreground sm:w-[205px] sm:text-base md:text-[18px] xl:w-auto">
            Подложки/подставки для торта
          </p>
          <!-- <img src="~/assets/img/catalog-item.png" class="absolute bottom-0 right-0 size-[76px] sm:size-[96px] lg:size-[186px]" alt="Item"> -->
        </li>
      </ul>
    </div>
  </div>
</template>
