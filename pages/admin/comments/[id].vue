<script setup lang="ts">
import { format } from 'date-fns'
import { useToast } from '~/components/ui/toast'
import { getReview } from '~/api/admin/reviews/get-review'
import { type ReviewProps, updateReview } from '~/api/admin/reviews/update-review'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Заказы',
})

const params: any = useRoute().params
const router = useRouter()
const { toast } = useToast()

const { data: review } = useQuery({
  queryKey: ['review', params],
  queryFn: () => getReview(params.id),
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: ReviewProps) => updateReview(data),
  onSuccess: () => {
    router.push('/admin/comments')

    toast({
      title: 'Комментарий одобрен',
    })
  },
})
</script>

<template>
  <div class="mx-auto flex max-w-[1360px] flex-col gap-4 px-4 pb-10 pt-8 lg:gap-10 lg:px-10 lg:pb-16 lg:pt-[100px] ">
    <div>
      <h3 class="border-b border-[#D5D5D5] pb-4 text-sm font-semibold lg:text-2xl">
        Информация о комментарии
      </h3>
      <div class="flex justify-between pb-5 pt-8 sm:justify-normal sm:gap-6 ">
        <div class="flex flex-col gap-8">
          <p>
            Дата
          </p>
          <p>
            Пользователь
          </p>
        </div>

        <div class="flex flex-col gap-8">
          <p v-if="review?.payload.created_at" class="font-semibold">
            {{ format(new Date(review.payload.created_at), 'dd.MM.yyyy') }}
          </p>
          <p class="font-semibold">
            {{ review?.payload.full_name }}
          </p>
        </div>
      </div>
    </div>

    <h3 class="text-3xl font-semibold">
      Комментарий
    </h3>
    <p>{{ review?.payload?.description }}</p>

    <div class="flex justify-end">
      <Button class="bg-[#3c83ed] text-white hover:bg-[#10a4e9]" :is-loading="isPending" @click="mutate({ ...review?.payload, status: 'accepted' })">
        Принять
      </Button>
    </div>
  </div>
</template>
