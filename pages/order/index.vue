<script setup lang="ts">
import { format } from 'date-fns'
import { getOrders } from '~/api/web/orders/get-orders'

definePageMeta({
  middleware: ['user-only'],
})

const { t } = useI18n()

useHead({
  title: t('order'),
  meta: [
    { name: 'title', content: t('order') },
  ],
})

const route = useRoute()
const pageQuery = useRouteQuery<string | undefined>('page', '1')
const statusQuery = useRouteQuery<string | undefined>('status_id', '')

const queryParams = refDebounced(computed(() => ({
  ...route.query,
})), 400)

const { data: orders, suspense } = useQuery({
  queryKey: ['orders', queryParams],
  queryFn: () => getOrders(queryParams.value),
})

await suspense()
</script>

<template>
  <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-2.5 pt-8 lg:flex lg:px-10 lg:pb-5 lg:pt-11">
    <AsidebarProfile class="hidden self-start lg:block" />

    <div class="flex flex-col gap-10">
      <div>
        <RadioGroup v-model="statusQuery" class="mt-5 flex gap-2 lg:mt-8 lg:gap-4">
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-one" value="" class="hidden" />
            <Label for="option-one" :class="statusQuery === '' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              {{ $t('all_orders') }}
            </Label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-two" value="1" class="hidden" />
            <Label for="option-two" :class="statusQuery === '1' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              {{ $t('not_paid') }}
            </Label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-three" value="2" class="hidden" />
            <Label for="option-three" :class="statusQuery === '2' ? 'text-[#FFDCCD] transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              {{ $t('all_paid') }}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div v-for="order in orders?.payload" :key="order.id" class="w-full rounded-[12px] border border-[#D5D5D5] p-5" @click="() => $router.push(`/order/${order.id}`)">
          <div class="flex items-center justify-between border-b  border-[#EFF2F3] pb-4 sm:gap-40">
            <div>
              <h3 class="font-semibold text-black ">
                {{ $t('order') }} №{{ order.order_number }}
              </h3>
              <p class="text-xs text-[#809A9E]">
                {{ format(new Date(order.created_at), 'dd.MM.yyyy') }}, {{ format(new Date(order.created_at), 'HH:mm') }}
              </p>
            </div>
            <span :class=" order.status_id === 1 ? 'rounded-[9px] bg-[#F0E8D8] px-[12px] py-[6px] text-[10px] font-semibold text-[#765F3C]' : 'rounded-[9px] bg-[#E1F0D8] px-[12px] py-[6px] text-[10px] font-semibold text-[#4F763C]'">
              {{ order.status_id === 1 ? $t('not_paid') : $t('paid') }}
            </span>
          </div>

          <div class="flex gap-20 pt-5">
            <div class="flex flex-col gap-3">
              <p class="text-xs">
                {{ $t('sum') }}:
              </p>
              <p class="text-xs">
                {{ $t('quantity') }}:
              </p>
              <p class="text-xs">
                {{ $t('obtaining_method') }}:
              </p>
              <p class="text-xs">
                {{ $t('payment_method') }}:
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
                {{ order.delivery_method === 'current-adres' ? $t('delivery') : $t('pickup') }}
              </p>
              <p class="text-xs font-semibold">
                {{ order.payment_method === 'card' ? $t('card') : $t('cash') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="orders?.payload" class="mt-5 flex justify-center pb-10 lg:pb-16">
    <Pagination
      :total="orders?.total"
      :sibling-count="1"
      show-edges
      :default-page="$route.query.page ? Number($route.query.page) : 1"
      :page="Number(pageQuery)"
      @update:page="$router.push({ query: { page: $event } })"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst class="border-[#488bee]" />
        <PaginationPrev class="border-[#488bee]" />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="size-10 p-0">
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
