<script setup lang="ts">
import { Pen } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import { useToast } from '~/components/ui/toast'
import type { CommentProps } from '~/api/web/comments/create-comments'
import { createComment } from '~/api/web/comments/create-comments'

const { t } = useI18n()
const { toast } = useToast()

const rating = ref(0)

const formSchema = toTypedSchema(z.object({
  description: z
    .string({
      required_error: t('obligatory_field'),
    })
    .min(10, {
      message: `${t('minimum')} 10 ${t('symbols')}`,
    }),
  grade: z
    .string({
      required_error: `${t('obligatory_field')}`,
    }).optional(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const open = ref(false)

const { mutate, isPending } = useMutation({
  mutationFn: (data: CommentProps) => createComment(data),
  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: t('error'),
      description: errorData.message,
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    toast({
      title: t('comment_add_succsessfully'),
      description: t('comment_moderation'),

    })
    open.value = false
  },
})

const onSubmit = handleSubmit((values) => {
  mutate({ ...values, grade: rating.value })
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger class="flex items-center gap-3">
      <Pen />
      <p class="font-medium md:text-2xl">
        {{ $t('create_review') }}
      </p>
    </DialogTrigger>
    <DialogContent class="rounded-3xl p-5">
      <DialogHeader>
        <DialogTitle class="text-2xl font-semibold">
          {{ $t('create_review') }}
        </DialogTitle>
      </DialogHeader>
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormControl>
              <Textarea
                :placeholder="t('write_your_review')"
                class="min-h-[115px] resize-none rounded-[12px] border-[#D0D5DD]"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="grade">
          <FormItem>
            <FormControl>
              <div class="flex items-center">
                <p>{{ $t('rate') }} :</p>

                <NuxtRating
                  class="px-3"
                  v-bind="componentField"
                  border-color="#db8403"
                  active-color="#ffa41c"
                  inactive-color="#fff"
                  :rating-step="0.5"
                  :rounded-corners="true"
                  :border-width="5"
                  :rating-size="10"
                  :rating-value="0"
                  :read-only="false"
                  @rating-hovered="event => (rating = event)"
                />
                <p>{{ rating }}</p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full" :is-loading="isPending">
          {{ $t('send') }}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
