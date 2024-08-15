<script setup lang="ts">
import { Eye, FileX, Trash } from 'lucide-vue-next'
import { format } from 'date-fns'
import type { HTTPError } from 'ky'
import { getReviews } from '~/api/admin/reviews/get-reviews'
import { deleteReview } from '~/api/admin/reviews/delete-review'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Комментарии',
})

const { toast } = useToast()
const route = useRoute()
const queryParams = refDebounced(computed(() => ({
  ...route.query,
})), 400)

const { data: comments, isPending, refetch } = useQuery({
  queryKey: ['adminComments', queryParams],
  queryFn: () => getReviews(queryParams.value),
})

const { mutate } = useMutation({
  mutationFn: (id: number) => deleteReview(id),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })
  },

  onSuccess: () => {
    refetch()

    toast({
      title: 'Комментарий успешно удален',
    })
  },
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Имя пользователя</TableHead>
        <TableHead>Оценка</TableHead>
        <TableHead>Статус</TableHead>
        <TableHead>Комментарий</TableHead>
        <TableHead>Дата</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="comments?.payload.data.length === 0 && !isPending" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="6" />

      <TableRow v-for="(comment) in comments?.payload.data" :key="comment.id">
        <TableCell>
          {{ comment.full_name }}
        </TableCell>

        <TableCell>
          {{ comment.grade }}
        </TableCell>

        <TableCell>
          <p v-if="comment.status === 'new'" class="rounded-md bg-yellow-400 px-2 py-2.5 text-center text-white">
            Новый
          </p>

          <p v-if="comment.status === 'accepted'" class="rounded-md bg-green-600 px-2 py-2.5 text-white">
            Принят
          </p>
        </TableCell>

        <TableCell>
          {{ comment.description }}
        </TableCell>

        <TableCell>
          {{ format(new Date(comment.created_at), 'dd/MM/yyyy') }}
        </TableCell>

        <TableCell>
          <div class="flex gap-4">
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
                  <AlertDialogAction @click="mutate(comment.id)">
                    Да
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <NuxtLink :to="`/admin/comments/${comment.id}`">
              <Eye class="cursor-pointer stroke-[#3c83ed]" />
            </NuxtLink>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <div v-if="comments?.payload" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="comments?.payload.meta.total"
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
</template>
