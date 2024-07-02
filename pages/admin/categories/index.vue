<script setup lang="ts">
import { Eye, FileX, Trash } from 'lucide-vue-next'
import qs from 'qs'
import { deleteCategory } from '~/api/admin/categories/delete-category'
import { getCategories } from '~/api/admin/categories/get-categories'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Категории',
})

const { toast } = useToast()
const route = useRoute()
const searchParams = computed(() => qs.stringify(route.query))

const { data: categories, refetch, isPending } = useQuery({
  queryKey: ['categories', searchParams],
  queryFn: getCategories,
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteCategory(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Категория успешно удалена',
    })
  },
})
</script>

<template>
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
      <TableEmpty v-if="categories?.payload.length === 0" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="3" />

      <TableRow v-for="(category, index) in categories?.payload" :key="category.id">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>
        <TableCell>{{ category.name }}</TableCell>

        <TableCell>
          <div class="flex gap-4">
            <NuxtLink :to="`/admin/categories/${category.id}`">
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
                  <AlertDialogAction @click="mutate(category.id)">
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

  <div v-if="categories?.payload.length > 0" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="12"
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
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/categories/create')">
      Добавить категорию
    </Button>
  </div>
</template>
