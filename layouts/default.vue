<script setup lang="ts">
import { Box, Heart, Home, Loader2, Menu, Package, Search, ShoppingCart, User } from 'lucide-vue-next'
import { getDetails } from '~/api/web/details/get-details'
import { getRoleLink } from '~/lib/utils'
import { getSearchProduct } from '~/api/web/products/get-search-products'

const { locales, locale, setLocale } = useI18n()
const user = useAuthUser()
const { logout, me } = useAuth()
const router = useRouter()
const favorite = useLocalStorage('favorite', [])
const cart = useLocalStorage('cart', [])

const categoryButton = ref(false)
const mobileCategoryButton = ref(false)
const searchInput = ref(false)

const enabled = computed(() => !!categoryButton.value || !!mobileCategoryButton.value)

const { data: details } = useQuery({
  queryKey: ['details'],
  queryFn: getDetails,
  enabled,
})

const name = ref('')

const { data: products, refetch, isPending } = useQuery({
  queryKey: ['products', name.value],
  queryFn: () => getSearchProduct(name.value),
  enabled: false,
})

const getInputValue = useDebounceFn(() => {
  if (name.value)
    refetch()
}, 200)

watch(name, () => {
  if (name.value)
    getInputValue()
})

watch(() => router.currentRoute.value.path, () => {
  categoryButton.value = false
  mobileCategoryButton.value = false
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
      <div class="mx-auto flex max-w-[1360px] items-center gap-2.5 px-2 py-4 sm:gap-5 lg:px-10 xl:gap-8">
        <NuxtLink to="/" class="w-[50px] lg:w-20">
          <img src="/assets/img/logo.png" alt="Logo" class="w-[50px] lg:w-20">
        </NuxtLink>

        <div class="flex grow items-center gap-2.5 sm:gap-5 lg:gap-8">
          <Popover v-model:open="categoryButton" :modal="true">
            <PopoverTrigger as-child class="hidden xl:flex">
              <Button class="px-3 py-6 text-sm font-semibold">
                <Menu class="mr-2" />
                <span>Категории</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="mt-5 w-screen border-none p-0">
              <NavigationMenu>
                <NavigationMenuList class="min-h-[536px] flex-col justify-start bg-[#F9F9F9] p-10">
                  <NavigationMenuItem v-for="detail in details?.payload.categories" :key="detail.id">
                    <NavigationMenuTrigger>{{ detail.name }}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <NuxtLink :to="`/category/${detail.id}`" class="mt-10 block pl-6 text-[30px] font-bold">
                          {{ detail.name }}
                        </NuxtLink>
                        <ul class="flex min-h-[526px] gap-10 p-6 pt-9">
                          <li v-for="subcategory in detail.subcategories" :key="subcategory.id" class="w-[200px] grow">
                            <NavigationMenuLink as-child>
                              <NuxtLink class="block text-base font-semibold text-[#242424]" :to="`/subcategory/${subcategory.id}`">
                                {{ subcategory.name }}
                              </NuxtLink>
                              <ul class="fle mt-4 flex-col">
                                <li v-for="brands in subcategory.brands" :key="brands.id" class="pb-4">
                                  <NavigationMenuLink as-child>
                                    <NuxtLink class="text-sm text-[#242424]" :to="`/brand/${brands.id}`">
                                      {{ brands.name }}
                                    </NuxtLink>
                                  </NavigationMenuLink>
                                </li>
                              </ul>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <Sheet v-model:open="mobileCategoryButton">
            <SheetTrigger class="xl:hidden">
              <Button class="h-[34px] rounded-[8px] p-[5px]">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader class="text-left">
                <NuxtLink to="/category" class="mt-10">
                  Все категории
                </NuxtLink>

                <ul class="mt-10 flex flex-col gap-5">
                  <li>
                    <NuxtLink to="/category/:slug()">
                      Подложки/подставки для торта
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/category/:slug()">
                      Подложки/подставки для торта
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/category/:slug()">
                      Подложки/подставки для торта
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/category/:slug()">
                      Подложки/подставки для торта
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/category/:slug()">
                      Подложки/подставки для торта
                    </NuxtLink>
                  </li>
                </ul>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Popover v-model:open="searchInput" class="min-w-[208px] shrink-0 grow xl:shrink">
            <PopoverTrigger class="relative w-full">
              <Input v-model="name" class="h-[34px] w-full rounded-[8px] xl:h-12 xl:rounded-[12px]" placeholder="Найдите товар здесь" />
              <span class="absolute right-[3px] top-[2px] rounded-[6px] bg-primary p-[3px] xl:right-[5px] xl:top-[4px] xl:p-[8px]"> <Search /></span>
            </PopoverTrigger>
            <PopoverContent class="w-[290px] grow border-input px-2.5 sm:w-[450px] sm:px-5 md:w-[600px] lg:w-[720px] xl:w-[480px]">
              <div class="flex flex-col gap-5">
                <div v-if="isPending && !!name" class="flex justify-center">
                  <Loader2 class="animate-spin stroke-primary" />
                </div>

                <div v-if="products?.payload === null" class="flex justify-center">
                  <p class="text-sm opacity-50">
                    Ничего не найдено
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
                  Заказы
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/favorites" class="flex flex-col items-center text-sm text-black">
                  <div class="relative">
                    <Heart />
                    <span v-if="favorite.length > 0" class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ favorite.length }}</span>
                  </div>
                  Избранное
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/cart" class="flex flex-col items-center text-sm text-black">
                  <div class="relative">
                    <ShoppingCart />
                    <span v-if="cart.length > 0" class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ cart.length }}</span>
                  </div>
                  Корзина
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <Select :model-value="locale" @update:model-value="(code) => setLocale(code)">
            <SelectTrigger class="max-w-[40px] border-0 bg-transparent p-0 text-[10px] font-semibold text-black md:text-xs">
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
                    Личный кабинет
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="mutate()">
                  Выход
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button v-else variant="outline" class="hidden py-6 text-sm font-medium xl:flex" @click="$router.push('/login')">
              Войти
            </Button>
          </ClientOnly>
        </div>
      </div>
    </header>

    <main class="shrink grow basis-auto">
      <slot />
    </main>

    <footer class="bg-primary-foreground">
      <div class="mx-auto flex max-w-[1360px] flex-col gap-5 px-4 py-5 md:items-center lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-[99px]">
        <h2 class="text-3xl font-medium text-[#FFDCCD]">
          Ҷило Эксклюзив
        </h2>

        <nav>
          <ul class="flex flex-col gap-[5px] md:flex-row md:gap-10">
            <li v-for="(_, index) in 4" :key="index" class="text-[#FFDCCD]">
              About
            </li>
          </ul>
        </nav>
        <p class="text-[#FFDCCD]">
          2024 @ Company
        </p>
      </div>
    </footer>

    <nav class="sticky bottom-0 z-10 w-full overflow-hidden border-t-2 border-[#D5D5D5] bg-white py-2.5 xl:hidden">
      <ul class="flex justify-between px-4">
        <li>
          <NuxtLink to="/" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <Home />
            <span class="pt-1 text-[10px]">Главная</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/order" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <Box />
            <span class="pt-1 text-[10px]">Заказы</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/favorites" class="relative flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <Heart />
            <span class="pt-1 text-[10px]">Избранное</span>
            <span v-if="favorite.length > 0" class="absolute -top-1 right-0 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ favorite.length }}</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/cart" class="relative flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <ShoppingCart />
            <span class="pt-1 text-[10px]">Корзина</span>
            <span v-if="cart.length > 0" class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{{ cart.length }}</span>
          </NuxtLink>
        </li>

        <li>
          <DropdownMenu v-if="user">
            <DropdownMenuTrigger class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
              <User />
              <span class="pt-1 text-[10px]">Профиль</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <NuxtLink :to="getRoleLink(user?.role?.name)">
                  Личный кабинет
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="mutate()">
                Выход
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NuxtLink v-else to="/login" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <User />
            <span class="pt-1 text-[10px]">Профиль</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
~/api/web/products/get-search-products
