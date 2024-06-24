<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { UserRound } from 'lucide-vue-next'

definePageMeta({
  middleware: ['user-only'],
})

// const { refetch } = useQuery({
//   queryKey: ['user'],
//   queryFn: () => currentUser(),
// })

const user = useAuthUser()

const MAX_IMAGE_SIZE = 100000 // 100KB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = computed(() => toTypedSchema(z.object({
  avatar: z
    .any()
    .refine(file => file)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png formats are supported.',
    )
    .refine(file => file?.size <= MAX_IMAGE_SIZE, `Max image size is 100KB.`)
    .optional(),
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
  number_phone: z
    .string({
      required_error: 'Укажите телефон',
    })
    .min(9, {
      message: 'Минимум 9 символа',
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

const onSubmit = form.handleSubmit((values) => {
  // eslint-disable-next-line no-console
  console.log('Form submitted!', values)
})
</script>

<template>
  <div class="mx-auto max-w-[1360px] gap-6 px-4 pb-10 pt-8 lg:flex lg:gap-10 lg:px-10 lg:pb-16 lg:pt-10 ">
    <AsidebarProfile class="hidden lg:block" />

    <form @submit="onSubmit">
      <div class="flex items-center gap-4">
        <div v-if="!avatarPreview" class="flex size-20 items-center justify-center rounded-full bg-gray-100">
          <UserRound class="size-10" />
        </div>
        <div v-else class="size-20 overflow-hidden rounded-full">
          <img :src="`https://f8f726d3171d.vps.myjino.ru/${avatarPreview}`" alt="Avatar" class="size-20 rounded-full">
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
                    type="file" class="absolute inset-0 -z-10 h-full opacity-0"
                    @change="handleChange"
                    @blur="handleBlur"
                  />
                  <div class="flex flex-col gap-2 ">
                    <p class="flex gap-3 text-center text-[18px] text-[#EDAFB8] hover:cursor-pointer sm:text-base">
                      Загрузить фото
                    </p>

                    <span class="max-w-[176px] text-[11px] leading-4 text-[#8CA9AE]">
                      Требуемое разрешение 250х250
                      Формат - jpeg, png, webp
                      Размер не более 2 Мб
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
        Контактная информация
      </h3>

      <div class="mt-9 flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="full_name">
          <FormItem>
            <FormLabel class="text-sm font-medium text-[#8CA9AE]">
              Полное имя
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
              Номер телефона
            </FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" class="h-14 w-full rounded-xl border-[#D5D5D5] sm:w-[529px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <Button type="submit" class="mt-9 w-full max-w-[529px] rounded-xl">
        Сохранить
      </Button>
    </form>
  </div>
</template>
