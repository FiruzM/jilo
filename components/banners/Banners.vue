<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import { getBanners } from '~/api/admin/banners/get-banners'

const { data: banners, isPending: isBannersPending } = useQuery({
  queryKey: ['banners'],
  queryFn: getBanners,
  refetchOnWindowFocus: false,

})
</script>

<template>
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
        <div class="relative flex h-[200px] flex-col items-center overflow-hidden rounded-3xl px-[14px] py-5 lg:h-auto lg:py-32 lg:pl-16">
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
</template>
