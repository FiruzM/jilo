<script setup lang="ts">
import { Eye, FileX, Trash } from 'lucide-vue-next'
import { deleteProduct } from '~/api/admin/products/delete-product'
import { getUsers } from '~/api/admin/users/get-users'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Пользователи',
})

const { toast } = useToast()

const { data: users, refetch, isPending } = useQuery({
  queryKey: ['users'],
  queryFn: () => getUsers(),
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteProduct(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Пользователь успешно удален',
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
        <TableHead>Полное имя</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Номер телефона</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="users?.payload.length === 0" :colspan="6">
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
            <NuxtLink>
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
</template>
