<script setup lang="ts">
import { Loader2, MapPin, Phone, ShoppingCart, ThumbsUp, Truck } from 'lucide-vue-next'
import Autoplay from 'embla-carousel-autoplay'
import { getInfiniteCategories } from '~/api/admin/categories/get-infinite-categories'
import { getBanners } from '~/api/admin/banners/get-banners'
import { getDiscountProducts } from '~/api/web/products/get-discount-products'
import { getComments } from '~/api/web/comments/get-comments'

const { t } = useI18n()

useHead({
  title: t('main'),
  meta: [
    { name: 'title', content: 'Jilo Exlusive' },
    { name: 'description', content: 'Добро пожаловать в Jilo Exclusive, ваш эксклюзивный интернет-магазин для кондитеров! Мы предлагаем широкий ассортимент высококачественных ингредиентов, инструментов и аксессуаров для кондитерского искусства. От натуральных ароматизаторов и пищевых красителей до профессиональных форм для выпечки и декора, наш ассортимент имеет все, что нужно для создания уникальных и вкусных кондитерских изделий. Мы сотрудничаем только с проверенными поставщиками, чтобы обеспечить вам доступ к лучшим продуктам по конкурентоспособным ценам. Благодаря быстрой доставке и безопасным способам оплаты, покупки в нашем магазине - это простая и приятная процедура. Создавайте свои шедевры с Jilo Exclusive!' },
    { name: 'keywords', content: 'jilo shop, jilo exclusive, jilo, чило, джило, Кондитерские товары, Товары для кондитеров, Пищевые ингредиенты,Инвентарь для пекаря и кондитера, Кондитерская упаковка, Кондитерские изделия, Профессиональные кондитерские товары, Товары для выпечки, Декоративные кондитерские товары, Кондитерские инструменты' },
  ],
})

const { data: banners, isPending: isBannersPending } = useQuery({
  queryKey: ['banners'],
  queryFn: getBanners,
  refetchOnWindowFocus: false,

})

const {
  data: categories,
  fetchNextPage: fetchNextCategories,
  isFetchingNextPage: isFetchingNextCategories,
  isPending: isCategoriesPending,

} = useInfiniteQuery({
  queryKey: ['categories'],
  queryFn: ({ pageParam }) => getInfiniteCategories(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
  refetchOnWindowFocus: false,
})

const {
  data: discountProducts,
  isPending: discountProductsPending,
  fetchNextPage,
  isFetchingNextPage,
  refetch,
} = useInfiniteQuery({
  queryKey: ['discountProducts'],
  queryFn: ({ pageParam }) => getDiscountProducts(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
  enabled: false,
  refetchOnWindowFocus: false,
})

const {
  data: comments,
  fetchNextPage: fetchNextComments,
  isFetchingNextPage: isFetchingNexcommentst,
  refetch: refetchReviews,
  isPending: discountReviewsPending,

} = useInfiniteQuery({
  queryKey: ['webComments'],
  queryFn: ({ pageParam }) => getComments(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
  refetchOnWindowFocus: false,
  enabled: false,
})

const discountSection = ref()
const reviewSection = ref()
const lastDiscountItemLoader = ref()
const hasTriggeredDiscount = ref(false)
const hasTriggeredReviews = ref(false)
const lastCommentLoader = ref()

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasTriggeredDiscount.value) {
      // section is now in view, enable the query
      refetch()
      hasTriggeredDiscount.value = true
    }
  }, { threshold: 1.0 })

  observer.observe(discountSection.value)

  const reviewObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasTriggeredReviews.value) {
      // section is now in view, enable the query
      refetchReviews()
      hasTriggeredReviews.value = true
    }
  }, { threshold: 1.0 })

  reviewObserver.observe(reviewSection.value)
})

