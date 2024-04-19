<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { Loader } from 'lucide-vue-next'
import type { HTTPError } from 'ky'
import type { LoginProps } from '~/api/auth/login'
import { useToast } from '~/components/ui/toast'
import { getRoleLink } from '~/lib/utils'

definePageMeta({
  layout: false,
  middleware: 'guest-only',
})

const router = useRouter()
const { login, me } = useAuth()
const { toast } = useToast()
const user = useAuthUser()

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(1),
}))

const form = useForm({
  validationSchema: formSchema,
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: LoginProps) => login(data),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })

    form.setErrors({ email: undefined, password: errorData.message })
  },

  onSuccess: async () => {
    await me()

    router.push(getRoleLink(user.value?.role.name))
  },
})

const onSubmit = form.handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div
    class="gradient absolute top-0 left-0 -z-10 w-full h-full"
  />
  <div class="flex justify-center items-center min-h-[80vh]">
    <form class="sm:min-w-[562px] flex flex-col items-center gap-4 p-5 md:p-10 border rounded-3xl lg:rounded-[44px] bg-white" @submit="onSubmit">
      <div>
        <h2 class="text-2xl md:text-5xl lg:text-7xl text-green font-bold text-center md:mb-5 lg:mb-10">
          {{ $t('login') }}
        </h2>
      </div>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="w-full">
          <FormControl>
            <Input type="email" :placeholder="$t('enter_your_email')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="w-full">
          <FormControl>
            <PasswordInput :placeholder="$t('enter_your_password')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 !border-green bg-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="w-full rounded-full bg-green md:mt-5 lg:mt-10 hover:bg-green transition-all ease-in hover:shadow-xl" type="submit">
        <Loader v-if="isPending" class="animate-spin w-5 h-5" />
        <p v-else class="text-base font-semibold">
          {{ $t('log_in') }}
        </p>
      </Button>

      <p class="text-green text-xs md:text-sm md:mt-5 text-center">
        {{ $t('no_account') }} <NuxtLink to="/register" class="text-primary font-bold">
          {{ $t('account_registration') }}
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
