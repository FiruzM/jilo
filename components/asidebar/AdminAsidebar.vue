<script setup>
import { BadgePercent, Image, ListPlus, ShoppingBasket, UserRoundCheck, Users, WalletCards } from 'lucide-vue-next'

const links = [
  {
    title: 'Категории',
    url: '/admin/categories',
    icon: ListPlus,
  },
  {
    title: 'Баннеры',
    url: '/admin/banners',
    icon: Image,
  },
  {
    title: 'Платежи',
    url: '/admin/payments',
    icon: WalletCards,
  },
  {
    title: 'Роли и права',
    url: '/admin/roles',
    icon: UserRoundCheck,
  },
  {
    title: 'Товары',
    url: '/admin/products',
    icon: ShoppingBasket,
  },
  {
    title: 'Пользователи',
    url: '/admin/users',
    icon: Users,
  },
  {
    title: 'Скидки',
    url: '/admin/discounts',
    icon: BadgePercent,
  },
]
</script>

<template>
  <div class="!sticky left-0 top-0 max-h-screen">
    <ScrollArea class="h-screen w-[250px] bg-[#000C15]" :scroll-hide-delay="200">
      <aside
        class="my-12 flex flex-col items-start gap-20 px-8"
      >
        <nav>
          <ul class="flex flex-col ">
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
  stroke: #0ae8c2;
}
</style>
