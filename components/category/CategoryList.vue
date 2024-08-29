<script setup lang="ts">
import { getMainCategories } from '~/api/web/categories/get-main-categories'

const {
  data: categories,
  isPending: isCategoriesPending,

} = useQuery({
  queryKey: ['categories'],
  queryFn: () => getMainCategories(),
  refetchOnWindowFocus: false,
})
</script>

<template>
  <div>
    <ul v-if="isCategoriesPending" class="mt-5 flex flex-wrap gap-2.5 lg:mt-10 lg:gap-6 xl:grid xl:grid-cols-5">
      <li v-for="i in 5" :key="i" class="relative h-[127px] grow overflow-hidden rounded-[12px] border-4 border-white bg-[#F1F4FA] p-5 transition-all ease-in hover:border-[#CCE3DE] md:h-[253px] lg:rounded-3xl">
        <Skeleton class="size-full w-[118px]" />
      </li>
    </ul>

    <ul v-else class="mt-5 flex flex-wrap gap-2.5 lg:mt-10 lg:gap-6 xl:grid xl:grid-cols-5">
      <li
        v-for="category in categories?.payload.data"
        :key="category.id"
        class="relative h-[127px] grow overflow-hidden rounded-[12px] border-4 border-white bg-[#F1F4FA] p-5 transition-all ease-in hover:border-[#CCE3DE] md:h-[253px] lg:rounded-3xl"
        @click="$router.push(`/category/${category.id}`)"
      >
        <p class="w-[105px] text-xs font-semibold text-primary-foreground sm:w-[205px] sm:text-base md:text-[18px] xl:w-auto">
          {{ category.name }}
        </p>
        <img :src="category.file_path" class="absolute bottom-0 right-0 size-[76px] sm:size-[96px] lg:size-[160px]" alt="Item">
      </li>
    </ul>
  </div>
</template>
