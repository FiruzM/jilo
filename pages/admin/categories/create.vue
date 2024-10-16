<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import type { definitions } from '~/api/v1'
import { createCategory } from '~/api/admin/categories/create-category'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Категории',
})

const { toast } = useToast()
const router = useRouter()

const MAX_IMAGE_SIZE = 1000000 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = toTypedSchema(z.object({
  name: z
    .string({
      required_error: 'Укажите наименование',
    })
    .min(2, {
      message: 'Минимум 2 символа',
    })
    .max(50, {
      message: 'Максимум 50 символов',
    }),
  file: z
    .any()
    .refine(file => file, 'Выберите файл')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Поддерживаются только .jpg, .jpeg, .png and .webp форматы.',
    )
    .refine(file => file?.size <= MAX_IMAGE_SIZE, `Максимальный размер файла 1 МБ.`),
}))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

const posterPreview = computed(() => {
  const poster: File = form.values?.file

  return poster ? window.URL.createObjectURL(poster) : null
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.Products']) => createCategory(data),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    router.push('/admin/categories')

    toast({
      title: 'Категория успешно добавлена',
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
        <div class="flex flex-col gap-5 md:flex-row md:justify-between">
          <div class="flex grow flex-col gap-5">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel class="text-[#3c83ed]">
                  Введите наименование категории
                </FormLabel>
                <FormControl>
                  <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ value, handleChange, handleBlur }"
              name="file"
            >
              <FormItem>
                <FormLabel class="text-[#3c83ed]">
                  Загрузите обложку категории
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
            <Label class="text-center text-sm font-medium text-[#3c83ed]">Предпросмотр обложки</Label>

            <div class="flex h-60 w-44 items-center overflow-hidden rounded-lg border-2 border-[#3c83ed]">
              <AspectRatio v-if="posterPreview" :ratio="4 / 6">
                <img :src="posterPreview" alt="preview" class="size-full object-cover">
              </AspectRatio>

              <Image v-else class="mx-auto size-10 stroke-input stroke-1" />
            </div>
          </div>
        </div>

        <Button class="mt-5 self-start  bg-[#3c83ed] text-white hover:bg-[#10a4e9]" type="submit" :is-loading="isPending">
          Добавить
        </Button>
      </div>
    </form>
  </div>
</template>
