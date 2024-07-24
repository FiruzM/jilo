<script setup lang="ts">
import { getInfiniteCategories } from '~/api/admin/categories/get-infinite-categories'

const {
  data: categories,
  fetchNextPage: fetchNextCategories,
  isFetchingNextPage: isFetchingNextCategories,
  suspense,

} = useInfiniteQuery({
  queryKey: ['categories'],
  queryFn: ({ pageParam }) => getInfiniteCategories(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

await suspense()
</script>

<template>
  <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-11">
    <div class="grow">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div class="flex gap-5">
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            {{ $t('all_categories') }}
          </h2>
        </div>
      </div>

      <ul class="mt-6 flex flex-wrap gap-2.5 lg:mt-14 xl:grid xl:grid-cols-4 xl:gap-6 xl:[&>*:nth-child(2)]:col-span-2">
        <template v-for="(data, index) in categories?.pages" :key="index">
          <li v-for="(category) in data.payload.data" :key="category.id" class="relative h-[127px] grow overflow-hidden rounded-3xl border-4 border-white bg-[#F1F4FA] p-5 transition-all ease-in first:col-span-2 hover:border-[#CCE3DE] md:h-[253px]" @click="$router.push(`/category/${category.id}`)">
            <p class="w-[105px] text-xs font-semibold text-primary-foreground sm:w-[205px] sm:text-base md:text-[18px] xl:w-auto">
              {{ category.name }}
            </p>
            <img :src="category.file_path" class="absolute bottom-0 right-0 size-[76px] sm:size-[96px] lg:size-[186px]" alt="Item">
          </li>
        </template>
      </ul>
      <div class="flex justify-center">
        <Button
          class="mt-16 rounded-xl border border-primary bg-transparent"
          :disabled="categories?.pages[categories.pages.length - 1].payload.meta.current_page === categories?.pages[categories.pages.length - 1].payload.meta.last_page || isFetchingNextCategories"
          :is-loading="isFetchingNextCategories"
          @click="() => fetchNextCategories()"
        >
          {{ $t('show_more') }}
        </Button>
      </div>
    </div>
  </div>
</template>
