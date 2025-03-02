<script setup lang="ts">
import { ListFilter, Loader2, Minus } from 'lucide-vue-next'
import { getCategoriesProducts } from '~/api/web/products/get-categories-products'
import { getCategory } from '~/api/web/categories/get-category'
import { getSubcategories } from '~/api/web/subcategories/get-subcategories'

const params: any = useRoute().params
const route = useRoute()

const minPriceQuery = useRouteQuery<string | undefined>('min_price', '')
const maxPriceQuery = useRouteQuery<string | undefined>('max_price', '')

const queryParams = refDebounced(computed(() => ({
  ...route.query,
})), 400)

const {
  data: products,
  isPending: productsPending,
  fetchNextPage: fetchNextProducts,
  isFetchingNextPage: isFetchingNextProducts,
} = useInfiniteQuery({
  queryKey: [`categoryProducts`, params, queryParams],
  queryFn: ({ pageParam }) => getCategoriesProducts(pageParam, params.id, queryParams.value),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

const { data: category, isPending: categoryPending, suspense } = useQuery({
  queryKey: ['category', params],
  queryFn: () => getCategory(params.id),
})

const {
  data: subcategories,
  fetchNextPage,
  isFetchingNextPage,
  isPending: subcategoriesPending,

} = useInfiniteQuery({
  queryKey: ['categorySubcategories', params],
  queryFn: ({ pageParam }) => getSubcategories(pageParam, params.id),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

await suspense()

useHead({
  title: category.value?.payload.name,
  meta: [
    { name: 'title', content: category.value?.payload.name },
    { name: 'keywords', content: category.value?.payload.name },
  ],
})
</script>

<template>
  <div v-if="productsPending || categoryPending || subcategoriesPending" class="flex justify-center">
    <Loader2 class="mt-[100px] animate-spin stroke-primary" />
  </div>
  <CLientOnly v-else>
    <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-11">
      <Breadcrumb class="hidden lg:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">
              {{ $t('catalog') }}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink :href="`/category/${category?.payload.id}`">
              {{ category?.payload.name }}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="mt-5 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex gap-5">
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            {{ category?.payload.name }}
          </h2>
          <span class="hidden self-end text-sm font-semibold text-[#7a7a7a] lg:block">{{ products?.pages[products.pages.length - 1].payload.meta.total }} {{ $t('product') }}</span>
        </div>

        <div class="hidden items-center gap-4 lg:flex">
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

        <div class="flex lg:hidden">
          <Select>
            <SelectTrigger class="h-9 w-[172px] rounded-[12px] rounded-r-none border-[#D5D5D5] text-xs text-primary-foreground">
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

          <Sheet>
            <SheetTrigger class="flex items-center gap-2 rounded-[12px] rounded-l-none border border-l-0 border-[#D5D5D5] px-11 text-xs text-primary-foreground">
              <ListFilter />
              {{ $t('filters') }}
            </SheetTrigger>
            <SheetContent side="top">
              <ScrollArea class="h-svh">
                <div>
                  <p class="mt-6 font-semibold">
                    Цена
                  </p>

                  <div class="mt-4 flex items-center gap-2.5">
                    <Input v-model="minPriceQuery" class="rounded-lg" placeholder="от" />
                    <Minus />
                    <Input v-model="maxPriceQuery" class="rounded-lg" placeholder="до" />
                  </div>
                </div>

                <Button class="mt-5">
                  {{ $t('apply') }}
                </Button>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div v-if="subcategories?.pages[0].payload.data">
        <ul class="scrollbar-hide mt-8 flex items-center gap-x-2 gap-y-2.5 overflow-auto sm:gap-x-5 lg:gap-5">
          <template v-for="(data, index) in subcategories?.pages" :key="index">
            <li v-for="subcategory in data?.payload.data" :key="subcategory.id" class="shrink-0 grow rounded-[12px] border border-[#4A5759] px-2.5 py-[5px] text-sm text-[#4A5759] transition-all ease-in hover:bg-[#4A5759] hover:text-[#ffdbd0] md:px-5 md:py-2.5 md:text-base">
              <NuxtLink :to="`/category/subcategory/${subcategory.id}`">
                {{ subcategory.name }}
              </NuxtLink>
            </li>
          </template>
          <div class="">
            <Button
              class="size-auto bg-transparent p-0 text-[#4A5759] hover:bg-transparent"
              :disabled="subcategories?.pages[subcategories.pages.length - 1].payload.meta.current_page === subcategories?.pages[subcategories.pages.length - 1].payload.meta.last_page || isFetchingNextPage"
              :is-loading="isFetchingNextPage"
              @click="() => fetchNextPage()"
            >
              {{ $t('upload_more') }}
            </Button>
          </div>
        </ul>
      </div>

      <div class="mt-5 flex gap-7">
        <div class="hidden max-w-[250px] shrink-0 lg:block">
          <ScrollArea class="h-svh">
            <div>
              <p class="mt-6 font-semibold">
                Цена
              </p>

              <div class="mt-4 flex items-center gap-2.5">
                <Input v-model="minPriceQuery" class="rounded-lg" placeholder="от" />
                <Minus />
                <Input v-model="maxPriceQuery" class="rounded-lg" placeholder="до" />
              </div>
            </div>
          </ScrollArea>
        </div>

        <div class="grow">
          <div class="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:mt-14 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-5">
            <template v-for="(data, index) in products?.pages" :key="index">
              <CardsItemCard v-for="product in data?.payload.data" :key="product.id" :product="product" @click="() => $router.push(`/product/${product.id}`)" />
            </template>
          </div>
          <div class="flex justify-center">
            <Button
              class="mt-16 rounded-xl border border-primary bg-transparent"
              :disabled="products?.pages[products.pages.length - 1].payload.meta.current_page === products?.pages[products.pages.length - 1].payload.meta.last_page || isFetchingNextProducts"
              :is-loading="isFetchingNextProducts"
              @click="() => fetchNextProducts()"
            >
              {{ $t('show_more') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </CLientOnly>
</template>
