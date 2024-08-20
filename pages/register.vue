<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  middleware: ['guest-only'],
})

const { t } = useI18n()
const { me, register } = useAuth()
const { toast } = useToast()
const router = useRouter()

const formRegisterSchema = toTypedSchema(z.object({
  full_name: z
    .string({
      required_error: t('enter_your_name'),
    })
    .min(2, {
      message: `${t('minimum')} 2 ${t('symbols')}`,
    })
    .max(50, {
      message: `${t('maximum')} 50 ${t('symbols')}`,
    }),
  email: z
    .string({
      required_error: t('enter_your_email'),
    })
    .min(2, {
      message: `${t('minimum')} 2 ${t('symbols')}`,
    })
    .max(50, {
      message: `${t('maximum')} 50 ${t('symbols')}`,
    }).email(),
  number_phone: z
    .string({
      required_error: t('enter_your_phone'),
    })
    .min(9, {
      message: `${t('minimum')} 9 ${t('symbols')}`,
    }),
  password: z
    .string({
      required_error: t('enter_your_password'),
    })
    .min(4, {
      message: `${t('minimum')} 4 ${t('symbols')}`,
    })
    .max(50, {
      message: `${t('maximum')} 50 ${t('symbols')}`,
    }),

  repeat_password: z
    .string({
      required_error: t('repeat_your_password'),
    })
    .min(4, {
      message: `${t('minimum')} 4 ${t('symbols')}`,
    })
    .max(50, {
      message: `${t('maximum')} 50 ${t('symbols')}`,
    }),
}).refine(data => data.password === data.repeat_password, {
  message: t('passwords_do_not_match'),
  path: ['repeat_password'],
}))

const formRegister = useForm({
  validationSchema: formRegisterSchema,
  keepValuesOnUnmount: true,
})

const { mutate: sendFormData, isPending } = useMutation({
  mutationFn: (data: definitions['models.UserParams']) => register(data),
  onSuccess: async () => {
    await me()

    router.push('/profile')
    toast({
      title: t('register_successfully'),
    })
  },
})

const registerSubmit = formRegister.handleSubmit((values) => {
  sendFormData(values)
})

useHead({
  title: t('register'),
  meta: [
    { name: 'title', content: t('register') },
  ],
})
</script>

<template>
  <div class="my-20 flex flex-col items-center px-4">
    <form class="flex flex-col gap-4" @submit="registerSubmit">
      <FormField v-slot="{ componentField }" name="full_name">
        <Label>{{ $t('enter_your_full_name') }}</Label>
        <FormItem class="w-full">
          <FormControl>
            <Input v-bind="componentField" class="h-[48px] rounded-[12px] border-[#ADADAD] font-semibold" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="number_phone">
        <Label>{{ $t('phone_number') }}</Label>
        <FormItem class="w-full">
          <FormControl>
            <Input v-bind="componentField" class="h-[48px] rounded-[12px] border-[#ADADAD] font-semibold" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <Label>{{ $t('enter_email') }}</Label>
        <FormItem class="w-full">
          <FormControl>
            <Input v-bind="componentField" class="h-[48px] rounded-[12px] border-[#ADADAD] font-semibold" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex gap-2">
        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="w-full">
            <Label>{{ $t('enter_password') }}</Label>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="repeat_password">
          <FormItem class="w-full">
            <Label>{{ $t('repeat_password') }}</Label>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" :is-loading="isPending">
        {{ $t('register') }}
      </Button>
    </form>
  </div>
</template>
