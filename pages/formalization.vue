<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { User } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'
import { postOrder } from '~/api/web/orders/post-order'

const { toast } = useToast()
const cart: any = useLocalStorage('cart', [])
const user = useAuthUser()
const router = useRouter()

const formSchema = toTypedSchema(z.object({
  delivery_address: z.string({
    required_error: 'Укажите адрес',
  }).min(2, {
    message: 'Минимум 2 символа',
  }).optional(),
  delivery_method: z.enum(['current-adres', 'pickup'], {
    required_error: 'Выберите тип доставки',
  }),
  payment_method: z.enum(['card', 'wallet', 'cash'], {
    required_error: 'Выберите тип доставки',
  }),
}))

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,

  initialValues: {
    payment_method: 'card',
    delivery_method: 'current-adres',
  },
})

const total = computed(() => {
  return cart.value.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0)
})

const { mutate } = useMutation({
  mutationFn: (data: any) => postOrder(data),
  onError(error: any) {
    toast({
      title: 'Произошла ошибка',
      description: error.message,
      variant: 'destructive',
    })
  },
  onSuccess() {
    cart.value = []
    router.push('/order')
    toast({
      title: 'Заказ оформлен',
      description: 'Ваш заказ успешно оформлен, пожалуйста пройдите в заказы чтоб его оплатить',
    })
  },
})

const delivery = ref(20)

const onSubmit = handleSubmit((values) => {
  mutate({ ...values, order_items: cart.value.map((item: any) => ({ price: item.price, quantity: item.quantity, product_id: item.id })), total_amount: `${total.value + delivery.value}` })
  //
  // console.log({ ...values, order_items: cart.value.map((item: any) => ({ price: item.price, quantity: item.quantity, product_id: item.id })), total_amount: `${total.value + delivery.value}` })
})
</script>

