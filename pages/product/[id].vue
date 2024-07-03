<script setup lang="ts">
import { Box, LucideAlertCircle, Minus, Plus, ShoppingCart, Truck } from 'lucide-vue-next'
import { getProduct } from '~/api/products/get-product'
import { useToast } from '~/components/ui/toast'

const params: any = useRoute().params
const { toast } = useToast()

const { data: product, suspense } = useQuery({
  queryKey: ['product'],
  queryFn: () => getProduct(params.id),
})

const cart: any = useLocalStorage('cart', [])
const count = ref(1)

function addToCart() {
  const index = cart.value.findIndex((item: any) => item.id === product.value?.payload.id)
  if (index !== -1) {
    toast({
      title: 'Товар добавлен',
      description: 'Товар был добавлен в корзину',
    })
    return cart.value[index] = { ...product.value?.payload, count: count.value }
  }
  else {
    toast({
      title: 'Товар добавлен',
      description: 'Товар был добавлен в корзину',
    })
    return cart.value.push({ ...product.value?.payload, count: count.value })
  }
}

function decrement() {
  if (count.value > 1) {
    count.value = count.value - 1
  }
  return 1
}

function increment() {
  count.value = count.value + 1
}

await suspense()
</script>

<template>
  <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-11">
    <Breadcrumb class="hidden lg:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/category">
            Каталог товаров
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/category/krasitely">
            Красители
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Жирорастворимые красители</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="mt-4 flex flex-col gap-5 lg:flex-row lg:gap-16">
      <div class="flex items-center justify-center rounded-3xl bg-[#F1F4FA] px-16 py-12 lg:px-[135px]">
        <img :src="product?.payload.file_paths[0]" alt="Logo" class="size-[203px] md:size-[303px] xl:size-[450px]">
      </div>

      <div class="flex flex-col gap-6">
        <p class="self-start rounded-full bg-primary-foreground px-2 py-1 text-sm font-semibold text-[#FFDCCD]">
          New!
        </p>
        <div>
          <h2 class="max-w-[574px] text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
            {{ product?.payload.name }}
          </h2>
          <p class="mt-2 font-semibold text-[#9AA6AC] sm:text-2xl md:text-3xl lg:text-4xl">
            {{ product?.payload.price }} с
          </p>
        </div>

        <p class="text-xs text-[#6E7C87] sm:text-sm">
          Артикул 107293
        </p>

        <div class="flex max-w-96 flex-col gap-6">
          <div class="flex gap-6">
            <div class="flex items-center gap-2">
              <button class="clic rounded-full bg-[#F7F8F9] p-1" @click="decrement">
                <Minus class="size-4 stroke-[#64748B] hover:cursor-pointer sm:size-6" />
              </button>
              <span class="font-semibold">{{ count }}</span>
              <button class="rounded-full bg-[#F7F8F9] p-1" @click="increment">
                <Plus class="size-4 stroke-[#64748B] hover:cursor-pointer sm:size-6" />
              </button>
            </div>
            <Button class="grow text-sm sm:text-base" @click="addToCart">
              <ShoppingCart class="mr-2.5" />
              Добавить в корзину
            </Button>
          </div>

          <Button class="border border-primary bg-transparent text-sm sm:text-base">
            Купить в один клик
          </Button>
        </div>

        <div>
          <ul>
            <li class="flex gap-2 border-b border-[#E5E9EB] py-2 text-sm">
              <Truck class="stroke-[#9AA6AC]" />
              <span class="border-b border-[#242424]">Рассчитать доставку</span>
            </li>

            <li class="flex gap-2 border-b border-[#E5E9EB] py-2 text-sm">
              <Box class="stroke-[#9AA6AC]" />
              <span>Наличие на складе <span class="font-semibold text-[#368C18]">Много</span></span>
            </li>

            <li class="flex gap-2 border-b border-[#E5E9EB] py-2 text-sm">
              <LucideAlertCircle class="stroke-[#9AA6AC]" />
              <span>Самовывоз сегодня - бесплатно <br> Доставка завтра - от 0 ₽</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
