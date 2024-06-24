<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import type { definitions } from '~/api/v1'
import { createProduct } from '~/api/admin/products/create-product'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Товары',
})

const { toast } = useToast()
const router = useRouter()

const MAX_IMAGE_SIZE = 1000000 // 100KB
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
  price: z
    .string({
      required_error: 'Укажите цену',
    })
    .min(1, {
      message: 'Минимум 1 символа',
    })
    .max(10, {
      message: 'Максимум 10 символов',
    }),
  old_price: z
    .string({
      required_error: 'Укажите цену',
    })
    .min(1, {
      message: 'Минимум 1 символа',
    })
    .max(10, {
      message: 'Максимум 10 символов',
    }).optional(),

  file_path: z
    .any()
    .refine(file => file)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png formats are supported.',
    )
    .refine(file => file?.size <= MAX_IMAGE_SIZE, `Max image size is 100KB.`),
}))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

const posterPreview = computed(() => {
  const poster: File = form.values?.file_path

  return poster ? window.URL.createObjectURL(poster) : null
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.Products']) => createProduct(data),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    router.push('/admin/products')

    toast({
      title: 'Товар успешно добавлен',
    })
  },
})

const onSubmit = form.handleSubmit((formData) => {
  mutate(formData as any)
})
</script>

<template>
  <div>
    <form class="flex max-w-[720px] justify-between gap-5" @submit="onSubmit">
      <div class="flex grow flex-col gap-5">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Введите наименование товара
            </FormLabel>
            <FormControl>
              <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Введите цену
            </FormLabel>
            <FormControl>
              <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="old_price">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Введите старую цену
            </FormLabel>
            <FormControl>
              <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ value, handleChange, handleBlur }"
          name="file_path"
        >
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Загрузите обложку книги
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

        <Button class="self-start bg-[#3c83ed] text-white hover:bg-[#10a4e9]" type="submit" :is-loading="isPending">
          Добавить
        </Button>
      </div>

      <div class="h-full">
        <Label class="text-center text-sm font-medium">Предпросмотр обложки</Label>

        <div class="flex h-60 w-44 items-center overflow-hidden rounded-lg border-2 border-[#3c83ed]">
          <AspectRatio v-if="posterPreview" :ratio="4 / 6">
            <img :src="posterPreview" alt="preview" class="size-full object-cover">
          </AspectRatio>

          <Image v-else class="mx-auto size-10 stroke-input stroke-1" />
        </div>
      </div>
    </form>
  </div>
</template>
