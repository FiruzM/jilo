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

// const MAX_IMAGE_SIZE = 1000000 // 100KB
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

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
}))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

// const posterPreview = computed(() => {
//   const poster: File = form.values?.file_path

//   return poster ? window.URL.createObjectURL(poster) : null
// })

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
    <form class="flex max-w-[720px] justify-between gap-5" @submit="onSubmit">
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

        <Button class="self-start bg-[#3c83ed] text-white hover:bg-[#10a4e9]" type="submit" :is-loading="isPending">
          Добавить
        </Button>
      </div>
    </form>
  </div>
</template>
