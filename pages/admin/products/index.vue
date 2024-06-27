<script setup lang="ts">
import { Eye, FileX, Trash } from 'lucide-vue-next'
import { deleteProduct } from '~/api/admin/products/delete-product'
import { getProducts } from '~/api/admin/products/get-products'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Товары',
})

const { toast } = useToast()

const { data: products, refetch, isPending } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
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
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          №
        </TableHead>
        <TableHead>Название</TableHead>
        <TableHead>Цена</TableHead>
        <TableHead>Старая цена</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="products?.payload === null" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="5" />

      <TableRow v-for="(product, index) in products?.payload" :key="product.id">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>
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

  <div class="mt-10 flex justify-end">
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/products/create')">
      Добавить товар
    </Button>
  </div>
</template>
