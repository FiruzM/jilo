<script setup lang="ts">
import { Bell, BookmarkPlus, Image, ListEnd, ListPlus, LogOut, Menu, MessageSquareMore, ShoppingBasket, Users, WalletCards } from 'lucide-vue-next'
import { format } from 'date-fns'
import { getUnpaidOrders } from '~/api/admin/orders/get-unpaid-orders'

const user = useAuthUser()

const route = useRoute()

const router = useRouter()
const { logout, me } = useAuth()

const { mutate } = useMutation({
  mutationFn: () => logout(),

  onSuccess: async () => {
    await me()
    router.push('/login')
  },
})

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

const { data, refetch } = useQuery({
  queryKey: ['unpaidOrders'],
  queryFn: () => getUnpaidOrders(),
})

const menu = ref(false)

const isNotificationMenuOpen = ref(false)

setInterval(() => refetch(), 300000)

watch(() => router.currentRoute.value.path, () => {
  menu.value = false
  isNotificationMenuOpen.value = false
})
</script>

<template>
  <div
    class="flex grow items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-500 px-12 pb-44 pt-10"
  >
    <Sheet v-model:open="menu">
      <SheetTrigger class="lg:hidden">
        <Menu class="stroke-white" />
      </SheetTrigger>
      <SheetContent side="left" class="bg-[#000C15]">
        <SheetHeader>
          <SheetDescription>
            <aside
              class="my-12 flex flex-col items-start gap-5"
            >
              <Drawer v-model:open="isNotificationMenuOpen">
                <DrawerTrigger class="flex w-full items-center justify-between gap-10 border-b border-[#3c83ed] p-2.5 pb-5 pl-8">
                  <div class="flex items-center gap-3">
                    <Bell class="stroke-[#FF4747]" />
                    <span class=" text-sm text-white">Уведомления</span>
                  </div>
                  <span class="rounded-[8px] bg-[#FF4747] px-2 text-white">{{ data?.payload.length }}</span>
                </DrawerTrigger>
                <DrawerContent class="scrollbar max-h-screen overflow-auto">
                  <DrawerHeader class="scrollbar mt-5 flex max-h-screen flex-col gap-5 overflow-auto">
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
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>

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

                <Button
                  class="mr-7 mt-10 bg-transparent px-0 text-xl text-[#3c83ed] hover:bg-transparent"
                  @click="mutate()"
                >
                  Выйти
                </Button>
              </nav>
            </aside>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    <h2 class="shadow-el text-2xl font-bold text-white lg:text-5xl">
      {{ route.meta.title }}
    </h2>
    <div class="hidden items-center gap-5 pt-3 lg:flex">
      <Avatar class="size-14 border-2 border-white">
        <AvatarImage :src="user?.file_path!" alt="Avatar" />
        <AvatarFallback>{{ user?.full_name?.slice(0, 1) }}</AvatarFallback>
      </Avatar>

      <Popover>
        <PopoverTrigger class="rounded-xl border border-[#3c83ed] bg-white p-3">
          <LogOut class="stroke-[#3c83ed]" />
        </PopoverTrigger>
        <PopoverContent class="flex flex-col">
          <NuxtLink to="/" class="border-b pb-5 text-[#3c83ed]">
            На главную страницу
          </NuxtLink>
          <Button
            class="self-start bg-transparent pt-5 text-[#3c83ed] hover:bg-transparent"
            @click="mutate()"
          >
            Выйти
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
