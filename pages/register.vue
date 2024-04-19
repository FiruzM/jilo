<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { Loader } from 'lucide-vue-next'
import type { HTTPError } from 'ky'
import { sendSms } from '~/api/auth/send-sms'
import { sendCode } from '~/api/auth/verify-sms-code'
import type { CreateRegisterProps } from '~/api/auth/register'
import { useToast } from '~/components/ui/toast'
import { getRoleLink } from '~/lib/utils'

definePageMeta({
  layout: false,
  middleware: 'guest-only',
})

const router = useRouter()
const { toast } = useToast()

const { me, register } = useAuth()
const user = useAuthUser()

const activeTab = ref('phone')

async function handleError(error: HTTPError) {
  const errorData = await error.response.json()

  toast({
    title: 'Произошла ошибка',
    description: errorData.message,
    variant: 'destructive',
  })
}

const phoneSchema = toTypedSchema(z.object({
  phone: z.string().min(9).max(9),
}))

const verifySchema = toTypedSchema(z.object({
  code: z.string().min(4).max(4),
}))

const registerSchema = toTypedSchema(z.object({
  role_name: z.enum(['entrepreneur', 'investor', 'ecosystem'], {
    required_error: 'Требуется выбрать роль',
  }),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  password: z.string().min(1),
  password_confirmation: z.string().min(1),
}).refine(data => data.password === data.password_confirmation, {
  message: 'Пароль не совпадает',
  path: ['password_confirmation'],
}))

const formSchema = computed(() => {
  if (activeTab.value === 'phone')
    return phoneSchema
  else if (activeTab.value === 'register')
    return registerSchema
  else return verifySchema
})

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

const { mutate: sendSmsData, isPending: isSmsPending } = useMutation({
  mutationFn: (phone: string) => sendSms(phone),

  onError: handleError,
  onSuccess: () => {
    activeTab.value = 'verify'
  },
})

const { mutate: sendCodeData, isPending: isCodePending } = useMutation({
  mutationFn: (code: string) => sendCode({ code, phone: form.values.phone }),

  onError: handleError,
  onSuccess: () => {
    activeTab.value = 'register'
  },
})

const { mutate: sendFormData, isPending: isFormPending } = useMutation({
  mutationFn: (data: CreateRegisterProps) => register(data),

  onError: handleError,
  onSuccess: async () => {
    await me()

    router.push(getRoleLink(user.value?.role.name))
  },
})

const submitPhone = form.handleSubmit((values) => {
  sendSmsData(values.phone)
})

const submitCode = form.handleSubmit((values: any) => {
  sendCodeData(values.code)
})

const registerSubmit = form.handleSubmit((values: any) => {
  sendFormData(values)
})
</script>

