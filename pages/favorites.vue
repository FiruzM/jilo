<script setup lang="ts">
const user = useAuthUser()
</script>

<template>
  <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 lg:flex lg:px-10 lg:pb-16 lg:pt-11">
    <ClientOnly v-if="user">
      <AsidebarProfile class="hidden shrink-0 grow self-start lg:block" />
    </ClientOnly>
    <div>
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            Избранное
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

      <div class="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:mt-14 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-5">
        <CardsItemCard v-for="(_, index) in 8" :key="index" />
      </div>
    </div>
  </div>
</template>
