<script setup lang="ts">
import { Eye, FileX, Search, Trash } from 'lucide-vue-next'
import qs from 'qs'
import { deleteUser } from '~/api/admin/users/delete-user'
import { getUsers } from '~/api/admin/users/get-users'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Пользователи',
})

const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const searchParams = computed(() => qs.stringify(route.query))

const { data: users, refetch, isPending } = useQuery({
  queryKey: ['users', searchParams],
  queryFn: () => getUsers(),
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteUser(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Пользователь успешно удален',
    })
  },
})

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
        v-model="params.fullName" type="search" class="h-[40px] border-[#3c83ed] pl-10 placeholder:font-medium placeholder:text-[#3c83ed] placeholder:opacity-25 focus:border-[#10a4e9]"
        placeholder="Поиск"
      />
      <Search class="absolute left-3 top-2 stroke-[#3c83ed] opacity-25" />
    </div>
  </div>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          №
        </TableHead>
        <TableHead>Полное имя</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Номер телефона</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="!users?.payload && !isPending" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="5" />

      <TableRow v-for="(user, index) in users?.payload" :key="user.id">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>
        <TableCell>{{ user.full_name }}</TableCell>
        <TableCell>{{ user.email }}</TableCell>
        <TableCell>{{ user.number_phone }}</TableCell>

        <TableCell>
          <div class="flex gap-4">
            <NuxtLink :to="`/admin/users/${user.id}`">
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
                  <AlertDialogAction @click="mutate(user.id)">
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
  <div v-if="users?.payload" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="users?.total"
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