<template>
  <div>
    <NuxtLayout name="website">
      <template #header>
        <div
          class="gradient absolute top-0 left-0 -z-10 w-full h-full"
        />
        <div class="flex justify-center mt-28 min-h-[80vh] ">
          <Tabs v-model="activeTab" class="flex flex-col md:flex-row items-center md:gap-5 lg:gap-10">
            <TabsList class="hidden">
              <TabsTrigger :disabled="activeTab !== 'phone'" value="phone">
                {{ $t('enter_your_phone') }}
              </TabsTrigger>

              <TabsTrigger :disabled="activeTab !== 'verify'" value="verify">
                {{ $t('verify_your_phone') }}
              </TabsTrigger>

              <TabsTrigger :disabled="activeTab !== 'register'" value="form">
                {{ $t('fill_form') }}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="phone" class="self-start">
              <form class="sm:min-w-[562px] flex flex-col items-center gap-4 p-5 md:p-10 border rounded-3xl lg:rounded-[44px] bg-white" @submit="submitPhone">
                <div>
                  <h2 class="text-2xl md:text-5xl lg:text-7xl text-green font-bold text-center md:mb-5 lg:mb-10">
                    {{ $t('registartion') }}
                  </h2>
                </div>

                <FormField v-slot="{ componentField }" name="phone">
                  <FormItem class="w-full">
                    <FormControl>
                      <Input :placeholder="$t('enter_your_phone')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button class="w-full rounded-full bg-green md:mt-5 lg:mt-10 hover:bg-green transition-all ease-in hover:shadow-xl" type="submit">
                  <Loader v-if="isSmsPending" class="animate-spin w-5 h-5" />
                  <p v-else class="text-base font-semibold">
                    {{ $t('send_phone') }}
                  </p>
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="verify" class="self-start">
              <form class="sm:min-w-[562px] flex flex-col items-center gap-4 p-5 md:p-10 border rounded-3xl lg:rounded-[44px] bg-white" @submit="submitCode">
                <div class="flex flex-col items-center md:mb-5 lg:mb-10">
                  <h2 class="text-xl lg:text-3xl text-green font-bold text-center ">
                    {{ $t('confirmation_registaration') }}
                  </h2>
                  <p class="max-w-[383px] text-green font-semibold text-center mt-5">
                    {{ $t('to_your_phone') }} {{ form.values.phone?.slice(0, 3) }} ** ** {{ form.values.phone?.slice(-2) }} {{ $t('send_sms') }}
                  </p>
                </div>

                <FormField v-slot="{ componentField }" name="code">
                  <FormItem class="w-full">
                    <FormControl>
                      <Input :placeholder="$t('enter_your_code')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button class="w-full rounded-full bg-green md:mt-5 lg:mt-10 hover:bg-green transition-all ease-in hover:shadow-xl" type="submit">
                  <Loader v-if="isCodePending" class="animate-spin w-5 h-5" />
                  <p v-else class="text-base font-semibold">
                    {{ $t('confirm') }}
                  </p>
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form class="sm:min-w-[562px] flex flex-col items-center gap-4 p-5 md:p-10 border rounded-3xl lg:rounded-[44px] bg-white" @submit="registerSubmit">
                <h2 class="text-2xl md:text-5xl lg:text-7xl text-green font-bold text-center md:mb-5 lg:mb-10">
                  {{ $t('registartion') }}
                </h2>

                <FormField v-slot="{ componentField }" type="radio" name="role_name">
                  <FormItem class="space-y-3">
                    <FormControl>
                      <RadioGroup
                        class="flex flex-wrap lg:flex-nowrap gap-5 lg:gap-20 lg:mb-10"
                        v-bind="componentField"
                      >
                        <FormItem class="flex items-center space-y-0 gap-x-3">
                          <FormControl>
                            <RadioGroupItem value="entrepreneur" />
                          </FormControl>
                          <FormLabel class="font-bold text-green">
                            {{ $t('startup') }}
                          </FormLabel>
                        </FormItem>
                        <FormItem class="flex items-center space-y-0 gap-x-3">
                          <FormControl>
                            <RadioGroupItem value="investor" />
                          </FormControl>
                          <FormLabel class="font-bold text-green">
                            {{ $t('investor') }}
                          </FormLabel>
                        </FormItem>
                        <FormItem class="flex items-center space-y-0 gap-x-3">
                          <FormControl>
                            <RadioGroupItem value="ecosystem" />
                          </FormControl>
                          <FormLabel class="font-bold text-green">
                            {{ $t('ecosystem') }}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="last_name">
                  <FormItem class="w-full">
                    <FormControl>
                      <Input :placeholder="$t('second_name')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="first_name">
                  <FormItem class="w-full">
                    <FormControl>
                      <Input :placeholder="$t('first_name')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                  <FormItem class="w-full">
                    <FormControl>
                      <Input type="email" :placeholder="$t('email')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phone">
                  <FormItem class="w-full">
                    <FormControl>
                      <Input :placeholder="$t('phone_number')" v-bind="componentField" disabled class="rounded-none border-t-0 border-l-0 border-r-0 border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                  <FormItem class="w-full">
                    <FormControl>
                      <PasswordInput :placeholder="$t('password')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 !border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password_confirmation">
                  <FormItem class="w-full">
                    <FormControl>
                      <PasswordInput :placeholder="$t('password_confirm')" v-bind="componentField" class="rounded-none border-t-0 border-l-0 border-r-0 !border-green bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button class="w-full rounded-full bg-green md:mt-5 lg:mt-10 hover:bg-green transition-all ease-in hover:shadow-xl" type="submit">
                  <Loader v-if="isFormPending" class="animate-spin w-5 h-5" />
                  <p v-else class="text-base font-semibold">
                    {{ $t('log_in') }}
                  </p>
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<style>
.gradient{
  background: linear-gradient(90deg, #085078 0%, #85D8CE 100%);
}
</style>
