<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { HTTPError } from 'ky'
import { ImagePlus } from 'lucide-vue-next'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'
import { getProduct } from '~/api/admin/products/get-product'
import { updateProduct } from '~/api/admin/products/update-product'
import { getInfiniteCategories } from '~/api/admin/categories/get-infinite-categories'
import { getInfiniteSubcategories } from '~/api/admin/subcategories/get-infinite-subcategories'
import { getInfiniteBrands } from '~/api/admin/brands/get-infinite-brands'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Товары',
})

const params: any = useRoute().params

const { data: product, isSuccess, isRefetching } = useQuery({
  queryKey: ['product', params.id],
  queryFn: () => getProduct(params.id),

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

const {
  data: subcategories,
  fetchNextPage,
  isFetchingNextPage,

} = useInfiniteQuery({
  queryKey: ['subcategories'],
  queryFn: ({ pageParam }) => getInfiniteSubcategories(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

const {
  data: brands,
  fetchNextPage: fetchNextBrandsPage,
  isFetchingNextPage: isFetchingNextBrandsPage,
} = useInfiniteQuery({
  queryKey: ['brands'],
  queryFn: ({ pageParam }) => getInfiniteBrands(pageParam),
  getNextPageParam: lastPage => lastPage.payload.meta.current_page + 1,
  initialPageParam: 1,
})

const { toast } = useToast()
const router = useRouter()

const MAX_IMAGE_SIZE = 3000000
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
    .max(30, {
      message: 'Максимум 30 символов',
    }),
  old_price: z
    .string({
      required_error: 'Укажите цену',
    })
    .min(1, {
      message: 'Минимум 1 символа',
    })
    .max(30, {
      message: 'Максимум 30 символов',
    }).optional(),
  description: z
    .string({
      required_error: 'Укажите описание',
    })
    .min(10, {
      message: 'Минимум 10 символов',
    }),
  quantity: z
    .number({
      required_error: 'Укажите количество',
    }),
  brands_id: z
    .string({
      required_error: 'Укажите бренд',
    }).optional(),
  category_id: z
    .string({
      required_error: 'Укажите категорию',
    }),
  subcategory_id: z
    .string({
      required_error: 'Укажите категорию',
    }).optional(),

  file_paths: z
    .array(z
      .any({ message: 'Выберите файл' })
      .refine(file => file, 'Выберите файл')
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Поддерживаются только .jpg, .jpeg, .png and .webp форматы.',
      )
      .refine(file => file?.size <= MAX_IMAGE_SIZE, `Максимальный размер файла 3 МБ.`), { message: 'Выберите файл' }).optional(),
}))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

watch([isSuccess, isRefetching], () => {
  if (isSuccess.value) {
    form.setValues({
      name: product.value?.payload.name,
      price: product.value?.payload.price?.toString(),
      old_price: product.value?.payload.old_price?.toString(),
      brands_id: product.value?.payload.brands_id?.toString(),
      category_id: product.value?.payload.category_id?.toString(),
      subcategory_id: product.value?.payload.subcategory_id?.toString(),
      description: product.value?.payload.description,
      quantity: product.value?.payload.quantity,
    })
  }
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.Products']) => updateProduct(data, params.id),

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

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Описание товара
            </FormLabel>
            <FormControl>
              <Textarea
                class="h-[200px] resize-none border-[#3c83ed] focus-visible:border-[#10a4e9]"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="quantity">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Введите количество
            </FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" class="border-[#3c83ed] focus:border-[#10a4e9]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category_id">
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

        <FormField v-slot="{ componentField }" name="subcategory_id">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Подкатегория
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
                  <SelectValue placeholder="Список подкатегорий" />
                </SelectTrigger>
              </FormControl>
              <SelectContent class="border-[#3c83ed]">
                <SelectGroup>
                  <template v-for="(data, index) in subcategories?.pages" :key="index">
                    <SelectItem v-for="subcategory in data.payload.data" :key="subcategory.id" :value="subcategory.id!.toString()">
                      {{ subcategory.name }}
                    </SelectItem>
                  </template>
                  <div class="flex justify-center">
                    <Button
                      class="size-auto bg-transparent p-0 pt-2 text-[#3c83ed] hover:bg-transparent"
                      :disabled="subcategories?.pages[subcategories.pages.length - 1].payload.meta.current_page === subcategories?.pages[subcategories.pages.length - 1].payload.meta.last_page || isFetchingNextPage"
                      :is-loading="isFetchingNextPage"
                      @click="() => fetchNextPage()"
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

        <FormField v-slot="{ componentField }" name="brands_id">
          <FormItem>
            <FormLabel class="text-[#3c83ed]">
              Бренд
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
                  <SelectValue placeholder="Список брендов" />
                </SelectTrigger>
              </FormControl>
              <SelectContent class="border-[#3c83ed]">
                <SelectGroup>
                  <template v-for="(data, index) in brands?.pages" :key="index">
                    <SelectItem v-for="brand in data.payload.data" :key="brand.id" :value="brand.id!.toString()">
                      {{ brand.name }}
                    </SelectItem>
                  </template>
                  <div class="flex justify-center">
                    <Button
                      class="size-auto bg-transparent p-0 pt-2 text-[#3c83ed] hover:bg-transparent"
                      :disabled="brands?.pages[brands.pages.length - 1].payload.meta.current_page === brands?.pages[brands.pages.length - 1].payload.meta.last_page || isFetchingNextBrandsPage"
                      :is-loading="isFetchingNextBrandsPage"
                      @click="() => fetchNextBrandsPage()"
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

        <FormField
          v-slot="{ value, handleChange, handleBlur }"
          name="file_paths"
        >
          <FormItem>
            <FormControl>
              <div
                accept="image/jpeg, image/jpg, image/png, image/webp"
                class="relative max-w-3xl"
                @change="handleChange"
                @blur="handleBlur"
              >
                <div class="flex items-center gap-2 text-xs text-[#789DBE] focus-within:outline-1 focus-within:outline-offset-2">
                  <input type="file" class="absolute inset-0 h-full opacity-0" multiple>
                  <ImagePlus class="stroke-[#789DBE]" />
                  <span class="">Добавить фото</span>
                </div>
                <p v-for="item in value" :key="item.name" class="my-2 text-xs text-[#789DBE]">
                  {{ item.name }}
                </p>
              </div>
            </FormControl>
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
