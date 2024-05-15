<template>
  <div class="mx-auto max-w-[1360px] pb-16 pt-11">
    <div class="grow">
      <div class="flex items-center justify-between">
        <div class="flex gap-5">
          <h2 class="text-3xl font-semibold">
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
              <SelectTrigger class="w-44 rounded-xl text-black">
                <SelectValue placeholder="Выберите параметр" />
              </SelectTrigger>
              <SelectContent class="w-44">
                <SelectGroup>
                  <SelectItem value="apple">
                    Apple
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div class="mt-14 grid grid-cols-5 gap-y-10">
        <CardsItemCard v-for="(_, index) in 8" :key="index" />
      </div>
    </div>
  </div>
</template>
