<script setup lang="ts">
import qs from 'qs'
import { deleteBanner } from '~/api/admin/banners/delete-banner'
import { getBanners } from '~/api/admin/banners/get-banners'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Баннеры',
})

const { toast } = useToast()
const route = useRoute()
const searchParams = computed(() => qs.stringify(route.query))

const { data: banners, refetch, isPending } = useQuery({
  queryKey: ['banners', searchParams],
  queryFn: getBanners,
})

const { mutate } = useMutation({
  mutationFn: (data: number | undefined) => deleteBanner(data),

  onSuccess: () => {
    refetch()

    toast({
      title: 'Баннер успешно удален',
    })
  },
})
</script>

<template>
  <div>
    <div v-if="isPending" class="grid grid-cols-2 gap-5">
      <Skeleton v-for="(_, index) in 6" :key="index" class="h-[350px] w-[263px] rounded-md" />
    </div>

    <div v-else class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div v-if="banners?.payload.length === 0" class="col-span-2 flex justify-center">
        <p class="text-2xl font-semibold text-[#488bee]">
          Добавьте баннер
        </p>
      </div>

      <div v-for="banner in banners?.payload" :key="banner.id" class="flex flex-col gap-4 rounded-md border p-4">
        <img :src="banner.file_path" alt="Banner" class="h-[200px] md:h-[300px]">

        <div>
          <p>Титул: {{ banner.title }}</p>
          <p>Подтитул: {{ banner.subtitle }}</p>
          <p>Ссылка: {{ banner.banner_link }}</p>
        </div>

        <div class="flex justify-end gap-4">
          <AlertDialog>
            <AlertDialogTrigger class="rounded-md border border-[#488bee] bg-[#488bee] p-2 text-white hover:bg-white hover:text-black">
              Удалить
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription>
                  Вы действительно хотите удалить?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Нет</AlertDialogCancel>
                <AlertDialogAction @click="mutate(banner.id)">
                  Да
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <NuxtLink :to="`/admin/banners/${banner.id}`" class="rounded-md border border-[#488bee] bg-[#488bee] p-2 text-white hover:cursor-pointer hover:bg-white hover:text-black">
            Изменить
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div v-if="banners?.payload.length > 0" class="mt-5 flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="banners?.total"
      :sibling-count="1"
      show-edges
      :default-page="$route.query.page ? Number($route.query.page) : 1"
      @update:page="$router.push({ query: { page: $event } })"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst class="border-[#488bee]" />
        <PaginationPrev class="border-[#488bee]" />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="size-10 p-0" :class="item.value === page ? 'bg-[#488bee] text-white hover:bg-[#488bee]' : 'bg-white border border-[#488bee] hover:bg-[#488bee]'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext class="border-[#488bee]" />
        <PaginationLast class="border-[#488bee]" />
      </PaginationList>
    </Pagination>
  </div>

  <div class="mt-10 flex justify-end">
    <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" @click="$router.push('/admin/banners/create')">
      Добавить баннер
    </Button>
  </div>
</template>
