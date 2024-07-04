<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'
import { getSubcategories } from '~/api/admin/subcategories/get-subcategories'
import { getBrand } from '~/api/admin/brands/get-brand'
import { updateBrand } from '~/api/admin/brands/update-brand'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Бренды',
})

const { data: subcategories } = useQuery({
  queryKey: ['categories'],
  queryFn: getSubcategories,
})

const params: any = useRoute().params

const { data: brand, isSuccess, isRefetching } = useQuery({
  queryKey: ['brand', params],
  queryFn: () => getBrand(params.id),
})

const { toast } = useToast()
const router = useRouter()

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

  subcategory_id: z
    .string({
      required_error: 'Укажите категорию',
    }),
}))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

watch([isSuccess, isRefetching], () => {
  if (isSuccess.value) {
    form.setValues({
      name: brand.value?.payload.name,
      subcategory_id: brand.value?.payload.subcategories_id?.toString(),
    })
  }
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.Brands']) => updateBrand(params.id, data),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    router.push('/admin/brands')

    toast({
      title: 'Бренд успешно изменен',
    })
  },
})

const onSubmit = form.handleSubmit((formData) => {
  mutate({ ...formData, subcategory_id: Number(formData.subcategory_id) } as any)
})
</script>

<template>
  <div>
    <form class="flex max-w-[720px] justify-between gap-5" @submit="onSubmit">
      <div class="flex grow flex-col gap-5">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Введите наименование бренда
            </FormLabel>
            <FormControl>
              <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="subcategory_id">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Выберите подкатегорию
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
                  <SelectValue placeholder="Выберите подкатегорию" />
                </SelectTrigger>
              </FormControl>
              <SelectContent class="border-[#3c83ed]">
                <SelectGroup>
                  <SelectItem v-for="subcategory in subcategories?.payload" :key="subcategory.id" :value="subcategory.id!.toString()">
                    {{ subcategory.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="self-start bg-[#3c83ed] text-white hover:bg-[#10a4e9]" type="submit" :is-loading="isPending">
          Изменить
        </Button>
      </div>
    </form>
  </div>
</template>