onUpdated(() => {
  const lastDiscountItemObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isFetchingNextPage.value && discountProducts.value?.pages[discountProducts.value.pages.length - 1].payload.meta.current_page !== discountProducts.value?.pages[discountProducts.value.pages.length - 1].payload.meta.last_page) {
      fetchNextPage()
    }
  }, { threshold: 0.5 })

  if (lastDiscountItemLoader.value) {
    lastDiscountItemObserver.observe(lastDiscountItemLoader.value)
  }

  const lastCommentObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isFetchingNexcommentst.value && comments.value?.pages[comments.value.pages.length - 1].payload.meta.current_page !== comments.value?.pages[comments.value.pages.length - 1].payload.meta.last_page) {
      fetchNextComments()
    }
  }, { threshold: 0.5 })

  if (lastCommentLoader.value) {
    lastCommentObserver.observe(lastCommentLoader.value)
  }
})
</script>

<template>
  <div class="mx-auto mt-5 max-w-[1360px] px-4 lg:mt-10 lg:px-10">
    <div v-if="isBannersPending" class="flex justify-center">
      <Loader2 class="mt-[100px] animate-spin stroke-primary" />
    </div>
    <Carousel
      v-else
      class="relative w-full"
      :opts="{
        align: 'center',

      }"
      :plugins="[Autoplay({
        delay: 3000,
      })]"
    >
      <CarouselContent>
        <CarouselItem v-for="banner in banners?.payload" :key="banner.id">
          <div class="relative flex h-[200px] flex-col items-center overflow-hidden rounded-3xl px-[14px] py-5 lg:h-auto lg:items-start lg:py-32 lg:pl-16">
            <img :src="banner.file_path" alt="Banner" class="absolute left-0 top-0 -z-10 size-full object-cover">
            <h3 class="text-2xl font-semibold text-[#FFDCCD] sm:text-3xl">
              {{ banner.title }}
            </h3>
            <p class="mt-[6px] max-w-[265px] text-center text-xs text-[#FFDCCD] sm:mt-3 sm:max-w-[527px] sm:text-base md:text-lg lg:text-left lg:text-xl">
              {{ banner.subtitle }}
            </p>
            <NuxtLink :to="banner.banner_link" target="_blank" class="mt-2.5 rounded-md bg-[#FFDCCD] p-2 hover:cursor-pointer">
              {{ $t('cross') }}
            </NuxtLink>
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious class="left-5 hidden border-none bg-primary-foreground stroke-[#FFDCCD] lg:flex" />
      <CarouselNext class="right-5 hidden border-none bg-primary-foreground lg:flex" />
    </Carousel>
  </div>

  <div class="mx-auto max-w-[1360px] px-4 lg:px-10">
    <div class="mt-10 lg:mt-[100px]">
      <div class="flex gap-11">
        <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
          {{ $t('all_categories') }}
        </h2>
      </div>

      <ul v-if="isCategoriesPending" class="mt-5 flex flex-wrap gap-2.5 lg:mt-10 lg:gap-6 xl:grid xl:grid-cols-5">
        <li v-for="i in 5" :key="i" class="relative h-[127px] grow overflow-hidden rounded-[12px] border-4 border-white bg-[#F1F4FA] p-5 transition-all ease-in hover:border-[#CCE3DE] md:h-[253px] lg:rounded-3xl">
          <Skeleton class="size-full w-[118px]" />
        </li>
      </ul>

      <ul class="mt-5 flex flex-wrap gap-2.5 lg:mt-10 lg:gap-6 xl:grid xl:grid-cols-5">
        <template v-for="(data, index) in categories?.pages" :key="index">
          <li
            v-for="category in data.payload.data"
            :key="category.id"
            class="relative h-[127px] grow overflow-hidden rounded-[12px] border-4 border-white bg-[#F1F4FA] p-5 transition-all ease-in hover:border-[#CCE3DE] md:h-[253px] lg:rounded-3xl"
            @click="$router.push(`/category/${category.id}`)"
          >
            <p class="w-[105px] text-xs font-semibold text-primary-foreground sm:w-[205px] sm:text-base md:text-[18px] xl:w-auto">
              {{ category.name }}
            </p>
            <img :src="category.file_path" class="absolute bottom-0 right-0 size-[76px] sm:size-[96px] lg:size-[160px]" alt="Item">
          </li>
        </template>
      </ul>
      <div class="flex justify-center">
        <Button
          class="mt-16 rounded-xl border border-primary bg-transparent"
          :disabled="categories?.pages[categories.pages.length - 1].payload.meta.current_page === categories?.pages[categories.pages.length - 1].payload.meta.last_page || isFetchingNextCategories"
          :is-loading="isFetchingNextCategories"
          @click="() => fetchNextCategories()"
        >
          {{ $t('show_more') }}
        </Button>
      </div>
    </div>

    <div ref="discountSection" class="mt-10 lg:mt-[100px]">
      <div v-if="discountProductsPending" class="flex justify-center">
        <Loader2 class="mt-[100px] animate-spin stroke-primary" />
      </div>

      <div v-else>
        <div class="flex gap-11">
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            {{ $t('discount_products') }}
          </h2>
        </div>

        <div class="mt-5 lg:mt-10">
          <Carousel
            class="relative w-full"
            :opts="{
              align: 'center',
            }"
          >
            <CarouselContent>
              <template v-for="(data, index) in discountProducts?.pages" :key="index">
                <CarouselItem v-for="product in data.payload.data" :key="product.id" class="basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <CardsItemCard class="h-full" :product="product" @click="() => $router.push(`/product/${product.id}`)" />
                </CarouselItem>
              </template>
              <div
                v-if="discountProducts?.pages[discountProducts.pages.length - 1].payload.meta.current_page !== discountProducts?.pages[discountProducts.pages.length - 1].payload.meta.last_page || isFetchingNextPage"
                ref="lastDiscountItemLoader"
                class="ml-2 flex items-center justify-center"
              >
                <Loader2 class="animate-spin stroke-primary" />
              </div>
            </CarouselContent>

            <div class="lg:hidden">
              <CarouselPrevious class="left-0 border-none bg-primary-foreground stroke-[#FFDCCD]" />
              <CarouselNext class="right-0 border-none bg-primary-foreground" />
            </div>

            <div class="absolute -top-10 right-10 hidden gap-2.5 lg:flex">
              <CarouselPrevious class="border-none bg-primary-foreground stroke-[#FFDCCD]" />
              <CarouselNext class="border-none bg-primary-foreground" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>

    <div class="mt-10 lg:mt-[92px]">
      <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
        {{ $t('our_advantages') }}
      </h2>

      <ul class="mt-5 grid grid-cols-2 gap-7 sm:grid-cols-3 lg:mt-16">
        <li class="flex flex-col gap-2.5 md:gap-5 lg:max-w-[390px] lg:gap-10">
          <div class="self-start rounded-lg bg-primary-foreground p-2.5 md:rounded-xl md:p-5">
            <Truck class="size-[22px] stroke-[#FFDCCD] md:size-11" />
          </div>
          <div class="flex flex-col gap-1 md:gap-3 lg:gap-4">
            <h4 class="text-xs font-semibold sm:text-sm md:text-base lg:text-xl">
              {{ $t('fast_delivery') }}
            </h4>
            <p class="text-[9px] leading-[160%] sm:text-xs  md:text-sm lg:text-base">
              {{ $t('guaranteed_delivery_speed') }}
            </p>
          </div>
        </li>

        <li class="flex max-w-[390px] flex-col gap-2.5 md:gap-5 lg:gap-10">
          <div class="self-start rounded-lg bg-primary-foreground p-2.5 md:rounded-xl md:p-5">
            <ShoppingCart class="size-[22px] stroke-[#FFDCCD] md:size-11" />
          </div>
          <div class="flex flex-col gap-1 md:gap-3 lg:gap-4">
            <h4 class="text-xs font-semibold sm:text-sm md:text-base lg:text-xl">
              {{ $t('wide_range') }}
            </h4>
            <p class="text-[9px] leading-[160%] sm:text-xs md:text-sm lg:text-base">
              {{ $t('products_variety') }}
            </p>
          </div>
        </li>

        <li class="flex max-w-[390px] flex-col gap-2.5 md:gap-5 lg:gap-10">
          <div class="self-start rounded-lg bg-primary-foreground p-2.5 md:rounded-xl md:p-5">
            <ThumbsUp class="size-[22px] stroke-[#FFDCCD] md:size-11" />
          </div>
          <div class="flex flex-col gap-1 md:gap-3 lg:gap-4">
            <h4 class="text-xs font-semibold sm:text-sm md:text-base lg:text-xl">
              {{ $t('high_quality') }}
            </h4>
            <p class="xl text-[9px] leading-[160%]  sm:text-xs md:text-sm lg:text-base">
              {{ $t('premium_quality') }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div ref="reviewSection" class="my-10 lg:my-[100px]">
      <div v-if="discountReviewsPending" class="flex justify-center">
        <Loader2 class="animate-spin stroke-primary" />
      </div>

      <div v-else>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
            {{ $t('reviews') }}
          </h2>
          <CommentsCreateComment />
        </div>

        <Carousel class="mt-5 lg:mt-10">
          <CarouselContent>
            <template v-for="(data, index) in comments?.pages" :key="index">
              <CarouselItem v-for="(comment) in data.payload.data" :key="comment.id">
                <div class="h-full rounded-[12px] bg-[#CCE3DE] p-5 lg:rounded-3xl lg:px-24 lg:py-20">
                  <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
                    <Avatar class="size-[83px] border-4 border-primary-foreground sm:size-[103px] lg:size-[166px]">
                      <AvatarImage :src="comment.file_path" alt="avatar" />
                      <AvatarFallback>{{ comment.full_name.slice(0, 1) }}</AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col gap-2 md:gap-4">
                      <p class="text-xl font-semibold text-primary-foreground sm:text-3xl lg:text-[40px]">
                        {{ comment.full_name }}
                      </p>
                      <div class="flex items-center">
                        <span>{{ comment.grade }}</span>
                        <NuxtRating
                          class="px-3"
                          border-color="#db8403"
                          active-color="#ffa41c"
                          inactive-color="white"
                          :rounded-corners="true"
                          :border-width="5"
                          :rating-size="10"
                          :rating-value="comment.grade"
                        />
                      </div>
                      <p class="text-sm text-primary-foreground sm:text-base lg:text-xl">
                        {{ comment.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </template>
            <div
              v-if="comments?.pages[comments.pages.length - 1].payload.meta.current_page !== comments?.pages[comments.pages.length - 1].payload.meta.last_page || isFetchingNexcommentst"
              ref="lastCommentLoader"
              class="ml-2 flex w-[100px] items-center justify-center"
            >
              <Loader2 class="animate-spin stroke-primary" />
            </div>
          </CarouselContent>
          <div class="absolute right-20 top-10 flex lg:hidden">
            <CarouselPrevious class="-left-10 border-none bg-primary-foreground stroke-[#FFDCCD]" />
            <CarouselNext class="border-none bg-primary-foreground " />
          </div>

          <CarouselPrevious class="left-10 hidden border-none bg-primary-foreground stroke-[#FFDCCD] lg:flex" />
          <CarouselNext class="right-10 hidden border-none bg-primary-foreground lg:flex" />
        </Carousel>
      </div>
    </div>

    <div class="my-10 flex flex-col gap-10 sm:flex-row lg:my-[100px] lg:justify-between">
      <div class="">
        <h3 class="text-xl font-semibold md:text-2xl lg:text-3xl">
          {{ $t('our_contacts') }}
        </h3>

        <div class="mt-10 flex flex-col gap-2.5 lg:mt-[53px] lg:min-w-[340px]">
          <div class="flex items-center gap-2.5 ">
            <MapPin />
            <p class="w-full text-base md:text-2xl">
              г. Душанбе, ул. Нусратулло Махсум 12/1
            </p>
          </div>
          <div class="flex items-center gap-2.5">
            <Phone />
            <a href="tel:+ +992900509090" class="text-base md:text-2xl">+992 900 50 9090</a>
          </div>
        </div>
      </div>

      <div class="relative h-[300px] shrink-0 grow overflow-hidden rounded-3xl border-[3px] border-[#CCE3DE] sm:w-[340px] lg:h-[523px] lg:w-[506px] xl:w-[806px]">
        <a href="https://yandex.ru/maps/?rtext=~38.58264746993179,68.72761897486866&rtt=mt" target="_blank" class="absolute bottom-3 left-3 z-50 rounded-lg bg-primary p-2 text-xs font-medium">
          {{ $t('route') }}
        </a>
        <MapYandexMap />
      </div>
    </div>
  </div>
</template>
