<script setup lang="ts">
import { Box, Heart, LogOut, SquarePen } from 'lucide-vue-next'

const user = useAuthUser()

const { logout, me } = useAuth()
const router = useRouter()

const { mutate } = useMutation({
  mutationFn: () => logout(),

  onSuccess: async () => {
    await me()
    router.push('/login')
  },
})
</script>

<template>
  <div class="flex flex-col gap-6 rounded-3xl border border-[#D5D5D5] p-4">
    <ClientOnly>
      <div class="flex flex-col items-center gap-4 rounded-[8px] bg-[#EBF7F4] px-8 py-4">
        <Avatar class="size-20">
          <AvatarImage :src="user?.file_path!" alt="Avatar" />
          <AvatarFallback>{{ user?.full_name?.slice(0, 1) }}</AvatarFallback>
        </Avatar>

        <div class="flex flex-col items-center">
          <p class="font-semibold">
            {{ user?.full_name }}
          </p>

          <span class="mt-[6px] text-xs text-[#8CA9AE]">{{ user?.number_phone }}</span>

          <NuxtLink to="/profile/update" class="mt-2 flex items-center gap-1 text-[10px] text-[#8CA9AE]">
            <SquarePen class="size-3" />
            {{ $t('edit_profile') }}
          </NuxtLink>
        </div>
      </div>
    </ClientOnly>

    <ul>
      <li class="rounded-[8px] p-4 [&.router-link-active]:bg-primary-foreground">
        <NuxtLink to="/order" class="flex items-center gap-2 [&.router-link-active]:text-[#FFDCCD]">
          <Box class="[&.router-link-active]:stroke-[#FFDCCD]" />
          {{ $t('orders') }}
        </NuxtLink>
      </li>

      <li class=" ">
        <NuxtLink to="/favorites" class="flex items-center gap-2 rounded-[8px] p-4 [&.router-link-active]:bg-primary-foreground [&.router-link-active]:text-[#FFDCCD]">
          <Heart class="[&.router-link-active]:stroke-[#FFDCCD]" />
          {{ $t('favorites') }}
        </NuxtLink>
      </li>
    </ul>

    <Button class="mt-[34px] flex gap-3 self-start bg-transparent pl-4 text-[#F76659] hover:bg-transparent" @click="mutate()">
      <LogOut class="stroke-[#FFB5AE]" />

      {{ $t('logout') }}
    </Button>
  </div>
</template>
