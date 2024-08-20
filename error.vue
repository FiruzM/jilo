<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex h-svh items-center justify-center p-2.5">
    <div class="flex items-center gap-5">
      <div>
        <h3 class="text-4xl font-extrabold">
          Доступ запрещён
        </h3>
        <p class="mt-2.5 max-w-[385px] text-lg text-[#999999]">
          Данную страницу могут просматривать только авторизованные пользователи или администратор
        </p>

        <Button class="mt-11" variant="outline" @click="router.push('/')">
          На главную
        </Button>
      </div>

      <div>
        <img src="~/assets/img/lock.png" alt="404 image" class="max-h-[346px] object-contain">
      </div>
    </div>
  </div>
</template>
