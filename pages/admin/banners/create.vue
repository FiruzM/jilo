<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import { useToast } from '~/components/ui/toast'
import { type BannerProps, createBanner } from '~/api/admin/banners/create-banner'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Баннеры',
})

const { toast } = useToast()
const router = useRouter()

const MAX_IMAGE_SIZE = 10000000 // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = toTypedSchema(z.object({
  title: z
    .string({
      required_error: 'Укажите наименование',
    })
    .min(2, {
      message: 'Минимум 2 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),
  subtitle: z
    .string({
      required_error: 'Укажите наименование',
    })
    .min(2, {
      message: 'Минимум 2 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),
  banner_link: z
    .string({
      required_error: 'Укажите наименование',
    })
    .min(2, {
      message: 'Минимум 2 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),
  banner: z
    .any()
    .refine(file => file, 'Required')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Только .jpg, .jpeg, .png and .webp форматы.',
    )
    .refine(file => file?.size <= MAX_IMAGE_SIZE, `Максимальный размер 10MB.`),
}))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

const posterPreview = computed(() => {
  const poster: File = form.values?.banner

  return poster ? window.URL.createObjectURL(poster) : null
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: BannerProps) => createBanner(data),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    router.push('/admin/banners')

    toast({
      title: 'Баннер успешно добавлен',
    })
  },
})

const onSubmit = form.handleSubmit((formData) => {
  mutate(formData as any)
})
</script>

<template>
  <div>
    <form class="flex max-w-[900px] justify-between gap-5" @submit="onSubmit">
      <div class="grow">
        <div class="flex justify-between gap-5">
          <div class="flex grow flex-col gap-5">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem>
                <FormLabel class="text-[#3c83ed]">
                  Введите наименование титула
                </FormLabel>
                <FormControl>
                  <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="subtitle">
              <FormItem>
                <FormLabel class="text-[#3c83ed]">
                  Введите наименование подтитула
                </FormLabel>
                <FormControl>
                  <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="banner_link">
              <FormItem>
                <FormLabel class="text-[#3c83ed]">
                  Введите сылку
                </FormLabel>
                <FormControl>
                  <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange, handleBlur }"
              name="banner"
            >
              <FormItem>
                <FormLabel class="text-[#3c83ed]">
                  Загрузите баннер
                </FormLabel>
                <FormControl>
                  <UploadFile
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                    :value="value?.name"
                    @change="handleChange"
                    @blur="handleBlur"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="h-full">
            <Label class="text-center text-sm font-medium text-[#3c83ed]">Предпросмотр баннера</Label>

            <div class="flex h-60 w-44 items-center overflow-hidden rounded-lg border-2 border-[#3c83ed]">
              <AspectRatio v-if="posterPreview" :ratio="4 / 6">
                <img :src="posterPreview" alt="preview" class="size-full object-cover">
              </AspectRatio>

              <Image v-else class="mx-auto size-10 stroke-input stroke-1" />
            </div>
          </div>
        </div>

        <Button class="mt-5 self-start bg-[#3c83ed] text-white hover:bg-[#10a4e9]" type="submit" :is-loading="isPending">
          Добавить
        </Button>
      </div>
    </form>
  </div>
</template>
