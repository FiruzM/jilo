<script setup lang="ts">
import { Box, Minus, Plus, ShoppingCart } from 'lucide-vue-next'
import { getProduct } from '~/api/web/products/get-product'
import { useToast } from '~/components/ui/toast'

const params: any = useRoute().params
const { toast } = useToast()

const { data: product, suspense } = useQuery({
  queryKey: ['product', params.id],
  queryFn: () => getProduct(params.id),
})

const cart: any = useLocalStorage('cart', [])
const quantity = ref(1)

function addToCart() {
  const index = cart.value.findIndex((item: any) => item.id === product.value?.payload.id)
  if (index !== -1) {
    toast({
      title: 'Товар добавлен',
      description: 'Товар был добавлен в корзину',
    })
    return cart.value[index] = { ...product.value?.payload, quantity: quantity.value }
  }
  else {
    toast({
      title: 'Товар добавлен',
      description: 'Товар был добавлен в корзину',
    })
    return cart.value.push({ ...product.value?.payload, quantity: quantity.value })
  }
}

function decrement() {
  if (quantity.value > 1) {
    quantity.value = quantity.value - 1
  }
  return 1
}

function increment() {
  quantity.value = quantity.value + 1
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
          <BreadcrumbPage>{{ product?.payload.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="mt-4 flex flex-col gap-5 md:flex-row lg:gap-16">
      <div class="flex size-full items-center justify-center overflow-hidden rounded-[24px] border-[5px] border-[#F1F4FA] bg-white md:size-[536px]">
        <Carousel
          class="relative w-full"
          :opts="{
            align: 'center',
          }"
        >
          <CarouselContent class="">
            <CarouselItem v-for="(img, index) in product?.payload.file_paths" :key="index">
              <img :src="img" alt="Logo" class="h-[333px] w-full object-contain sm:h-[432px]">
            </CarouselItem>
          </CarouselContent>

          <div v-if="product?.payload.file_paths.length > 1">
            <CarouselPrevious class="left-1 border-none bg-primary-foreground stroke-[#FFDCCD]" />
            <CarouselNext class="right-1 border-none bg-primary-foreground" />
          </div>
        </Carousel>
      </div>

      <div class="flex flex-col gap-6">
        <div>
          <h2 class="max-w-[574px] text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
            {{ product?.payload.name }}
          </h2>
          <p class="mt-2 font-semibold text-[#9AA6AC] sm:text-2xl md:text-3xl lg:text-4xl">
            {{ product?.payload.price }} с
          </p>
        </div>

        <div class="flex max-w-96 flex-col gap-6">
          <div class="flex gap-6">
            <div class="flex items-center gap-2">
              <button class="clic rounded-full bg-[#F7F8F9] p-1" @click="decrement">
                <Minus class="size-4 stroke-[#64748B] hover:cursor-pointer sm:size-6" />
              </button>
              <span class="font-semibold">{{ quantity }}</span>
              <button class="rounded-full bg-[#F7F8F9] p-1" @click="increment">
                <Plus class="size-4 stroke-[#64748B] hover:cursor-pointer sm:size-6" />
              </button>
            </div>
            <Button class="grow text-sm sm:text-base" @click="addToCart">
              <ShoppingCart class="mr-2.5 hidden" />
              Добавить в корзину
            </Button>
          </div>

          <Button class="border border-primary bg-transparent text-sm sm:text-base">
            Купить в один клик
          </Button>
        </div>

        <div>
          <ul>
            <li class="flex gap-2 text-sm">
              <Box class="stroke-[#9AA6AC]" />
              <span>Наличие на складе <span class="font-semibold text-[#368C18]">Много</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
