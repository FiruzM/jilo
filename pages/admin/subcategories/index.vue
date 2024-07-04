<script setup lang="ts">
import { Eye, FileX, ListFilter, Trash } from 'lucide-vue-next'
import qs from 'qs'
import { getCategories } from '~/api/admin/categories/get-categories'
import { deleteSubcategory } from '~/api/admin/subcategories/delete-subcategory'
import { getSubcategories } from '~/api/admin/subcategories/get-subcategories'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Подкатегории',
})

const { toast } = useToast()
const route = useRoute()
const searchParams = computed(() => qs.stringify(route.query))
const isPopoverOpen = ref(false)
const enabled = computed(() => !!isPopoverOpen.value)

const { data: subcategories, isPending, refetch } = useQuery({
  queryKey: ['subcategories', searchParams],
  queryFn: () => getSubcategories(),
})

const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories(),
  enabled,
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteSubcategory(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Подкатегория успешно удалена',
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
  <div class="mb-5 flex justify-end">
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
              <SelectItem v-for="category in categories?.payload" :key="category.id" :value="category.id!.toString()">
                {{ category.name }}
              </SelectItem>
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
              category_id: undefined,
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
        <TableHead>
          №
        </TableHead>
        <TableHead>Название</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="!subcategories?.payload && !isPending" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="3" />

      <TableRow v-for="(subcategory, index) in subcategories?.payload" :key="subcategory.id">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>
        <TableCell>{{ subcategory.name }}</TableCell>

        <TableCell>
          <div class="flex gap-4">
            <NuxtLink :to="`/admin/subcategories/${subcategory.id}`">
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
                  <AlertDialogAction @click="mutate(subcategory.id)">
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

  <div v-if="subcategories?.payload" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="subcategories?.total"
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
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/subcategories/create')">
      Добавить подкатегорию
    </Button>
  </div>
</template>
