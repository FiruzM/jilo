<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { getDetails } from '~/api/web/details/get-details'

const router = useRouter()

const mobileCategoryButton = ref(false)
const categoryButton = ref(false)

const enabled = computed(() => !!categoryButton.value || !!mobileCategoryButton.value)

const { data: details } = useQuery({
  queryKey: ['details'],
  queryFn: getDetails,
  enabled,
})

watch(() => router.currentRoute.value.path, () => {
  categoryButton.value = false
  mobileCategoryButton.value = false
})
</script>

<template>
  <Popover v-model:open="categoryButton" :modal="true">
    <PopoverTrigger as-child class="hidden xl:flex">
      <Button class="px-3 py-6 text-sm font-semibold">
        <Menu class="mr-2" />
        <span>{{ $t('categories') }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="mt-5 w-screen border-none p-0">
      <NavigationMenu>
        <NavigationMenuList class="scrollbar h-[536px] flex-col justify-start overflow-auto bg-[#F9F9F9] p-10">
          <NavigationMenuItem v-for="detail in details?.payload.categories" :key="detail.id">
            <NavigationMenuTrigger>
              <NuxtLink :to="`/category/${detail.id}`">
                {{ detail.name }}
              </NuxtLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div class="scrollbar h-[530px] w-[1200px] overflow-auto">
                <NuxtLink :to="`/category/${detail.id}`" class="mt-10 block pl-6 text-[30px] font-bold">
                  {{ detail.name }}
                </NuxtLink>
                <ul class="grid grid-cols-5 gap-x-10 gap-y-5 p-6 pt-9">
                  <li v-for="subcategory in detail.subcategories" :key="subcategory.id">
                    <NavigationMenuLink as-child>
                      <NuxtLink class="block text-base font-semibold text-[#242424]" :to="`/category/subcategory/${subcategory.id}`">
                        {{ subcategory.name }}
                      </NuxtLink>
                      <ul class="fle mt-4 flex-col">
                        <li v-for="brands in subcategory.brands" :key="brands.id" class="pb-4">
                          <NavigationMenuLink as-child>
                            <NuxtLink class="text-sm text-[#242424]" :to="`category/subcategory/brand/${brands.id}`">
                              {{ brands.name }}
                            </NuxtLink>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </div>
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
          {{ $t('all_categories') }}
        </NuxtLink>

        <ul class="mt-10 flex flex-col gap-5">
          <li v-for="category in details?.payload.categories" :key="category.id">
            <NuxtLink :to="`/category/${category.id}`">
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
