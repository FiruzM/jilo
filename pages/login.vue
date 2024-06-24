<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'
import { getRoleLink } from '~/lib/utils'

const { toast } = useToast()
const router = useRouter()
const { me, login } = useAuth()
const user = useAuthUser()

const formLoginSchema = toTypedSchema(z.object({
  login: z.string({
    required_error: 'Укажите email',
  }).email(),
  password: z.string({
    required_error: 'Укажите пароль',
  }),
}))
const formLogin = useForm({
  validationSchema: formLoginSchema,
  keepValuesOnUnmount: true,
})

const { mutate } = useMutation({
  mutationFn: (data: definitions['models.UserLogin']) => login(data),
  onError: async () => {
    formLogin.setErrors({ login: undefined, password: 'Неверный логин или пароль' })
  },

  onSuccess: async () => {
    await me()
    router.push(getRoleLink(user.value?.role?.name))

    toast({
      title: 'Авторизация прошла успешно',
    })
  },
})

const formLoginSubmit = formLogin.handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div class="my-20 flex flex-col items-center">
    <div class="w-[500px]">
      <div class="flex flex-col items-center gap-2">
        <p class="font-semibold text-black">
          Введите номер телефона
        </p>
        <p class=" text-xs text-black">
          Мы отправим вам СМС с кодом подтверждения
        </p>
      </div>

      <form class="mt-6 flex flex-col gap-6" @submit="formLoginSubmit">
        <FormField v-slot="{ componentField }" name="login">
          <FormItem class="w-full">
            <Label>Логин</Label>
            <FormControl>
              <Input v-bind="componentField" class="h-[48px] rounded-[12px] border-[#ADADAD] font-semibold" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="w-full">
            <Label>Пароль</Label>
            <FormControl>
              <PasswordInput v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="text-sm" type="submit">
          Получить код
        </Button>
      </form>
      <NuxtLink to="/register" class="mt-10 flex h-[48px] items-center justify-center rounded-[12px] border border-primary text-sm font-semibold">
        Регистрация
      </NuxtLink>
    </div>
  </div>
</template>
