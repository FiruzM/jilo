<script setup lang="ts">
import { Eye, FileX, Trash } from 'lucide-vue-next'
import { deleteSubcategory } from '~/api/admin/subcategories/delete-subcategory'
import { getSubcategories } from '~/api/admin/subcategories/get-subcategories'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Подкатегории',
})

const { toast } = useToast()

const { data: subcategories, refetch, isPending } = useQuery({
  queryKey: ['subcategories'],
  queryFn: getSubcategories,
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
      <TableEmpty v-if="subcategories?.payload.length === 0" :colspan="6">
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

  <div class="mt-10 flex justify-end">
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/subcategories/create')">
      Добавить подкатегорию
    </Button>
  </div>
</template>
