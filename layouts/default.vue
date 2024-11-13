<script setup lang="ts">
import { Box, Heart, Home, Instagram, Loader2, Package, Search, ShoppingCart, User } from 'lucide-vue-next'
import { getRoleLink } from '~/lib/utils'
import { getSearchProduct } from '~/api/web/products/get-search-products'

const { locales, locale, setLocale } = useI18n()

const user = useAuthUser()
const { logout, me } = useAuth()
const router = useRouter()
const favorite = useLocalStorage('favorite', [])
const cart = useLocalStorage('cart', [])

const searchInput = ref(false)

const search = ref('')

const { data: products, refetch, isPending } = useQuery({
  queryKey: ['products', search.value],
  queryFn: () => getSearchProduct(search.value),
  enabled: false,
})

const getInputValue = useDebounceFn(() => {
  if (search.value)
    refetch()
}, 200)

watch(search, () => {
  if (search.value)
    getInputValue()
})

watch(() => router.currentRoute.value.path, () => {
  searchInput.value = false
})

const { mutate } = useMutation({
  mutationFn: () => logout(),

  onSuccess: async () => {
    await me()
    router.push('/login')
  },
})
</script>

<template>
  <div class="flex min-h-screen flex-col xl:pb-0">
    <header>
      <ClientOnly>
        <div class="mx-auto flex max-w-[1360px] items-center gap-2.5 p-4 sm:gap-5 lg:px-10 xl:gap-8">
          <NuxtLink to="/" class="w-[50px] lg:w-20">
            <img src="/assets/img/logo.png" alt="Logo" class="w-[50px] lg:w-20">
          </NuxtLink>

          <div class="flex grow items-center gap-2.5 sm:gap-5 lg:gap-8">
            <MenuCategoryMenu />

            <Popover v-model:open="searchInput" class="min-w-[208px] shrink-0 grow xl:shrink">
              <PopoverTrigger class="relative w-full">
                <Input v-model="search" class="h-[34px] w-full rounded-[8px] xl:h-12 xl:rounded-[12px]" :placeholder="$t('find_product_here')" />
                <span class="absolute right-[3px] top-[2px] rounded-[6px] bg-primary p-[3px] xl:right-[5px] xl:top-[4px] xl:p-[8px]"> <Search /></span>
              </PopoverTrigger>
              <PopoverContent class="w-[290px] grow border-input px-2.5 sm:w-[450px] sm:px-5 md:w-[600px] lg:w-[720px] xl:w-[480px]">
                <div class="flex flex-col gap-5">
                  <div v-if="isPending && !!search" class="flex justify-center">
                    <Loader2 class="animate-spin stroke-primary" />
                  </div>

                  <div v-if="products?.payload === null" class="flex justify-center">
                    <p class="text-sm opacity-50">
                      {{ $t('nothing_found') }}
                    </p>
                  </div>
                  <NuxtLink v-for="product in products?.payload.data" :key="product.id" :to="`/product/${product.id}`" class="flex items-center gap-5 rounded-sm px-2 hover:bg-[#f1f4fb]">
                    <img :src="product.file_paths[0]" alt="" class="size-[50px]">
                    <p class="text-sm">
                      {{ product.name }}
                    </p>
                  </NuxtLink>
                </div>
              </PopoverContent>
            </Popover>

            <nav class="hidden xl:block">
              <ul class="flex gap-10">
                <li>
                  <NuxtLink to="/order" class="flex flex-col items-center text-sm text-black">
                    <Package />
                    {{ $t('orders') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/favorites" class="flex flex-col items-center text-sm text-black">
                    <div class="relative">
                      <Heart />
                      <span v-if="favorite.length > 0" class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ favorite.length }}</span>
                    </div>
                    {{ $t('favorites') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/cart" class="flex flex-col items-center text-sm text-black">
                    <div class="relative">
                      <ShoppingCart />
                      <span v-if="cart.length > 0" class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ cart.length }}</span>
                    </div>
                    {{ $t('cart') }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <Select :model-value="locale" @update:model-value="(code: any) => setLocale(code)">
              <SelectTrigger class="max-w-[40px] justify-normal border-0 bg-transparent p-0 text-[10px] font-semibold text-black md:text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent class="w-fit border-[#D5D5D5] p-0">
                <SelectGroup>
                  <SelectItem v-for="localeItem in locales" :key="localeItem.code" :value="localeItem.code">
                    {{ localeItem.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <ClientOnly>
              <DropdownMenu v-if="user">
                <DropdownMenuTrigger class="hidden items-center xl:flex xl:gap-1">
                  <Avatar>
                    <AvatarImage :src="user?.file_path" alt="Avatar" />
                    <AvatarFallback>{{ user?.full_name?.slice(0, 1) }}</AvatarFallback>
                  </Avatar>
                  <p class="line-clamp-1 max-w-[57px] text-xs">
                    {{ user?.full_name }}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <NuxtLink :to="getRoleLink(user.role?.name)">
                      {{ $t('personal_account') }}
                    </NuxtLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem @click="mutate()">
                    {{ $t('logout') }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button v-else variant="outline" class="hidden py-6 text-sm font-medium xl:flex" @click="$router.push('/login')">
                {{ $t('login') }}
              </Button>
            </ClientOnly>
          </div>
        </div>
      </ClientOnly>
    </header>

    <main class="shrink grow basis-auto">
      <slot />
    </main>

    <footer class="bg-primary-foreground">
      <div class="mx-auto flex max-w-[1360px] flex-col justify-between gap-5 px-4 py-5 sm:flex-row sm:items-center lg:items-center lg:justify-between lg:py-16 lg:pl-[102px] lg:pr-10">
        <div class="w-[120px] lg:h-[113px] lg:w-[198px]">
          <img src="~/assets/img/footer-logo.png" alt="footer logo">
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex gap-2.5 sm:self-end">
            <a href="https://www.instagram.com/jilo_pastry_shop?igsh=MXJxNnNpcnZod3Jrag==" target="_blank" class="rounded-[10px] bg-[#FFDCCD] p-2.5">
              <Instagram class="stroke-[#4A585A]" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=992900509090&text=Здравствуйте%2C+у+меня+есть+вопрос" target="_blank" class="rounded-[10px] bg-[#FFDCCD] p-2.5">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9268 3.0625C15.9512 1.09375 13.3171 0 10.5366 0C4.7561 0 0.0731696 4.66667 0.0731696 10.4271C0.0731696 12.25 0.585366 14.0729 1.46341 15.6042L0 21L5.56098 19.5417C7.09756 20.3438 8.78049 20.7812 10.5366 20.7812C16.3171 20.7812 21 16.1146 21 10.3542C20.9268 7.65625 19.9024 5.03125 17.9268 3.0625ZM15.5854 14.1458C15.3659 14.7292 14.3415 15.3125 13.8293 15.3854C13.3902 15.4583 12.8049 15.4583 12.2195 15.3125C11.8537 15.1667 11.3415 15.0208 10.7561 14.7292C8.12195 13.6354 6.43903 11.0104 6.29268 10.7917C6.14634 10.6458 5.19512 9.40625 5.19512 8.09375C5.19512 6.78125 5.85366 6.19792 6.07317 5.90625C6.29268 5.61458 6.58536 5.61458 6.80488 5.61458C6.95122 5.61458 7.17073 5.61458 7.31707 5.61458C7.46341 5.61458 7.68293 5.54167 7.90244 6.05208C8.12195 6.5625 8.63414 7.875 8.70731 7.94792C8.78049 8.09375 8.78049 8.23958 8.70731 8.38542C8.63414 8.53125 8.56097 8.67708 8.41463 8.82292C8.26829 8.96875 8.12195 9.1875 8.04878 9.26042C7.90244 9.40625 7.7561 9.55208 7.90244 9.77083C8.04878 10.0625 8.56097 10.8646 9.36585 11.5937C10.3902 12.4687 11.1951 12.7604 11.4878 12.9063C11.7805 13.0521 11.9268 12.9792 12.0732 12.8333C12.2195 12.6875 12.7317 12.1042 12.878 11.8125C13.0244 11.5208 13.2439 11.5938 13.4634 11.6667C13.6829 11.7396 15 12.3958 15.2195 12.5417C15.5122 12.6875 15.6585 12.7604 15.7317 12.8333C15.8049 13.0521 15.8049 13.5625 15.5854 14.1458Z" fill="#4A585A" />
              </svg>
            </a>
          </div>

          <p class="font-medium text-[#FFDCCD]">
            г. Душанбе, ул. Нусратулло Махсум 12/1
          </p>

          <a href="tel:+992900509090" class=" font-medium text-[#FFDCCD] sm:self-end">+992 900 50 9090</a>
        </div>
      </div>
    </footer>

    <nav class="sticky bottom-0 z-[100] w-full overflow-hidden border-t-2 border-[#D5D5D5] bg-white py-2.5 xl:hidden">
      <ul class="flex justify-between px-4">
        <li>
          <NuxtLink to="/" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <Home />
            <span class="pt-1 text-[10px]">{{ $t('main') }}</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/order" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <Box />
            <span class="pt-1 text-[10px]">{{ $t('orders') }}</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/favorites" class="relative flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <Heart />
            <span class="pt-1 text-[10px]">{{ $t('favorites') }}</span>
            <span v-if="favorite.length > 0" class="absolute -top-1 right-0 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ favorite.length }}</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/cart" class="relative flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <ShoppingCart />
            <span class="pt-1 text-[10px]">{{ $t('cart') }}</span>
            <span v-if="cart.length > 0" class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ cart.length }}</span>
          </NuxtLink>
        </li>

        <li>
          <DropdownMenu v-if="user">
            <DropdownMenuTrigger class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
              <User />
              <span class="pt-1 text-[10px]">{{ $t('profile') }}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <NuxtLink :to="getRoleLink(user?.role?.name)">
                  {{ $t('personal_account') }}
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="mutate()">
                {{ $t('logout') }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NuxtLink v-else to="/login" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <User />
            <span class="pt-1 text-[10px]">{{ $t('profile') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
