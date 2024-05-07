<script setup lang="ts">
import { ChevronRight, Minus } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const selected = ref('')
const isOpen = ref(false)
</script>

<template>
  <Breadcrumb class="mt-10">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/category">
          Каталог товаров
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/category/krasitely">
          Красители
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Жирорастворимые красители</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

  <div class="flex gap-7 pb-16 pt-11">
    <div class="max-w-[250px] shrink-0">
      <ScrollArea class="h-svh">
        <Collapsible v-model:open="isOpen">
          <CollapsibleTrigger class="flex items-center">
            <ChevronRight :class="isOpen ? 'transition-all ease-in rotate-90' : 'transition-all ease-in'" />
            <span class="font-semibold">Купить жильё</span>
          </CollapsibleTrigger>
          <CollapsibleContent class="ml-6 mt-6 flex flex-col gap-4">
            <div>Все квартиры</div>
            <div>Вторичка</div>
            <div>Вторичка</div>
            <div>Вторичка</div>
          </CollapsibleContent>
        </Collapsible>

        <div class="mt-6">
          <p class="mb-4 font-semibold">
            Количество комнат
          </p>
          <div class="flex flex-col gap-4">
            <div class="flex items-center space-x-2">
              <Checkbox id="studio" />
              <label
                for="studio"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Студия
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="studio" />
              <label
                for="studio"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Студия
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="studio" />
              <label
                for="studio"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Студия
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="studio" />
              <label
                for="studio"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Студия
              </label>
            </div>
          </div>
        </div>

        <div>
          <p class="mt-6 font-semibold">
            Цена, ₽
          </p>

          <div class="mt-4 flex items-center gap-2.5">
            <Input class="rounded-lg" placeholder="от" />
            <Minus />
            <Input class="rounded-lg" placeholder="до" />
          </div>
        </div>
      </ScrollArea>
    </div>

    <div class="grow">
      <div class="flex items-center justify-between">
        <div class="flex gap-5">
          <h2 class="text-3xl font-semibold">
            Жирорастворимые красители
          </h2>
          <span class="self-end text-sm font-semibold text-[#7a7a7a]">77 товаров</span>
        </div>

        <div class="flex items-center gap-4">
          <div>
            <p class="text-sm">
              Сортировать по:
            </p>
          </div>

          <div>
            <Select>
              <SelectTrigger class="w-44 rounded-xl text-black">
                <SelectValue placeholder="Выберите параметр" />
              </SelectTrigger>
              <SelectContent class="w-44">
                <SelectGroup>
                  <SelectItem value="apple">
                    Apple
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <RadioGroup v-model="selected" default-value="option-one" class="mt-8 flex gap-4">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="option-one" value="option-one" class="hidden" />
          <Label for="option-one" :class="selected === 'option-one' ? 'transition ease-in rounded-xl border border-[#4A5759] bg-[#4A5759] px-5 py-2.5' : 'transition ease-in rounded-xl border border-[#4A5759] bg-white px-5 py-2.5'">
            <img src="/assets/img/guzman.png" alt="Logo">
          </Label>
        </div>

        <div class="flex items-center space-x-2">
          <RadioGroupItem id="option-two" value="option-two" class="hidden" />
          <Label for="option-two" :class="selected === 'option-two' ? 'transition ease-in rounded-xl border border-[#4A5759] bg-[#4A5759] px-5 py-2.5' : 'transition ease-in rounded-xl border border-[#4A5759] bg-white px-5 py-2.5'">
            <img src="/assets/img/guzman.png" alt="Logo">
          </Label>
        </div>

        <div class="flex items-center space-x-2">
          <RadioGroupItem id="option-three" value="option-three" class="hidden" />
          <Label for="option-three" :class="selected === 'option-three' ? 'transition ease-in rounded-xl border border-[#4A5759] bg-[#4A5759] px-5 py-2.5' : 'transition ease-in rounded-xl border border-[#4A5759] bg-white px-5 py-2.5'">
            <img src="/assets/img/guzman.png" alt="Logo">
          </Label>
        </div>
      </RadioGroup>

      <div class="mt-14 grid grid-cols-4 gap-y-10">
        <CardsItemCard v-for="(_, index) in 8" :key="index" />
      </div>
      <div class="flex justify-center">
        <Button class="mt-16 rounded-xl border border-primary bg-transparent">
          Показать больше
        </Button>
      </div>
    </div>
  </div>
</template>
