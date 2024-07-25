<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'
import { getRoleLink } from '~/lib/utils'

definePageMeta({
  middleware: ['guest-only'],
})

const { t } = useI18n()

const { toast } = useToast()
const router = useRouter()
const { me, login } = useAuth()
const user = useAuthUser()

const formLoginSchema = toTypedSchema(z.object({
  login: z.string({
    required_error: t('enter_your_email'),
  }).email({ message: t('invalid_email') }),
  password: z.string({
    required_error: t('enter_your_password'),
  }),
}))
const formLogin = useForm({
  validationSchema: formLoginSchema,
  keepValuesOnUnmount: true,
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.UserLogin']) => login(data),
  onError: async () => {
    formLogin.setErrors({ login: undefined, password: t('incorect_password') })
  },

  onSuccess: async () => {
    await me()
    router.push(getRoleLink(user.value?.role?.name))

    toast({
      title: t('authorization_successfully'),
    })
  },
})

const formLoginSubmit = formLogin.handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <ClientOnly>
    <div class="my-20 flex flex-col items-center">
      <div class="w-full px-4 sm:w-[500px]">
        <div class="flex flex-col items-center gap-2">
          <p class="font-semibold text-black">
            {{ $t('authorization') }}
          </p>
        </div>

        <form class="mt-6 flex flex-col gap-4 md:gap-6" @submit="formLoginSubmit">
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
              <Label>{{ $t('password') }}</Label>
              <FormControl>
                <PasswordInput v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button class="text-sm" type="submit" :is-loading="isPending">
            {{ $t('login') }}
          </Button>
        </form>
        <NuxtLink to="/register" class="mt-5 flex h-[48px] items-center justify-center rounded-[12px] border border-primary text-sm font-semibold md:mt-10">
          {{ $t('registration') }}
        </NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>
