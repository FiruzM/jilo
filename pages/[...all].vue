<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex h-svh items-center justify-center p-2.5">
    <div class="flex items-center gap-5">
      <div>
        <h3 class="text-4xl font-extrabold">
          Страница не найдена
        </h3>
        <p class="mt-2.5 max-w-[385px] text-lg text-[#999999]">
          Проверьте корректность введённого адреса или повторите попытку позже
        </p>

        <Button class="mt-11" variant="outline" @click="router.push('/')">
          На главную
        </Button>
      </div>

      <div>
        <img src="~/assets/img/error.png" alt="404 image" class="max-h-[346px] object-contain">
      </div>
    </div>
  </div>
</template>
