<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Eye, EyeOff, Image } from 'lucide-vue-next'
import type { definitions } from '~/api/v1'
import { useToast } from '~/components/ui/toast'
import { getUser } from '~/api/admin/users/get-user'
import { getRoles } from '~/api/admin/roles/get-roles'
import { updateUser } from '~/api/admin/users/update-user'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin-only'],
  title: 'Пользователи',
})

const { toast } = useToast()
const params: any = useRoute().params
const inputType = ref('password')
const inputRepeatType = ref('password')
const router = useRouter()

const { data: user, isSuccess, isRefetching } = useQuery({
  queryKey: ['user'],
  queryFn: () => getUser(params.id),
})

const { data: roles } = useQuery({
  queryKey: ['roles'],
  queryFn: () => getRoles(),
})

const MAX_IMAGE_SIZE = 1000000 // 100KB
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

  password: z.string().optional(),

  repeat_password: z.string().optional(),

  role: z
    .string({
      required_error: 'Укажите роль',
    }),

}).refine(data => data.password === data.repeat_password, {
  message: 'Пароль не совпадает',
  path: ['repeat_password'],
})))

const form = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
})

watch([isSuccess, isRefetching], () => {
  if (isSuccess.value) {
    form.setValues({
      full_name: user.value?.payload[0].full_name,
      number_phone: user.value?.payload[0].number_phone,
      role: user.value?.payload[0]?.role?.id?.toString(),
      password: '',
      repeat_password: '',
    })
  }
})

const posterPreview = computed(() => {
  const poster: File = form.values?.avatar
  const categoryPreview = user.value?.payload[0].file_path

  return poster
    ? window.URL.createObjectURL(poster)
    : categoryPreview
})

const { mutate, isPending } = useMutation({
  mutationFn: (data: definitions['models.AddUserParams']) => updateUser(data, params.id),

  onSuccess: async () => {
    toast({
      title: 'Пользователь успешно изменен',
    })
    router.push('/admin/users')
  },
})

const onSubmit = form.handleSubmit((values) => {
  mutate(values as any)
})
</script>

<template>
  <form class="flex max-w-[720px] flex-col gap-10 md:flex-row" @submit="onSubmit">
    <div class="flex grow flex-col gap-4">
      <FormField v-slot="{ componentField }" name="full_name">
        <FormItem>
          <FormLabel class="text-[#3c83ed]">
            ФИО
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="number_phone">
        <FormItem>
          <FormLabel class="text-[#3c83ed]">
            Номер телефона
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" class="border-[#3c83ed] focus:border-[#10a4e9]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="role">
        <FormItem>
          <FormLabel class="text-[#3c83ed]">
            Выберите роль
          </FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger class="border-[#3c83ed] text-[#3c83ed]">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
            </FormControl>
            <SelectContent class="border-[#3c83ed]">
              <SelectGroup>
                <SelectItem v-for="role in roles?.payload" :key="role.id" :value="role.id!.toString()">
                  {{ role.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value, handleChange, handleBlur }"
        name="avatar"
      >
        <FormItem>
          <FormLabel class="text-[#3c83ed]">
            Загрузите аватар
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

      <div class="flex gap-2">
        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="w-full">
            <Label class="text-[#3c83ed]">Введите пароль</Label>
            <FormControl>
              <div class="relative">
                <input placeholder="***" v-bind="componentField" :type="inputType" class="'flex disabled:opacity-50' h-10 w-full rounded-md border  border-[#3c83ed] bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-muted-foreground focus:border-[#10a4e9] focus-visible:outline-none disabled:cursor-not-allowed">
                <EyeOff v-if="inputType === 'password'" class="absolute  right-4 top-2 cursor-pointer stroke-[#3c83ed]" @click="inputType = 'text'" />
                <Eye v-else class="absolute right-4 top-2 cursor-pointer stroke-[#3c83ed]" @click="inputType = 'password'" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="repeat_password">
          <FormItem class="w-full">
            <Label class="text-[#3c83ed]">Повторите пароль</Label>
            <FormControl>
              <div class="relative">
                <input placeholder="***" v-bind="componentField" :type="inputRepeatType" class="'flex disabled:opacity-50' h-10 w-full rounded-md border  border-[#3c83ed] bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-muted-foreground focus:border-[#10a4e9] focus-visible:outline-none disabled:cursor-not-allowed">
                <EyeOff v-if="inputRepeatType === 'password'" class="absolute  right-4 top-2 cursor-pointer stroke-[#3c83ed]" @click="inputRepeatType = 'text'" />
                <Eye v-else class="absolute right-4 top-2 cursor-pointer stroke-[#3c83ed]" @click="inputRepeatType = 'password'" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" class="mt-5 w-full self-start bg-[#3c83ed] text-white hover:bg-[#10a4e9]" :is-loading="isPending">
        Сохранить
      </Button>
    </div>

    <div class="h-full">
      <Label class="text-center text-sm font-medium text-[#3c83ed]">Фото профиля</Label>

      <div class="flex h-60 w-44 items-center overflow-hidden rounded-lg border-2 border-[#3c83ed]">
        <AspectRatio v-if="posterPreview" :ratio="4 / 6">
          <img :src="posterPreview" alt="preview" class="size-full object-cover">
        </AspectRatio>

        <Image v-else class="mx-auto size-10 stroke-[#3c83ed] stroke-1" />
      </div>
    </div>
  </form>
</template>
