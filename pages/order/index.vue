<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { h } from 'vue'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  adres: z.string({
    required_error: 'Укажите адрес',
  }).min(2, {
    message: 'Минимум 2 символа',
  }).max(50, {
    message: 'Максимум 50 символов',
  }),
  type: z.enum(['current-adres', 'pickup'], {
    required_error: 'Выберите тип доставки',
  }),
  comment: z
    .string({
      required_error: 'Оставьте комментарий',
    })
    .min(10, {
      message: 'Минимум 10 символов',
    })
    .max(160, {
      message: 'Максимум 160 символов',
    }),
  payment: z.enum(['card', 'wallet', 'cash'], {
    required_error: 'Выберите тип доставки',
  }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,

  initialValues: {
    payment: 'card',
    type: 'current-adres',
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <div class="mx-auto max-w-[1360px] pb-44 pt-[100px]">
    <h3 class="text-3xl font-semibold">
      Оформление заказа
    </h3>

    <div class="mt-10 flex justify-between">
      <div class="w-[803px] shrink-0 border-r pr-8">
        <div class="flex items-center gap-2">
          <Avatar class="size-16">
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p class="font-semibold">
              Фарида Рустамова
            </p>
            <span class="text-sm opacity-30">+992 900 98 76 54</span>
          </div>
        </div>

        <form class="mt-10 flex flex-col gap-10" @submit="onSubmit">
          <FormField v-slot="{ componentField }" type="radio" name="type">
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

          <FormField v-slot="{ componentField }" name="adres">
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

          <FormField v-slot="{ componentField }" name="comment">
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
          </FormField>

          <FormField v-slot="{ componentField }" type="radio" name="payment">
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

          <Button type="submit" class="w-full rounded-xl">
            Оформить заказ
          </Button>
        </form>
      </div>

      <div class="grow pl-6">
        <ScrollArea class="h-[388px]">
          <div class="flex flex-col gap-8 ">
            <div v-for="i in 4" :key="i" class="flex gap-6">
              <div class="rounded-3xl bg-[#F1F4FA] p-6">
                <img src="/assets/img/box.png" alt="Logo" class="size-[60px]">
              </div>
              <div class="flex flex-col justify-between">
                <h3 class="max-w-[315px] font-semibold">
                  Коробка для торта с окном Гофрокартон 30х40х20 см
                </h3>
                <span>1 х 12.00 с.</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div class="mt-8 flex flex-col gap-4 border-y py-8">
          <div class="flex justify-between">
            <p class="text-xl">
              Сумма по товарам
            </p>
            <span class="text-xl font-semibold">108.00 с.</span>
          </div>
          <div class="flex justify-between">
            <p class="text-xl">
              Стоимость доставки
            </p>
            <span class="text-xl font-semibold">0.00 с.</span>
          </div>
        </div>

        <div class="flex justify-between py-8">
          <p class="text-xl">
            Итого
          </p>
          <span class="text-xl font-semibold">108.00 с.</span>
        </div>
      </div>
    </div>
  </div>
</template>