<template>
  <div class="relative mx-auto max-w-[1360px] px-4 pb-28 pt-8 lg:px-10 lg:pb-16 lg:pt-[100px]">
    <h3 class="text-xl font-semibold md:text-2xl lg:text-3xl">
      Оформление заказа
    </h3>

    <div class="mt-8 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:justify-between">
      <div class="shrink-0 lg:w-[503px] lg:border-r lg:pr-8 xl:w-[803px]">
        <ClientOnly>
          <div v-if="user" class="flex items-center gap-2">
            <Avatar class="size-10 xl:size-16">
              <AvatarImage :src="user!.file_path" alt="Avatar" />
              <AvatarFallback>{{ user?.full_name?.slice(0, 1) }}</AvatarFallback>
            </Avatar>

            <div>
              <p class="text-sm font-semibold sm:text-base">
                {{ user?.full_name }}
              </p>
              <span class="text-xs opacity-30 sm:text-sm">{{ user?.number_phone }}</span>
            </div>
          </div>

          <div v-else class="flex items-center gap-2">
            <Avatar class="size-10 xl:size-16">
              <User />
            </Avatar>

            <div>
              <NuxtLink to="/login" class="text-base font-semibold text-[#EDAFB8] underline">
                Войти/Зарегистрироваться
              </NuxtLink>
              <p class="text-xs opacity-30">
                Войдите или зарегистрируйтесь, чтобы оформить заказ
              </p>
            </div>
          </div>
        </ClientOnly>

        <form class="mt-10 flex flex-col gap-10" @submit="onSubmit">
          <FormField v-slot="{ componentField }" type="radio" name="delivery_method">
            <FormItem class="space-y-3">
              <FormControl>
                <RadioGroup
                  class="flex gap-6"
                  v-bind="componentField"
                >
                  <FormItem class="flex items-center gap-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="current-adres" />
                    </FormControl>
                    <FormLabel class="text-sm text-black">
                      Доставка по адресу
                    </FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center gap-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="pickup" />
                    </FormControl>
                    <FormLabel class="text-sm text-black">
                      Самовывоз
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div v-if="values.delivery_method === 'current-adres'">
            <FormField v-slot="{ componentField }" name="delivery_address">
              <FormItem>
                <FormLabel class="text-sm font-normal text-black">
                  Адрес доставки
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Введите адрес доставки" v-bind="componentField" class="h-12 rounded-xl border-[#D5D5D5]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- <FormField v-slot="{ componentField }" name="comment">
            <FormItem>
              <FormLabel class="text-sm font-normal text-black">
                Комментарий к заказу
              </FormLabel>
              <FormControl>
                <Textarea
                  class="h-36 resize-none rounded-xl border-[#D5D5D5]"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField> -->

          <FormField v-slot="{ componentField }" type="radio" name="payment_method">
            <FormItem class="space-y-3">
              <FormControl>
                <RadioGroup
                  class="flex flex-col gap-6"
                  v-bind="componentField"
                >
                  <FormIte>
                    <div class="flex items-center gap-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="card" />
                      </FormControl>
                      <FormLabel class="text-sm text-black">
                        Оплата картой
                      </FormLabel>
                    </div>
                    <FormDescription class="!mt-0 ml-7 text-[10px] text-black/30">
                      Оплата картами Корти Милли, VISA и МИР
                    </FormDescription>
                  </FormIte>
                  <FormItem>
                    <div class="flex items-center gap-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="wallet" />
                      </FormControl>
                      <FormLabel class="text-sm text-black">
                        Оплата через эл. кошелёк
                      </FormLabel>
                    </div>
                    <FormDescription class="!mt-0 ml-7 text-[10px] text-black/30">
                      Оплата электронными кошельками Алиф Моби, DC Next
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <div class="flex items-center gap-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cash" />
                      </FormControl>
                      <FormLabel class="text-sm text-black">
                        Наличными или картой при получении
                      </FormLabel>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <ClientOnly>
            <Button :disabled="!user" type="submit" class="absolute bottom-8 left-4 w-[92%] lg:static lg:w-full">
              Оформить заказ
            </Button>
          </ClientOnly>
        </form>
      </div>

      <div class="grow lg:pl-6">
        <ScrollArea class="h-[290px] rounded-[12px] border py-2.5 pl-2.5 pr-11 lg:h-[388px] lg:border-none lg:p-0">
          <div class="flex flex-col gap-8 ">
            <div v-for="item in cart" :key="item.id" class="flex gap-6">
              <div class="rounded-[12px] bg-[#F1F4FA] p-2.5 lg:rounded-3xl lg:p-6">
                <img :src="item.file_paths[0]" alt="Logo" class="size-11 lg:size-[60px]">
              </div>
              <div class="flex flex-col gap-4 lg:justify-between">
                <h3 class="line-clamp-2 max-w-[315px] text-xs font-semibold sm:text-base">
                  {{ item.name }}
                </h3>
                <span class="text-sm">{{ item.quantity }} х {{ item.price }} с.</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div class="mt-4 flex flex-col gap-4 border-b py-4 lg:mt-8 lg:border-y lg:py-8">
          <div class="flex justify-between">
            <p class="text-sm md:text-base lg:text-xl">
              Сумма по товарам
            </p>
            <span class="text-sm font-semibold md:text-base lg:text-xl">{{ total }} с.</span>
          </div>
          <div class="flex justify-between">
            <p class="text-sm md:text-base lg:text-xl">
              Стоимость доставки
            </p>
            <span class="text-sm font-semibold md:text-base lg:text-xl">{{ delivery }} с.</span>
          </div>
        </div>

        <div class="flex justify-between py-4 lg:py-8">
          <p class="text-base md:text-base lg:text-xl">
            Итого
          </p>
          <span class="text-sm font-semibold md:text-base lg:text-xl">{{ total + delivery }} с.</span>
        </div>
      </div>
    </div>
  </div>
</template>
