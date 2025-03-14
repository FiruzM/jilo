<script setup lang="ts">
import { Copy } from 'lucide-vue-next'
import { format } from 'date-fns'
import { getOrder } from '~/api/web/orders/get-order'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  middleware: ['user-only'],
})

const params: any = useRoute().params

const { toast } = useToast()
const { t } = useI18n()

useHead({
  title: t('order'),
  meta: [
    { name: 'title', content: t('order') },
  ],
})

const { data: order } = useQuery({
  queryKey: ['order', params],
  queryFn: () => getOrder(params.id),
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(order.value!.payload.order_number)
    toast({
      title: t('copied'),
      description: t('order_number_copied'),
    })
  }
  catch (error: any) {
    toast({
      title: t('error'),
      description: error.message,
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-[1360px] flex-col gap-4 px-4 pb-10 pt-8 lg:gap-10 lg:px-10 lg:pb-16 lg:pt-[100px] ">
    <div class="flex flex-col gap-2">
      <h3 class="text-base font-semibold md:text-2xl lg:text-3xl">
        {{ $t('order') }} №{{ order?.payload.order_number }}
      </h3>
      <button class="flex gap-2 text-xs opacity-40 lg:hidden" @click="copyToClipboard">
        <Copy class="size-4" />
        {{ $t('copy_order_number') }}
      </button>
    </div>

    <span class="self-start rounded-[12px] bg-[#DFF0D8] px-2.5 py-[5px] text-xs text-[#3C763D] sm:text-base lg:px-7 lg:py-4">{{ $t('order_succsessfully_created') }}</span>

    <div>
      <h3 class="border-b border-[#D5D5D5] pb-4 text-sm font-semibold lg:text-2xl">
        {{ $t('order_info') }}
      </h3>
      <div class="flex justify-between pb-5 pt-8 sm:justify-normal sm:gap-6 ">
        <div class="flex flex-col gap-8">
          <p class="text-xs">
            {{ $t('issue_date') }}
          </p>
          <p class="mb-10 text-xs sm:mb-0">
            {{ $t('summ_and_status_payment') }}
          </p>
          <p class="text-xs">
            {{ $t('payment_method') }}
          </p>
          <p class="text-xs">
            {{ $t('delivery_method') }}
          </p>
          <p class="text-xs">
            {{ $t('delivery_address') }}
          </p>
          <p class="text-xs">
            {{ $t('recipent') }}
          </p>
          <p class="text-xs">
            {{ $t('phone_number') }}
          </p>
        </div>

        <div class="flex flex-col gap-8">
          <p v-if="order?.payload.created_at" class="text-xs font-semibold">
            {{ format(new Date(order.payload.created_at), 'dd.MM.yyyy') }}
          </p>
          <p class="relative mb-10 gap-4 text-xs font-semibold sm:mb-0">
            {{ order?.payload.total_amount }} сомони
            <span class="absolute left-[-230px] top-8 ml-4 rounded-xl border border-[#F0E8D8] px-3 py-1 text-sm text-[#765F3C] sm:static">
              {{ order?.payload.status_id === 1 ? $t('waiting_payment') : $t('paid') }}
            </span>
            <NuxtLink v-if="order?.payload.status_id === 1" to="/order/payment" class="absolute left-[-70px] top-7 ml-4 rounded-xl bg-primary px-5 py-2.5 sm:static lg:px-6 lg:py-3">
              {{ $t('go_to_the_payment') }}
            </NuxtLink>
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.payment_method === 'card' ? $t('payment_by_card') : $t('payment_by_cash') }}
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.delivery_method === 'current-adres' ? $t('delivery_to_adres') : $t('pickup') }}
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.delivery_address }}
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.user_name }}
          </p>
          <p class="text-xs font-semibold">
            {{ order?.payload.user_phone }}
          </p>
        </div>
      </div>
    </div>

    <h3 class="text-xl font-semibold md:text-2xl lg:text-3xl">
      {{ $t('order_list') }}
    </h3>

    <div class="overflow-hidden rounded-xl border border-[#D5D5D5]">
      <Table class="">
        <TableHeader class="bg-[#F0F0F0]">
          <TableRow class="border-[#D5D5D5]">
            <TableHead class="text-xs text-[#868686] sm:text-base">
              {{ $t('name') }}
            </TableHead>
            <TableHead class="text-xs text-[#868686] sm:text-base">
              {{ $t('quantity') }}
            </TableHead>
            <TableHead class="text-right text-xs text-[#868686] sm:text-base">
              {{ $t('price') }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in order?.payload.order_items" :key="item.id" class="border-[#D5D5D5]">
            <TableCell class="text-xs sm:text-base">
              {{ item.product_name }}
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
      <div class="flex flex-col items-end justify-end border-t py-[11px] pr-3">
        <p class="text-xs sm:text-base">
          {{ $t('total_amount') }}: <span class="text-xs font-semibold sm:text-base">{{ order?.payload.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0) }} с.</span>
        </p>
        <p v-if="order?.payload.delivery_method === 'current-adres' " class="text-xs sm:text-base">
          Доставка: <span class="text-xs font-semibold sm:text-base">20 с.</span>
        </p>
      </div>
    </div>
  </div>
</template>
