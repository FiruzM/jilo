<script setup lang="ts">
import { Eye, FileX, ListFilter, Search, Trash } from 'lucide-vue-next'
import qs from 'qs'
import { getInfiniteCategories } from '~/api/admin/categories/get-infinite-categories'
import { deleteProduct } from '~/api/admin/products/delete-product'
import { getProducts } from '~/api/admin/products/get-products'
import { getInfiniteSubcategories } from '~/api/admin/subcategories/get-infinite-subcategories'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Товары',
})

const { toast } = useToast()
const route = useRoute()
const searchParams = computed(() => qs.stringify(route.query))

const { data: products, refetch, isPending } = useQuery({
  queryKey: ['products', searchParams],
  queryFn: getProducts,
})

const isPopoverOpen = ref(false)
const enabled = computed(() => !!isPopoverOpen.value)

const {
  data: categories,
  fetchNextPage: fetchNextCategories,
  isFetchingNextPage: isFetchingNextCategories,

} = useInfiniteQuery({
  queryKey: ['categories'],
  queryFn: ({ pageParam }) => getInfiniteCategories(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
  enabled,
})

const {
  data: subcategories,
  fetchNextPage,
  isFetchingNextPage,

} = useInfiniteQuery({
  queryKey: ['subcategories'],
  queryFn: ({ pageParam }) => getInfiniteSubcategories(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
  enabled,
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteProduct(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Товар успешно удален',
    })
  },
})

const router = useRouter()

// @ts-expect-error: arr might be empty
const initialParams = computed(() => qs.parse(route.query))

const params = reactive({
  ...initialParams.value,
})

const setSearchParams = useDebounceFn(() => {
  const searchParams = qs.stringify({
    ...params,

  }, {
    skipNulls: true,
    filter: (_prefix, value) => value || undefined,
  })

  router.replace({
    // @ts-expect-error: arr might be empty
    query: qs.parse(searchParams),
  })
}, 400)

watch([params], () => setSearchParams())
</script>

<template>
  <div class="mb-5 flex justify-end gap-5">
    <div class="relative shrink">
      <Input
        v-model="params.name" type="search" class="h-[40px] border-[#3c83ed] pl-10 placeholder:font-medium placeholder:text-[#3c83ed] placeholder:opacity-25 focus:border-[#10a4e9]"
        placeholder="Поиск"
      />
      <Search class="absolute left-3 top-2 stroke-[#3c83ed] opacity-25" />
    </div>
    <Popover v-model:open="isPopoverOpen">
      <PopoverTrigger>
        <Button class="rounded-lg bg-[#3c83ed] px-7 text-xs text-white hover:bg-[#3c83ed] sm:text-base">
          <ListFilter class="mr-2.5 hidden sm:block" />
          Фильтр
        </Button>
      </PopoverTrigger>

      <PopoverContent class="space-y-2">
        <Select v-model="params.category_id">
          <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
            <SelectValue placeholder="Список категорий" />
          </SelectTrigger>
          <SelectContent class="border-[#3c83ed]">
            <SelectGroup>
              <template v-for="(data, index) in categories?.pages" :key="index">
                <SelectItem v-for="category in data.payload.data" :key="category.id" :value="category.id!.toString()">
                  {{ category.name }}
                </SelectItem>
              </template>
              <div class="flex justify-center">
                <Button
                  class="size-auto bg-transparent p-0 pt-2 text-[#3c83ed] hover:bg-transparent"
                  :disabled="categories?.pages[categories?.pages.length - 1].payload.meta.current_page === categories?.pages[categories?.pages.length - 1].payload.meta.last_page || isFetchingNextCategories"
                  :is-loading="isFetchingNextCategories"
                  @click="() => fetchNextCategories()"
                >
                  Загрузить еще
                </Button>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select v-model="params.subcategory_id">
          <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
            <SelectValue placeholder="Список подкатегорий" />
          </SelectTrigger>
          <SelectContent class="border-[#3c83ed]">
            <SelectGroup>
              <template v-for="(data, index) in subcategories?.pages" :key="index">
                <SelectItem v-for="subcategory in data.payload.data" :key="subcategory.id" :value="subcategory.id!.toString()">
                  {{ subcategory.name }}
                </SelectItem>
              </template>
              <div class="flex justify-center">
                <Button
                  class="size-auto bg-transparent p-0 pt-2 text-[#3c83ed] hover:bg-transparent"
                  :disabled="subcategories?.pages[subcategories.pages.length - 1].payload.meta.current_page === subcategories?.pages[subcategories.pages.length - 1].payload.meta.last_page || isFetchingNextPage"
                  :is-loading="isFetchingNextPage"
                  @click="() => fetchNextPage()"
                >
                  Загрузить еще
                </Button>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="outline" class="w-full border-0 bg-[#3c83ed] text-white hover:bg-[#3c83ed]"
          @click="() => {
            router.replace({
              query: [],
            })
            Object.assign(params, {
              subcategory_id: undefined,
              category_id: undefined,
              name: null,
            })
            isPopoverOpen = false
          }"
        >
          Сбросить
        </Button>
      </PopoverContent>
    </Popover>
  </div>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Название</TableHead>
        <TableHead>Цена</TableHead>
        <TableHead>Старая цена</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="!products?.payload && !isPending" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="5" />

      <TableRow v-for="(product) in products?.payload.data" v-else :key="product.id">
        <TableCell>{{ product.name }}</TableCell>
        <TableCell>
          {{ product.price }} см
        </TableCell>
        <TableCell>
          {{ product.old_price }} см
        </TableCell>
        <TableCell>
          <div class="flex gap-4">
            <NuxtLink :to="`/admin/products/${product.id}`">
              <Eye class="cursor-pointer stroke-[#3c83ed]" />
            </NuxtLink>

            <AlertDialog>
              <AlertDialogTrigger><Trash class="cursor-pointer stroke-[#3c83ed]" /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogDescription>
                    Вы действительно хотите удалить?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Нет</AlertDialogCancel>
                  <AlertDialogAction @click="mutate(product.id)">
                    Да
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <div v-if="products?.payload" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="products?.payload.meta.total"
      :sibling-count="1"
      show-edges
      :default-page="$route.query.page ? Number($route.query.page) : 1"
      @update:page="$router.push({ query: { page: $event } })"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst class="border-[#488bee]" />
        <PaginationPrev class="border-[#488bee]" />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="size-10 p-0" :class="item.value === page ? 'bg-[#488bee] text-white hover:bg-[#488bee]' : 'bg-white border border-[#488bee] hover:bg-[#488bee]'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext class="border-[#488bee]" />
        <PaginationLast class="border-[#488bee]" />
      </PaginationList>
    </Pagination>
  </div>

  <div class="mt-10 flex justify-end">
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/products/create')">
      Добавить товар
    </Button>
  </div>
</template>
