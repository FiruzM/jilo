<template>
  <RadioGroup class="flex gap-1.5" v-bind="$attrs">
    <div>
      <RadioGroupItem id="ru" value="ru" class="peer sr-only" />
      <Label
        for="ru"
        class="min-w-[40px] cursor-pointer flex flex-col items-center justify-between rounded-lg border border-primary text-sm bg-popover px-2 py-1 hover:bg-accent peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-white"
      >
        RU
      </Label>
    </div>
    <div>
      <RadioGroupItem
        id="tj"
        value="tg"
        class="peer sr-only"
      />
      <Label
        for="tj"
        class="min-w-[40px] cursor-pointer flex flex-col items-center justify-between rounded-lg border border-primary text-sm bg-popover px-2 py-1 hover:bg-accent peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-white"
      >
        TJ
      </Label>
    </div>
    <div>
      <RadioGroupItem id="en" value="en" class="peer sr-only" />
      <Label
        for="en"
        class="min-w-[40px] cursor-pointer flex flex-col items-center justify-between rounded-lg border border-primary text-sm bg-popover px-2 py-1 hover:bg-accent peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-white"
      >
        EN
      </Label>
    </div>
  </RadioGroup>
</template>
