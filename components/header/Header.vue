<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'

const user = useAuthUser()

const route = useRoute()

const router = useRouter()
const { logout, me } = useAuth()

const { mutate } = useMutation({
  mutationFn: () => logout(),

  onSuccess: async () => {
    await me()
    router.push('/login')
  },
})
</script>

<template>
  <div
    class="flex grow items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-500 px-12 pb-44 pt-10"
  >
    <h2 class="shadow-el text-5xl font-bold text-white">
      {{ route.meta.title }}
    </h2>
    <div class="flex items-center gap-5 pt-3">
      <Avatar class="size-14 border-2 border-white">
        <AvatarImage :src="user?.file_path!" alt="Avatar" />
        <AvatarFallback>{{ user?.full_name?.slice(0, 1) }}</AvatarFallback>
      </Avatar>

      <Popover>
        <PopoverTrigger class="rounded-xl border border-[#3c83ed] bg-white p-3">
          <LogOut class="stroke-[#3c83ed]" />
        </PopoverTrigger>
        <PopoverContent class="flex flex-col">
          <NuxtLink to="/" class="border-b pb-5 text-[#3c83ed]">
            На главную страницу
          </NuxtLink>
          <Button
            class="self-start bg-transparent pt-5 text-[#3c83ed] hover:bg-transparent"
            @click="mutate()"
          >
            Выйти
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
