<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { UserRound } from 'lucide-vue-next'
import type { definitions } from '~/api/v1'
import { updateProfile } from '~/api/auth/update-user'
import { currentUser } from '~/api/auth/current-user'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  middleware: ['user-only'],
})

const { t } = useI18n()
const user = useAuthUser()
const authStor = useAuth()
const { toast } = useToast()

const { refetch } = useQuery({
  queryKey: ['user'],
  queryFn: () => currentUser(),
})

const MAX_IMAGE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = computed(() => toTypedSchema(z.object({
  avatar: z
    .any({ message: t('choose_file') })
    .refine(file => file)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      t('supported_only'),
    )
    .refine(file => file?.size <= MAX_IMAGE_SIZE, `${t('max_size')} -1МБ`)
    .optional(),
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
  number_phone: z
    .string({
      required_error: t('enter_your_phone'),
    })
    .min(9, {
      message: `${t('minimum')} 9 ${t('symbols')}`,
    }),
})))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

form.setValues({
  full_name: user.value?.full_name,
  number_phone: user.value?.number_phone,
})

const avatarPreview = computed(() => {
  const avatar: File = form.values?.avatar
  const avatarPost = user.value?.file_path

  if (avatar)
    return URL.createObjectURL(avatar)

  if (avatarPost)
    return avatarPost

  return avatar ? window.URL.createObjectURL(avatar) : null
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.AddUserParams']) => updateProfile(data),

  onSuccess: async () => {
    const userData = await refetch()
    authStor.setUser(userData.data.payload[0])
    toast({
      title: 'Профиль успешно изменен',
    })
  },
})

const onSubmit = form.handleSubmit((values: any) => {
  mutate(values)
})
</script>

<template>
  <ClientOnly>
    <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 lg:flex lg:gap-10 lg:px-10 lg:pb-16 lg:pt-10 ">
      <AsidebarProfile class="hidden lg:block" />

      <form @submit="onSubmit">
        <div class="flex items-center gap-4">
          <div v-if="!avatarPreview" class="flex size-20 items-center justify-center rounded-full bg-gray-100">
            <UserRound class="size-10" />
          </div>
          <div v-else class="size-20 overflow-hidden rounded-full">
            <img :src="avatarPreview" alt="Avatar" class="size-20 rounded-full">
          </div>
          <FormField
            v-slot="{ handleChange, handleBlur, value }"
            name="avatar"
          >
            <FormItem>
              <FormControl>
                <div class="flex  w-full max-w-3xl items-center justify-between p-1">
                  <div class="relative flex items-center rounded-full focus-within:outline-1 focus-within:outline-offset-2">
                    <Input
                      :key="value"
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      type="file" class="absolute inset-0 h-full opacity-0"
                      @change="handleChange"
                      @blur="handleBlur"
                    />
                    <div class="flex flex-col gap-2 ">
                      <p class="flex gap-3 text-center text-[18px] text-[#EDAFB8] hover:cursor-pointer sm:text-base">
                        {{ t('upload_image') }}
                      </p>

                      <span class="max-w-[176px] text-[11px] leading-4 text-[#8CA9AE]">
                        {{ t('required_permission') }}
                      </span>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <h3 class="mt-9 font-semibold">
          {{ t('personal_data') }}
        </h3>

        <div class="mt-9 flex flex-col gap-4">
          <FormField v-slot="{ componentField }" name="full_name">
            <FormItem>
              <FormLabel class="text-sm font-medium text-[#8CA9AE]">
                {{ t('full_name') }}
              </FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" class="h-14 w-full rounded-xl border-[#D5D5D5] sm:w-[529px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="number_phone">
            <FormItem>
              <FormLabel class="text-sm font-medium text-[#8CA9AE]">
                {{ t('phone_number') }}
              </FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" class="h-14 w-full rounded-xl border-[#D5D5D5] sm:w-[529px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button type="submit" class="mt-9 w-full max-w-[529px] rounded-xl" :is-loading="isPending">
          {{ t('save') }}
        </Button>
      </form>
    </div>
  </ClientOnly>
</template>
