<script setup lang="ts">

</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
      {{ $t('reviews') }}
    </h2>
    <CommentsCreateComment />
  </div>

  <Carousel class="mt-5 lg:mt-10">
    <CarouselContent>
      <CarouselItem v-for="(_, index) in 4" :key="index">
        <div class="relative rounded-[12px] bg-[#CCE3DE] p-5 lg:rounded-3xl lg:px-24 lg:py-20">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
            <Avatar class="size-[83px] border-4 border-primary-foreground sm:size-[103px] lg:size-[166px]">
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-2 md:gap-4">
              <p class="text-xl font-semibold text-primary-foreground sm:text-3xl lg:text-[40px]">
                Саида Рустамова
              </p>
              <div class="flex items-center">
                <span>3.5</span>
                <NuxtRating
                  class="px-3"
                  border-color="#db8403"
                  active-color="#ffa41c"
                  inactive-color="white"
                  :rounded-corners="true"
                  :border-width="5"
                  :rating-size="10"
                  :rating-value="3.5"
                />
              </div>
              <p class="text-sm text-primary-foreground sm:text-base lg:text-xl">
                Заказывала во многоих кондитерских магазинах, но остановилась именно на Чило Эксклюзив. Отличный магазин с наверно лучшими ценами в Таджикистане. Заказываю всегда доставку и курьер привозят всегда вовремя в договоренный промежуток времени.
              </p>
            </div>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <div class="absolute right-20 top-10 flex lg:hidden">
      <CarouselPrevious class="-left-10 border-none bg-primary-foreground stroke-[#FFDCCD]" />
      <CarouselNext class="border-none bg-primary-foreground " />
    </div>

    <CarouselPrevious class="left-10 hidden border-none bg-primary-foreground stroke-[#FFDCCD] lg:flex" />
    <CarouselNext class="right-10 hidden border-none bg-primary-foreground lg:flex" />
  </Carousel>
</template>
