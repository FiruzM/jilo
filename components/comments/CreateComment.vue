<script setup lang="ts">
import { Pen } from 'lucide-vue-next'
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'

const { t } = useI18n()
const { toast } = useToast()
const rating = ref(0)

const formSchema = toTypedSchema(z.object({
  comment: z
    .string({
      required_error: t('obligatory_field'),
    })
    .min(10, {
      message: `${t('minimum')} 10 ${t('symbols')}`,
    })
    .max(160, {
      message: `${t('maximum')} 160 ${t('symbols')}`,
    }),
  rate: z
    .string({
      required_error: `${t('obligatory_field')}`,
    }).optional(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify({ ...values, rate: rating.value }, null, 2))),
  })
})
</script>

<template>
  <Dialog>
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
        <FormField v-slot="{ componentField }" name="comment">
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

        <FormField v-slot="{ componentField }" name="rate">
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
        <Button type="submit" class="w-full">
          {{ $t('send') }}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
