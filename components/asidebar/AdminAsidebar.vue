<script setup lang="ts">
import { Bell, BookmarkPlus, Image, ListEnd, ListPlus, MessageSquareMore, ShoppingBasket, Users, WalletCards } from 'lucide-vue-next'
import { format } from 'date-fns'
import { getUnpaidOrders } from '~/api/admin/orders/get-unpaid-orders'

const { data, refetch } = useQuery({
  queryKey: ['unpaidOrders'],
  queryFn: () => getUnpaidOrders(),
})

const router = useRouter()

const isNotificationMenuOpen = ref(false)

watch(() => router.currentRoute.value.path, () => {
  isNotificationMenuOpen.value = false
})

setInterval(() => refetch(), 300000)

const links = [
  {
    title: 'Категории',
    url: '/admin/categories',
    icon: ListPlus,
  },
  {
    title: 'Подкатегории',
    url: '/admin/subcategories',
    icon: ListEnd,
  },
  {
    title: 'Бренды',
    url: '/admin/brands',
    icon: BookmarkPlus,
  },
  {
    title: 'Товары',
    url: '/admin/products',
    icon: ShoppingBasket,
  },
  {
    title: 'Баннеры',
    url: '/admin/banners',
    icon: Image,
  },
  {
    title: 'Заказы',
    url: '/admin/orders',
    icon: WalletCards,
  },
  {
    title: 'Комментарии',
    url: '/admin/comments',
    icon: MessageSquareMore,
  },
  {
    title: 'Пользователи',
    url: '/admin/users',
    icon: Users,
  },
]
</script>

<template>
  <div class="!sticky left-0 top-0 max-h-screen">
    <ScrollArea class="h-screen w-[250px] bg-[#000C15]" :scroll-hide-delay="200">
      <aside
        class="my-12 flex flex-col items-start gap-5"
      >
        <Sheet v-model:open="isNotificationMenuOpen">
          <SheetTrigger class="flex w-full items-center justify-between gap-10 border-b border-[#3c83ed] p-2.5 pb-5 pl-8">
            <div class="flex items-center gap-3">
              <Bell class="stroke-[#FF4747]" />
              <span class=" text-sm text-white">Уведомления</span>
            </div>
            <span class="rounded-[8px] bg-[#FF4747] px-2 text-white">{{ data?.payload.length }}</span>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Уведомления</SheetTitle>
              <SheetDescription class="scrollbar mt-5 flex max-h-screen flex-col gap-5 overflow-auto">
                <div v-for="order in data?.payload" :key="order.id">
                  <div class="flex items-center justify-between rounded-[10px] bg-[#3c83ed] px-6 py-9">
                    <div class="flex max-w-[234px] flex-col gap-2">
                      <p class="font-semibold text-white">
                        {{ order.user_name }}
                      </p>

                      <p class="text-white">
                        Номер телефона: <span class="font-semibold">{{ order.user_phone }}</span>
                      </p>

                      <p class="text-sm text-white ">
                        Номер заказа: <span class="font-semibold">{{ order.order_number }}</span>
                      </p>
                      <span class="text-sm font-extrabold text-white">{{ format(new Date(order.created_at), 'dd.MM.yyyy') }} в {{ format(new Date(order.created_at), 'HH:mm') }}</span>
                    </div>

                    <NuxtLink :to="`/admin/orders/${order.id}`" class="text-white opacity-50 transition-all ease-in hover:underline hover:opacity-100">
                      Просмотреть
                    </NuxtLink>

                    <div class="flex items-center gap-1">
                      <Trash2 class="stroke-primary" />
                      <PencilLine class="stroke-primary" />
                    </div>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <nav>
          <ul class="flex flex-col pl-8">
            <li v-for="link in links" :key="link.title" class="p-2.5 text-sm text-white [&.router-link-active]:opacity-100">
              <NuxtLink
                :to="link.url"
                class="flex items-center opacity-50 transition-all ease-in hover:opacity-100"
              >
                <component :is="link.icon" class="mr-3" />
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>

      <ScrollBar class="color-green" />
    </ScrollArea>
  </div>
</template>

<style>
.router-link-active {
  opacity: 1 !important;
}
.router-link-active svg {
  stroke: #3c83ed;
}
</style>
