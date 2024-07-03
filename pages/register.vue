<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  middleware: ['guest-only'],
})

const { me, register } = useAuth()
const { toast } = useToast()
const router = useRouter()

const formRegisterSchema = toTypedSchema(z.object({
  full_name: z
    .string({
      required_error: 'Укажите имя',
    })
    .min(2, {
      message: 'Минимум 2 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),
  email: z
    .string({
      required_error: 'Укажите email',
    })
    .min(2, {
      message: 'Минимум 2 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }).email(),
  number_phone: z
    .string({
      required_error: 'Укажите телефон',
    })
    .min(9, {
      message: 'Минимум 9 символа',
    }),
  password: z
    .string({
      required_error: 'Укажите пароль',
    })
    .min(4, {
      message: 'Минимум 4 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),

  repeat_password: z
    .string({
      required_error: 'Укажите пароль',
    })
    .min(4, {
      message: 'Минимум 4 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),
}).refine(data => data.password === data.repeat_password, {
  message: 'Пароль не совпадает',
  path: ['repeat_password'],
}))

const formRegister = useForm({
  validationSchema: formRegisterSchema,
  keepValuesOnUnmount: true,
})

const { mutate: sendFormData } = useMutation({
  mutationFn: (data: definitions['models.UserParams']) => register(data),
  onSuccess: async () => {
    await me()

    router.push('/profile')
    toast({
      title: 'Регистрация прошла успешно',
    })
  },
})

const registerSubmit = formRegister.handleSubmit((values) => {
  sendFormData(values)
})
</script>

<template>
  <div class="my-20 flex flex-col items-center px-4">
    <form class="flex flex-col gap-4" @submit="registerSubmit">
      <FormField v-slot="{ componentField }" name="full_name">
        <Label>Введите полное имя</Label>
        <FormItem class="w-full">
          <FormControl>
            <Input v-bind="componentField" class="h-[48px] rounded-[12px] border-[#ADADAD] font-semibold" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="number_phone">
        <Label>Номер телефона</Label>
        <FormItem class="w-full">
          <FormControl>
            <Input v-bind="componentField" class="h-[48px] rounded-[12px] border-[#ADADAD] font-semibold" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <Label>Введите email</Label>
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
            <Label>Введите пароль</Label>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="repeat_password">
          <FormItem class="w-full">
            <Label>Повторите пароль</Label>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit">
        Зарегистрироваться
      </Button>
    </form>
  </div>
</template>
