<script setup lang="ts">
import { getOrder } from '~/api/admin/orders/get-order'
import { type UpdateOrderStatusProps, updateOrderStatus } from '~/api/admin/orders/update-order-status'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Заказы',
})

const params: any = useRoute().params
const router = useRouter()
const { toast } = useToast()

const { data: order } = useQuery({
  queryKey: ['order', params],
  queryFn: () => getOrder(params.id),
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: UpdateOrderStatusProps) => updateOrderStatus(data),
  onSuccess: () => {
    router.push('/admin/orders')

    toast({
      title: 'Статус заказа успешно изменен',
    })
  },
})
</script>

<template>
  <div class="mx-auto flex max-w-[1360px] flex-col gap-4 px-4 pb-10 pt-8 lg:gap-10 lg:px-10 lg:pb-16 lg:pt-[100px] ">
    <h3 class="text-base font-semibold md:text-2xl lg:text-3xl">
      Заказ №{{ order?.payload.order_number }}
    </h3>

    <div>
      <h3 class="border-b border-[#D5D5D5] pb-4 text-sm font-semibold lg:text-2xl">
        Информация о заказе
      </h3>
      <div class="flex justify-between pb-5 pt-8 sm:justify-normal sm:gap-6 ">
        <div class="flex flex-col gap-8">
          <p class="text-xs">
            Дата оформления
          </p>
          <p class="mb-10 text-xs sm:mb-0">
            Сумма и статус оплаты
          </p>
          <p class="text-xs">
            Способ оплаты
          </p>
          <p class="text-xs">
            Способ доставки
          </p>
          <p class="text-xs">
            Адрес доставки
          </p>
          <p class="text-xs">
            Получатель
          </p>
          <p class="text-xs">
            Номер телефона
          </p>
        </div>

        <div class="flex flex-col gap-8">
          <p class="text-xs font-semibold">
            Информация о заказе
          </p>
          <p class="relative mb-10 gap-4 text-xs font-semibold sm:mb-0">
            {{ order?.payload.total_amount }} сомони
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.payment_method === 'card' ? 'Оплата картой онлайн' : 'Оплата наличными при получении' }}
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.delivery_method === 'current-adres' ? 'Доставка по адресу' : 'Самовывоз' }}
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.delivery_address }}
          </p>
          <p class="text-xs font-semibold">
            Фарида Рустамова
          </p>
          <p class="text-xs font-semibold">
            +992 900 98 76 54
          </p>
        </div>
      </div>
    </div>

    <h3 class="text-xl font-semibold md:text-2xl lg:text-3xl">
      Состав заказа
    </h3>

    <div class="overflow-hidden rounded-xl border border-[#3c83ed]">
      <Table>
        <TableHeader class="bg-[#3c83ed] ">
          <TableRow class="border-[#D5D5D5]">
            <TableHead class="text-xs text-white sm:text-base">
              Наименование
            </TableHead>
            <TableHead class="text-xs text-white sm:text-base">
              Количество
            </TableHead>
            <TableHead class="text-right text-xs text-white sm:text-base">
              Стоимость
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in order?.payload.order_items" :key="item.id" class="border-[#D5D5D5]">
            <TableCell class="text-xs sm:text-base">
              Коробка для торта с окном Гофрокартон 30х40х20 см
            </TableCell>
            <TableCell class="text-xs sm:text-base">
              {{ item.quantity }}
            </TableCell>
            <TableCell class="text-right text-xs sm:text-base">
              {{ item.price }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="flex justify-end border-t py-[11px] pr-3">
        <p class="text-xs sm:text-base">
          Общая сумма товаров: <span class="text-xs font-semibold sm:text-base">{{ order?.payload.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0) }} с.</span>
        </p>
      </div>
    </div>

    <div class="flex justify-end">
      <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" :is-loading="isPending" @click="mutate({ order_id: order?.payload.id, status_id: 2 })">
        Принять
      </Button>
    </div>
  </div>
</template>
