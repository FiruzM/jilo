<script setup lang="ts">
import { format } from 'date-fns'
import { getOrders } from '~/api/web/orders/get-orders'

definePageMeta({
  middleware: ['user-only'],
})

const { data: orders, suspense } = useQuery({
  queryKey: ['orders'],
  queryFn: () => getOrders(),
})

const selected = ref('option-one')
await suspense()
</script>

<template>
  <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 lg:flex lg:px-10 lg:pb-16 lg:pt-11">
    <ClientOnly>
      <AsidebarProfile class="hidden self-start lg:block" />
    </ClientOnly>

    <div class="flex flex-col gap-10">
      <div>
        <RadioGroup v-model="selected" class="mt-5 flex gap-2 lg:mt-8 lg:gap-4">
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-one" value="option-one" class="hidden" />
            <Label for="option-one" :class="selected === 'option-one' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              Все заказы
            </Label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-two" value="option-two" class="hidden" />
            <Label for="option-two" :class="selected === 'option-two' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              Не оплачены
            </Label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-three" value="option-three" class="hidden" />
            <Label for="option-three" :class="selected === 'option-three' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              Оплачены
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div v-for="order in orders?.payload" :key="order.id" class="w-full rounded-[12px] border border-[#D5D5D5] p-5" @click="() => $router.push(`/order/${order.id}`)">
          <div class="flex items-center justify-between border-b  border-[#EFF2F3] pb-4 sm:gap-40">
            <div>
              <h3 class="font-semibold text-black ">
                Заказ №{{ order.order_number }}
              </h3>
              <p class="text-xs text-[#809A9E]">
                {{ format(new Date(order.created_at), 'dd.MM.yyyy') }}, {{ format(new Date(order.created_at), 'HH:mm') }}
              </p>
            </div>
            <span :class=" order.status_id === 1 ? 'rounded-[9px] bg-[#F0E8D8] px-[12px] py-[6px] text-[10px] font-semibold text-[#765F3C]' : 'rounded-[9px] bg-[#E1F0D8] px-[12px] py-[6px] text-[10px] font-semibold text-[#4F763C]'">
              {{ order.status_id === 1 ? "В ожидании оплаты" : "Оплачено" }}
            </span>
          </div>

          <div class="flex gap-20 pt-5">
            <div class="flex flex-col gap-3">
              <p class="text-xs">
                Сумма:
              </p>
              <p class="text-xs">
                Количество:
              </p>
              <p class="text-xs">
                Способ получения:
              </p>
              <p class="text-xs">
                Способ оплаты:
              </p>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-xs font-semibold">
                {{ order.total_amount }}
              </p>
              <p class="text-xs font-semibold">
                {{ order.order_items.reduce((acc: any, item: any) => acc + item.quantity, 0) }}
              </p>
              <p class="text-xs font-semibold">
                {{ order.delivery_method === 'current-adres' ? 'Доставка' : 'Самовывоз' }}
              </p>
              <p class="text-xs font-semibold">
                {{ order.payment_method === 'card' ? 'Картой' : 'Наличными' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
