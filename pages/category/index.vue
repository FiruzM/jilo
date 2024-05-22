<script setup lang="ts">
import { ChevronRight, Minus } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <div class="mx-auto max-w-[1360px] pb-16 pt-11">
    <div class="grow">
      <div class="flex items-center justify-between">
        <div class="flex gap-5">
          <h2 class="text-3xl font-semibold">
            Все категории
          </h2>
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

      <ul class="mt-10 grid grid-cols-4 gap-6 [&>*:nth-child(2)]:col-span-2">
        <li v-for="(_, index) in 6" :key="index" class="relative h-[253px] overflow-hidden rounded-3xl bg-[#F1F4FA] p-5 first:col-span-2 ">
          <p class="text-[18px] font-semibold text-primary-foreground">
            Подложки/подставки для торта
          </p>
          <img src="/assets/img/catalog-item.png" class="absolute -bottom-8 right-0 size-[220px]" alt="Item">
        </li>
      </ul>
    </div>
  </div>
</template>
