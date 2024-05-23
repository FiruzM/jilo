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
  <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-[100px]">
    <h3 class="text-xl font-semibold md:text-2xl lg:text-3xl">
      Оформление заказа
    </h3>

    <div class="mt-8 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:justify-between">
      <div class="shrink-0 lg:w-[503px] lg:border-r lg:pr-8 xl:w-[803px]">
        <div class="flex items-center gap-2">
          <Avatar class="size-10 xl:size-16">
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p class="text-sm font-semibold sm:text-base">
              Фарида Рустамова
            </p>
            <span class="text-xs opacity-30 sm:text-sm">+992 900 98 76 54</span>
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

      <div class="grow lg:pl-6">
        <ScrollArea class="h-[290px] rounded-[12px] border py-2.5 pl-2.5 pr-11 lg:h-[388px] lg:border-none lg:p-0">
          <div class="flex flex-col gap-8 ">
            <div v-for="i in 4" :key="i" class="flex gap-6">
              <div class="rounded-[12px] bg-[#F1F4FA] p-2.5 lg:rounded-3xl lg:p-6">
                <img src="/assets/img/box.png" alt="Logo" class="size-11 lg:size-[60px]">
              </div>
              <div class="flex flex-col gap-4 lg:justify-between">
                <h3 class="max-w-[315px] text-xs font-semibold sm:text-base">
                  Коробка для торта с окном Гофрокартон 30х40х20 см
                </h3>
                <span class="text-sm">1 х 12.00 с.</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div class="mt-4 flex flex-col gap-4 border-b py-4 lg:mt-8 lg:border-y lg:py-8">
          <div class="flex justify-between">
            <p class="text-sm md:text-base lg:text-xl">
              Сумма по товарам
            </p>
            <span class="text-sm font-semibold md:text-base lg:text-xl">108.00 с.</span>
          </div>
          <div class="flex justify-between">
            <p class="text-sm md:text-base lg:text-xl">
              Стоимость доставки
            </p>
            <span class="text-sm font-semibold md:text-base lg:text-xl">0.00 с.</span>
          </div>
        </div>

        <div class="flex justify-between py-4 lg:py-8">
          <p class="text-base md:text-base lg:text-xl">
            Итого
          </p>
          <span class="text-sm font-semibold md:text-base lg:text-xl">108.00 с.</span>
        </div>
      </div>
    </div>
  </div>
</template>
