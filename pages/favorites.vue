<script setup lang="ts">
const user = useAuthUser()
const { t } = useI18n()

useHead({
  title: t('favorites'),
  meta: [
    { name: 'title', content: t('favorites') },
  ],
})

const favorite: any = useLocalStorage('favorite', [])
</script>

<template>
  <div v-if="favorite.length > 0" class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 lg:flex lg:px-10 lg:pb-16 lg:pt-11">
    <ClientOnly v-if="user">
      <AsidebarProfile class="hidden shrink-0 grow self-start lg:block" />
    </ClientOnly>
    <div>
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            {{ $t('favorites') }}
          </h2>
        </div>

        <div class="flex items-center gap-4">
          <div>
            <p class="text-sm">
              {{ $t('sort_by') }}:
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
                    {{ $t('popular') }}
                  </SelectItem>

                  <SelectItem value="cheap">
                    {{ $t('cheaper_first') }}
                  </SelectItem>

                  <SelectItem value="expensive">
                    {{ $t('expensive_first') }}
                  </SelectItem>

                  <SelectItem value="new">
                    {{ $t('new') }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:mt-14 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-5">
        <CardsItemCard v-for="product in favorite" :key="product.id" :product="product" @click="$router.push(`/product/${product.id}`)" />
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center">
    <div class="relative">
      <img src="~/assets/img/favorite.png" alt="Favorites" class="size-[300px] md:size-[516px]">
      <h4 class="absolute bottom-10 left-[30px] w-full text-xl font-semibold md:bottom-16 md:left-[50px] md:text-4xl">
        {{ $t('empty_favorites') }}
      </h4>
    </div>
  </div>
</template>
