<script setup lang="ts">
import { Box, Heart, Home, Menu, Package, Search, ShoppingCart, User } from 'lucide-vue-next'

const { locales, locale, setLocale } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col  xl:pb-0">
    <header>
      <div class="mx-auto flex max-w-[1360px] items-center gap-2.5 px-3 py-4 sm:gap-5 lg:px-10 xl:gap-8">
        <NuxtLink to="/">
          <img src="/assets/img/logo.png" alt="Logo" class="w-20">
        </NuxtLink>

        <div class="flex grow items-center gap-2.5 sm:gap-5 lg:gap-8">
          <Popover>
            <PopoverTrigger as-child class="hidden xl:flex">
              <Button class="px-3 py-6 text-sm font-semibold">
                <Menu class="mr-2" />
                <span>Категории</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="mt-5 w-screen border-none p-0">
              <NavigationMenu>
                <NavigationMenuList class="flex-col bg-[#F2F2F2] py-10 pl-10 pr-5">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger class="justify-between bg-transparent text-[#A6A6A6]" @click="$router.push('/category/:slug()')">
                      Красители
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <h4 class="text-3xl font-bold">
                          Красители
                        </h4>
                        <div class="mt-9">
                          <h4 class="text-base font-semibold">
                            Жирорастворимые  красители
                          </h4>
                          <ul>
                            <li>
                              <NyxtLink to="/category/slug">
                                Guzman
                              </NyxtLink>
                            </li>
                            <li>TopDecor</li>
                            <li>Kreda</li>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger class="justify-between bg-transparent text-[#A6A6A6]" @click="$router.push('/category/:slug()')">
                      Красители
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <h4 class="text-3xl font-bold">
                          Красители
                        </h4>
                        <div class="mt-9">
                          <h4 class="text-base font-semibold">
                            Жирорастворимые  красители
                          </h4>
                          <ul>
                            <li>
                              <NyxtLink to="/category/slug">
                                Guzman
                              </NyxtLink>
                            </li>
                            <li>TopDecor</li>
                            <li>Kreda</li>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger class="justify-between bg-transparent text-[#A6A6A6]" @click="$router.push('/category/:slug()')">
                      Красители
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <h4 class="text-3xl font-bold">
                          Красители
                        </h4>
                        <div class="mt-9">
                          <h4 class="text-base font-semibold">
                            Жирорастворимые  красители
                          </h4>
                          <ul>
                            <li>
                              <NyxtLink to="/category/slug">
                                Guzman
                              </NyxtLink>
                            </li>
                            <li>TopDecor</li>
                            <li>Kreda</li>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger class="justify-between bg-transparent text-[#A6A6A6]" @click="$router.push('/category/:slug()')">
                      Красители
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <h4 class="text-3xl font-bold">
                          Красители
                        </h4>
                        <div class="mt-9">
                          <h4 class="text-base font-semibold">
                            Жирорастворимые  красители
                          </h4>
                          <ul>
                            <li>
                              <NyxtLink to="/category/slug">
                                Guzman
                              </NyxtLink>
                            </li>
                            <li>TopDecor</li>
                            <li>Kreda</li>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger class="justify-between bg-transparent text-[#A6A6A6]" @click="$router.push('/category/:slug()')">
                      Красители
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <h4 class="text-3xl font-bold">
                          Красители
                        </h4>
                        <div class="mt-9">
                          <h4 class="text-base font-semibold">
                            Жирорастворимые  красители
                          </h4>
                          <ul>
                            <li>
                              <NyxtLink to="/category/slug">
                                Guzman
                              </NyxtLink>
                            </li>
                            <li>TopDecor</li>
                            <li>Kreda</li>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <Sheet>
            <SheetTrigger class="xl:hidden">
              <Button class="rounded-[8px] p-[5px]">
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

          <div class="relative min-w-[208px] shrink-0 grow xl:shrink">
            <Input class="h-11 w-full rounded-[8px] xl:h-12 xl:rounded-[12px]" placeholder="Найдите товар здесь" />
            <span class="absolute right-1 top-1 rounded-[6px] bg-primary p-[6px] xl:right-[5px] xl:top-[5px]">
              <Search />
            </span>
          </div>

          <nav class="hidden xl:block">
            <ul class="flex gap-10">
              <li>
                <NuxtLink class="flex flex-col items-center text-sm text-black">
                  <Package />
                  Заказы
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/favorites" class="flex flex-col items-center text-sm text-black">
                  <div class="relative">
                    <Heart />
                    <span class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">2</span>
                  </div>
                  Избранное
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/cart" class="flex flex-col items-center text-sm text-black">
                  <div class="relative">
                    <ShoppingCart />
                    <span class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">2</span>
                  </div>
                  Корзина
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <Select :model-value="locale" class="p-0" @update:model-value="(code) => setLocale(code)">
            <SelectTrigger class="flex w-fit gap-1 border-0 bg-transparent p-0 text-[10px] font-semibold text-black md:text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="center" class="p-0">
              <SelectGroup>
                <SelectItem v-for="localeItem in locales" :key="localeItem.code" class="text-primary" :value="localeItem.code">
                  {{ localeItem.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" class="hidden py-6 text-sm font-medium xl:flex">
            Войти
          </Button>
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
            <span class="absolute -top-1 right-0 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">3</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/cart" class="relative flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <ShoppingCart />
            <span class="pt-1 text-[10px]">Корзина</span>
            <span class="absolute -right-2 -top-1 rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">3</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/profile" class="flex flex-col items-center [&.router-link-active]:text-[#EDAFB8]">
            <User />
            <span class="pt-1 text-[10px]">Профиль</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
