<template>
  <div class="group overflow-hidden border-white transition-all ease-in xl:rounded-3xl xl:border-[10px] xl:hover:border-[#CCE3DE] xl:hover:bg-[#CCE3DE]">
    <div class="relative flex items-center justify-center rounded-[12px] bg-[#F1F4FA] p-9 sm:rounded-3xl ">
      <img src="/assets/img/item.png" class="size-[102px] md:size-[142px] lg:size-[182px]" alt="Item">
      <span class="absolute left-3 top-5 rounded-[3px] bg-primary-foreground px-1 text-sm font-semibold leading-5 text-[#FFDCCD] sm:left-5 md:rounded-md">-20%</span>
      <span class="absolute left-3 top-[38px] rounded-[3px] bg-primary px-1 text-sm font-bold leading-5 text-primary-foreground sm:left-5 md:top-[50px] md:rounded-md">+30 Б</span>

      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-5 top-5 transition-all ease-in-out xl:opacity-0 xl:group-hover:opacity-100">
        <path d="M18 12C19.49 10.54 21 8.79 21 6.5C21 5.04131 20.4205 3.64236 19.3891 2.61091C18.3576 1.57946 16.9587 1 15.5 1C13.74 1 12.5 1.5 11 3C9.5 1.5 8.26 1 6.5 1C5.04131 1 3.64236 1.57946 2.61091 2.61091C1.57946 3.64236 1 5.04131 1 6.5C1 8.8 2.5 10.55 4 12L11 19L18 12Z" stroke="#4A5759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="mt-4 flex flex-col">
      <p class="text-xs font-semibold sm:text-sm md:text-base">
        Краситель гелевый MIXIE Бирюзовый 20 гр
      </p>
      <span class="text-[10px] text-[#8CA9AE]">На складе 200 шт.</span>
      <span class="font-semibold text-[#809A9E]">12.00 с..</span>

      <Button class="mt-4 text-sm transition-all ease-in-out md:mt-6 xl:opacity-0 xl:group-hover:opacity-100">
        <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.04999 2.04999H4.04999L6.70999 14.47C6.80757 14.9248 7.06066 15.3315 7.4257 15.6198C7.79074 15.9082 8.24489 16.0603 8.70999 16.05H18.49C18.9452 16.0493 19.3865 15.8933 19.741 15.6078C20.0956 15.3224 20.3421 14.9245 20.44 14.48L22.09 7.04999H5.11999M8.99999 21C8.99999 21.5523 8.55227 22 7.99999 22C7.4477 22 6.99999 21.5523 6.99999 21C6.99999 20.4477 7.4477 20 7.99999 20C8.55227 20 8.99999 20.4477 8.99999 21ZM20 21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21C18 20.4477 18.4477 20 19 20C19.5523 20 20 20.4477 20 21Z" stroke="#4A5759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        В корзину
      </Button>
    </div>
  </div>
</template>
