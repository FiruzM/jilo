<script setup lang="ts">
import { Eye, FileX } from 'lucide-vue-next'
import qs from 'qs'
import { getAdminOrders } from '~/api/admin/orders/get-orders'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Заказы',
})

const route = useRoute()
const searchParams = computed(() => qs.stringify(route.query))

const { data: orders, isPending } = useQuery({
  queryKey: ['adminOrders', searchParams],
  queryFn: getAdminOrders,
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          №
        </TableHead>
        <TableHead>Номер заказа</TableHead>
        <TableHead>Статус заказа</TableHead>
        <TableHead>Сумма заказа</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableEmpty v-if="!orders?.payload && !isPending" :colspan="6">
        <FileX class="opacity-60. size-14 stroke-[#D5D5D5]" />
      </TableEmpty>

      <TableLoading v-if="isPending" :cells="3" />

      <TableRow v-for="(order, index) in orders?.payload" :key="order.id">
        <TableCell class="font-medium">
          {{ index + 1 }}
        </TableCell>

        <TableCell>
          {{ order.order_number }}
        </TableCell>

        <TableCell>
          <span :class="order.status_id === 1 ? 'bg-yellow-400 px-5 py-2.5 rounded-md text-white `' : 'bg-green-600 text-white px-5 py-2.5 rounded-md'">{{ order.status_id === 1 ? 'В обработке' : 'Принят' }}</span>
        </TableCell>

        <TableCell>
          {{ order.total_amount }} c.
        </TableCell>

        <TableCell>
          <Eye class="stroke-[#3c83ed] hover:cursor-pointer" @click="$router.push(`/admin/orders/${order.id}`)" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <div v-if="orders?.payload" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="orders?.total"
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
