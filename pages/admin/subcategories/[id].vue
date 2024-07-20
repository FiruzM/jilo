<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'
import { getInfiniteCategories } from '~/api/admin/categories/get-infinite-categories'
import { getSubcategory } from '~/api/admin/subcategories/get-subcategory'
import { updateSubcategory } from '~/api/admin/subcategories/update-subcategory'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Подкатегории',
})

const {
  data: categories,
  fetchNextPage: fetchNextCategories,
  isFetchingNextPage: isFetchingNextCategories,

} = useInfiniteQuery({
  queryKey: ['categories'],
  queryFn: ({ pageParam }) => getInfiniteCategories(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

const params: any = useRoute().params

const { data: subcategory, isSuccess, isRefetching } = useQuery({
  queryKey: ['subcategory', params],
  queryFn: () => getSubcategory(params.id),
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

  categories_id: z
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
      name: subcategory.value?.payload.name,
      categories_id: subcategory.value?.payload.categories_id?.toString(),
    })
  }
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.Subcategories']) => updateSubcategory(data, params.id),

  onError: async (error: HTTPError) => {
    const errorData = await error.response.json()

    toast({
      title: 'Произошла ошибка',
      description: errorData.message,
      variant: 'destructive',
    })
  },
  onSuccess: () => {
    router.push('/admin/subcategories')

    toast({
      title: 'Подкатегория успешно добавлена',
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
              Введите наименование подкатегории
            </FormLabel>
            <FormControl>
              <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="categories_id">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Категория
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
                  <SelectValue placeholder="Список категорий" />
                </SelectTrigger>
              </FormControl>
              <SelectContent class="border-[#3c83ed]">
                <SelectGroup>
                  <template v-for="(data, index) in categories?.pages" :key="index">
                    <SelectItem v-for="category in data.payload.data" :key="category.id" :value="category.id!.toString()">
                      {{ category.name }}
                    </SelectItem>
                  </template>
                  <div class="flex justify-center">
                    <Button
                      class="size-auto bg-transparent p-0 pt-2 text-[#3c83ed] hover:bg-transparent"
                      :disabled="categories?.pages[categories.pages.length - 1].payload.meta.current_page === categories?.pages[categories.pages.length - 1].payload.meta.last_page || isFetchingNextCategories"
                      :is-loading="isFetchingNextCategories"
                      @click="() => fetchNextCategories()"
                    >
                      Загрузить еще
                    </Button>
                  </div>
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
