<script setup lang="ts">
import { QrCode } from 'lucide-vue-next'

const { t } = useI18n()

useHead({
  title: t('payment'),
  meta: [
    { name: 'title', content: t('payment') },
  ],
})

const bankLogo = ref('alif')
</script>

<template>
  <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:gap-10 lg:px-10 lg:pb-16 lg:pt-[100px] ">
    <div class="relative">
      <Tabs v-model="bankLogo" :default-value="bankLogo" class="mt-5">
        <TabsList class="gap-6 bg-transparent">
          <h3 class="text-sm font-semibold text-black lg:text-3xl">
            {{ $t('choose_bank') }}
          </h3>
          <TabsTrigger value="alif" class="rounded-[12px] border border-[#00AF66] bg-white p-0 px-[30px] py-[15px] data-[state=active]:bg-[#00AF66]">
            <img v-if="bankLogo === 'alif'" src="~/assets/img/alif.png" alt="Alif">
            <img v-else src="~/assets/img/alif_inactive.png" alt="Alif">
          </TabsTrigger>
          <TabsTrigger value="dc" class="rounded-[12px] border border-[#0456A2] bg-white px-[30px] py-[15px] data-[state=active]:bg-[#0456A2]">
            <img v-if="bankLogo === 'dc'" src="~/assets/img/dc_active.png" alt="DC">
            <img v-else src="~/assets/img/dc.png" alt="DC">
          </TabsTrigger>
        </TabsList>
        <TabsContent value="alif" class="mt-[111px] flex gap-[92px]">
          <img src="~/assets/img/qr.png" alt="QR">
          <div class="mt-[33px]">
            <QrCode class="size-[83px] stroke-primary" />
            <p class="mt-[27px] text-6xl font-semibold">
              {{ $t('open_alif_qr') }}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="dc" class="flex gap-[92px]">
          <img src="~/assets/img/qr.png" alt="QR">
          <div class="mt-[33px]">
            <QrCode class="size-[83px] stroke-primary" />
            <p class="mt-[27px] text-6xl font-semibold">
              {{ $t('open_dc_qr') }}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <div class="mt-[99px]">
      <h3 class="text-3xl font-semibold">
        {{ $t('instruction') }}
      </h3>

      <div class="mt-10 flex  gap-14">
        <div class="flex gap-8">
          <div class="h-[434px] w-[200px] overflow-hidden rounded-[15px]">
            <img src="~/assets/img/1.jpg" alt="step 1" class="size-full">
          </div>
          <div class="relative">
            <svg width="33" height="70" viewBox="0 0 33 70" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute left-0 top-0 -z-10">
              <path d="M32.8636 0V69.8182H16.0227V15.75H15.6136L0 25.2955V10.7045L17.2159 0H32.8636Z" fill="#FFE4E8" />
            </svg>

            <p class="max-w-[148px] pl-7 text-xl text-[#252C32]">
              {{ $t('open_alif_app') }}
            </p>
          </div>
        </div>

        <div class="flex gap-8">
          <div class="h-[434px] w-[200px] overflow-hidden rounded-[15px]">
            <img src="~/assets/img/2.jpg" alt="step 2" class="size-full">
          </div>
          <div class="relative">
            <svg width="53" height="71" viewBox="0 0 53 71" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute left-0 top-0 -z-10">
              <path d="M1.02273 70.7727V58.6364L26.4886 36.3409C28.3977 34.6136 30.0227 33.0341 31.3636 31.6023C32.7045 30.1477 33.7273 28.6932 34.4318 27.2386C35.1364 25.7614 35.4886 24.1591 35.4886 22.4318C35.4886 20.5 35.0682 18.8523 34.2273 17.4886C33.3864 16.1023 32.2273 15.0341 30.75 14.2841C29.2727 13.5341 27.5795 13.1591 25.6705 13.1591C23.7386 13.1591 22.0455 13.5568 20.5909 14.3523C19.1364 15.125 18 16.25 17.1818 17.7273C16.3864 19.2045 15.9886 21 15.9886 23.1136H0C0 18.3636 1.06818 14.2614 3.20455 10.8068C5.34091 7.35227 8.34091 4.69318 12.2045 2.82955C16.0909 0.943182 20.6023 0 25.7386 0C31.0341 0 35.6364 0.886364 39.5455 2.65909C43.4545 4.43182 46.4773 6.90909 48.6136 10.0909C50.7727 13.25 51.8523 16.9205 51.8523 21.1023C51.8523 23.7614 51.3182 26.3977 50.25 29.0114C49.1818 31.625 47.2614 34.5114 44.4886 37.6705C41.7386 40.8295 37.8295 44.6136 32.7614 49.0227L24.4091 56.7273V57.1705H52.7045V70.7727H1.02273Z" fill="#FFE4E8" />
            </svg>

            <p class="max-w-[158px] pl-8 text-xl text-[#252C32]">
              {{ $t('choose_qr') }}
            </p>
          </div>
        </div>

        <div class="flex gap-8">
          <div class="h-[434px] w-[200px] overflow-hidden rounded-[15px]">
            <img src="~/assets/img/3.jpg" alt="step 3" class="size-full">
          </div>
          <div class="relative">
            <svg width="56" height="72" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute left-0 top-0 -z-10">
              <path d="M27.4432 71.7273C22.125 71.7273 17.4091 70.8182 13.2955 69C9.20455 67.1591 5.97727 64.625 3.61364 61.3977C1.25 58.1705 0.0454545 54.4545 0 50.25H16.9773C17.0455 51.7727 17.5341 53.125 18.4432 54.3068C19.3523 55.4659 20.5909 56.375 22.1591 57.0341C23.7273 57.6932 25.5114 58.0227 27.5114 58.0227C29.5114 58.0227 31.2727 57.6705 32.7955 56.9659C34.3409 56.2386 35.5455 55.25 36.4091 54C37.2727 52.7273 37.6932 51.2727 37.6705 49.6364C37.6932 48 37.2273 46.5455 36.2727 45.2727C35.3182 44 33.9659 43.0114 32.2159 42.3068C30.4886 41.6023 28.4432 41.25 26.0795 41.25H19.2955V29.25H26.0795C28.1477 29.25 29.9659 28.9091 31.5341 28.2273C33.125 27.5455 34.3636 26.5909 35.25 25.3636C36.1364 24.1136 36.5682 22.6818 36.5455 21.0682C36.5682 19.5 36.1932 18.125 35.4205 16.9432C34.6705 15.7386 33.6136 14.8068 32.25 14.1477C30.9091 13.4886 29.3523 13.1591 27.5795 13.1591C25.7159 13.1591 24.0227 13.4886 22.5 14.1477C21 14.8068 19.8068 15.7386 18.9205 16.9432C18.0341 18.1477 17.5682 19.5455 17.5227 21.1364H1.39773C1.44318 16.9773 2.60227 13.3182 4.875 10.1591C7.14773 6.97727 10.2386 4.48864 14.1477 2.69318C18.0795 0.897728 22.5568 0 27.5795 0C32.5795 0 36.9773 0.875 40.7727 2.625C44.5682 4.375 47.5227 6.76136 49.6364 9.78409C51.75 12.7841 52.8068 16.1818 52.8068 19.9773C52.8295 23.9091 51.5455 27.1477 48.9545 29.6932C46.3864 32.2386 43.0795 33.8068 39.0341 34.3977V34.9432C44.4432 35.5795 48.5227 37.3295 51.2727 40.1932C54.0455 43.0568 55.4205 46.6364 55.3977 50.9318C55.3977 54.9773 54.2045 58.5682 51.8182 61.7045C49.4545 64.8182 46.1591 67.2727 41.9318 69.0682C37.7273 70.8409 32.8977 71.7273 27.4432 71.7273Z" fill="#FFE4E8" />
            </svg>

            <p class="max-w-[189px] pl-6 text-xl text-[#252C32]">
              {{ $t('enter_total_price') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
