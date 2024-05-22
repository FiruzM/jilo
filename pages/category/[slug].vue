<script setup lang="ts">
import { ChevronRight, ListFilter, Minus } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const selected = ref('')
const isOpen = ref(false)
</script>

<template>
  <div class="mx-auto max-w-[1360px] px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-11">
    <Breadcrumb class="hidden lg:flex">
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

    <div class="mt-11 flex gap-7">
      <div class="hidden max-w-[250px] shrink-0 lg:block">
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
        <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div class="flex gap-5">
            <h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
              Жирорастворимые красители
            </h2>
            <span class="hidden self-end text-sm font-semibold text-[#7a7a7a] lg:block">77 товаров</span>
          </div>

          <div class="hidden items-center gap-4 lg:flex">
            <div>
              <p class="text-sm">
                Сортировать по:
              </p>
            </div>

            <div>
              <Select>
                <SelectTrigger class="h-9 w-[180px] rounded-[12px] border-[#D5D5D5] text-black">
                  <SelectValue placeholder="Выберите параметр" />
                </SelectTrigger>
                <SelectContent class="w-[180px] rounded-[12px] border-[#D5D5D5]">
                  <SelectGroup>
                    <SelectItem value="popular">
                      Популярные
                    </SelectItem>

                    <SelectItem value="cheap">
                      Сначала дешевле
                    </SelectItem>

                    <SelectItem value="expensive">
                      Сначала дороже
                    </SelectItem>

                    <SelectItem value="new">
                      Новинки
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="flex lg:hidden">
            <Select>
              <SelectTrigger class="h-9 w-[172px] rounded-[12px] rounded-r-none border-[#D5D5D5] text-xs text-primary-foreground">
                <SelectValue placeholder="Выберите параметр" />
              </SelectTrigger>
              <SelectContent class="w-[180px] rounded-[12px] border-[#D5D5D5]">
                <SelectGroup>
                  <SelectItem value="popular">
                    Популярные
                  </SelectItem>

                  <SelectItem value="cheap">
                    Сначала дешевле
                  </SelectItem>

                  <SelectItem value="expensive">
                    Сначала дороже
                  </SelectItem>

                  <SelectItem value="new">
                    Новинки
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger class="flex items-center gap-2 rounded-[12px] rounded-l-none border border-l-0 border-[#D5D5D5] px-11 text-xs text-primary-foreground">
                <ListFilter />
                Фильтры
              </SheetTrigger>
              <SheetContent side="top">
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

                  <div class="mt-2">
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
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <RadioGroup v-model="selected" default-value="option-one" class="mt-5 flex gap-2 lg:mt-8 lg:gap-4">
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-one" value="option-one" class="hidden" />
            <Label for="option-one" :class="selected === 'option-one' ? 'transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              <img src="/assets/img/guzman.png" alt="Logo">
            </Label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-two" value="option-two" class="hidden" />
            <Label for="option-two" :class="selected === 'option-two' ? 'transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              <img src="/assets/img/guzman.png" alt="Logo">
            </Label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-three" value="option-three" class="hidden" />
            <Label for="option-three" :class="selected === 'option-three' ? 'transition ease-in rounded-xl border border-primary-foreground bg-primary-foreground px-2.5 py-1 lg:px-5 lg:py-2.5' : 'transition ease-in rounded-xl border border-primary-foreground bg-white lg:px-5 px-2.5 py-1 lg:py-2.5'">
              <img src="/assets/img/guzman.png" alt="Logo">
            </Label>
          </div>
        </RadioGroup>

        <div class="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:mt-14 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-5">
          <CardsItemCard v-for="(_, index) in 8" :key="index" @click="() => $router.push('/category/items')" />
        </div>
        <div class="flex justify-center">
          <Button class="mt-16 rounded-xl border border-primary bg-transparent">
            Показать больше
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
