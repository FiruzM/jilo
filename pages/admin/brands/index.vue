<script setup lang="ts">
import { Eye, FileX, Trash } from 'lucide-vue-next'
import { deleteBrand } from '~/api/admin/brands/delete-brand'
import { getBrands } from '~/api/admin/brands/get-brands'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Бренды',
})

const { toast } = useToast()

const { data: brands, refetch, isPending } = useQuery({
  queryKey: ['brands'],
  queryFn: getBrands,
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteBrand(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Товар успешно удален',
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
      <TableEmpty v-if="brands?.payload.length === 0" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="3" />

      <TableRow v-for="(brand, index) in brands?.payload" :key="brand.id">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>
        <TableCell>{{ brand.name }}</TableCell>

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
                  <AlertDialogAction @click="mutate(brand.id)">
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
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/brands/create')">
      Добавить бренд
    </Button>
  </div>
</template>
