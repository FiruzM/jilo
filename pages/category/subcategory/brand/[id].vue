<script setup lang="ts">
import { ChevronRight, ListFilter, Loader2, Minus } from 'lucide-vue-next'
import { getBrandProducts } from '~/api/web/products/get-brands-products'
import { getBrand } from '~/api/web/brands/get-brand'

const isOpen = ref(false)

const params: any = useRoute().params

const {
  data: products,
  isPending: productsPending,
  fetchNextPage: fetchNextProducts,
  isFetchingNextPage: isFetchingNextProducts,
} = useInfiniteQuery({
  queryKey: [`brandProducts`, params],
  queryFn: ({ pageParam }) => getBrandProducts(pageParam, params.id),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

const { data: brand, isPending: brandPending } = useQuery({
  queryKey: ['brand', params],
  queryFn: () => getBrand(params.id),
})
</script>

<template>
  <div v-if="productsPending || brandPending" class="flex justify-center">
    <Loader2 class="mt-[100px] animate-spin stroke-primary" />
  </div>
  <ClientOnly v-else>
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
            <BreadcrumbLink :href="`/category/${brand?.payload.id}`">
              {{ brand?.payload.name }}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="mt-11 flex gap-7">
        <div class="hidden max-w-[250px] shrink-0 lg:block">
          <ScrollArea class="h-svh">
            <Collapsible v-model:open="isOpen">
              <CollapsibleTrigger class="flex items-center">
                <ChevronRight :class="isOpen ? 'transition-all ease-in rotate-90' : 'transition-all ease-in'" />
                <span class="font-semibold">Купить жильё</span>
              </CollapsibleTrigger>
              <CollapsibleContent class="ml-6 mt-6 flex flex-col gap-4">
                <div>Все квартиры</div>
                <div>Вторичка</div>
                <div>Вторичка</div>
                <div>Вторичка</div>
              </CollapsibleContent>
            </Collapsible>

            <div class="mt-6">
              <p class="mb-4 font-semibold">
                Количество комнат
              </p>
              <div class="flex flex-col gap-4">
                <div class="flex items-center space-x-2">
                  <Checkbox id="studio" />
                  <label
                    for="studio"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Студия
                  </label>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="studio" />
                  <label
                    for="studio"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Студия
                  </label>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="studio" />
                  <label
                    for="studio"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Студия
                  </label>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="studio" />
                  <label
                    for="studio"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Студия
                  </label>
                </div>
              </div>
            </div>

            <div>
              <p class="mt-6 font-semibold">
                Цена, ₽
              </p>

              <div class="mt-4 flex items-center gap-2.5">
                <Input class="rounded-lg" placeholder="от" />
                <Minus />
                <Input class="rounded-lg" placeholder="до" />
              </div>
            </div>
          </ScrollArea>
        </div>

        <div class="grow">
          <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex gap-5">
              <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
                {{ brand?.payload.name }}
              </h2>
              <span class="hidden self-end text-sm font-semibold text-[#7a7a7a] lg:block">{{ products?.pages[products.pages.length - 1].payload.meta.total }} {{ $t('products') }}</span>
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
                    <Collapsible v-model:open="isOpen">
                      <CollapsibleTrigger class="flex items-center">
                        <ChevronRight :class="isOpen ? 'transition-all ease-in rotate-90' : 'transition-all ease-in'" />
                        <span class="font-semibold">Купить жильё</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent class="ml-6 mt-6 flex flex-col gap-4">
                        <div>Все квартиры</div>
                        <div>Вторичка</div>
                        <div>Вторичка</div>
                        <div>Вторичка</div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div class="mt-2">
                      <p class="mb-4 font-semibold">
                        Количество комнат
                      </p>
                      <div class="flex flex-col gap-4">
                        <div class="flex items-center space-x-2">
                          <Checkbox id="studio" />
                          <label
                            for="studio"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Студия
                          </label>
                        </div>

                        <div class="flex items-center space-x-2">
                          <Checkbox id="studio" />
                          <label
                            for="studio"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Студия
                          </label>
                        </div>

                        <div class="flex items-center space-x-2">
                          <Checkbox id="studio" />
                          <label
                            for="studio"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Студия
                          </label>
                        </div>

                        <div class="flex items-center space-x-2">
                          <Checkbox id="studio" />
                          <label
                            for="studio"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Студия
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p class="mt-6 font-semibold">
                        Цена, ₽
                      </p>

                      <div class="mt-4 flex items-center gap-2.5">
                        <Input class="rounded-lg" placeholder="от" />
                        <Minus />
                        <Input class="rounded-lg" placeholder="до" />
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>

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
  </ClientOnly>
</template>
